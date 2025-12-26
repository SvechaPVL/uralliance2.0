import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import { AITrainingContent } from "./AITrainingContent";

export const metadata: Metadata = {
  title: "Обучение работе с ИИ во Владивостоке — Курсы ChatGPT для бизнеса | Юральянс",
  description:
    "Как пользоваться ИИ для бизнеса? Обучение ChatGPT, YandexGPT, нейросетям во Владивостоке. Корпоративные курсы Юральянс — промпт-инжиниринг, автоматизация задач. От 15 000₽. Бесплатная шпаргалка 50 промптов.",
  keywords:
    "как пользоваться ии, обучение ии владивосток, курсы chatgpt владивосток, обучение нейросетям, курсы искусственный интеллект владивосток, промпт инжиниринг обучение, как использовать chatgpt для работы, yandexgpt обучение, корпоративное обучение нейросетям, курсы gpt, юральянс обучение",
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
