"use client";

import { useConfirmDeleteNote } from "@/hooks/use-confirm-delete-note";
import { NoteNode as NoteNodeType } from "@/lib/seed-data";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { ContextMenuWrapper } from "./tree-components/ContextMenuWrapper";
import { NoteNodeContent } from "./tree-components/NoteNodeContent";
import { TreeNodeInput } from "./tree-components/TreeNodeInput";

interface NoteNodeProps {
  noteNode: NoteNodeType;
  onNameChange: (name: string) => void;
  isDraggable?: boolean;
}

export function NoteNode({
  noteNode,
  onNameChange,
  isDraggable = false,
}: NoteNodeProps) {
  const {
    currentNote,
    deleteNote,
    updateNote,
    creationStateById,
    completeNodeCreation,
    selectNote,
  } = useNotes();
  const { confirmDelete } = useConfirmDeleteNote();

  // Local state to manage renaming and new node status
  const [isRenaming, setIsRenaming] = useState(false);

  // Input ref for auto-focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if this node is being created or edited
  const creationState = creationStateById?.[noteNode.id];
  const isInCreationState =
    creationState?.status === "creating" || creationState?.status === "editing";

  // Use creation state from our normalized structure, or fallback to local state
  const showInput = isInCreationState || isRenaming;

  // Set up draggable functionality if enabled
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: noteNode.id,
    disabled: !isDraggable || isInCreationState || isRenaming,
    data: {
      type: "note",
      id: noteNode.id,
    },
  });

  // Handle input blur for both rename and creation cases
  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();

    if (isInCreationState) {
      if (value) {
        // Complete the creation process with the given name
        completeNodeCreation(noteNode.id, value);
      } else {
        // Use default name instead of deleting
        completeNodeCreation(noteNode.id, "New Note");
      }
    } else if (isRenaming) {
      // Regular rename case
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
        if (isInCreationState) {
          completeNodeCreation(noteNode.id, value);
        } else {
          updateNote(noteNode.id, { name: value });
          setIsRenaming(false);
          // Select note after renaming
          selectNote(noteNode.id);
        }
      } else if (isInCreationState) {
        // Use default name instead of deleting
        completeNodeCreation(noteNode.id, "New Note");
      }
    } else if (event.key === "Escape") {
      if (isInCreationState) {
        // Use default name instead of deleting
        completeNodeCreation(noteNode.id, "New Note");
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

  // Auto-focus input when in creation state or renaming
  useEffect(() => {
    if ((isInCreationState || isRenaming) && inputRef.current) {
      inputRef.current.focus();
      if (isRenaming) {
        inputRef.current.select();
      }
    }
  }, [isInCreationState, isRenaming]);

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
  if (showInput) {
    return (
      <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full">
        <TreeNodeInput
          ref={inputRef}
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
    <div
      ref={isDraggable ? setNodeRef : undefined}
      className={`
        transition-all duration-200
        ${isDragging ? "opacity-50 scale-95" : ""}
      `}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
    >
      <ContextMenuWrapper menuItems={noteContextMenuItems}>
        <SidebarLink
          href={`/notes/${noteNode.id}`}
          isActive={noteNode.id === currentNote?.id}
          className={`relative tree-item ${
            isDraggable ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        >
          <NoteNodeContent noteNode={noteNode} />
        </SidebarLink>
      </ContextMenuWrapper>
    </div>
  );
}
