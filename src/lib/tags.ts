import { createPool } from "mysql2/promise";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "noevo",
  password: process.env.MYSQL_PASSWORD || "noevopassword",
  database: process.env.MYSQL_DATABASE || "noevo",
});

export type Tag = {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  let query = `SELECT * FROM tags WHERE user_id = ? ORDER BY name`;

  if (includeNoteCounts) {
    query = `
      SELECT t.*, COUNT(nt.note_id) as noteCount
      FROM tags t
      LEFT JOIN note_tags nt ON t.id = nt.tag_id
      WHERE t.user_id = ?
      GROUP BY t.id
      ORDER BY t.name
    `;
  }

  const [rows] = await pool.query(query, [userId]);
  return rows as Tag[];
}

/**
 * Get a specific tag by ID
 */
export async function getTagById(
  userId: string,
  tagId: string
): Promise<Tag | null> {
  const [rows] = await pool.query(
    `SELECT * FROM tags WHERE id = ? AND user_id = ?`,
    [tagId, userId]
  );

  if ((rows as any[]).length === 0) {
    return null;
  }

  return (rows as any[])[0];
}

/**
 * Create a new tag
 */
export async function createTag(userId: string, name: string): Promise<Tag> {
  // Check if tag already exists
  const [existingTags] = await pool.query(
    `SELECT * FROM tags WHERE name = ? AND user_id = ?`,
    [name, userId]
  );

  if ((existingTags as any[]).length > 0) {
    return (existingTags as any[])[0];
  }

  // Generate a unique ID
  const id = generateId();
  const now = new Date().toISOString();

  // Insert the tag
  await pool.query(
    `INSERT INTO tags (id, name, user_id)
     VALUES (?, ?, ?)`,
    [id, name, userId]
  );

  // Return the created tag
  return {
    id,
    name,
    userId,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update an existing tag
 */
export async function updateTag(
  userId: string,
  data: { id: string; name: string }
): Promise<Tag | null> {
  // Get the current tag to ensure it exists and belongs to the user
  const tag = await getTagById(userId, data.id);
  if (!tag) {
    return null;
  }

  const now = new Date().toISOString();

  // Update the tag
  await pool.query(
    `UPDATE tags SET name = ?, updated_at = ? WHERE id = ? AND user_id = ?`,
    [data.name, now, data.id, userId]
  );

  // Return the updated tag
  return getTagById(userId, data.id);
}

/**
 * Delete a tag
 */
export async function deleteTag(
  userId: string,
  tagId: string
): Promise<boolean> {
  // Get the tag to ensure it exists and belongs to the user
  const tag = await getTagById(userId, tagId);
  if (!tag) {
    return false;
  }

  // Start a transaction
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Delete note-tag associations first
    await connection.query(
      `DELETE nt FROM note_tags nt
       JOIN tags t ON nt.tag_id = t.id
       WHERE t.id = ? AND t.user_id = ?`,
      [tagId, userId]
    );

    // Delete the tag
    const [result] = (await connection.query(
      `DELETE FROM tags WHERE id = ? AND user_id = ?`,
      [tagId, userId]
    )) as any;

    await connection.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Get notes by tag
 */
export async function getNotesByTag(
  userId: string,
  tagName: string
): Promise<any[]> {
  const [rows] = await pool.query(
    `SELECT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     JOIN note_tags nt ON n.id = nt.note_id
     JOIN tags t ON nt.tag_id = t.id
     WHERE n.user_id = ? AND t.name = ?
     GROUP BY n.id`,
    [userId, tagName]
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
 * Add a tag to a note
 */
export async function addTagToNote(
  userId: string,
  noteId: string,
  tagName: string
): Promise<boolean> {
  // Verify note exists and belongs to user
  const [noteRows] = await pool.query(
    `SELECT id FROM notes WHERE id = ? AND user_id = ?`,
    [noteId, userId]
  );

  if ((noteRows as any[]).length === 0) {
    throw new Error("Note not found");
  }

  // Get or create the tag
  const tag = await createTag(userId, tagName);

  // Check if note already has this tag
  const [existingRows] = await pool.query(
    `SELECT * FROM note_tags WHERE note_id = ? AND tag_id = ?`,
    [noteId, tag.id]
  );

  if ((existingRows as any[]).length > 0) {
    return true; // Tag already exists on this note
  }

  // Add tag to note
  await pool.query(`INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)`, [
    noteId,
    tag.id,
  ]);

  return true;
}

/**
 * Remove a tag from a note
 */
export async function removeTagFromNote(
  userId: string,
  noteId: string,
  tagName: string
): Promise<boolean> {
  // Verify note exists and belongs to user
  const [noteRows] = await pool.query(
    `SELECT id FROM notes WHERE id = ? AND user_id = ?`,
    [noteId, userId]
  );

  if ((noteRows as any[]).length === 0) {
    throw new Error("Note not found");
  }

  // Find the tag
  const [tagRows] = await pool.query(
    `SELECT id FROM tags WHERE name = ? AND user_id = ?`,
    [tagName, userId]
  );

  if ((tagRows as any[]).length === 0) {
    return false; // Tag doesn't exist
  }

  const tagId = (tagRows as any[])[0].id;

  // Remove tag from note
  const [result] = (await pool.query(
    `DELETE FROM note_tags 
     WHERE note_id = ? AND tag_id = ? AND (
       SELECT COUNT(*) FROM notes WHERE id = ? AND user_id = ?
     ) > 0`,
    [noteId, tagId, noteId, userId]
  )) as any;

  return result.affectedRows > 0;
}

// Helper function to generate a unique ID
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
