"use client";

import strings from "@/lib/strings";
import { cn } from "@/lib/utils";
import { FolderNode, Note, useNotes } from "@/state-providers/use-notes";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
  const {
    selectNote,
    selectFolder,
    noteTree,
    currentPath,
    deleteNote,
    moveNode,
  } = useNotes();
  const [expandedFolders, setExpandedFolders] = React.useState<
    Record<string, boolean>
  >({});
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<Node | null>(null);
  const [hoveredFolderId, setHoveredFolderId] = useState<string | null>(null);

  // Set up drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start dragging after moving 8px
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Helper function to find an item by ID
  const findItemById = (
    id: string,
    items: FolderNode["children"]
  ): Node | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if ("children" in item) {
        const result = findItemById(id, item.children);
        if (result) return result;
      }
    }
    return null;
  };

  // Drag event handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);

    // Find the dragged item in our tree
    const item = findItemById(active.id.toString(), noteTree);
    if (item) setActiveItem(item);

    // Auto-expand folders when dragging over them
    if (hoveredFolderId) {
      setExpandedFolders((prev) => ({
        ...prev,
        [hoveredFolderId]: true,
      }));
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      const overId = over.id.toString();
      // If hovering over a folder, store its ID for potential auto-expansion
      const hoverItem = findItemById(overId, noteTree);
      if (hoverItem && "children" in hoverItem) {
        setHoveredFolderId(overId);
      } else {
        setHoveredFolderId(null);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeId = active.id.toString();
      const overId = over.id.toString();

      // Check if we're dropping into a folder or onto an item
      const overItem = findItemById(overId, noteTree);

      // If dropping onto a folder, move inside the folder
      if (overItem && "children" in overItem) {
        moveNode(activeId, overId);
      } else {
        // If dropping onto a note or outside a folder, find its parent
        // For simplicity in this implementation, we'll move to the current folder
        moveNode(activeId, folder.id);
      }
    }

    // Reset drag state
    setActiveId(null);
    setActiveItem(null);
    setHoveredFolderId(null);
  };

  // Components for draggable items
  const DraggableFolder = ({
    folder,
    depth,
  }: {
    folder: FolderNode;
    depth: number;
  }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: folder.id,
    });

    const { setNodeRef: setDroppableRef } = useDroppable({
      id: folder.id,
    });

    // Combine draggable and droppable refs
    const combinedRef = (node: HTMLDivElement) => {
      setNodeRef(node);
      setDroppableRef(node);
    };

    return (
      <div ref={combinedRef} className="draggable-folder-item space-y-1.5">
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => toggleFolder(folder.id, e)}
          className={cn(
            "group flex items-center p-2 rounded-md transition-colors cursor-pointer border",
            isDragging
              ? "opacity-50 bg-accent border-dashed border-accent"
              : "hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border bg-accent-foreground/5",
            hoveredFolderId === folder.id && "border-primary/50 bg-accent/20"
          )}
        >
          <div className="flex items-center justify-center h-5 w-5 text-muted-foreground mr-2 flex-shrink-0">
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                expandedFolders[folder.id] ? "rotate-90" : ""
              }`}
            />
          </div>
          <Folder className="h-4 w-4 text-amber-500 mr-2 group-hover:text-amber-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-foreground text-sm font-semibold group-hover:text-accent-foreground truncate">
              {folder.name}
            </h3>
          </div>
          <span className="text-xs text-primary/80 font-semibold ml-2 px-1.5 py-0.5 rounded-full bg-primary/10">
            {folder.children.length}
          </span>
        </div>

        {/* Render children only if folder is expanded */}
        {expandedFolders[folder.id] && folder.children.length > 0 && (
          <div className={cn("pl-5 border-l border-border space-y-1.5")}>
            {folder.children
              .filter((node) => "children" in node)
              .map((subfolder) => (
                <DraggableFolder
                  key={subfolder.id}
                  folder={subfolder as FolderNode}
                  depth={depth + 1}
                />
              ))}
            {folder.children
              .filter((node) => !("children" in node))
              .map((file) => (
                <DraggableNote
                  key={file.id}
                  note={file as Note}
                  depth={depth + 1}
                />
              ))}
          </div>
        )}
      </div>
    );
  };

  const DraggableNote = ({ note, depth }: { note: Note; depth: number }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: note.id,
    });

    const { setNodeRef: setDroppableRef } = useDroppable({
      id: note.id,
    });

    // Combine refs
    const combinedRef = (node: HTMLDivElement) => {
      setNodeRef(node);
      setDroppableRef(node);
    };

    return (
      <div
        ref={combinedRef}
        {...attributes}
        {...listeners}
        onClick={(e) => {
          e.stopPropagation();
          selectNote(note.id);
        }}
        className="draggable-note-item"
      >
        <div
          className={cn(
            "group flex items-center p-2 rounded-md transition-colors cursor-pointer border",
            isDragging
              ? "opacity-50 bg-accent border-dashed border-accent"
              : "hover:bg-accent hover:text-accent-foreground border-transparent hover:border-border bg-accent-foreground/5"
          )}
        >
          <div className="flex items-center justify-center h-5 w-5 mr-2 flex-shrink-0">
            <File className="h-4 w-4 text-indigo-500 group-hover:text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-foreground text-sm font-normal group-hover:text-accent-foreground truncate">
              {note.name}
            </h3>
          </div>
          <button
            onClick={(e) => handleDeleteNote(note, e)}
            className="p-1 rounded-sm opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity cursor-pointer"
            aria-label={strings.notes.folderView.deleteButton.ariaLabel}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // DragOverlay component for displaying the item being dragged
  const DragOverlayContent = () => {
    if (!activeItem) return null;

    if ("children" in activeItem) {
      // Folder overlay
      return (
        <div className="flex items-center p-2 rounded-md border border-dashed border-primary bg-background shadow-md">
          <Folder className="h-4 w-4 text-amber-500 mr-2" />
          <span className="text-sm font-semibold truncate">
            {activeItem.name}
          </span>
        </div>
      );
    } else {
      // Note overlay
      return (
        <div className="flex items-center p-2 rounded-md border border-dashed border-primary bg-background shadow-md">
          <File className="h-4 w-4 text-indigo-500 mr-2" />
          <span className="text-sm truncate">{activeItem.name}</span>
        </div>
      );
    }
  };

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
          <div className="bg-background space-y-1.5">
            {folder.children
              .filter((node) => "children" in node)
              .map((subfolder) => (
                <DraggableFolder
                  key={subfolder.id}
                  folder={subfolder as FolderNode}
                  depth={0}
                />
              ))}
            {folder.children
              .filter((node) => !("children" in node))
              .map((file) => (
                <DraggableNote key={file.id} note={file as Note} depth={0} />
              ))}
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
      <DragOverlay>
        <DragOverlayContent />
      </DragOverlay>
    </DndContext>
  );
}
