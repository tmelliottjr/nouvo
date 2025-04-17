"use client";

import { SearchDialog } from "@/components/notes/search-dialog";
import {
  NotesTree,
  SharedWithMeSection,
  SidebarSectionHeader,
} from "@/components/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserProfileButton } from "@/components/user/user-profile-button";
import { UserSettingsModal } from "@/components/user/user-settings-modal";
import { useAuth } from "@/state-providers/use-auth";
import { useNotes } from "@/state-providers/use-notes";
import { FileEdit, FolderPlus, Search, Settings, Share2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { NoteCalendar } from "./notes/note-calendar";
import { TreeNodeAction } from "./sidebar/tree-components/TreeNodeAction";
import { ThemeSelector } from "./themes/theme-selector";

export function NotesSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { addNote, addFolder } = useNotes();
  const { isAuthenticated } = useAuth();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <Sidebar {...props}>
      <SearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />
      <UserSettingsModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
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
              <UserProfileButton onClick={() => setProfileModalOpen(true)} />
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
          <SidebarSectionHeader
            title="Notes"
            href="/notes"
            actions={[
              <TreeNodeAction
                key="search-notes"
                icon={<Search className="h-4 w-4" />}
                onClick={() => setSearchDialogOpen(true)}
                ariaLabel="Search Notes"
              />,
              <TreeNodeAction
                key="new-note"
                icon={<FileEdit className="h-4 w-4" />}
                onClick={() => addNote()}
                ariaLabel="New Note"
              />,
              <TreeNodeAction
                key="new-folder"
                icon={<FolderPlus className="h-4 w-4" />}
                onClick={() => addFolder()}
                ariaLabel="New Folder"
              />,
            ]}
          />

          <SidebarGroupContent>
            <SidebarMenu>
              <NotesTree />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Shared with me section */}
        {isAuthenticated && (
          <SidebarGroup>
            <SidebarSectionHeader
              title="Shared with me"
              href="/notes"
              icon={<Share2 className="h-4 w-4 mr-1" />}
            />
            <SidebarGroupContent>
              <SidebarMenu>
                <SharedWithMeSection />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
