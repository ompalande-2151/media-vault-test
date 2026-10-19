/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/about/contact",
        permanent: true,
      },
      {
        source: "/partner-with-us",
        destination: "/partner",
        permanent: true,
      },
      {
        source: "/growth",
        destination: "/category/msme-growth",
        permanent: true,
      },
      {
        source: "/enterprise",
        destination: "/category/enterprise",
        permanent: true,
      },
      {
        source: "/leadership",
        destination: "/category/leadership",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/category/industries",
        permanent: true,
      },
      {
        source: "/msme-growth",
        destination: "/category/msme-growth",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/category/insights",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
