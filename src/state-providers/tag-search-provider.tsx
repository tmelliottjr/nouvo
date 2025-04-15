"use client";

import { NoteNode } from "@/lib/seed-data";
import { useNotes } from "@/state-providers/use-notes";
import React, { createContext, useContext, useMemo, useState } from "react";

// Define search field types
export type SearchField = "title" | "content" | "tag" | "created";

// Define search operator types
export type SearchOperator =
  | "contains"
  | "equals"
  | "startsWith"
  | "endsWith"
  | "before"
  | "after"
  | "between";

// Define a search token structure
export interface SearchToken {
  field: SearchField;
  operator: SearchOperator;
  value: string;
  rawValue?: string; // For display purposes
}

// Interface for our context
interface SearchContextType {
  // Raw search text input by the user
  searchText: string;
  // Processed search tokens
  searchTokens: SearchToken[];
  // Selected tags to search for (legacy support)
  selectedTags: string[];
  // Results from the search
  results: NoteNode[];
  // Actions
  setSearchText: (text: string) => void;
  addTag: (tag: string) => void; // Legacy support
  removeTag: (tag: string) => void; // Legacy support
  clearTags: () => void; // Legacy support
  clearSearch: () => void;
  // Status
  hasResults: boolean;
  isSearching: boolean;
  // Function to convert tokens to a search string
  tokensToSearchString: (tokens: SearchToken[]) => string;
}

// Create the context
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Helper function to parse search text into tokens
const parseSearchText = (
  text: string
): { tokens: SearchToken[]; remainingText: string } => {
  const tokens: SearchToken[] = [];
  let remainingText = text;

  // Regular expressions for different search patterns
  const fieldPatterns = {
    // Match field:value patterns with different operators
    title: /^title:(["']([^"']+)["']|\*([^\s]+)|([^\s]+))/i,
    content: /^content:(["']([^"']+)["']|\*([^\s]+)|([^\s]+))/i,
    tag: /^tag:(["']([^"']+)["']|\*([^\s]+)|([^\s]+))/i,
    created:
      /^created:(<|>|<=|>=|)(\d{1,2}\/\d{1,2}\/\d{2,4})(?:-(\d{1,2}\/\d{1,2}\/\d{2,4}))?/i,
  };

  // Helper to extract operator from search text
  const getOperatorFromValue = (
    field: SearchField,
    value: string
  ): { operator: SearchOperator; cleanValue: string } => {
    if (field === "created") {
      if (value.includes("-")) {
        return { operator: "between", cleanValue: value };
      } else if (value.startsWith("<=")) {
        return { operator: "before", cleanValue: value.substring(2) };
      } else if (value.startsWith("<")) {
        return { operator: "before", cleanValue: value.substring(1) };
      } else if (value.startsWith(">=")) {
        return { operator: "after", cleanValue: value.substring(2) };
      } else if (value.startsWith(">")) {
        return { operator: "after", cleanValue: value.substring(1) };
      }
      return { operator: "equals", cleanValue: value };
    }

    if (value.startsWith("*") && !value.endsWith("*")) {
      return { operator: "startsWith", cleanValue: value.substring(1) };
    } else if (!value.startsWith("*") && value.endsWith("*")) {
      return {
        operator: "endsWith",
        cleanValue: value.substring(0, value.length - 1),
      };
    } else if (value.startsWith("*") && value.endsWith("*")) {
      return {
        operator: "contains",
        cleanValue: value.substring(1, value.length - 1),
      };
    }

    return { operator: "contains", cleanValue: value };
  };

  // Process search text to extract tokens
  while (remainingText.trim().length > 0) {
    let matched = false;

    // Check for field-specific patterns
    for (const [field, pattern] of Object.entries(fieldPatterns)) {
      const match = remainingText.trim().match(pattern);
      if (match) {
        // Extract the value from the appropriate match group
        let value;
        let rawValue;

        if (field === "created") {
          rawValue = match[0].substring(8);
          value = match[2] + (match[3] ? `-${match[3]}` : "");
          if (match[1]) {
            value = match[1] + value; // Include operator if present
          }
        } else {
          rawValue = match[0].substring(field.length + 1);
          value = match[2] || match[3] || match[4] || match[1] || "";
          // Remove quotes if present
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.substring(1, value.length - 1);
          }
        }

        const { operator, cleanValue } = getOperatorFromValue(
          field as SearchField,
          value
        );

        tokens.push({
          field: field as SearchField,
          operator,
          value: cleanValue,
          rawValue,
        });

        // Remove the matched part from remaining text
        remainingText = remainingText.trim().substring(match[0].length).trim();
        matched = true;
        break;
      }
    }

    // If no field pattern matched, treat as plain text search
    if (!matched) {
      // Extract a chunk of text until the next field pattern or end
      let nextFieldIndex = Infinity;
      for (const field of Object.keys(fieldPatterns)) {
        const fieldStart = remainingText.toLowerCase().indexOf(`${field}:`);
        if (fieldStart > -1 && fieldStart < nextFieldIndex) {
          nextFieldIndex = fieldStart;
        }
      }

      const plainText =
        nextFieldIndex < Infinity
          ? remainingText.substring(0, nextFieldIndex).trim()
          : remainingText.trim();

      // If text is in quotes, handle accordingly
      if (
        (plainText.startsWith('"') && plainText.endsWith('"')) ||
        (plainText.startsWith("'") && plainText.endsWith("'"))
      ) {
        tokens.push({
          field: "content",
          operator: "contains",
          value: plainText.substring(1, plainText.length - 1),
          rawValue: plainText,
        });
      } else {
        tokens.push({
          field: "content",
          operator: "contains",
          value: plainText,
          rawValue: plainText,
        });
      }

      remainingText =
        nextFieldIndex < Infinity
          ? remainingText.substring(nextFieldIndex).trim()
          : "";
    }
  }

  return { tokens, remainingText };
};

