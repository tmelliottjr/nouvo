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
    },
    deleteDialog: {
      title: "Delete Note",
      description: (name: string) =>
        `Are you sure you want to delete "${name}"? This action cannot be undone.`,
    },
    breadcrumbs: {
      ellipsis: "...",
    },
  },
};

export default strings;
