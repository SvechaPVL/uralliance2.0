import { getServicesByCategory } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { List } from "@/components/primitives/list";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

/**
 * Services Category Page
 *
 * Displays all services for a specific category (legal or tech)
 * Uses dynamic routing: /services/legal/ or /services/tech/
 */

interface ServicesCategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for both categories
export function generateStaticParams() {
  return [{ category: "legal" }, { category: "tech" }];
}

// Generate metadata for the page
export async function generateMetadata({ params }: ServicesCategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (category !== "legal" && category !== "tech") {
    return {};
  }

  const isLegal = category === "legal";

  return {
    title: isLegal ? "Юридические услуги | Uralliance" : "IT-услуги и разработка | Uralliance",
    description: isLegal
      ? "Профессиональные юридические услуги для бизнеса: арбитражные споры, корпоративное право, налоговое консультирование"
      : "Разработка сайтов, мобильных приложений, интеграция CRM-систем и автоматизация бизнес-процессов",
    keywords: isLegal
      ? "юридические услуги екатеринбург, юрист для бизнеса, арбитражный суд"
      : "разработка сайтов екатеринбург, создание crm, it-услуги",
  };
}

const HERO_CONFIG = {
  legal: {
    eyebrow: "Legal Practice",
    title: "Юридические услуги Uralliance",
    description:
      "Представляем бизнес в арбитражных судах, решаем налоговые вопросы, регистрируем юрлица и сопровождаем бухгалтерию как официальный представитель «Вестника государственной регистрации» во Владивостоке.",
    primaryCta: { href: "/#contact", label: "Запросить правовой аудит" },
    highlights: [
      { label: "Арбитражная практика", value: "22+ года" },
      { label: "Налоговые споры", value: "50+/год" },
      { label: "Вестник Госрегистрации", value: "Официальный представитель" },
    ],
    supporting: [
      "Представляем в арбитраже и судах общей юрисдикции от претензии до исполнительного производства.",
      "Готовим к камеральным и выездным налоговым проверкам, сопровождаем коммуникацию с ФНС и обжалования.",
      "Регистрируем и реорганизуем юридические лица, готовим публикации и изменения в ЕГРЮЛ.",
      "Ведём бухгалтерское обслуживание и работаем как официальные представители «Вестника государственной регистрации» во Владивостоке.",
    ],
  },
  tech: {
    eyebrow: "Tech Practice",
    title: "Digital-решения Uralliance",
    description:
      "Разрабатываем сайты на Next.js, внедряем CRM, строим ботов и интеграции для ускорения продаж и сервисов.",
    primaryCta: { href: "/#contact", label: "Получить план работ" },
    highlights: [
      { label: "Срок запуска", value: "до 30 дней" },
      { label: "Интеграций 1С/CRM", value: "30+" },
      { label: "Поддержка", value: "24/7" },
    ],
    supporting: [
      "Проводим диагностическую сессию и описываем требования простым языком.",
      "Используем современные технологии: Next.js, Telegram API, WhatsApp, Bitrix24, 1С.",
      "Передаём инструкции, обучаем команду и показываем прогресс каждую неделю.",
    ],
  },
} as const;

const SERVICE_BULLETS = {
  legal: [
    "Представительство в арбитражных судах и сопровождение исполнения решений",
    "Налоговая защита бизнеса и поддержка во время проверок",
    "Регистрация юрлиц, бухгалтерское обслуживание и публикации в «Вестнике государственной регистрации»",
  ],
  tech: [
    "Сайты, CRM и клиентские порталы",
    "Интеграции с 1С, мессенджерами и BI",
    "Автоматизация процессов продаж",
  ],
} as const;

