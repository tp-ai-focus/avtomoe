import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.IS_GH_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/avtomoe" : "",
  assetPrefix: isGitHubPages ? "/avtomoe" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
