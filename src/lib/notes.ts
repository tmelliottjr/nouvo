import { createPool } from "mysql2/promise";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "noevo",
  password: process.env.MYSQL_PASSWORD || "noevopassword",
  database: process.env.MYSQL_DATABASE || "noevo",
});

export type Note = {
  id: string;
  name: string;
  content: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
};

/**
 * Get all notes for a specific user
 */
export async function getNotes(userId: string): Promise<Note[]> {
  // Get all notes for this user
  const [rows] = await pool.query(
    `SELECT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     LEFT JOIN note_tags nt ON n.id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.id
     WHERE n.user_id = ?
     GROUP BY n.id`,
    [userId]
  );

  // Process the results to convert tagList to tags array
  return (rows as any[]).map((note) => {
    const { tagList, ...rest } = note;
    return {
      ...rest,
      tags: tagList ? tagList.split(",") : [],
    };
  });
}

/**
 * Get a specific note by ID
 */
export async function getNoteById(
  userId: string,
  noteId: string
): Promise<Note | null> {
  // Get the note if it belongs to this user
  const [rows] = await pool.query(
    `SELECT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     LEFT JOIN note_tags nt ON n.id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.id
     WHERE n.user_id = ? AND n.id = ?
     GROUP BY n.id`,
    [userId, noteId]
  );

  if ((rows as any[]).length === 0) {
    return null;
  }

  // Process the results to convert tagList to tags array
  const note = rows as any[];
  const { tagList, ...rest } = note[0];
  return {
    ...rest,
    tags: tagList ? tagList.split(",") : [],
  };
}

/**
 * Create a new note
 */
export async function createNote(
  userId: string,
  data: { name: string; content: string; parentId?: string; tags?: string[] }
): Promise<Note> {
  // Generate a unique ID
  const id = generateId();
  const now = new Date().toISOString();

  // Insert the note
  await pool.query(
    `INSERT INTO notes (id, name, content, user_id, parent_id)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.name, data.content, userId, data.parentId || null]
  );

  // Add tags if provided
  if (data.tags && data.tags.length > 0) {
    for (const tagName of data.tags) {
      // Get or create the tag
      const tagId = await getOrCreateTag(userId, tagName);

      // Link the tag to the note
      await pool.query(
        `INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)`,
        [id, tagId]
      );
    }
  }

  // Return the created note
  return {
    id,
    name: data.name,
    content: data.content,
    userId,
    parentId: data.parentId || null,
    createdAt: now,
    updatedAt: now,
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
    tags?: string[];
  }
): Promise<Note | null> {
  // Get the current note to ensure it exists and belongs to the user
  const [rows] = await pool.query(
    `SELECT * FROM notes WHERE id = ? AND user_id = ?`,
    [data.id, userId]
  );

  if ((rows as any[]).length === 0) {
    return null;
  }

  const note = (rows as any[])[0];
  const now = new Date().toISOString();

  // Build update fields dynamically
  const updateFields = [];
  const params = [];

  if (data.name !== undefined) {
    updateFields.push("name = ?");
    params.push(data.name);
  }

  if (data.content !== undefined) {
    updateFields.push("content = ?");
    params.push(data.content);
  }

  if (data.parentId !== undefined) {
    updateFields.push("parent_id = ?");
    params.push(data.parentId);
  }

  updateFields.push("updated_at = ?");
  params.push(now);

  // Add the id and userId for the WHERE clause
  params.push(data.id);
  params.push(userId);

  // Update the note
  await pool.query(
    `UPDATE notes SET ${updateFields.join(", ")} WHERE id = ? AND user_id = ?`,
    params
  );

  // Update tags if provided
  if (data.tags !== undefined) {
    // Remove existing tags
    await pool.query(
      `DELETE nt FROM note_tags nt
       JOIN tags t ON nt.tag_id = t.id
       WHERE nt.note_id = ? AND t.user_id = ?`,
      [data.id, userId]
    );

    // Add new tags
    if (data.tags.length > 0) {
      for (const tagName of data.tags) {
        // Get or create the tag
        const tagId = await getOrCreateTag(userId, tagName);

        // Link the tag to the note
        await pool.query(
          `INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)`,
          [data.id, tagId]
        );
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
  // Delete note tags first due to foreign key constraint
  await pool.query(
    `DELETE nt FROM note_tags nt
     JOIN notes n ON nt.note_id = n.id
     WHERE n.id = ? AND n.user_id = ?`,
    [noteId, userId]
  );

  // Delete shared notes related to this note
  await pool.query(
    `DELETE FROM shared_notes WHERE note_id = ? AND (
      SELECT COUNT(*) FROM notes WHERE id = ? AND user_id = ?
    ) > 0`,
    [noteId, noteId, userId]
  );

  // Delete the note
  const [result] = (await pool.query(
    `DELETE FROM notes WHERE id = ? AND user_id = ?`,
    [noteId, userId]
  )) as any;

  return result.affectedRows > 0;
}

/**
 * Search notes by name, content, or tags
 */
export async function searchNotes(
  userId: string,
  query: string
): Promise<Note[]> {
  const searchTerm = `%${query}%`;

  const [rows] = await pool.query(
    `SELECT DISTINCT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     LEFT JOIN note_tags nt ON n.id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.id
     WHERE n.user_id = ? AND (
       n.name LIKE ? OR n.content LIKE ? OR t.name LIKE ?
     )
     GROUP BY n.id`,
    [userId, searchTerm, searchTerm, searchTerm]
  );

  // Process the results to convert tagList to tags array
  return (rows as any[]).map((note) => {
    const { tagList, ...rest } = note;
    return {
      ...rest,
      tags: tagList ? tagList.split(",") : [],
    };
  });
}

/**
 * Get or create a tag by name for a user
 */
async function getOrCreateTag(
  userId: string,
  tagName: string
): Promise<string> {
  // Try to find the tag first
  const [tags] = await pool.query(
    `SELECT id FROM tags WHERE user_id = ? AND name = ?`,
    [userId, tagName]
  );

  if ((tags as any[]).length > 0) {
    return (tags as any[])[0].id;
  }

  // Create a new tag if it doesn't exist
  const tagId = generateId();
  await pool.query(`INSERT INTO tags (id, name, user_id) VALUES (?, ?, ?)`, [
    tagId,
    tagName,
    userId,
  ]);

  return tagId;
}

// Helper function to generate a unique ID
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
