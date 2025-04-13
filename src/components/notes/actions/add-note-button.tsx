"use client";

import { Button } from "@/components/ui/button";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FileEdit } from "lucide-react";

interface AddNoteButtonProps {
  folderId: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showTooltip?: boolean;
}

export function AddNoteButton({
  folderId,
  variant = "ghost",
  size = "icon",
  className = "",
  showTooltip = false, // Changed default to false to remove tooltips
}: AddNoteButtonProps) {
  const { addNote } = useNotes();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    addNote(folderId);
  };

  // Always return the button without tooltip
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={strings.notes.folderView.addNote.ariaLabel}
    >
      <FileEdit className="h-4 w-4" />
      {size !== "icon" && <span>{strings.notes.folderView.addNote.label}</span>}
    </Button>
  );
}
