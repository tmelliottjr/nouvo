"use client";

import { useAuth } from "@/state-providers/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If authentication check is complete and user is not authenticated
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  // Show loading state or nothing while checking authentication
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the children
  return <>{children}</>;
}
