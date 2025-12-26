import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { AITrainingContent } from "./AITrainingContent";

export const metadata: Metadata = {
  title: "Обучение работе с ИИ | Курсы ChatGPT для бизнеса | Uralliance Владивосток",
  description:
    "Обучение сотрудников работе с ChatGPT, YandexGPT и нейросетями во Владивостоке. Корпоративные курсы, промпт-инжиниринг, автоматизация задач. От 15 000 ₽. Скачайте бесплатную шпаргалку с 50 промптами.",
  keywords:
    "обучение chatgpt владивосток, курсы нейросети для бизнеса, обучение ии владивосток, курсы искусственный интеллект, промпт инжиниринг курсы, yandexgpt обучение, корпоративное обучение нейросетям, курсы gpt для сотрудников, обучение работе с нейросетями",
  alternates: {
    canonical: "/ai-training",
  },
  openGraph: {
    title: "Обучение работе с ИИ — курсы ChatGPT для бизнеса",
    description:
      "Научим сотрудников использовать нейросети для ускорения работы в 2-5 раз. ChatGPT, YandexGPT, GigaChat, Claude. Корпоративные курсы от 15 000 ₽.",
    type: "website",
    locale: "ru_RU",
    url: "/ai-training",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

export default function AITrainingPage() {
  return <AITrainingContent />;
}
