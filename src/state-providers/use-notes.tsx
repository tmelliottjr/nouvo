"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { useImmer } from "use-immer";

export type FolderNode = {
  id: string;
  children: Node[];
  name: string;
};

type Node = Note | FolderNode;

export type NoteTree = Node[];

export type Note = {
  id: string;
  name: string;
  content: string;
  tags: Array<string>;
};

type NotesContext = {
  noteTree: NoteTree;
  addNote: (id?: string) => void;
  addFolder: (id?: string) => void;
  updateNote: (id: string, { name }: { name: string }) => void;
  selectNote: (id: string) => void;
  // TODO: Will this work as a "current working" note?
  currentNote: { note: Note; path: string[] } | null;
};

const NotesContext = createContext<NotesContext | undefined>(undefined);

function NotesProvider({ children }: PropsWithChildren) {
  const [noteTree, setNoteTree] = useImmer<NoteTree>([
    {
      id: "123",
      name: "folder 1",
      children: [
        {
          id: "12333",
          name: "sub-folder 1",
          children: [
            {
              id: "9887",
              name: "file 1",
              content: "",
              tags: [],
            },
          ],
        },
      ],
    },
    { id: "456", name: "top level file", content: "", tags: [] },
    {
      id: "789",
      children: [{ id: "99999", name: "file 2", content: "", tags: [] }],
      name: "folder 2",
    },
  ]);

  const [currentNote, setCurrentNote] = useImmer<{
    note: Note;
    path: string[];
  } | null>(null);

  /**
   * Adds a note to the provided parent, located by ID.
   * If an ID is not provided, the note is added at the root.
   */
  const addNote: NotesContext["addNote"] = (id) => {
    const note: Note = {
      id: crypto.randomUUID(),
      content: "",
      name: "",
      tags: [],
    };

    if (!id) {
      setNoteTree((prevNotes) => {
        prevNotes.push(note);
      });
    }
  };

  /**
   * Adds a folder to the provided parent, located by ID.
   * If an ID is not provided, the folder is added at the root.
   */
  const addFolder: NotesContext["addFolder"] = (id) => {
    if (!id) {
      setNoteTree((prevNotes) => {
        prevNotes.push({ id: crypto.randomUUID(), children: [], name: "" });
      });
    }
  };

  function findNoteById(
    id: string,
    notes: NoteTree,
    path: Array<string> = []
  ): { note: Note; path: string[] } | undefined {
    for (const note of notes) {
      if ("children" in note) {
        const result = findNoteById(id, note.children, [...path, note.name]);
        if (result) return result;
      } else if (note.id === id) {
        return { note, path: [...path, note.name] };
      }
    }
  }

  const updateNote: NotesContext["updateNote"] = (id, { name }) => {
    setNoteTree((prevNoteTree) => {
      const { note } = findNoteById(id, prevNoteTree) ?? {};

      if (!note) {
        console.warn(`Could not find not with id: ${id}`);
        return;
      }

      note.name = name;
    });
  };

  const selectNote: NotesContext["selectNote"] = (id) => {
    const result = findNoteById(id, noteTree);

    if (!result) {
      console.warn(`Could not find not with id: ${id}`);
      return;
    }

    setCurrentNote(result);
  };

  const value: NotesContext = {
    noteTree,
    addNote,
    updateNote,
    addFolder,
    currentNote,
    selectNote,
  };

  return <NotesContext value={value}>{children}</NotesContext>;
}

function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
}

export { NotesProvider, useNotes };
