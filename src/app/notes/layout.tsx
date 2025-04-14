"use client";

import { NotesSidebar } from "@/components/notes-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TagSearchProvider } from "@/state-providers/tag-search-provider";
import { NotesProvider } from "@/state-providers/use-notes";
import React from "react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotesProvider>
      <TagSearchProvider>
        <SidebarProvider>
          <NotesSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </TagSearchProvider>
    </NotesProvider>
  );
}
