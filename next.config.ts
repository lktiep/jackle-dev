import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray lockfile in $HOME makes Turbopack guess the wrong workspace root.
  turbopack: { root: __dirname },
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
