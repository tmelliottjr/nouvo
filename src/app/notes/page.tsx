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
import { NotesProvider, useNotes } from "../../state-providers/use-notes";

export default function Notes() {
  return (
    <NotesProvider>
      <SidebarProvider>
        <NotesSidebar />
        <SidebarInset>
          <NoteHeader />
          <NoteEditor />
        </SidebarInset>
      </SidebarProvider>
    </NotesProvider>
  );
}

function NoteHeader() {
  const { currentNote } = useNotes();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {currentNote &&
            currentNote.path.map((pathPart, index) => {
              return (
                <>
                  <BreadcrumbItem className="hidden md:block" key={pathPart}>
                    <BreadcrumbLink href="#">{pathPart}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index >= 0 && index < currentNote.path.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" key="" />
                  )}
                </>
              );
            })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

function NoteEditor() {
  const { currentNote } = useNotes();

  if (!currentNote) {
    return <div>BAD THINGS AWAIT</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {currentNote.note.name}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
