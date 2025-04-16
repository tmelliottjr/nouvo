"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "./plugins";

// A simplified version of TiptapEditor that doesn't depend on NotesProvider
export function SimpleTiptapEditor({
  note,
  readOnly = false,
}: {
  note: any;
  readOnly?: boolean;
}) {
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
    [note.id, note.name, readOnly]
  );

  return (
    <div className="flex flex-col w-full">
      <div className="border-b px-4 py-2 bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {readOnly ? "Read-only View" : "Edit Mode"}
          </span>
        </div>
      </div>
      <EditorContent editor={editor} className="flex justify-center" />
    </div>
  );
}
