import { getAuthUser } from "@/lib/auth";
import { updateSharePermission } from "@/lib/shared-notes";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    // Get the currently authenticated user
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the share ID from the route params
    const { shareId } = await params;

    // Parse the request body
    const body = await request.json();
    const { noteId, permission } = body;

    // Validate the request
    if (!noteId || !permission) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Ensure permission is either "read" or "write"
    if (permission !== "read" && permission !== "write") {
      return NextResponse.json(
        { error: "Invalid permission level" },
        { status: 400 }
      );
    }

    // Update the share permission
    const success = await updateSharePermission(
      user.id,
      noteId,
      shareId,
      permission
    );

    console.log("Share permission updated:", {
      userId: user.id,
      noteId,
      shareId,
      permission,
      success,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update permission or you don't have access" },
        { status: 403 }
      );
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating share permission:", error);
    return NextResponse.json(
      { error: "Failed to update share permission" },
      { status: 500 }
    );
  }
}
