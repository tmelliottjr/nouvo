import { NoteNode } from "@/lib/seed-data";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { EditorToolbar } from "./EditorToolbar";
import { extensions } from "./plugins";

export default function TiptapEditor({
  note,
  onUpdate,
}: {
  note: NoteNode;
  onUpdate: (content: string) => void;
}) {
  const handleContentUpdate = ({ editor }: EditorEvents["update"]) => {
    const serialized = JSON.stringify(editor.getJSON());
    onUpdate(serialized);
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
      autofocus: true,
      editable: true,
      editorProps: {
        attributes: {
          class:
            "prose prose-stone prose-base focus:outline-none dark:prose-invert d-flex m-5 max-w-full lg:max-w-screen-xl grow-1",
        },
      },
    },
    [note.id, note.name]
  );

  return (
    <div className="flex flex-col w-full">
      <EditorToolbar noteId={note.id} tags={note.tags} />
      <EditorContent editor={editor} className="flex justify-center" />
    </div>
  );
}
