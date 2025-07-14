import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ddl0zi5h2jlue.cloudfront.net",
        pathname: "/**", 
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
