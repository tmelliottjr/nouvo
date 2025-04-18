import { NoteNode } from "@/lib/seed-data";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { extensions } from "./plugins";

export default function TiptapEditor({
  note,
  onUpdate,
  readOnly = false,
}: {
  note: NoteNode;
  onUpdate: (content: string) => void;
  readOnly?: boolean;
}) {
  const handleContentUpdate = ({ editor }: EditorEvents["update"]) => {
    // Only send updates if the editor is editable (user has write permission)
    if (editor.isEditable) {
      const serialized = JSON.stringify(editor.getJSON());
      onUpdate(serialized);
    }
  };

  let deserialized;
  try {
    deserialized = JSON.parse(note.content);
  } catch {
    // Do Nothing
  }

  const editor = useEditor(
    {
      content: deserialized,
      immediatelyRender: false,
      extensions,
      onUpdate: handleContentUpdate,
      shouldRerenderOnTransaction: false,
      autofocus: !readOnly,
      editable: !readOnly,
      editorProps: {
        attributes: {
          class:
            "prose prose-stone prose-base focus:outline-none dark:prose-invert d-flex m-5 max-w-full lg:max-w-screen-xl grow-1",
        },
      },
    },
    [note.id, note.name]
  );

  // Update the editor's editable state when readOnly prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  return (
    <div className="flex flex-col w-full">
      {!readOnly && <EditorToolbar noteId={note.id} tags={note.tags} />}
      <EditorContent
        editor={editor}
        className={`flex justify-center ${readOnly ? "cursor-default" : ""}`}
      />
    </div>
  );
}
