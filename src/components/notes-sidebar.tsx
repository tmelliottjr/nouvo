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
import { useEffect, useRef, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
import strings from "@/lib/strings";
import {
  Note,
  useNotes,
  type FolderNode,
  type NoteTree,
} from "../state-providers/use-notes";
import { AddNoteButton } from "./notes/actions/add-note-button";
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
    addNote,
    deleteNote,
    updateFolder,
  } = useNotes();

  // Use the global expanded state instead of local state
  const isOpen = expandedFolderIds.has(folder.id);
  const [isAutoExpanding, setIsAutoExpanding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Click handler depends on whether the folder has a name
  function handleFolderClick() {
    // Only select the folder if it already has a name
    if (folder.name) {
      selectFolder(folder.id);
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

  // Ensure input is focused
  useEffect(() => {
    if (!folder.name && inputRef.current) {
      inputRef.current.focus();
    }
  }, [folder.name]);

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
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <SidebarMenuItem key={folder.id}>
          <Collapsible
            className={`group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90 ${animationClass}`}
            open={isOpen}
            onOpenChange={handleOpenChange}
          >
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                className="collapsible-trigger relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <ChevronRight className="transition-transform duration-200" />
                <div
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={handleFolderClick}
                >
                  <Folder className="mr-2 shrink-0" />
                  {folder.name ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="sidebar-text-truncate">
                          {folder.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        {folder.name}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Input
                      ref={inputRef}
                      className="h-5"
                      autoFocus
                      onKeyDown={handleNameChange}
                      onBlur={handleBlur}
                      placeholder="Enter folder name..."
                    />
                  )}
                </div>

                {/* Add Note Button on Hover */}
                {isHovered && (
                  <div
                    className="absolute right-2 opacity-0 group-hover/collapsible:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AddNoteButton
                      folderId={folder.id}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    />
                  </div>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className={`overflow-hidden ${animationClass}`}>
              <SidebarMenuSub className="animate-slideDownAndFade">
                <NotesTree notes={folder.children} />
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </ContextMenuTrigger>

      {/* Context Menu for right-click */}
      <ContextMenuContent className="w-52">
        <ContextMenuItem onClick={handleAddNote} className="cursor-pointer">
          <FileEdit className="mr-2 h-4 w-4" />
          <span>{strings.notes.contextMenu.addNote}</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function NoteNode({
  noteNode,
  onNameChange,
}: {
  noteNode: Note;
  onNameChange: (name: string) => void;
}) {
  const { selectNote, currentNote, deleteNote } = useNotes();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        onNameChange(value);
        // Only select the note after naming it
        selectNote(noteNode.id);
      } else {
        // Delete note if name is empty
        deleteNote(noteNode.id);
      }
    } else if (event.key === "Escape") {
      // Delete note if user presses Escape
      deleteNote(noteNode.id);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value) {
      onNameChange(value);
      // Only select the note after naming it
      selectNote(noteNode.id);
    } else {
      // Delete note if name is empty on blur
      deleteNote(noteNode.id);
    }
  }

  // Ensure input is focused
  useEffect(() => {
    if (!noteNode.name && inputRef.current) {
      inputRef.current.focus();
    }
  }, [noteNode.name]);

  // Click handler depends on whether the note has a name
  function handleNoteClick() {
    // Only select the note if it already has a name
    if (noteNode.name) {
      selectNote(noteNode.id);
    }
    // If it doesn't have a name, do nothing - user needs to name it first
  }

  return (
    <SidebarMenuButton
      isActive={noteNode.id === currentNote?.id}
      className="data-[active=true]:bg-stone-400"
      key={noteNode.id}
      onClick={handleNoteClick}
    >
      <File className="shrink-0" />
      {noteNode.name ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="sidebar-text-truncate">{noteNode.name}</span>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            {noteNode.name}
          </TooltipContent>
        </Tooltip>
      ) : (
        <Input
          ref={inputRef}
          className="h-7"
          autoFocus
          onKeyDown={handleNameChange}
          onBlur={handleBlur}
          placeholder="Enter note name..."
        />
      )}
    </SidebarMenuButton>
  );
}
