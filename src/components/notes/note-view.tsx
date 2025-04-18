import { FolderNode } from "@/lib/seed-data";
import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import { FileText, Loader2, Lock, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import TiptapEditor from "../tiptap-editor/editor";
import { Badge } from "../ui/badge";
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
  } = useNotes();

  // Track loading state for shared notes
  const [isLoadingSharedNote, setIsLoadingSharedNote] = useState(false);

  // If we have a selected ID but no currentNote, it might be a shared note that's loading
  useEffect(() => {
    if (selectedItemId && !isViewingFolder && !currentNote) {
      setIsLoadingSharedNote(true);
    } else {
      setIsLoadingSharedNote(false);
    }
  }, [selectedItemId, currentNote, isViewingFolder]);

  // Determine if the current note is read-only based on permissions
  const isSharedNote = currentNote?.sharedAccess?.permission !== undefined;
  const isReadOnlyNote = isSharedNote && currentNote?.sharedAccess?.permission === "read";

  // Only update content if the user has write permission
  function handleContentUpdate(content: string) {
    if (!currentNote) return;

    // Skip update if the note is read-only
    if (isReadOnlyNote) {
      console.log("Attempted to update read-only note. Update skipped.");
      return;
    }

    updateNote(currentNote.id, { content });
  }

  // Render an access indicator badge for shared notes
  const renderAccessIndicator = () => {

    return (
      <div className="flex items-center gap-1 px-4 py-2 border-b">
        {isReadOnlyNote ? (
          <Badge variant="secondary" className="gap-1 text-amber-500">
            <Lock className="h-3 w-3" />
            <span>Read-only</span>
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-1 text-emerald-500">
            <PenLine className="h-3 w-3" />
            <span>Can edit</span>
          </Badge>
        )}
        <span className="text-xs text-muted-foreground ml-2">
          {isReadOnlyNote
            ? "You can view but not edit this shared note"
            : "You have permission to edit this shared note"}
        </span>
      </div>
    );
  };

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
        childIds: rootNodes.map((node) => node.id),
      };

      return <FolderView isRootView={true} folder={rootFolder} />;
    }

    // Show loading state when waiting for a shared note
    if (isLoadingSharedNote) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <Loader2 className="h-8 w-8 text-stone-400 animate-spin mb-4" />
          <p className="text-stone-500">Loading shared note...</p>
        </div>
      );
    }

    // Show the editor when we have a valid note
    if (currentNote && currentNote.name) {
      return (
        <div className="flex flex-col h-full">
          {renderAccessIndicator()}
          <TiptapEditor
            note={currentNote}
            onUpdate={handleContentUpdate}
            readOnly={isReadOnlyNote}
          />
        </div>
      );
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
