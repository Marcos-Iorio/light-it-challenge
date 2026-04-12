import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cloudflare-ipfs.com/ipfs/**"),
      new URL("https://cdn.shopify.com/s/files/1/**"),
      new URL("https://upload.wikimedia.org/**"),
      new URL("http://res.cloudinary.com/duaace1ft/image/upload/**"),
      new URL("https://63bedcf7f5cfc0949b634fc8.mockapi.io/**"),
      new URL("https://images.unsplash.com/**"),
    ],
  },
};

export default nextConfig;
