import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText,
  Send,
  Building2,
  CheckCircle2,
  Clock,
  HeadphonesIcon,
  Globe,
  Smartphone,
  RefreshCw,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Такском ЭДО и электронная отчётность во Владивостоке | Uralliance",
  description:
    "Подключение к системе Такском: электронная отчётность в ФНС, СФР, Росстат, электронный документооборот с контрагентами. Онлайн-Спринтер, Файлер 2.0.",
  keywords:
    "такском владивосток, эдо владивосток, электронная отчетность, документооборот, онлайн спринтер, файлер, 1с эдо, сдача отчетности",
  alternates: {
    canonical: "/edo",
  },
  openGraph: {
    title: "Такском ЭДО и электронная отчётность во Владивостоке",
    description: "Подключение к системе Такском: электронная отчётность и ЭДО с контрагентами.",
    type: "website",
    locale: "ru_RU",
    url: "/edo",
    siteName: "Uralliance",
  },
};

const REPORTING_TARIFFS = [
  {
    name: "Удобный",
    price: 5020,
    period: "год",
    description: "Для ИП и небольших ООО",
    features: ["ФНС + СФР", "10 исходящих ЭДО", "Проверка ошибок"],
  },
  {
    name: "Комфортный",
    price: 6080,
    period: "год",
    description: "С больничными листами",
    badge: "Популярный",
    features: ["ФНС + СФР", "100 исходящих ЭДО", "Больничные листы"],
  },
  {
    name: "Солидный",
    price: 7670,
    period: "год",
    description: "Все госорганы",
    features: ["Все госорганы", "200 исходящих ЭДО", "Проактив модуль"],
  },
];

const EDO_TARIFFS = [
  {
    name: "Старт",
    docs: 50,
    price: 1500,
    period: "год",
    description: "Для начинающих",
  },
  {
    name: "Базовый",
    docs: 300,
    price: 4500,
    period: "год",
    description: "Для малого бизнеса",
    badge: "Выгодный",
  },
  {
    name: "Бизнес",
    docs: 1000,
    price: 9000,
    period: "год",
    description: "Для среднего бизнеса",
  },
];

const ADVANTAGES = [
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Отчёты за минуты вместо часов",
  },
  {
    icon: Shield,
    title: "Юридическая сила",
    description: "Документы равнозначны бумажным",
  },
  {
    icon: HeadphonesIcon,
    title: "Техподдержка 24/7",
    description: "Помощь без выходных",
  },
  {
    icon: RefreshCw,
    title: "Роуминг",
    description: "Обмен между операторами ЭДО",
  },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "Онлайн-Спринтер",
    description: "Веб-сервис для сдачи отчётности во все госорганы",
    points: ["ФНС, СФР, Росстат, РПН", "Автопроверка ошибок", "Интеграция с 1С"],
  },
  {
    icon: FileText,
    title: "Файлер 2.0",
    description: "Обмен документами с контрагентами",
    points: ["УПД, счета-фактуры, акты", "Мобильное приложение", "Роуминг"],
  },
  {
    icon: Smartphone,
    title: "Мобильное приложение",
    description: "Подписывайте документы с телефона",
    points: ["iOS и Android", "Push-уведомления", "Подпись в любом месте"],
  },
];

