import { Note } from "./notes";
import { prisma } from "./prisma";
import { generateId } from "./utils";

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
  const shares = await prisma.shares.findMany({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
    },
  });

  return shares.map((share) => ({
    id: share.id,
    noteId: share.note_id,
    userId: share.user_id,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.created_at?.toISOString() || new Date().toISOString(),
  }));
}

/**
 * Get all users with access to a specific note
 */
export async function getSharedNoteUsers(
  noteId: string
): Promise<SharedNote[]> {
  // Get existing shares with user data
  const shares = await prisma.shares.findMany({
    where: {
      note_id: noteId,
    },
    include: {
      user: true,
    },
  });

  // Get pending shares
  const pendingShares = await prisma.pending_shares.findMany({
    where: {
      note_id: noteId,
    },
  });

  const shareResults = shares.map((share) => ({
    id: share.id,
    noteId: share.note_id,
    userId: share.user_id,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.created_at?.toISOString() || new Date().toISOString(),
  }));

  const pendingResults = pendingShares.map((pending) => ({
    id: pending.id,
    noteId: pending.note_id,
    userId: `pending_${pending.id}`, // Create a placeholder userId
    userEmail: pending.user_email,
    permission: pending.permission as "read" | "write",
    createdAt: new Date().toISOString(), // Pending shares might not have a created_at field
  }));

  return [...shareResults, ...pendingResults];
}

/**
 * Get all notes shared with a specific user
 */
