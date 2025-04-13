"use client";

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
import strings from "@/lib/strings";
import { FolderNode, useNotes } from "@/state-providers/use-notes";

interface DeleteFolderDialogProps {
  folder: FolderNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteFolderDialog({
  folder,
  isOpen,
  onOpenChange,
}: DeleteFolderDialogProps) {
  const { deleteFolder } = useNotes();

  const handleDelete = () => {
    deleteFolder(folder.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {strings.notes.deleteDialog.folderTitle}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {strings.notes.deleteDialog.folderDescription(folder.name)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{strings.common.cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {strings.common.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
