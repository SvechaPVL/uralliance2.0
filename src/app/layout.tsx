import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/system/OverlayScrollbar";
import { YandexMetrika } from "@/components/system/YandexMetrika";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CookieConsent } from "@/components/system/CookieConsent";
import { FloatingContactButton } from "@/components/widgets/FloatingContactButton";
import { PromoBanner } from "@/components/system/PromoBanner";
import { IntroLoaderWrapper } from "@/components/system/IntroLoaderWrapper";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
  SiteNavigationJsonLd,
} from "@/components/seo/JsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HeroProgressProvider } from "@/context/HeroProgressContext";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { IntroOverlay } from "@/components/system/IntroOverlay";
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uralliance - Юридические услуги и IT-решения",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pagesConfig.home.title,
    description: pagesConfig.home.description,
    images: ["/og-image.png"],
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
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
        {/* OG Video for animated preview in messengers */}
        <meta property="og:video" content="https://uralliance.ru/og-video.mp4" />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1200" />
        <meta property="og:video:height" content="630" />
        <meta name="twitter:player" content="https://uralliance.ru/og-video.mp4" />
        <meta name="twitter:player:width" content="1200" />
        <meta name="twitter:player:height" content="630" />

        {/* Яндекс.Вебмастер верификация */}
        <meta name="yandex-verification" content="d33a8b0da9bdd7ed" />

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
        {/* SSR overlay - hides content until intro loader is ready */}
        <IntroOverlay />

        {/* Intro Loader - particle text effect */}
        <IntroLoaderWrapper minDisplayTime={5500} />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Structured Data for SEO */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <SiteNavigationJsonLd />
        <FaqJsonLd />

        <HeroProgressProvider>
          <PromoBanner
            id="pensioner-discount"
            badge="Акция"
            message="Скидки для пенсионеров на все услуги!"
            link={{
              href: "/#contact",
              label: "Узнать подробности",
            }}
            variant="legal"
            hideForDays={7}
          />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <OverlayScrollbar />
          <CookieConsent />
          <FloatingContactButton />
        </HeroProgressProvider>

        {/* Analytics */}
        {yandexMetrikaId && <YandexMetrika counterId={yandexMetrikaId} />}
        <GoogleAnalytics gaId={googleAnalyticsId} />
      </body>
    </html>
  );
}
