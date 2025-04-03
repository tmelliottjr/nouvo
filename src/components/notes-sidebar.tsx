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
import { ThemeToggle } from "./themes/theme-toggle";

export function NotesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { noteTree: notes, addNote, addFolder } = useNotes();

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nouvo</SidebarGroupLabel>
          <ThemeToggle />
          <SidebarGroupContent>
            <SidebarMenu>testst</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>

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
  function handleNameChange(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onNameChange(event.currentTarget.value);
    }
  }

  return (
    <SidebarMenuItem key={folder.id}>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {folder.name ? (
              folder.name
            ) : (
              <Input className="h-5" autoFocus onKeyDown={handleNameChange} />
            )}
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
