"use client";

import { DraggableNotesTree } from "./DraggableNotesTree";

interface NotesTreeProps {
  parentId?: string | null;
}

export function NotesTree({ parentId = null }: NotesTreeProps) {
  return <DraggableNotesTree parentId={parentId} />;
}
