import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
// Explicitly set runtime to nodejs to avoid Edge Runtime constraints
export const runtime = "nodejs";

// Export route handlers in the format recommended by Better Auth docs
export const { GET, POST } = toNextJsHandler(auth.handler);
