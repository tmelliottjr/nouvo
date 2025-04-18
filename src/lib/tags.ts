import { prisma } from "./prisma";
import { generateId } from "./utils";

export type Tag = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  noteCount?: number;
};

export type NoteWithTags = {
  id: string;
  name: string;
  content: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
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
    const tags = await prisma.tags.findMany({
      where: { user_id: userId },
      orderBy: { name: "asc" },
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      userId: tag.user_id,
      createdAt: tag.created_at?.toISOString() || new Date().toISOString(),
    }));
  } else {
    // Query with note counts
    const tags = await prisma.tags.findMany({
      where: { user_id: userId },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            note_tags: true,
          },
        },
      },
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      userId: tag.user_id,
      createdAt: tag.created_at?.toISOString() || new Date().toISOString(),
      noteCount: tag._count.note_tags,
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
  const tag = await prisma.tags.findFirst({
    where: {
      id: tagId,
      user_id: userId,
    },
    include: {
      _count: {
        select: {
          note_tags: true,
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
    userId: tag.user_id,
    createdAt: tag.created_at?.toISOString() || new Date().toISOString(),
    noteCount: tag._count.note_tags,
  };
}

/**
 * Create a new tag
 */
export async function createTag(userId: string, name: string): Promise<Tag> {
  // Check if tag already exists using Prisma's unique constraint
  try {
    const tag = await prisma.tags.upsert({
      where: {
        user_id_name: {
          user_id: userId,
          name,
        },
      },
      update: {}, // No updates if it exists
      create: {
        id: generateId(),
        name,
        user_id: userId,
      },
    });

    return {
      id: tag.id,
      name: tag.name,
      userId: tag.user_id,
      createdAt: tag.created_at?.toISOString() || new Date().toISOString(),
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
    const existingTag = await prisma.tags.findFirst({
      where: {
        id: data.id,
        user_id: userId,
      },
    });

    if (!existingTag) {
      return null;
    }

    // Update the tag
    const updatedTag = await prisma.tags.update({
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
      userId: updatedTag.user_id,
      createdAt:
        updatedTag.created_at?.toISOString() || new Date().toISOString(),
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
    const existingTag = await prisma.tags.findFirst({
      where: {
        id: tagId,
        user_id: userId,
      },
    });

    if (!existingTag) {
      return false;
    }

    // Prisma will handle cascading deletions based on the schema
    await prisma.tags.delete({
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
): Promise<NoteWithTags[]> {
  const notes = await prisma.notes.findMany({
    where: {
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

  // Filter notes that have the specified tag
  const filteredNotes = notes.filter((note) =>
    note.note_tags.some((noteTag) => noteTag.tags.name === tagName)
  );

  return filteredNotes.map((note) => ({
    id: note.id,
    name: note.name,
    content: note.content || "",
    userId: note.user_id,
    parentId: note.parent_id,
    createdAt: note.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() || new Date().toISOString(),
    isPublic: note.is_public || false,
    tags: note.note_tags.map((noteTag) => noteTag.tags.name),
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
    const note = await prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: userId,
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Get or create the tag
    const tag = await createTag(userId, tagName);

    // Check if note already has this tag
    const existingNoteTag = await prisma.note_tags.findUnique({
      where: {
        note_id_tag_id: {
          note_id: noteId,
          tag_id: tag.id,
        },
      },
    });

    if (existingNoteTag) {
      return true; // Tag already exists on this note
    }

    // Add tag to note
    await prisma.note_tags.create({
      data: {
        note_id: noteId,
        tag_id: tag.id,
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
    const note = await prisma.notes.findFirst({
      where: {
        id: noteId,
        user_id: userId,
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    // Find the tag
    const tag = await prisma.tags.findFirst({
      where: {
        name: tagName,
        user_id: userId,
      },
    });

    if (!tag) {
      return false; // Tag doesn't exist
    }

    // Remove tag from note
    const result = await prisma.note_tags.deleteMany({
      where: {
        note_id: noteId,
        tag_id: tag.id,
      },
    });

    return result.count > 0;
  } catch (error) {
    console.error("Error removing tag from note:", error);
    throw error;
  }
}
