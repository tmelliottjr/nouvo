import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
