import { getAuthUser } from "@/lib/auth";
import {
  createTag,
  deleteTag,
  getNotesByTag,
  getTagById,
  getTags,
  updateTag,
} from "@/lib/tags";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const tagId = url.searchParams.get("id");
    const tagName = url.searchParams.get("name");
    const includeNoteCounts = url.searchParams.get("noteCounts") === "true";
    const getNotes = url.searchParams.get("notes") === "true";

    // If tagId is provided, get a specific tag
    if (tagId) {
      const tag = await getTagById(user.id, tagId);
      if (!tag) {
        return NextResponse.json({ error: "Tag not found" }, { status: 404 });
      }
      return NextResponse.json(tag);
    }

    // If tag name and getNotes flag are provided, get notes with this tag
    if (tagName && getNotes) {
      const notes = await getNotesByTag(user.id, tagName);
      return NextResponse.json(notes);
    }

    // Otherwise, get all tags for the user
    const tags = await getTags(user.id, includeNoteCounts);
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
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

    // Get tag data from request body
    const tagData = await request.json();

    // Validate required fields
    if (!tagData.name) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 }
      );
    }

    // If an id is provided, update the tag, otherwise create a new one
    let tag;
    if (tagData.id) {
      tag = await updateTag(user.id, {
        id: tagData.id,
        name: tagData.name,
      });

      if (!tag) {
        return NextResponse.json(
          { error: "Tag not found or not owned by user" },
          { status: 404 }
        );
      }
    } else {
      // Create a new tag
      tag = await createTag(user.id, tagData.name);
    }

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error creating/updating tag:", error);
    return NextResponse.json(
      { error: "Failed to create/update tag" },
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
    // Get tag ID from query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 }
      );
    }

    // Delete tag from the database
    const success = await deleteTag(user.id, id);

    if (!success) {
      return NextResponse.json(
        { error: "Tag not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 }
    );
  }
}
