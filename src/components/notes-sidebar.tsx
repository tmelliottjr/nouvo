"use client";

import { NotesTree } from "@/components/sidebar";
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
import { FileEdit, FolderPlus, Search, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { NoteCalendar } from "./notes/note-calendar";
import { TagSearchDialog } from "./notes/tag-search-dialog/TagSearchDialog";
import { ThemeSelector } from "./themes/theme-selector";

export function NotesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { addNote, addFolder } = useNotes();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  return (
    <Sidebar {...props}>
      <TagSearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <h1 className="text-xl font-bold tracking-tight">Nouvo</h1>
            <div className="flex items-center gap-2">
              <Link
                href="/settings"
                className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <ThemeSelector />
            </div>
          </div>
        </SidebarGroup>

        {/* Calendar Component */}
        <SidebarGroup>
          <div className="px-0 py-2">
            <NoteCalendar />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <h1 className="text-xl font-bold tracking-tight">Nouvo</h1>
            <div className="flex items-center gap-2">
              <SidebarGroupAction
                key="search-notes"
                title="Search by Tags"
                className="cursor-pointer p-0 h-8 w-8 cursor-pointer"
                onClick={() => setSearchDialogOpen(true)}
              >
                <Search className="h-5 w-5" />{" "}
                <span className="sr-only">Search by Tags</span>
              </SidebarGroupAction>
              ,
              <SidebarGroupAction
                key="new-note"
                title="New Note"
                className="p-0 h-8 w-8 cursor-pointer"
                onClick={() => addNote()}
              >
                <FileEdit className="h-5 w-5" />{" "}
                <span className="sr-only">New Note</span>
              </SidebarGroupAction>
              ,
              <SidebarGroupAction
                key="new-folder"
                title="New Folder"
                className="p-0 h-8 w-8 cursor-pointer"
                onClick={() => addFolder()}
              >
                <FolderPlus className="h-5 w-5" />{" "}
                <span className="sr-only cursor-pointer">New Folder</span>
              </SidebarGroupAction>
            </div>
          </div>
          {/* <SidebarSectionHeader title="Notes" href="/notes" actions={[,]} /> */}

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
