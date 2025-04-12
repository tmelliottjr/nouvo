"use client";

import { NotesSidebar } from "@/components/notes-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  CornerUpLeft,
  File,
  Folder,
  FolderPlusIcon,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import TiptapEditor from "../../components/tiptap-editor/editor";
import {
  FolderNode,
  Note,
  NotesProvider,
  useNotes,
} from "../../state-providers/use-notes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import "highlight.js/styles/agate.css";

import { setUseWhatChange } from "@simbathesailor/use-what-changed";

// Only Once in your app you can set whether to enable hooks tracking or not.
// In CRA(create-react-app) e.g. this can be done in src/index.js

setUseWhatChange(process.env.NODE_ENV === "development");

export default function Notes() {
  return (
    <NotesProvider>
      <SidebarProvider>
        <NotesSidebar />
        <SidebarInset>
          <NoteView />
        </SidebarInset>
      </SidebarProvider>
    </NotesProvider>
  );
}

function NoteView() {
  const {
    currentNote,
    currentFolder,
    noteTree,
    updateNote,
    isViewingFolder,
    selectedItemId,
  } = useNotes();

  function handleContentUpdate(content: string) {
    if (!currentNote) return;
    updateNote(currentNote.id, { content });
  }

  return (
    <>
      <NoteHeader />
      {isViewingFolder && currentFolder ? (
        <FolderView folder={currentFolder} />
      ) : selectedItemId === null ? (
        <FolderView
          isRootView={true}
          folder={{ id: "root", name: "All Notes", children: noteTree }}
        />
      ) : (
        currentNote && (
          <TiptapEditor note={currentNote} onUpdate={handleContentUpdate} />
        )
      )}
    </>
  );
}

