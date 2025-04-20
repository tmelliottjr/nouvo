import { NoteNode } from "@/lib/seed-data";
import FileHandler from "@tiptap-pro/extension-file-handler";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { useUploadThing } from "../../utils/uploadthing";
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
  const { startUpload } = useUploadThing("imageUploader");
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
      extensions: [
        ...extensions,
        FileHandler.configure({
          allowedMimeTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "application/pdf",
            "text/plain",
            "text/markdown",
          ],
          onPaste: (currentEditor, files, content) => {
            console.log({ files, content });
            files.forEach(async (file) => {
              // Show a temporary data URL while uploading

              // Upload the file to UploadThing
              const res = await startUpload([file]);

              if (!res) {
                console.error("Upload failed");
                return;
              }

              console.log("Uploaded URL:", res[0]);

              // currentEditor
              //   .chain()
              //   .insertContentAt(pos, {
              //     type: "image",
              //     attrs: {
              //       src: uploadedUrl,
              //     },
              //   })
              //   .focus()
              //   .run();
            });
          },
          onDrop: (currentEditor, files, pos) => {
            files.forEach(async (file) => {
              // Show a temporary data URL while uploading

              // Upload the file to UploadThing
              const res = await startUpload([file]);

              if (!res) {
                console.error("Upload failed");
                return;
              }

              const uploadedUrl = res[0].serverData.fileUrl;

              console.log("Uploaded URL:", res[0]);

              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: uploadedUrl,
                  },
                })
                .focus()
                .run();
            });
          },
        }),
      ],
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
