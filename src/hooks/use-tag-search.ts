import { useTagSearch as useTagSearchFromProvider } from "@/state-providers/tag-search-provider";

/**
 * Hook for searching notes by tags with AND/OR operations
 * This is a simple re-export of the context-based hook
 */
export function useTagSearch() {
  return useTagSearchFromProvider();
}
