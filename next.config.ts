import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  sassOptions: {
    loadPaths: ["./src"],
  },
};

export default nextConfig;
