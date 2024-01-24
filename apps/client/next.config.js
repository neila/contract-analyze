/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    esmExternals: true,
    externalDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
