"use client";

import { NoteNode } from "@/lib/seed-data";
import { useNotes } from "@/state-providers/use-notes";
import React, { createContext, useContext, useMemo, useState } from "react";

// Define the type of search operation
type TagSearchOperator = "AND" | "OR";

// Interface for our context
interface TagSearchContextType {
  // Selected tags to search for
  selectedTags: string[];
  // Operator to use when filtering (AND or OR)
  operator: TagSearchOperator;
  // Results from the search
  results: NoteNode[];
  // Actions
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
  setOperator: (operator: TagSearchOperator) => void;
  // Status
  hasResults: boolean;
  isSearching: boolean;
}

// Create the context
const TagSearchContext = createContext<TagSearchContextType | undefined>(
  undefined
);

// Provider component
export function TagSearchProvider({ children }: { children: React.ReactNode }) {
  const { treeData } = useNotes();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [operator, setOperator] = useState<TagSearchOperator>("OR");

  // Add a tag to the search criteria
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag from the search criteria
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // Clear all selected tags
  const clearTags = () => {
    setSelectedTags([]);
  };

  // Filter notes based on selected tags and operator
  const results = useMemo(() => {
    if (selectedTags.length === 0) {
      return [];
    }

    return Object.values(treeData)
      .filter((node): node is NoteNode => node.type === "note")
      .filter((note) => {
        if (!note.tags) return false;

        if (operator === "AND") {
          // AND operation: note must contain ALL selected tags
          return selectedTags.every((tag) => note.tags.includes(tag));
        } else {
          // OR operation: note must contain AT LEAST ONE of the selected tags
          return selectedTags.some((tag) => note.tags.includes(tag));
        }
      });
  }, [treeData, selectedTags, operator]);

  // Determine if there are search results
  const hasResults = results.length > 0;

  // Determine if a search is currently active
  const isSearching = selectedTags.length > 0;

  // Create the context value
  const contextValue: TagSearchContextType = {
    selectedTags,
    operator,
    results,
    addTag,
    removeTag,
    clearTags,
    setOperator,
    hasResults,
    isSearching,
  };

  return (
    <TagSearchContext.Provider value={contextValue}>
      {children}
    </TagSearchContext.Provider>
  );
}

// Hook to use the context
export function useTagSearch() {
  const context = useContext(TagSearchContext);
  if (!context) {
    throw new Error("useTagSearch must be used within a TagSearchProvider");
  }
  return context;
}
