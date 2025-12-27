import { defaultOgImage } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { VestnikShowcase } from "@/components/showcases/VestnikVisual";
import { ScheduleTabs } from "@/components/vestnik/ScheduleTabs";
import { DeadlineCountdown } from "@/components/vestnik/DeadlineCountdown";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Newspaper,
  Building2,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Публикация в Вестнике госрегистрации во Владивостоке — от 3 500₽ | Юральянс",
  description:
    "Официальный представитель журнала «Вестник государственной регистрации» в Приморском крае. Юральянс — публикация уведомлений о ликвидации, реорганизации, уменьшении уставного капитала. Приём документов ежедневно.",
  keywords:
    "вестник госрегистрации владивосток, публикация в вестнике владивосток, официальный представитель вестник приморский край, публикация о ликвидации ооо владивосток, уведомление в вестнике владивосток, публикация о реорганизации владивосток, юральянс вестник",
  alternates: {
    canonical: "/services/legal/vestnik",
  },
  openGraph: {
    title: "Публикация в Вестнике госрегистрации во Владивостоке | Юральянс",
    description:
      "ООО «Юральянс» — официальный представитель журнала «Вестник» в Приморском крае. Публикации о ликвидации, реорганизации от 3 500₽.",
    type: "website",
    locale: "ru_RU",
    url: "/services/legal/vestnik",
    siteName: "Uralliance",
    images: [defaultOgImage],
  },
};

const PUBLICATION_TYPES = [
  {
    name: "Ликвидация юридического лица",
    description: "Обязательная публикация при добровольной ликвидации ООО, АО и других организаций",
    icon: Building2,
  },
  {
    name: "Реорганизация компании",
    description: "Слияние, присоединение, разделение, выделение, преобразование",
    icon: Users,
  },
  {
    name: "Уменьшение уставного капитала",
    description: "Уведомление кредиторов об уменьшении УК общества",
    icon: FileText,
  },
  {
    name: "Приобретение 20%+ уставного капитала",
    description: "Публикация о приобретении доли в уставном капитале",
    icon: Award,
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Заявка",
    description: "Скиньте нам решение и лист записи на почту — подготовим бланки заранее",
  },
  {
    step: 2,
    title: "Оплата",
    description: "Приезжайте с готовыми документами, передайте без ожидания и оплатите",
  },
  {
    step: 3,
    title: "Публикация",
    description: "Отправляем материалы в день обращения — без задержек",
  },
  {
    step: 4,
    title: "Готово",
    description: "Проверяете выход публикации на сайте или звоните нам",
  },
];

