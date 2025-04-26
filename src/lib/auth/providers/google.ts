import { prisma } from "@/lib/prisma";

// Get Google Access and Refresh Tokens from database

/**
 *
 * This function retrieves the Google access and refresh tokens for a given user ID from the database.
 * It queries the `account` table for the specified user ID and provider ID (Google).
 * If the account is found, it returns an array containing the access token and refresh token.
 * If not found, it returns undefined.
 *
 * @example
 * const tokens = await getGoogleTokens("user-id");
 * if (tokens) {
 *   const [accessToken, refreshToken] = tokens;
 *   console.log("Access Token:", accessToken);
 *   console.log("Refresh Token:", refreshToken);
 * } else {
 *   console.log("No tokens found for the user.");
 * }
 *
 * @param userId - The user ID to retrieve tokens for
 * @returns
 */
export async function getGoogleTokens(userId: string) {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      providerId: "google",
    },
  });

  if (!account) return [];

  return [account.accessToken, account.refreshToken];
}
