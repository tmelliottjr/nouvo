import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createPool } from "mysql2/promise";

// Create a MySQL connection pool
const pool = createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER || "noevo",
  password: process.env.MYSQL_PASSWORD || "noevopassword",
  database: process.env.MYSQL_DATABASE || "noevo",
});

// Explicitly mark this file as requiring Node.js runtime
export const runtime = "nodejs";

export const auth = betterAuth({
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    // Auto sign in users after they sign up
    autoSignIn: true,
  },
  // Configure session management
  session: {
    // Session expiration time (7 days in seconds by default)
    expiresIn: 7 * 24 * 60 * 60,
    // Update session expiration every day
    updateAge: 24 * 60 * 60,
    // Enable cookie caching for better performance
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
    // Set cookie options to ensure compatibility
    cookie: {
      name: "auth_session",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    },
  },
  // Database configuration using mysql2 pool
  database: pool,
  // Email verification (in a real app you would configure SMTP)
  email: {
    // In development, we'll log emails to console
    provider: "console",
  },
  // Add the nextCookies plugin for proper handling of cookies in Next.js server actions
  plugins: [nextCookies()],
});
