"use client";

import { NotesSidebar } from "@/components/notes-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export function SettingsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NotesSidebar />
      <SidebarInset className="w-full h-full overflow-auto">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
