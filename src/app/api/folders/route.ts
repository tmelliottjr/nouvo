import { getAuthUser } from "@/lib/auth";
import {
  createFolder,
  deleteFolder,
  getFolderById,
  getFolderHierarchy,
  getFolders,
  updateFolder,
} from "@/lib/folders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const folderId = url.searchParams.get("id");
    const includeHierarchy = url.searchParams.get("hierarchy") === "true";
    const includeNoteCounts = url.searchParams.get("noteCounts") === "true";

    // If folderId is provided, get a specific folder
    if (folderId) {
      const folder = await getFolderById(user.id, folderId);
      if (!folder) {
        return NextResponse.json(
          { error: "Folder not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(folder);
    }

    // If hierarchy is requested, return folder hierarchy
    if (includeHierarchy) {
      const folderHierarchy = await getFolderHierarchy(user.id);
      return NextResponse.json(folderHierarchy);
    }

    // Otherwise, get all folders for the user
    const folders = await getFolders(user.id, includeNoteCounts);
    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get folder data from request body
    const folderData = await request.json();

    // Validate required fields
    if (!folderData.name) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    // Create a new folder in the database
    const folder = await createFolder(user.id, {
      name: folderData.name,
      parentId: folderData.parentId,
    });

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the session from the request (middleware has handled auth)
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get folder update data from request body
    const folderData = await request.json();

    // Validate required fields
    if (!folderData.id) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    // Update folder in the database
    const updatedFolder = await updateFolder(user.id, {
      id: folderData.id,
      name: folderData.name,
      parentId: folderData.parentId,
    });

    if (!updatedFolder) {
      return NextResponse.json(
        { error: "Folder not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedFolder);
  } catch (error) {
    console.error("Error updating folder:", error);
    return NextResponse.json(
      { error: "Failed to update folder" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get folder ID and recursive flag from query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const recursive = url.searchParams.get("recursive") === "true";

    if (!id) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    // Delete folder from the database
    const success = await deleteFolder(user.id, id, recursive);

    if (!success) {
      return NextResponse.json(
        { error: "Folder not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting folder:", error);
    return NextResponse.json(
      { error: "Failed to delete folder" },
      { status: 500 }
    );
  }
}
