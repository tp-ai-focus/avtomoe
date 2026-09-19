import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/avtomoe" : "",
  assetPrefix: isProd ? "/avtomoe" : "",
  images: {
    loader: "custom",
    loaderFile: "./src/imageLoader.js",
  },
  trailingSlash: true,
};

export default nextConfig;
