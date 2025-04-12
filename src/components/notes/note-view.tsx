import strings from "@/lib/strings";
import { useNotes } from "@/state-providers/use-notes";
import TiptapEditor from "../tiptap-editor/editor";
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

  function handleContentUpdate(content: string) {
    if (!currentNote) return;
    updateNote(currentNote.id, { content });
  }

  return (
    <>
      <NoteHeader />
      {isViewingFolder && currentFolder ? (
        <FolderView folder={currentFolder} />
      ) : selectedItemId === null ? (
        <FolderView
          isRootView={true}
          folder={{
            id: "root",
            name: strings.notes.rootFolderName,
            children: noteTree,
          }}
        />
      ) : (
        currentNote && (
          <TiptapEditor note={currentNote} onUpdate={handleContentUpdate} />
        )
      )}
    </>
  );
}
