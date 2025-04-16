import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// Define protected and public routes
const protectedPaths = ["/notes", "/shared", "/settings"];
const protectedApiPaths = [
  "/api/notes",
  "/api/folders",
  "/api/shared-notes",
  "/api/tags",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if this is a protected path (regular routes or API routes)
  const isProtectedPath = protectedPaths.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );

  const isProtectedApiPath = protectedApiPaths.some((prefix) =>
    path.startsWith(prefix)
  );

  // If the path is not protected, allow the request to proceed
  if (!isProtectedPath && !isProtectedApiPath) {
    return NextResponse.next();
  }

  try {
    // Get the session from the request using Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // If there's a valid session, allow the request to proceed
    if (session?.user) {
      return NextResponse.next();
    }

    // If there's no valid session and it's an API route, return 401 Unauthorized
    if (isProtectedApiPath) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If there's no valid session and it's a protected route, redirect to home
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  } catch (error) {
    console.error("Middleware authentication error:", error);

    // If there's an error and it's an API route, return 401 Unauthorized
    if (isProtectedApiPath) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If there's an error and it's a protected route, redirect to home
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }
}

// Configure which paths the middleware should run on
export const config = {
  runtime: "nodejs",
  matcher: [
    // Regular routes that need protection
    "/notes/:path*",
    "/shared/:path*",
    "/settings/:path*",
    // API routes that need protection
    "/api/notes/:path*",
    "/api/folders/:path*",
    "/api/shared-notes/:path*",
    "/api/tags/:path*",
  ],
};
