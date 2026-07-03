/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are local files under /public/photos — next/image optimises them on
  // demand from the single source via each frame's `sizes`. No remote hosts.
  // Masters are capped at 2560px; 1920 is the largest variant we ever need, so
  // dropping the default 3840 ceiling makes every cold optimise cheaper.
  images: {
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
