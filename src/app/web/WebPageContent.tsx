"use client";

import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { WebBrowserShowcase } from "@/components/showcases/WebBrowser";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Zap,
  Code2,
  Smartphone,
  ShoppingCart,
  Building2,
  Sparkles,
  Clock,
  Shield,
  TrendingUp,
  Palette,
  Search,
  Server,
  Layers,
  Monitor,
  MousePointerClick,
  BarChart3,
  MessageSquare,
  Award,
  Users,
  Gauge,
  Lock,
  Wrench,
  CreditCard,
  Truck,
  Package,
  Database,
} from "lucide-react";

const SITE_TYPES = [
  {
    icon: MousePointerClick,
    title: "Лендинг",
    subtitle: "Одностраничный сайт",
    price: "от 50 000 ₽",
    duration: "1-2 недели",
    description: "Идеален для продвижения одного продукта или услуги. Максимальная конверсия.",
    features: ["Продающий дизайн", "Адаптив под мобильные", "SEO из коробки"],
    popular: false,
  },
  {
    icon: Building2,
    title: "Корпоративный",
    subtitle: "Сайт компании",
    price: "от 100 000 ₽",
    duration: "3-4 недели",
    description: "Полноценное представительство компании в интернете с каталогом услуг.",
    features: ["Каталог услуг", "Блог и новости", "Интеграция с CRM"],
    popular: true,
  },
  {
    icon: ShoppingCart,
    title: "Интернет-магазин",
    subtitle: "E-commerce",
    price: "от 200 000 ₽",
    duration: "1-2 месяца",
    description: "Продажи онлайн с приёмом платежей, корзиной и личным кабинетом.",
    features: ["Каталог товаров", "Онлайн-оплата", "Интеграция с 1С"],
    popular: false,
  },
  {
    icon: Layers,
    title: "Веб-приложение",
    subtitle: "SaaS / Портал",
    price: "от 300 000 ₽",
    duration: "2-3 месяца",
    description: "Сложные сервисы с личными кабинетами, API и бизнес-логикой.",
    features: ["Личные кабинеты", "API интеграции", "Масштабируемость"],
    popular: false,
  },
];

const TECH_STACK = [
  {
    category: "Frontend",
    icon: Monitor,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
  },
  {
    category: "CMS",
    icon: Layers,
    items: ["WordPress", "1С-Битрикс", "Tilda", "Strapi"],
  },
  {
    category: "Хостинг",
    icon: Rocket,
    items: ["REG.RU", "Timeweb", "VPS", "Docker"],
    link: "https://www.reg.ru/hosting/?utm_source=uralliance&utm_medium=partner&utm_campaign=web",
  },
];

const INTEGRATIONS = [
  {
    icon: Database,
    title: "1С:Предприятие",
    description: "Синхронизация товаров, цен, остатков и заказов в реальном времени",
    items: ["Каталог товаров", "Цены и остатки", "Заказы и клиенты"],
  },
  {
    icon: Users,
    title: "CRM-системы",
    description: "Автоматическая передача заявок и отслеживание воронки продаж",
    items: ["Битрикс24", "AmoCRM", "RetailCRM"],
  },
  {
    icon: Package,
    title: "Маркетплейсы",
    description: "Единый каталог для сайта и площадок. Автообновление остатков",
    items: ["Wildberries", "Ozon", "Яндекс Маркет"],
  },
  {
    icon: CreditCard,
    title: "Оплата",
    description: "Приём платежей картами, СБП и электронными кошельками",
    items: ["ЮKassa", "Тинькофф", "СБП"],
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Расчёт стоимости и отслеживание посылок прямо на сайте",
    items: ["СДЭК", "Boxberry", "Почта России"],
  },
  {
    icon: BarChart3,
    title: "Аналитика",
    description: "Отслеживание посетителей, конверсий и эффективности рекламы",
    items: ["Яндекс Метрика", "Google Analytics", "Коллтрекинг"],
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Брифинг",
    description: "Изучаем ваш бизнес, конкурентов и целевую аудиторию",
    duration: "3-5 дней",
    icon: Users,
  },
  {
    step: 2,
    title: "Прототип",
    description: "Создаём интерактивный прототип в Figma",
    duration: "5-7 дней",
    icon: Palette,
  },
  {
    step: 3,
    title: "Дизайн",
    description: "Разрабатываем уникальный UI/UX под ваш бренд",
    duration: "7-10 дней",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "Разработка",
    description: "Верстаем, программируем, интегрируем",
    duration: "2-6 недель",
    icon: Code2,
  },
  {
    step: 5,
    title: "Запуск",
    description: "Тестируем, размещаем на хостинге, запускаем",
    duration: "3-5 дней",
    icon: Rocket,
  },
];

