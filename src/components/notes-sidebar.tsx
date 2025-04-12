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

  return notes.map((noteOrFolder) => {
    if ("children" in noteOrFolder) {
      return (
        <FolderNode
          folder={noteOrFolder}
          key={noteOrFolder.id}
          onNameChange={(name) => updateFolder(noteOrFolder.id, { name })}
        />
      );
    }

    return (
      <NoteNode
        noteNode={noteOrFolder}
        key={noteOrFolder.id}
        onNameChange={(name) => updateNote(noteOrFolder.id, { name })}
      />
    );
  });
}

function FolderNode({
  folder,
  onNameChange,
}: {
  folder: FolderNode;
  onNameChange: (name: string) => void;
}) {
  const { selectFolder } = useNotes();

  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onNameChange(event.currentTarget.value);
    }
  }

  function handleFolderClick() {
    selectFolder(folder.id);
  }

  return (
    <SidebarMenuItem key={folder.id}>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="collapsible-trigger">
            <ChevronRight className="transition-transform" />
            <div
              className="flex items-center flex-1 cursor-pointer"
              onClick={handleFolderClick}
            >
              <Folder className="mr-2" />
              {folder.name ? (
                <span>{folder.name}</span>
              ) : (
                <Input className="h-5" autoFocus onKeyDown={handleNameChange} />
              )}
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
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
      {/* TODO: Make file / folder edit name component w/ icons */}
      <File />
      {noteNode.name ? (
        noteNode.name
      ) : (
        <Input className="h-7" autoFocus onKeyDown={handleNameChange} />
      )}
    </SidebarMenuButton>
  );
}
