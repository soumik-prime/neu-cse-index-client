import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache control for dynamic content
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      }, {
        protocol: "https",
        hostname: "https://neu-cse-index.s3.ap-southeast-1.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;