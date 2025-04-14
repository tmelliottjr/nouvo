"use client";

import { NotesTree, SidebarSectionHeader } from "@/components/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNotes } from "@/state-providers/use-notes";
import { FileEdit, FolderPlus } from "lucide-react";
import React from "react";
import { NoteCalendar } from "./notes/note-calendar";
import { ThemeSelector } from "./themes/theme-selector";

export function NotesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { addNote, addFolder } = useNotes();

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

        {/* Calendar Component */}
        <SidebarGroup>
          <div className="px-0 py-2">
            <NoteCalendar />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarSectionHeader
            title="Notes"
            href="/notes"
            actions={[
              <SidebarGroupAction
                key="new-note"
                title="New Note"
                className="mr-6 cursor-pointer"
                onClick={() => addNote()}
              >
                <FileEdit /> <span className="sr-only">New Note</span>
              </SidebarGroupAction>,
              <SidebarGroupAction
                key="new-folder"
                title="New Folder"
                className="cursor-pointer"
                onClick={() => addFolder()}
              >
                <FolderPlus />{" "}
                <span className="sr-only cursor-pointer">New Folder</span>
              </SidebarGroupAction>,
            ]}
          />

          <SidebarGroupContent>
            <SidebarMenu>
              <NotesTree />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
