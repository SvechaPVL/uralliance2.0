import type { PriceItem } from "@/types/content";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uralliance.ru";
const ORGANIZATION_NAME = "Uralliance";
const LOGO_URL = `${DEFAULT_SITE_URL}/images/logo.svg`;

const ORGANIZATION_CONTACT = {
  phone: "+7 (343) 123-45-67",
  email: "info@uralliance.ru",
  address: {
    streetAddress: "ул. Малышева, 51",
    addressLocality: "Екатеринбург",
    addressRegion: "Свердловская область",
    postalCode: "620014",
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
    description: "Uralliance — Legal + Tech команда из Екатеринбурга. Сопровождаем сложные юридические кейсы и внедряем цифровые продукты.",
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
      latitude: 56.838011,
      longitude: 60.597474,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://t.me/uralliance",
      "https://wa.me/79000000000",
      "https://vk.com/uralliance",
    ],
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
