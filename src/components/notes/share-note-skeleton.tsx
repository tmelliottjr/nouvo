"use client";

import { EmptyState } from "@/components/notes/empty-state";
import { SimpleTiptapEditor } from "@/components/tiptap-editor/simple-editor";
import { Button } from "@/components/ui/button";
import { NoteNode } from "@/lib/seed-data";
import { useAuth } from "@/state-providers/use-auth";
import {
  ArrowLeftIcon,
  EditIcon,
  LockIcon,
  PenToolIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ShareNoteSkeletonProps {
  shareId: string;
}

export function ShareNoteSkeleton({ shareId }: ShareNoteSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<NoteNode | null>(null);
  const [permission, setPermission] = useState<"read" | "write">("read");
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();



  // Fetch shared note when user is authenticated
  useEffect(() => {
    if (!user) return;

    const fetchSharedNote = async () => {
      setIsLoading(true);
      try {
        // Step 1: Fetch the note data and verify access
        const response = await fetch(`/api/notes/${shareId}`);

        if (!response.ok) {
          // If not found, check if it's a shared note
          const sharedResponse = await fetch(
            `/api/shared-notes?noteId=${shareId}`
          );

          console.log(sharedResponse)

          if (!sharedResponse.ok) {
            setError("This note doesn't exist or you don't have access to it");
            setIsLoading(false);
            return;
          }

          // Check if the current user has access to this note
          const sharedData = await sharedResponse.json();
          const hasAccess = sharedData.some(
            (share: any) => share.userId === user.id
          );

          if (!hasAccess) {
            setError("You don't have access to this note");
            setIsLoading(false);
            return;
          }

          // Get the note content through the shared note endpoint
          const noteResponse = await fetch(`/api/notes/${shareId}?shared=true`);

          if (!noteResponse.ok) {
            setError("Failed to load the shared note");
            setIsLoading(false);
            return;
          }

          const noteData = await noteResponse.json();

          // Get the user's permission for this note
          const userShare = sharedData.find(
            (share: any) => share.userId === user.id
          );
          setPermission(userShare?.permission || "read");
          console.log(noteData)
          // Create a proper note object
          setNote({
            id: noteData.id,
            name: noteData.name || "Shared Note",
            content: noteData.content,
            type: "note",
            parentId: null,
            childIds: [],
            creationDate: noteData.creationDate || new Date().toISOString(),
            tags: noteData.tags || [],
          });
        } else {
          // The user owns this note
          const noteData = await response.json();
          setPermission("write"); // Owner has write permission

          setNote({
            id: noteData.id,
            name: noteData.name || "My Note",
            content: noteData.content,
            type: "note",
            parentId: null,
            childIds: [],
            creationDate: noteData.creationDate || new Date().toISOString(),
            tags: noteData.tags || [],
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shared note:", error);
        setError("Failed to load the shared note");
        setIsLoading(false);
      }
    };

    fetchSharedNote();
  }, [shareId, user]);

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (will redirect)
  if (!user) {
    return null;
  }

  // Show note loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4 px-6">
          <div className="container flex items-center gap-2">
            <PenToolIcon className="h-5 w-5" />
            <span className="font-semibold">Noevo</span>
            <div className="ml-4 h-5 w-40 bg-muted animate-pulse rounded"></div>
          </div>
        </header>
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-muted animate-pulse rounded w-full"></div>
              <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
              <div className="h-6 bg-muted animate-pulse rounded w-5/6"></div>
              <div className="h-6 bg-muted animate-pulse rounded w-2/3"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4 px-6">
          <div className="container">
            <Link href="/notes" className="flex items-center gap-2 w-fit">
              <PenToolIcon className="h-5 w-5" />
              <span className="font-semibold">Noevo</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <EmptyState
            message="Error accessing note"
            description={error}
            icon={
              <ShieldAlertIcon className="h-10 w-10 text-muted-foreground" />
            }
          />
        </main>
      </div>
    );
  }

  // Show note content
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6">
        <div className="container flex items-center justify-between">
          <Link href="/notes" className="flex items-center gap-2 w-fit">
            <PenToolIcon className="h-5 w-5" />
            <span className="font-semibold">Noevo</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {permission === "read" ? (
                <>
                  <LockIcon className="h-4 w-4" />
                  <span>Read-only</span>
                </>
              ) : (
                <>
                  <EditIcon className="h-4 w-4" />
                  <span>Can edit</span>
                </>
              )}
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/notes">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to my notes
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{note?.name}</h1>

          {note && (
            <div className="border rounded-lg overflow-hidden">
              <SimpleTiptapEditor
                note={note}
                readOnly={permission === "read"}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
