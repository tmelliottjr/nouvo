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
import { useFolderExpansion } from "@/hooks/use-folder-expansion";
import strings from "@/lib/strings";
import {
  FolderNode as FolderNodeType,
  useNotes,
} from "@/state-providers/use-notes";
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

interface FolderNodeProps {
  folder: FolderNodeType;
  onNameChange: (name: string) => void;
}

export function FolderNode({ folder, onNameChange }: FolderNodeProps) {
  const {
    selectFolder,
    expandedFolderIds,
    setFolderExpanded,
    isDirectPathToNote,
    isFromUrl,
    addNote,
    addFolder,
    updateFolder,
  } = useNotes();

  const [isRenaming, setIsRenaming] = useState(false);
  // Use the global expanded state instead of local state
  const isOpen = expandedFolderIds.has(folder.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  // Use our custom hook for folder expansion animation
  const { animationClass } = useFolderExpansion(
    folder.id,
    isFromUrl,
    isDirectPathToNote
  );

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        onNameChange(value);
        // Only select the folder after naming it
        selectFolder(folder.id);
      }
    } else if (event.key === "Escape") {
      // We don't delete folders on cancel since they might contain notes
      // Just set a default name instead
      onNameChange("New Folder");
      // Select the folder after naming
      selectFolder(folder.id);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value) {
      onNameChange(value);
      // Only select the folder after naming it
      selectFolder(folder.id);
    } else {
      // We don't delete folders on empty name since they might contain notes
      // Just set a default name instead
      onNameChange("New Folder");
      // Select the folder after naming
      selectFolder(folder.id);
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
      setFolderExpanded(folder.id, !isOpen);
    }
    // If it doesn't have a name, do nothing - user needs to name it first
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
    addFolder(folder.id);
  }

  function handleRename(e: React.MouseEvent) {
    e.stopPropagation();
    setIsRenaming(true);
  }

  // Ensure input is focused
  useEffect(() => {
    if (!folder.name && inputRef.current) {
      inputRef.current.focus();
    }
  }, [folder.name]);

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
            // Now the delete action is handled directly in FolderNodeContent
            onClick: (e) => e.stopPropagation(),
            destructive: true,
          },
        ]
      : []),
  ];

  return (
    <SidebarMenuItem key={folder.id}>
      <Collapsible
        className={`[&[data-state=open]>button>svg:first-child]:rotate-90 ${animationClass}`}
        open={isOpen}
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
            <NotesTree notes={folder.children} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
