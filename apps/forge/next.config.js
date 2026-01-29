/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@tributaries/ui',
    '@tributaries/auth',
    '@tributaries/billing',
    '@tributaries/ai',
    '@tributaries/ocr',
    '@tributaries/database',
    '@tributaries/workflow',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

module.exports = nextConfig;
