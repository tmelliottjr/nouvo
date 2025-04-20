import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/auth";

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

    // Get access token from session or auth system
    const accessToken = session.accessToken;

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

    // Fetch events from each calendar in parallel
    const eventsPromises = calendarIds.map(async (calendarId) => {
      const params = new URLSearchParams({
        timeMin: timeMin,
        timeMax: timeMax,
        singleEvents: "true",
        orderBy: "startTime",
      });

      const response = await fetch(
        `${GOOGLE_CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Error fetching events for calendar ${calendarId}:`,
          response.statusText
        );
        return [calendarId, []]; // Return empty array for this calendar
      }

      const data = await response.json();
      return [calendarId, data.items || []];
    });

    // Wait for all promises to resolve
    const eventsResults = await Promise.all(eventsPromises);

    // Organize events by calendar
    const events = Object.fromEntries(eventsResults);

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}
