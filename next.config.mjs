/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/series/:slug", destination: "/#works", permanent: true },
    ];
  },
  // Static imports from pictures/ preserve dimensions and generate blur previews.
  // Serve responsive image variants through the Next.js optimizer.
  images: {
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
