import { FolderNode } from "@/lib/seed-data";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FileText } from "lucide-react";
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
    rootNodes,
    rootIds,
    selectNote,
  } = useNotes();

  function handleContentUpdate(content: string) {
    if (!currentNote) return;
    updateNote(currentNote.id, { content });
  }

  // Determine what to render in the main content area
  const renderMainContent = () => {
    // Show folder view when viewing a folder
    if (isViewingFolder && currentFolder) {
      return <FolderView folder={currentFolder} />;
    }

    // Show root folder view when nothing is selected
    if (selectedItemId === null) {
      // Create a virtual root folder from our rootNodes
      const rootFolder: FolderNode = {
        id: "root",
        name: strings.notes.rootFolderName,
        type: "folder",
        parentId: null,
        childIds: rootIds,
      };

      return <FolderView isRootView={true} folder={rootFolder} />;
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
