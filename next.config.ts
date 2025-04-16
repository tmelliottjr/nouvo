import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
    nodeMiddleware: true,
  },
  // Explicitly set the middleware to use Node.js runtime
  // middleware: {
  //   // This ensures middleware doesn't run in Edge Runtime
  //   skipMiddlewareUrlNormalize: true,
  //   skipTrailingSlashRedirect: true,
  // },
};

export default nextConfig;
