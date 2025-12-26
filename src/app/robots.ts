import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sitemap.xml", "/robots.txt", "/manifest.webmanifest"],
        disallow: ["/api/", "/_next/", "/admin/", "/*.json$"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
        // crawlDelay не поддерживается в MetadataRoute.Robots
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
