"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useConfirm } from "@/hooks/use-confirm";
import strings from "@/lib/strings";
import { FolderNode, useNotes } from "@/state-providers/use-notes";
import { FileEdit, Folder, FolderPlus, Trash2 } from "lucide-react";
import React from "react";
import { TreeNodeAction } from "./TreeNodeAction";
import { TreeNodeActions } from "./TreeNodeActions";
import { TreeNodeInput } from "./TreeNodeInput";

interface FolderNodeContentProps {
  folder: FolderNode;
  isRenaming: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  renameInputRef: React.RefObject<HTMLInputElement>;
  onNameChange: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onRenameKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onRenameBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onAddNote?: (e: React.MouseEvent) => void;
  onAddFolder?: (e: React.MouseEvent) => void;
  onRename?: (e: React.MouseEvent) => void;
}

export function FolderNodeContent({
  folder,
  isRenaming,
  inputRef,
  renameInputRef,
  onNameChange,
  onBlur,
  onRenameKeyDown,
  onRenameBlur,
  onAddNote,
  onAddFolder,
  onRename,
}: FolderNodeContentProps) {
  const { deleteFolder } = useNotes();
  const { confirm } = useConfirm();

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const confirmed = await confirm({
      title: strings.notes.deleteDialog.folderTitle,
      description: strings.notes.deleteDialog.folderDescription(folder.name),
      variant: "danger",
      confirmText: strings.common.delete,
      cancelText: strings.common.cancel,
    });

    if (confirmed) {
      deleteFolder(folder.id);
    }
  }

  return (
    <div className="flex items-center flex-1 group/folder">
      <Folder className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 hover:opacity-70" />
      {!folder.name ? (
        <TreeNodeInput
          inputRef={inputRef}
          onKeyDown={onNameChange}
          onBlur={onBlur}
          placeholder="Enter folder name..."
        />
      ) : isRenaming ? (
        <TreeNodeInput
          inputRef={renameInputRef}
          initialValue={folder.name}
          onKeyDown={onRenameKeyDown}
          onBlur={onRenameBlur}
          placeholder={strings.notes.folderView.rename.placeholder}
        />
      ) : (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="sidebar-text-truncate">{folder.name}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              {folder.name}
            </TooltipContent>
          </Tooltip>

          {folder.name && (
            <TreeNodeActions>
              <TreeNodeAction
                icon={<FileEdit className="h-4 w-4" />}
                onClick={onAddNote}
                className="hidden group-hover/folder:flex"
                ariaLabel={strings.notes.folderView.addNote.ariaLabel}
              />
              <TreeNodeAction
                icon={<FolderPlus className="h-4 w-4" />}
                onClick={onAddFolder}
                className="hidden group-hover/folder:flex"
                ariaLabel={strings.notes.folderView.addFolder.ariaLabel}
              />
              <TreeNodeAction
                icon={<Trash2 className="h-4 w-4" />}
                onClick={handleDelete}
                className="hidden group-hover/folder:flex"
                ariaLabel={
                  strings.notes.folderView.deleteButton?.ariaLabel ||
                  "Delete folder"
                }
                destructive
              />
            </TreeNodeActions>
          )}
        </>
      )}
    </div>
  );
}
