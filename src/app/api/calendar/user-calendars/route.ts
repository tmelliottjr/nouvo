import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// GET: Fetch user's saved calendars
export async function GET() {
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

    // Get user calendars from database
    const calendars = await prisma.calendar.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        is_primary: "desc",
      },
    });

    // Format the response
    const formattedCalendars = calendars.map((calendar) => ({
      id: calendar.calendar_id,
      name: calendar.calendar_name,
      color: calendar.color || "#039BE5",
      selected: calendar.is_enabled,
      isPrimary: calendar.is_primary,
      providerId: calendar.provider_id,
    }));

    return NextResponse.json(formattedCalendars);
  } catch (error) {
    console.error("Error fetching user calendars:", error);
    return NextResponse.json(
      { error: "Failed to fetch user calendars" },
      { status: 500 }
    );
  }
}

// POST: Save or update multiple calendars
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { calendars } = await request.json();

    if (!Array.isArray(calendars)) {
      return NextResponse.json(
        { error: "Invalid request: calendars must be an array" },
        { status: 400 }
      );
    }

    // Prepare batch operations for all calendars
    const operations = calendars.map((calendar) => {
      return prisma.calendar.upsert({
        where: {
          unique_user_calendar: {
            user_id: user.id,
            provider_id: calendar.providerId,
            calendar_id: calendar.id,
          },
        },
        create: {
          id: uuidv4(),
          user_id: user.id,
          provider_id: calendar.providerId || "google", // Default to google if not specified
          calendar_id: calendar.id,
          calendar_name: calendar.name,
          is_primary: calendar.isPrimary || false,
          is_enabled: calendar.selected,
          color: calendar.color || "#039BE5",
        },
        update: {
          calendar_name: calendar.name,
          is_primary: calendar.isPrimary || false,
          is_enabled: calendar.selected,
          color: calendar.color || "#039BE5",
          updated_at: new Date(),
        },
      });
    });

    // Execute all operations in a transaction
    await prisma.$transaction(operations);

    // Get the updated calendars
    const updatedCalendars = await prisma.calendar.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        is_primary: "desc",
      },
    });

    // Format the response
    const formattedCalendars = updatedCalendars.map((calendar) => ({
      id: calendar.calendar_id,
      name: calendar.calendar_name,
      color: calendar.color || "#039BE5",
      selected: calendar.is_enabled,
      isPrimary: calendar.is_primary,
      providerId: calendar.provider_id,
    }));

    return NextResponse.json(formattedCalendars);
  } catch (error) {
    console.error("Error saving calendars:", error);
    return NextResponse.json(
      { error: "Failed to save calendars" },
      { status: 500 }
    );
  }
}

// PATCH: Update a single calendar's settings
export async function PATCH(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { id, providerId, selected, color } = await request.json();

    if (!id || typeof selected !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request: id and selected are required" },
        { status: 400 }
      );
    }

    // Update the calendar
    await prisma.calendar.updateMany({
      where: {
        user_id: user.id,
        provider_id: providerId || "google",
        calendar_id: id,
      },
      data: {
        is_enabled: selected,
        color: color,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating calendar:", error);
    return NextResponse.json(
      { error: "Failed to update calendar" },
      { status: 500 }
    );
  }
}
