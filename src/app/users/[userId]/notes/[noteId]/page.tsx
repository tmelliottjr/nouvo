"use client";

import TiptapEditor from "@/components/tiptap-editor/editor";
import { Button } from "@/components/ui/button";
import { Note } from "@/lib/notes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicNotePage() {
  const params = useParams();
  const { userId, noteId } = params;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPublicNote() {
      try {
        setLoading(true);
        const response = await fetch(`/api/public-notes/${userId}/${noteId}`);

        if (!response.ok) {
          throw new Error(`Note not found or not publicly available`);
        }

        const data = await response.json();
        setNote(data);
      } catch (err) {
        console.error("Error fetching public note:", err);
        setError(err instanceof Error ? err.message : "Failed to load note");
      } finally {
        setLoading(false);
      }
    }

    if (userId && noteId) {
      fetchPublicNote();
    }
  }, [userId, noteId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
        <p className="mt-4 text-stone-600">Loading note...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Note not available</h2>
          <p className="mb-6 text-stone-600">
            {error || "This note does not exist or is not publicly accessible."}
          </p>
          <Link href="/">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold mb-2">{note.title || note.name}</h1>
        <div className="flex items-center text-sm text-stone-500">
          <span>Public note • Read only</span>
        </div>
      </div>

      <div className="border rounded-md p-6 bg-white dark:bg-stone-900">
        <TiptapEditor note={note} readOnly={true} onUpdate={() => {}} />
      </div>
    </div>
  );
}