export default async function ServicesCategoryPage({ params }: ServicesCategoryPageProps) {
  const { category } = await params;

  // Validate category
  if (category !== "legal" && category !== "tech") {
    notFound();
  }

  const services = await getServicesByCategory(category);
  const isLegal = category === "legal";
  const hero = HERO_CONFIG[category];

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: isLegal ? "Юридические услуги" : "IT-решения" },
        ]}
      />

      {/* Hero */}
      <Section
        variant="page-hero"
        spacing="none"
        isolate
        overflow="hidden"
        disableFirstSpacing
        className="pt-[calc(6rem+var(--promo-banner-height))] pb-12 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-16 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-20"
      >
        <Container className="space-y-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
            <div className="space-y-6">
              <Badge variant={isLegal ? "legal" : "tech"} badgeStyle="subtle" size="sm">
                {hero.eyebrow}
              </Badge>
              <Heading as="h1" size="2xl" weight="semibold">
                {hero.title}
              </Heading>
              <Text size="lg" tone="secondary" className="sm:text-xl">
                {hero.description}
              </Text>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant={isLegal ? "primary-legal" : "primary-tech"} size="md">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {hero.highlights.map((highlight) => (
                  <Card
                    key={highlight.label}
                    variant={isLegal ? "legal" : "tech"}
                    className="p-5 text-center"
                  >
                    <Text size="2xl" weight="semibold" className="text-3xl">
                      {highlight.value}
                    </Text>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {highlight.label}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>
            <Card variant={isLegal ? "legal" : "tech"} className="space-y-4 p-8">
              <Heading as="h2" size="lg" weight="semibold">
                {isLegal ? "Юридическое сопровождение" : "Цифровая реализация"}
              </Heading>
              <List
                variant="feature"
                spacing="md"
                className="text-sm text-[var(--color-text-secondary)]"
              >
                {hero.supporting.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
              <Card variant={isLegal ? "legal" : "tech"} className="border-dashed p-4">
                <Text size="sm" tone="secondary">
                  {isLegal
                    ? "Фиксируем условия договором и защищаем результаты юридически на каждом этапе."
                    : "Выделяем отдельную команду, ведём понятный список задач и синхронизируемся каждую неделю."}
                </Text>
              </Card>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section spacing="sm" background="secondary" bordered>
        <Container className="grid gap-6 md:grid-cols-3">
          {SERVICE_BULLETS[category].map((bullet) => (
            <Card key={bullet} variant={isLegal ? "legal" : "tech"} className="p-6">
              <Label size="md" spacing="wider" tone="muted">
                {isLegal ? "Юридический фокус" : "Цифровой фокус"}
              </Label>
              <Text size="lg" weight="semibold" className="mt-2">
                {bullet}
              </Text>
            </Card>
          ))}
        </Container>
      </Section>

      {/* Services grid */}
      <Section spacing="md">
        <Container className="space-y-10">
          <div className="space-y-4 text-center">
            <Heading as="h2" size="2xl" weight="semibold">
              {isLegal ? "Комплексные юридические решения" : "Решения для цифровой трансформации"}
            </Heading>
            <Text size="lg" tone="secondary">
              Подберите услугу и получите расширенный бриф. Каждое направление ведет выделенная
              команда.
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.slug}
                variant={isLegal ? "legal" : "tech"}
                hoverable
                className="flex h-full flex-col gap-6 p-6"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant={isLegal ? "legal" : "tech"}
                    badgeStyle="subtle"
                    size="sm"
                    className="tracking-[0.2em] uppercase"
                  >
                    {isLegal ? "Legal" : "Tech"}
                  </Badge>
                  <Link
                    href="/contacts"
                    className="text-sm font-semibold text-[var(--color-tech-primary)] transition-colors hover:text-white"
                  >
                    Узнать стоимость →
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <ServiceIcon
                      name={service.frontmatter.icon}
                      variant={isLegal ? "legal" : "tech"}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Heading as="h3" size="lg" weight="semibold">
                      {service.frontmatter.title}
                    </Heading>
                    <Text size="sm" tone="secondary">
                      {service.frontmatter.description}
                    </Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label size="sm" spacing="wider" tone="muted">
                      Базовый бюджет
                    </Label>
                    <Text size="lg" weight="semibold" tone="primary">
                      {service.frontmatter.price}
                    </Text>
                  </div>
                  <List
                    variant="checkmark"
                    spacing="sm"
                    className="text-sm text-[var(--color-text-secondary)]"
                  >
                    <li>Ведение команды {isLegal ? "юристов" : "разработчиков"}</li>
                    <li>Промежуточные отчёты каждую неделю</li>
                  </List>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <Link
                    href={`/services/${category}/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-white"
                  >
                    Подробнее о пакете
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="md" className="pt-0 pb-20">
        <Container>
          <Card variant={isLegal ? "legal" : "tech"} padding="lg" className="text-center">
            <div className="space-y-6">
              <Label size="md" spacing="wider" tone="muted">
                Следующий шаг
              </Label>
              <Heading as="h3" size="lg" weight="semibold">
                Получите персональную консультацию
              </Heading>
              <Text size="lg" tone="secondary">
                Расскажите о задаче — соберем команду, подготовим бэклог и бюджет за два рабочих
                дня.
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="primary-tech" size="md">
                  <Link href="/contacts">Связаться</Link>
                </Button>
                <Button asChild variant="outline" size="md">
                  <Link href="/price">Прайс-лист</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
