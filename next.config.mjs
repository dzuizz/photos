/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are local files under /public/photos — next/image optimises them on
  // demand from the single source via each frame's `sizes`. No remote hosts.
};

export default nextConfig;
