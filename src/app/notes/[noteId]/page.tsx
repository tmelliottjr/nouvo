"use client";

import { NoteView } from "@/components/notes/note-view";
import { useNotes } from "@/state-providers/use-notes";
import { useParams } from "next/navigation";

export default function NoteRoute() {
  const params = useParams();
  const { selectNote } = useNotes();
  const noteId = params.noteId as string;

  selectNote(noteId);

  return <NoteView />;
}
