/**
 * URL utilities for handling different deployment environments
 */

/**
 * Gets the base URL of the application based on the current environment
 * Works in both client and server contexts
 */
export function getBaseUrl(): string {
  // In browser, use the current window location
  if (typeof window !== "undefined") {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }

  // In server-side context, use environment variable or default
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

/**
 * Creates an absolute URL from a relative path
 */
export function createUrl(path: string): string {
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}

/**
 * Creates an API URL for the application
 */
export function createApiUrl(endpoint: string): string {
  // Make sure endpoint doesn't start with a slash since we'll add it
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;
  return createUrl(`/api/${normalizedEndpoint}`);
}
