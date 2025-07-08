import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**", // Match all paths
      },
    ],
    dangerouslyAllowSVG: true, // Only enable if you're using SVG avatars
  },
};

export default nextConfig;
