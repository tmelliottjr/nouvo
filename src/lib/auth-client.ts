import { createAuthClient } from "better-auth/react";

// Create and export the auth client
export const authClient = createAuthClient({
  // The base URL for the auth API - ensure this points to the correct endpoint
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/auth",

  // Add debug mode for development to get more detailed errors
  debug: process.env.NODE_ENV === "development",

  // Enable enhanced error logging to better diagnose authentication issues
  onError: (error) => {
    console.error("Auth client error:", {
      message: error?.message,
      status: error?.status,
      data: error?.data,
    });
  },
});
