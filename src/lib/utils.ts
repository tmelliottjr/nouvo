import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v7 as uuidv7 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique UUID v7 string for database IDs
 * UUID v7 is time-ordered which improves database performance
 * @returns A UUID v7 string
 */
export function generateId(): string {
  return uuidv7();
}

/**
 * Generates a shareable URL for a specific note
 * @param noteId The unique identifier of the note
 * @returns A shareable URL that can be used to access the note
 */
export function getShareableNoteUrl(noteId: string): string {
  // Base URL from window.location or environment variable
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/notes`
      : process.env.NEXT_PUBLIC_BASE_URL || "";

  // Create the URL with the note ID as a query parameter
  return `${baseUrl}?id=${encodeURIComponent(noteId)}`;
}

export function camelize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
