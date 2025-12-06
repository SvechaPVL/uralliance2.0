import type { PriceItem } from "@/types/content";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uralliance.ru";
const ORGANIZATION_NAME = "Uralliance";
const LOGO_URL = `${DEFAULT_SITE_URL}/images/logo.svg`;

const ORGANIZATION_CONTACT = {
  phone: "+74232028878",
  email: "info@uralliance.ru",
  address: {
    streetAddress: "ул. Суханова, 11",
    addressLocality: "Владивосток",
    addressRegion: "Приморский край",
    postalCode: "690091",
    addressCountry: "RU",
  },
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
    description:
      "Uralliance — юридические услуги и IT-решения для бизнеса во Владивостоке. Сопровождаем сложные юридические кейсы и внедряем цифровые продукты.",
    email: ORGANIZATION_CONTACT.email,
    telephone: ORGANIZATION_CONTACT.phone,
    sameAs: options?.sameAs ?? [
      "https://t.me/uralliance",
      "https://www.linkedin.com/company/uralliance",
      "https://vk.com/uralliance",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORGANIZATION_CONTACT.phone,
        email: ORGANIZATION_CONTACT.email,
        contactType: "customer support",
        areaServed: "RU",
        availableLanguage: ["Russian"],
      },
    ],
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
    telephone: ORGANIZATION_CONTACT.phone,
    email: ORGANIZATION_CONTACT.email,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION_CONTACT.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.117098,
      longitude: 131.896262,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: ["https://t.me/uralliance", "https://wa.me/79000000000", "https://vk.com/uralliance"],
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
