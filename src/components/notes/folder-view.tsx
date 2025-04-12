import strings from "@/lib/strings";
import { cn } from "@/lib/utils";
import { FolderNode, Note, useNotes } from "@/state-providers/use-notes";
import {
  ChevronRight,
  CornerUpLeft,
  File,
  Folder,
  FolderPlusIcon,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { DeleteNoteDialog } from "./delete-note-dialog";

interface FolderViewProps {
  folder: FolderNode;
  isRootView?: boolean;
}

export function FolderView({ folder, isRootView = false }: FolderViewProps) {
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
            className={cn("mb-3", depth > 0 && "pl-5 border-l border-border")}
          >
            <div className="space-y-1.5">
              {folders.map((subfolder) => (
                <div key={subfolder.id} className="space-y-1.5">
                  <div
                    onClick={(e) => toggleFolder(subfolder.id, e)}
                    className="group flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border border-transparent hover:border-border bg-accent-foreground/5"
                  >
                    <div className="flex items-center justify-center h-5 w-5 text-muted-foreground mr-2 flex-shrink-0">
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedFolders[subfolder.id] ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <Folder className="h-4 w-4 text-amber-500 mr-2 group-hover:text-amber-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground text-sm font-semibold group-hover:text-accent-foreground truncate">
                        {subfolder.name}
                      </h3>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
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
          <div className={cn(depth > 0 && "pl-5 border-l border-border")}>
            <div className="space-y-1.5">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => selectNote(file.id)}
                  className="group flex items-center p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer border border-transparent hover:border-border bg-accent-foreground/5"
                >
                  <div className="flex items-center justify-center h-5 w-5 mr-2 flex-shrink-0">
                    <File className="h-4 w-4 text-indigo-500 group-hover:text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground text-sm font-normal group-hover:text-accent-foreground truncate">
                      {file.name}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNote(file, e)}
                    className="p-1 rounded-sm opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                    aria-label={strings.notes.folderView.deleteButton.ariaLabel}
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
    <div className="p-4 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-3xl mx-auto bg-background">
      <div className="flex mb-4 relative">
        <div style={{ width: "7px" }} className="absolute left-0">
          {hasParent && (
            <button
              onClick={navigateToParent}
              className="flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/50 absolute -left-2"
              aria-label={strings.notes.folderView.parentButton.ariaLabel}
            >
              <CornerUpLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="ml-7">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Folder className="h-6 w-6 text-muted-foreground mr-2 absolute -ml-7" />
            {folder.name}
          </h2>
        </div>
      </div>

      {folder.children.length > 0 ? (
        <div className="bg-background">
          {renderFolderHierarchy(folder.children)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-accent/5 rounded-md border border-border">
          <FolderPlusIcon className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-1">
            {strings.notes.folderView.emptyFolder.title}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md">
            {strings.notes.folderView.emptyFolder.description}
          </p>
        </div>
      )}

      <DeleteNoteDialog
        note={noteToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteNote}
      />
    </div>
  );
}
