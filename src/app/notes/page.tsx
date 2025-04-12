"use client";

import { NotesSidebar } from "@/components/notes-sidebar";
import { NoteView } from "@/components/notes/note-view";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { NotesProvider } from "../../state-providers/use-notes";

import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import "highlight.js/styles/agate.css";

// Only Once in your app you can set whether to enable hooks tracking or not.
setUseWhatChange(process.env.NODE_ENV === "development");

export default function Notes() {
  return (
    <NotesProvider>
      <SidebarProvider>
        <NotesSidebar />
        <SidebarInset>
          <NoteView />
        </SidebarInset>
      </SidebarProvider>
    </NotesProvider>
  );
}
