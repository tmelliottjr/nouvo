"use client";

import { Button } from "@/components/ui/button";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FolderPlus } from "lucide-react";
import React from "react";

interface AddFolderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  parentId?: string;
  variant?: "default" | "ghost" | "outline" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
}

export function AddFolderButton({
  parentId,
  variant = "ghost",
  size = "icon",
  className = "",
  asChild = false,
  ...props
}: AddFolderButtonProps) {
  const { addFolder, completeNodeCreation } = useNotes();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent propagation to parent elements
    const folderId = addFolder(parentId);

    // After a short delay, we can trigger the naming process
    setTimeout(() => {
      completeNodeCreation(folderId, "New Folder");
    }, 10);
  };

  // Always return the button without tooltip
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={strings.notes.folderView.addFolder.ariaLabel}
      asChild={asChild}
      {...props}
    >
      {!asChild && (
        <>
          <FolderPlus className="h-4 w-4" />
          {size !== "icon" && (
            <span>{strings.notes.folderView.addFolder.label}</span>
          )}
        </>
      )}
    </Button>
  );
}
