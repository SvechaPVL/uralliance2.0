import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Globe,
  Building2,
  FileText,
  Users,
  Gavel,
  Scale,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Newspaper,
  AlertTriangle,
  BadgeCheck,
  Zap,
  FileCheck,
  Handshake,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Публикация в Федресурс (ЕФРСБ) во Владивостоке | Сообщение о ликвидации | Uralliance",
  description:
    "Публикация сообщений в Федресурс о ликвидации, реорганизации, банкротстве. Официальный представитель Вестника госрегистрации. Комплексная ликвидация ООО под ключ от 20 000 ₽.",
  keywords:
    "федресурс владивосток, публикация в федресурс, сообщение о ликвидации федресурс, ефрсб владивосток, ликвидация ооо федресурс, публикация о ликвидации владивосток, реорганизация федресурс, банкротство федресурс, федресурс приморский край, публикация ефрсб, сообщение в ефрсб, ликвидация под ключ владивосток",
  alternates: {
    canonical: "/fedresurs",
  },
  openGraph: {
    title: "Публикация в Федресурс — официальный представитель Вестника в Приморском крае",
    description:
      "Размещаем сообщения в ЕФРСБ о ликвидации, реорганизации, банкротстве. Комплексная ликвидация ООО под ключ.",
    type: "website",
    locale: "ru_RU",
    url: "/fedresurs",
    siteName: "Uralliance",
  },
};

const PUBLICATION_TYPES = [
  {
    icon: Building2,
    title: "Ликвидация юрлица",
    description: "Обязательное уведомление кредиторов о начале добровольной ликвидации ООО, АО",
    required: true,
  },
  {
    icon: Users,
    title: "Реорганизация",
    description: "Слияние, присоединение, разделение, выделение, преобразование компаний",
    required: true,
  },
  {
    icon: Gavel,
    title: "Банкротство",
    description: "Введение процедуры, признание банкротом, торги, завершение дела",
    required: true,
  },
  {
    icon: FileText,
    title: "Уменьшение УК",
    description: "Уведомление об уменьшении уставного капитала общества",
    required: true,
  },
  {
    icon: Scale,
    title: "Залоги и лизинг",
    description: "Уведомления о залоге движимого имущества, договорах лизинга",
    required: false,
  },
  {
    icon: BadgeCheck,
    title: "Лицензии и СРО",
    description: "Сведения о членстве в СРО, получении и прекращении лицензий",
    required: false,
  },
];

const LIQUIDATION_COMBO = [
  {
    step: 1,
    title: "Федресурс",
    description: "Публикация о ликвидации в ЕФРСБ",
    icon: Globe,
    price: "от 3 000 ₽",
  },
  {
    step: 2,
    title: "Вестник госрегистрации",
    description: "Уведомление кредиторов в журнале",
    icon: Newspaper,
    price: "от 2 500 ₽",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Заявка",
    description: "Отправьте решение о ликвидации и выписку ЕГРЮЛ на почту",
  },
  {
    step: 2,
    title: "Подготовка",
    description: "Составляем текст сообщения в соответствии с 127-ФЗ",
  },
  {
    step: 3,
    title: "Публикация",
    description: "Размещаем на Федресурсе в течение 1-2 рабочих дней",
  },
  {
    step: 4,
    title: "Подтверждение",
    description: "Получаете выписку с ЭЦП о размещении",
  },
];

const ADVANTAGES = [
  {
    icon: Shield,
    title: "Официальный представитель",
    description: "Партнёр журнала «Вестник государственной регистрации» в Приморском крае",
  },
  {
    icon: Clock,
    title: "Быстрая публикация",
    description: "Размещение в Федресурсе за 1-2 рабочих дня, срочно — в течение суток",
  },
  {
    icon: FileCheck,
    title: "Юридическая проверка",
    description: "Каждое сообщение проверяется юристом на соответствие требованиям закона",
  },
  {
    icon: Handshake,
    title: "Комплексный подход",
    description: "Федресурс + Вестник + сопровождение ликвидации — всё в одном месте",
  },
];

const PRICING = [
  {
    name: "Федресурс",
    price: "от 3 000",
    description: "Одна публикация",
    features: ["Подготовка текста", "Размещение в ЕФРСБ", "Выписка с ЭЦП", "Консультация юриста"],
  },
  {
    name: "Федресурс + Вестник",
    price: "от 5 500",
    description: "Обе публикации",
    badge: "Выгодно",
    features: [
      "Публикация в Федресурсе",
      "Публикация в Вестнике",
      "Экономия 500 ₽",
      "Единый менеджер",
    ],
  },
  {
    name: "Ликвидация под ключ",
    price: "от 20 000",
    description: "Полное сопровождение",
    badge: "Рекомендуем",
    features: [
      "Все публикации",
      "Подготовка документов",
      "Подача в налоговую",
      "Получение листа записи",
    ],
  },
];

