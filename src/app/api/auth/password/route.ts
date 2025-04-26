import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";

// API route to update user password
export async function POST(request: NextRequest) {
  try {
    // Get the current authenticated user
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get password data from the request
    const data = await request.json();
    const { currentPassword, newPassword } = data;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    try {
      // Use better-auth's changePassword function instead of manual database operations
      await auth.api.changePassword({
        headers: request.headers,
        body: {
          currentPassword,
          newPassword,
          revokeOtherSessions: true, // Optional: revoke other sessions when password is changed
        },
      });

      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating password:", error);

      // Handle specific error types if needed
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}

// Set runtime to nodejs explicitly
export const runtime = "nodejs";
