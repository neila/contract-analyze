/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: false,
    esmExternals: true,
    externalDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
