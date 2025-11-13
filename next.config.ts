import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler:
    process.env.NODE_ENV !== "production"
      ? {}
      : {
          removeConsole: {
            exclude: ["error", "warn"],
          },
        },
  typedRoutes: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // Do the types checking in CI instead.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: "standalone",
  async rewrites() {
    return await [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ];
  },
};

export default nextConfig;
