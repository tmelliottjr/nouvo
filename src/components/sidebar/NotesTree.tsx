"use client";

import {
  FolderNode as FolderNodeType,
  NoteNode as NoteNodeType,
} from "@/lib/seed-data";
import { useNotes } from "@/state-providers/use-notes";
import { FolderNode } from "./FolderNode";
import { NoteNode } from "./NoteNode";

interface NotesTreeProps {
  parentId?: string | null;
}

export function NotesTree({ parentId = null }: NotesTreeProps) {
  const { rootNodes, getChildNodes, treeData } = useNotes();

  // Get nodes to display (either root nodes or children of specified parent)
  const nodes = parentId ? getChildNodes(parentId) : rootNodes;

  // Helper function to find an item by ID
  const findItemById = (id: string) => {
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
    // This will be handled by the FolderNode component
  };

  // Handle note name change
  const handleNoteNameChange = (id: string, name: string) => {
    // This will be handled by the NoteNode component
  };

  return (
    <div className="min-h-[10px]">
      {sortedNodes.map((node) => {
        if (node.type === "folder") {
          return <FolderNode key={node.id} folder={node as FolderNodeType} />;
        } else {
          return <NoteNode key={node.id} noteNode={node as NoteNodeType} />;
        }
      })}
    </div>
  );
}