// График выхода журнала на 2025 год
const SCHEDULE_2025 = {
  q1: {
    name: "I квартал",
    issues: [
      { issue: "1 (1024)", releaseDate: "09 января", deadline: "25 декабря" },
      { issue: "2 (1025)", releaseDate: "15 января", deadline: "28 декабря" },
      { issue: "3 (1026)", releaseDate: "22 января", deadline: "15 января" },
      { issue: "4 (1027)", releaseDate: "29 января", deadline: "22 января" },
      { issue: "5 (1028)", releaseDate: "05 февраля", deadline: "29 января" },
      { issue: "6 (1029)", releaseDate: "12 февраля", deadline: "05 февраля" },
      { issue: "7 (1030)", releaseDate: "19 февраля", deadline: "12 февраля" },
      { issue: "8 (1031)", releaseDate: "26 февраля", deadline: "19 февраля" },
      { issue: "9 (1032)", releaseDate: "05 марта", deadline: "26 февраля" },
      { issue: "10 (1033)", releaseDate: "12 марта", deadline: "05 марта" },
      { issue: "11 (1034)", releaseDate: "19 марта", deadline: "12 марта" },
      { issue: "12 (1035)", releaseDate: "26 марта", deadline: "19 марта" },
    ],
  },
  q2: {
    name: "II квартал",
    issues: [
      { issue: "13 (1036)", releaseDate: "02 апреля", deadline: "26 марта" },
      { issue: "14 (1037)", releaseDate: "09 апреля", deadline: "02 апреля" },
      { issue: "15 (1038)", releaseDate: "16 апреля", deadline: "09 апреля" },
      { issue: "16 (1039)", releaseDate: "23 апреля", deadline: "16 апреля" },
      { issue: "17 (1040)", releaseDate: "30 апреля", deadline: "23 апреля" },
      { issue: "18 (1041)", releaseDate: "07 мая", deadline: "28 апреля" },
      { issue: "19 (1042)", releaseDate: "14 мая", deadline: "05 мая" },
      { issue: "20 (1043)", releaseDate: "21 мая", deadline: "14 мая" },
      { issue: "21 (1044)", releaseDate: "28 мая", deadline: "21 мая" },
      { issue: "22 (1045)", releaseDate: "04 июня", deadline: "28 мая" },
      { issue: "23 (1046)", releaseDate: "11 июня", deadline: "04 июня" },
      { issue: "24 (1047)", releaseDate: "18 июня", deadline: "09 июня" },
      { issue: "25 (1048)", releaseDate: "25 июня", deadline: "18 июня" },
    ],
  },
  q3: {
    name: "III квартал",
    issues: [
      { issue: "26 (1049)", releaseDate: "02 июля", deadline: "25 июня" },
      { issue: "27 (1050)", releaseDate: "09 июля", deadline: "02 июля" },
      { issue: "28 (1051)", releaseDate: "16 июля", deadline: "09 июля" },
      { issue: "29 (1052)", releaseDate: "23 июля", deadline: "16 июля" },
      { issue: "30 (1053)", releaseDate: "30 июля", deadline: "23 июля" },
      { issue: "31 (1054)", releaseDate: "06 августа", deadline: "30 июля" },
      { issue: "32 (1055)", releaseDate: "13 августа", deadline: "06 августа" },
      { issue: "33 (1056)", releaseDate: "20 августа", deadline: "13 августа" },
      { issue: "34 (1057)", releaseDate: "27 августа", deadline: "20 августа" },
      { issue: "35 (1058)", releaseDate: "03 сентября", deadline: "27 августа" },
      { issue: "36 (1059)", releaseDate: "10 сентября", deadline: "03 сентября" },
      { issue: "37 (1060)", releaseDate: "17 сентября", deadline: "10 сентября" },
      { issue: "38 (1061)", releaseDate: "24 сентября", deadline: "17 сентября" },
    ],
  },
  q4: {
    name: "IV квартал",
    issues: [
      { issue: "39 (1062)", releaseDate: "01 октября", deadline: "24 сентября" },
      { issue: "40 (1063)", releaseDate: "08 октября", deadline: "01 октября" },
      { issue: "41 (1064)", releaseDate: "15 октября", deadline: "08 октября" },
      { issue: "42 (1065)", releaseDate: "22 октября", deadline: "15 октября" },
      { issue: "43 (1066)", releaseDate: "29 октября", deadline: "22 октября" },
      { issue: "44 (1067)", releaseDate: "05 ноября", deadline: "29 октября" },
      { issue: "45 (1068)", releaseDate: "12 ноября", deadline: "05 ноября" },
      { issue: "46 (1069)", releaseDate: "19 ноября", deadline: "12 ноября" },
      { issue: "47 (1070)", releaseDate: "26 ноября", deadline: "19 ноября" },
      { issue: "48 (1071)", releaseDate: "03 декабря", deadline: "26 ноября" },
      { issue: "49 (1072)", releaseDate: "10 декабря", deadline: "03 декабря" },
      { issue: "50 (1073)", releaseDate: "17 декабря", deadline: "10 декабря" },
      { issue: "51 (1074)", releaseDate: "24 декабря", deadline: "17 декабря" },
      { issue: "52 (1075)", releaseDate: "30 декабря", deadline: "24 декабря" },
    ],
  },
};

