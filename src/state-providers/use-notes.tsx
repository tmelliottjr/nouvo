"use client";

import { enableMapSet } from "immer";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useImmer } from "use-immer";

// Enable the MapSet plugin for Immer to handle Set objects
enableMapSet();

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
  deleteNote: (id: string) => void;
  selectNote: (id: string) => void;
  selectFolder: (id: string) => void;
  getNote: (id: string) => Note | undefined;
  getFolder: (id: string) => FolderNode | undefined;
  currentPath: string[] | null;
  currentNote: Note | undefined;
  currentFolder: FolderNode | undefined;
  selectedItemId: string | null;
  isViewingFolder: boolean;
  setSelectedItemId: (id: string | null) => void;
  setIsViewingFolder: (isViewingFolder: boolean) => void;
  moveNode: (nodeId: string, destinationFolderId: string) => void;
  expandedFolderIds: Set<string>;
  setFolderExpanded: (id: string, expanded: boolean) => void;
  isDirectPathToNote: (folderId: string) => boolean;
  isFromUrl: boolean;
};

const NotesContext = createContext<NotesContext | undefined>(undefined);

function NotesProvider({ children }: PropsWithChildren) {
  const [noteTree, setNoteTree] = useImmer<NoteTree>([
    {
      id: "projects-folder",
      name: "Projects",
      children: [
        {
          id: "web-dev-folder",
          name: "Web Development",
          children: [
            {
              id: "react-folder",
              name: "React",
              children: [
                {
                  id: "react-hooks-note",
                  name: "Hooks Overview",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Notes about React hooks and their usage patterns",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["react", "frontend"],
                },
                {
                  id: "react-patterns-note",
                  name: "Design Patterns",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Common React design patterns and best practices",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["react", "architecture"],
                },
              ],
            },
            {
              id: "vue-folder",
              name: "Vue",
              children: [
                {
                  id: "vue-composition-note",
                  name: "Composition API",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Notes on Vue 3 Composition API",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["vue", "frontend"],
                },
              ],
            },
            {
              id: "angular-folder",
              name: "Angular",
              children: [],
            },
          ],
        },
        {
          id: "mobile-dev-folder",
          name: "Mobile Development",
          children: [
            {
              id: "react-native-note",
              name: "React Native Basics",
              content: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Getting started with React Native",
                        type: "text",
                      },
                    ],
                  },
                ],
              }),
              tags: ["react-native", "mobile"],
            },
            {
              id: "flutter-folder",
              name: "Flutter",
              children: [
                {
                  id: "flutter-widgets-note",
                  name: "Common Widgets",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Overview of common Flutter widgets",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["flutter", "mobile"],
                },
                {
                  id: "flutter-state-note",
                  name: "State Management",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Comparing state management approaches in Flutter",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["flutter", "architecture"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "personal-folder",
      name: "Personal",
      children: [
        {
          id: "travel-folder",
          name: "Travel",
          children: [
            {
              id: "japan-note",
              name: "Japan Trip 2024",
              content: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Planning and itinerary for Japan trip",
                        type: "text",
                      },
                    ],
                  },
                ],
              }),
              tags: ["travel", "planning"],
            },
            {
              id: "europe-note",
              name: "Europe Backpacking",
              content: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: "Notes for backpacking through Europe",
                        type: "text",
                      },
                    ],
                  },
                ],
              }),
              tags: ["travel", "planning"],
            },
          ],
        },
        {
          id: "recipes-folder",
          name: "Recipes",
          children: [
            {
              id: "italian-folder",
              name: "Italian",
              children: [
                {
                  id: "pasta-note",
                  name: "Homemade Pasta",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Recipe for homemade pasta from scratch",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["food", "italian"],
                },
                {
                  id: "risotto-note",
                  name: "Mushroom Risotto",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Classic mushroom risotto recipe",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["food", "italian"],
                },
              ],
            },
            {
              id: "desserts-folder",
              name: "Desserts",
              children: [
                {
                  id: "tiramisu-note",
                  name: "Tiramisu",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          { text: "Classic tiramisu recipe", type: "text" },
                        ],
                      },
                    ],
                  }),
                  tags: ["food", "dessert"],
                },
                {
                  id: "cheesecake-note",
                  name: "NY Cheesecake",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "New York style cheesecake recipe",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["food", "dessert"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "work-folder",
      name: "Work",
      children: [
        {
          id: "meetings-folder",
          name: "Meetings",
          children: [
            {
              id: "team-standup-note",
              name: "Team Standups",
              content: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { text: "Notes from daily team standups", type: "text" },
                    ],
                  },
                ],
              }),
              tags: ["work", "meetings"],
            },
            {
              id: "q2-planning-note",
              name: "Q2 Planning",
              content: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { text: "Q2 2025 planning meeting notes", type: "text" },
                    ],
                  },
                ],
              }),
              tags: ["work", "planning"],
            },
          ],
        },
        {
          id: "projects-work-folder",
          name: "Projects",
          children: [
            {
              id: "project-alpha-folder",
              name: "Project Alpha",
              children: [
                {
                  id: "alpha-requirements-note",
                  name: "Requirements",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Project Alpha requirements and specifications",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["work", "requirements"],
                },
                {
                  id: "alpha-timeline-note",
                  name: "Timeline",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          {
                            text: "Project Alpha timeline and milestones",
                            type: "text",
                          },
                        ],
                      },
                    ],
                  }),
                  tags: ["work", "planning"],
                },
              ],
            },
            {
              id: "project-beta-folder",
              name: "Project Beta",
              children: [
                {
                  id: "beta-notes-note",
                  name: "Meeting Notes",
                  content: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          { text: "Project Beta meeting notes", type: "text" },
                        ],
                      },
                    ],
                  }),
                  tags: ["work", "meetings"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "quick-notes-folder",
      name: "Quick Notes",
      children: [
        {
          id: "shopping-note",
          name: "Shopping List",
          content: JSON.stringify({
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ text: "Groceries and items to buy", type: "text" }],
              },
            ],
          }),
          tags: ["personal", "shopping"],
        },
        {
          id: "ideas-note",
          name: "App Ideas",
          content: JSON.stringify({
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  { text: "Brainstorming for new app ideas", type: "text" },
                ],
              },
            ],
          }),
          tags: ["ideas", "development"],
        },
      ],
    },
  ]);

  const [currentPath, setCurrentPath] = useImmer<string[] | null>(null);
  const [selectedItemId, setSelectedItemId] = useImmer<string | null>(null);
  const [isViewingFolder, setIsViewingFolder] = useImmer<boolean>(false);
  const [expandedFolderIds, setExpandedFolderIds] = useImmer<Set<string>>(
    new Set()
  );
  const [isFromUrl, setIsFromUrl] = useImmer<boolean>(false);

  // Track the paths to the current note for auto-expansion
  const [directPathFolderIds, setDirectPathFolderIds] = useImmer<Set<string>>(
    new Set()
  );

  /**
   * Adds a note to the provided parent, located by ID.
   * If an ID is not provided, the note is added at the root.
   */
  const addNote: NotesContext["addNote"] = (id) => {
    const noteId = crypto.randomUUID();
    const note: Note = {
      id: noteId,
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ text: "", type: "text" }],
          },
        ],
      }),
      name: "",
      tags: [],
    };

    if (!id) {
      // Add to root level
      setNoteTree((prevNotes) => {
        prevNotes.push(note);
      });
    } else {
      // Add to specified folder
      setNoteTree((prevNotes) => {
        const addNoteToFolder = (tree: NoteTree): boolean => {
          for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.id === id && isFolder(node)) {
              // Found the folder, add the note
              node.children.push(note);
              return true;
            }

            if (isFolder(node)) {
              if (addNoteToFolder(node.children)) {
                return true;
              }
            }
          }
          return false;
        };

        addNoteToFolder(prevNotes);
      });

      // If adding to a folder, also expand that folder
      setFolderExpanded(id, true);
    }

    // Return the ID but don't select it yet - selection happens after naming
    return noteId;
  };

  /**
   * Adds a folder to the provided parent, located by ID.
   * If an ID is not provided, the folder is added at the root.
   */
  const addFolder: NotesContext["addFolder"] = (id) => {
    const folderId = crypto.randomUUID();
    const folder: FolderNode = {
      id: folderId,
      children: [],
      name: "",
    };

    if (!id) {
      // Add to root level
      setNoteTree((prevNotes) => {
        prevNotes.push(folder);
      });
    } else {
      // Add to specified parent folder
      setNoteTree((prevNotes) => {
        const addFolderToFolder = (tree: NoteTree): boolean => {
          for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.id === id && isFolder(node)) {
              // Found the parent folder, add the new folder
              node.children.push(folder);
              return true;
            }

            if (isFolder(node)) {
              if (addFolderToFolder(node.children)) {
                return true;
              }
            }
          }
          return false;
        };

        addFolderToFolder(prevNotes);
      });

      // If adding to a folder, also expand that folder
      setFolderExpanded(id, true);
    }

    // Return the ID but don't select it yet - selection happens after naming
    return folderId;
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

  const getNote: NotesContext["getNote"] = (id) => {
    const { node } = findNodeById(id, noteTree) ?? {};

    if (!node || isFolder(node)) {
      console.warn(`Could not find note with id: ${id}`);
      return;
    }

    return node;
  };

  const getFolder: NotesContext["getFolder"] = (id) => {
    const { node } = findNodeById(id, noteTree) ?? {};

    if (!node || !isFolder(node)) {
      console.warn(`Could not find folder with id: ${id}`);
      return;
    }

    return node;
  };

  const updateNote: NotesContext["updateNote"] = (id, updateProps) => {
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

    // If we're updating the name from empty to something, select the note to ensure focus
    if (
      updateProps.name &&
      updateProps.name !== "" &&
      getNote(id)?.name === ""
    ) {
      // Ensure we're in note view mode after naming the note
      setIsViewingFolder(false);
      selectNote(id);
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

  const deleteNote: NotesContext["deleteNote"] = (id) => {
    // First check if the note exists
    const noteToDelete = getNote(id);
    if (!noteToDelete) return;

    // If we're currently viewing this note, reset to folder view
    if (selectedItemId === id) {
      setSelectedItemId(null);
      setIsViewingFolder(true);
    }

    // Remove the note from the tree
    setNoteTree((prevNoteTree) => {
      // Function to recursively search and remove the note
      const removeNoteFromTree = (tree: NoteTree): boolean => {
        const nodeIndex = tree.findIndex((node) => node.id === id);

        if (nodeIndex >= 0) {
          // Found the note, remove it
          tree.splice(nodeIndex, 1);
          return true;
        }

        // Search in folders
        for (const node of tree) {
          if (isFolder(node)) {
            if (removeNoteFromTree(node.children)) {
              return true;
            }
          }
        }

        return false;
      };

      removeNoteFromTree(prevNoteTree);
    });
  };

  const selectNote: NotesContext["selectNote"] = (id) => {
    const result = findNodeById(id, noteTree);

    if (!result || isFolder(result.node)) {
      console.warn(`Could not find note with id: ${id}`);
      return;
    }

    setSelectedItemId(id);
    setCurrentPath(result.path);
    // Always ensure we're not in folder view mode when selecting a note
    setIsViewingFolder(false);
  };

  const selectFolder: NotesContext["selectFolder"] = (id) => {
    const result = findNodeById(id, noteTree);

    if (!result || !isFolder(result.node)) {
      console.warn(`Could not find folder with id: ${id}`);
      return;
    }

    setSelectedItemId(id);
    setCurrentPath(result.path);
    setIsViewingFolder(true);
  };

  const moveNode: NotesContext["moveNode"] = (nodeId, destinationFolderId) => {
    setNoteTree((prevNoteTree) => {
      // Find the node to move
      let nodeToMove: Node | undefined;
      let sourceParent: FolderNode | undefined;
      let sourceIndex = -1;

      // Function to find the node and its parent
      const findNodeAndParent = (
        tree: NoteTree,
        parent?: FolderNode
      ): boolean => {
        const index = tree.findIndex((node) => node.id === nodeId);

        if (index >= 0) {
          // Found the node
          nodeToMove = tree[index];
          sourceParent = parent;
          sourceIndex = index;
          return true;
        }

        // Search in folders
        for (const node of tree) {
          if (isFolder(node)) {
            if (findNodeAndParent(node.children, node)) {
              return true;
            }
          }
        }

        return false;
      };

      // Find the destination folder
      const findDestinationFolder = (
        tree: NoteTree
      ): FolderNode | undefined => {
        // Check if it's the root level
        if (destinationFolderId === "root") {
          return undefined;
        }

        for (const node of tree) {
          if (node.id === destinationFolderId && isFolder(node)) {
            return node;
          }

          if (isFolder(node)) {
            const result = findDestinationFolder(node.children);
            if (result) return result;
          }
        }
        return undefined;
      };

      // Find the node to move and its parent
      findNodeAndParent(prevNoteTree);

      // If we couldn't find the node, abort
      if (!nodeToMove) {
        console.warn(`Could not find node with id: ${nodeId}`);
        return;
      }

      // Find the destination folder
      const destinationFolder = findDestinationFolder(prevNoteTree);

      // Prevent moving a folder into itself or its descendants
      if (isFolder(nodeToMove)) {
        const isSelfOrDescendant = (
          folder: FolderNode,
          targetId: string
        ): boolean => {
          if (folder.id === targetId) return true;
          return folder.children.some(
            (child) => isFolder(child) && isSelfOrDescendant(child, targetId)
          );
        };

        if (
          destinationFolder &&
          isSelfOrDescendant(nodeToMove, destinationFolder.id)
        ) {
          console.warn("Cannot move a folder into itself or its descendants");
          return;
        }
      }

      // Remove node from its current location
      if (sourceParent) {
        sourceParent.children.splice(sourceIndex, 1);
      } else {
        prevNoteTree.splice(sourceIndex, 1);
      }

      // Add node to its new location
      if (destinationFolder) {
        destinationFolder.children.push(nodeToMove);
      } else {
        // If no destination folder is specified, add to root
        prevNoteTree.push(nodeToMove);
      }
    });
  };

  // Find the direct path to the selected note and collect all folder IDs on that path
  const findFolderIdsInPathToNote = (
    noteId: string,
    tree: NoteTree,
    path: string[] = []
  ): string[] => {
    for (const node of tree) {
      if (!isFolder(node) && node.id === noteId) {
        // Found the note, return the path of folder IDs
        return path;
      }

      if (isFolder(node)) {
        // Check children of this folder
        const folderPath = [...path, node.id];
        const result = findFolderIdsInPathToNote(
          noteId,
          node.children,
          folderPath
        );
        if (result.length > 0) {
          return result;
        }
      }
    }
    return [];
  };

  // Function to check if a folder is in the direct path to the current note
  const isDirectPathToNote: NotesContext["isDirectPathToNote"] = (folderId) => {
    return directPathFolderIds.has(folderId);
  };

  // Function to set a folder's expanded state
  const setFolderExpanded: NotesContext["setFolderExpanded"] = (
    id,
    expanded
  ) => {
    setExpandedFolderIds((prev) => {
      const newSet = new Set(prev);
      if (expanded) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  // Effect to handle URL navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get("id");

    if (noteId) {
      // Mark that we're navigating from a URL
      setIsFromUrl(true);

      // Find the direct path to the note and auto-expand those folders
      const pathFolderIds = findFolderIdsInPathToNote(noteId, noteTree);

      if (pathFolderIds.length > 0) {
        // Store the direct path folder IDs
        setDirectPathFolderIds(new Set(pathFolderIds));

        // Auto-expand folders along the path to the note
        setExpandedFolderIds(new Set(pathFolderIds));

        // Select the note
        selectNote(noteId);
      }
    } else {
      setIsFromUrl(false);
    }
  }, []);

  const currentNote = useMemo(() => {
    if (selectedItemId && !isViewingFolder) {
      return getNote(selectedItemId);
    }
    return undefined;
  }, [selectedItemId, isViewingFolder]);

  const currentFolder = useMemo(() => {
    if (selectedItemId && isViewingFolder) {
      return getFolder(selectedItemId);
    }
    return undefined;
  }, [selectedItemId, isViewingFolder]);

  const value: NotesContext = {
    noteTree,
    addNote,
    updateNote,
    addFolder,
    deleteNote,
    currentNote,
    currentFolder,
    currentPath,
    selectNote,
    selectFolder,
    updateFolder,
    getNote,
    getFolder,
    selectedItemId,
    isViewingFolder,
    setSelectedItemId,
    setIsViewingFolder,
    moveNode,
    expandedFolderIds,
    setFolderExpanded,
    isDirectPathToNote,
    isFromUrl,
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
