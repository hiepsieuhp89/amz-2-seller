/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Thêm cấu hình để không sử dụng symlinks
  experimental: {
    outputFileTracingRoot: process.cwd(),
    outputFileTracingExcludes: {
      '*': [
        'node_modules/**/*',
      ],
    },
  }
};

export default nextConfig;
