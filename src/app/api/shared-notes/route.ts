import { getAuthUser } from "@/lib/auth";
import {
  getNotesSharedWithUser,
  getSharedNoteById,
  getSharedNotes,
  getSharedNoteUsers,
  revokeShare,
  shareNote,
} from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Parse the query parameters
    const url = new URL(request.url);
    const noteId = url.searchParams.get("noteId");
    const targetUserId = url.searchParams.get("userId");
    const shareId = url.searchParams.get("shareId");

    // Determine what type of shared note query we're handling
    if (shareId) {
      // Get a specific shared note by ID with access info
      const { note, access, isOwner } = await getSharedNoteById(
        user.id,
        shareId
      );

      if (!note) {
        return NextResponse.json(
          { error: "Note not found or you don't have access to it" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        note,
        access,
        isOwner,
      });
    } else if (noteId) {
      // Get all users with access to a specific note
      const sharedUsers = await getSharedNoteUsers(noteId);
      return NextResponse.json(sharedUsers);
    } else if (targetUserId) {
      // Get all notes a user has access to
      const sharedNotes = await getNotesSharedWithUser(targetUserId);
      return NextResponse.json(sharedNotes);
    } else {
      // Get all shared notes for the current user
      const sharedNotes = await getSharedNotes(user.id);
      return NextResponse.json(sharedNotes);
    }
  } catch (error) {
    console.error("Error fetching shared notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch shared notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get share data from request body
    const shareData = await request.json();

    // Validate required fields
    if (!shareData.noteId || !shareData.userEmail || !shareData.permission) {
      return NextResponse.json(
        { error: "noteId, userEmail, and permission are required" },
        { status: 400 }
      );
    }

    // Use the shareNote function to handle database operations
    const result = await shareNote(user.id, {
      noteId: shareData.noteId,
      userEmail: shareData.userEmail,
      permission: shareData.permission,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Error sharing note:", error);
    return NextResponse.json(
      { error: error.message || "Failed to share note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get shared note ID and note ID from query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const noteId = url.searchParams.get("noteId");

    if (!id || !noteId) {
      return NextResponse.json(
        { error: "Shared note ID and note ID are required" },
        { status: 400 }
      );
    }

    // Use the revokeShare function to handle database operations
    const success = await revokeShare(user.id, noteId, id);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to revoke note access" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error revoking note access:", error);
    return NextResponse.json(
      { error: error.message || "Failed to revoke note access" },
      { status: 500 }
    );
  }
}
