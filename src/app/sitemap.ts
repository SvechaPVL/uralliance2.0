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
    "/ecp",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Страницы услуг
  const serviceRoutes = [
    // Юридические услуги
    "/services/legal/corporate",
    "/services/legal/arbitrazh",
    "/services/legal/contracts",
    "/ecp",
    "/services/legal/vestnik",
    "/services/legal/fedresurs",
    "/services/legal/compliance",
    "/services/legal/ip",
    "/services/legal/real-estate",
    "/services/legal/liquidation",
    "/services/legal/reorganization",
    "/services/legal/accounting",
    // IT услуги
    "/services/tech/web",
    "/services/tech/crm",
    "/services/tech/bots",
    "/services/tech/mobile",
    "/services/tech/taxcom-edo",
    "/services/tech/ai",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