export default function EdoPage() {
  return (
    <>
      <ServiceJsonLd
        name="Такском ЭДО и электронная отчётность"
        description="Подключение к системе электронного документооборота Такском во Владивостоке"
      />
      <BreadcrumbJsonLd
        items={[{ name: "Главная", url: "https://uralliance.ru" }, { name: "Такском ЭДО" }]}
      />

      {/* Hero Section */}
      <Section
        variant="page-hero"
        spacing="none"
        background="secondary"
        disableFirstSpacing
        className="pt-[calc(6rem+var(--promo-banner-height))] pb-16 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-20 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="tech" badgeStyle="subtle" className="tracking-widest uppercase">
                  ЭДО
                </Badge>
                <Badge variant="legal" badgeStyle="subtle" className="tracking-widest uppercase">
                  Отчётность
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold">
                Такском — электронная отчётность и документооборот
              </Heading>

              <Text size="lg" tone="secondary">
                Подключаем к системе Такском: сдавайте отчётность в ФНС, СФР, Росстат онлайн.
                Обменивайтесь документами с контрагентами в электронном виде.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/#contact">
                    <Send className="mr-2 h-5 w-5" />
                    Подключить Такском
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#prices">Смотреть тарифы</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">800K+</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    организаций в системе
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">24/7</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">техподдержка</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">30</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">дней бесплатно</div>
                </div>
              </div>
            </div>

            {/* Visual Showcase */}
            <div className="flex items-center justify-center">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-card-bg)] px-6 py-10 sm:px-10 sm:py-12">
                {/* Decorative background */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
                </div>

                <div className="relative space-y-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-tech-primary)] to-[var(--color-legal-primary)]">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Такском</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Федеральный оператор ЭДО
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {[
                      { icon: Building2, label: "ФНС, СФР, Росстат" },
                      { icon: FileText, label: "УПД и счета-фактуры" },
                      { icon: Smartphone, label: "Мобильное приложение" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-lg bg-[var(--color-background-secondary)]/50 px-4 py-2"
                      >
                        <item.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Advantages */}
      <Section spacing="md">
        <Container className="max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card key={item.title} variant="tech" padding="md" className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-surface)]">
                  <item.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
                </div>
                <Heading as="h3" size="sm" weight="semibold">
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

      {/* Features */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Возможности
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Что входит в Такском
            </Heading>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} variant="tech" padding="md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-surface)]">
                  <feature.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
                </div>
                <Heading as="h3" size="sm" weight="semibold">
                  {feature.title}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {feature.description}
                </Text>
                <ul className="mt-4 space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reporting Tariffs */}
      <Section spacing="md" id="prices">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Электронная отчётность
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Онлайн-Спринтер — сдача отчётности
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Отправляйте отчёты в ФНС, СФР, Росстат из браузера
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORTING_TARIFFS.map((item) => (
              <Card key={item.name} variant="tech" padding="md" className="flex flex-col">
                {/* Badge row */}
                <div className="mb-3 flex h-5 justify-end">
                  {item.badge && (
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-tech-surface)]">
                      <BarChart3 className="h-5 w-5 text-[var(--color-tech-primary)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Heading as="h3" size="sm" weight="semibold">
                        {item.name}
                      </Heading>
                      <Text size="sm" tone="secondary">
                        {item.description}
                      </Text>
                    </div>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-[var(--color-background-secondary)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold whitespace-nowrap text-[var(--color-tech-primary)]">
                        от {item.price.toLocaleString("ru-RU")}&nbsp;₽
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)]">
                        /{item.period}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* EDO Tariffs */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Документооборот
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Файлер 2.0 — обмен документами
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Отправляйте и получайте документы от контрагентов
            </Text>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
            {EDO_TARIFFS.map((item) => (
              <Card key={item.name} variant="legal" padding="md" className="flex flex-col">
                {/* Badge row */}
                <div className="mb-3 flex h-5 justify-end">
                  {item.badge && (
                    <Badge variant="legal" badgeStyle="filled" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-legal-surface)]">
                    <Send className="h-6 w-6 text-[var(--color-legal-primary)]" />
                  </div>
                  <Heading as="h3" size="sm" weight="semibold">
                    {item.name}
                  </Heading>
                  <Text size="sm" tone="secondary">
                    {item.docs} исходящих
                  </Text>
                  <div className="mt-3 text-2xl font-bold whitespace-nowrap text-[var(--color-legal-primary)]">
                    {item.price.toLocaleString("ru-RU")}&nbsp;₽
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">/{item.period}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Text size="sm" tone="secondary">
              Входящие документы — бесплатно. Роуминг с другими операторами — бесплатно.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Why EDO */}
      <Section spacing="md">
        <Container className="max-w-4xl">
          <Card variant="tech" padding="lg">
            <div className="text-center">
              <Heading as="h2" size="xl" weight="semibold">
                Почему электронный документооборот?
              </Heading>
              <Text size="lg" tone="secondary" className="mt-3">
                ЭДО экономит время и деньги
              </Text>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Экономия на бумаге", desc: "Нет расходов на печать, конверты, почту" },
                { title: "Мгновенная доставка", desc: "Документы доходят за секунды, а не дни" },
                { title: "Юридическая сила", desc: "Электронные документы = бумажным по закону" },
                { title: "Надёжное хранение", desc: "Документы хранятся в облаке 5+ лет" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-tech-primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card variant="tech" padding="lg" className="text-center">
            <Badge variant="tech" badgeStyle="filled" className="mb-4">
              30 дней бесплатно
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы подключить Такском?
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Оставьте заявку — подберём тариф и настроим систему за 1 день
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-tech" size="lg">
                <Link href="/#contact">Оставить заявку</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="tel:+74232028878">Позвонить</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
