import { createPool } from "mysql2/promise";
import { Note } from "./notes";
import { camelize, generateId } from "./utils";

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

export type PendingShare = {
  id: string;
  noteId: string;
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
 * Get a specific note by ID with share information
 * Returns the note if:
 * 1. The user is the owner of the note
 * 2. The note is shared with the user
 */
export async function getSharedNoteById(
  userId: string,
  noteId: string
): Promise<{ note: Note | null; access: SharedNote | null; isOwner: boolean }> {
  // First check if the user is the note owner
  const [noteRows] = await pool.query(
    `SELECT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     LEFT JOIN note_tags nt ON n.id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.id
     WHERE n.id = ? AND n.user_id = ?
     GROUP BY n.id`,
    [noteId, userId]
  );

  // If user is the owner, return the note with owner access
  if ((noteRows as any[]).length > 0) {
    const { tagList, ...rest } = (noteRows as any[])[0];
    const note = {
      ...rest,
      tags: tagList ? tagList.split(",") : [],
    };

    return {
      note,
      access: null,
      isOwner: true,
    };
  }

  // If not the owner, check if note is shared with user
  const [shareRows] = await pool.query(
    `SELECT s.* FROM shares s 
     WHERE s.note_id = ? AND s.user_id = ?`,
    [noteId, userId]
  );

  if ((shareRows as any[]).length === 0) {
    // User doesn't have access to this note
    return { note: null, access: null, isOwner: false };
  }

  // User has shared access, get the note
  const [sharedNoteRows] = await pool.query(
    `SELECT n.*, GROUP_CONCAT(t.name) as tagList
     FROM notes n
     LEFT JOIN note_tags nt ON n.id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.id
     WHERE n.id = ?
     GROUP BY n.id`,
    [noteId]
  );

  if ((sharedNoteRows as any[]).length === 0) {
    // Note doesn't exist
    return { note: null, access: null, isOwner: false };
  }

  // Format the note with tags
  const { tagList, ...rest } = (sharedNoteRows as any[])[0];
  const note = {
    ...rest,
    tags: tagList ? tagList.split(",") : [],
  };

  // Format the share access information
  const shareAccess = (shareRows as any[])[0];
  const camelCasedAccess = Object.fromEntries(
    Object.entries(shareAccess).map(([key, value]) => [camelize(key), value])
  );

  return {
    note,
    access: camelCasedAccess as SharedNote,
    isOwner: false,
  };
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

  // If user doesn't exist, create a record in pending_shares table
  if (users.length === 0) {
    // Check if there's already a pending share for this email and note
    const [existingPendingRows] = await pool.query(
      `SELECT * FROM pending_shares WHERE note_id = ? AND user_email = ?`,
      [data.noteId, data.userEmail]
    );

    const existingPendingShares = existingPendingRows as any[];
    if (existingPendingShares.length > 0) {
      // Update the existing pending share instead of creating a new one
      await pool.query(
        `UPDATE pending_shares SET permission = ? WHERE note_id = ? AND user_email = ?`,
        [data.permission, data.noteId, data.userEmail]
      );

      // Format with proper camelCased keys
      const pendingShare = existingPendingShares[0];
      const camelCasedKeys = Object.fromEntries(
        Object.entries(pendingShare).map(([key, value]) => [
          camelize(key),
          value,
        ])
      );

      // Return a temporary SharedNote object
      return {
        id: camelCasedKeys.id,
        noteId: data.noteId,
        userId: `pending_${camelCasedKeys.id}`, // Create a placeholder userId
        userEmail: data.userEmail,
        permission: data.permission,
        createdAt: camelCasedKeys.createdAt,
      } as SharedNote;
    }

    // Create a new pending share record
    const id = generateId();
    const createdAt = new Date().toISOString();

    await pool.query(
      `INSERT INTO pending_shares (id, note_id, user_email, permission)
       VALUES (?, ?, ?, ?)`,
      [id, data.noteId, data.userEmail, data.permission]
    );

    // Return a temporary SharedNote object
    return {
      id,
      noteId: data.noteId,
      userId: `pending_${id}`, // Create a placeholder userId
      userEmail: data.userEmail,
      permission: data.permission,
      createdAt,
    } as SharedNote;
  }

  // User exists, handle regular share
  const targetUserId = users[0].id;

  // Don't allow sharing with yourself
  if (targetUserId === ownerId) {
    throw new Error("You cannot share a note with yourself");
  }

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

  await pool.query(
    `INSERT INTO shares (id, note_id, user_id, user_email, permission)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.noteId, targetUserId, data.userEmail, data.permission]
  );

  return {
    id,
    noteId: data.noteId,
    userId: targetUserId,
    userEmail: data.userEmail,
    permission: data.permission,
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

/**
 * Claim any pending shared notes for a newly registered user
 * This moves records from pending_shares to the shares table
 */
export async function claimPendingShares(
  userId: string,
  userEmail: string
): Promise<number> {
  // Find any pending shares for this email
  const [pendingRows] = await pool.query(
    `SELECT * FROM pending_shares WHERE user_email = ?`,
    [userEmail]
  );

  const pendingShares = pendingRows as any[];
  if (pendingShares.length === 0) {
    return 0; // No pending shares to claim
  }

  // Begin transaction
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    let processedCount = 0;

    // For each pending share, create a real share
    for (const pendingShare of pendingShares) {
      // Check if a share already exists (in case of duplicate processing)
      const [existingRows] = await connection.query(
        `SELECT * FROM shares WHERE note_id = ? AND user_id = ?`,
        [pendingShare.note_id, userId]
      );

      if ((existingRows as any[]).length === 0) {
        // Create a new share record
        const id = generateId();
        await connection.query(
          `INSERT INTO shares (id, note_id, user_id, user_email, permission)
           VALUES (?, ?, ?, ?, ?)`,
          [id, pendingShare.note_id, userId, userEmail, pendingShare.permission]
        );
        processedCount++;
      }

      // Delete the pending share
      await connection.query(`DELETE FROM pending_shares WHERE id = ?`, [
        pendingShare.id,
      ]);
    }

    await connection.commit();
    return processedCount;
  } catch (error) {
    await connection.rollback();
    console.error("Error claiming pending shares:", error);
    throw error;
  } finally {
    connection.release();
  }
}
