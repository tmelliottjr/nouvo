"use client";

import { NoteView } from "@/components/notes/note-view";

// Import for development hook tracking
import { setUseWhatChange } from "@simbathesailor/use-what-changed";
import "highlight.js/styles/agate.css";

// Only Once in your app you can set whether to enable hooks tracking or not.
setUseWhatChange(process.env.NODE_ENV === "development");

export default function Notes() {
  return <NoteView />;
}
