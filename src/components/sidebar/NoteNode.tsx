"use client";

import { useConfirmDeleteNote } from "@/hooks/use-confirm-delete-note";
import strings from "@/lib/strings";
import { Note, useNotes } from "@/state-providers/use-notes";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { ContextMenuWrapper } from "./tree-components/ContextMenuWrapper";
import { NoteNodeContent } from "./tree-components/NoteNodeContent";
import { TreeNodeInput } from "./tree-components/TreeNodeInput";

interface NoteNodeProps {
  noteNode: Note;
  onNameChange: (name: string) => void;
}

export function NoteNode({ noteNode, onNameChange }: NoteNodeProps) {
  const { currentNote, deleteNote, updateNote } = useNotes();
  const { confirmDelete } = useConfirmDeleteNote();

  // Local state to manage renaming and new node status
  const [isRenaming, setIsRenaming] = useState(false);
  const [isNewNode, setIsNewNode] = useState(noteNode.name === "");

  // Initialize new nodes in rename mode
  useEffect(() => {
    if (noteNode.name === "") {
      setIsNewNode(true);
      setIsRenaming(true);
    }
  }, [noteNode.name]);

  // Handle input blur for both rename and new note cases
  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();

    if (isNewNode) {
      if (value) {
        // Update the name for the new note
        onNameChange(value);
        setIsNewNode(false);
      } else {
        // Delete empty new notes on blur
        deleteNote(noteNode.id);
      }
    } else {
      // Rename case
      if (value) {
        updateNote(noteNode.id, { name: value });
      }
      // Clear renaming state
      setIsRenaming(false);
    }
  }

  // Handle keyboard input for both rename and new note cases
  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();

    if (event.key === "Enter") {
      if (value) {
        updateNote(noteNode.id, { name: value });
        setIsRenaming(false);
        if (isNewNode) {
          setIsNewNode(false);
        }
      } else if (isNewNode) {
        // Delete empty new notes when Enter is pressed
        deleteNote(noteNode.id);
      }
    } else if (event.key === "Escape") {
      if (isNewNode) {
        // Delete the note if it's new and user presses Escape
        deleteNote(noteNode.id);
      } else {
        // Cancel rename
        setIsRenaming(false);
      }
    }
  }

  function handleRename(e: React.MouseEvent) {
    e.stopPropagation();
    setIsRenaming(true);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    const confirmed = await confirmDelete(noteNode.name);
    if (confirmed) {
      deleteNote(noteNode.id);
    }
  }

  // Create note action menu items for context menu
  const noteContextMenuItems = [
    {
      icon: <Pencil className="mr-2 h-4 w-4" />,
      label: strings.notes.contextMenu.rename,
      onClick: handleRename,
    },
    {
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      label: strings.notes.contextMenu.delete,
      onClick: handleDelete,
      destructive: true,
    },
  ];

  // Show input when this note is being renamed or is new
  const showInput = isRenaming;

  if (showInput) {
    return (
      <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full">
        <TreeNodeInput
          autoFocus
          className="flex-1 min-w-0"
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          initialValue={noteNode.name}
          placeholder={strings.notes.folderView.rename.placeholder}
        />
      </div>
    );
  }

  return (
    <ContextMenuWrapper menuItems={noteContextMenuItems}>
      <SidebarLink
        href={`/notes/${noteNode.id}`}
        isActive={noteNode.id === currentNote?.id}
        className="relative tree-item"
      >
        <NoteNodeContent noteNode={noteNode} />
      </SidebarLink>
    </ContextMenuWrapper>
  );
}
