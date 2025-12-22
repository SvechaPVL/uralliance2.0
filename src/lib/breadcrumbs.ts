/**
 * Breadcrumb configuration for automatic generation
 *
 * Maps URL paths to breadcrumb labels and parent categories
 */

export interface BreadcrumbConfig {
  label: string;
  parent?: {
    label: string;
    href: string;
  };
}

/**
 * Map of path -> breadcrumb config
 * For custom pages that don't follow the dynamic [category]/[slug] pattern
 */
export const BREADCRUMB_MAP: Record<string, BreadcrumbConfig> = {
  // Legal services
  "/liquidation": {
    label: "Ликвидация организаций",
    parent: { label: "Юридические услуги", href: "/services/legal" },
  },
  "/fedresurs": {
    label: "Федресурс",
    parent: { label: "Юридические услуги", href: "/services/legal" },
  },
  "/edo": {
    label: "Электронный документооборот",
    parent: { label: "Юридические услуги", href: "/services/legal" },
  },
  "/ecp": {
    label: "ЭЦП и Рутокены",
    parent: { label: "Юридические услуги", href: "/services/legal" },
  },

  // Tech services
  "/max": {
    label: "MAX — AI-ассистент",
    parent: { label: "IT-решения", href: "/services/tech" },
  },
  "/web": {
    label: "Разработка сайтов",
    parent: { label: "IT-решения", href: "/services/tech" },
  },

  // Category pages
  "/services/legal": {
    label: "Юридические услуги",
  },
  "/services/tech": {
    label: "IT-решения",
  },

  // Other pages
  "/price": {
    label: "Цены",
  },
  "/privacy": {
    label: "Политика конфиденциальности",
  },
  "/terms": {
    label: "Условия использования",
  },
};

/**
 * Get breadcrumb items for a given path
 */
export function getBreadcrumbItems(pathname: string): { label: string; href?: string }[] {
  const config = BREADCRUMB_MAP[pathname];

  if (!config) {
    return [];
  }

  const items: { label: string; href?: string }[] = [];

  if (config.parent) {
    items.push({ label: config.parent.label, href: config.parent.href });
  }

  items.push({ label: config.label });

  return items;
}
