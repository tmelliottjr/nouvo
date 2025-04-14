"use client";

import { Button } from "@/components/ui/button";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FileEdit } from "lucide-react";
import React from "react";

interface AddNoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  folderId?: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
}

export function AddNoteButton({
  folderId,
  variant = "ghost",
  size = "icon",
  className = "",
  asChild = false,
  ...props
}: AddNoteButtonProps) {
  const { addNote } = useNotes();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    const noteId = addNote(folderId);

    // We don't auto-complete the note creation like folders
    // Instead, the user will be prompted to enter a name
    // This is handled in the NoteNode component
  };

  // Always return the button without tooltip
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={strings.notes.folderView.addNote.ariaLabel}
      asChild={asChild}
      {...props}
    >
      {!asChild && (
        <>
          <FileEdit className="h-4 w-4" />
          {size !== "icon" && (
            <span>{strings.notes.folderView.addNote.label}</span>
          )}
        </>
      )}
    </Button>
  );
}
