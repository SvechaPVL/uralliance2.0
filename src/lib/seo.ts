import type { PriceItem } from "@/types/content";
import {
  contacts,
  getSchemaAddress,
  getSchemaContactPoint,
  getSchemaGeo,
  getSchemaOpeningHours,
  getSchemaSameAs,
} from "./contacts";

const DEFAULT_SITE_URL = contacts.website.url;
const ORGANIZATION_NAME = contacts.company.name;
const LOGO_URL = `${DEFAULT_SITE_URL}/images/logo.svg`;

/**
 * OG image version for cache busting
 * Увеличивай при изменении og-image.png чтобы сбросить кэш соцсетей
 */
const OG_IMAGE_VERSION = "v3";

/**
 * Default OG image configuration for all pages
 * ВАЖНО: Добавляй это в openGraph каждой страницы,
 * иначе Next.js НЕ унаследует images из layout.tsx
 */
export const defaultOgImage = {
  url: `/og-image.png?${OG_IMAGE_VERSION}`,
  width: 1200,
  height: 630,
  alt: "Uralliance - Юридические услуги и IT-решения",
  type: "image/png" as const,
};

/**
 * Generate Schema.org Organization markup
 */
export function generateOrganizationSchema(options?: { sameAs?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: DEFAULT_SITE_URL,
    logo: LOGO_URL,
    description: contacts.company.description.full,
    email: contacts.email.display,
    telephone: contacts.phone.main.raw,
    sameAs: options?.sameAs ?? getSchemaSameAs(),
    contactPoint: [getSchemaContactPoint()],
  };
}

/**
 * Generate Schema.org LocalBusiness markup for contacts page
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: ORGANIZATION_NAME,
    image: LOGO_URL,
    url: DEFAULT_SITE_URL,
    telephone: contacts.phone.main.raw,
    email: contacts.email.display,
    address: getSchemaAddress(),
    geo: getSchemaGeo(),
    openingHoursSpecification: [getSchemaOpeningHours()],
    sameAs: getSchemaSameAs(),
  };
}

/**
 * OfferCatalog schema for price list
 */
export function generateOfferCatalogSchema(items: PriceItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Uralliance Legal + Tech Price List",
    url: `${DEFAULT_SITE_URL}/price`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.description,
        category: item.category,
        provider: {
          "@type": "Organization",
          name: ORGANIZATION_NAME,
          url: DEFAULT_SITE_URL,
        },
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: item.price,
        priceCurrency: "RUB",
        unitText: item.unit,
        ...(item.priceFrom && { priceType: "StartingFrom" }),
      },
      availability: "https://schema.org/InStock",
    })),
  };
}
