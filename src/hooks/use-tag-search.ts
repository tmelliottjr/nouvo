import { useSearch } from "@/state-providers/tag-search-provider";

/**
 * Hook for searching notes by tags, title, and content
 * This is a simple re-export of the context-based hook
 */
export function useTagSearch() {
  return useSearch();
}

/**
 * New hook for comprehensive note search
 */
export function useNoteSearch() {
  return useSearch();
}
