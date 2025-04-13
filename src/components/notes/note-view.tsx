import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TiptapEditor from "../tiptap-editor/editor";
import { EmptyState } from "./empty-state";
import { FolderView } from "./folder-view";
import { NoteHeader } from "./note-header";

export function NoteView() {
  const {
    currentNote,
    currentFolder,
    updateNote,
    isViewingFolder,
    selectedItemId,
    noteTree,
  } = useNotes();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const sharedNoteId = searchParams.get("id");

  // When we have a note ID in the URL, show a loading state for a brief period
  useEffect(() => {
    if (sharedNoteId) {
      setIsLoading(true);
      // Add a deliberate delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [sharedNoteId]);

  function handleContentUpdate(content: string) {
    if (!currentNote) return;
    updateNote(currentNote.id, { content });
  }

  // Show loading state when a note ID is in the URL
  if (sharedNoteId && (isLoading || !currentNote)) {
    return (
      <>
        <NoteHeader />
        <div className="flex items-center justify-center h-full p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded mb-3"></div>
            <div className="h-3 w-48 bg-stone-200 dark:bg-stone-700 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  // Determine what to render in the main content area
  const renderMainContent = () => {
    // Show folder view when viewing a folder
    if (isViewingFolder && currentFolder) {
      return <FolderView folder={currentFolder} />;
    }

    // Show root folder view when nothing is selected
    if (selectedItemId === null) {
      return (
        <FolderView
          isRootView={true}
          folder={{
            id: "root",
            name: strings.notes.rootFolderName,
            children: noteTree,
          }}
        />
      );
    }

    // Show the editor when we have a valid note
    if (currentNote && currentNote.name) {
      return <TiptapEditor note={currentNote} onUpdate={handleContentUpdate} />;
    }

    // Show empty state when no note is selected
    if (!currentNote) {
      return <EmptyState message={strings.notes.noNoteSelected} />;
    }

    // Show waiting for name message when note has no name
    return (
      <EmptyState
        message="Name your note in the sidebar to start editing"
        icon={<FileText className="h-8 w-8 text-stone-400" />}
      />
    );
  };

  return (
    <>
      <NoteHeader />
      {renderMainContent()}
    </>
  );
}
