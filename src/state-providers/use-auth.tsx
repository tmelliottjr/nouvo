"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Types for note sharing
export interface NoteShare {
  id: string;
  noteId: string;
  userId: string;
  userEmail: string;
  userDisplayName?: string;
  userPhotoUrl?: string;
  permission: "read" | "write";
  createdAt: string;
}

// User type (using better-auth's session user type)
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

// Authentication context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>; // Add fetchSession method
  shareNote: (
    noteId: string,
    userEmail: string,
    permission: "read" | "write"
  ) => Promise<boolean>;
  revokeAccess: (noteId: string, userId: string) => Promise<boolean>;
  getSharedNoteAccess: (noteId: string) => Promise<NoteShare[]>;
  getNoteAccessByUser: (userId: string) => Promise<NoteShare[]>;
  updateSharePermission: (
    noteId: string,
    sharedNoteId: string,
    permission: "read" | "write"
  ) => Promise<boolean>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  fetchSession: async () => {}, // Add fetchSession default
  shareNote: async () => false,
  revokeAccess: async () => false,
  getSharedNoteAccess: async () => [],
  getNoteAccessByUser: async () => [],
  updateSharePermission: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch session when component mounts
    fetchSession();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to fetch session when component mounts or auth state changes
  const fetchSession = useCallback(async () => {
    try {
      const { data: session } = await authClient.getSession();

      if (session?.user) {
        setUser(session.user as User);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const { error } = await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
        });

        if (error) {
          console.error("Login error:", error);
          return false;
        }

        await fetchSession();
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
    [fetchSession]
  );

  // Signup function
  const signup = useCallback(
    async (
      email: string,
      password: string,
      name?: string
    ): Promise<boolean> => {
      try {
        console.log("Starting signup process with email:", email);

        // Check that API URL is properly configured
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/auth";
        console.log("Using API base URL:", apiBaseUrl);

        // Use Better Auth's signup functionality
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name: name || "", // Provide empty string as fallback for type safety
        });

        if (error) {
          console.error("Signup error:", error);
          // Log detailed error information
          console.error("Signup error details:", {
            message: error.message,
            code: error.code,
            status: error.status,
          });
          return false;
        }

        // Log success data to help with debugging
        console.log(
          "Signup successful:",
          data ? "User data received" : "No user data"
        );

        // Fetch the session to ensure the user is logged in
        await fetchSession();

        return Boolean(data);
      } catch (error) {
        // Enhanced error logging to capture network or unexpected errors
        console.error("Signup exception:", {
          message: error instanceof Error ? error.message : String(error),
          name: error instanceof Error ? error.name : "Unknown",
          stack: error instanceof Error ? error.stack : undefined,
        });
        return false;
      }
    },
    [fetchSession]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [router]);

  // Share note functionality
  const shareNote = useCallback(
    async (
      noteId: string,
      userEmail: string,
      permission: "read" | "write"
    ): Promise<boolean> => {
      try {
        // Call the API to share the note
        const response = await fetch("/api/shared-notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteId,
            userEmail,
            permission,
          }),
        });

        if (!response.ok) {
          console.error("Error sharing note:", response.statusText);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error sharing note:", error);
        return false;
      }
    },
    []
  );

  // Revoke access function
  const revokeAccess = useCallback(
    async (noteId: string, shareId: string): Promise<boolean> => {
      try {
        // Call the API to revoke access
        const response = await fetch(`/api/shared-notes/${shareId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          console.error("Error revoking access:", response.statusText);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error revoking access:", error);
        return false;
      }
    },
    []
  );

  // Get shared note access by note ID
  const getSharedNoteAccess = useCallback(
    async (noteId: string): Promise<NoteShare[]> => {
      try {
        // Call the API to get shared note access
        const response = await fetch(`/api/shared-notes?noteId=${noteId}`);

        if (!response.ok) {
          console.error(
            "Error fetching shared note access:",
            response.statusText
          );
          return [];
        }

        const data = await response.json();
        console.log("Fetched shared note access:", data);
        return data;
      } catch (error) {
        console.error("Error fetching shared note access:", error);
        return [];
      }
    },
    []
  );

  // Get note access by user ID
  const getNoteAccessByUser = useCallback(
    async (userId: string): Promise<NoteShare[]> => {
      try {
        // Call the API to get user's note access
        const response = await fetch(`/api/shared-notes?userId=${userId}`);

        if (!response.ok) {
          console.error(
            "Error fetching user's note access:",
            response.statusText
          );
          return [];
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching user's note access:", error);
        return [];
      }
    },
    []
  );

  // Update share permission function
  const updateSharePermission = useCallback(
    async (
      noteId: string,
      sharedNoteId: string,
      permission: "read" | "write"
    ): Promise<boolean> => {
      try {
        // Call the API to update share permission
        const response = await fetch(`/api/shared-notes/${sharedNoteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteId,
            permission,
          }),
        });

        if (!response.ok) {
          console.error(
            "Error updating share permission:",
            response.statusText
          );
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error updating share permission:", error);
        return false;
      }
    },
    []
  );

  // Compute authentication status
  const isAuthenticated = Boolean(user);

  // Provide auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        fetchSession,
        shareNote,
        revokeAccess,
        getSharedNoteAccess,
        getNoteAccessByUser,
        updateSharePermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
