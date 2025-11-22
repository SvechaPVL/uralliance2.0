import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация производительности
  compiler: {
    // Удаляем console.log в продакшене
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Защита от XSS атак
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: blob: https:; " +
              "font-src 'self' data:; " +
              "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://sockjs-us3.pusher.com; " +
              "frame-src 'self' https://vercel.live; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'none'; " +
              "upgrade-insecure-requests;",
          },
          // Защита от clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Изоляция origin
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // Отключаем определение типа контента браузером
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Разрешаем индексацию поисковиками
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Webpack оптимизации
  webpack: (config, { isServer }) => {
    // Оптимизация bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk для библиотек
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
            },
            // Общий chunk для переиспользуемого кода
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Experimental features для производительности
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Turbopack config (пустой для совместимости с webpack)
  turbopack: {},
};

export default nextConfig;
