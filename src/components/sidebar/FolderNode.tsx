"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { useConfirm } from "@/hooks/use-confirm";
import { useFolderExpansion } from "@/hooks/use-folder-expansion";
import { FolderNode as FolderNodeType } from "@/lib/seed-data";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import {
  ChevronRight,
  FileEdit,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { NotesTree } from "./NotesTree";
import { ContextMenuWrapper } from "./tree-components/ContextMenuWrapper";
import { FolderNodeContent } from "./tree-components/FolderNodeContent";
import { TreeNodeInput } from "./tree-components/TreeNodeInput";

interface FolderNodeProps {
  folder: FolderNodeType;
  onNameChange?: (name: string) => void;
}

export function FolderNode({ folder, onNameChange }: FolderNodeProps) {
  const {
    deleteFolder,
    addNote,
    addFolder: addFolderToFolder,
    isDirectPathToNote,
    expandedFolderIds,
    setFolderExpanded,
    selectFolder,
    updateFolder,
    creationStateById,
    completeNodeCreation,
  } = useNotes();
  const { confirm } = useConfirm();

  // Local state for rename functionality
  const [isRenaming, setIsRenaming] = useState(false);

  // Check if folder is in creation state
  const creationState = creationStateById?.[folder.id];
  const isInCreationState =
    creationState?.status === "creating" || creationState?.status === "editing";

  // Input refs for better focus management - using non-null assertion
  const inputRef = useRef<HTMLInputElement>(null!);
  const renameInputRef = useRef<HTMLInputElement>(null!);

  const isExpanded = expandedFolderIds.has(folder.id);
  const isInPath = isDirectPathToNote(folder.id);

  // Use our custom hook for folder expansion animation
  const { animationClass } = useFolderExpansion(
    folder.id,
    isInPath,
    isDirectPathToNote
  );

  // Determine if we should show input based on creation state or rename state
  const showInput = isInCreationState || isRenaming;

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        if (isInCreationState) {
          completeNodeCreation(folder.id, value);
        } else {
          if (onNameChange) onNameChange(value);
          selectFolder(folder.id);
        }
      }
    } else if (event.key === "Escape") {
      if (isInCreationState) {
        completeNodeCreation(folder.id, "New Folder");
      } else {
        if (onNameChange) onNameChange("New Folder");
        selectFolder(folder.id);
      }
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value) {
      if (isInCreationState) {
        completeNodeCreation(folder.id, value);
      } else {
        if (onNameChange) onNameChange(value);
        selectFolder(folder.id);
      }
    } else {
      if (isInCreationState) {
        completeNodeCreation(folder.id, "New Folder");
      } else {
        if (onNameChange) onNameChange("New Folder");
        selectFolder(folder.id);
      }
    }
  }

  function handleRenameKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        updateFolder(folder.id, { name: value });
        setIsRenaming(false);
      }
    } else if (event.key === "Escape") {
      setIsRenaming(false);
    }
  }

  function handleRenameBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value) {
      updateFolder(folder.id, { name: value });
    }
    setIsRenaming(false);
  }

  // Click handler depends on whether the folder has a name
  function handleFolderClick(e: React.MouseEvent) {
    e.stopPropagation();
    // Toggle folder expansion instead of navigation
    if (folder.name) {
      setFolderExpanded(folder.id, !isExpanded);
    }
  }

  function handleOpenChange(open: boolean) {
    setFolderExpanded(folder.id, open);
  }

  function handleAddNote(e: React.MouseEvent) {
    e.stopPropagation();
    addNote(folder.id);
  }

  function handleAddFolder(e: React.MouseEvent) {
    e.stopPropagation();
    addFolderToFolder(folder.id);
  }

  function handleRename(e: React.MouseEvent) {
    e.stopPropagation();
    setIsRenaming(true);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const confirmMessage = strings.notes.deleteDialog.folderDescription(
      folder.name
    );

    const confirmed = await confirm({
      title: strings.notes.deleteDialog.folderTitle,
      description: confirmMessage,
      confirmText: strings.common.delete,
      cancelText: strings.common.cancel,
    });

    if (confirmed) {
      deleteFolder(folder.id);
    }
  }

  // Ensure input is focused when in creation state
  useEffect(() => {
    if (isInCreationState && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInCreationState]);

  // Ensure rename input is focused when renaming
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  // Create folder action menu items for context menu
  const folderContextMenuItems = [
    {
      icon: <FileEdit className="mr-2 h-4 w-4" />,
      label: strings.notes.contextMenu.addNote,
      onClick: handleAddNote,
    },
    {
      icon: <FolderPlus className="mr-2 h-4 w-4" />,
      label: strings.notes.contextMenu.addFolder,
      onClick: handleAddFolder,
    },
    ...(folder.name
      ? [
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
        ]
      : []),
  ];

  // If in creation or rename state, show input
  if (showInput) {
    return (
      <SidebarMenuItem key={folder.id}>
        <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full">
          <TreeNodeInput
            autoFocus
            className="flex-1 min-w-0"
            inputRef={isInCreationState ? inputRef : renameInputRef}
            onKeyDown={isRenaming ? handleRenameKeyDown : handleNameChange}
            onBlur={isRenaming ? handleRenameBlur : handleBlur}
            initialValue={folder.name}
            placeholder={strings.notes.folderView.rename.placeholder}
          />
        </div>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem key={folder.id}>
      <Collapsible
        className={`[&[data-state=open]>button>svg:first-child]:rotate-90 ${animationClass}`}
        open={isExpanded}
        onOpenChange={handleOpenChange}
      >
        <ContextMenuWrapper menuItems={folderContextMenuItems}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="collapsible-trigger relative">
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
              <div
                className="flex items-center flex-1 cursor-pointer"
                onClick={handleFolderClick}
              >
                <FolderNodeContent
                  folder={folder}
                  isRenaming={isRenaming}
                  inputRef={inputRef}
                  renameInputRef={renameInputRef}
                  onNameChange={handleNameChange}
                  onBlur={handleBlur}
                  onRenameKeyDown={handleRenameKeyDown}
                  onRenameBlur={handleRenameBlur}
                  onAddNote={handleAddNote}
                  onAddFolder={handleAddFolder}
                  onRename={handleRename}
                />
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </ContextMenuWrapper>
        <CollapsibleContent className={`overflow-hidden ${animationClass}`}>
          <SidebarMenuSub className="animate-slideDownAndFade">
            <NotesTree parentId={folder.id} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
