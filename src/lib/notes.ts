import { prisma } from "./prisma";
import { generateId } from "./utils";

export type Note = {
  id: string;
  name: string;
  content: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  tags?: string[];
};

/**
 * Get all notes for a specific user
 */
export async function getNotes(userId: string): Promise<Note[]> {
  const notes = await prisma.note.findMany({
    where: { userId },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return notes.map((note) => ({
    id: note.id,
    name: note.title,
    content: note.content,
    userId: note.userId,
    parentId: note.folderId,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    isPublic: note.isPublic || false,
    tags: note.tags.map((noteTag) => noteTag.tag.name),
  }));
}

/**
 * Get a specific note by ID
 */
export async function getNoteById(
  userId: string,
  noteId: string
): Promise<Note | null> {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!note) {
    return null;
  }

  return {
    id: note.id,
    name: note.title,
    content: note.content,
    userId: note.userId,
    parentId: note.folderId,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    isPublic: note.isPublic || false,
    tags: note.tags.map((noteTag) => noteTag.tag.name),
  };
}

/**
 * Get a public note by ID
 * This function doesn't require authentication
 */
export async function getPublicNoteById(noteId: string): Promise<Note | null> {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      isPublic: true,
    },
    include: {
      user: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!note) {
    return null;
  }

  return {
    id: note.id,
    name: note.title,
    content: note.content,
    userId: note.userId,
    parentId: note.folderId,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    isPublic: note.isPublic || false,
    tags: note.tags.map((noteTag) => noteTag.tag.name),
  };
}

/**
 * Create a new note
 */
export async function createNote(
  userId: string,
  data: { name: string; content: string; parentId?: string; tags?: string[] }
): Promise<Note> {
  const id = generateId();
  const now = new Date();

  // Create the note
  const note = await prisma.note.create({
    data: {
      id,
      title: data.name,
      content: data.content,
      userId,
      folderId: data.parentId || null,
    },
  });

  // Add tags if provided
  if (data.tags && data.tags.length > 0) {
    for (const tagName of data.tags) {
      // Get or create the tag
      const tag = await prisma.tag.upsert({
        where: {
          userId_name: {
            userId,
            name: tagName,
          },
        },
        update: {},
        create: {
          id: generateId(),
          name: tagName,
          userId,
        },
      });

      // Link the tag to the note
      await prisma.noteTag.create({
        data: {
          noteId: id,
          tagId: tag.id,
        },
      });
    }
  }

  return {
    id: note.id,
    name: note.title,
    content: note.content,
    userId: note.userId,
    parentId: note.folderId,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    tags: data.tags || [],
  };
}

/**
 * Update an existing note
 */
export async function updateNote(
  userId: string,
  data: {
    id: string;
    name?: string;
    content?: string;
    parentId?: string | null;
    isPublic?: boolean;
    tags?: string[];
  }
): Promise<Note | null> {
  // Check if note exists and belongs to user
  const existingNote = await prisma.note.findFirst({
    where: {
      id: data.id,
      userId,
    },
  });

  if (!existingNote) {
    return null;
  }

  // Build update data
  const updateData: any = {};
  if (data.name !== undefined) updateData.title = data.name;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.parentId !== undefined) updateData.folderId = data.parentId;
  if (data.isPublic !== undefined) updateData.isPublic = data.isPublic;

  // Update the note
  const updatedNote = await prisma.note.update({
    where: {
      id: data.id,
    },
    data: updateData,
  });

  // Update tags if provided
  if (data.tags !== undefined) {
    // Remove existing tags
    await prisma.noteTag.deleteMany({
      where: {
        noteId: data.id,
      },
    });

    // Add new tags
    if (data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Get or create the tag
        const tag = await prisma.tag.upsert({
          where: {
            userId_name: {
              userId,
              name: tagName,
            },
          },
          update: {},
          create: {
            id: generateId(),
            name: tagName,
            userId,
          },
        });

        // Link the tag to the note
        await prisma.noteTag.create({
          data: {
            noteId: data.id,
            tagId: tag.id,
          },
        });
      }
    }
  }

  // Return the updated note
  return getNoteById(userId, data.id);
}

/**
 * Delete a note
 */
export async function deleteNote(
  userId: string,
  noteId: string
): Promise<boolean> {
  try {
    // Check if the note belongs to the user
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      return false;
    }

    // Delete note tags (Prisma will handle this cascading delete)
    // Delete shared notes (Prisma will handle this cascading delete)
    // Delete the note itself
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}

/**
 * Search notes by name, content, or tags
 */
export async function searchNotes(
  userId: string,
  query: string
): Promise<Note[]> {
  const searchTerm = `%${query}%`; // This will be used in the SQL LIKE operator

  const notes = await prisma.note.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query } },
        { content: { contains: query } },
        {
          tags: {
            some: {
              tag: {
                name: { contains: query },
              },
            },
          },
        },
      ],
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return notes.map((note) => ({
    id: note.id,
    name: note.title,
    content: note.content,
    userId: note.userId,
    parentId: note.folderId,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    isPublic: note.isPublic || false,
    tags: note.tags.map((noteTag) => noteTag.tag.name),
  }));
}

/**
 * Helper function relocated from the original code
 * The Prisma upsert method replaces this functionality
 */
