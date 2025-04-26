import { createAuthClient } from "better-auth/react";

// Create and export the auth client
export const authClient = createAuthClient({
  // Dynamically determine the base URL for the auth API
  baseURL: getBaseUrl() + "/api/auth",

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

// Helper function to get the base URL of the application
function getBaseUrl() {
  // In the browser, use the current window location
  if (typeof window !== "undefined") {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }

  // In server-side context, use environment variable or default
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
