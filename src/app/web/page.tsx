import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { WebPageContent } from "./WebPageContent";

export const metadata: Metadata = {
  title: "Разработка сайтов во Владивостоке | Создание сайтов под ключ | Uralliance",
  description:
    "Создание современных сайтов на React и Next.js во Владивостоке. Лендинги, корпоративные сайты, интернет-магазины, веб-приложения. Быстро, красиво, с SEO. От 50 000 ₽.",
  keywords:
    "разработка сайтов владивосток, создание сайта владивосток, веб-разработка владивосток, заказать сайт владивосток, разработка интернет магазина владивосток, создание лендинга владивосток, веб студия владивосток, сайт под ключ владивосток, react next.js разработка",
  alternates: {
    canonical: "/web",
  },
  openGraph: {
    title: "Разработка сайтов — от 50 000 ₽",
    description:
      "Создаём современные сайты на React и Next.js. Лендинги, магазины, веб-приложения. Lighthouse 95+, SEO из коробки.",
    type: "website",
    locale: "ru_RU",
    url: "/web",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

export default function WebPage() {
  return <WebPageContent />;
}
