import { defaultOgImage } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Clock,
  Zap,
  Users,
  Brain,
  Sparkles,
  MessageSquare,
  FileText,
  TrendingUp,
  Target,
  BookOpen,
  Lightbulb,
  Briefcase,
  Award,
  UserCheck,
  Rocket,
  Gift,
  Scale,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Обучение работе с ИИ | Курсы ChatGPT для бизнеса | Uralliance Владивосток",
  description:
    "Обучение сотрудников работе с ChatGPT, YandexGPT и нейросетями во Владивостоке. Корпоративные курсы, промпт-инжиниринг, автоматизация задач. От 15 000 ₽.",
  keywords:
    "обучение chatgpt владивосток, курсы нейросети для бизнеса, обучение ии владивосток, курсы искусственный интеллект, промпт инжиниринг курсы, yandexgpt обучение, корпоративное обучение нейросетям",
  alternates: {
    canonical: "/ai-training",
  },
  openGraph: {
    title: "Обучение работе с ИИ — курсы ChatGPT для бизнеса",
    description:
      "Научим сотрудников использовать нейросети для ускорения работы. ChatGPT, YandexGPT, GigaChat. Корпоративные курсы от 15 000 ₽.",
    type: "website",
    locale: "ru_RU",
    url: "/ai-training",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const COURSES = [
  {
    id: "consultation",
    icon: MessageSquare,
    title: "Индивидуальная консультация",
    description: "Разбираем ваши конкретные задачи и показываем решения",
    price: "от 5 000 ₽",
    features: [
      "1-2 часа онлайн или очно",
      "Разбор ваших реальных задач",
      "Готовые промпты под вашу работу",
      "Запись консультации",
    ],
    timing: "1-2 часа",
    popular: false,
  },
  {
    id: "intensive",
    icon: Zap,
    title: "Групповой интенсив",
    description: "Обучение команды за один день с практикой",
    price: "от 15 000 ₽",
    features: [
      "4-8 часов обучения",
      "До 10 человек в группе",
      "Практика на ваших кейсах",
      "Библиотека промптов",
      "Сертификаты участникам",
    ],
    timing: "1 день",
    popular: true,
  },
  {
    id: "corporate",
    icon: Briefcase,
    title: "Корпоративный курс",
    description: "Полноценное обучение с адаптацией под компанию",
    price: "от 50 000 ₽",
    features: [
      "2-3 дня обучения",
      "Программа под вашу отрасль",
      "Интеграция в рабочие процессы",
      "Поддержка после курса",
      "Материалы и шаблоны",
    ],
    timing: "2-3 дня",
    popular: false,
  },
  {
    id: "subscription",
    icon: UserCheck,
    title: "Абонемент на консультации",
    description: "Регулярная поддержка и обучение новым возможностям",
    price: "от 20 000 ₽/мес",
    features: [
      "4 консультации в месяц",
      "Оперативные ответы в чате",
      "Обновления по новым AI",
      "Разбор сложных кейсов",
    ],
    timing: "ежемесячно",
    popular: false,
  },
];

const AI_TOOLS = [
  { name: "ChatGPT / GPT-4o", description: "Универсальный помощник OpenAI" },
  { name: "YandexGPT", description: "Российский AI с доступом в рунет" },
  { name: "GigaChat", description: "Нейросеть от Сбера" },
  { name: "Claude", description: "Продвинутый AI от Anthropic" },
  { name: "Midjourney", description: "Генерация изображений" },
  { name: "Специализированные AI", description: "Под ваши задачи" },
];

const WHO_BENEFITS = [
  {
    icon: TrendingUp,
    title: "Маркетологи",
    tasks: "Контент, SEO-тексты, анализ конкурентов",
  },
  {
    icon: Users,
    title: "Менеджеры",
    tasks: "Письма клиентам, презентации, отчёты",
  },
  {
    icon: UserCheck,
    title: "HR-специалисты",
    tasks: "Вакансии, резюме, коммуникации",
  },
  {
    icon: Scale,
    title: "Юристы",
    tasks: "Анализ договоров, документы",
  },
  {
    icon: Target,
    title: "Руководители",
    tasks: "Аналитика, стратегия, решения",
  },
  {
    icon: FileText,
    title: "Аналитики",
    tasks: "Обработка данных, сводки, отчёты",
  },
];

const RESULTS = [
  { role: "Маркетолог", before: "4 часа", after: "30 минут", task: "10 постов для соцсетей" },
  { role: "Менеджер", before: "2 часа", after: "40 минут", task: "Обработка заявок" },
  { role: "HR", before: "1 час", after: "5 минут", task: "Описание вакансии" },
  { role: "Аналитик", before: "3 часа", after: "15 минут", task: "Сводка из отчёта" },
];

const PROGRAM_DAYS = [
  {
    day: 1,
    title: "Основы",
    topics: [
      "Что такое нейросети и как они работают",
      "Регистрация и настройка аккаунтов",
      "Первые запросы и понимание ответов",
      "Ограничения и возможности AI",
    ],
  },
  {
    day: 2,
    title: "Практика",
    topics: [
      "Промпт-инжиниринг: структура запроса",
      "Работа с текстами и документами",
      "Таблицы, данные, аналитика",
      "Генерация контента",
    ],
  },
  {
    day: 3,
    title: "Специализация",
    topics: [
      "Задачи под вашу отрасль",
      "Интеграция в рабочие процессы",
      "Автоматизация рутины",
      "Создание библиотеки промптов",
    ],
  },
];

const ADVANTAGES = [
  {
    icon: Lightbulb,
    title: "Практики",
    description: "Сами используем AI каждый день",
  },
  {
    icon: Target,
    title: "Под вас",
    description: "Адаптируем программу под отрасль",
  },
  {
    icon: Zap,
    title: "Без воды",
    description: "Только практика и реальные кейсы",
  },
  {
    icon: Shield,
    title: "Поддержка",
    description: "Отвечаем на вопросы после курса",
  },
];

export default function AITrainingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Обучение работе с ИИ"
        description="Корпоративное обучение работе с ChatGPT, YandexGPT и другими нейросетями во Владивостоке — от индивидуальных консультаций до полноценных курсов"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "IT-услуги", url: "https://uralliance.ru/services/tech" },
          { name: "Обучение работе с ИИ" },
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
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="tech" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <Brain className="h-3.5 w-3.5" />
                  ChatGPT, YandexGPT, GigaChat
                </Badge>
                <Badge variant="tech" badgeStyle="subtle" className="tracking-wider uppercase">
                  Практика
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                <span className="text-[var(--color-tech-primary)]">Обучение работе с ИИ</span> для
                бизнеса
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                Научим сотрудников использовать ChatGPT, YandexGPT и другие нейросети для ускорения
                работы. Промпт-инжиниринг, автоматизация рутины, практика на ваших реальных задачах.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-tech" size="lg" className="gap-2">
                  <Link href="/#contact">
                    Записаться на курс
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline-tech" size="lg">
                  <a href={`tel:${contacts.phone.main.raw}`}>{contacts.phone.main.display}</a>
                </Button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">2-5x</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">быстрее работа</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">1 день</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">интенсив</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">100+</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    промптов в подарок
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <Card variant="tech" className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-primary)]/20">
                    <GraduationCap className="h-6 w-6 text-[var(--color-tech-primary)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      Групповой интенсив
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      Самый популярный формат
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "ChatGPT, YandexGPT, GigaChat",
                    "Промпт-инжиниринг с практикой",
                    "Работа на ваших реальных кейсах",
                    "Библиотека готовых промптов",
                    "Сертификат о прохождении",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-tech-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-[var(--color-border)] pt-6">
                  <div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Стоимость</div>
                    <div className="text-3xl font-bold text-[var(--color-tech-primary)]">
                      от 15 000 ₽
                    </div>
                  </div>
                  <Badge variant="tech" badgeStyle="filled" className="gap-1">
                    <Clock className="h-3 w-3" />1 день
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
                      Внедряем AI в ваш бизнес
                    </Heading>
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      Комплекс
                    </Badge>
                  </div>
                  <Text tone="secondary" className="mt-1">
                    После обучения — поможем внедрить AI-ассистентов и автоматизировать процессы
                  </Text>
                </div>
              </div>

              <Button asChild variant="outline-tech" size="lg" className="shrink-0 gap-2">
                <Link href="/services/tech/ai">
                  <Sparkles className="h-4 w-4" />
                  AI-решения
                </Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Courses Grid */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              Форматы обучения
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Выберите подходящий курс
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              От индивидуальных консультаций до полноценных корпоративных программ
            </Text>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {COURSES.map((course) => (
              <Card key={course.id} variant="tech" className="relative overflow-hidden p-6">
                {course.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="tech" badgeStyle="filled" size="sm">
                      Популярно
                    </Badge>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-primary)]/20">
                    <course.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
                  </div>
                  <div>
                    <Heading as="h3" size="lg" weight="semibold">
                      {course.title}
                    </Heading>
                    <Text size="sm" tone="secondary">
                      {course.description}
                    </Text>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  {course.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                  <div className="text-xl font-bold text-[var(--color-tech-primary)]">
                    {course.price}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                    <Clock className="h-4 w-4" />
                    {course.timing}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* AI Tools */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              <Brain className="h-3 w-3" />
              Инструменты
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Какие нейросети изучаем
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Работаем с актуальными AI-инструментами, которые реально полезны для бизнеса
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS.map((tool, i) => (
              <Card key={i} variant="tech" className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-tech-primary)]/20">
                  <Sparkles className="h-5 w-5 text-[var(--color-tech-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[var(--color-text-primary)]">{tool.name}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {tool.description}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who Benefits */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              Кому подойдёт
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              AI ускоряет работу любого специалиста
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_BENEFITS.map((item, i) => (
              <Card key={i} variant="tech" className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-tech-primary)]/20">
                    <item.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                  </div>
                  <Heading as="h3" size="md" weight="semibold">
                    {item.title}
                  </Heading>
                </div>
                <Text size="sm" tone="secondary">
                  {item.tasks}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              <TrendingUp className="h-3 w-3" />
              Результаты
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Реальное ускорение работы
            </Heading>
            <Text tone="secondary" className="mx-auto mt-3 max-w-2xl">
              Примеры того, как меняется скорость выполнения задач после обучения
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.map((result, i) => (
              <Card key={i} variant="tech" className="p-5 text-center">
                <div className="mb-2 text-sm font-medium text-[var(--color-tech-primary)]">
                  {result.role}
                </div>
                <div className="mb-3 text-sm text-[var(--color-text-secondary)]">{result.task}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-[var(--color-text-secondary)] line-through">
                    {result.before}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-tech-primary)]" />
                  <span className="text-xl font-bold text-[var(--color-tech-primary)]">
                    {result.after}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Program */}
      <Section spacing="lg" background="default">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              <BookOpen className="h-3 w-3" />
              Программа
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Что изучаем на корпоративном курсе
            </Heading>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PROGRAM_DAYS.map((day) => (
              <Card key={day.day} variant="tech" className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-tech-primary)] font-bold text-white">
                    {day.day}
                  </div>
                  <Heading as="h3" size="lg" weight="semibold">
                    {day.title}
                  </Heading>
                </div>
                <div className="space-y-2">
                  {day.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">{topic}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Text tone="secondary" size="sm">
              Программа адаптируется под вашу отрасль и задачи
            </Text>
          </div>
        </Container>
      </Section>

      {/* Advantages */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Badge variant="tech" badgeStyle="subtle" className="mb-4">
              Преимущества
            </Badge>
            <Heading as="h2" size="2xl" weight="bold">
              Почему учиться у нас
            </Heading>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item, i) => (
              <Card key={i} variant="tech" className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-tech-primary)]/20">
                  <item.icon className="h-7 w-7 text-[var(--color-tech-primary)]" />
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

      {/* What You Get */}
      <Section spacing="lg" background="default">
        <Container className="max-w-4xl">
          <Card variant="tech" className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-primary)]/20">
                <Award className="h-6 w-6 text-[var(--color-tech-primary)]" />
              </div>
              <Heading as="h2" size="xl" weight="bold">
                Что получите после обучения
              </Heading>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Навыки работы с основными нейросетями",
                "Библиотеку из 100+ готовых промптов",
                "Понимание промпт-инжиниринга",
                "Умение автоматизировать рутину",
                "Сертификат о прохождении курса",
                "Поддержку после обучения",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-tech-primary)]" />
                  <span className="text-[var(--color-text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card variant="tech" className="p-8 text-center sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-tech-primary)]/20">
              <Rocket className="h-8 w-8 text-[var(--color-tech-primary)]" />
            </div>
            <Heading as="h2" size="2xl" weight="bold" className="mb-4">
              Готовы ускорить работу с помощью AI?
            </Heading>
            <Text tone="secondary" size="lg" className="mx-auto mb-8 max-w-xl">
              Оставьте заявку — обсудим задачи вашей команды и подберём оптимальный формат обучения
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-tech" size="lg" className="gap-2">
                <Link href="/#contact">
                  Записаться на курс
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline-tech" size="lg">
                <a href={`tel:${contacts.phone.main.raw}`}>{contacts.phone.main.display}</a>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
