import { MetadataRoute } from "next";
import { getAllBlogPosts, getAllServiceSlugs } from "@/lib/content";

// Кастомные URL для услуг с выделенными страницами
const CUSTOM_URL_MAP: Record<string, string> = {
  corporate: "/corporate",
  ecp: "/ecp",
  edo: "/edo",
  fedresurs: "/fedresurs",
  liquidation: "/liquidation",
  max: "/max",
  web: "/web",
  vestnik: "/services/legal/vestnik",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru";

  // Статические страницы
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services/legal", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/tech", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/price", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contacts", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Динамические страницы блога
  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Динамические страницы услуг
  const services = await getAllServiceSlugs();
  const serviceRoutes = services.map((service) => {
    const customUrl = CUSTOM_URL_MAP[service.slug];
    const url = customUrl || `/services/${service.category}/${service.slug}`;

    return {
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: customUrl ? 0.8 : 0.7, // Кастомные страницы имеют выше приоритет
    };
  });

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
