/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.inaperfectworld.shop',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configure file size limits for API routes in the server runtime
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['sharp'],
};

module.exports = nextConfig; 