export default function VestnikPage() {
  return (
    <>
      <ServiceJsonLd
        name="Публикация в Вестнике госрегистрации"
        description="Официальное региональное представительство журнала «Вестник» в Приморском крае"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Юридические услуги", url: "https://uralliance.ru/services/legal" },
          { name: "Вестник госрегистрации" },
        ]}
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
                <Badge variant="legal" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Официальный представитель
                </Badge>
                <Badge variant="legal" badgeStyle="subtle" className="tracking-widest uppercase">
                  Приморский край
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold">
                Публикация в&nbsp;журнале «Вестник»
              </Heading>

              <Text size="lg" tone="secondary">
                ООО «ЮрАльянс» — официальное региональное представительство журнала «Вестник
                государственной регистрации» в Приморском крае. Размещаем обязательные уведомления о
                ликвидации, реорганизации и других корпоративных изменениях.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-legal" size="lg">
                  <Link href="/#contact">
                    <Newspaper className="mr-2 h-5 w-5" />
                    Оформить публикацию
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link
                    href="https://www.vestnik-gosreg.ru/?utm_source=uralliance&utm_medium=partner&utm_campaign=vestnik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Официальный сайт
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick navigation links */}
              <div className="space-y-2 pt-2">
                <Text size="xs" tone="secondary" className="tracking-wider uppercase">
                  Перейти к разделу:
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="#publications"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/40 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]"
                  >
                    <FileText className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Виды публикаций
                  </Link>
                  <Link
                    href="#schedule"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/40 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]"
                  >
                    <Calendar className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    График выхода
                  </Link>
                  <Link
                    href="#process"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/40 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]"
                  >
                    <ArrowRight className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Как оформить
                  </Link>
                  <Link
                    href="#documents"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/40 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Документы
                  </Link>
                </div>
              </div>
            </div>

            {/* Visual Showcase */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Timer */}
              <DeadlineCountdown schedule={SCHEDULE_2025} />

              {/* Magazine + Form */}
              <VestnikShowcase />
            </div>
          </div>
        </Container>
      </Section>

      {/* Publication Types */}
      <Section spacing="md" background="secondary" id="publications">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Виды публикаций
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Когда требуется публикация в Вестнике
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Закон обязывает публиковать уведомления при определённых корпоративных событиях
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PUBLICATION_TYPES.map((item) => (
              <Card key={item.name} variant="legal" padding="md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-legal-surface)]">
                    <item.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
                  </div>
                  <div>
                    <Heading as="h3" size="sm" weight="semibold">
                      {item.name}
                    </Heading>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {item.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card variant="legal" padding="md" className="border-[var(--color-legal-primary)]/30">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-legal-primary)]/10">
                <FileText className="h-5 w-5 text-[var(--color-legal-primary)]" />
              </div>
              <div>
                <Text size="sm" weight="semibold" className="text-[var(--color-text-primary)]">
                  Также публикуем уведомления:
                </Text>
                <Text size="sm" tone="secondary" className="mt-1">
                  об отмене доверенностей, исключении недействующих юрлиц из ЕГРЮЛ, выходе участника
                  из ООО с переходом доли к обществу, и другие обязательные объявления
                </Text>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Process */}
      <Section spacing="md" id="process">
        <Container className="max-w-6xl space-y-10">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс работы
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Как оформить публикацию
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Простой и понятный путь к публикации
            </Text>
          </div>

          {/* Process Steps - Visual Timeline */}
          <div className="relative">
            {/* Connecting line - Desktop */}
            <div className="absolute top-10 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[var(--color-legal-primary)]/30 to-transparent lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {PROCESS_STEPS.map((item, index) => (
                <div key={item.step} className="group relative">
                  {/* Connecting arrow for mobile/tablet */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:hidden">
                      <div className="h-6 w-0.5 bg-gradient-to-b from-[var(--color-legal-primary)]/40 to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Step circle with pulse animation */}
                    <div className="relative mb-4">
                      <div
                        className="absolute inset-0 animate-pulse rounded-full bg-[var(--color-legal-primary)]/20"
                        style={{ animationDuration: "3s" }}
                      />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-legal-primary)] bg-gradient-to-br from-[var(--color-legal-surface)] to-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl dark:to-gray-800">
                        <span className="text-3xl font-bold text-[var(--color-legal-primary)]">
                          {item.step}
                        </span>
                      </div>
                      {/* Checkmark for visual completion feel */}
                      <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-legal-primary)] text-white shadow-md">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Content */}
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
                        {item.step === 2 ? (
                          <>
                            Приезжайте с готовыми{" "}
                            <Link
                              href="#documents"
                              className="text-[var(--color-legal-primary)] underline hover:no-underline"
                            >
                              документами
                            </Link>
                            , передайте без ожидания и оплатите
                          </>
                        ) : (
                          item.description
                        )}
                      </Text>
                    </div>
                  </div>

                  {/* Arrow between steps - Desktop */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-10 -right-2 hidden lg:block">
                      <ArrowRight className="h-5 w-5 text-[var(--color-legal-primary)]/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom highlight */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-[var(--color-legal-primary)]" />
              <Text size="sm" weight="medium">
                Отправляем материалы в&nbsp;день обращения
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Schedule */}
      <Section spacing="md" background="secondary" id="schedule">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              График выхода
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Расписание выпусков на 2025 год
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Журнал выходит еженедельно. Материалы принимаются за неделю до выхода номера
            </Text>
          </div>

          <ScheduleTabs schedule={SCHEDULE_2025} />
        </Container>
      </Section>

      {/* Documents */}
      <Section spacing="md" id="documents">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg">
            <div className="text-center">
              <Heading as="h2" size="xl" weight="semibold">
                Документы для публикации
              </Heading>
              <Text size="lg" tone="secondary" className="mt-3">
                Что понадобится для размещения уведомления
              </Text>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Решение / Протокол",
                  desc: "О ликвидации, реорганизации или ином событии",
                },
                { title: "Лист записи ЕГРЮЛ", desc: "Подтверждает внесение изменений в реестр" },
                { title: "Доверенность", desc: "Если обращается представитель (опционально)" },
                { title: "Квитанция об оплате", desc: "Если оплачивали объявление не через нас" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-legal-primary)]" />
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

      {/* Liquidation Promo */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-5xl">
          <Card
            variant="legal"
            padding="lg"
            className="relative overflow-hidden border-[var(--color-legal-primary)]/30"
          >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-legal-primary)]/5 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[var(--color-legal-primary)]/5 blur-2xl" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <Badge variant="legal" badgeStyle="subtle" className="gap-1.5">
                  <Award className="h-3.5 w-3.5" />
                  Специальное предложение
                </Badge>
                <Heading as="h2" size="lg" weight="semibold">
                  Завершим ликвидацию вашей компании под ключ
                </Heading>
                <Text tone="secondary">
                  Как официальный представитель журнала «Вестник государственной регистрации» мы
                  предлагаем комплексное сопровождение ликвидации ООО — от публикации уведомления до
                  получения листа записи о ликвидации в ЕГРЮЛ. Работаем быстро и по фиксированной
                  стоимости.
                </Text>
                <ul className="space-y-2">
                  {[
                    "Подготовка всех документов для налоговой",
                    "Публикация в Вестнике в ближайшем номере",
                    "Сопровождение до полного завершения",
                    "Фиксированная стоимость без скрытых платежей",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-legal-primary)]" />
                      <Text size="sm">{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {/* Main price card */}
                <div className="rounded-2xl border border-[var(--color-legal-primary)]/20 bg-[var(--color-legal-surface)]/30 p-6">
                  <div className="mb-4 text-center">
                    <Text size="sm" tone="secondary" className="tracking-wider uppercase">
                      Комплексная ликвидация ООО
                    </Text>
                    <div className="mt-2 flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-[var(--color-legal-primary)]">
                        от 20 000
                      </span>
                      <span className="text-lg text-[var(--color-text-secondary)]">руб.</span>
                    </div>
                    <Text size="xs" tone="secondary" className="mt-1">
                      полное сопровождение под ключ
                    </Text>
                  </div>
                  <Button asChild variant="primary-legal" size="lg" className="w-full">
                    <Link href="/#contact">
                      Узнать подробности
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Text size="xs" tone="secondary" className="mt-3 text-center">
                    Бесплатная консультация по вашей ситуации
                  </Text>
                </div>

                {/* Fedresurs add-on */}
                <div className="rounded-xl border border-[var(--color-legal-primary)]/15 bg-[var(--color-card-bg)] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Text size="sm" weight="semibold">
                        Публикация в Федресурсе
                      </Text>
                      <Text size="xs" tone="secondary">
                        Заказать отдельно или вместе с Вестником
                      </Text>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-lg font-bold text-[var(--color-legal-primary)]">
                        от 3 000 ₽
                      </div>
                    </div>
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
              <ShieldCheck className="h-3.5 w-3.5" />
              Официальный представитель
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы оформить публикацию?
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Оставьте заявку — подготовим текст уведомления и разместим в ближайшем номере журнала
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
