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
import { AIChatShowcase } from "@/components/showcases/AIChat";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Download,
  FileDown,
  Mail,
  Shield,
  Play,
  AlertTriangle,
  ThumbsUp,
  XCircle,
  Bot,
  PenTool,
  BarChart3,
  Headphones,
  Gift,
  Scale,
} from "lucide-react";

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
    icon: Headphones,
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
  {
    name: "ChatGPT / GPT-4o",
    description: "Универсальный помощник OpenAI",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "YandexGPT",
    description: "Российский AI с доступом в рунет",
    color: "from-red-400 to-orange-500",
  },
  { name: "GigaChat", description: "Нейросеть от Сбера", color: "from-blue-400 to-cyan-500" },
  {
    name: "Claude",
    description: "Продвинутый AI от Anthropic",
    color: "from-orange-400 to-amber-500",
  },
  {
    name: "Midjourney",
    description: "Генерация изображений",
    color: "from-purple-400 to-pink-500",
  },
  { name: "Copilot", description: "AI-помощник Microsoft", color: "from-blue-400 to-indigo-500" },
];

const WHO_BENEFITS = [
  {
    icon: TrendingUp,
    title: "Маркетологи",
    tasks: "Контент, SEO, анализ конкурентов",
    time: "4ч → 30мин",
  },
  { icon: Users, title: "Менеджеры", tasks: "Письма, презентации, отчёты", time: "2ч → 20мин" },
  { icon: UserCheck, title: "HR", tasks: "Вакансии, резюме, адаптация", time: "1ч → 5мин" },
  { icon: Scale, title: "Юристы", tasks: "Анализ договоров, документы", time: "3ч → 30мин" },
  { icon: Target, title: "Руководители", tasks: "Аналитика, стратегия, решения", time: "5ч → 1ч" },
  { icon: FileText, title: "Аналитики", tasks: "Данные, сводки, отчёты", time: "4ч → 40мин" },
];

const COMPARISON = {
  without: [
    "Часами пишете тексты и письма",
    "Ручной анализ документов",
    "Шаблонные ответы клиентам",
    "Долгий поиск информации",
    "Рутина съедает время",
  ],
  with: [
    "Текст готов за минуты",
    "AI анализирует за секунды",
    "Персональные ответы мгновенно",
    "Структурированная информация сразу",
    "Фокус на важных задачах",
  ],
};

const PROGRAM_MODULES = [
  {
    module: 1,
    title: "Основы AI",
    duration: "2-3 часа",
    topics: [
      "Как работают нейросети",
      "Регистрация в сервисах",
      "Первые запросы",
      "Возможности и ограничения",
    ],
  },
  {
    module: 2,
    title: "Промпт-инжиниринг",
    duration: "3-4 часа",
    topics: [
      "Структура идеального промпта",
      "Роли и контекст",
      "Цепочки запросов",
      "Типичные ошибки",
    ],
  },
  {
    module: 3,
    title: "Практика",
    duration: "4-6 часов",
    topics: ["Работа с текстами", "Анализ данных", "Генерация контента", "Ваши реальные задачи"],
  },
  {
    module: 4,
    title: "Интеграция",
    duration: "2-3 часа",
    topics: [
      "AI в рабочих процессах",
      "Автоматизация рутины",
      "Библиотека промптов",
      "Безопасность данных",
    ],
  },
];

const ADVANTAGES = [
  { icon: Lightbulb, title: "Практики", description: "Сами используем AI каждый день в работе" },
  { icon: Target, title: "Под вас", description: "Адаптируем программу под вашу отрасль" },
  { icon: Zap, title: "Без воды", description: "Только практика и реальные кейсы" },
  { icon: Shield, title: "Поддержка", description: "Отвечаем на вопросы после курса" },
];

const LEAD_MAGNET_CONTENT = [
  "50 готовых промптов для бизнеса",
  "Чек-лист выбора AI-инструмента",
  "Шаблоны для маркетинга и продаж",
  "Промпты для HR и юристов",
  "Советы по безопасности данных",
];

