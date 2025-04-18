import { getPublicNoteById } from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; noteId: string } }
) {
  const { userId, noteId } = await params;

  try {
    // Get the public note
    const note = await getPublicNoteById(userId, noteId);

    if (!note) {
      return NextResponse.json(
        { error: "Note not found or not publicly available" },
        { status: 404 }
      );
    }

    // Return the public note
    return NextResponse.json(note);
  } catch (error) {
    console.error("Error fetching public note:", error);
    return NextResponse.json(
      { error: "Failed to fetch public note" },
      { status: 500 }
    );
  }
}
