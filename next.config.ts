import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone для Docker
  output: "standalone",

  // Убираем trailing slash для консистентности URL (без редиректов 301)
  trailingSlash: false,

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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru https://mc.yandex.com https://yandex.ru https://yastatic.net https://www.googletagmanager.com https://www.google-analytics.com https://partners.dasreda.ru https://ad.adriver.ru; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: blob: https: https://mc.yandex.ru https://mc.yandex.com https://www.google-analytics.com https://www.googletagmanager.com; " +
              "font-src 'self' data:; " +
              "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://yandex.ru https://mc.webvisor.org wss://mc.webvisor.org wss://mc.yandex.ru https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://partners.dasreda.ru https://ad.adriver.ru; " +
              "frame-src 'self'; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-ancestors 'self' https://metrika.yandex.ru https://metrika.yandex.by https://metrica.yandex.com https://metrica.yandex.com.tr https://webvisor.com https://*.webvisor.com; " +
              "upgrade-insecure-requests;",
          },
          // Защита от clickjacking - используем CSP frame-ancestors вместо X-Frame-Options
          // X-Frame-Options не поддерживает whitelist доменов, а нам нужен Яндекс Метрика
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
      // OG assets need cross-origin access for social media previews
      // These rules MUST come after /:path* to override same-origin policy
      {
        source: "/og-image.:ext(gif|png|jpg|jpeg|webp)",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/og-video.mp4",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
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

  // Rewrites для кастомных страниц
  // Позволяет /services/legal/liquidation показывать контент /liquidation
  // URL остаётся прежним (важно для рекламных кампаний)
  async rewrites() {
    return [
      // Short URLs for marketing
      {
        source: "/vestnik",
        destination: "/services/legal/vestnik",
      },
      // Legal custom pages
      {
        source: "/services/legal/corporate",
        destination: "/corporate",
      },
      {
        source: "/services/legal/liquidation",
        destination: "/liquidation",
      },
      {
        source: "/services/legal/fedresurs",
        destination: "/fedresurs",
      },
      {
        source: "/services/legal/edo",
        destination: "/edo",
      },
      {
        source: "/services/legal/ecp",
        destination: "/ecp",
      },
      // Tech custom pages
      {
        source: "/services/tech/ai-training",
        destination: "/ai-training",
      },
      {
        source: "/services/tech/max",
        destination: "/max",
      },
      {
        source: "/services/tech/web",
        destination: "/web",
      },
    ];
  },

  // Experimental features для производительности
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
