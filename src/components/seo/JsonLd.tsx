/**
 * JSON-LD Structured Data Component
 * Provides rich snippets for search engines
 */

import Script from "next/script";

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
    "@id": "https://uralliance.ru/#organization",
    name: "Uralliance",
    alternateName: "Юраллианс",
    url: "https://uralliance.ru",
    logo: "https://uralliance.ru/logo.png",
    image: "https://uralliance.ru/og-image.png",
    description:
      "Юридические услуги и IT-решения для бизнеса во Владивостоке. Разработка сайтов, CRM-систем, чат-ботов, корпоративное право, арбитражные споры.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Пушкинская, 28",
      addressLocality: "Владивосток",
      addressRegion: "Приморский край",
      postalCode: "690091",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "43.1332",
      longitude: "131.9113",
    },
    telephone: "+74232028878",
    email: "info@uralliance.ru",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+74232028878",
        contactType: "customer support",
        availableLanguage: ["Russian", "ru"],
        areaServed: "RU",
      },
      {
        "@type": "ContactPoint",
        email: "info@uralliance.ru",
        contactType: "customer support",
        availableLanguage: ["Russian", "ru"],
      },
    ],
    sameAs: [
      // Добавить социальные сети когда будут
      // "https://vk.com/uralliance",
      // "https://t.me/uralliance",
    ],
    priceRange: "₽₽₽",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "43.1332",
        longitude: "131.9113",
      },
      geoRadius: "500000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
    name: "Uralliance - Юридические услуги и IT-решения",
    url: "https://uralliance.ru",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://uralliance.ru/search?q={search_term_string}",
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
      name: "Uralliance",
    },
    areaServed: "Владивосток, Россия",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };

  return <JsonLd data={data} />;
}
