import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";

  // Основные страницы
  const routes = [
    "",
    "/services/legal",
    "/services/tech",
    "/price",
    "/about",
    "/contacts",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Страницы услуг (если будут динамические)
  const serviceRoutes = [
    "/services/legal/corporate-law",
    "/services/legal/arbitration",
    "/services/legal/contracts",
    "/services/tech/web-development",
    "/services/tech/crm-systems",
    "/services/tech/chatbots",
    "/services/tech/mobile-apps",
    "/services/tech/integration",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
