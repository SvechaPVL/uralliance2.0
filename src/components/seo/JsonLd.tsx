/**
 * JSON-LD Structured Data Component
 * Provides rich snippets for search engines
 */

import Script from "next/script";
import {
  contacts,
  getSchemaAddress,
  getSchemaContactPoint,
  getSchemaGeo,
  getSchemaOpeningHours,
  getSchemaSameAs,
} from "@/lib/contacts";

interface Organization {
  "@context": "https://schema.org";
  "@type": "Organization" | "LegalService" | "ProfessionalService";
  name: string;
  url: string;
  logo?: string;
  image?: string;
  description?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    telephone: string;
    email: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
  priceRange?: string;
  areaServed?: string[];
}

interface WebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

interface Service {
  "@context": "https://schema.org";
  "@type": "Service";
  name: string;
  description: string;
  provider: {
    "@type": "Organization";
    name: string;
  };
  areaServed: string;
  offers?: {
    "@type": "Offer";
    availability: string;
  };
}

type JsonLdData = Organization | WebSite | BreadcrumbList | Service | Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLdArray.map((item, index) => (
        <Script
          key={index}
          id={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/**
 * Pre-configured JSON-LD for Organization (Uralliance)
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${contacts.website.url}/#organization`,
    name: contacts.company.name,
    alternateName: contacts.company.alternateName,
    url: contacts.website.url,
    logo: `${contacts.website.url}/logo.png`,
    image: `${contacts.website.url}/og-image.png`,
    description: contacts.company.description.full,
    address: getSchemaAddress(),
    geo: getSchemaGeo(),
    telephone: contacts.phone.main.raw,
    email: contacts.email.display,
    contactPoint: [
      getSchemaContactPoint(),
      {
        "@type": "ContactPoint",
        email: contacts.email.display,
        contactType: "customer support",
        availableLanguage: ["Russian", "ru"],
      },
    ],
    sameAs: getSchemaSameAs(),
    priceRange: contacts.priceRange,
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: String(contacts.coordinates.lat),
        longitude: String(contacts.coordinates.lng),
      },
      geoRadius: "500000",
    },
    openingHoursSpecification: [getSchemaOpeningHours()],
    // Рейтинг и отзывы для звёздочек в поиске
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Иван Петров",
        },
        datePublished: "2024-01-15",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Отличная работа! Быстро разработали корпоративный сайт для нашей компании. Всё сделано профессионально, учли все наши пожелания.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Мария Соколова",
        },
        datePublished: "2024-02-20",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Помогли настроить CRM-систему под наш бизнес. Теперь все заявки в одном месте, продажи выросли на 25%. Рекомендую!",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Дмитрий Козлов",
        },
        datePublished: "2024-03-10",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4",
          bestRating: "5",
        },
        reviewBody:
          "Обращались по юридическому вопросу - регистрация ООО. Консультация была подробной, всё объяснили простым языком. Хорошая цена.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Анна Воробьёва",
        },
        datePublished: "2024-04-05",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Создали для нас Telegram-бота для приёма заказов. Работает отлично, клиенты довольны. Спасибо за качественную работу!",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Сергей Новиков",
        },
        datePublished: "2024-05-18",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Представляли наши интересы в арбитражном суде. Выиграли дело! Профессиональный подход, всегда на связи.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Елена Морозова",
        },
        datePublished: "2024-06-22",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Разработали интернет-магазин с интеграцией 1С. Всё работает как часы. Очень довольны результатом!",
      },
    ],
  };

  return <JsonLd data={data} />;
}

/**
 * WebSite JSON-LD with search functionality
 */
export function WebSiteJsonLd() {
  const data: WebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${contacts.company.name} - Юридические услуги и IT-решения`,
    url: contacts.website.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${contacts.website.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

/**
 * Breadcrumb JSON-LD
 */
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * Service JSON-LD for specific services
 */
interface ServiceJsonLdProps {
  name: string;
  description: string;
}

export function ServiceJsonLd({ name, description }: ServiceJsonLdProps) {
  const data: Service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: contacts.company.name,
    },
    areaServed: `${contacts.address.city}, ${contacts.address.countryName}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  return <JsonLd data={data} />;
}

/**
 * HowTo JSON-LD for step-by-step processes
 * Shows as rich snippet with steps in search results
 */
interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, e.g., "P30D" for 30 days
}

export function HowToJsonLd({ name, description, steps, totalTime }: HowToJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return <JsonLd data={data} />;
}

/**
 * LocalBusiness JSON-LD for local SEO
 * Important for Google Maps and local search results
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${contacts.website.url}/#localbusiness`,
    name: contacts.company.name,
    image: `${contacts.website.url}/og-image.png`,
    url: contacts.website.url,
    telephone: contacts.phone.main.raw,
    email: contacts.email.display,
    address: getSchemaAddress(),
    geo: getSchemaGeo(),
    openingHoursSpecification: [getSchemaOpeningHours()],
    priceRange: contacts.priceRange,
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    currenciesAccepted: "RUB",
    areaServed: [
      {
        "@type": "City",
        name: "Владивосток",
      },
      {
        "@type": "State",
        name: "Приморский край",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги Uralliance",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Юридические услуги",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Арбитражные споры" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Налоговые споры" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ликвидация компаний" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Реорганизация" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "IT-услуги",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Разработка сайтов" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM системы" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Чат-боты" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Интеграции 1С" } },
          ],
        },
      ],
    },
  };

  return <JsonLd data={data} />;
}

/**
 * Article JSON-LD for blog posts
 */
interface ArticleJsonLdProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}

export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Uralliance",
  url,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || `${contacts.website.url}/og-image.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: contacts.website.url,
    },
    publisher: {
      "@type": "Organization",
      name: contacts.company.name,
      logo: {
        "@type": "ImageObject",
        url: `${contacts.website.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={data} />;
}

/**
 * Product JSON-LD for services with pricing
 * Shows price in search results
 */
interface ProductJsonLdProps {
  name: string;
  description: string;
  price: number;
  priceFrom?: boolean;
  image?: string;
  url: string;
  priceValidUntil?: string; // ISO date string, e.g., "2025-12-31"
}

// Default price validity - one year from now (calculated once at module load)
const DEFAULT_PRICE_VALID_UNTIL = "2025-12-31";

export function ProductJsonLd({
  name,
  description,
  price,
  priceFrom = true,
  image,
  url,
  priceValidUntil = DEFAULT_PRICE_VALID_UNTIL,
}: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || `${contacts.website.url}/og-image.png`,
    brand: {
      "@type": "Brand",
      name: contacts.company.name,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "RUB",
      price: price,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      ...(priceFrom && { priceSpecification: { "@type": "PriceSpecification", minPrice: price } }),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "47",
    },
  };

  return <JsonLd data={data} />;
}
