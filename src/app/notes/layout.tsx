"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { NotesSidebar } from "@/components/notes-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/state-providers/tag-search-provider";
import { NotesProvider } from "@/state-providers/use-notes";
import React from "react";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <NotesProvider>
        <SearchProvider>
          <SidebarProvider>
            <NotesSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </SearchProvider>
      </NotesProvider>
    </ProtectedRoute>
  );
}
