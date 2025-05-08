import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/auth/auth";
import { getGoogleTokens } from "../../../../lib/auth/providers/google";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

// Google Calendar API constants
const GOOGLE_CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user's session
    const user = await getAuthUser();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const [accessToken] = await getGoogleTokens(user.id);

    if (!accessToken) {
      return NextResponse.json(
        { error: "No Google Calendar access token available" },
        { status: 401 }
      );
    }

    // Parse request body
    const { timeMin, timeMax, calendarIds } = await req.json();

    if (!timeMin || !timeMax || !calendarIds || !Array.isArray(calendarIds)) {
      return NextResponse.json(
        {
          error: "Missing required parameters (timeMin, timeMax, calendarIds)",
        },
        { status: 400 }
      );
    }

    // Fetch user's calendar records
    console.log("Fetching calendars for user:", user.id);
    console.log("Calendar IDs:", { calendarIds });
    const userCalendars = await prisma.calendar.findMany({
      where: {
        user_id: user.id,
        is_primary: true,
        is_enabled: true,
      },
    });

    console.log("User calendars:", { userCalendars });
    // Check if any calendars are found

    // Create a map of calendar_id to database id
    const calendarMap = new Map(
      userCalendars.map((cal) => [cal.calendar_id, cal.id])
    );

    const calendarId = userCalendars[0].calendar_id;

    // Fetch events from each calendar in parallel
    // const eventsPromises = calendarIds.map(async (calendarId) => {

    console.log("Fetching events for calendar:", calendarId);
    const params = new URLSearchParams({
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: "true",
      orderBy: "startTime",
    });

    console.log(
      `${GOOGLE_CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`
    );

    const response = await fetch(
      `${GOOGLE_CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ response });

    if (!response.ok) {
      console.error(
        `Error fetching events for calendar ${calendarId}:`,
        response.statusText
      );
      return { calendarId, events: [] };
    }

    const eventsResults = await response.json();
    // });;

    // Process and store events
    const processedEvents = [];

    console.log({ items: eventsResults.items });

    // for (const events of eventsResults.items) {
    const dbCalendarId = calendarMap.get(calendarId);

    if (!dbCalendarId)
      return NextResponse.json({ error: "Calendar not found" });

    // Find calendar color and name
    const calendarDetails = userCalendars.find(
      (cal) => cal.id === dbCalendarId
    );
    if (!calendarDetails) {
      return NextResponse.json({ error: "Calendar not found" });
    }

    for (const event of eventsResults.items) {
      // Skip events with no summary or dates
      if (!event.summary || !event.start || !event.end) continue;

      // Format the event data
      const formattedEvent = {
        id: event.id,
        title: event.summary,
        description: event.description || null,
        startTime: event.start.dateTime || `${event.start.date}T00:00:00Z`,
        endTime: event.end.dateTime || `${event.end.date}T23:59:59Z`,
        allDay: !!event.start.date,
        location: event.location || null,
        recurrenceRule: event.recurrence ? event.recurrence.join(";") : null,
      };

      // Check if event already exists in our database
      let dbEvent = await prisma.calendar_event.findFirst({
        where: {
          calendar_id: dbCalendarId,
          event_id: event.id,
        },
        include: {
          note: {
            select: {
              id: true,
              name: true,
              content: true,
            },
          },
        },
      });

      // If event doesn't exist, create it
      if (!dbEvent) {
        dbEvent = await prisma.calendar_event.create({
          data: {
            id: uuidv4(),
            calendar_id: dbCalendarId,
            event_id: event.id,
            title: formattedEvent.title,
            description: formattedEvent.description,
            start_time: new Date(formattedEvent.startTime),
            end_time: new Date(formattedEvent.endTime),
            all_day: formattedEvent.allDay,
            location: formattedEvent.location,
            recurrence_rule: formattedEvent.recurrenceRule,
          },
          include: {
            note: {
              select: {
                id: true,
                name: true,
                content: true,
              },
            },
          },
        });
      } else {
        // Update existing event with latest data
        dbEvent = await prisma.calendar_event.update({
          where: { id: dbEvent.id },
          data: {
            title: formattedEvent.title,
            description: formattedEvent.description,
            start_time: new Date(formattedEvent.startTime),
            end_time: new Date(formattedEvent.endTime),
            all_day: formattedEvent.allDay,
            location: formattedEvent.location,
            recurrence_rule: formattedEvent.recurrenceRule,
          },
          include: {
            note: {
              select: {
                id: true,
                name: true,
                content: true,
              },
            },
          },
        });
        // }

        // Add the event to our processed list with DB ID and note info
        processedEvents.push({
          ...formattedEvent,
          dbId: dbEvent.id,
          calendarId,
          calendarName: calendarDetails.calendar_name,
          color: calendarDetails.color || "#039BE5",
          note: dbEvent.note,
        });
      }
    }

    return NextResponse.json({ events: processedEvents });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

// Add a new endpoint to create or link notes to calendar events
export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId, noteId, createNote } = await req.json();

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Find the event
    const event = await prisma.calendar_event.findUnique({
      where: { id: eventId },
      include: {
        calendar: true,
        note: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Verify the event belongs to the user
    if (event.calendar.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let note;

    // If noteId provided, link existing note
    if (noteId) {
      // Verify the note belongs to the user
      const existingNote = await prisma.notes.findFirst({
        where: {
          id: noteId,
          user_id: user.id,
        },
      });

      if (!existingNote) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }

      // Link note to event
      await prisma.calendar_event.update({
        where: { id: eventId },
        data: { note_id: noteId },
      });

      note = existingNote;
    }
    // If createNote flag is true, create a new note
    else if (createNote) {
      // Create new note with event details
      note = await prisma.notes.create({
        data: {
          id: uuidv4(),
          name: `Note for: ${event.title}`,
          content: `Event details:\n\n${event.description || ""}`,
          user_id: user.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Link note to event
      await prisma.calendar_event.update({
        where: { id: eventId },
        data: { note_id: note.id },
      });
    } else {
      // Remove note association
      await prisma.calendar_event.update({
        where: { id: eventId },
        data: { note_id: null },
      });

      // Return empty note
      note = null;
    }

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error("Error managing event note:", error);
    return NextResponse.json(
      { error: "Failed to update event note" },
      { status: 500 }
    );
  }
}
