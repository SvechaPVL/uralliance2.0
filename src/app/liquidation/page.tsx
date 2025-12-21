import { defaultOgImage } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { LiquidationShowcase } from "@/components/showcases/LiquidationShowcase";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FileX,
  Building2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  AlertTriangle,
  Zap,
  Users,
  FileText,
  Scale,
  TrendingDown,
  Ban,
  Rocket,
  Pause,
  Award,
  Newspaper,
  Globe,
  Calculator,
  Briefcase,
  Stamp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ликвидация организаций во Владивостоке | Закрытие ООО под ключ | Uralliance",
  description:
    "Ликвидация ООО и юридических лиц во Владивостоке под ключ. Добровольная, упрощённая и сложная ликвидация. Публикации в Федресурс и Вестник. Опыт 22+ лет. От 10 000 ₽.",
  keywords:
    "ликвидация организации владивосток, ликвидация юридического лица владивосток, ликвидация ооо владивосток, закрытие ооо владивосток, ликвидация под ключ владивосток, добровольная ликвидация владивосток, упрощенная ликвидация владивосток, исключение из егрюл владивосток, ликвидация компании владивосток, закрыть фирму владивосток",
  alternates: {
    canonical: "/liquidation",
  },
  openGraph: {
    title: "Ликвидация организаций под ключ — от 10 000 ₽",
    description:
      "Закрытие ООО во Владивостоке. Добровольная и упрощённая ликвидация. Публикации Федресурс + Вестник. Официальный представитель Вестника госрегистрации.",
    type: "website",
    locale: "ru_RU",
    url: "/liquidation",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const LIQUIDATION_TYPES = [
  {
    icon: Building2,
    title: "Добровольная",
    subtitle: "Стандартная ликвидация",
    price: "от 25 000 ₽",
    duration: "3-4 месяца",
    description: "Подходит для любых организаций. Полный пакет документов и публикаций.",
    features: ["Любые обороты", "Полное сопровождение", "Федресурс + Вестник"],
    popular: false,
  },
  {
    icon: Zap,
    title: "Упрощённая",
    subtitle: "Для малого бизнеса",
    price: "от 10 000 ₽",
    duration: "3,5 месяца",
    description: "Для микропредприятий и субъектов МСП. Сокращённый срок и расходы.",
    features: ["Меньше документов", "Экономия времени", "Меньше расходов"],
    popular: true,
  },
  {
    icon: Scale,
    title: "Сложная",
    subtitle: "Крупные налогоплательщики",
    price: "от 80 000 ₽",
    duration: "индивидуально",
    description: "Для компаний с большими оборотами. Полное юридическое сопровождение без рисков.",
    features: ["Налоговые проверки", "Работа с долгами", "Защита интересов"],
    popular: false,
  },
];

const REASONS = [
  {
    icon: Pause,
    title: "Бизнес не ведётся",
    description: "Компания «висит» в реестре без деятельности",
  },
  {
    icon: TrendingDown,
    title: "Есть долги",
    description: "Задолженность перед бюджетом или контрагентами",
  },
  {
    icon: AlertTriangle,
    title: "Риск ответственности",
    description: "Угроза субсидиарной ответственности",
  },
  {
    icon: Ban,
    title: "Принудительное исключение",
    description: "Риск дисквалификации руководителя",
  },
  {
    icon: Rocket,
    title: "Новый старт",
    description: "Новый бизнес без старых обязательств",
  },
  {
    icon: Briefcase,
    title: "Неактивная компания",
    description: "Организация создана, но не заработала",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Консультация",
    description: "Анализируем ситуацию, выбираем способ ликвидации",
    duration: "1 день",
    icon: Users,
  },
  {
    step: 2,
    title: "Подготовка",
    description: "Готовим документы, принимаем решение о ликвидации",
    duration: "3-5 дней",
    icon: FileText,
  },
  {
    step: 3,
    title: "Публикации",
    description: "Подаём в налоговую, публикуем в Федресурсе и Вестнике",
    duration: "1-2 недели",
    icon: Newspaper,
  },
  {
    step: 4,
    title: "Расчёты",
    description: "Закрываем долги, сдаём отчётность, ликвидационный баланс",
    duration: "1-3 месяца",
    icon: Calculator,
  },
  {
    step: 5,
    title: "Завершение",
    description: "Получаем лист записи об исключении из ЕГРЮЛ",
    duration: "2-4 недели",
    icon: CheckCircle2,
  },
];

const DOCUMENTS = [
  { name: "Устав компании", note: "действующая редакция" },
  { name: "ОГРН", note: "свидетельство о регистрации" },
  { name: "ИНН", note: "свидетельство о постановке на учёт" },
  { name: "Паспорта", note: "директора и учредителей" },
  { name: "Печать", note: "если имеется" },
  { name: "Отчётность", note: "бухгалтерская за последний период" },
];

const ADVANTAGES = [
  {
    icon: Award,
    title: "Опыт 22+ лет",
    description: "Знаем все подводные камни ликвидации",
  },
  {
    icon: Newspaper,
    title: "Представитель Вестника",
    description: "Публикуем напрямую, без посредников",
  },
  {
    icon: Shield,
    title: "Фиксированная цена",
    description: "Без скрытых платежей и доплат",
  },
  {
    icon: CheckCircle2,
    title: "Гарантия результата",
    description: "Доводим до получения документов",
  },
];

const ADDITIONAL_PRICING = [
  { name: "Ликвидация НКО", price: "от 12 000 ₽" },
  { name: "Публикация в Вестнике", price: "от 2 500 ₽" },
  { name: "Сообщение в Федресурс", price: "от 3 000 ₽" },
  { name: "Консультация", price: "бесплатно" },
];

export default function LiquidationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Ликвидация организаций"
        description="Полное сопровождение ликвидации юридических лиц во Владивостоке — от подготовки документов до исключения из ЕГРЮЛ"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Юридические услуги", url: "https://uralliance.ru/services/legal" },
          { name: "Ликвидация организаций" },
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
                  Опыт 22+ лет
                </Badge>
                <Badge variant="legal" badgeStyle="subtle" className="tracking-wider uppercase">
                  Под ключ
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                Ликвидация <span className="text-[var(--color-legal-primary)]">организаций</span> во
                Владивостоке
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Закроем вашу компанию официально и без рисков. Берём на себя все этапы: от решения о
                ликвидации до получения листа записи об исключении из ЕГРЮЛ. Вы только подписываете
                документы — всё остальное делаем мы.
              </Text>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild variant="primary-legal" size="lg">
                  <Link href="/#contact">
                    <FileX className="mr-2 h-5 w-5" />
                    Заказать ликвидацию
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#types">Виды ликвидации</Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { value: "от 10 000 ₽", label: "упрощённая" },
                  { value: "3-4 мес.", label: "срок" },
                  { value: "1000+", label: "компаний закрыто" },
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
              <LiquidationShowcase />
            </div>
          </div>
        </Container>
      </Section>

      {/* Warning: 2026 changes */}
      <Section spacing="md">
        <Container className="max-w-5xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent"
          >
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div className="flex-1">
                <Heading as="h2" size="lg" weight="semibold">
                  С 2026 года — особенно важно закрыть неактивные компании
                </Heading>
                <Text tone="secondary" className="mt-2 max-w-3xl">
                  Если компания не ведёт финансово-хозяйственную деятельность, её необходимо
                  ликвидировать официально. Иначе — риск принудительного исключения, дисквалификации
                  руководителя на срок до 3 лет и штрафов.
                </Text>
                <div className="mt-4">
                  <Button asChild variant="primary-legal" size="sm">
                    <Link href="/#contact">
                      Бесплатная консультация
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Liquidation Types */}
      <Section spacing="md" background="secondary" id="types">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Виды ликвидации
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Выберите подходящий способ
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Подберём оптимальный вариант в зависимости от вашей ситуации
            </Text>
          </div>

          <div className="grid gap-6 pt-4 lg:grid-cols-3">
            {LIQUIDATION_TYPES.map((type) => (
              <Card
                key={type.title}
                variant="legal"
                padding="lg"
                className={`relative overflow-visible transition-all hover:scale-[1.02] ${
                  type.popular
                    ? "border-2 border-[var(--color-legal-primary)]/40 shadow-[var(--color-legal-primary)]/10 shadow-lg"
                    : ""
                }`}
              >
                {type.popular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <Badge variant="legal" badgeStyle="filled" size="sm">
                      Популярный
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                      <type.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
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
                    <div className="text-2xl font-bold text-[var(--color-legal-primary)]">
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
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-legal-primary)]" />
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant={type.popular ? "primary-legal" : "outline"}
                    className="mt-2 w-full"
                  >
                    <Link href="/#contact">Заказать</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional pricing */}
          <div className="mx-auto max-w-3xl">
            <Card variant="legal" padding="md">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ADDITIONAL_PRICING.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-2 sm:flex-col sm:text-center"
                  >
                    <Text size="sm" tone="secondary">
                      {item.name}
                    </Text>
                    <Text size="sm" weight="semibold" className="text-[var(--color-legal-primary)]">
                      {item.price}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why liquidation is needed */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Причины
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Когда нужна ликвидация
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason) => (
              <Card
                key={reason.title}
                variant="legal"
                padding="md"
                className="transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                    <reason.icon className="h-5 w-5 text-[var(--color-legal-primary)]" />
                  </div>
                  <div>
                    <Heading as="h3" size="sm" weight="semibold">
                      {reason.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {reason.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Этапы ликвидации
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              От консультации до получения документов об исключении
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--color-legal-primary)]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-legal-primary)] bg-gradient-to-br from-[var(--color-legal-surface)] to-[var(--color-card-bg)] shadow-lg transition-shadow duration-300 group-hover:shadow-xl lg:h-24 lg:w-24">
                        <item.icon className="h-8 w-8 text-[var(--color-legal-primary)] lg:h-10 lg:w-10" />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-legal-primary)] text-sm font-bold text-white">
                        {item.step}
                      </div>
                    </div>

                    <div className="max-w-[180px] space-y-1">
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
                      <div className="pt-1">
                        <Badge variant="legal" badgeStyle="subtle" size="sm">
                          {item.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-14 -right-1 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-[var(--color-legal-primary)]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Documents */}
      <Section spacing="md">
        <Container className="max-w-4xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Документы
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Что понадобится для ликвидации
            </Heading>
          </div>

          <Card variant="legal" padding="lg">
            <div className="grid gap-4 sm:grid-cols-2">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-legal-border)]/30 bg-[var(--color-legal-surface)]/30 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                    <FileText className="h-5 w-5 text-[var(--color-legal-primary)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">{doc.name}</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{doc.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50 p-4">
              <div className="flex items-start gap-3">
                <Stamp className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-legal-primary)]" />
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">
                    Не знаете, какие документы у вас есть?
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Запишитесь на бесплатную консультацию — поможем разобраться
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Why Us */}
      <Section spacing="md" background="secondary">
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

      {/* Cross-sell: Fedresurs + Vestnik */}
      <Section spacing="md">
        <Container className="max-w-5xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-2 border-[var(--color-legal-primary)]/30"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />

            <div className="relative">
              <div className="text-center">
                <Badge variant="legal" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
                  <Newspaper className="h-3.5 w-3.5" />
                  Обязательные публикации
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Федресурс и Вестник — уже включены
                </Heading>
                <Text tone="secondary" className="mx-auto mt-2 max-w-2xl">
                  При ликвидации ООО обязательно публиковать сообщение и в Федресурсе, и в Вестнике
                  госрегистрации. Мы — официальный представитель Вестника в Приморском крае.
                </Text>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/fedresurs"
                  className="group rounded-xl border border-[var(--color-legal-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-legal-primary)]/50 hover:bg-[var(--color-legal-surface)]/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                      <Globe className="h-6 w-6 text-[var(--color-legal-primary)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Федресурс</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-legal-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        Публикация о ликвидации в ЕФРСБ
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-legal-primary)]">
                      от 3 000 ₽
                    </div>
                  </div>
                </Link>

                <Link
                  href="/services/legal/vestnik"
                  className="group rounded-xl border border-[var(--color-legal-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-legal-primary)]/50 hover:bg-[var(--color-legal-surface)]/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                      <Newspaper className="h-6 w-6 text-[var(--color-legal-primary)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Вестник</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-legal-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        Уведомление кредиторов в журнале
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[var(--color-legal-primary)]">
                      от 2 500 ₽
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg" className="text-center">
            <Badge variant="legal" badgeStyle="outline" className="mb-4 gap-1.5 font-semibold">
              <Zap className="h-3.5 w-3.5" />
              Бесплатная консультация
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы закрыть компанию?
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
              Оставьте заявку — проконсультируем бесплатно и подберём оптимальный способ ликвидации
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-legal" size="lg">
                <Link href="/#contact">
                  Оставить заявку
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
