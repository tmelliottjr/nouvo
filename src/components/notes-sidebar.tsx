"use client";

import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  File,
  FileEdit,
  Folder,
  FolderPlusIcon,
} from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Note,
  useNotes,
  type FolderNode,
  type NoteTree,
} from "../state-providers/use-notes";
import { ThemeSelector } from "./themes/theme-selector";

export function NotesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const {
    noteTree: notes,
    addNote,
    addFolder,
    setSelectedItemId,
    setIsViewingFolder,
  } = useNotes();

  const handleNotesHeaderClick = () => {
    // Set to null to navigate to top-level folder view
    setSelectedItemId(null);
    // Ensure we're in folder view mode
    setIsViewingFolder(true);
  };

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <h1 className="text-xl font-bold tracking-tight">Nouvo</h1>
            <ThemeSelector />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>testst</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <div
            className="flex items-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md px-2 py-1"
            onClick={handleNotesHeaderClick}
          >
            <SidebarGroupLabel className="text-base font-semibold">
              Notes
            </SidebarGroupLabel>
          </div>

          <SidebarGroupAction
            title="New Note"
            className="mr-6 cursor-pointer"
            onClick={() => addNote()}
          >
            <FileEdit /> <span className="sr-only">New Note</span>
          </SidebarGroupAction>
          <SidebarGroupAction
            title="New Folder"
            className="cursor-pointer"
            onClick={() => addFolder()}
          >
            <FolderPlusIcon />{" "}
            <span className="sr-only cursor-pointer">New Folder</span>
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              <NotesTree notes={notes} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function NotesTree({ notes }: { notes: NoteTree }) {
  const { updateNote, updateFolder } = useNotes();

  return (
    <div className="staggered-container">
      {notes.map((noteOrFolder) => {
        if ("children" in noteOrFolder) {
          return (
            <div key={noteOrFolder.id} className="staggered-item">
              <FolderNode
                folder={noteOrFolder}
                onNameChange={(name) => updateFolder(noteOrFolder.id, { name })}
              />
            </div>
          );
        }

        return (
          <div key={noteOrFolder.id} className="staggered-item">
            <NoteNode
              noteNode={noteOrFolder}
              onNameChange={(name) => updateNote(noteOrFolder.id, { name })}
            />
          </div>
        );
      })}
    </div>
  );
}

function FolderNode({
  folder,
  onNameChange,
}: {
  folder: FolderNode;
  onNameChange: (name: string) => void;
}) {
  const {
    selectFolder,
    expandedFolderIds,
    setFolderExpanded,
    isDirectPathToNote,
    isFromUrl,
  } = useNotes();

  // Use the global expanded state instead of local state
  const isOpen = expandedFolderIds.has(folder.id);
  const [isAutoExpanding, setIsAutoExpanding] = useState(false);

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onNameChange(event.currentTarget.value);
    }
  }

  function handleFolderClick() {
    selectFolder(folder.id);
  }

  function handleOpenChange(open: boolean) {
    setFolderExpanded(folder.id, open);
  }

  // Handle initial expansion when navigating via URL
  useEffect(() => {
    if (isFromUrl && isDirectPathToNote(folder.id)) {
      setIsAutoExpanding(true);

      // Reset the auto-expanding flag after animation completes
      const timer = setTimeout(() => {
        setIsAutoExpanding(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isFromUrl, folder.id, isDirectPathToNote]);

  // Determine animation class based on auto-expansion
  const animationClass = isAutoExpanding
    ? "transition-all duration-300 ease-in-out"
    : "transition-all duration-150 ease-in-out";

  return (
    <SidebarMenuItem key={folder.id}>
      <Collapsible
        className={`group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90 ${animationClass}`}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="collapsible-trigger">
            <ChevronRight className="transition-transform duration-200" />
            <div
              className="flex items-center flex-1 cursor-pointer"
              onClick={handleFolderClick}
            >
              <Folder className="mr-2 shrink-0" />
              {folder.name ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="sidebar-text-truncate">{folder.name}</span>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="start">
                    {folder.name}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Input className="h-5" autoFocus onKeyDown={handleNameChange} />
              )}
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className={`overflow-hidden ${animationClass}`}>
          <SidebarMenuSub className="animate-slideDownAndFade">
            <NotesTree notes={folder.children} />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

function NoteNode({
  noteNode,
  onNameChange,
}: {
  noteNode: Note;
  onNameChange: (name: string) => void;
}) {
  const { selectNote, currentNote } = useNotes();

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onNameChange(event.currentTarget.value);
    }
  }

  return (
    <SidebarMenuButton
      isActive={noteNode.id === currentNote?.id}
      className="data-[active=true]:bg-stone-400"
      key={noteNode.id}
      onClick={() => selectNote(noteNode.id)}
    >
      <File className="shrink-0" />
      {noteNode.name ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="sidebar-text-truncate">{noteNode.name}</span>
          </TooltipTrigger>
          <TooltipContent side="right" align="start">
            {noteNode.name}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Input className="h-7" autoFocus onKeyDown={handleNameChange} />
      )}
    </SidebarMenuButton>
  );
}
