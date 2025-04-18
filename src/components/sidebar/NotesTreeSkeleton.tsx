"use client";

import { SidebarMenuSkeleton } from "@/components/ui/sidebar";
import React from "react";

interface NotesTreeSkeletonProps {
  count?: number;
  depth?: number;
  parentId?: string | null;
}

export function NotesTreeSkeleton({
  count = 5,
  depth = 0,
  parentId = null,
}: NotesTreeSkeletonProps) {
  // Generate a random number of child skeletons for folders
  const folderChildCount = React.useMemo(() => {
    return Math.floor(Math.random() * 3);
  }, []);

  return (
    <div className="min-h-[10px] animate-fadeIn">
      {/* Generate skeleton items for this level */}
      {Array.from({ length: count }).map((_, i) => {
        const id = `skeleton-${parentId ? `${parentId}-` : ""}${i}`;
        const isFolder = i % 3 === 0; // Make every third item a folder

        return (
          <div key={id} className="my-1">
            {/* The skeleton item */}
            <SidebarMenuSkeleton
              showIcon={true}
              className={`${depth > 0 ? "ml-5" : ""}`}
            />

            {/* If it's a folder and not too deep, recursively render child skeletons */}
            {isFolder && depth < 2 && (
              <div className="ml-5 mt-1">
                <NotesTreeSkeleton
                  count={folderChildCount}
                  depth={depth + 1}
                  parentId={id}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
