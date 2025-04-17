import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
    nodeMiddleware: true,
  },

  // Enable multi-hostname support for both localhost and Tailscale URL
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // In production, you may want to restrict this
          },
        ],
      },
    ];
  },

  // Support multiple hostnames/domains
  images: {
    domains: ["localhost", "toms.quail-mimosa.ts.net"],
  },
};

export default nextConfig;
