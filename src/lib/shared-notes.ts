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
  const shares = await prisma.share.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });

  return shares.map((share) => ({
    id: share.id,
    noteId: share.noteId,
    userId: share.userId,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.createdAt.toISOString(),
  }));
}

/**
 * Get all users with access to a specific note
 */
export async function getSharedNoteUsers(
  noteId: string
): Promise<SharedNote[]> {
  // Get existing shares with user data
  const shares = await prisma.share.findMany({
    where: {
      noteId,
    },
    include: {
      user: true,
    },
  });

  // Get pending shares
  const pendingShares = await prisma.pendingShare.findMany({
    where: {
      noteId,
    },
  });

  const shareResults = shares.map((share) => ({
    id: share.id,
    noteId: share.noteId,
    userId: share.userId,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.createdAt.toISOString(),
  }));

  const pendingResults = pendingShares.map((pending) => ({
    id: pending.id,
    noteId: pending.noteId,
    userId: `pending_${pending.id}`, // Create a placeholder userId
    userEmail: pending.userEmail,
    permission: pending.permission as "read" | "write",
    createdAt: pending.createdAt.toISOString(),
  }));

  return [...shareResults, ...pendingResults];
}

/**
 * Get all notes shared with a specific user
 */
export async function getNotesSharedWithUser(
  userId: string
): Promise<SharedNote[]> {
  const shares = await prisma.share.findMany({
    where: {
      userId,
    },
    include: {
      note: true,
      user: true,
    },
  });

  return shares.map((share) => ({
    id: share.id,
    noteId: share.noteId,
    userId: share.userId,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.createdAt.toISOString(),
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
  const ownedNote = await prisma.note.findFirst({
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

  // If user is the owner, return the note with owner access
  if (ownedNote) {
    const note = {
      id: ownedNote.id,
      name: ownedNote.title,
      content: ownedNote.content,
      userId: ownedNote.userId,
      parentId: ownedNote.folderId,
      createdAt: ownedNote.createdAt.toISOString(),
      updatedAt: ownedNote.updatedAt.toISOString(),
      isPublic: ownedNote.isPublic || false,
      tags: ownedNote.tags.map((noteTag) => noteTag.tag.name),
    };

    return {
      note,
      access: null,
      isOwner: true,
    };
  }

  // If not the owner, check if note is shared with user
  const share = await prisma.share.findFirst({
    where: {
      noteId,
      userId,
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
  const sharedNote = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      tags: {
        include: {
          tag: true,
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
    name: sharedNote.title,
    content: sharedNote.content,
    userId: sharedNote.userId,
    parentId: sharedNote.folderId,
    createdAt: sharedNote.createdAt.toISOString(),
    updatedAt: sharedNote.updatedAt.toISOString(),
    isPublic: sharedNote.isPublic || false,
    tags: sharedNote.tags.map((noteTag) => noteTag.tag.name),
  };

  // Format the share access information
  const access = {
    id: share.id,
    noteId: share.noteId,
    userId: share.userId,
    userEmail: share.user.email,
    permission: share.permission as "read" | "write",
    createdAt: share.createdAt.toISOString(),
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
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
      isPublic: true,
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
 * Share a note with another user
 */
export async function shareNote(
  ownerId: string,
  data: { noteId: string; userEmail: string; permission: "read" | "write" }
): Promise<SharedNote> {
  // First verify that the current user owns the note
  const note = await prisma.note.findFirst({
    where: {
      id: data.noteId,
      userId: ownerId,
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
    const existingPendingShare = await prisma.pendingShare.findFirst({
      where: {
        noteId: data.noteId,
        userEmail: data.userEmail,
      },
    });

    if (existingPendingShare) {
      // Update the existing pending share
      const updatedPendingShare = await prisma.pendingShare.update({
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
        createdAt: updatedPendingShare.createdAt.toISOString(),
      };
    }

    // Create a new pending share record
    const id = generateId();
    const pendingShare = await prisma.pendingShare.create({
      data: {
        id,
        noteId: data.noteId,
        userEmail: data.userEmail,
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
      createdAt: pendingShare.createdAt.toISOString(),
    };
  }

  // Don't allow sharing with yourself
  if (user.id === ownerId) {
    throw new Error("You cannot share a note with yourself");
  }

  // Check if the note is already shared with this user
  const existingShare = await prisma.share.findFirst({
    where: {
      noteId: data.noteId,
      userId: user.id,
    },
  });

  if (existingShare) {
    // Update the existing share instead of creating a new one
    await prisma.share.update({
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
      createdAt: existingShare.createdAt.toISOString(),
    };
  }

  // Create a new shared note record
  const id = generateId();
  const shareId = generateId(); // For the unique share ID

  const share = await prisma.share.create({
    data: {
      id,
      noteId: data.noteId,
      userId: user.id,
      shareId,
      permission: data.permission,
    },
  });

  return {
    id: share.id,
    noteId: share.noteId,
    userId: share.userId,
    userEmail: data.userEmail,
    permission: data.permission,
    createdAt: share.createdAt.toISOString(),
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
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: ownerId,
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
      await prisma.pendingShare.delete({
        where: {
          id: realId,
        },
      });
    } else {
      // Delete the shared note record
      await prisma.share.delete({
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
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: ownerId,
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
      await prisma.pendingShare.update({
        where: {
          id: realId,
        },
        data: {
          permission,
        },
      });
    } else {
      // Update the share permission
      await prisma.share.update({
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
    const pendingShares = await prisma.pendingShare.findMany({
      where: {
        userEmail,
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
        const existingShare = await prisma.share.findFirst({
          where: {
            noteId: pendingShare.noteId,
            userId,
          },
        });

        if (!existingShare) {
          // Create a new share record
          const id = generateId();
          const shareId = generateId();

          await prisma.share.create({
            data: {
              id,
              noteId: pendingShare.noteId,
              userId,
              shareId,
              permission: pendingShare.permission,
            },
          });

          processedCount++;
        }

        // Delete the pending share
        await prisma.pendingShare.delete({
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
