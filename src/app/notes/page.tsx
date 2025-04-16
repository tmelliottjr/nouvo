"use client";

import { EmptyState } from "@/components/notes/empty-state";
import { useAuth } from "@/state-providers/use-auth";
import { PenToolIcon } from "lucide-react";

export default function NotesPage() {
  const { user } = useAuth();

  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <EmptyState
        message="Welcome to your notes"
        description={`Hello ${
          user?.username || "there"
        }, select a note or create a new one to get started`}
        icon={<PenToolIcon className="h-10 w-10 text-muted-foreground" />}
      />
    </div>
  );
}
