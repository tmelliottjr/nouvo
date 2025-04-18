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
  const notes = await prisma.notes.findMany({
    where: { user_id: userId },
    include: {
      note_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  return notes.map((note) => ({
    id: note.id,
    name: note.name,
    content: note.content ?? "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() ?? new Date().toISOString(),
    isPublic: note.is_public ?? false,
    tags: note.note_tags?.map((noteTag) => noteTag.tags.name) || [],
  }));
}

/**
 * Get a specific note by ID
 */
export async function getNoteById(
  userId: string,
  noteId: string
): Promise<Note | null> {
  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: userId,
    },
    include: {
      note_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!note) {
    return null;
  }

  return {
    id: note.id,
    name: note.name,
    content: note.content ?? "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() ?? new Date().toISOString(),
    isPublic: note.is_public ?? false,
    tags: note.note_tags?.map((noteTag) => noteTag.tags.name) || [],
  };
}

/**
 * Get a public note by ID
 * This function doesn't require authentication
 */
export async function getPublicNoteById(noteId: string): Promise<Note | null> {
  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      is_public: true,
    },
    include: {
      user: true,
      note_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!note) {
    return null;
  }

  return {
    id: note.id,
    name: note.name,
    content: note.content ?? "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() ?? new Date().toISOString(),
    isPublic: note.is_public ?? false,
    tags: note.note_tags?.map((noteTag) => noteTag.tags.name) || [],
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

  // Create the note
  const note = await prisma.notes.create({
    data: {
      id,
      name: data.name,
      content: data.content,
      user_id: userId,
      parent_id: data.parentId || null,
    },
  });

  // Add tags if provided
  if (data.tags && data.tags.length > 0) {
    for (const tagName of data.tags) {
      // Get or create the tag
      const tag = await prisma.tags.upsert({
        where: {
          user_id_name: {
            user_id: userId,
            name: tagName,
          },
        },
        update: {},
        create: {
          id: generateId(),
          name: tagName,
          user_id: userId,
        },
      });

      // Link the tag to the note
      await prisma.note_tags.create({
        data: {
          note_id: id,
          tag_id: tag.id,
        },
      });
    }
  }

  return {
    id: note.id,
    name: note.name,
    content: note.content ?? "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() ?? new Date().toISOString(),
    tags: data.tags || [],
    isPublic: note.is_public ?? false,
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
  const existingNote = await prisma.notes.findFirst({
    where: {
      id: data.id,
      user_id: userId,
    },
  });

  if (!existingNote) {
    return null;
  }

  // Build update data
  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.parentId !== undefined) updateData.parent_id = data.parentId;
  if (data.isPublic !== undefined) updateData.is_public = data.isPublic;

  // Update the note
  await prisma.notes.update({
    where: {
      id: data.id,
    },
    data: updateData,
  });

  // Update tags if provided
  if (data.tags !== undefined) {
    // Remove existing tags
    await prisma.note_tags.deleteMany({
      where: {
        note_id: data.id,
      },
    });

    // Add new tags
    if (data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Get or create the tag
        const tag = await prisma.tags.upsert({
          where: {
            user_id_name: {
              user_id: userId,
              name: tagName,
            },
          },
          update: {},
          create: {
            id: generateId(),
            name: tagName,
            user_id: userId,
          },
        });

        // Link the tag to the note
        await prisma.note_tags.create({
          data: {
            note_id: data.id,
            tag_id: tag.id,
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
    const note = await prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: userId,
      },
    });

    if (!note) {
      return false;
    }

    // Delete note tags (Prisma will handle this cascading delete)
    // Delete shared notes (Prisma will handle this cascading delete)
    // Delete the note itself
    await prisma.notes.delete({
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
  const notes = await prisma.notes.findMany({
    where: {
      user_id: userId,
      OR: [
        { name: { contains: query } },
        { content: { contains: query } },
        {
          note_tags: {
            some: {
              tags: {
                name: { contains: query },
              },
            },
          },
        },
      ],
    },
    include: {
      note_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  return notes.map((note) => ({
    id: note.id,
    name: note.name,
    content: note.content ?? "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() ?? new Date().toISOString(),
    isPublic: note.is_public ?? false,
    tags: note.note_tags?.map((noteTag) => noteTag.tags.name) || [],
  }));
}
