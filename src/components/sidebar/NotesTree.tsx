"use client";

import { NoteTree, useNotes } from "@/state-providers/use-notes";
import { FolderNode } from "./FolderNode";
import { NoteNode } from "./NoteNode";
import { TreeItemContainer } from "./tree-components/TreeItemContainer";

interface NotesTreeProps {
  notes: NoteTree;
}

export function NotesTree({ notes }: NotesTreeProps) {
  const { updateNote, updateFolder } = useNotes();

  // The key is to ensure each item has a stable identity
  // and its own isolated state context
  return (
    <div className="staggered-container">
      {notes.map((noteOrFolder) => {
        if ("children" in noteOrFolder) {
          return (
            <TreeItemContainer key={noteOrFolder.id} id={noteOrFolder.id}>
              <FolderNode
                folder={noteOrFolder}
                onNameChange={(name) => updateFolder(noteOrFolder.id, { name })}
              />
            </TreeItemContainer>
          );
        }

        return (
          <TreeItemContainer key={noteOrFolder.id} id={noteOrFolder.id}>
            <NoteNode
              noteNode={noteOrFolder}
              onNameChange={(name) => updateNote(noteOrFolder.id, { name })}
            />
          </TreeItemContainer>
        );
      })}
    </div>
  );
}