export default function FedresursPage() {
  return (
    <>
      <ServiceJsonLd
        name="Публикация в Федресурс (ЕФРСБ)"
        description="Размещение сообщений о ликвидации, реорганизации и банкротстве в Едином федеральном реестре"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Юридические услуги", url: "https://uralliance.ru/services/legal" },
          { name: "Федресурс" },
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
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[var(--color-legal-primary)]/5 blur-3xl" />

        <Container className="relative max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="legal" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <Shield className="h-3.5 w-3.5" />
                  Партнёр Вестника
                </Badge>
                <Badge variant="legal" badgeStyle="subtle" className="tracking-wider uppercase">
                  ЕФРСБ
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                Публикация в <span className="text-[var(--color-legal-primary)]">Федресурсе</span>
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Размещаем сообщения о ликвидации, реорганизации и банкротстве в Едином федеральном
                реестре. Как официальный партнёр Вестника госрегистрации — предлагаем комплексную
                ликвидацию ООО под ключ.
              </Text>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild variant="primary-legal" size="lg">
                  <Link href="/#contact">
                    <Globe className="mr-2 h-5 w-5" />
                    Заказать публикацию
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="https://fedresurs.ru" target="_blank" rel="noopener noreferrer">
                    Официальный сайт ЕФРСБ
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { value: "от 3 000 ₽", label: "публикация" },
                  { value: "1-2 дня", label: "срок размещения" },
                  { value: "500+", label: "публикаций" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-[var(--color-legal-primary)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="flex justify-center lg:justify-end">
              {/* Stylized Fedresurs form */}
              <div className="relative w-full max-w-sm">
                {/* Main card */}
                <Card
                  variant="legal"
                  className="relative overflow-hidden border-2 border-[var(--color-legal-primary)]/30 p-6"
                >
                  {/* Header */}
                  <div className="mb-6 flex items-center gap-3 border-b border-[var(--color-legal-border)]/30 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                      <Globe className="h-6 w-6 text-[var(--color-legal-primary)]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-text-primary)]">
                        Федресурс
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)]">
                        Единый федеральный реестр
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
                        Тип сообщения
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50 px-3 py-2.5">
                        <Building2 className="h-4 w-4 text-[var(--color-legal-primary)]" />
                        <span className="text-sm">Ликвидация юридического лица</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
                        Организация
                      </div>
                      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3 py-2.5 text-sm text-[var(--color-text-secondary)]">
                        ООО «Ваша компания»
                      </div>
                    </div>

                    <div>
                      <div className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
                        ОГРН
                      </div>
                      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3 py-2.5 text-sm text-[var(--color-text-secondary)]">
                        1234567890123
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      Готово к публикации
                    </span>
                  </div>
                </Card>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 rounded-full border border-[var(--color-legal-primary)] bg-[var(--color-background-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-legal-primary)] shadow-lg">
                  от 3 000 ₽
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Important: Fedresurs + Vestnik */}
      <Section spacing="md">
        <Container className="max-w-5xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent"
          >
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <Heading as="h2" size="lg" weight="semibold">
                    Для ликвидации нужны ОБЕ публикации
                  </Heading>
                  <Text tone="secondary" className="mt-2 max-w-2xl">
                    По закону при добровольной ликвидации ООО обязательно публиковать сообщение{" "}
                    <strong>и в Федресурсе, и в Вестнике госрегистрации</strong>. Без этих
                    публикаций налоговая откажет в регистрации ликвидации.
                  </Text>
                </div>
              </div>

              {/* Two publications */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {LIQUIDATION_COMBO.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-xl border border-[var(--color-legal-border)]/30 bg-[var(--color-card-bg)] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10 text-lg font-bold text-[var(--color-legal-primary)]">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-[var(--color-legal-primary)]" />
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        {item.description}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-legal-primary)]">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Plus sign between */}
              <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 translate-y-8 sm:block">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-legal-primary)] text-lg font-bold text-white">
                  +
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50 p-4">
                <div>
                  <div className="font-semibold">
                    Закажите обе публикации вместе — сэкономьте 500 ₽
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Мы — официальный партнёр Вестника в Приморском крае
                  </div>
                </div>
                <Button asChild variant="primary-legal">
                  <Link href="/#contact">
                    Заказать комплекс
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Publication Types */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Виды публикаций
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Какие сообщения размещаем в Федресурсе
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              ЕФРСБ — единый реестр для публикации юридически значимых сведений о компаниях
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PUBLICATION_TYPES.map((item) => (
              <Card
                key={item.title}
                variant="legal"
                padding="md"
                className="group transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                    <item.icon className="h-5 w-5 text-[var(--color-legal-primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Heading as="h3" size="sm" weight="semibold">
                        {item.title}
                      </Heading>
                      {item.required && (
                        <Badge variant="legal" badgeStyle="subtle" size="sm">
                          Обязательно
                        </Badge>
                      )}
                    </div>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {item.description}
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
              Почему публикуют через нас
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card key={item.title} variant="legal" padding="md" className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                  <item.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
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

      {/* Process */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Как разместить публикацию
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              4 простых шага — от заявки до получения подтверждения
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--color-legal-primary)]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--color-legal-primary)] bg-gradient-to-br from-[var(--color-legal-surface)] to-[var(--color-card-bg)] shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                        <span className="text-3xl font-bold text-[var(--color-legal-primary)]">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="max-w-[200px] space-y-2">
                      <Heading
                        as="h3"
                        size="sm"
                        weight="bold"
                        className="text-[var(--color-legal-primary)]"
                      >
                        {item.title}
                      </Heading>
                      <Text size="sm" tone="secondary" className="leading-relaxed">
                        {item.description}
                      </Text>
                    </div>
                  </div>

                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-12 -right-2 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-[var(--color-legal-primary)]/50" />
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
              Тарифы на публикации
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Прозрачные цены без скрытых платежей
            </Text>
          </div>

          <div className="grid gap-6 pt-4 lg:grid-cols-3">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                variant="legal"
                padding="lg"
                className={`relative overflow-visible transition-all hover:scale-[1.02] ${
                  plan.badge === "Рекомендуем"
                    ? "border-2 border-[var(--color-legal-primary)]/40 shadow-[var(--color-legal-primary)]/10 shadow-lg"
                    : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <Badge
                      variant="legal"
                      badgeStyle={plan.badge === "Рекомендуем" ? "filled" : "subtle"}
                      size="sm"
                    >
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
                    <span className="text-3xl font-bold text-[var(--color-legal-primary)]">
                      {plan.price}
                    </span>
                    <span className="text-lg text-[var(--color-text-secondary)]">₽</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-legal-primary)]" />
                      <Text size="sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant={plan.badge === "Рекомендуем" ? "primary-legal" : "outline"}
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Link href="/#contact">Заказать</Link>
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Vestnik Cross-sell */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-4xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-2 border-[var(--color-legal-primary)]/30"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <Badge variant="legal" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <Newspaper className="h-3.5 w-3.5" />
                  Официальный представитель
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Вестник госрегистрации
                </Heading>
                <Text tone="secondary">
                  ООО «ЮрАльянс» — официальное региональное представительство журнала «Вестник
                  государственной регистрации» в Приморском крае. Размещаем публикации о ликвидации
                  и реорганизации в ближайшем номере.
                </Text>
                <ul className="space-y-2">
                  {[
                    "Публикация в ближайшем номере",
                    "Официальное подтверждение",
                    "Комплексная ликвидация под ключ",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-legal-primary)]" />
                      <Text size="sm">{item}</Text>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="primary-legal">
                  <Link href="/services/legal/vestnik">
                    Подробнее о Вестнике
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex justify-center">
                <div className="rounded-2xl border border-[var(--color-legal-primary)]/20 bg-[var(--color-legal-surface)]/30 p-6 text-center">
                  <div className="mb-2 text-sm text-[var(--color-text-secondary)]">
                    Ликвидация ООО под ключ
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[var(--color-legal-primary)]">
                      от 20 000
                    </span>
                    <span className="text-xl text-[var(--color-text-secondary)]">₽</span>
                  </div>
                  <div className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    Федресурс + Вестник + документы + подача
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg" className="text-center">
            <Badge variant="legal" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
              <Zap className="h-3.5 w-3.5" />
              Быстрая публикация
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы разместить сообщение?
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
              Отправьте документы — опубликуем в Федресурсе за 1-2 рабочих дня
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-legal" size="lg">
                <Link href="/#contact">
                  Заказать публикацию
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
