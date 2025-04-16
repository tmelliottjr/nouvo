"use client";

import { seedTagSettings, TagSetting } from "@/lib/seed-data";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useImmer } from "use-immer";

// Define a set of default colors that will be used when a tag doesn't have a specified color
export const DEFAULT_TAG_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-red-100 text-red-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-indigo-100 text-indigo-800",
  "bg-gray-100 text-gray-800",
];

// Export the default tag colors as a constant for use in other components
export const getDefaultTagColor = (index: number): string => {
  return DEFAULT_TAG_COLORS[index % DEFAULT_TAG_COLORS.length];
};

type TagsSettingsContext = {
  tags: TagSetting[];
  addTag: (tag: TagSetting) => Promise<void>;
  updateTag: (name: string, updatedTag: Partial<TagSetting>) => Promise<void>;
  removeTag: (name: string) => Promise<void>;
  getTagSettings: (name: string) => TagSetting | undefined;
  isLoading: boolean;
};

const TagsSettingsContext = createContext<TagsSettingsContext>({
  tags: [],
  addTag: async () => {},
  updateTag: async () => {},
  removeTag: async () => {},
  getTagSettings: () => undefined,
  isLoading: false,
});

export function TagsSettingsProvider({ children }: PropsWithChildren) {
  // State for tags and loading state
  const [tags, setTags] = useImmer<TagSetting[]>(seedTagSettings);
  const [isLoading, setIsLoading] = useImmer<boolean>(true);

  // Fetch tags from API on mount
  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/tags");

        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }

        const tagsData = await response.json();

        if (Array.isArray(tagsData)) {
          setTags(tagsData);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        // Keep seed tags if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [setTags, setIsLoading]);

  const addTag = async (tag: TagSetting) => {
    try {
      // Update local state first for responsive UI
      setTags((draft) => {
        if (!draft.some((t) => t.name === tag.name)) {
          draft.push(tag);
        }
      });

      // Send to API
      await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      });
    } catch (error) {
      console.error("Error adding tag to API:", error);
    }
  };

  const updateTag = async (name: string, updatedTag: Partial<TagSetting>) => {
    try {
      // Update local state first for responsive UI
      setTags((draft) => {
        const index = draft.findIndex((t) => t.name === name);
        if (index !== -1) {
          const newTag = { ...draft[index], ...updatedTag };
          draft[index] = newTag;
        }
      });

      // Get the full updated tag from state
      const fullTag = tags.find((t) => t.name === name);
      if (!fullTag) return;

      // Send to API
      await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: name, // Using name as the ID for tags
          ...fullTag,
          ...updatedTag,
        }),
      });
    } catch (error) {
      console.error("Error updating tag in API:", error);
    }
  };

  const removeTag = async (name: string) => {
    try {
      // Update local state first for responsive UI
      setTags((draft) => {
        const index = draft.findIndex((t) => t.name === name);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });

      // Delete from API
      await fetch(`/api/tags?id=${name}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing tag from API:", error);
    }
  };

  const getTagSettings = (name: string): TagSetting | undefined => {
    return tags.find((t) => t.name === name);
  };

  const value: TagsSettingsContext = {
    tags,
    addTag,
    updateTag,
    removeTag,
    getTagSettings,
    isLoading,
  };

  return (
    <TagsSettingsContext.Provider value={value}>
      {children}
    </TagsSettingsContext.Provider>
  );
}

export function useTagsSettings() {
  const context = useContext(TagsSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useTagsSettings must be used within a TagsSettingsProvider"
    );
  }
  return context;
}
