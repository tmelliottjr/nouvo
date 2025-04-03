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

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

type NotesContext = {
  noteTree: NoteTree;
  addNote: (id?: string) => void;
  addFolder: (id?: string) => void;
  updateNote: (
    id: string,
    updateProps: AtLeastOne<{ name: string; content: string }>
  ) => void;
  updateFolder: (id: string, updateProps: { name: string }) => void;
  selectNote: (id: string) => void;
  // TODO: Will this work as a "current working" note?
  currentNote: Note | null;
  currentPath: string[] | null;
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

  const [currentNote, setCurrentNote] = useImmer<Note | null>(null);
  const [currentPath, setCurrentPath] = useImmer<string[] | null>(null);

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

  function findNodeById(
    id: string,
    tree: NoteTree,
    path: Array<string> = []
  ): { node: Node; path: string[] } | undefined {
    for (const node of tree) {
      if (node.id === id) {
        return { node: node, path: [...path, node.name] };
      }

      if (isFolder(node)) {
        const result = findNodeById(id, node.children, [...path, node.name]);
        if (result) return result;
      }
    }
  }

  function isFolder(node: Node): node is FolderNode {
    return "children" in node;
  }

  const updateNote: NotesContext["updateNote"] = (id, updateProps) => {
		// I'm already updating the _actual_ note every time, why not just use this alone?
    setNoteTree((prevNoteTree) => {
      const { node } = findNodeById(id, prevNoteTree) ?? {};

      if (!node || isFolder(node)) {
        console.warn(`Could not find note with id: ${id}`);
        return;
      }

      for (const key in updateProps) {
        const typedKey = key as keyof typeof updateProps;
        const value = updateProps[typedKey];
        if (value !== undefined) {
          node[typedKey] = value;
        }
      }
    });

		// This seems really gross.
    if (currentNote) {
      setCurrentNote((prevNote) => {
        if (!prevNote) return;

        for (const key in updateProps) {
          const typedKey = key as keyof typeof updateProps;
          const value = updateProps[typedKey];
          if (value !== undefined) {
            prevNote[typedKey] = value;
          }
        }
      });
    }
  };

  const updateFolder: NotesContext["updateFolder"] = (id, updateProps) => {
    setNoteTree((prevNoteTree) => {
      const { node: note } = findNodeById(id, prevNoteTree) ?? {};

      if (!note || !isFolder(note)) {
        console.warn(`Could not find folder with id: ${id}`);
        return;
      }

      for (const key in updateProps) {
        const typedKey = key as keyof typeof updateProps;
        note[typedKey] = updateProps[typedKey];
      }
    });
  };

  const selectNote: NotesContext["selectNote"] = (id) => {
    const result = findNodeById(id, noteTree);

    if (!result || isFolder(result.node)) {
      console.warn(`Could not find not with id: ${id}`);
      return;
    }

    setCurrentNote(result.node);
    setCurrentPath(result.path);
  };

  const value: NotesContext = {
    noteTree,
    addNote,
    updateNote,
    addFolder,
    currentNote,
    currentPath,
    selectNote,
    updateFolder,
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
