import { prisma } from "./prisma";
import { generateId } from "./utils";

export type Folder = {
  id: string;
  name: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  noteCount?: number; // Count of notes in this folder
};

/**
 * Get all folders for a specific user
 * Optionally computes the note count for each folder
 */
export async function getFolders(
  userId: string,
  includeNoteCounts = false
): Promise<Folder[]> {
  if (!includeNoteCounts) {
    // Simple query without note counts
    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
    });

    return folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      userId: folder.userId,
      parentId: folder.parentId,
      createdAt: folder.createdAt.toISOString(),
      updatedAt: folder.updatedAt.toISOString(),
      noteCount: 0,
    }));
  } else {
    // Query with note counts
    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            notes: true,
          },
        },
      },
    });

    return folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      userId: folder.userId,
      parentId: folder.parentId,
      createdAt: folder.createdAt.toISOString(),
      updatedAt: folder.updatedAt.toISOString(),
      noteCount: folder._count.notes,
    }));
  }
}

/**
 * Get a folder by ID
 */
export async function getFolderById(
  userId: string,
  folderId: string
): Promise<Folder | null> {
  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId,
    },
    include: {
      _count: {
        select: {
          notes: true,
        },
      },
    },
  });

  if (!folder) {
    return null;
  }

  return {
    id: folder.id,
    name: folder.name,
    userId: folder.userId,
    parentId: folder.parentId,
    createdAt: folder.createdAt.toISOString(),
    updatedAt: folder.updatedAt.toISOString(),
    noteCount: folder._count.notes,
  };
}

/**
 * Get folder hierarchy for a user
 * Builds a nested structure of folders
 */
export async function getFolderHierarchy(userId: string): Promise<any[]> {
  // Get all folders for this user
  const folders = await getFolders(userId, true);

  // Create a map to easily find folders by ID
  const folderMap = new Map();
  folders.forEach((folder) => {
    folderMap.set(folder.id, { ...folder, children: [] });
  });

  // Build the hierarchy
  const rootFolders: any[] = [];

  folders.forEach((folder) => {
    const folderWithChildren = folderMap.get(folder.id);

    if (folder.parentId && folderMap.has(folder.parentId)) {
      // Add this folder as a child of its parent
      folderMap.get(folder.parentId).children.push(folderWithChildren);
    } else {
      // This is a root folder
      rootFolders.push(folderWithChildren);
    }
  });

  return rootFolders;
}

/**
 * Create a new folder
 */
export async function createFolder(
  userId: string,
  data: { name: string; parentId?: string | null }
): Promise<Folder> {
  // Verify parentId exists and belongs to this user if provided
  if (data.parentId) {
    const parentFolder = await getFolderById(userId, data.parentId);
    if (!parentFolder) {
      throw new Error("Parent folder not found");
    }
  }

  // Generate a unique ID
  const id = generateId();

  // Create the folder
  const folder = await prisma.folder.create({
    data: {
      id,
      name: data.name,
      userId,
      parentId: data.parentId || null,
    },
  });

  // Return the created folder
  return {
    id: folder.id,
    name: folder.name,
    userId: folder.userId,
    parentId: folder.parentId,
    createdAt: folder.createdAt.toISOString(),
    updatedAt: folder.updatedAt.toISOString(),
    noteCount: 0,
  };
}

/**
 * Update an existing folder
 */
export async function updateFolder(
  userId: string,
  data: { id: string; name?: string; parentId?: string | null }
): Promise<Folder | null> {
  // Get the current folder to ensure it exists and belongs to the user
  const folder = await getFolderById(userId, data.id);
  if (!folder) {
    return null;
  }

  // Verify parentId exists and belongs to this user if provided
  if (data.parentId) {
    const parentFolder = await getFolderById(userId, data.parentId);
    if (!parentFolder) {
      throw new Error("Parent folder not found");
    }

    // Check for circular reference
    if (data.parentId === data.id) {
      throw new Error("A folder cannot be its own parent");
    }
  }

  // Build update data
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.parentId !== undefined) updateData.parentId = data.parentId;

  // Update the folder
  const updatedFolder = await prisma.folder.update({
    where: {
      id: data.id,
    },
    data: updateData,
  });

  // Return the updated folder
  return getFolderById(userId, data.id);
}

/**
 * Delete a folder and optionally its contents
 */
export async function deleteFolder(
  userId: string,
  folderId: string,
  recursive = false
): Promise<boolean> {
  // Get the folder to ensure it exists and belongs to the user
  const folder = await getFolderById(userId, folderId);
  if (!folder) {
    return false;
  }

  // Check if the folder has notes or subfolders
  const notesCount = await prisma.note.count({
    where: {
      folderId,
      userId,
    },
  });

  const childFoldersCount = await prisma.folder.count({
    where: {
      parentId: folderId,
      userId,
    },
  });

  // If there are notes or child folders and recursive is false, abort
  if (!recursive && (notesCount > 0 || childFoldersCount > 0)) {
    throw new Error(
      "Folder is not empty. Set recursive to true to delete all contents."
    );
  }

  try {
    if (recursive) {
      // Get all child folders
      const childFolders = await prisma.folder.findMany({
        where: {
          parentId: folderId,
          userId,
        },
        select: {
          id: true,
        },
      });

      // Recursively delete child folders
      for (const childFolder of childFolders) {
        await deleteFolder(userId, childFolder.id, true);
      }

      // Delete the folder and its notes (cascading deletes will handle relationships)
      await prisma.folder.delete({
        where: {
          id: folderId,
        },
      });
    } else {
      // Move notes to root before deleting
      await prisma.note.updateMany({
        where: {
          folderId,
          userId,
        },
        data: {
          folderId: null,
        },
      });

      // Delete the folder
      await prisma.folder.delete({
        where: {
          id: folderId,
        },
      });
    }

    return true;
  } catch (error) {
    console.error("Error deleting folder:", error);
    return false;
  }
}
