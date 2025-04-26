import { auth } from "@/lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// API route to update user profile information
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

    // Get the updated profile data from the request
    const data = await request.json();
    const { name } = data;

    // Update the user with Better Auth's API
    await auth.api.updateUser({
      query: { id: session.user.id },
      body: { name },
    });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

// API route to get user profile information
export async function GET(request: NextRequest) {
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

    const accounts = await prisma.account.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        providerId: true,
      },
    });

    const user = {
      ...session.user,
      accounts: accounts || [],
    };

    console.log("User profile:", user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// Set runtime to nodejs explicitly
export const runtime = "nodejs";
