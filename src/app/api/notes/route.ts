import { getAuthUser } from "@/lib/auth";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  searchNotes,
  updateNote,
} from "@/lib/notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const noteId = url.searchParams.get("id");
    const searchQuery = url.searchParams.get("search");

    // If noteId is provided, get a specific note
    if (noteId) {
      const note = await getNoteById(user.id, noteId);
      if (!note) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
      return NextResponse.json(note);
    }

    // If search query is provided, search notes
    if (searchQuery) {
      const notes = await searchNotes(user.id, searchQuery);
      return NextResponse.json(notes);
    }

    // Otherwise, get all notes for the user
    const notes = await getNotes(user.id);
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
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

    // Get note data from request body
    const noteData = await request.json();

    // Validate required fields
    if (!noteData.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Create a new note in the database
    const note = await createNote(user.id, {
      name: noteData.name,
      content: noteData.content || "",
      parentId: noteData.parentId,
      tags: noteData.tags,
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get note update data from request body
    const noteData = await request.json();

    // Validate required fields
    if (!noteData.id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Update note in the database
    const updatedNote = await updateNote(user.id, {
      id: noteData.id,
      title: noteData.title,
      content: noteData.content,
      folderId: noteData.folderId,
      tags: noteData.tags,
    });

    if (!updatedNote) {
      return NextResponse.json(
        { error: "Note not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
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
    // Get note ID from query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Delete note from the database
    const success = await deleteNote(user.id, id);

    if (!success) {
      return NextResponse.json(
        { error: "Note not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
