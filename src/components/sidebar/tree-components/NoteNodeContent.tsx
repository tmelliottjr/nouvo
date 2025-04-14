"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Note, useNotes } from "@/state-providers/use-notes";
import { File, Trash2 } from "lucide-react";
import { useConfirmDeleteNote } from "../../../hooks/use-confirm-delete-note";
import strings from "../../../lib/strings";
import { TreeNodeAction } from "./TreeNodeAction";
import { TreeNodeActions } from "./TreeNodeActions";

interface NoteNodeContentProps {
  noteNode: Note;
}

export function NoteNodeContent({ noteNode }: NoteNodeContentProps) {
  const { deleteNote } = useNotes();
  const { confirmDelete } = useConfirmDeleteNote();

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();

    const confirmed = await confirmDelete(noteNode.name);

    if (confirmed) {
      deleteNote(noteNode.id);
    }
  }

  return (
    <div className="flex items-center flex-1 group/note">
      <File className="hover:opacity-70 h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-foreground text-sm font-normal truncate">
              {noteNode.name}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            {noteNode.name}
          </TooltipContent>
        </Tooltip>
      </div>
      <TreeNodeActions>
        <TreeNodeAction
          icon={<Trash2 className="h-4 w-4" />}
          onClick={handleDelete}
          className="hidden group-hover/note:flex"
          ariaLabel={
            strings.notes.folderView.deleteButton?.ariaLabel || "Delete note"
          }
          destructive
        />
      </TreeNodeActions>
    </div>
  );
}
