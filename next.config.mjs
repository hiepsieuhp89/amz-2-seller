/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /flag-icons.*\.css$/,
      type: "asset/resource",
    });
    return config;
  },
  experimental: {
    // outputFileTracingRoot: process.cwd(),
    // outputFileTracingExcludes: {
    //   '*': [
    //     'node_modules/**/*',
    //   ],
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'axm-vn.shop',
      },
      {
        protocol: 'https',
        hostname: 'img6.yeshen.cc',
      },
      {
        protocol: 'https',
        hostname: 'img.yeshen.cc',
      },
      {
        protocol: 'https',
        hostname: 'shop.shop-worldwide-amz.top',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    const domain = process.env.NEXT_PUBLIC_API_URL || "amz.dunghaysai.site";
    
    return [
      // QUAN TRỌNG: Thứ tự của rewrites rất quan trọng!
      // Các rule cụ thể hơn phải đặt trước các rule tổng quát hơn
      
      // 1. Đối với endpoint api-test và api-local, không rewrite
      {
        source: '/api-test',
        destination: '/api-test',
      },
      {
        source: '/api-test/:path*',
        destination: '/api-test/:path*',
      },
      {
        source: '/api-local/:path*',
        destination: '/api-local/:path*',
      },
      
      // 2. Tất cả các API routes khác điều hướng đến API server bên ngoài
      {
        source: "/api/:path*",
        destination: `https://${domain}/:path*`,
      }
    ];
  },
  async headers() {
    return [
      {
        // Áp dụng các headers CORS cho tất cả các routes, bao gồm API
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Trong production, nên thay thế bằng domain cụ thể
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
