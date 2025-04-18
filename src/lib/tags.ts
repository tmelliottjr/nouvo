import { prisma } from "./prisma";
import { generateId } from "./utils";

export type Tag = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  noteCount?: number;
};

/**
 * Get all tags for a specific user
 * Optionally includes the count of notes for each tag
 */
export async function getTags(
  userId: string,
  includeNoteCounts = false
): Promise<Tag[]> {
  if (!includeNoteCounts) {
    // Simple query without note counts
    const tags = await prisma.tag.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      userId: tag.userId,
      createdAt: tag.createdAt.toISOString(),
    }));
  } else {
    // Query with note counts
    const tags = await prisma.tag.findMany({
      where: { userId },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            notes: true,
          },
        },
      },
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      userId: tag.userId,
      createdAt: tag.createdAt.toISOString(),
      noteCount: tag._count.notes,
    }));
  }
}

/**
 * Get a specific tag by ID
 */
export async function getTagById(
  userId: string,
  tagId: string
): Promise<Tag | null> {
  const tag = await prisma.tag.findFirst({
    where: {
      id: tagId,
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

  if (!tag) {
    return null;
  }

  return {
    id: tag.id,
    name: tag.name,
    userId: tag.userId,
    createdAt: tag.createdAt.toISOString(),
    noteCount: tag._count.notes,
  };
}

/**
 * Create a new tag
 */
export async function createTag(userId: string, name: string): Promise<Tag> {
  // Check if tag already exists using Prisma's unique constraint
  try {
    const tag = await prisma.tag.upsert({
      where: {
        userId_name: {
          userId,
          name,
        },
      },
      update: {}, // No updates if it exists
      create: {
        id: generateId(),
        name,
        userId,
      },
    });

    return {
      id: tag.id,
      name: tag.name,
      userId: tag.userId,
      createdAt: tag.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
}

/**
 * Update an existing tag
 */
export async function updateTag(
  userId: string,
  data: { id: string; name: string }
): Promise<Tag | null> {
  try {
    // Check if tag exists first
    const existingTag = await prisma.tag.findFirst({
      where: {
        id: data.id,
        userId,
      },
    });

    if (!existingTag) {
      return null;
    }

    // Update the tag
    const updatedTag = await prisma.tag.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    return {
      id: updatedTag.id,
      name: updatedTag.name,
      userId: updatedTag.userId,
      createdAt: updatedTag.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error;
  }
}

/**
 * Delete a tag
 */
export async function deleteTag(
  userId: string,
  tagId: string
): Promise<boolean> {
  try {
    // Check if tag exists first
    const existingTag = await prisma.tag.findFirst({
      where: {
        id: tagId,
        userId,
      },
    });

    if (!existingTag) {
      return false;
    }

    // Prisma will handle cascading deletions based on the schema
    await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error deleting tag:", error);
    return false;
  }
}

/**
 * Get notes by tag
 */
export async function getNotesByTag(
  userId: string,
  tagName: string
): Promise<any[]> {
  const notes = await prisma.note.findMany({
    where: {
      userId,
      tags: {
        some: {
          tag: {
            name: tagName,
          },
        },
      },
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
 * Add a tag to a note
 */
export async function addTagToNote(
  userId: string,
  noteId: string,
  tagName: string
): Promise<boolean> {
  try {
    // Verify note exists and belongs to user
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Get or create the tag
    const tag = await createTag(userId, tagName);

    // Check if note already has this tag
    const existingNoteTag = await prisma.noteTag.findUnique({
      where: {
        noteId_tagId: {
          noteId,
          tagId: tag.id,
        },
      },
    });

    if (existingNoteTag) {
      return true; // Tag already exists on this note
    }

    // Add tag to note
    await prisma.noteTag.create({
      data: {
        noteId,
        tagId: tag.id,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding tag to note:", error);
    throw error;
  }
}

/**
 * Remove a tag from a note
 */
export async function removeTagFromNote(
  userId: string,
  noteId: string,
  tagName: string
): Promise<boolean> {
  try {
    // Verify note exists and belongs to user
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Find the tag
    const tag = await prisma.tag.findFirst({
      where: {
        name: tagName,
        userId,
      },
    });

    if (!tag) {
      return false; // Tag doesn't exist
    }

    // Remove tag from note
    const result = await prisma.noteTag.deleteMany({
      where: {
        noteId,
        tagId: tag.id,
      },
    });

    return result.count > 0;
  } catch (error) {
    console.error("Error removing tag from note:", error);
    throw error;
  }
}
