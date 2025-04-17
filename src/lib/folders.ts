import { createPool } from "mysql2/promise";
import { camelize, generateId } from "./utils";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "noevo",
  password: process.env.MYSQL_PASSWORD || "noevopassword",
  database: process.env.MYSQL_DATABASE || "noevo",
});

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
  let query = `SELECT f.* FROM folders f WHERE f.user_id = ?`;

  if (includeNoteCounts) {
    query = `
      SELECT f.*, COUNT(n.id) as noteCount 
      FROM folders f 
      LEFT JOIN notes n ON f.id = n.folder_id
      WHERE f.user_id = ?
      GROUP BY f.id
    `;
  }

  const [rows] = await pool.query(query, [userId]);

  // Process the results to convert camelCase keys
  const camelCasedRows = (rows as any[]).map((folder) => {
    const camelCasedKeys = Object.fromEntries(
      Object.entries(folder).map(([key, value]) => [camelize(key), value])
    );
    return {
      ...camelCasedKeys,
      noteCount: folder.noteCount || 0, // Default to 0 if not included
    };
  });

  console.log(camelize("note_count"));

  return camelCasedRows as Folder[];
}

/**
 * Get a folder by ID
 */
export async function getFolderById(
  userId: string,
  folderId: string
): Promise<Folder | null> {
  const [rows] = await pool.query(
    `SELECT * FROM folders WHERE id = ? AND user_id = ?`,
    [folderId, userId]
  );

  if ((rows as any[]).length === 0) {
    return null;
  }

  return (rows as any[])[0];
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
  const now = new Date().toISOString();

  // Insert the folder
  await pool.query(
    `INSERT INTO folders (id, name, user_id, parent_id)
     VALUES (?, ?, ?, ?)`,
    [id, data.name, userId, data.parentId || null]
  );

  // Return the created folder
  return {
    id,
    name: data.name,
    userId,
    parentId: data.parentId || null,
    createdAt: now,
    updatedAt: now,
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

  const now = new Date().toISOString();

  // Build update fields dynamically
  const updateFields = [];
  const params = [];

  if (data.name !== undefined) {
    updateFields.push("name = ?");
    params.push(data.name);
  }

  if (data.parentId !== undefined) {
    updateFields.push("parent_id = ?");
    params.push(data.parentId);
  }

  params.push(now);

  // Add the id and userId for the WHERE clause
  params.push(data.id);
  params.push(userId);

  // Update the folder
  await pool.query(
    `UPDATE folders SET ${updateFields.join(", ")} WHERE id = ? AND user_id = ?`,
    params
  );

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

  // Get all notes in this folder
  const [noteRows] = await pool.query(
    `SELECT id FROM notes WHERE folder_id = ? AND user_id = ?`,
    [folderId, userId]
  );

  const notes = noteRows as any[];

  // Get all child folders
  const [childFolderRows] = await pool.query(
    `SELECT id FROM folders WHERE parent_id = ? AND user_id = ?`,
    [folderId, userId]
  );

  const childFolders = childFolderRows as any[];

  // If there are notes or child folders and recursive is false, abort
  if (!recursive && (notes.length > 0 || childFolders.length > 0)) {
    throw new Error(
      "Folder is not empty. Set recursive to true to delete all contents."
    );
  }

  // Start a transaction to ensure all operations succeed or fail together
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // If recursive, delete all contents
    if (recursive) {
      // Delete child folders recursively
      for (const childFolder of childFolders) {
        await deleteFolder(userId, childFolder.id, true);
      }

      // Delete notes in this folder
      if (notes.length > 0) {
        // Delete note tags first
        await connection.query(
          `DELETE nt FROM note_tags nt
           JOIN notes n ON nt.note_id = n.id
           WHERE n.folder_id = ? AND n.user_id = ?`,
          [folderId, userId]
        );

        // Delete shared notes
        await connection.query(
          `DELETE FROM shared_notes 
           WHERE note_id IN (SELECT id FROM notes WHERE folder_id = ? AND user_id = ?)`,
          [folderId, userId]
        );

        // Delete notes
        await connection.query(
          `DELETE FROM notes WHERE folder_id = ? AND user_id = ?`,
          [folderId, userId]
        );
      }
    } else {
      // If not recursive, move notes to root
      await connection.query(
        `UPDATE notes SET folder_id = NULL WHERE folder_id = ? AND user_id = ?`,
        [folderId, userId]
      );
    }

    // Delete the folder
    const [result] = (await connection.query(
      `DELETE FROM folders WHERE id = ? AND user_id = ?`,
      [folderId, userId]
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
