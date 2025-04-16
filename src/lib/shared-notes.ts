import { createPool } from "mysql2/promise";
import { camelize } from "./utils";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "noevo",
  password: process.env.MYSQL_PASSWORD || "noevopassword",
  database: process.env.MYSQL_DATABASE || "noevo",
});

export type SharedNote = {
  id: string;
  noteId: string;
  userId: string;
  userEmail: string;
  permission: "read" | "write";
  createdAt: string;
};

/**
 * Get all shared notes for a specific user
 */
export async function getSharedNotes(userId: string): Promise<SharedNote[]> {
  const [rows] = await pool.query(`SELECT * FROM shares WHERE user_id = ?`, [
    userId,
  ]);
  return rows as SharedNote[];
}

/**
 * Get all users with access to a specific note
 */
export async function getSharedNoteUsers(
  noteId: string
): Promise<SharedNote[]> {
  const [rows] = await pool.query(`SELECT * FROM shares WHERE note_id = ?`, [
    noteId,
  ]);

  const camelCasedRows = (rows as any[]).map((share) => {
    const camelCasedKeys = Object.fromEntries(
      Object.entries(share).map(([key, value]) => [camelize(key), value])
    );
    return {
      ...camelCasedKeys,
      permission: share.permission || "read", // Default to "read" if not included
    };
  });

  return camelCasedRows as SharedNote[];
}

/**
 * Get all notes shared with a specific user
 */
export async function getNotesSharedWithUser(
  userId: string
): Promise<SharedNote[]> {
  const [rows] = await pool.query(
    `SELECT sn.* FROM shares sn
     JOIN notes n ON sn.note_id = n.id
     WHERE sn.user_id = ?`,
    [userId]
  );
  return rows as SharedNote[];
}

/**
 * Share a note with another user
 */
export async function shareNote(
  ownerId: string,
  data: { noteId: string; userEmail: string; permission: "read" | "write" }
): Promise<SharedNote> {
  // First verify that the current user owns the note
  const [noteRows] = await pool.query(
    `SELECT * FROM notes WHERE id = ? AND user_id = ?`,
    [data.noteId, ownerId]
  );

  const notes = noteRows as any[];
  if (notes.length === 0) {
    throw new Error("Note not found or you don't have permission to share it");
  }

  // Find the target user by email
  const [userRows] = await pool.query(`SELECT id FROM user WHERE email = ?`, [
    data.userEmail,
  ]);

  const users = userRows as any[];
  if (users.length === 0) {
    throw new Error("User not found");
  }

  const targetUserId = users[0].id;

  // Check if the note is already shared with this user
  const [existingRows] = await pool.query(
    `SELECT * FROM shares WHERE note_id = ? AND user_id = ?`,
    [data.noteId, targetUserId]
  );

  const existingShares = existingRows as any[];
  if (existingShares.length > 0) {
    // Update the existing share instead of creating a new one
    await pool.query(
      `UPDATE shares SET permission = ? WHERE note_id = ? AND user_id = ?`,
      [data.permission, data.noteId, targetUserId]
    );

    return {
      ...existingShares[0],
      permission: data.permission,
    } as SharedNote;
  }

  // Create a new shared note record
  const id = generateId();
  const createdAt = new Date().toISOString();

  await pool.query(
    `INSERT INTO shares (id, note_id, user_id, permission)
     VALUES (?, ?, ?, ?)`,
    [id, data.noteId, targetUserId, data.permission]
  );

  return {
    id,
    noteId: data.noteId,
    userId: targetUserId,
    userEmail: data.userEmail,
    permission: data.permission,
    createdAt,
  };
}

/**
 * Revoke access to a shared note
 */
export async function revokeShare(
  ownerId: string,
  noteId: string,
  sharedNoteId: string
): Promise<boolean> {
  // First verify that the current user owns the note
  const [noteRows] = await pool.query(
    `SELECT * FROM notes WHERE id = ? AND user_id = ?`,
    [noteId, ownerId]
  );

  const notes = noteRows as any[];
  if (notes.length === 0) {
    throw new Error(
      "Note not found or you don't have permission to revoke access"
    );
  }

  // Delete the shared note record
  const [result] = (await pool.query(
    `DELETE FROM shares WHERE id = ? AND note_id = ?`,
    [sharedNoteId, noteId]
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