export async function getNotesSharedWithUser(
  userId: string
): Promise<SharedNote[]> {
  const shares = await prisma.shares.findMany({
    where: {
      user_id: userId,
    },
    include: {
      notes: true,
      user: true,
    },
  });

  return shares.map((share) => ({
    id: share.id,
    noteId: share.note_id,
    userId: share.user_id,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.created_at?.toISOString() || new Date().toISOString(),
  }));
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
  const ownedNote = await prisma.notes.findFirst({
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

  // If user is the owner, return the note with owner access
  if (ownedNote) {
    const note = {
      id: ownedNote.id,
      name: ownedNote.name,
      content: ownedNote.content || "",
      userId: ownedNote.user_id,
      parentId: ownedNote.parent_id || null,
      createdAt:
        ownedNote.created_at?.toISOString() || new Date().toISOString(),
      updatedAt:
        ownedNote.updated_at?.toISOString() || new Date().toISOString(),
      isPublic: ownedNote.is_public || false,
      tags: ownedNote.note_tags.map((tag) => tag.tags.name),
    };

    return {
      note,
      access: null,
      isOwner: true,
    };
  }

  // If not the owner, check if note is shared with user
  const share = await prisma.shares.findFirst({
    where: {
      note_id: noteId,
      user_id: userId,
    },
    include: {
      user: true,
    },
  });

  if (!share) {
    // User doesn't have access to this note
    return { note: null, access: null, isOwner: false };
  }

  // User has shared access, get the note
  const sharedNote = await prisma.notes.findUnique({
    where: {
      id: noteId,
    },
    include: {
      note_tags: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!sharedNote) {
    // Note doesn't exist
    return { note: null, access: null, isOwner: false };
  }

  // Format the note with tags
  const note = {
    id: sharedNote.id,
    name: sharedNote.name,
    content: sharedNote.content || "",
    userId: sharedNote.user_id,
    parentId: sharedNote.parent_id || null,
    createdAt: sharedNote.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: sharedNote.updated_at?.toISOString() || new Date().toISOString(),
    isPublic: sharedNote.is_public || false,
    tags: sharedNote.note_tags.map((tag) => tag.tags.name),
  };

  // Format the share access information
  const access = {
    id: share.id,
    noteId: share.note_id,
    userId: share.user_id,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.created_at?.toISOString() || new Date().toISOString(),
  };

  return {
    note,
    access,
    isOwner: false,
  };
}

/**
 * Get a public note by user ID and note ID
 */
export async function getPublicNoteById(
  userId: string,
  noteId: string
): Promise<Note | null> {
  // Get the note if it's marked as public
  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: userId,
      is_public: true,
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
    content: note.content || "",
    userId: note.user_id,
    parentId: note.parent_id || null,
    createdAt: note.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: note.updated_at?.toISOString() || new Date().toISOString(),
    isPublic: note.is_public || false,
    tags: note.note_tags.map((tag) => tag.tags.name),
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
  const note = await prisma.notes.findFirst({
    where: {
      id: data.noteId,
      user_id: ownerId,
    },
  });

  if (!note) {
    throw new Error("Note not found or you don't have permission to share it");
  }

  // Find the target user by email
  const user = await prisma.user.findUnique({
    where: {
      email: data.userEmail,
    },
  });

  // If user doesn't exist, create a pending share
  if (!user) {
    // Check if there's already a pending share for this email and note
    const existingPendingShare = await prisma.pending_shares.findFirst({
      where: {
        note_id: data.noteId,
        user_email: data.userEmail,
      },
    });

    if (existingPendingShare) {
      // Update the existing pending share
      const updatedPendingShare = await prisma.pending_shares.update({
        where: {
          id: existingPendingShare.id,
        },
        data: {
          permission: data.permission,
        },
      });

      // Return a temporary SharedNote object
      return {
        id: updatedPendingShare.id,
        noteId: data.noteId,
        userId: `pending_${updatedPendingShare.id}`,
        userEmail: data.userEmail,
        permission: data.permission,
        createdAt: new Date().toISOString(), // Pending shares might not track creation date
      };
    }

    // Create a new pending share record
    const id = generateId();
    const pendingShare = await prisma.pending_shares.create({
      data: {
        id,
        note_id: data.noteId,
        user_email: data.userEmail,
        permission: data.permission,
      },
    });

    // Return a temporary SharedNote object
    return {
      id: pendingShare.id,
      noteId: data.noteId,
      userId: `pending_${id}`,
      userEmail: data.userEmail,
      permission: data.permission,
      createdAt: new Date().toISOString(), // Pending shares might not track creation date
    };
  }

  // Don't allow sharing with yourself
  if (user.id === ownerId) {
    throw new Error("You cannot share a note with yourself");
  }

  // Check if the note is already shared with this user
  const existingShare = await prisma.shares.findFirst({
    where: {
      note_id: data.noteId,
      user_id: user.id,
    },
  });

  if (existingShare) {
    // Update the existing share instead of creating a new one
    await prisma.shares.update({
      where: {
        id: existingShare.id,
      },
      data: {
        permission: data.permission,
      },
    });

    return {
      id: existingShare.id,
      noteId: data.noteId,
      userId: user.id,
      userEmail: data.userEmail,
      permission: data.permission,
      createdAt:
        existingShare.created_at?.toISOString() || new Date().toISOString(),
    };
  }

  // Create a new shared note record
  const id = generateId();

  const share = await prisma.shares.create({
    data: {
      id,
      note_id: data.noteId,
      user_id: user.id,
      permission: data.permission,
    },
  });

  return {
    id: share.id,
    noteId: share.note_id,
    userId: share.user_id,
    userEmail: data.userEmail,
    permission: data.permission,
    createdAt: share.created_at?.toISOString() || new Date().toISOString(),
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
  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: ownerId,
    },
  });

  if (!note) {
    throw new Error(
      "Note not found or you don't have permission to revoke access"
    );
  }

  try {
    // Check if this is a pending share (ID starts with "pending_")
    if (sharedNoteId.startsWith("pending_")) {
      const realId = sharedNoteId.replace("pending_", "");
      await prisma.pending_shares.delete({
        where: {
          id: realId,
        },
      });
    } else {
      // Delete the shared note record
      await prisma.shares.delete({
        where: {
          id: sharedNoteId,
        },
      });
    }
    return true;
  } catch (error) {
    console.error("Error revoking share:", error);
    return false;
  }
}

/**
 * Update the permission level for a shared note
 */
export async function updateSharePermission(
  ownerId: string,
  noteId: string,
  shareId: string,
  permission: "read" | "write"
): Promise<boolean> {
  // First verify that the current user owns the note
  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      user_id: ownerId,
    },
  });

  if (!note) {
    throw new Error(
      "Note not found or you don't have permission to update sharing settings"
    );
  }

  try {
    // Check if this is a pending share
    if (shareId.startsWith("pending_")) {
      const realId = shareId.replace("pending_", "");
      await prisma.pending_shares.update({
        where: {
          id: realId,
        },
        data: {
          permission,
        },
      });
    } else {
      // Update the share permission
      await prisma.shares.update({
        where: {
          id: shareId,
        },
        data: {
          permission,
        },
      });
    }
    return true;
  } catch (error) {
    console.error("Error updating share permission:", error);
    return false;
  }
}

/**
 * Claim any pending shared notes for a newly registered user
 * This moves records from pending_shares to the shares table
 */
export async function claimPendingShares(
  userId: string,
  userEmail: string
): Promise<number> {
  try {
    // Find any pending shares for this email
    const pendingShares = await prisma.pending_shares.findMany({
      where: {
        user_email: userEmail,
      },
    });

    if (pendingShares.length === 0) {
      return 0; // No pending shares to claim
    }

    let processedCount = 0;

    // Use a transaction for consistent processing
    await prisma.$transaction(async (prisma) => {
      // For each pending share, create a real share
      for (const pendingShare of pendingShares) {
        // Check if a share already exists
        const existingShare = await prisma.shares.findFirst({
          where: {
            note_id: pendingShare.note_id,
            user_id: userId,
          },
        });

        if (!existingShare) {
          // Create a new share record
          const id = generateId();

          await prisma.shares.create({
            data: {
              id,
              note_id: pendingShare.note_id,
              user_id: userId,
              permission: pendingShare.permission,
            },
          });

          processedCount++;
        }

        // Delete the pending share
        await prisma.pending_shares.delete({
          where: {
            id: pendingShare.id,
          },
        });
      }
    });

    return processedCount;
  } catch (error) {
    console.error("Error claiming pending shares:", error);
    throw error;
  }
}
