import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { WebPageContent } from "./WebPageContent";

export const metadata: Metadata = {
  title: "Создание сайтов во Владивостоке под ключ — от 35 000₽ | Юральянс",
  description:
    "Заказать сайт во Владивостоке в Юральянс: лендинги, корпоративные сайты, интернет-магазины на React/Next.js. Веб-студия с опытом. Разработка сайтов под ключ от 35 000₽. Консультация бесплатно.",
  keywords:
    "создание сайтов владивосток, заказать сайт владивосток, разработка сайтов владивосток, веб студия владивосток, сайт под ключ владивосток, создание лендинга владивосток, разработка интернет магазина владивосток, корпоративный сайт владивосток, программисты владивосток, юральянс сайты",
  alternates: {
    canonical: "/web",
  },
  openGraph: {
    title: "Разработка сайтов — от 35 000 ₽",
    description:
      "Создаём современные сайты на React и Next.js. Лендинги, магазины, веб-приложения. Lighthouse 95+, SEO из коробки. Консультация бесплатно.",
    type: "website",
    locale: "ru_RU",
    url: "/web",
    siteName: "Юральянс",
    images: [defaultOgImage],
  },
};

export default function WebPage() {
  return <WebPageContent />;
}