const FEATURES = [
  {
    icon: Gauge,
    title: "Lighthouse 95+",
    description: "Максимальная скорость загрузки страниц",
  },
  {
    icon: Smartphone,
    title: "Адаптивность",
    description: "Идеально на любых устройствах",
  },
  {
    icon: Search,
    title: "SEO из коробки",
    description: "Готовность к продвижению с первого дня",
  },
  {
    icon: Lock,
    title: "Безопасность",
    description: "SSL, защита от взлома и DDoS",
  },
  {
    icon: BarChart3,
    title: "Аналитика",
    description: "Яндекс.Метрика и Google Analytics",
  },
  {
    icon: Wrench,
    title: "Гарантия 6 мес",
    description: "Бесплатное исправление ошибок",
  },
];

const ADVANTAGES = [
  {
    icon: Award,
    title: "Опыт 10+ лет",
    description: "Разрабатываем сайты с 2014 года",
  },
  {
    icon: Code2,
    title: "Современный стек",
    description: "React, Next.js, TypeScript — не WordPress",
  },
  {
    icon: Shield,
    title: "Фиксированная цена",
    description: "Без скрытых платежей и доплат",
  },
  {
    icon: TrendingUp,
    title: "Результат",
    description: "Сайты, которые приносят клиентов",
  },
];

