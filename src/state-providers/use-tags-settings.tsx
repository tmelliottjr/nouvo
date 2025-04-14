"use client";

import { seedTagSettings, TagSetting } from "@/lib/seed-data";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useImmer } from "use-immer";

interface TagsSettingsContext {
  tags: TagSetting[];
  addTag: (tag: TagSetting) => void;
  updateTag: (name: string, tag: Partial<TagSetting>) => void;
  removeTag: (name: string) => void;
  getTagSettings: (name: string) => TagSetting | undefined;
}

// Default tag colors - keeping these in the app as system-defined colors
export const DEFAULT_TAG_COLORS: string[] = [
  "#6366F1", // Indigo (brighter)
  "#3B82F6", // Blue (brighter)
  "#06B6D4", // Cyan (brighter)
  "#10B981", // Emerald (brighter)
  "#84CC16", // Lime (brighter)
  "#FACC15", // Yellow (brighter)
  "#F97316", // Orange (brighter)
  "#EF4444", // Red (brighter)
  "#EC4899", // Pink (brighter)
  "#A855F7", // Purple (brighter)
];

// Get a default color for a tag
export function getDefaultTagColor(index: number): string {
  return DEFAULT_TAG_COLORS[index % DEFAULT_TAG_COLORS.length];
}

// Helper function to derive background color from color
export function getBackgroundColorClass(color: string): string {
  if (!color) {
    return ""; // Handle undefined or empty color
  }

  if (color.startsWith("#")) {
    // For custom hex colors, return an empty string - we'll handle this with inline styles
    return "";
  }

  // For named colors like "blue-500", return the corresponding bg class
  const colorBase = color.split("-")[0];
  return `bg-${colorBase}-100 dark:bg-${colorBase}-950`;
}

// Helper function to get the border color class
export function getBorderColorClass(color: string): string {
  if (!color) {
    return "border-gray-300"; // Default border for undefined or empty color
  }

  if (color.startsWith("#")) {
    return `border-[${color}]`;
  }
  return `border-${color}`;
}

// Helper function to get the text color class
export function getTextColorClass(color: string): string {
  if (!color) {
    return "text-gray-500"; // Default text color for undefined or empty color
  }

  if (color.startsWith("#")) {
    return ""; // Will use inline style
  }
  return `text-${color}`;
}

const TagsSettingsContext = createContext<TagsSettingsContext | undefined>(
  undefined
);

export function TagsSettingsProvider({ children }: PropsWithChildren) {
  // Try to load tags from localStorage, or use seedTagSettings if not available
  const [tags, setTags] = useImmer<TagSetting[]>(() => {
    if (typeof window !== "undefined") {
      const savedTags = localStorage.getItem("tagSettings");
      if (savedTags) {
        try {
          return JSON.parse(savedTags);
        } catch (error) {
          console.error(
            "Failed to parse tag settings from localStorage",
            error
          );
        }
      }
    }
    return seedTagSettings;
  });

  // Save tags to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tagSettings", JSON.stringify(tags));
    }
  }, [tags]);

  const addTag = (tag: TagSetting) => {
    setTags((draft) => {
      if (!draft.some((t) => t.name === tag.name)) {
        draft.push(tag);
      }
    });
  };

  const updateTag = (name: string, updatedTag: Partial<TagSetting>) => {
    setTags((draft) => {
      const index = draft.findIndex((t) => t.name === name);
      if (index !== -1) {
        const newTag = { ...draft[index], ...updatedTag };
        draft[index] = newTag;
      }
    });
  };

  const removeTag = (name: string) => {
    setTags((draft) => {
      const index = draft.findIndex((t) => t.name === name);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
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
