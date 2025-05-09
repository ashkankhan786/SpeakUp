import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "striped-cheetah-14.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
