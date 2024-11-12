import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.tina.io',
        },
      ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* other config options here */
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      }
    ]
  }
};

export default nextConfig;
