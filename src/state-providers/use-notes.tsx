"use client";

import {
  CreationStateMap,
  FolderNode,
  NoteNode,
  seedData,
  TreeData,
  TreeNode,
} from "@/lib/seed-data";
import { enableMapSet } from "immer";
import { useParams, useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useImmer } from "use-immer";

// Enable the MapSet plugin for Immer to handle Set objects
enableMapSet();

type NotesContext = {
  // Tree data structure - flat map of nodes
  treeData: TreeData;
  // Operations
  addNote: (parentId?: string | null) => Promise<string>;
  addFolder: (parentId?: string | null) => Promise<string>;
  updateNote: (
    id: string,
    updateProps: Partial<{ name: string; content: string; tags: string[] }>
  ) => Promise<void>;
  updateFolder: (id: string, updateProps: { name: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  moveNode: (nodeId: string, destinationFolderId: string) => Promise<void>;
  // Selection state
  selectNote: (id: string) => void;
  deselectNote: () => void;
  selectFolder: (id: string) => void;
  // Getters
  getNote: (id: string) => NoteNode | undefined;
  getFolder: (id: string) => FolderNode | undefined;
  // Current states
  currentPath: string[] | null;
  currentNote: NoteNode | undefined;
  currentFolder: FolderNode | undefined;
  selectedItemId: string | null;
  isViewingFolder: boolean;
  setSelectedItemId: (id: string | null) => void;
  setIsViewingFolder: (isViewingFolder: boolean) => void;
  // Folder expansion
  expandedFolderIds: Set<string>;
  setFolderExpanded: (id: string, expanded: boolean) => void;
  isDirectPathToNote: (folderId: string) => boolean;
  // URL handling
  isFromUrl: boolean;
  // Creation state
  creationStateById: CreationStateMap;
  completeNodeCreation: (id: string, name: string) => Promise<void>;
  // Derived data
  rootNodes: TreeNode[];
  getChildNodes: (folderId: string) => TreeNode[];
  // Data loading state
  isLoading: boolean;
};

const NotesContext = createContext<NotesContext | undefined>(undefined);

function NotesProvider({ children }: PropsWithChildren) {
  const params = useParams();
  const router = useRouter();

  // Main state - flat tree structure
  const [treeData, setTreeData] = useImmer<TreeData>(seedData.treeData);

  // Root IDs (top-level entries)
  const [rootIds, setRootIds] = useImmer<string[]>(seedData.rootIds);

  // Node creation/editing state
  const [creationStateById, setCreationStateById] = useImmer<CreationStateMap>(
    {}
  );

  // UI state
  const [currentPath, setCurrentPath] = useImmer<string[] | null>(null);
  const [selectedItemId, setSelectedItemId] = useImmer<string | null>(null);
  const [isViewingFolder, setIsViewingFolder] = useImmer<boolean>(false);
  const [expandedFolderIds, setExpandedFolderIds] = useImmer<Set<string>>(
    new Set()
  );
  const [isFromUrl, setIsFromUrl] = useImmer<boolean>(false);
  const [directPathFolderIds, setDirectPathFolderIds] = useImmer<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useImmer<boolean>(true);

  // Fetch notes from API on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        // Fetch notes from our API
        const notesResponse = await fetch("/api/notes");

        if (!notesResponse.ok) {
          throw new Error("Failed to fetch notes");
        }

        const notes = await notesResponse.json();

        // Fetch folders from our API
        const foldersResponse = await fetch("/api/folders");

        if (!foldersResponse.ok) {
          throw new Error("Failed to fetch folders");
        }

        const folders = await foldersResponse.json();

        // Process and convert to our tree data structure
        const newTreeData: TreeData = {};
        const newRootIds: string[] = [];

        // Add folders to tree data
        folders.forEach(
          (folder: {
            id: string;
            name: string;
            parentId: string | null;
            childIds: string[];
          }) => {
            const folderNode: FolderNode = {
              id: folder.id,
              name: folder.name,
              type: "folder",
              parentId: folder.parentId,
              childIds: folder.childIds || [],
            };

            newTreeData[folder.id] = folderNode;

            if (!folder.parentId) {
              newRootIds.push(folder.id);
            }
          }
        );

        // Add notes to tree data
        notes.forEach(
          (note: {
            id: string;
            name: string;
            parentId: string | null;
            content: string;
            tags: string[];
            creationDate: string;
          }) => {
            const noteNode: NoteNode = {
              id: note.id,
              name: note.name,
              type: "note",
              parentId: note.parentId,
              childIds: [],
              content: note.content,
              tags: note.tags || [],
              creationDate: note.creationDate || new Date().toISOString(),
            };

            newTreeData[note.id] = noteNode;

            if (!note.parentId) {
              newRootIds.push(note.id);
            } else if (newTreeData[note.parentId]) {
              // Add note to parent's childIds if parent exists
              const parent = newTreeData[note.parentId] as FolderNode;
              if (!parent.childIds.includes(note.id)) {
                parent.childIds.push(note.id);
              }
            }
          }
        );

        // Update state with fetched data
        setTreeData(newTreeData);
        setRootIds(newRootIds);
      } catch (error) {
        console.error("Error fetching notes and folders:", error);
        // Keep existing seed data if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [setTreeData, setRootIds, setIsLoading]);

  /**
   * Gets all child nodes for a given folder ID
   */
  const getChildNodes = useCallback(
    (folderId: string): TreeNode[] => {
      const folder = treeData[folderId] as FolderNode;
      if (!folder || !folder.childIds) return [];

      return folder.childIds.map((id) => treeData[id]).filter(Boolean);
    },
    [treeData]
  );

  /**
   * Gets all root level nodes
   */
  const rootNodes = useMemo(() => {
    return rootIds.map((id) => treeData[id]).filter(Boolean);
  }, [rootIds, treeData]);

  /**
   * Finds the path from root to a node (its ancestry)
   */
  const getNodePath = useCallback(
    (nodeId: string): string[] => {
      const path: string[] = [];
      let node = treeData[nodeId];

      if (!node) return path;

      // Add the current node name
      path.unshift(node.name);

      // Traverse up to find all ancestors
      while (node && node.parentId) {
        const parent = treeData[node.parentId];
        if (parent) {
          path.unshift(parent.name);
          node = parent;
        } else {
          break;
        }
      }

      return path;
    },
    [treeData]
  );

  /**
   * Checks if nodeB is a descendant of nodeA
   */
  const isDescendantOf = useCallback(
    (nodeB: string, nodeA: string): boolean => {
      if (nodeA === nodeB) return true;

      const nodeAData = treeData[nodeA];
      if (!nodeAData || nodeAData.type !== "folder") return false;

      const folder = nodeAData as FolderNode;
      if (folder.childIds.includes(nodeB)) return true;

      // Recursively check each child
      return folder.childIds.some((childId) => isDescendantOf(nodeB, childId));
    },
    [treeData]
  );

  /**
   * Removes a node and updates the parent's children
   */
  const removeNode = useCallback(
    (nodeId: string): void => {
      const node = treeData[nodeId];
      if (!node) return;

      // Get parent info
      const parentId = node.parentId;

      // Remove node from parent's children
      if (parentId) {
        setTreeData((draft) => {
          const parent = draft[parentId];
          if (parent && parent.type === "folder") {
            parent.childIds = parent.childIds.filter((id) => id !== nodeId);
          }
        });
      } else {
        // Remove from root
        setRootIds((draft) => {
          return draft.filter((id) => id !== nodeId);
        });
      }

      // Remove node from tree data
      setTreeData((draft) => {
        delete draft[nodeId];
      });

      // Clear creation state
      setCreationStateById((draft) => {
        delete draft[nodeId];
      });
    },
    [treeData, setTreeData, setRootIds, setCreationStateById]
  );

  /**
   * Adds a note under the provided parent ID
   */
  const addNote = useCallback(
    async (parentId: string | null = null): Promise<string> => {
      const noteId = crypto.randomUUID();

      // Create empty note
      const note: NoteNode = {
        id: noteId,
        name: "", // Empty name initially
        type: "note",
        parentId: parentId,
        childIds: [],
        content: JSON.stringify({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ text: "", type: "text" }],
            },
          ],
        }),
        tags: [],
        creationDate: new Date().toISOString(),
      };

      // Add note to tree data
      setTreeData((draft) => {
        draft[noteId] = note;
      });

      // Add note to parent's children or root
      if (parentId) {
        setTreeData((draft) => {
          const parent = draft[parentId];
          if (parent && parent.type === "folder") {
            parent.childIds.unshift(noteId);
          }
        });

        // Auto-expand parent folder
        setExpandedFolderIds((draft) => {
          draft.add(parentId);
        });
      } else {
        // Add to root if no parent specified
        setRootIds((draft) => {
          draft.unshift(noteId);
        });
      }

      // Track creation state
      setCreationStateById((draft) => {
        draft[noteId] = {
          status: "creating",
          parentId,
        };
      });

      // Create note in the API
      // try {
      //   await fetch("/api/notes", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       id: noteId,
      //       name: "",
      //       parentId,
      //       content: note.content,
      //       tags: note.tags,
      //       creationDate: note.creationDate,
      //     }),
      //   });
      // } catch (error) {
      //   console.error("Error creating note in API:", error);
      // }

      return noteId;
    },
    [setTreeData, setRootIds, setExpandedFolderIds, setCreationStateById]
  );

  /**
   * Adds a folder under the provided parent ID
   */
  const addFolder = useCallback(
    async (parentId: string | null = null): Promise<string> => {
      const folderId = crypto.randomUUID();

      // Create empty folder
      const folder: FolderNode = {
        id: folderId,
        name: "", // Empty name initially
        type: "folder",
        parentId: parentId,
        childIds: [],
      };

      // Add folder to tree data
      setTreeData((draft) => {
        draft[folderId] = folder;
      });

      // Add folder to parent's children or root
      if (parentId) {
        setTreeData((draft) => {
          const parent = draft[parentId];
          if (parent && parent.type === "folder") {
            parent.childIds.unshift(folderId);
          }
        });

        // Auto-expand parent folder
        setExpandedFolderIds((draft) => {
          draft.add(parentId);
        });
      } else {
        // Add to root if no parent specified
        setRootIds((draft) => {
          draft.unshift(folderId);
        });
      }

      // Track creation state
      setCreationStateById((draft) => {
        draft[folderId] = {
          status: "creating",
          parentId,
        };
      });

      // Don't create folder in API yet - wait until a name is provided

      return folderId;
    },
    [setTreeData, setRootIds, setExpandedFolderIds, setCreationStateById]
  );

  /**
   * Finds all folder IDs in the path to a note
   */
  const findFolderIdsInPathToNote = useCallback(
    (noteId: string): string[] => {
      const note = treeData[noteId];
      if (!note) return [];

      const folderPath: string[] = [];

      // Start with the direct parent
      let currentId = note.parentId;
      while (currentId) {
        folderPath.push(currentId);

        // Move up to the next parent
        const parent = treeData[currentId];
        currentId = parent?.parentId || null;
      }

      return folderPath;
    },
    [treeData]
  );

  /**
   * Deselects the current note/folder
   */
  const deselectNote = useCallback((): void => {
    setSelectedItemId(null);
    setCurrentPath(null);
    setIsFromUrl(false);
  }, [setSelectedItemId, setCurrentPath, setIsFromUrl]);

  /**
   * Selects a note and updates UI state
   */
  const selectNote = useCallback(
    (id: string): void => {
      if (!id) {
        deselectNote();
        return;
      }

      const note = treeData[id];
      if (!note || note.type !== "note") {
        console.warn(`Could not find note with id: ${id}`);
        return;
      }

      setSelectedItemId(id);

      // Calculate path for UI display
      const path = getNodePath(id);
      setCurrentPath(path);

      // Ensure we're in note view mode
      setIsViewingFolder(false);

      // Calculate and expand all folders in the path to this note
      const folderIds = findFolderIdsInPathToNote(id);
      setDirectPathFolderIds(new Set(folderIds));

      // Expand all folders in the path
      setExpandedFolderIds((draft) => {
        folderIds.forEach((folderId) => draft.add(folderId));
        return draft;
      });
    },
    [
      treeData,
      setSelectedItemId,
      getNodePath,
      setCurrentPath,
      setIsViewingFolder,
      findFolderIdsInPathToNote,
      setDirectPathFolderIds,
      setExpandedFolderIds,
      deselectNote,
    ]
  );

  /**
   * Completes the creation process for a node by setting its name
   */
  const completeNodeCreation = useCallback(
    async (id: string, name: string): Promise<void> => {
      const state = creationStateById[id];
      if (!state) return;

      const node = treeData[id];
      if (!node) return;

      if (name.trim() === "") {
        // If name is empty, remove the node
        removeNode(id);
        return;
      }

      // Update name
      setTreeData((draft) => {
        if (draft[id]) {
          draft[id].name = name;
        }
      });

      // Clear creation state
      setCreationStateById((draft) => {
        delete draft[id];
      });

      // Update in API
      try {
        if (node.type === "note") {
          await fetch("/api/notes", {
            method: "POST", // Use PUT to update existing note or create with ID
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              name,
              parentId: node.parentId,
            }),
          });
        } else if (node.type === "folder") {
          await fetch("/api/folders", {
            method: "POST", // First-time creation with proper name
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              name,
              parentId: node.parentId,
            }),
          });
        }
      } catch (error) {
        console.error(`Error creating ${node.type} in API:`, error);
      }

      // Select the node if it's a note
      if (node.type === "note") {
        selectNote(id);
      }
    },
    [
      creationStateById,
      treeData,
      setTreeData,
      setCreationStateById,
      removeNode,
      selectNote,
    ]
  );

  /**
   * Gets a note by ID
   */
  const getNote = useCallback(
    (id: string): NoteNode | undefined => {
      const node = treeData[id];
      if (!node || node.type !== "note") {
        return undefined;
      }
      return node as NoteNode;
    },
    [treeData]
  );

  /**
   * Gets a folder by ID
   */
  const getFolder = useCallback(
    (id: string): FolderNode | undefined => {
      const node = treeData[id];
      if (!node || node.type !== "folder") {
        return undefined;
      }
      return node as FolderNode;
    },
    [treeData]
  );

  /**
   * Selects a folder and updates UI state
   */
  const selectFolder = useCallback(
    (id: string): void => {
      const folder = treeData[id];
      if (!folder || folder.type !== "folder") {
        console.warn(`Could not find folder with id: ${id}`);
        return;
      }

      setSelectedItemId(id);

      // Calculate path for UI display
      const path = getNodePath(id);
      setCurrentPath(path);

      // Ensure we're in folder view mode
      setIsViewingFolder(true);
    },
    [
      treeData,
      setSelectedItemId,
      getNodePath,
      setCurrentPath,
      setIsViewingFolder,
    ]
  );

  /**
   * Updates a note's properties
   */
  const updateNote = useCallback(
    async (
      id: string,
      updateProps: Partial<{ name: string; content: string; tags: string[] }>
    ): Promise<void> => {
      const note = treeData[id];
      if (!note || note.type !== "note") {
        console.warn(`Could not find note with id: ${id}`);
        return;
      }

      setTreeData((draft) => {
        const noteToUpdate = draft[id] as NoteNode;

        // Update each property if provided
        if (updateProps.name !== undefined) {
          noteToUpdate.name = updateProps.name;
        }

        if (updateProps.content !== undefined) {
          noteToUpdate.content = updateProps.content;
        }

        if (updateProps.tags !== undefined) {
          noteToUpdate.tags = updateProps.tags;
        }
      });

      // If we're updating the name from empty to something, select the note to ensure focus
      if (updateProps.name && updateProps.name !== "" && note.name === "") {
        // Ensure we're in note view mode after naming the note
        setIsViewingFolder(false);
        selectNote(id);
      }

      // Update note in the API
      try {
        await fetch("/api/notes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            ...updateProps,
          }),
        });
      } catch (error) {
        console.error("Error updating note in API:", error);
      }
    },
    [treeData, setTreeData, setIsViewingFolder, selectNote]
  );

  /**
   * Updates a folder's properties
   */
  const updateFolder = useCallback(
    async (id: string, updateProps: { name: string }): Promise<void> => {
      const folder = treeData[id];
      if (!folder || folder.type !== "folder") {
        console.warn(`Could not find folder with id: ${id}`);
        return;
      }

      setTreeData((draft) => {
        const folderToUpdate = draft[id];

        if (updateProps.name !== undefined) {
          folderToUpdate.name = updateProps.name;
        }
      });

      // Update folder in the API
      try {
        await fetch("/api/folders", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            ...updateProps,
          }),
        });
      } catch (error) {
        console.error("Error updating folder in API:", error);
      }
    },
    [treeData, setTreeData]
  );

  /**
   * Deletes a note and handles navigation if needed
   */
  const deleteNote = useCallback(
    async (id: string): Promise<void> => {
      const note = treeData[id];
      if (!note || note.type !== "note") {
        console.warn(`Could not find note with id: ${id}`);
        return;
      }

      // Check if we're currently viewing this note
      const isCurrentlyViewing = selectedItemId === id && !isViewingFolder;

      // If we're currently viewing this note, reset selection
      if (selectedItemId === id) {
        setSelectedItemId(null);
        setIsViewingFolder(true);
      }

      // Remove the note
      removeNode(id);

      // If we were viewing the note, navigate to main notes view
      if (isCurrentlyViewing) {
        router.push("/notes");
      }

      // Delete note from the API
      try {
        await fetch(`/api/notes?id=${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting note in API:", error);
      }
    },
    [
      treeData,
      selectedItemId,
      isViewingFolder,
      setSelectedItemId,
      setIsViewingFolder,
      removeNode,
      router,
    ]
  );

  /**
   * Recursively deletes a folder and all its contents
   */
  const deleteFolder = useCallback(
    async (id: string): Promise<void> => {
      const folder = treeData[id];
      if (!folder || folder.type !== "folder") {
        console.warn(`Could not find folder with id: ${id}`);
        return;
      }

      // If we're currently viewing this folder, reset selection
      if (selectedItemId === id) {
        setSelectedItemId(null);
        setIsViewingFolder(true);
      }

      // Delete all children first
      const childIds = [...folder.childIds]; // Create a copy to avoid mutation issues
      for (const childId of childIds) {
        const childNode = treeData[childId];
        if (childNode) {
          if (childNode.type === "folder") {
            await deleteFolder(childId);
          } else {
            await deleteNote(childId);
          }
        }
      }

      // Finally remove the folder itself
      removeNode(id);

      // Delete folder from the API
      try {
        await fetch(`/api/folders?id=${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error deleting folder in API:", error);
      }
    },
    [
      treeData,
      selectedItemId,
      setSelectedItemId,
      setIsViewingFolder,
      deleteNote,
      removeNode,
    ]
  );

  /**
   * Moves a node to a new parent
   */
  const moveNode = useCallback(
    async (nodeId: string, destinationFolderId: string): Promise<void> => {
      const node = treeData[nodeId];
      if (!node) {
        console.warn(`Could not find node with id: ${nodeId}`);
        return;
      }

      // Get current parent
      const sourceParentId = node.parentId;

      // Prevent moving a folder into itself or its descendants
      if (node.type === "folder" && destinationFolderId !== "root") {
        if (isDescendantOf(destinationFolderId, nodeId)) {
          console.warn("Cannot move a folder into itself or its descendants");
          return;
        }
      }

      // Remove from current parent's children
      if (sourceParentId) {
        setTreeData((draft) => {
          const sourceParent = draft[sourceParentId];
          if (sourceParent && sourceParent.type === "folder") {
            sourceParent.childIds = sourceParent.childIds.filter(
              (id) => id !== nodeId
            );
          }
        });
      } else {
        // Remove from root
        setRootIds((draft) => draft.filter((id) => id !== nodeId));
      }

      // Update node's parent reference
      setTreeData((draft) => {
        if (draft[nodeId]) {
          draft[nodeId].parentId =
            destinationFolderId === "root" ? null : destinationFolderId;
        }
      });

      // Add to new parent
      if (destinationFolderId === "root") {
        // Add to root
        setRootIds((draft) => [...draft, nodeId]);
      } else {
        // Add to destination folder's children
        setTreeData((draft) => {
          const destFolder = draft[destinationFolderId];
          if (destFolder && destFolder.type === "folder") {
            destFolder.childIds.push(nodeId);
          }
        });
      }

      // Update in API
      try {
        if (node.type === "note") {
          await fetch("/api/notes", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: nodeId,
              parentId:
                destinationFolderId === "root" ? null : destinationFolderId,
            }),
          });
        } else if (node.type === "folder") {
          await fetch("/api/folders", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: nodeId,
              parentId:
                destinationFolderId === "root" ? null : destinationFolderId,
            }),
          });
        }
      } catch (error) {
        console.error(`Error moving ${node.type} in API:`, error);
      }
    },
    [treeData, setTreeData, setRootIds, isDescendantOf]
  );

  /**
   * Sets a folder's expanded state
   */
  const setFolderExpanded = useCallback(
    (id: string, expanded: boolean): void => {
      setExpandedFolderIds((prev) => {
        const newSet = new Set(prev);
        if (expanded) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    },
    [setExpandedFolderIds]
  );

  /**
   * Checks if a folder is in the direct path to the current note
   */
  const isDirectPathToNote = useCallback(
    (folderId: string): boolean => {
      return directPathFolderIds.has(folderId);
    },
    [directPathFolderIds]
  );

  /**
   * Gets the current note based on selection state
   */
  const currentNote = useMemo(() => {
    if (selectedItemId && !isViewingFolder) {
      return getNote(selectedItemId);
    }
    return undefined;
  }, [selectedItemId, isViewingFolder, getNote]);

  /**
   * Gets the current folder based on selection state
   */
  const currentFolder = useMemo(() => {
    if (selectedItemId && isViewingFolder) {
      return getFolder(selectedItemId);
    }
    return undefined;
  }, [selectedItemId, isViewingFolder, getFolder]);

  /**
   * Handles navigation via URL params
   */
  useEffect(() => {
    const noteId = params?.noteId;
    if (!noteId) {
      deselectNote();
      return;
    }

    // If the noteId in the URL doesn't match the current note, select it
    if (noteId && typeof noteId === "string" && currentNote?.id !== noteId) {
      selectNote(noteId);
      setIsFromUrl(true);
    }
  }, [params, currentNote, selectNote, deselectNote, setIsFromUrl]);

  // Context value to be provided
  const contextValue: NotesContext = {
    treeData,
    addNote,
    addFolder,
    updateNote,
    updateFolder,
    deleteNote,
    deleteFolder,
    moveNode,
    selectNote,
    deselectNote,
    selectFolder,
    getNote,
    getFolder,
    currentNote,
    currentFolder,
    currentPath,
    selectedItemId,
    isViewingFolder,
    setSelectedItemId,
    setIsViewingFolder,
    expandedFolderIds,
    setFolderExpanded,
    isDirectPathToNote,
    isFromUrl,
    creationStateById,
    completeNodeCreation,
    rootNodes,
    getChildNodes,
    isLoading,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}

/**
 * Hook to access the notes context
 */
function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
}

export { NotesProvider, useNotes };
