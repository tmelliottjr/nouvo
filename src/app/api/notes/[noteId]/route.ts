import { getAuthUser } from "@/lib/auth";
import { getSharedNoteById } from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET endpoint to retrieve a single note by ID
 * Handles both user-owned notes and notes shared with the user
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  try {
    // Get the currently authenticated user
    const authUser = await getAuthUser();
    if (!authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { noteId } = await params;

    // Get the note with share information
    const { note, access, isOwner } = await getSharedNoteById(
      authUser.id,
      noteId
    );

    // If no note found or user doesn't have access
    if (!note) {
      return NextResponse.json(
        { error: "Note not found or access denied" },
        { status: 404 }
      );
    }

    // Return the note with permission information
    return NextResponse.json({
      ...note,
      isOwner,
      permission: access?.permission || (isOwner ? "write" : "read"),
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}
