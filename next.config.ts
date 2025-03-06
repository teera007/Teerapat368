import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://server-uzyq.onrender.com",
        port: "",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