function FolderView({
  folder,
  isRootView = false,
}: {
  folder: FolderNode;
  isRootView?: boolean;
}) {
  const { selectNote, selectFolder, noteTree, currentPath, deleteNote } =
    useNotes();
  const [expandedFolders, setExpandedFolders] = React.useState<
    Record<string, boolean>
  >({});
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Toggle folder expansion
  const toggleFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  // Handle note deletion
  const handleDeleteNote = (note: Note, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent note selection when clicking delete
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  };

  // Confirm note deletion
  const confirmDeleteNote = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  // Function to navigate to parent folder
  const navigateToParent = () => {
    if (!currentPath || currentPath.length <= 1) return;

    // Get the parent path (all but the last element)
    const parentPath = currentPath.slice(0, currentPath.length - 1);

    // Find the parent folder
    let currentNodes = noteTree;
    let parentNode = null;

    for (let i = 0; i < parentPath.length; i++) {
      const nodeName = parentPath[i];
      const node = currentNodes.find((n) => n.name === nodeName);

      if (node && "children" in node) {
        if (i === parentPath.length - 1) {
          // This is the parent folder
          parentNode = node;
        } else {
          // Continue traversing
          currentNodes = node.children;
        }
      }
    }

    // If parent found, select it
    if (parentNode) {
      selectFolder(parentNode.id);
    }
  };

  // Check if this folder has a parent (not at root level)
  const hasParent = !isRootView && currentPath && currentPath.length > 1;

  // Recursive function to render the entire folder hierarchy
  const renderFolderHierarchy = (items: FolderNode["children"], depth = 0) => {
    // Group items into folders and files
    const folders = items.filter((node) => "children" in node) as FolderNode[];
    const files = items.filter((node) => !("children" in node)) as Note[];

    return (
      <>
        {folders.length > 0 && (
          <div
            className={`mb-3 ${
              depth > 0
                ? "pl-5 border-l border-stone-200 dark:border-stone-700"
                : ""
            }`}
          >
            <div className="space-y-1.5">
              {folders.map((subfolder) => (
                <div key={subfolder.id} className="space-y-1.5">
                  <div
                    onClick={(e) => toggleFolder(subfolder.id, e)}
                    className="group flex items-center p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer border border-transparent hover:border-stone-200 dark:hover:border-stone-700 bg-stone-50 dark:bg-stone-900"
                  >
                    <div className="flex items-center justify-center h-5 w-5 text-stone-500 dark:text-stone-400 mr-2 flex-shrink-0">
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedFolders[subfolder.id] ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <Folder className="h-4 w-4 text-amber-600 dark:text-amber-500 mr-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-stone-700 dark:text-stone-200 text-sm font-semibold group-hover:text-stone-900 dark:group-hover:text-white truncate">
                        {subfolder.name}
                      </h3>
                    </div>
                    <span className="text-xs text-stone-400 dark:text-stone-500 ml-2">
                      {subfolder.children.length}
                    </span>
                  </div>

                  {/* Render children only if folder is expanded */}
                  {expandedFolders[subfolder.id] &&
                    subfolder.children.length > 0 &&
                    renderFolderHierarchy(subfolder.children, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div
            className={`${
              depth > 0
                ? "pl-5 border-l border-stone-200 dark:border-stone-700"
                : ""
            }`}
          >
            <div className="space-y-1.5">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => selectNote(file.id)}
                  className="group flex items-center p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer border border-transparent hover:border-stone-200 dark:hover:border-stone-700 bg-stone-50 dark:bg-stone-900"
                >
                  <div className="flex items-center justify-center h-5 w-5 text-stone-500 dark:text-stone-400 mr-2 flex-shrink-0">
                    <File className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-stone-600 dark:text-stone-300 text-sm font-normal group-hover:text-stone-800 dark:group-hover:text-white truncate">
                      {file.name}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNote(file, e)}
                    className="p-1 rounded-sm opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-600 dark:text-stone-500 dark:hover:text-red-500 transition-opacity"
                    aria-label="Delete note"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-4 w-1/2 max-w-3xl mx-auto bg-white dark:bg-stone-950">
      <div className="flex mb-4 relative">
        <div style={{ width: "7px" }} className="absolute left-0">
          {hasParent && (
            <button
              onClick={navigateToParent}
              className="flex items-center justify-center h-8 w-8 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 absolute -left-2"
              aria-label="Go to parent folder"
            >
              <CornerUpLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="ml-7">
          <h2 className="text-xl font-semibold text-stone-700 dark:text-stone-200 flex items-center">
            <Folder className="h-6 w-6 text-stone-500 dark:text-stone-400 mr-2 absolute -ml-7" />
            {folder.name}
          </h2>
        </div>
      </div>

      {folder.children.length > 0 ? (
        <div className="bg-white dark:bg-stone-950">
          {renderFolderHierarchy(folder.children)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-stone-50 dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800">
          <FolderPlusIcon className="h-12 w-12 text-stone-300 dark:text-stone-600 mb-3" />
          <h3 className="text-lg font-medium text-stone-700 dark:text-stone-300 mb-1">
            This folder is empty
          </h3>
          <p className="text-stone-500 dark:text-stone-400 text-sm max-w-md">
            Add files or folders to organize your content
          </p>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{noteToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteNote}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function NoteHeader() {
  const { currentPath, noteTree, selectNote, selectFolder } = useNotes();

  // Function to handle breadcrumb clicks
  const handleBreadcrumbClick = (itemName: string, index: number) => {
    if (!currentPath) return;

    // We need to find the node (folder or file) that corresponds to this breadcrumb item
    // Construct the path up to this point
    const pathToItem = currentPath.slice(0, index + 1);

    // Navigate through the tree to find the node
    let currentNodes = noteTree;
    let targetNode = null;

    for (let i = 0; i < pathToItem.length; i++) {
      const nodeName = pathToItem[i];
      const node = currentNodes.find((n) => n.name === nodeName);

      if (node) {
        if (i === pathToItem.length - 1) {
          // This is our target node
          targetNode = node;
        } else if ("children" in node) {
          // This is a folder, continue traversing
          currentNodes = node.children;
        } else {
          // This is a note, we can't go deeper
          break;
        }
      }
    }

    // If we found the node, select it based on its type
    if (targetNode) {
      if ("children" in targetNode) {
        selectFolder(targetNode.id);
      } else {
        selectNote(targetNode.id);
      }
    }
  };

  // Create a collapsed path array when path is longer than 3 items
  const displayPath = React.useMemo(() => {
    if (!currentPath || currentPath.length <= 3) {
      return currentPath;
    }

    // For a path with more than 3 items, show first item, ellipsis, and last two items
    const collapsedPath = [
      currentPath[0],
      "...", // Ellipsis placeholder
      currentPath[currentPath.length - 2],
      currentPath[currentPath.length - 1],
    ];

    return collapsedPath;
  }, [currentPath]);

  // Get the hidden middle items for dropdown
  const hiddenItems = React.useMemo(() => {
    if (!currentPath || currentPath.length <= 3) {
      return [];
    }

    // Get all items between first and last two
    return currentPath.slice(1, currentPath.length - 2);
  }, [currentPath]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {displayPath?.map((pathPart, index) => {
            // Special handling for the ellipsis item
            if (pathPart === "...") {
              return (
                <React.Fragment key="ellipsis">
                  <BreadcrumbItem className="hidden md:block">
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger className="cursor-default">
                        {pathPart}
                      </HoverCardTrigger>
                      {hiddenItems.length > 0 && (
                        <HoverCardContent
                          className="w-fit p-1"
                          align="start"
                          side="bottom"
                        >
                          <div className="flex flex-col">
                            {hiddenItems.map((item, i) => (
                              <div
                                key={i}
                                className="px-3 py-1 text-sm whitespace-nowrap hover:bg-stone-100 dark:hover:bg-stone-700 rounded cursor-pointer"
                                onClick={() =>
                                  handleBreadcrumbClick(item, i + 1)
                                }
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </HoverCardContent>
                      )}
                    </HoverCard>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </React.Fragment>
              );
            }

            // Regular breadcrumb items
            return (
              <React.Fragment key={`${pathPart}-${index}`}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBreadcrumbClick(pathPart, index);
                    }}
                  >
                    {pathPart}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < displayPath.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