// Provider component
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { treeData } = useNotes();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tokensToSearchString = useMemo(() => {
    return (tokens: SearchToken[]) => {
      return tokens
        .map((token) => {
          const { field, rawValue } = token;
          return `${field}:${rawValue}`;
        })
        .join(" ");
    };
  }, []);

  // Parse search tokens from search text
  const searchTokens = useMemo(() => {
    const { tokens } = parseSearchText(searchText);

    console.log(searchText);
    console.log("Parsed tokens:", tokens);

    // Add any selected tags as tokens (legacy support)
    const tagTokens = selectedTags.map((tag) => ({
      field: "tag" as SearchField,
      operator: "equals" as SearchOperator,
      value: tag,
      rawValue: `tag:${tag}`,
    }));

    return [...tokens, ...tagTokens];
  }, [searchText, selectedTags]);

  // Helper function to check if content includes search text (case insensitive)
  const contentIncludes = (content: string, searchValue: string): boolean => {
    if (!content || !searchValue) return false;

    try {
      // Don't parse and stringify on every search - this is inefficient
      // Just do a direct string search on the content
      return content.toLowerCase().includes(searchValue.toLowerCase());
    } catch (e) {
      // Fallback in case of errors
      return false;
    }
  };

  // Helper function to check date ranges
  const dateMatches = (
    dateString: string,
    operator: SearchOperator,
    value: string
  ): boolean => {
    const noteDate = new Date(dateString);

    if (operator === "between") {
      // For between, value should be in format: MM/DD/YYYY-MM/DD/YYYY
      const [start, end] = value.split("-").map((d) => new Date(d));
      return noteDate >= start && noteDate <= end;
    } else if (operator === "before") {
      const compareDate = new Date(value);
      return noteDate <= compareDate;
    } else if (operator === "after") {
      const compareDate = new Date(value);
      return noteDate >= compareDate;
    } else {
      // For equals, just compare the date part (not time)
      const compareDate = new Date(value);
      return noteDate.toDateString() === compareDate.toDateString();
    }
  };

  // Filter notes based on search tokens
  const results = useMemo(() => {
    if (searchTokens.length === 0) {
      return [];
    }

    const allNotes = Object.values(treeData).filter(
      (node): node is NoteNode => node.type === "note"
    );

    return allNotes.filter((note) => {
      // If no search tokens, include all notes
      if (searchTokens.length === 0) return false;

      // A note matches if ALL search tokens match
      return searchTokens.every((token) => {
        switch (token.field) {
          case "title":
            if (token.operator === "contains") {
              return note.name
                .toLowerCase()
                .includes(token.value.toLowerCase());
            } else if (token.operator === "equals") {
              return note.name.toLowerCase() === token.value.toLowerCase();
            } else if (token.operator === "startsWith") {
              return note.name
                .toLowerCase()
                .startsWith(token.value.toLowerCase());
            } else if (token.operator === "endsWith") {
              return note.name
                .toLowerCase()
                .endsWith(token.value.toLowerCase());
            }
            return false;

          case "content":
            return contentIncludes(note.content, token.value);

          case "tag":
            return note.tags.some(
              (tag) => tag.toLowerCase() === token.value.toLowerCase()
            );

          case "created":
            return dateMatches(note.creationDate, token.operator, token.value);

          default:
            return false;
        }
      });
    });
  }, [treeData, searchTokens]);

  // Add a tag to the search criteria (legacy support)
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag from the search criteria (legacy support)
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  // Clear all selected tags (legacy support)
  const clearTags = () => {
    setSelectedTags([]);
  };

  // Clear all search criteria
  const clearSearch = () => {
    setSelectedTags([]);
    setSearchText("");
  };

  // Determine if there are search results
  const hasResults = results.length > 0;

  // Determine if a search is currently active
  const isSearching = searchTokens.length > 0;

  // Create the context value
  const contextValue: SearchContextType = {
    searchText,
    searchTokens,
    selectedTags,
    results,
    setSearchText,
    addTag,
    removeTag,
    clearTags,
    clearSearch,
    hasResults,
    isSearching,
    tokensToSearchString,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook to use the context
export function useTagSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useTagSearch must be used within a SearchProvider");
  }
  return context;
}

// New hook name to match the updated functionality
export function useSearch() {
  return useTagSearch();
}
