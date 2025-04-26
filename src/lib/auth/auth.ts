import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { claimPendingShares } from "../shared-notes";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";

// Explicitly mark this file as requiring Node.js runtime
export const runtime = "nodejs";

export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          // claim pending shares
          await claimPendingShares(newSession.user.id, newSession.user.email);
        }
      }
    }),
  },
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    // Auto sign in users after they sign up
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
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
  },
  // Database configuration using mysql2 pool
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  // Add the nextCookies plugin for proper handling of cookies in Next.js server actions
  plugins: [nextCookies()],
});

export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getAuthUser() {
  const session = await getAuthSession();
  if (!session) {
    return null;
  }
  return session.user;
}
