import { NextResponse } from "next/server";
import { getAuthUser } from "../../../../lib/auth/auth";
import { getGoogleTokens } from "../../../../lib/auth/providers/google";

// Google Calendar API constants
const GOOGLE_CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";

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
    const [accessToken] = await getGoogleTokens(user?.id);
    if (!accessToken) {
      return NextResponse.json(
        { error: "No Google Calendar access token available" },
        { status: 401 }
      );
    }

    // Call Google Calendar API to get calendar list
    const response = await fetch(
      `${GOOGLE_CALENDAR_API_BASE}/users/me/calendarList`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to fetch calendar list", details: errorData },
        { status: response.status }
      );
    }

    const calendarList = await response.json();

    console.log("Fetched calendar list:", calendarList);

    return NextResponse.json(calendarList);
  } catch (error) {
    console.error("Error fetching calendar list:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar list" },
      { status: 500 }
    );
  }
}
