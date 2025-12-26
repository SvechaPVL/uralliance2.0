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
  FileText,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  Users,
  MapPin,
  PenTool,
  AlertTriangle,
  Rocket,
  Award,
  Briefcase,
  CreditCard,
  Globe,
  FileCheck,
  UserPlus,
  RefreshCw,
  Search,
  Landmark,
  CircleDollarSign,
  Sparkles,
  Gift,
  Code2,
  Scale,
  Handshake,
  ClipboardCheck,
  Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Регистрация ООО во Владивостоке за 3 дня — от 5 000₽ | Юральянс",
  description:
    "Регистрация ООО во Владивостоке под ключ. Юральянс: корпоративное право, сделки M&A, корпоративные споры, абонентское юридическое обслуживание. Опыт 22+ лет. Открыть ООО от 5 000₽.",
  keywords:
    "регистрация ооо владивосток, открыть ооо владивосток, корпоративный юрист владивосток, корпоративное право владивосток, юридическое сопровождение бизнеса, сделки m&a, абонентское обслуживание юрист, юральянс регистрация, зарегистрировать фирму владивосток",
  alternates: {
    canonical: "/corporate",
  },
  openGraph: {
    title: "Корпоративное право — регистрация ООО, M&A, споры",
    description:
      "Полное юридическое сопровождение бизнеса: регистрация ООО, сделки с долями, корпоративные споры, абонентское обслуживание. Опыт 22+ лет.",
    type: "website",
    locale: "ru_RU",
    url: "/corporate",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const SERVICES = [
  {
    id: "registration",
    icon: Building2,
    title: "Регистрация ООО",
    description: "Полное сопровождение создания компании от А до Я",
    price: "от 5 000 ₽",
    features: [
      "Подготовка полного пакета документов",
      "Подача в ФНС электронно (без госпошлины)",
      "Получение готовых документов",
      "Консультация по выбору ОКВЭД",
      "Помощь в открытии расчетного счета",
    ],
    timing: "3 рабочих дня",
    popular: true,
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Внесение изменений",
    description: "Смена адреса, директора, учредителей, кодов ОКВЭД",
    price: "от 3 500 ₽",
    features: [
      "Смена юридического адреса",
      "Смена генерального директора",
      "Изменение состава учредителей",
      "Добавление/удаление ОКВЭД",
      "Изменение уставного капитала",
    ],
    timing: "5 рабочих дней",
    popular: false,
  },
  {
    id: "address",
    icon: MapPin,
    title: "Юридический адрес",
    description: "Аренда адреса для регистрации или перерегистрации",
    price: "от 12 000 ₽/год",
    features: [
      "Договор аренды от собственника",
      "Гарантийное письмо",
      "Почтовое обслуживание",
      "Приём проверок ФНС и банков",
      "Гарантия от отказа в регистрации",
    ],
    timing: "1 день",
    popular: false,
  },
  {
    id: "fix",
    icon: AlertTriangle,
    title: "Исправление недостоверности",
    description: "Убираем отметку о недостоверных сведениях в ЕГРЮЛ",
    price: "от 8 000 ₽",
    features: [
      "Анализ причин недостоверности",
      "Подготовка формы Р13014",
      "Сбор подтверждающих документов",
      "Подача и получение результата",
      "Консультация по предотвращению",
    ],
    timing: "5-7 рабочих дней",
    popular: false,
  },
  {
    id: "contracts",
    icon: Handshake,
    title: "Корпоративные договоры",
    description: "Акционерные соглашения, сделки с долями и M&A",
    price: "от 20 000 ₽",
    features: [
      "Договоры купли-продажи долей",
      "Акционерные соглашения",
      "Сопровождение сделок M&A",
      "Due Diligence компании",
      "Опционные соглашения",
    ],
    timing: "от 7 дней",
    popular: false,
  },
  {
    id: "disputes",
    icon: Scale,
    title: "Корпоративные споры",
    description: "Защита прав участников, учредителей и директоров",
    price: "от 50 000 ₽",
    features: [
      "Споры между участниками",
      "Оспаривание решений собраний",
      "Защита от рейдерских захватов",
      "Исключение участника из ООО",
      "Взыскание убытков с директора",
    ],
    timing: "от 3 месяцев",
    popular: false,
  },
  {
    id: "subscription",
    icon: Headphones,
    title: "Абонентское обслуживание",
    description: "Постоянная юридическая поддержка вашего бизнеса",
    price: "от 30 000 ₽/мес",
    features: [
      "Консультации без ограничений",
      "Подготовка договоров и документов",
      "Представительство в госорганах",
      "Проверка контрагентов",
      "Выделенный юрист",
    ],
    timing: "постоянно",
    popular: false,
  },
  {
    id: "audit",
    icon: ClipboardCheck,
    title: "Корпоративный аудит",
    description: "Проверка документов и выявление рисков компании",
    price: "от 50 000 ₽",
    features: [
      "Аудит учредительных документов",
      "Проверка корпоративных решений",
      "Анализ трудовых отношений",
      "Оценка налоговых рисков",
      "Рекомендации по устранению",
    ],
    timing: "от 5 дней",
    popular: false,
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Консультация",
    description: "Обсуждаем вашу ситуацию, определяем оптимальную форму и структуру бизнеса",
    icon: Users,
  },
  {
    step: 2,
    title: "Подготовка документов",
    description: "Готовим полный пакет: устав, решение, заявление, договор об учреждении",
    icon: FileText,
  },
  {
    step: 3,
    title: "Подача в ФНС",
    description: "Подаём документы электронно по ЭЦП — госпошлина 0 ₽",
    icon: Rocket,
  },
  {
    step: 4,
    title: "Получение документов",
    description: "Через 3 дня получаете лист записи ЕГРЮЛ и устав с отметкой ФНС",
    icon: FileCheck,
  },
  {
    step: 5,
    title: "Открытие счёта",
    description: "Помогаем открыть расчетный счет на партнерских условиях",
    icon: CreditCard,
  },
];

const CHANGE_TYPES = [
  { icon: MapPin, title: "Смена адреса", price: "от 3 500 ₽" },
  { icon: UserPlus, title: "Смена директора", price: "от 3 500 ₽" },
  { icon: Users, title: "Смена учредителей", price: "от 5 000 ₽" },
  { icon: Briefcase, title: "Изменение ОКВЭД", price: "от 2 500 ₽" },
  { icon: CircleDollarSign, title: "Уставный капитал", price: "от 4 000 ₽" },
  { icon: PenTool, title: "Изменение устава", price: "от 4 000 ₽" },
];

const ADVANTAGES = [
  {
    icon: Clock,
    title: "Быстро",
    description: "Регистрация за 3 дня, изменения за 5 дней",
  },
  {
    icon: Shield,
    title: "Надёжно",
    description: "22+ года опыта, тысячи успешных регистраций",
  },
  {
    icon: Zap,
    title: "Электронно",
    description: "Подача по ЭЦП — экономия на госпошлине",
  },
  {
    icon: Award,
    title: "Под ключ",
    description: "От консультации до открытия счета",
  },
];

const BANK_PARTNERS = ["Сбер", "Тинькофф", "Альфа-Банк", "ВТБ", "Точка", "Модульбанк"];

export default function RegistrationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Корпоративное право"
        description="Полное сопровождение регистрации ООО и внесения изменений в ЕГРЮЛ во Владивостоке — от подготовки документов до открытия расчетного счета"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Юридические услуги", url: "https://uralliance.ru/services/legal" },
          { name: "Корпоративное право" },
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
          <Breadcrumb className="mb-6" />

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
                <span className="text-[var(--color-legal-primary)]">Корпоративное право</span> во
                Владивостоке
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Полное сопровождение бизнеса: регистрация ООО за 3 дня, сделки с долями,
                корпоративные споры, абонентское обслуживание. Вы занимаетесь бизнесом — юридические
                вопросы решаем мы.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-legal" size="lg" className="gap-2">
                  <Link href="/#contact">
                    Открыть компанию
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline-legal" size="lg">
                  <a href={`tel:${contacts.phone.main.raw}`}>{contacts.phone.main.display}</a>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">3 дня</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">регистрация</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">0 ₽</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">госпошлина</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">1000+</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">компаний открыто</div>
                </div>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <Card variant="legal" className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-legal-primary)]/20">
                    <Building2 className="h-6 w-6 text-[var(--color-legal-primary)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      Регистрация ООО
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Всё включено</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Подготовка устава и решения",
                    "Выбор оптимальных ОКВЭД",
                    "Подача документов в ФНС",
                    "Получение листа записи ЕГРЮЛ",
                    "Помощь с открытием счёта",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-legal-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-[var(--color-border)] pt-6">
                  <div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Стоимость</div>
                    <div className="text-3xl font-bold text-[var(--color-legal-primary)]">
                      от 5 000 ₽
                    </div>
                  </div>
                  <Badge variant="legal" badgeStyle="filled" className="gap-1">
                    <Clock className="h-3 w-3" />3 дня
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cross-sell Promo Banner */}
      <Section spacing="none" background="secondary" className="pb-16 sm:pb-20">
        <Container className="max-w-6xl">
          <Card className="relative overflow-hidden border-[var(--color-tech-primary)]/30 bg-gradient-to-r from-[var(--color-card-bg)] via-[var(--color-tech-surface)]/30 to-[var(--color-card-bg)] p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-tech-primary)]/20 blur-2xl" />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-tech-primary)]/20">
                  <Gift className="h-7 w-7 text-[var(--color-tech-primary)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Heading as="h3" size="lg" weight="semibold">
                      Скидка 10% на IT-услуги
                    </Heading>
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      Акция
                    </Badge>
                  </div>
                  <Text tone="secondary" className="mt-1">
                    При регистрации компании — скидка на создание сайта, CRM или чат-бота
                  </Text>
                </div>
              </div>

              <Button asChild variant="primary-tech" size="lg" className="shrink-0 gap-2">
                <Link href="/services/tech">
                  <Code2 className="h-4 w-4" />
                  Смотреть услуги
                </Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="legal" badgeStyle="subtle" className="mb-4">
              Услуги
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Что мы делаем
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Полный спектр услуг по регистрации и сопровождению юридических лиц
            </Text>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Card key={service.id} variant="legal" className="relative overflow-hidden p-6">
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="legal" badgeStyle="filled" size="sm">
                      Популярно
                    </Badge>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-legal-primary)]/20">
                    <service.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
                  </div>
                  <div>
                    <Heading as="h3" size="lg" weight="semibold">
                      {service.title}
                    </Heading>
                    <Text size="sm" tone="secondary">
                      {service.description}
                    </Text>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-legal-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <div className="text-xl font-bold text-[var(--color-legal-primary)]">
                    {service.price}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                    <Clock className="h-4 w-4" />
                    {service.timing}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Change Types Grid */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="legal" badgeStyle="subtle" className="mb-4">
              Изменения в ЕГРЮЛ
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Виды изменений
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Оперативно вносим любые изменения в учредительные документы и ЕГРЮЛ
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANGE_TYPES.map((item, i) => (
              <Card key={i} variant="legal" className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-legal-primary)]/20">
                  <item.icon className="h-5 w-5 text-[var(--color-legal-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--color-text-primary)]">{item.title}</div>
                  <div className="text-sm text-[var(--color-legal-primary)]">{item.price}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline-legal" size="lg">
              <Link href="/#contact">
                Заказать изменения
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="legal" badgeStyle="subtle" className="mb-4">
              Процесс
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Как мы работаем
            </Heading>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute top-6 left-1/2 hidden h-0.5 w-full bg-[var(--color-border)] md:block" />
                )}
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-legal-primary)] text-white">
                  <step.icon className="h-5 w-5" />
                </div>
                <Heading as="h3" size="md" weight="semibold" className="mb-2">
                  {step.title}
                </Heading>
                <Text size="sm" tone="secondary">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bank Partners */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="legal" badgeStyle="subtle" className="mb-4">
              <Landmark className="h-3 w-3" />
              Партнёры
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Открытие расчётного счёта
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Помогаем открыть счёт в ведущих банках на партнерских условиях — бесплатное
              обслуживание до 3 месяцев и другие бонусы
            </Text>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {BANK_PARTNERS.map((bank) => (
              <div
                key={bank}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-6 py-3 text-lg font-medium text-[var(--color-text-primary)]"
              >
                {bank}
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl">
            <Card variant="legal" className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-legal-primary)]/20">
                  <CreditCard className="h-7 w-7 text-[var(--color-legal-primary)]" />
                </div>
              </div>
              <Heading as="h3" size="lg" weight="semibold" className="mb-2">
                Бесплатная помощь с открытием счёта
              </Heading>
              <Text tone="secondary" className="mb-4">
                Подберём банк под ваши задачи, поможем собрать документы и сопроводим до открытия
                счёта
              </Text>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="legal" badgeStyle="subtle">
                  <Sparkles className="h-3 w-3" />
                  Партнёрские тарифы
                </Badge>
                <Badge variant="legal" badgeStyle="subtle">
                  <Clock className="h-3 w-3" />
                  Открытие за 1 день
                </Badge>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Advantages */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="legal" badgeStyle="subtle" className="mb-4">
              Преимущества
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Почему выбирают нас
            </Heading>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item, i) => (
              <Card key={i} variant="legal" className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-legal-primary)]/20">
                  <item.icon className="h-7 w-7 text-[var(--color-legal-primary)]" />
                </div>
                <Heading as="h3" size="lg" weight="semibold" className="mb-2">
                  {item.title}
                </Heading>
                <Text size="sm" tone="secondary">
                  {item.description}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Warning Section */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card className="border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <Heading as="h3" size="lg" weight="semibold" className="mb-2 text-amber-400">
                  Недостоверные сведения в ЕГРЮЛ?
                </Heading>
                <Text tone="secondary" className="mb-4">
                  Если ФНС внесла отметку о недостоверности данных — это серьёзно. Без исправления в
                  течение 6 месяцев компанию могут принудительно ликвидировать, а директора —
                  дисквалифицировать.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline-legal" size="sm">
                    <Link href="/#contact">Исправить недостоверность</Link>
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                    <Clock className="h-4 w-4" />
                    Срок исправления: 5-7 дней
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="default">
        <Container className="max-w-4xl">
          <Card variant="legal" className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-legal-primary)]/20">
              <Rocket className="h-8 w-8 text-[var(--color-legal-primary)]" />
            </div>
            <Heading as="h2" size="2xl" weight="bold" className="mb-4">
              Готовы открыть бизнес?
            </Heading>
            <Text tone="secondary" size="lg" className="mx-auto mb-8 max-w-xl">
              Оставьте заявку — перезвоним в течение 15 минут, ответим на вопросы и рассчитаем
              точную стоимость
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-legal" size="lg" className="gap-2">
                <Link href="/#contact">
                  Оставить заявку
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline-legal" size="lg">
                <a href={`tel:${contacts.phone.main.raw}`}>{contacts.phone.main.display}</a>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