export function WebPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Разработка сайтов"
        description="Создание современных сайтов и веб-приложений во Владивостоке — от лендингов до порталов. React, Next.js, TypeScript."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "IT-решения", url: "https://uralliance.ru/services/tech" },
          { name: "Разработка сайтов" },
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
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[var(--color-tech-primary)]/5 blur-3xl" />

        <Container className="relative max-w-6xl">
          <Breadcrumb className="mb-6" />

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Badge variant="tech" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <Code2 className="h-3.5 w-3.5" />
                  React + Next.js
                </Badge>
                <Badge variant="tech" badgeStyle="subtle" className="tracking-wider uppercase">
                  Под ключ
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                  <span className="text-[var(--color-tech-primary)]">Сайты</span> для бизнеса во
                  Владивостоке
                </Heading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                  Создаём современные сайты на React и Next.js — быстрые, красивые и удобные. От
                  лендингов до сложных веб-приложений с интеграцией в 1С и CRM.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/#contact">
                    <Globe className="mr-2 h-5 w-5" />
                    Обсудить проект
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#types">Виды сайтов</Link>
                </Button>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 pt-4 lg:justify-start"
              >
                {[
                  { value: "от 50 000 ₽", label: "лендинг" },
                  { value: "1-2 нед.", label: "срок" },
                  { value: "50+", label: "проектов" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-[var(--color-tech-primary)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <WebBrowserShowcase />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Why not constructors */}
      <Section spacing="md">
        <Container className="max-w-5xl space-y-6">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Сравнение
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Почему не Tilda или WordPress?
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Конструкторы подходят для тестов, но не для серьёзного бизнеса
            </Text>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Tilda */}
            <Card variant="tech" padding="md" className="border-red-500/20">
              <div className="mb-3 flex items-center justify-between">
                <Heading as="h3" size="sm" weight="semibold">
                  Tilda
                </Heading>
                <Badge variant="tech" badgeStyle="subtle" size="sm" className="text-red-400">
                  Ограничения
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">-</span>
                  <Text size="sm" tone="secondary">
                    Лимит 1 ГБ на сайт
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">-</span>
                  <Text size="sm" tone="secondary">
                    Слабое SEO-продвижение
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">-</span>
                  <Text size="sm" tone="secondary">
                    Нет интеграции с 1С
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">-</span>
                  <Text size="sm" tone="secondary">
                    Ежемесячная подписка навсегда
                  </Text>
                </div>
              </div>
            </Card>

            {/* WordPress */}
            <Card variant="tech" padding="md" className="border-yellow-500/20">
              <div className="mb-3 flex items-center justify-between">
                <Heading as="h3" size="sm" weight="semibold">
                  WordPress
                </Heading>
                <Badge variant="tech" badgeStyle="subtle" size="sm" className="text-yellow-400">
                  Риски
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-yellow-400">-</span>
                  <Text size="sm" tone="secondary">
                    Частые взломы без обновлений
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-yellow-400">-</span>
                  <Text size="sm" tone="secondary">
                    Медленная загрузка страниц
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-yellow-400">-</span>
                  <Text size="sm" tone="secondary">
                    Плагины ломаются при обновлениях
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-yellow-400">-</span>
                  <Text size="sm" tone="secondary">
                    Шаблонный вид сайтов
                  </Text>
                </div>
              </div>
            </Card>

            {/* Our approach */}
            <Card
              variant="tech"
              padding="md"
              className="border-2 border-[var(--color-tech-primary)]/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <Heading as="h3" size="sm" weight="semibold">
                  React + Next.js
                </Heading>
                <Badge variant="tech" badgeStyle="filled" size="sm">
                  Наш подход
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                  <Text size="sm" tone="secondary">
                    Загрузка менее 2 секунд
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                  <Text size="sm" tone="secondary">
                    Интеграция с 1С и CRM
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                  <Text size="sm" tone="secondary">
                    Топ Яндекса и Google
                  </Text>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                  <Text size="sm" tone="secondary">
                    Сайт — ваша собственность
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Site Types */}
      <Section spacing="md" background="secondary" id="types">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Что разрабатываем
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Виды сайтов
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              От простых лендингов до сложных веб-приложений
            </Text>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {SITE_TYPES.map((type) => (
              <Card
                key={type.title}
                variant="tech"
                padding="lg"
                className={`relative overflow-visible transition-all hover:scale-[1.02] ${
                  type.popular
                    ? "border-2 border-[var(--color-tech-primary)]/40 shadow-[var(--color-tech-primary)]/10 shadow-lg"
                    : ""
                }`}
              >
                {type.popular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      Популярный
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                      <type.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
                    </div>
                    <div>
                      <Heading as="h3" size="md" weight="semibold">
                        {type.title}
                      </Heading>
                      <Text size="sm" tone="secondary">
                        {type.subtitle}
                      </Text>
                    </div>
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-4">
                    <div className="text-xl font-bold text-[var(--color-tech-primary)]">
                      {type.price}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                      <Clock className="h-4 w-4" />
                      {type.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <Text size="sm" tone="secondary">
                    {type.description}
                  </Text>

                  {/* Features */}
                  <div className="space-y-2">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant={type.popular ? "primary-tech" : "outline"}
                    className="mt-2 w-full"
                  >
                    <Link href="/#contact">Заказать</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech Stack */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Технологии
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Современный стек разработки
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((stack) => (
              <Card key={stack.category} variant="tech" padding="md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                    <stack.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                  </div>
                  <Heading as="h3" size="sm" weight="semibold">
                    {stack.category}
                  </Heading>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <Badge key={item} variant="tech" badgeStyle="subtle" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
                {"link" in stack && stack.link && (
                  <a
                    href={stack.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--color-tech-primary)] hover:underline"
                  >
                    Тарифы хостинга
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Integrations */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Интеграции
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Подключаем к вашим системам
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Сайт работает вместе с 1С, CRM и маркетплейсами
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((integration) => (
              <Card key={integration.title} variant="tech" padding="md">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                    <integration.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                  </div>
                  <div className="flex-1">
                    <Heading as="h3" size="sm" weight="semibold">
                      {integration.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {integration.description}
                    </Text>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {integration.items.map((item) => (
                        <Badge key={item} variant="tech" badgeStyle="outline" size="sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Как мы работаем
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              От идеи до запуска за 5 простых шагов
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--color-tech-primary)]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-tech-primary)] bg-gradient-to-br from-[var(--color-tech-surface)] to-[var(--color-card-bg)] shadow-lg transition-shadow duration-300 group-hover:shadow-xl lg:h-24 lg:w-24">
                        <item.icon className="h-8 w-8 text-[var(--color-tech-primary)] lg:h-10 lg:w-10" />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-tech-primary)] text-sm font-bold text-[#03121d]">
                        {item.step}
                      </div>
                    </div>

                    <div className="max-w-[180px] space-y-1">
                      <Heading
                        as="h3"
                        size="sm"
                        weight="bold"
                        className="text-[var(--color-tech-primary)]"
                      >
                        {item.title}
                      </Heading>
                      <Text size="sm" tone="secondary" className="leading-relaxed">
                        {item.description}
                      </Text>
                      <div className="pt-1">
                        <Badge variant="tech" badgeStyle="subtle" size="sm">
                          {item.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-14 -right-1 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-[var(--color-tech-primary)]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Что получаете
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Включено в каждый проект
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                variant="tech"
                padding="md"
                className="transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                    <feature.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                  </div>
                  <div>
                    <Heading as="h3" size="sm" weight="semibold">
                      {feature.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {feature.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Us */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Преимущества
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Почему выбирают нас
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card key={item.title} variant="tech" padding="md" className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                  <item.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
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

      {/* Cross-sell */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-5xl">
          <Card
            variant="tech"
            padding="lg"
            className="relative overflow-hidden border-2 border-[var(--color-tech-primary)]/30"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />

            <div className="relative">
              <div className="text-center">
                <Badge variant="tech" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Дополнительно
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Сайт — только начало
                </Heading>
                <Text tone="secondary" className="mx-auto mt-2 max-w-2xl">
                  Подключим чат-бота для автоматизации, настроим CRM для учёта клиентов и
                  интегрируем с 1С для синхронизации данных.
                </Text>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Link
                  href="/max"
                  className="group rounded-xl border border-[var(--color-tech-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-tech-primary)]/50 hover:bg-[var(--color-tech-surface)]/50"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-[var(--color-tech-primary)]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Чат-бот MAX</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-tech-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        AI-ассистент для сайта
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/services/tech/crm"
                  className="group rounded-xl border border-[var(--color-tech-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-tech-primary)]/50 hover:bg-[var(--color-tech-surface)]/50"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-[var(--color-tech-primary)]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">CRM-система</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-tech-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        Учёт клиентов и сделок
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/services/tech/1c"
                  className="group rounded-xl border border-[var(--color-tech-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-tech-primary)]/50 hover:bg-[var(--color-tech-surface)]/50"
                >
                  <div className="flex items-center gap-3">
                    <Server className="h-8 w-8 text-[var(--color-tech-primary)]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Интеграция 1С</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-tech-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        Синхронизация данных
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container className="max-w-4xl">
          <Card variant="tech" padding="lg" className="text-center">
            <Badge variant="tech" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
              <Rocket className="h-3.5 w-3.5" />
              Начните проект
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы создать сайт?
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
              Оставьте заявку — обсудим ваш проект и подготовим предложение бесплатно
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
          </Card>
        </Container>
      </Section>
    </>
  );
}
