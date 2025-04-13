"use client";

import { Button } from "@/components/ui/button";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FolderPlus } from "lucide-react";

interface AddFolderButtonProps {
  parentId: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showTooltip?: boolean;
}

export function AddFolderButton({
  parentId,
  variant = "ghost",
  size = "icon",
  className = "",
  showTooltip = false,
}: AddFolderButtonProps) {
  const { addFolder } = useNotes();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    addFolder(parentId);
  };

  // Always return the button without tooltip
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={strings.notes.folderView.addFolder.ariaLabel}
    >
      <FolderPlus className="h-4 w-4" />
      {size !== "icon" && (
        <span>{strings.notes.folderView.addFolder.label}</span>
      )}
    </Button>
  );
}
