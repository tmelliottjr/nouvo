"use client";

import { NotesSidebar } from "@/components/notes-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BlockNoteSchema, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import {
  multiColumnDropCursor,
  withMultiColumn,
} from "@blocknote/xl-multi-column";
import React from "react";
import { Note, NotesProvider, useNotes } from "../../state-providers/use-notes";

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

function NoteView() {
  const { currentNote } = useNotes();

  return (
    <>
      <NoteHeader />

      {/* <PlateEditor /> */}
      {currentNote && <NoteEditor note={currentNote} key={currentNote.id} />}
    </>
  );
}

function NoteHeader() {
  const { currentPath } = useNotes();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {currentPath &&
            currentPath.map((pathPart, index) => {
              return (
                <React.Fragment key={`${pathPart}-${index}`}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{pathPart}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index >= 0 && index < currentPath.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

function NoteEditor({ note }: { note: Note }) {
  const { updateNote } = useNotes();

  const initialContent: PartialBlock[] = note.content
    ? JSON.parse(note.content)
    : undefined;

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }

  const editor = useCreateBlockNote({
    initialContent,
    schema: withMultiColumn(BlockNoteSchema.create()),
    dropCursor: multiColumnDropCursor,
    uploadFile,
  });

  return (
    <div className="p-4">
      <BlockNoteView
        autoFocus
        data-theme
        editor={editor}
        onChange={() =>
          updateNote(note.id, {
            content: JSON.stringify(editor.document),
          })
        }
        shadCNComponents={
          {
            // Pass modified ShadCN components from your project here.
            // Otherwise, the default ShadCN components will be used.
          }
        }
      />
    </div>
  );
}
