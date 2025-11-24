import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/system/OverlayScrollbar";
import { YandexMetrika } from "@/components/system/YandexMetrika";
import { CookieConsent } from "@/components/system/CookieConsent";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { HeroProgressProvider } from "@/context/HeroProgressContext";
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
    // Локальные ключевые слова для Владивостока
    "юридические услуги Владивосток",
    "юрист Владивосток",
    "разработка сайтов Владивосток",
    "CRM система Владивосток",
    "чат-бот Владивосток",
    "ЭЦП Владивосток",
    "электронная подпись Владивосток",

    // Специализированные услуги
    "ЭЦП электронная цифровая подпись",
    "Вестник публикация уведомлений",
    "Федресурс банкротство",
    "Такском электронный документооборот",

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

  return (
    <html lang="ru">
      <head>
        {/* Яндекс.Вебмастер верификация */}
        <meta name="yandex-verification" content="your-yandex-verification-code" />

        {/* Региональная привязка для Яндекса */}
        <meta name="geo.region" content="RU-PRI" />
        <meta name="geo.placename" content="Владивосток" />
        <meta name="geo.position" content="43.1332;131.9113" />

        {/* Турбо-страницы Яндекса */}
        <link rel="alternate" type="application/rss+xml" href="/turbo-rss" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {/* Structured Data for SEO */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />

        <HeroProgressProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <OverlayScrollbar />
          <CookieConsent />
        </HeroProgressProvider>

        {/* Analytics */}
        {yandexMetrikaId && <YandexMetrika counterId={yandexMetrikaId} />}
      </body>
    </html>
  );
}
