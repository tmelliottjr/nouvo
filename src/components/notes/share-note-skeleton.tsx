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
  const [isAccessVerified, setIsAccessVerified] = useState(false);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace(`/login?returnUrl=/shared/${shareId}`);
    }
  }, [authLoading, isAuthenticated, router, shareId]);

  // Only fetch note data if user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchSharedNote = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, we would make an API call to check
        // if the user has access to this note and fetch its contents
        // For now, we'll simulate this with a timeout

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user has access to this note
        // This would be a server-side check in a real implementation
        const hasAccess = true; // Simulate access check

        if (!hasAccess) {
          setError("You don't have access to this note");
          setIsLoading(false);
          return;
        }

        // Create a properly formatted note content string
        const noteContent = JSON.stringify({
          type: "doc",
          content: [
            {
              type: "heading",
              attrs: { level: 1 },
              content: [{ type: "text", text: "Shared Note Example" }],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This is a sample shared note that represents content shared with you. ",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Note ID: " },
                { type: "text", text: shareId, marks: [{ type: "code" }] },
              ],
            },
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Shared with: " },
                { type: "text", text: user.email, marks: [{ type: "bold" }] },
              ],
            },
          ],
        });

        setNote({
          id: shareId,
          name: "Shared Meeting Notes",
          content: noteContent,
          createdBy: "another-user",
          creationDate: new Date().toISOString(),
          tags: [],
        });

        // Randomly set permission for demo purposes
        // In a real app, this would be determined by the database record
        setPermission(Math.random() > 0.5 ? "read" : "write");
        setIsAccessVerified(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shared note:", error);
        setError("Failed to load the shared note");
        setIsLoading(false);
      }
    };

    fetchSharedNote();
  }, [isAuthenticated, shareId, user]);

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
  if (!isAuthenticated) {
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
