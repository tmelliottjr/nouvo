/**
 * Application string constants
 * This file centralizes all text content used across the application
 */

// Organized by feature/component structure
const strings = {
  common: {
    cancel: "Cancel",
    delete: "Delete",
    goBack: "Go back",
  },
  notes: {
    rootFolderName: "All Notes",
    noNoteSelected: "No note selected",
    folderView: {
      emptyFolder: {
        title: "This folder is empty",
        description: "Add files or folders to organize your content",
      },
      folderCount: (count: number) => `${count}`,
      deleteButton: {
        ariaLabel: "Delete note",
      },
      parentButton: {
        ariaLabel: "Go to parent folder",
      },
      addNote: {
        label: "New Note",
        ariaLabel: "Create new note in this folder",
      },
      addFolder: {
        label: "New Folder",
        ariaLabel: "Create new folder in this folder",
      },
      rename: {
        label: "Rename",
        ariaLabel: "Rename item",
        placeholder: "Enter new name...",
      },
    },
    deleteDialog: {
      title: "Delete Note",
      description: (name: string) =>
        `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      folderTitle: "Delete Folder",
      folderDescription: (name: string) =>
        `Are you sure you want to delete "${name}" and all its contents? This action cannot be undone.`,
    },
    breadcrumbs: {
      ellipsis: "...",
    },
    share: {
      button: {
        label: "Share",
        ariaLabel: "Share note",
      },
      tooltip: "Copy link to share this note",
      copied: "Link copied!",
    },
    contextMenu: {
      addNote: "New Note",
      addFolder: "New Folder",
      rename: "Rename",
      delete: "Delete",
    },
  },
};

export default strings;
