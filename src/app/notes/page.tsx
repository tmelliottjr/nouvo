"use client";
import { NotesSidebar } from "@/components/notes-sidebar";
import { NoteView } from "@/components/notes/note-view";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { NotesProvider, useNotes } from "../../state-providers/use-notes";

import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import "highlight.js/styles/agate.css";

// Only Once in your app you can set whether to enable hooks tracking or not.
setUseWhatChange(process.env.NODE_ENV === "development");

function NotesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectNote, selectedItemId, isViewingFolder } = useNotes();

  // Handle incoming URL parameters (when opening a shared link)
  useEffect(() => {
    const sharedNoteId = searchParams.get("id");
    if (sharedNoteId) {
      selectNote(sharedNoteId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL when a note is selected
  useEffect(() => {
    // Only update URL when viewing a note (not a folder)
    if (selectedItemId && !isViewingFolder) {
      // Create a new URLSearchParams instance
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", selectedItemId);

      // Update the URL without refreshing the page
      router.replace(`/notes?${params.toString()}`, { scroll: false });
    } else if (selectedItemId === null || isViewingFolder) {
      // Clear the id parameter when no note is selected or viewing a folder
      const params = new URLSearchParams(searchParams.toString());
      if (params.has("id")) {
        params.delete("id");
        const newUrl = params.toString()
          ? `/notes?${params.toString()}`
          : "/notes";
        router.replace(newUrl, { scroll: false });
      }
    }
  }, [selectedItemId, isViewingFolder, router, searchParams]);

  return (
    <SidebarProvider>
      <NotesSidebar />
      <SidebarInset>
        <NoteView />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Notes() {
  return (
    <NotesProvider>
      <NotesContent />
    </NotesProvider>
  );
}
