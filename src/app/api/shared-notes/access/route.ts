import { getAuthUser } from "@/lib/auth";
import { getSharedNoteById } from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET endpoint to retrieve access information for a shared note
 * This is used by the note-view component to determine read-only vs. writable status
 */
export async function GET(request: NextRequest) {
  try {
    // Get the currently authenticated user
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the query parameters
    const url = new URL(request.url);
    const noteId = url.searchParams.get("noteId");
    const userId = url.searchParams.get("userId");

    // Ensure both parameters are provided
    if (!noteId || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Only allow users to fetch their own access information for security
    if (userId !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Fetch shared note access information
    const { access, isOwner } = await getSharedNoteById(userId, noteId);

    // Return the access information
    if (isOwner) {
      // If the user is the owner, they have full permissions
      return NextResponse.json({
        permission: "write",
        isOwner: true,
      });
    } else if (access) {
      // Return the specific access permission for a shared note
      return NextResponse.json({
        permission: access.permission,
        sharedBy: access.userId,
        sharedAt: access.createdAt,
        isOwner: false,
      });
    } else {
      // No access found
      return NextResponse.json(
        { error: "No access to this note" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching shared note access:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared note access" },
      { status: 500 }
    );
  }
}
