import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/system/OverlayScrollbar";
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
    "юридические услуги Владивосток",
    "IT-решения для бизнеса",
    "разработка сайтов",
    "CRM системы",
    "чат-боты для бизнеса",
    "корпоративное право",
    "арбитражные споры",
    "автоматизация бизнеса",
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
  },
  twitter: {
    card: "summary_large_image",
    title: pagesConfig.home.title,
    description: pagesConfig.home.description,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <HeroProgressProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <OverlayScrollbar />
        </HeroProgressProvider>
      </body>
    </html>
  );
}
