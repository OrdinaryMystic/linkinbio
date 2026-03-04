import type { NextConfig } from "next";

/** For GitHub Pages project site (e.g. repo "my-site" → username.github.io/my-site/), set in env:
 *  NEXT_PUBLIC_BASE_PATH=/my-site
 * Leave unset for user/org site (repo username.github.io → username.github.io).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
  // redirects don't work with output: 'export'; /resources redirect is handled by a static page
};

export default nextConfig;
