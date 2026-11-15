import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zbdaozlcoqmcxbpkcrwo.supabase.co",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    loadPaths: ["./src"],
    additionalData: '@use "@/styles/main.scss" as *;',
  },
};

export default nextConfig;
