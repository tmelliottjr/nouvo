"use client";

import { Note } from "@/lib/notes";
import { SharedNote } from "@/lib/shared-notes";
import { useAuth } from "@/state-providers/use-auth";
import { useNotes } from "@/state-providers/use-notes";
import { Edit2, Eye, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { SidebarLink } from "./SidebarLink";

type SharedNoteWithDetails = {
  sharedNote: SharedNote;
  noteDetails: Note | null;
};

export function SharedWithMeSection() {
  const { user } = useAuth();
  const { selectNote } = useNotes();
  const router = useRouter();
  const [sharedNotes, setSharedNotes] = useState<SharedNoteWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notes shared with the current user
  useEffect(() => {
    async function fetchSharedNotes() {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        // Fetch shared notes from the API
        const response = await fetch(
          `/api/shared-notes/by-user?userId=${user.id}`
        );
        if (!response.ok) {
          console.error("Failed to fetch shared notes:", response.statusText);
          return;
        }

        const sharedNotesList = await response.json();

        // Fetch details for each shared note
        const notesWithDetails = await Promise.all(
          sharedNotesList.map(async (sharedNote: SharedNote) => {
            try {
              // Ensure sharedNote and noteId exist
              if (!sharedNote || !sharedNote.noteId) {
                return { sharedNote, noteDetails: null };
              }

              const detailsResponse = await fetch(
                `/api/notes/${sharedNote.noteId}`
              );
              if (!detailsResponse.ok) {
                return { sharedNote, noteDetails: null };
              }
              const noteDetails = await detailsResponse.json();
              return { sharedNote, noteDetails };
            } catch (error) {
              console.error(
                `Error fetching details for note ${sharedNote?.noteId || "unknown"}:`,
                error
              );
              return { sharedNote, noteDetails: null };
            }
          })
        );

        // Filter out any invalid entries
        const validNotes = notesWithDetails.filter(
          (item) => item.sharedNote && item.sharedNote.noteId
        );
        setSharedNotes(validNotes);
      } catch (error) {
        console.error("Error fetching shared notes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchSharedNotes();
    }
  }, [user]);

  // Handle note click - loads the note in the editor
  const handleNoteClick = useCallback(
    (noteId: string, e: React.MouseEvent) => {
      e.preventDefault();
      if (noteId) {
        selectNote(noteId);
        router.push(`/notes/${noteId}`);
      }
    },
    [router, selectNote]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4 text-sm text-stone-500">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading shared notes...
      </div>
    );
  }

  if (sharedNotes.length === 0) {
    return (
      <div className="px-3 py-2 text-sm text-stone-500">
        No notes have been shared with you.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {sharedNotes.map(({ sharedNote, noteDetails }) => {
        // Skip rendering if sharedNote or noteId is invalid
        if (!sharedNote || !sharedNote.noteId) return null;

        // Safe note ID for display with fallback
        const truncatedNoteId =
          sharedNote.noteId && typeof sharedNote.noteId === "string"
            ? sharedNote.noteId.substring(0, 8)
            : "unknown";

        return (
          <SidebarLink
            key={sharedNote.id || `shared-${truncatedNoteId}`}
            href={`/notes/${sharedNote.noteId}`}
            onClick={(e) => handleNoteClick(sharedNote.noteId, e)}
            className="relative tree-item py-1"
          >
            <div className="flex items-center w-full truncate">
              {/* Permission icon */}
              {sharedNote.permission === "write" ? (
                <Edit2
                  className="h-3.5 w-3.5 mr-2 text-blue-500"
                  title="Edit access"
                />
              ) : (
                <Eye
                  className="h-3.5 w-3.5 mr-2 text-stone-500"
                  title="Read-only access"
                />
              )}
              {/* Note name - Use actual name if available, fallback to ID */}
              <span
                className="truncate"
                title={noteDetails?.name || `Shared note (${truncatedNoteId})`}
              >
                {noteDetails?.name || `Shared note (${truncatedNoteId}...)`}
              </span>
            </div>
          </SidebarLink>
        );
      })}
    </div>
  );
}
