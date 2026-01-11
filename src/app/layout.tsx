import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { YandexMetrika } from "@/components/system/YandexMetrika";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
  SiteNavigationJsonLd,
} from "@/components/seo/JsonLd";
import { defaultOgImage } from "@/lib/seo";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import pagesConfig from "@/content/pages.json";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: pagesConfig.home.title,
    template: "%s | Uralliance",
  },
  description: pagesConfig.home.description,
  keywords: [
    // Брендовые запросы (все вариации написания)
    "uralliance",
    "юр альянс",
    "юральянс",
    "юраллианс",
    "юр-альянс",
    "уральянс",
    "uralliance владивосток",

    // Локальные ключевые слова для Владивостока
    "юридические услуги Владивосток",
    "юрист Владивосток",
    "разработка сайтов Владивосток",
    "CRM система Владивосток",
    "чат-бот Владивосток",

    // ЭЦП и рутокены
    "ЭЦП Владивосток",
    "электронная подпись Владивосток",
    "рутокен Владивосток",
    "купить рутокен Владивосток",
    "эцп рутокен Владивосток",
    "носитель для эцп Владивосток",
    "токен для электронной подписи",

    // Бухгалтерия и аутсорс
    "бухгалтерское обслуживание Владивосток",
    "бухгалтеры на аутсорсе Владивосток",
    "бухучет Владивосток",
    "бухгалтерский аутсорсинг Владивосток",
    "ведение бухгалтерии Владивосток",
    "бухгалтерские услуги Владивосток",
    "удаленный бухгалтер Владивосток",
    "аутсорсинг бухгалтерии Владивосток",

    // Ликвидация
    "ликвидация ООО Владивосток",
    "ликвидация под ключ Владивосток",
    "закрытие ООО Владивосток",
    "ликвидация компании Владивосток",
    "ликвидация юридического лица Владивосток",
    "банкротство ООО Владивосток",

    // Специализированные услуги
    "ЭЦП электронная цифровая подпись",
    "Вестник публикация уведомлений",
    "Федресурс банкротство",
    "Такском электронный документооборот",

    // Разработка сайтов (расширенные)
    "создание сайтов Владивосток",
    "заказать сайт Владивосток",
    "веб студия Владивосток",
    "сайт под ключ Владивосток",
    "разработка интернет магазина Владивосток",
    "создание лендинга Владивосток",

    // Общие IT и юридические услуги
    "IT-решения для бизнеса Владивосток",
    "корпоративное право Владивосток",
    "арбитражные споры Владивосток",
    "автоматизация бизнеса Владивосток",
    "веб-разработка Приморский край",
    "внедрение CRM Владивосток",
  ],
  authors: [{ name: "Uralliance" }],
  creator: "Uralliance",
  publisher: "Uralliance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://uralliance.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: pagesConfig.home.title,
    description: pagesConfig.home.description,
    siteName: "Uralliance",
    images: [defaultOgImage],
    videos: [
      {
        url: "https://uralliance.ru/og-video.mp4",
        width: 1200,
        height: 630,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pagesConfig.home.title,
    description: pagesConfig.home.description,
    images: [defaultOgImage.url],
    creator: "@uralliance",
    site: "@uralliance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Можно добавить Google Search Console verification позже
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || "G-LH4RFFLFJH";

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Яндекс.Вебмастер верификация */}
        <meta name="yandex-verification" content="ba62be64a99c59e9" />

        {/* Региональная привязка для Яндекса */}
        <meta name="geo.region" content="RU-PRI" />
        <meta name="geo.placename" content="Владивосток" />
        <meta name="geo.position" content="43.117098;131.896262" />

        {/* Турбо-страницы Яндекса */}
        <link rel="alternate" type="application/rss+xml" href="/turbo-rss" />

        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Structured Data for SEO */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <SiteNavigationJsonLd />
        <FaqJsonLd />

        {/* Layout wrapper handles conditional rendering of header/footer */}
        <LayoutWrapper>{children}</LayoutWrapper>

        {/* Analytics */}
        {yandexMetrikaId && <YandexMetrika counterId={yandexMetrikaId} />}
        <GoogleAnalytics gaId={googleAnalyticsId} />
      </body>
    </html>
  );
}