export function AITrainingContent() {
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
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />

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
                  <Brain className="h-3.5 w-3.5" />
                  ChatGPT, YandexGPT, Claude
                </Badge>
                <Badge variant="tech" badgeStyle="subtle" className="tracking-wider uppercase">
                  Практика
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Heading as="h1" size="3xl" weight="bold" className="leading-tight">
                  <span className="text-[var(--color-tech-primary)]">Научим работать с AI</span> —
                  ускорьте бизнес в 5 раз
                </Heading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Text size="lg" tone="secondary" className="max-w-xl leading-relaxed">
                  Научим сотрудников использовать ChatGPT, YandexGPT и другие нейросети для
                  автоматизации рутины. Промпт-инжиниринг, практика на ваших реальных задачах,
                  поддержка после курса.
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
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Записаться на курс
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#lead-magnet">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать шпаргалку
                  </Link>
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
                  { value: "2-5x", label: "быстрее работа" },
                  { value: "1 день", label: "интенсив" },
                  { value: "100+", label: "промптов в подарок" },
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

            {/* Right side - AI Chat Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <AIChatShowcase />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Before/After Comparison */}
      <Section spacing="md">
        <Container className="max-w-5xl space-y-6">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Сравнение
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Работа без AI vs с AI
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Как меняется эффективность после обучения
            </Text>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Without AI */}
            <Card variant="tech" padding="md" className="border-red-500/20">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <Heading as="h3" size="sm" weight="semibold">
                    Без AI
                  </Heading>
                  <Badge variant="tech" badgeStyle="subtle" size="sm" className="mt-1 text-red-400">
                    Рутина отнимает время
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                {COMPARISON.without.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <Text size="sm" tone="secondary">
                      {item}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* With AI */}
            <Card
              variant="tech"
              padding="md"
              className="border-2 border-[var(--color-tech-primary)]/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-tech-primary)]/10">
                  <Sparkles className="h-5 w-5 text-[var(--color-tech-primary)]" />
                </div>
                <div>
                  <Heading as="h3" size="sm" weight="semibold">
                    После обучения
                  </Heading>
                  <Badge variant="tech" badgeStyle="filled" size="sm" className="mt-1">
                    Фокус на важном
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                {COMPARISON.with.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                    <Text size="sm" tone="secondary">
                      {item}
                    </Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Lead Magnet */}
      <Section spacing="md" background="secondary" id="lead-magnet">
        <Container className="max-w-4xl">
          <Card
            variant="tech"
            padding="lg"
            className="relative overflow-hidden border-2 border-[var(--color-tech-primary)]/40"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-2">
              {/* Left - Description */}
              <div className="space-y-4">
                <Badge variant="tech" badgeStyle="filled" className="gap-1.5">
                  <Gift className="h-3.5 w-3.5" />
                  Бесплатно
                </Badge>
                <Heading as="h2" size="xl" weight="bold">
                  Шпаргалка по работе с AI
                </Heading>
                <Text tone="secondary">
                  50 готовых промптов для бизнеса, чек-листы и шаблоны — скачайте и начните
                  использовать AI уже сегодня
                </Text>

                <div className="space-y-2 pt-2">
                  {LEAD_MAGNET_CONTENT.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                      <Text size="sm">{item}</Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Form */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
                      <FileDown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">PDF-шпаргалка</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">12 страниц</div>
                    </div>
                  </div>

                  <Button asChild variant="primary-tech" size="lg" className="w-full gap-2">
                    <Link href="/ai-cheatsheet">
                      <Download className="h-4 w-4" />
                      <span className="sm:hidden">Скачать PDF</span>
                      <span className="hidden sm:inline">Получить бесплатно</span>
                    </Link>
                  </Button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <Shield className="h-3 w-3" />
                    Без спама, только полезные материалы
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* AI Tools */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              <Brain className="inline h-3 w-3" /> Инструменты
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Какие нейросети изучаем
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Работаем с актуальными AI-инструментами для бизнеса
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="tech" padding="md" className="transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color}`}
                    >
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Heading as="h3" size="sm" weight="semibold">
                        {tool.name}
                      </Heading>
                      <Text size="sm" tone="secondary">
                        {tool.description}
                      </Text>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who Benefits */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Кому подойдёт
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              AI ускоряет работу любого специалиста
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_BENEFITS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="tech" padding="md" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10">
                      <item.icon className="h-5 w-5 text-[var(--color-tech-primary)]" />
                    </div>
                    <div className="flex-1">
                      <Heading as="h3" size="sm" weight="semibold">
                        {item.title}
                      </Heading>
                      <Text size="sm" tone="secondary" className="mt-1">
                        {item.tasks}
                      </Text>
                      <div className="mt-2">
                        <Badge variant="tech" badgeStyle="subtle" size="sm" className="font-mono">
                          {item.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Courses */}
      <Section spacing="md" id="courses">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Форматы обучения
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Выберите подходящий курс
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              От индивидуальных консультаций до корпоративных программ
            </Text>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {COURSES.map((course) => (
              <Card
                key={course.id}
                variant="tech"
                padding="lg"
                className={`relative overflow-visible transition-all hover:scale-[1.02] ${
                  course.popular
                    ? "border-2 border-[var(--color-tech-primary)]/40 shadow-[var(--color-tech-primary)]/10 shadow-lg"
                    : ""
                }`}
              >
                {course.popular && (
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
                      <course.icon className="h-6 w-6 text-[var(--color-tech-primary)]" />
                    </div>
                    <div>
                      <Heading as="h3" size="md" weight="semibold">
                        {course.title}
                      </Heading>
                      <Text size="sm" tone="secondary">
                        {course.description}
                      </Text>
                    </div>
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-baseline justify-between border-b border-[var(--color-border)] pb-4">
                    <div className="text-xl font-bold text-[var(--color-tech-primary)]">
                      {course.price}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                      <Clock className="h-4 w-4" />
                      {course.timing}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {course.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-tech-primary)]" />
                        <Text size="sm">{feature}</Text>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant={course.popular ? "primary-tech" : "outline"}
                    className="mt-2 w-full"
                  >
                    <Link href="/#contact">Записаться</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Program */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              <BookOpen className="inline h-3 w-3" /> Программа
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Что изучаем на курсе
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Структура корпоративного обучения
            </Text>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--color-tech-primary)]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAM_MODULES.map((item, index) => (
                <motion.div
                  key={item.module}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Card variant="tech" padding="md" className="h-full">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-tech-primary)] font-bold text-white">
                        {item.module}
                      </div>
                      <Badge variant="tech" badgeStyle="subtle" size="sm">
                        {item.duration}
                      </Badge>
                    </div>
                    <Heading
                      as="h3"
                      size="sm"
                      weight="semibold"
                      className="mb-3 text-[var(--color-tech-primary)]"
                    >
                      {item.title}
                    </Heading>
                    <div className="space-y-1.5">
                      {item.topics.map((topic) => (
                        <div key={topic} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-tech-primary)]" />
                          <Text size="sm" tone="secondary">
                            {topic}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Text tone="secondary" size="sm">
              Программа адаптируется под вашу отрасль и задачи
            </Text>
          </div>
        </Container>
      </Section>

      {/* Advantages */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Преимущества
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Почему учиться у нас
            </Heading>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="tech" padding="md" className="text-center">
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
              </motion.div>
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
                  После обучения
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Внедряем AI в ваш бизнес
                </Heading>
                <Text tone="secondary" className="mx-auto mt-2 max-w-2xl">
                  После обучения поможем интегрировать AI-ассистентов в рабочие процессы —
                  автоматизируем рутину и повысим эффективность команды
                </Text>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/services/tech/ai"
                  className="group rounded-xl border border-[var(--color-tech-border)]/30 bg-[var(--color-card-bg)] p-5 transition-all hover:border-[var(--color-tech-primary)]/50 hover:bg-[var(--color-tech-surface)]/50"
                >
                  <div className="flex items-center gap-3">
                    <Bot className="h-8 w-8 text-[var(--color-tech-primary)]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">AI-ассистенты</span>
                        <ArrowRight className="h-4 w-4 text-[var(--color-tech-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        Автоматизация процессов
                      </div>
                    </div>
                  </div>
                </Link>

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
                        AI для сайта и Telegram
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
              Начните сейчас
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы ускорить работу с помощью AI?
            </Heading>
            <Text size="lg" tone="secondary" className="mx-auto mt-3 max-w-lg">
              Оставьте заявку — обсудим задачи вашей команды и подберём оптимальный формат обучения
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-tech" size="lg">
                <Link href="/#contact">
                  Записаться на курс
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
