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
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Banknote,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Users,
  FileText,
  Handshake,
  Sparkles,
  BadgePercent,
  Wallet,
  Receipt,
  ExternalLink,
} from "lucide-react";
import { SberbankBanner } from "./SberbankBanner";

export const metadata: Metadata = {
  title: "Кредиты для бизнеса от Сбербанка — партнёрская программа | Юральянс",
  description:
    "Кредиты и финансовые продукты для бизнеса от Сбербанка через партнёрскую программу Деловая среда. Юральянс — официальный агент. Помощь в подборе продукта, сопровождение заявки.",
  keywords:
    "кредит для бизнеса владивосток, кредит сбербанк ип, кредит ооо сбербанк, деловая среда, бизнес кредит приморский край, расчетный счет сбербанк, эквайринг сбербанк",
  alternates: {
    canonical: "/sberbank",
  },
  openGraph: {
    title: "Кредиты для бизнеса от Сбербанка — партнёрская программа",
    description:
      "Финансовые продукты Сбербанка для ИП и ООО через Деловую среду. Помощь в оформлении.",
    type: "website",
    locale: "ru_RU",
    url: "/sberbank",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const PRODUCTS = [
  {
    icon: Banknote,
    title: "Кредит на любые цели",
    description: "Финансирование развития бизнеса, пополнения оборотных средств, закупки оборудования",
    features: ["До 50 млн ₽", "Ставка от 16%", "До 5 лет"],
  },
  {
    icon: CreditCard,
    title: "Бизнес-карта",
    description: "Корпоративная карта с кредитным лимитом и кэшбэком на бизнес-расходы",
    features: ["Лимит до 3 млн ₽", "Кэшбэк до 10%", "Грейс-период 50 дней"],
  },
  {
    icon: Receipt,
    title: "Расчётный счёт",
    description: "РКО с бесплатным обслуживанием для стартапов и выгодными тарифами для бизнеса",
    features: ["0 ₽ открытие", "Бесплатный тариф", "Эквайринг от 1,5%"],
  },
  {
    icon: PiggyBank,
    title: "Депозит для юрлиц",
    description: "Размещение свободных средств компании под выгодный процент",
    features: ["Ставка до 18%", "От 100 000 ₽", "Гибкие сроки"],
  },
  {
    icon: TrendingUp,
    title: "Инвестиционный кредит",
    description: "Финансирование капитальных вложений, покупки недвижимости и оборудования",
    features: ["До 200 млн ₽", "До 10 лет", "Отсрочка погашения"],
  },
  {
    icon: Wallet,
    title: "Овердрафт",
    description: "Кредитный лимит на расчётном счёте для покрытия кассовых разрывов",
    features: ["До 30% от оборота", "Без залога", "Мгновенное использование"],
  },
];

const ADVANTAGES = [
  {
    icon: Shield,
    title: "Официальный агент",
    description: "Работаем по агентскому договору с АО «Деловая среда» — партнёром Сбербанка",
  },
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Подберём подходящий продукт, поможем собрать документы и подать заявку",
  },
  {
    icon: Users,
    title: "Персональный менеджер",
    description: "Сопровождаем на всех этапах от заявки до получения финансирования",
  },
  {
    icon: Handshake,
    title: "Комплексный подход",
    description: "Юридическое сопровождение + финансовые услуги — всё в одном месте",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Консультация",
    description: "Расскажите о своём бизнесе и потребностях — подберём оптимальный продукт",
  },
  {
    step: 2,
    title: "Документы",
    description: "Поможем собрать необходимый пакет документов для заявки",
  },
  {
    step: 3,
    title: "Заявка",
    description: "Подадим заявку через систему Деловой среды с приоритетным рассмотрением",
  },
  {
    step: 4,
    title: "Получение",
    description: "Сопроводим до получения средств и поможем с оформлением",
  },
];

const WHO_CAN_APPLY = [
  {
    icon: Building2,
    title: "ООО и АО",
    description: "Организации с оборотом от 120 000 ₽ в год",
  },
  {
    icon: FileText,
    title: "ИП",
    description: "Индивидуальные предприниматели с историей от 3 месяцев",
  },
  {
    icon: Users,
    title: "Самозанятые",
    description: "Плательщики НПД для отдельных продуктов",
  },
];

// Реферальная ссылка из партнёрской программы Деловой среды
const REFERRAL_LINK = "https://partners.dasreda.ru/landing/products?partnerID=61dfc7384e62472725c2";

export default function SberbankPage() {
  return (
    <>
      <ServiceJsonLd
        name="Кредиты для бизнеса от Сбербанка"
        description="Финансовые продукты Сбербанка для ИП и ООО через партнёрскую программу Деловая среда"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Партнёры", url: "https://uralliance.ru/partners" },
          { name: "Сбербанк Бизнес" },
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
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#21a038]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#21a038]/5 blur-3xl" />

        <Container className="relative max-w-6xl">
          <Breadcrumb className="mb-6" />

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="legal"
                  badgeStyle="outline"
                  className="gap-1.5 border-[#21a038]/50 font-semibold text-[#21a038]"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Официальный агент
                </Badge>
                <Badge
                  variant="legal"
                  badgeStyle="subtle"
                  className="bg-[#21a038]/10 tracking-wider uppercase text-[#21a038]"
                >
                  Деловая среда
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                Кредиты для <span className="text-[#21a038]">бизнеса</span> от Сбербанка
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Финансовые продукты Сбербанка для ИП и ООО через партнёрскую программу
                «Деловая среда». Поможем подобрать оптимальный продукт и сопроводим
                на всех этапах оформления.
              </Text>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  variant="primary-legal"
                  size="lg"
                  className="bg-[#21a038] hover:bg-[#1a8030]"
                >
                  <a
                    href={REFERRAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Banknote className="mr-2 h-5 w-5" />
                    Подать заявку
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#contact">
                    Получить консультацию
                  </Link>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-6 pt-4 lg:justify-start">
                {[
                  { value: "от 16%", label: "ставка" },
                  { value: "до 200 млн", label: "сумма кредита" },
                  { value: "1-3 дня", label: "решение" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-xl font-bold text-[#21a038]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Banner */}
            <div className="flex justify-center lg:justify-end">
              <SberbankBanner referralLink={REFERRAL_LINK} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Partner Notice */}
      <Section spacing="md">
        <Container className="max-w-5xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-2 border-[#21a038]/30 bg-gradient-to-br from-[#21a038]/5 to-transparent"
          >
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#21a038]/10 blur-2xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#21a038]/10">
                  <Handshake className="h-6 w-6 text-[#21a038]" />
                </div>
                <div>
                  <Heading as="h2" size="lg" weight="semibold">
                    Официальное партнёрство
                  </Heading>
                  <Text tone="secondary" className="mt-2 max-w-2xl">
                    ООО «ЮрАльянс» является официальным агентом АО «Деловая среда» —
                    дочерней компании ПАО Сбербанк. Мы помогаем предпринимателям Приморского края
                    получить доступ к финансовым продуктам Сбербанка с персональным сопровождением.
                  </Text>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-[#21a038]/30 bg-[#21a038]/5 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#21a038]" />
                  <span className="text-sm font-medium">Агентский договор с Деловой средой</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#21a038]" />
                  <span className="text-sm font-medium">Соответствие ФЗ о рекламе</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#21a038]" />
                  <span className="text-sm font-medium">Приоритетное рассмотрение</span>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Products */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Продукты
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Финансовые решения для бизнеса
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Широкий спектр продуктов Сбербанка для развития вашего бизнеса
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <Card
                key={product.title}
                variant="legal"
                padding="md"
                className="group transition-all hover:scale-[1.02] hover:border-[#21a038]/40"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#21a038] bg-[#21a038]/10">
                      <product.icon className="h-5 w-5 text-[#21a038]" />
                    </div>
                    <div className="flex-1">
                      <Heading as="h3" size="sm" weight="semibold">
                        {product.title}
                      </Heading>
                    </div>
                  </div>

                  <Text size="sm" tone="secondary">
                    {product.description}
                  </Text>

                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="legal"
                        badgeStyle="subtle"
                        size="sm"
                        className="bg-[#21a038]/10 text-[#21a038]"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="primary-legal"
              size="lg"
              className="bg-[#21a038] hover:bg-[#1a8030]"
            >
              <a
                href={REFERRAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Смотреть все продукты
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Who Can Apply */}
      <Section spacing="md">
        <Container className="max-w-5xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Для кого
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Кто может подать заявку
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {WHO_CAN_APPLY.map((item) => (
              <Card key={item.title} variant="legal" padding="md" className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#21a038] bg-[#21a038]/10">
                  <item.icon className="h-6 w-6 text-[#21a038]" />
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

      {/* Why Us */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Преимущества
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Почему через нас
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card key={item.title} variant="legal" padding="md" className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#21a038] bg-[#21a038]/10">
                  <item.icon className="h-6 w-6 text-[#21a038]" />
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
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Как получить финансирование
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              4 простых шага — от консультации до получения средств
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[#21a038]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#21a038] bg-gradient-to-br from-[#21a038]/10 to-[var(--color-card-bg)] shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                        <span className="text-3xl font-bold text-[#21a038]">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="max-w-[200px] space-y-2">
                      <Heading
                        as="h3"
                        size="sm"
                        weight="bold"
                        className="text-[#21a038]"
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
                      <ArrowRight className="h-5 w-5 text-[#21a038]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Legal Services Cross-sell */}
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
                  <Sparkles className="h-3.5 w-3.5" />
                  Дополнительно
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Юридическое сопровождение бизнеса
                </Heading>
                <Text tone="secondary">
                  Помимо финансовых продуктов, мы предлагаем полный спектр юридических услуг
                  для бизнеса: регистрация ООО и ИП, бухгалтерское сопровождение,
                  публикации в Федресурсе и Вестнике.
                </Text>
                <ul className="space-y-2">
                  {[
                    "Регистрация ООО и ИП",
                    "Ликвидация под ключ",
                    "Публикации в Федресурсе",
                    "Бухгалтерское сопровождение",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-legal-primary)]" />
                      <Text size="sm">{item}</Text>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="primary-legal">
                  <Link href="/services/legal">
                    Юридические услуги
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex justify-center">
                <div className="rounded-2xl border border-[var(--color-legal-primary)]/20 bg-[var(--color-legal-surface)]/30 p-6 text-center">
                  <div className="mb-2 text-sm text-[var(--color-text-secondary)]">
                    Регистрация ООО
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-[var(--color-legal-primary)]">
                      от 5 000
                    </span>
                    <span className="text-xl text-[var(--color-text-secondary)]">₽</span>
                  </div>
                  <div className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    Подготовка документов + подача
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
          <Card
            variant="legal"
            padding="lg"
            className="border-[#21a038]/30 text-center"
          >
            <Badge
              variant="legal"
              badgeStyle="outline"
              className="mb-4 gap-1.5 border-[#21a038]/50 font-semibold text-[#21a038]"
            >
              <BadgePercent className="h-3.5 w-3.5" />
              Специальные условия
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы получить финансирование?
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
              Оставьте заявку через партнёрскую программу или получите бесплатную консультацию
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="primary-legal"
                size="lg"
                className="bg-[#21a038] hover:bg-[#1a8030]"
              >
                <a
                  href={REFERRAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Подать заявку
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={contacts.phone.main.link}>Позвонить</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Disclaimer */}
      <Section spacing="sm" className="border-t border-[var(--color-border)]">
        <Container className="max-w-4xl">
          <Text size="xs" tone="muted" className="text-center leading-relaxed">
            Реклама. АО «Деловая среда». ИНН 7736641983. ОГРН 1127746271196.
            Не является публичной офертой. Условия кредитования уточняйте на сайте
            partners.dasreda.ru. Одобрение кредита не гарантируется, решение принимается
            банком индивидуально.
          </Text>
        </Container>
      </Section>
    </>
  );
}
