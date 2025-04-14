"use client";

import {
  FolderNode as FolderNodeType,
  NoteNode as NoteNodeType,
  TreeNode,
} from "@/lib/seed-data";
import { useNotes } from "@/state-providers/use-notes";
import {
  closestCenter,
  DndContext,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { FolderNode } from "./FolderNode";
import { NoteNode } from "./NoteNode";

interface DraggableNotesTreeProps {
  parentId?: string | null;
  isRootLevel?: boolean;
}

export function DraggableNotesTree({
  parentId = null,
  isRootLevel = false,
}: DraggableNotesTreeProps) {
  const {
    rootNodes,
    getChildNodes,
    treeData,
    moveNode,
    updateFolder,
    updateNote,
    setFolderExpanded,
  } = useNotes();

  // Drag state management
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<TreeNode | null>(null);
  // Track if we're in a drag operation above the root container
  const [isDraggingOverRoot, setIsDraggingOverRoot] = useState<boolean>(false);
  // A timer reference for delayed folder expansion
  const expandTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Track the horizontal offset during dragging to determine nesting intention
  const [dragOffset, setDragOffset] = useState<number>(0);
  // Track the item being dragged over
  const [overItemId, setOverItemId] = useState<string | null>(null);

  // Set up drag sensors with better activation constraints for improved usability
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Start dragging after moving 5px - provides better user experience
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Get nodes to display (either root nodes or children of specified parent)
  const nodes = parentId ? getChildNodes(parentId) : rootNodes;

  // Helper function to find an item by ID
  const findItemById = (id: string): TreeNode | null => {
    return treeData[id] || null;
  };

  // Sorting nodes: folders first, then alphabetically by name
  const sortedNodes = [...nodes].sort((a, b) => {
    // If types are different, folders first
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }

    // Otherwise sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  // Handle folder name change
  const handleFolderNameChange = (id: string, name: string) => {
    updateFolder(id, { name });
  };

  // Handle note name change
  const handleNoteNameChange = (id: string, name: string) => {
    updateNote(id, { name });
  };

  // Check if a node is a descendant of another
  const isDescendant = (
    ancestorId: string,
    possibleDescendantId: string
  ): boolean => {
    if (ancestorId === possibleDescendantId) return false;

    let currentNode = treeData[possibleDescendantId];
    while (currentNode && currentNode.parentId) {
      if (currentNode.parentId === ancestorId) {
        return true;
      }
      currentNode = treeData[currentNode.parentId];
    }
    return false;
  };

  /**
   * Calculate the projected parent based on drag position and target
   */
  const getProjectedParent = (
    overItemId: string | null,
    dragOffset: number
  ): string | null => {
    if (!overItemId) {
      return isDraggingOverRoot ? null : parentId;
    }

    const overItem = findItemById(overItemId);
    if (!overItem) return parentId;

    // If dragging to the right by a certain amount, and over a folder,
    // consider it as a "nest inside this folder" gesture
    if (dragOffset > 20 && overItem.type === "folder") {
      return overItemId;
    }

    // Otherwise, place at the same level as the item we're over
    return overItem.parentId;
  };

  // Clear any expansion timer to prevent memory leaks
  useEffect(() => {
    return () => {
      if (expandTimerRef.current) {
        clearTimeout(expandTimerRef.current);
        expandTimerRef.current = null;
      }
    };
  }, []);

  // Drag event handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;
    setActiveId(activeId);

    // Find the dragged item
    const item = findItemById(activeId);
    if (item) setActiveItem(item);

    // Reset all state
    setIsDraggingOverRoot(false);
    setDragOffset(0);
    setOverItemId(null);

    // Clear any existing expand timer
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (!event.active) return;

    // Calculate horizontal offset to detect nesting intention
    setDragOffset(Math.max(0, event.delta.x));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.active || !activeId) return;

    // Clear any previous expand timer
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }

    // If not over anything
    if (!event.over) {
      setOverItemId(null);
      // If at root level and not over any specific target
      setIsDraggingOverRoot(true);
      return;
    }



    const overId = event.over.id as string;

    // If over the root container
    if (overId === "root-container") {
      setIsDraggingOverRoot(true);
      setOverItemId(null);
      return;
    }

    // We're over a specific item
    setIsDraggingOverRoot(false);
    setOverItemId(overId);

    // Calculate the projected parent
    const projectedParent = getProjectedParent(overId, dragOffset);
    if (projectedParent === null) {
      setOverItemId(null);
      return;
    }
    const overItem = findItemById(projectedParent);
    if (!overItem) return;

    // If we're over a folder and dragging to the right (nesting intention)
    if (overItem.type === "folder" && dragOffset > 20) {
      // Auto-expand the folder after a short delay to make nested drag easier
      expandTimerRef.current = setTimeout(() => {
        setFolderExpanded(overId, true);
      }, 600);
    }
  };

  const handleDragEnd = () => {
    if (!activeId) {
      resetDragState();
      return;
    }

    // If over the root container, move to root
    if (isDraggingOverRoot) {
      moveNode(activeId, "root");
      resetDragState();
      return;
    }

    // Get the final projected parent based on drag position
    const finalTargetParent = overItemId
      ? getProjectedParent(overItemId, dragOffset)
      : parentId;

    const destinationParentId = finalTargetParent ?? "root";

    // Don't allow dropping a folder into its own descendant
    if (
      activeItem?.type === "folder" &&
      destinationParentId !== "root" &&
      isDescendant(activeId, destinationParentId)
    ) {
      console.warn("Cannot drop a folder into its own descendant");
      resetDragState();
      return;
    }

    // Move the node to its new parent
    moveNode(activeId, destinationParentId);

    // Reset all drag state
    resetDragState();
  };

  const handleDragCancel = () => {
    resetDragState();
  };

  // Helper to reset all drag state
  const resetDragState = () => {
    setActiveId(null);
    setActiveItem(null);
    setIsDraggingOverRoot(false);
    setDragOffset(0);
    setOverItemId(null);

    // Clear any expand timer
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
  };

  // DragOverlay component for displaying the item being dragged
  const DragOverlayContent = () => {
    if (!activeItem) return null;

    if (activeItem.type === "folder") {
      return (
        <div className="opacity-80 pointer-events-none">
          <FolderNode
            folder={activeItem as FolderNodeType}
            onNameChange={(name) => handleFolderNameChange(activeItem.id, name)}
          />
        </div>
      );
    } else {
      return (
        <div className="opacity-80 pointer-events-none">
          <NoteNode
            noteNode={activeItem as NoteNodeType}
            onNameChange={(name) => handleNoteNameChange(activeItem.id, name)}
          />
        </div>
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={sortedNodes.map((node) => node.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          id="root-container"
          className={`p-0.5 rounded-md transition-colors duration-200 min-h-[10px] ${
            isDraggingOverRoot ? "bg-stone-100 dark:bg-stone-800" : ""
          }`}
          data-root-container={isRootLevel}
          data-droppable="true"
        >
          {sortedNodes.map((node) => {
            const isOver = overItemId === node.id;
            const isNestingIntent = isOver && dragOffset > 20;
            const highlightClass = isOver
              ? isNestingIntent && node.type === "folder"
                ? "bg-stone-100 dark:bg-stone-800 border border-primary/40 pl-2"
                : "bg-stone-100/50 dark:bg-stone-800/50 border-dashed border border-primary/30"
              : "";

            if (node.type === "folder") {
              return (
                <div
                  key={node.id}
                  className={`rounded-md transition-all duration-200 ${highlightClass}`}
                >
                  <FolderNode
                    folder={node as FolderNodeType}
                    isDraggable={true}
                    onNameChange={(name) =>
                      handleFolderNameChange(node.id, name)
                    }
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={node.id}
                  className={`rounded-md transition-all duration-200 ${highlightClass}`}
                >
                  <NoteNode
                    noteNode={node as NoteNodeType}
                    isDraggable={true}
                    onNameChange={(name) => handleNoteNameChange(node.id, name)}
                  />
                </div>
              );
            }
          })}
        </div>
      </SortableContext>
      <DragOverlay>
        <DragOverlayContent />
      </DragOverlay>
    </DndContext>
  );
}
