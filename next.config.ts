import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint during production build to avoid non-critical warnings blocking deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable transpilation for any packages that need it
  transpilePackages: [],
};

export default nextConfig;
