"use client";

import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  File,
  FileEdit,
  Folder,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { DeleteFolderDialog } from "./notes/delete-folder-dialog";
import { ThemeSelector } from "./themes/theme-selector";

// New SidebarLink component that uses Next.js Link
interface SidebarLinkProps {
  href: string;
  isActive?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}

function SidebarLink({
  href,
  isActive,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md w-full ${
        isActive
          ? "bg-accent text-accent-foreground tree-item-selected"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${className || ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

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
          <Link
            href="/notes"
            className="flex items-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md px-2 py-1"
          >
            <SidebarGroupLabel className="text-base font-semibold">
              Notes
            </SidebarGroupLabel>
          </Link>
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
            <FolderPlus />{" "}
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
    addFolder,
    deleteFolder,
    updateFolder,
  } = useNotes();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // Use the global expanded state instead of local state
  const isOpen = expandedFolderIds.has(folder.id);
  const [isAutoExpanding, setIsAutoExpanding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

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

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
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
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarMenuItem key={folder.id}>
            <Collapsible
              className={`[&[data-state=open]>button>svg:first-child]:rotate-90 ${animationClass}`}
              open={isOpen}
              onOpenChange={handleOpenChange}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="collapsible-trigger relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  <div
                    className="flex items-center flex-1 cursor-pointer"
                    onClick={handleFolderClick}
                  >
                    <Folder
                      className={`h-4 w-4 text-amber-500 mr-2 flex-shrink-0 ${
                        isHovered ? "opacity-70" : ""
                      }`}
                    />
                    {!folder.name ? (
                      <Input
                        ref={inputRef}
                        className="h-5"
                        autoFocus
                        onKeyDown={handleNameChange}
                        onBlur={handleBlur}
                        placeholder="Enter folder name..."
                      />
                    ) : isRenaming ? (
                      <Input
                        ref={renameInputRef}
                        className="h-5"
                        defaultValue={folder.name}
                        autoFocus
                        onKeyDown={handleRenameKeyDown}
                        onBlur={handleRenameBlur}
                        placeholder={
                          strings.notes.folderView.rename.placeholder
                        }
                      />
                    ) : (
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
                    )}
                  </div>

                  {/* Add buttons on Hover */}
                  {isHovered && folder.name && (
                    <div
                      className="absolute right-2 opacity-100 transition-opacity flex gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground rounded-md flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          addNote(folder.id);
                        }}
                        aria-label={strings.notes.folderView.addNote.ariaLabel}
                      >
                        <FileEdit className="h-4 w-4" />
                      </div>
                      <div
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground rounded-md flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          addFolder(folder.id);
                        }}
                        aria-label={
                          strings.notes.folderView.addFolder.ariaLabel
                        }
                      >
                        <FolderPlus className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={`overflow-hidden ${animationClass}`}
              >
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
          <ContextMenuItem onClick={handleAddFolder} className="cursor-pointer">
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>{strings.notes.contextMenu.addFolder}</span>
          </ContextMenuItem>
          {folder.name && (
            <>
              <ContextMenuItem
                onClick={handleRename}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>{strings.notes.contextMenu.rename}</span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={handleDelete}
                className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>{strings.notes.contextMenu.delete}</span>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* Delete confirmation dialog */}
      {folder.name && (
        <DeleteFolderDialog
          folder={folder}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        />
      )}
    </>
  );
}

function NoteNode({
  noteNode,
  onNameChange,
}: {
  noteNode: Note;
  onNameChange: (name: string) => void;
}) {
  const { selectNote, currentNote, deleteNote, updateNote } = useNotes();
  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  function handleRenameKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        updateNote(noteNode.id, { name: value });
        setIsRenaming(false);
      }
    } else if (event.key === "Escape") {
      setIsRenaming(false);
    }
  }

  function handleRenameBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value) {
      updateNote(noteNode.id, { name: value });
    }
    setIsRenaming(false);
  }

  function handleRename(e: React.MouseEvent) {
    e.stopPropagation();
    setIsRenaming(true);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  }

  function handleDeleteConfirm() {
    deleteNote(noteNode.id);
    setIsDeleteDialogOpen(false);
  }

  // Ensure input is focused
  useEffect(() => {
    if (!noteNode.name && inputRef.current) {
      inputRef.current.focus();
    }
  }, [noteNode.name]);

  // Ensure rename input is focused when renaming
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          {!noteNode.name ? (
            // For new notes without a name, render the input field
            <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full">
              <File className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
              <Input
                ref={inputRef}
                className="h-7"
                autoFocus
                onKeyDown={handleNameChange}
                onBlur={handleBlur}
                placeholder="Enter note name..."
              />
            </div>
          ) : isRenaming ? (
            // For notes being renamed, render the rename input field
            <div className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full">
              <File className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
              <Input
                ref={renameInputRef}
                className="h-7"
                defaultValue={noteNode.name}
                autoFocus
                onKeyDown={handleRenameKeyDown}
                onBlur={handleRenameBlur}
                placeholder={strings.notes.folderView.rename.placeholder}
              />
            </div>
          ) : (
            // For normal notes, use the SidebarLink component
            <SidebarLink
              href={`/notes/${noteNode.id}`}
              isActive={noteNode.id === currentNote?.id}
              className="relative tree-item"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center flex-1">
                <File
                  className={`h-4 w-4 text-indigo-500 mr-2 flex-shrink-0 ${
                    isHovered ? "opacity-70" : ""
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-foreground text-sm font-normal truncate">
                        {noteNode.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      {noteNode.name}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Add delete button on hover */}
              {isHovered && (
                <div
                  className="h-6 w-6 p-0 rounded-sm opacity-100 text-muted-foreground hover:text-destructive transition-colors cursor-pointer flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default navigation behavior
                    e.stopPropagation(); // Stop event propagation to parent elements
                    handleDelete(e);
                  }}
                  aria-label={
                    strings.notes.folderView.deleteButton?.ariaLabel ||
                    "Delete note"
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </div>
              )}
            </SidebarLink>
          )}
        </ContextMenuTrigger>

        {/* Context Menu for right-click */}
        <ContextMenuContent className="w-52">
          {noteNode.name && (
            <>
              <ContextMenuItem
                onClick={handleRename}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>{strings.notes.contextMenu.rename}</span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={handleDelete}
                className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>{strings.notes.contextMenu.delete}</span>
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* Delete confirmation dialog */}
      {noteNode.name && (
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {strings.notes.deleteDialog.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {strings.notes.deleteDialog.description(noteNode.name)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{strings.common.cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                {strings.common.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
