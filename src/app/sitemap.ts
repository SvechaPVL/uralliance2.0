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
    "/corporate",
    "/ecp",
    "/edo",
    "/fedresurs",
    "/liquidation",
    "/max",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Страницы услуг
  const serviceRoutes = [
    // Юридические услуги (corporate теперь в основных страницах)
    "/services/legal/arbitrazh",
    "/services/legal/contracts",
    "/services/legal/vestnik",
    "/services/legal/compliance",
    "/services/legal/ip",
    "/services/legal/real-estate",
    "/services/legal/reorganization",
    "/services/legal/accounting",
    "/services/legal/bankruptcy",
    // IT услуги
    "/services/tech/web",
    "/services/tech/crm",
    "/services/tech/bots",
    "/services/tech/mobile",
    "/services/tech/ai",
    "/services/tech/integration",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
