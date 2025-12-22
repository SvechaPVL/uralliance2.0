import { defaultOgImage } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { MaxChat } from "@/components/showcases/MaxChat";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageSquare,
  Smartphone,
  Globe,
  Users,
  ShoppingCart,
  Bell,
  BarChart3,
  CreditCard,
  Bot,
  Layers,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Code2,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Разработка ботов и Mini Apps для MAX | Создание приложений в мессенджере MAX | Uralliance",
  description:
    "Разработка чат-ботов, Mini Apps и каналов для мессенджера MAX. Автоматизация бизнеса, приём заказов, интеграция с CRM. Официальные партнёры MAX. Владивосток.",
  keywords:
    "разработка бота max, создание бота max, max мессенджер бот, mini apps max, мини приложения max, чат бот max, разработка для max, max bot api, создание приложения max, автоматизация max, бот для бизнеса max, max messenger bot, заказать бота max, разработка чат бота владивосток",
  alternates: {
    canonical: "/max",
  },
  openGraph: {
    title: "Разработка ботов и Mini Apps для мессенджера MAX",
    description:
      "Создаём чат-ботов, мини-приложения и каналы для MAX. Автоматизация бизнеса под ключ.",
    type: "website",
    locale: "ru_RU",
    url: "/max",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const SOLUTIONS = [
  {
    icon: Bot,
    title: "Чат-боты",
    description: "Автоматизация общения с клиентами, приём заказов, техподдержка 24/7",
    features: ["Сценарии диалогов", "Inline-кнопки", "Интеграция с CRM"],
  },
  {
    icon: Smartphone,
    title: "Mini Apps",
    description: "Веб-приложения внутри MAX — магазины, сервисы, личные кабинеты",
    features: ["React + MAX UI", "Нативный UX", "Оплата внутри"],
  },
  {
    icon: Megaphone,
    title: "Каналы",
    description: "Корпоративные каналы для публикации новостей и акций",
    features: ["Автопубликации", "Аналитика охвата", "Интеграция с ботом"],
  },
];

const BOT_TYPES = [
  {
    icon: ShoppingCart,
    title: "Боты-магазины",
    description: "Каталог товаров, корзина, оплата прямо в мессенджере",
  },
  {
    icon: Users,
    title: "Сервисные боты",
    description: "Запись на услуги, бронирование, управление записями",
  },
  {
    icon: Bell,
    title: "Боты уведомлений",
    description: "Рассылки, напоминания, статусы заказов",
  },
  {
    icon: BarChart3,
    title: "Аналитические боты",
    description: "Отчёты, дашборды, интеграция с 1С и CRM",
  },
  {
    icon: CreditCard,
    title: "Платёжные боты",
    description: "Приём оплат через ЮKassa, СБП, банковские карты",
  },
  {
    icon: MessageSquare,
    title: "Боты поддержки",
    description: "FAQ, тикеты, переключение на оператора",
  },
];

const ADVANTAGES = [
  {
    icon: Zap,
    title: "Российская платформа",
    description: "MAX — отечественный мессенджер, соответствующий требованиям законодательства РФ",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Серверы в России, защищённые каналы связи, соответствие 152-ФЗ",
  },
  {
    icon: Globe,
    title: "Mini Apps экосистема",
    description: "Полноценные веб-приложения внутри мессенджера с нативным UX",
  },
  {
    icon: Code2,
    title: "Открытый API",
    description: "Документированный REST API, webhooks, поддержка JavaScript и Go",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Анализ задачи",
    description: "Изучаем ваш бизнес, определяем функционал и сценарии использования",
  },
  {
    step: 2,
    title: "Проектирование",
    description: "Создаём архитектуру бота, прототипы диалогов и интерфейсов",
  },
  {
    step: 3,
    title: "Разработка",
    description: "Программируем бота/Mini App, интегрируем с вашими системами",
  },
  {
    step: 4,
    title: "Запуск и поддержка",
    description: "Публикуем в MAX, настраиваем аналитику, обеспечиваем SLA",
  },
];

const PRICING = [
  {
    name: "Простой бот",
    price: "от 40 000",
    period: "₽",
    description: "FAQ, меню, базовые команды",
    features: ["До 10 команд", "Inline-кнопки", "Базовая аналитика", "1 месяц поддержки"],
  },
  {
    name: "Бизнес-бот",
    price: "от 80 000",
    period: "₽",
    description: "Заказы, интеграции, CRM",
    badge: "Популярный",
    features: ["Сценарии диалогов", "Интеграция с CRM/1С", "Приём платежей", "3 месяца поддержки"],
  },
  {
    name: "Mini App",
    price: "от 150 000",
    period: "₽",
    description: "Полноценное приложение",
    features: ["React + MAX UI", "Личный кабинет", "Платёжный модуль", "6 месяцев поддержки"],
  },
];

export default function MaxPage() {
  return (
    <>
      <ServiceJsonLd
        name="Разработка ботов и Mini Apps для MAX"
        description="Создание чат-ботов, мини-приложений и каналов для мессенджера MAX"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "IT-решения", url: "https://uralliance.ru/services/tech" },
          { name: "Разработка для MAX" },
        ]}
      />

      {/* Hero Section */}
      <Section
        variant="page-hero"
        spacing="none"
        background="secondary"
        disableFirstSpacing
        className="relative overflow-hidden pt-[calc(6rem+var(--promo-banner-height))] pb-16 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-20 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-24"
      >
        {/* Background decorations */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#3b82f6]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#2563eb]/10 blur-3xl" />

        <Container className="relative max-w-6xl">
          <Breadcrumb className="mb-6" />

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="tech" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Российская платформа
                </Badge>
                <Badge variant="tech" badgeStyle="subtle" className="tracking-wider uppercase">
                  MAX Messenger
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                Разработка для мессенджера{" "}
                <span className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent">
                  MAX
                </span>
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Создаём чат-ботов, Mini Apps и корпоративные каналы для российского мессенджера MAX.
                Автоматизируем бизнес-процессы, интегрируем с CRM и платёжными системами.
              </Text>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/#contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Обсудить проект
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="https://dev.max.ru/docs" target="_blank" rel="noopener noreferrer">
                    Документация MAX
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { value: "REST API", label: "открытый" },
                  { value: "Mini Apps", label: "веб-приложения" },
                  { value: "152-ФЗ", label: "соответствие" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-[#3b82f6]">{stat.value}</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Showcase */}
            <div className="flex justify-center lg:justify-end">
              <MaxChat />
            </div>
          </div>
        </Container>
      </Section>

      {/* Why MAX */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Преимущества платформы
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Почему бизнесу стоит выбрать MAX
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              MAX — российский мессенджер с развитой экосистемой для бизнеса и открытым API для
              разработчиков
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card
                key={item.title}
                variant="tech"
                padding="md"
                className="group transition-all hover:scale-[1.02]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#2563eb]/10 transition-colors group-hover:from-[#3b82f6]/30 group-hover:to-[#2563eb]/20">
                  <item.icon className="h-6 w-6 text-[#3b82f6]" />
                </div>
                <Heading as="h3" size="sm" weight="semibold" className="mt-4">
                  {item.title}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {item.description}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Solutions */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Наши решения
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Что мы разрабатываем для MAX
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Полный цикл разработки — от чат-ботов до комплексных Mini Apps с интеграциями
            </Text>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <Card
                key={solution.title}
                variant="tech"
                padding="lg"
                className="group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#3b82f6]/5"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]/10 blur-2xl transition-all group-hover:bg-[#3b82f6]/20" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shadow-lg shadow-blue-500/20">
                    <solution.icon className="h-7 w-7 text-white" />
                  </div>

                  <Heading as="h3" size="md" weight="semibold" className="mt-5">
                    {solution.title}
                  </Heading>

                  <Text size="sm" tone="secondary" className="mt-2">
                    {solution.description}
                  </Text>

                  <div className="mt-4 space-y-2">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#3b82f6]" />
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bot Types */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Типы ботов
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Какие боты мы создаём
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Разрабатываем ботов под любые бизнес-задачи — от простых FAQ до сложных интеграций
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOT_TYPES.map((bot) => (
              <Card
                key={bot.title}
                variant="tech"
                padding="md"
                className="flex items-start gap-4 transition-all hover:bg-[var(--color-tech-surface)]/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]/10">
                  <bot.icon className="h-5 w-5 text-[#3b82f6]" />
                </div>
                <div>
                  <Heading as="h3" size="sm" weight="semibold">
                    {bot.title}
                  </Heading>
                  <Text size="sm" tone="secondary" className="mt-1">
                    {bot.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс работы
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Как мы разрабатываем
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Прозрачный процесс от идеи до запуска с еженедельными отчётами
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Step circle */}
                    <div className="relative mb-4">
                      <div
                        className="absolute inset-0 animate-pulse rounded-full bg-[#3b82f6]/20"
                        style={{ animationDuration: "3s" }}
                      />
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#3b82f6] bg-gradient-to-br from-[#3b82f6]/10 to-[#2563eb]/5 shadow-lg transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#3b82f6]/20">
                        <span className="text-3xl font-bold text-[#3b82f6]">{item.step}</span>
                      </div>
                    </div>

                    <div className="max-w-[220px] space-y-2">
                      <Heading as="h3" size="sm" weight="bold" className="text-[#3b82f6]">
                        {item.title}
                      </Heading>
                      <Text size="sm" tone="secondary" className="leading-relaxed">
                        {item.description}
                      </Text>
                    </div>
                  </div>

                  {/* Arrow */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-12 -right-2 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-[#3b82f6]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section spacing="md">
        <Container className="max-w-5xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Стоимость
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Тарифы на разработку
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Прозрачное ценообразование без скрытых платежей
            </Text>
          </div>

          <div className="grid gap-6 pt-4 lg:grid-cols-3">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                variant="tech"
                padding="lg"
                className={`relative overflow-visible transition-all hover:scale-[1.02] ${
                  plan.badge ? "border-2 border-[#3b82f6]/40 shadow-lg shadow-[#3b82f6]/10" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center">
                  <Heading as="h3" size="md" weight="semibold">
                    {plan.name}
                  </Heading>
                  <Text size="sm" tone="secondary" className="mt-1">
                    {plan.description}
                  </Text>

                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#3b82f6]">{plan.price}</span>
                    <span className="text-lg text-[var(--color-text-secondary)]">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3b82f6]" />
                      <Text size="sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant={plan.badge ? "primary-tech" : "outline"}
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Link href="/#contact">Заказать</Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Text size="sm" tone="secondary">
              Точная стоимость зависит от сложности проекта. Оставьте заявку — подготовим
              индивидуальное предложение.
            </Text>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card
            variant="tech"
            padding="lg"
            className="relative overflow-hidden border-2 border-[#3b82f6]/30 text-center"
          >
            {/* Background decoration */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#3b82f6]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#2563eb]/10 blur-3xl" />

            <div className="relative">
              <Badge variant="tech" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
                <Layers className="h-3.5 w-3.5" />
                Полный цикл разработки
              </Badge>

              <Heading as="h2" size="xl" weight="semibold">
                Готовы создать решение для MAX?
              </Heading>

              <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
                Расскажите о вашей задаче — подготовим техническое задание и оценку проекта за 2
                рабочих дня
              </Text>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/#contact">
                    Обсудить проект
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={contacts.phone.main.link}>Позвонить</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
