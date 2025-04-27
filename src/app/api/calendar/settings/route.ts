import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// GET: Fetch calendar integration settings for the current user
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

    // Get calendar integration settings from database
    const settings = await prisma.calendar_integration_settings.findUnique({
      where: {
        user_id: user.id,
      },
    });

    // If no settings exist, return default settings
    if (!settings) {
      return NextResponse.json({
        isEnabled: false,
      });
    }

    return NextResponse.json({
      isEnabled: settings.is_enabled,
    });
  } catch (error) {
    console.error("Error fetching calendar settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar settings" },
      { status: 500 }
    );
  }
}

// POST: Update calendar integration settings for the current user
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { isEnabled } = await request.json();

    if (typeof isEnabled !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request: isEnabled must be a boolean" },
        { status: 400 }
      );
    }

    // Upsert the settings
    const settings = await prisma.calendar_integration_settings.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        id: uuidv4(),
        user_id: user.id,
        is_enabled: isEnabled,
      },
      update: {
        is_enabled: isEnabled,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      isEnabled: settings.is_enabled,
    });
  } catch (error) {
    console.error("Error updating calendar settings:", error);
    return NextResponse.json(
      { error: "Failed to update calendar settings" },
      { status: 500 }
    );
  }
}
