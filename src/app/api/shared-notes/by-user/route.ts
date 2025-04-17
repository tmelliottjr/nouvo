import { getAuthUser } from "@/lib/auth";
import { getNotesSharedWithUser } from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET endpoint to retrieve all notes shared with the specified user
 * Requires authentication
 */
export async function GET(req: NextRequest) {
  try {
    // Get the currently authenticated user
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Extract the user ID from the query parameters
    const userId = req.nextUrl.searchParams.get("userId");

    // Ensure userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    // Only allow users to fetch their own shared notes for security
    if (userId !== authUser.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Fetch shared notes for the user
    const sharedNotes = await getNotesSharedWithUser(userId);

    // Return the shared notes as JSON
    return NextResponse.json(sharedNotes);
  } catch (error) {
    console.error("Error fetching shared notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared notes" },
      { status: 500 }
    );
  }
}
