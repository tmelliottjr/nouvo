"use client";

import { EmptyState } from "@/components/notes/empty-state";
import { Button } from "@/components/ui/button";
import { Note, useNotes } from "@/state-providers/use-notes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CalendarDayPageProps {
  params: Promise<{
    date: string;
  }>;
}

export default function CalendarDayPage({ params }: CalendarDayPageProps) {
  const { date } = React.use(params);
  const { noteTree } = useNotes();

  const [notesForDate, setNotesForDate] = useState<Note[]>([]);

  // Format date for display
  const formatDisplayDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get all notes from the tree including those in subfolders
  const getAllNotes = (tree: any[]): any[] => {
    let allNotes: any[] = [];

    tree.forEach((node) => {
      if ("children" in node) {
        // This is a folder, recurse into it
        allNotes = [...allNotes, ...getAllNotes(node.children)];
      } else {
        // This is a note
        allNotes.push(node);
      }
    });

    return allNotes;
  };

  // Find notes created on the specified date
  useEffect(() => {
    const notes = getAllNotes(noteTree);
    const matchingNotes = notes.filter((note) => {
      if (!note.creationDate) return false;

      // Compare just the date part (YYYY-MM-DD)
      const noteDate = note.creationDate.split("T")[0];
      return noteDate === date;
    });

    setNotesForDate(matchingNotes);
  }, [noteTree, date]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center border-b p-4">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/notes">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to notes</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">
          Notes for {formatDisplayDate(date)}
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {notesForDate.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notesForDate.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <EmptyState
            message={`No notes found for ${formatDisplayDate(date)}`}
            description="Try creating a new note today"
          />
        )}
      </div>
    </div>
  );
}

// A card component to display note previews
function NoteCard({ note }: { note: Note }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notes/${note.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
      onClick={handleClick}
    >
      <h2 className="font-medium mb-2 truncate">{note.name}</h2>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {/* Extract plain text from the JSON content for preview */}
        {getPlainTextFromContent(note.content)}
      </p>
    </div>
  );
}

// Helper function to extract plain text from the note content JSON
function getPlainTextFromContent(content: string): string {
  try {
    const contentObj = JSON.parse(content);
    // Simple extraction of text from Tiptap JSON structure
    const extractText = (node: any): string => {
      if (node.text) {
        return node.text;
      }

      if (node.content) {
        return node.content.map((child: any) => extractText(child)).join(" ");
      }

      return "";
    };

    return extractText(contentObj);
  } catch (error) {
    return "Could not load content preview";
  }
}
