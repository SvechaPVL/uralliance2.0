import { getServiceBySlug, getAllServiceSlugs } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Card } from "@/components/primitives/card";
import { Text } from "@/components/primitives/text";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ServiceHeroCard } from "@/components/service/ServiceHeroCard";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileKey,
  Cpu,
  CheckCircle2,
  Zap,
  Award,
  ListChecks,
  Target,
  HelpCircle,
  Rocket,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

/**
 * Service Detail Page
 *
 * Displays full service information with Markdown content
 * Uses dynamic routing: /services/{category}/{slug}/
 */

interface ServiceDetailPageProps {
  params: {
    category: string;
    slug: string;
  };
}

interface AlertBlock {
  text: string;
  variant: "warning" | "info";
}

interface ContentSection {
  title: string;
  markdown: string;
  icon?: LucideIcon;
  contentType?: "prose" | "price-list" | "feature-list" | "process";
  items?: ParsedItem[];
  alerts?: AlertBlock[];
  style?: SectionStyle;
}

interface ParsedItem {
  name: string;
  price?: string;
  description?: string;
  isSubheading?: boolean;
}

// Map section title keywords to icons
const SECTION_ICONS: Record<string, LucideIcon> = {
  рутокен: ShieldCheck,
  эцп: FileKey,
  криптопро: Cpu,
  лицензи: Cpu,
  подпис: FileKey,
  преимущ: Award,
  почему: HelpCircle,
  "что входит": ListChecks,
  услуг: ListChecks,
  "для чего": Target,
  "как получить": Rocket,
  "как мы": Rocket,
  процесс: Zap,
  этап: Zap,
  гарант: ShieldCheck,
  защит: ShieldCheck,
  договор: FileKey,
  документ: FileKey,
  регистрац: Rocket,
  ликвидац: Target,
  банкрот: ShieldCheck,
  консульт: HelpCircle,
  сопровожд: ListChecks,
  аудит: Target,
  налог: Cpu,
  бухгалтер: Cpu,
};

function getSectionIcon(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase();
  for (const [keyword, icon] of Object.entries(SECTION_ICONS)) {
    if (lowerTitle.includes(keyword)) {
      return icon;
    }
  }
  return CheckCircle2;
}

// Visual style variants for sections
type SectionStyle = "default" | "steps" | "highlight" | "grid" | "compact";

function getSectionStyle(title: string): SectionStyle {
  const lowerTitle = title.toLowerCase();

  // Steps/process sections - numbered timeline
  if (
    lowerTitle.includes("как начать") ||
    lowerTitle.includes("этап") ||
    lowerTitle.includes("шаг")
  ) {
    return "steps";
  }

  // Highlight sections - important info with accent
  if (
    lowerTitle.includes("тариф") ||
    lowerTitle.includes("стоимость") ||
    lowerTitle.includes("цен")
  ) {
    return "highlight";
  }

  // Grid sections - benefits/advantages with icons
  if (
    lowerTitle.includes("почему") ||
    lowerTitle.includes("преимущ") ||
    lowerTitle.includes("выбирают")
  ) {
    return "grid";
  }

  // Compact sections - simple lists
  if (lowerTitle.includes("документ") || lowerTitle.includes("что нужно")) {
    return "compact";
  }

  return "default";
}

// Detect if content contains price items (pattern: "— X ₽" or "— от X ₽")
function isPriceList(markdown: string): boolean {
  const pricePattern = /—\s*(?:от\s*)?\d[\d\s]*₽/;
  return pricePattern.test(markdown);
}

// Parse price items from markdown
function parsePriceItems(markdown: string): ParsedItem[] {
  const lines = markdown.split("\n");
  const items: ParsedItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect subheadings (### Title)
    if (trimmed.startsWith("### ")) {
      items.push({
        name: trimmed.replace(/^###\s+/, ""),
        isSubheading: true,
      });
      continue;
    }

    // Detect list items with prices
    // Pattern: - **Name** — Price (description)
    const priceMatch = trimmed.match(
      /^-\s+\*\*(.+?)\*\*\s*—\s*((?:от\s*)?\d[\d\s]*₽)\s*(?:\((.+?)\))?/
    );
    if (priceMatch) {
      items.push({
        name: priceMatch[1].trim(),
        price: priceMatch[2].trim(),
        description: priceMatch[3]?.trim(),
      });
      continue;
    }

    // Pattern: - **Name** — Price
    const simplePriceMatch = trimmed.match(/^-\s+\*\*(.+?)\*\*\s*—\s*((?:от\s*)?\d[\d\s]*₽)/);
    if (simplePriceMatch) {
      items.push({
        name: simplePriceMatch[1].trim(),
        price: simplePriceMatch[2].trim(),
      });
      continue;
    }

    // Pattern: - Name — Price (without bold)
    const plainPriceMatch = trimmed.match(/^-\s+(.+?)\s*—\s*((?:от\s*)?\d[\d\s]*₽)/);
    if (plainPriceMatch) {
      items.push({
        name: plainPriceMatch[1].trim(),
        price: plainPriceMatch[2].trim(),
      });
    }
  }

  return items;
}

// Strip markdown bold syntax from text
function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

// Parse feature list items
function parseFeatureItems(markdown: string): ParsedItem[] {
  const lines = markdown.split("\n");
  const items: ParsedItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect list items with bold title and description
    // Pattern: - **Title** — Description
    const featureMatch = trimmed.match(/^-\s+\*\*(.+?)\*\*\s*—\s*(.+)/);
    if (featureMatch) {
      items.push({
        name: featureMatch[1].trim(),
        description: stripMarkdownBold(featureMatch[2].trim()),
      });
      continue;
    }

    // Simple list item (strip any remaining bold markers)
    const simpleMatch = trimmed.match(/^-\s+(.+)/);
    if (simpleMatch) {
      items.push({
        name: stripMarkdownBold(simpleMatch[1].trim()),
      });
    }
  }

  return items;
}

// Extract alerts from markdown (blockquotes starting with ⚠️ or ℹ️)
function extractAlerts(markdown: string): { alerts: AlertBlock[]; cleanMarkdown: string } {
  const alerts: AlertBlock[] = [];
  const lines = markdown.split("\n");
  const cleanLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect alert blockquotes: > ⚠️ or > ℹ️
    if (line.startsWith("> ⚠️") || line.startsWith(">⚠️")) {
      const text = line
        .replace(/^>\s*⚠️\s*/, "")
        .replace(/\*\*/g, "")
        .trim();
      if (text) {
        alerts.push({ text, variant: "warning" });
      }
      continue;
    }

    if (line.startsWith("> ℹ️") || line.startsWith(">ℹ️")) {
      const text = line
        .replace(/^>\s*ℹ️\s*/, "")
        .replace(/\*\*/g, "")
        .trim();
      if (text) {
        alerts.push({ text, variant: "info" });
      }
      continue;
    }

    cleanLines.push(lines[i]);
  }

  return { alerts, cleanMarkdown: cleanLines.join("\n") };
}

async function renderMarkdown(markdown: string) {
  const processed = await remark().use(remarkRehype).use(rehypeStringify).process(markdown);
  return processed.toString();
}

function extractSections(markdown: string): ContentSection[] {
  const lines = markdown.split("\n");
  const sections: ContentSection[] = [];
  let currentTitle = "";
  let buffer: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentTitle) {
        const rawContent = buffer.join("\n").trim();
        const { alerts, cleanMarkdown } = extractAlerts(rawContent);
        const content = cleanMarkdown.trim();
        const hasPrices = isPriceList(content);
        const hasFeatures = !hasPrices && content.includes("- **") && content.includes("—");

        sections.push({
          title: currentTitle,
          markdown: content,
          icon: getSectionIcon(currentTitle),
          contentType: hasPrices ? "price-list" : hasFeatures ? "feature-list" : "prose",
          items: hasPrices
            ? parsePriceItems(content)
            : hasFeatures
              ? parseFeatureItems(content)
              : undefined,
          alerts: alerts.length > 0 ? alerts : undefined,
          style: getSectionStyle(currentTitle),
        });
      }
      currentTitle = line.replace(/^##\s+/, "").trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  if (currentTitle && buffer.length) {
    const rawContent = buffer.join("\n").trim();
    const { alerts, cleanMarkdown } = extractAlerts(rawContent);
    const content = cleanMarkdown.trim();
    const hasPrices = isPriceList(content);
    const hasFeatures = !hasPrices && content.includes("- **") && content.includes("—");

    sections.push({
      title: currentTitle,
      markdown: content,
      icon: getSectionIcon(currentTitle),
      contentType: hasPrices ? "price-list" : hasFeatures ? "feature-list" : "prose",
      items: hasPrices
        ? parsePriceItems(content)
        : hasFeatures
          ? parseFeatureItems(content)
          : undefined,
      alerts: alerts.length > 0 ? alerts : undefined,
      style: getSectionStyle(currentTitle),
    });
  }

  return sections.filter((section) => section.markdown.length > 0 || section.alerts?.length);
}

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs;
}

// Generate metadata for the page
export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;

  if (category !== "legal" && category !== "tech") {
    return {};
  }

  try {
    const service = await getServiceBySlug(category, slug);
    const isLegal = category === "legal";
    const categoryName = isLegal ? "Юридические услуги" : "IT-решения";

    return {
      title: `${service.frontmatter.title} во Владивостоке | ${categoryName} | Uralliance`,
      description: `${service.frontmatter.description}. ${service.frontmatter.price}. Uralliance - ${categoryName.toLowerCase()} во Владивостоке.`,
      keywords: service.frontmatter.seo.keywords,
      authors: [{ name: "Uralliance" }],
      creator: "Uralliance",
      publisher: "Uralliance",
      alternates: {
        canonical: `/services/${category}/${slug}`,
      },
      openGraph: {
        title: `${service.frontmatter.title} во Владивостоке | Uralliance`,
        description: service.frontmatter.description,
        type: "website",
        locale: "ru_RU",
        url: `/services/${category}/${slug}`,
        siteName: "Uralliance",
        images: service.frontmatter.seo.ogImage
          ? [
              {
                url: service.frontmatter.seo.ogImage,
                width: 1200,
                height: 630,
                alt: service.frontmatter.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.frontmatter.title} во Владивостоке`,
        description: service.frontmatter.description,
        images: service.frontmatter.seo.ogImage ? [service.frontmatter.seo.ogImage] : [],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    return {};
  }
}

const SERVICE_FOCUS = {
  legal: [
    "Арбитражные споры и защита в судах",
    "Налоговые проверки и корпоративные вопросы",
    "Регистрация, сопровождение и публикации в «Вестнике госрегистрации»",
  ],
  tech: [
    "Анализ бизнеса и план цифровой трансформации",
    "Дизайн интерфейсов и разработка",
    "Интеграции с CRM, 1С и мессенджерами",
  ],
} as const;

const WORKFLOW_STEPS = {
  legal: [
    {
      title: "Дайджест задачи",
      description: "Проводим консультацию, изучаем документы и фиксируем юридические риски.",
    },
    {
      title: "Стратегия защиты",
      description: "Готовим позицию, планируем доказательства и определяем стоимость работы.",
    },
    {
      title: "Представительство",
      description: "Ведём переговоры, подаём документы и выступаем во всех инстанциях.",
    },
    {
      title: "Контроль результата",
      description: "Доводим дело до исполнения решения и сопровождаем клиента после процесса.",
    },
  ],
  tech: [
    {
      title: "Аналитика и план",
      description: "Фиксируем цели продукта, готовим дорожную карту и архитектуру решений.",
    },
    {
      title: "Дизайн и разработка",
      description: "Создаём интерфейсы, разворачиваем backend и интеграции с внешними сервисами.",
    },
    {
      title: "Запуск",
      description: "Тестируем, переносим данные и выводим продукт на продакшн.",
    },
    {
      title: "Поддержка",
      description: "Проводим анализ метрик, дорабатываем функционал и держим SLA 24/7.",
    },
  ],
} as const;

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { category, slug } = await params;

  // Validate category
  if (category !== "legal" && category !== "tech") {
    notFound();
  }

  let service;
  try {
    service = await getServiceBySlug(category, slug);
  } catch {
    notFound();
  }

  const isLegal = category === "legal";

  const focusItems = SERVICE_FOCUS[category];
  const workflow = WORKFLOW_STEPS[category];
  const rawSections = extractSections(service.content);
  const structuredSections = await Promise.all(
    rawSections.map(async (section) => ({
      ...section,
      html: await renderMarkdown(section.markdown),
    }))
  );
  const hasStructuredSections = structuredSections.length > 0;

  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name={service.frontmatter.title}
        description={service.frontmatter.description}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          {
            name: isLegal ? "Юридические услуги" : "IT-решения",
            url: `https://uralliance.ru/services/${category}`,
          },
          { name: service.frontmatter.title },
        ]}
      />

      {/* Hero - 2025 Bento Style */}
      <Section
        variant="page-hero"
        spacing="none"
        background="secondary"
        disableFirstSpacing
        className="relative overflow-hidden pt-[calc(6rem+var(--promo-banner-height))] pb-16 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-20 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-24"
      >
        {/* Background gradient orbs */}
        <div
          className={cn(
            "pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-30 blur-3xl",
            isLegal ? "bg-[var(--color-legal-primary)]" : "bg-[var(--color-tech-primary)]"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl",
            isLegal ? "bg-[var(--color-legal-primary)]" : "bg-[var(--color-tech-primary)]"
          )}
        />

        <Container className="relative max-w-6xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Link href="/" className="transition-colors hover:text-[var(--color-text-primary)]">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/services/${category}`}
              className="transition-colors hover:text-[var(--color-text-primary)]"
            >
              {isLegal ? "Юридические услуги" : "IT-решения"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[var(--color-text-primary)]">{service.frontmatter.title}</span>
          </nav>

          {/* Bento Grid */}
          <div className="grid gap-4 sm:gap-5 md:grid-cols-12 lg:gap-6">
            {/* Main card - spans 8 columns */}
            <Card
              variant={isLegal ? "legal" : "tech"}
              className="relative overflow-hidden p-5 sm:p-6 md:col-span-8 lg:p-8"
            >
              <div className="space-y-5 sm:space-y-6">
                {/* Badge + Practice label */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant={isLegal ? "legal" : "tech"}
                    badgeStyle="filled"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Sparkles className="h-3 w-3" />
                    {isLegal ? "Юридическая практика" : "Цифровая практика"}
                  </Badge>
                </div>

                {/* Icon + Title inline */}
                <div className="flex items-start gap-4 sm:items-center sm:gap-5">
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16 sm:rounded-3xl lg:h-20 lg:w-20",
                      isLegal
                        ? "bg-gradient-to-br from-[var(--color-legal-primary)] to-[var(--color-legal-600)]"
                        : "bg-gradient-to-br from-[var(--color-tech-primary)] to-[var(--color-tech-600)]"
                    )}
                  >
                    <ServiceIcon
                      name={service.frontmatter.icon}
                      variant={isLegal ? "legal" : "tech"}
                      className="h-7 w-7 text-white sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Heading as="h1" size="2xl" weight="bold" className="leading-tight">
                      {service.frontmatter.title}
                    </Heading>
                  </div>
                </div>

                {/* Description */}
                <Text size="lg" tone="secondary" className="max-w-2xl leading-relaxed">
                  {service.frontmatter.description}
                </Text>

                {/* Focus items as pills */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {focusItems.map((focus) => (
                    <span
                      key={focus}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm",
                        "border backdrop-blur-sm transition-all",
                        isLegal
                          ? "border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50 text-[var(--color-text-primary)] hover:border-[var(--color-legal-primary)]/50"
                          : "border-[var(--color-tech-primary)]/30 bg-[var(--color-tech-surface)]/50 text-[var(--color-text-primary)] hover:border-[var(--color-tech-primary)]/50"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isLegal
                            ? "bg-[var(--color-legal-primary)]"
                            : "bg-[var(--color-tech-primary)]"
                        )}
                      />
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Price card with Quick Contact Form - spans 4 columns */}
            <ServiceHeroCard
              price={service.frontmatter.price}
              serviceName={service.frontmatter.title}
              variant={isLegal ? "legal" : "tech"}
            />
          </div>
        </Container>
      </Section>

      {/* Content - Modern Cards */}
      <Section spacing="lg">
        <Container className="max-w-6xl space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Badge
              variant={isLegal ? "legal" : "tech"}
              badgeStyle="subtle"
              size="sm"
              className="uppercase"
            >
              Что входит
            </Badge>
            <Heading as="h2" size="xl" weight="bold">
              Детали услуги «{service.frontmatter.title}»
            </Heading>
            <Text size="lg" tone="secondary">
              Структурируем задачи по блокам: от этапов запуска до конкретных deliverables.
            </Text>
          </div>
          {hasStructuredSections ? (
            <div className="space-y-8">
              {structuredSections.map((section) => {
                const SectionIcon = section.icon || CheckCircle2;
                const isPriceSection = section.contentType === "price-list";
                const isFeatureSection = section.contentType === "feature-list";

                const isHighlight = section.style === "highlight";

                return (
                  <Card
                    key={section.title}
                    variant={isLegal ? "legal" : "tech"}
                    className={cn(
                      "overflow-hidden",
                      isHighlight &&
                        (isLegal
                          ? "border-2 border-[var(--color-legal-primary)]/40 shadow-[var(--color-legal-primary)]/10 shadow-lg"
                          : "border-2 border-[var(--color-tech-primary)]/40 shadow-[var(--color-tech-primary)]/10 shadow-lg")
                    )}
                  >
                    {/* Section Header */}
                    <div
                      className={cn(
                        "flex items-center gap-4 border-b p-5 sm:p-6",
                        isHighlight
                          ? isLegal
                            ? "border-[var(--color-legal-primary)]/30 bg-gradient-to-r from-[var(--color-legal-primary)]/20 to-[var(--color-legal-surface)]/50"
                            : "border-[var(--color-tech-primary)]/30 bg-gradient-to-r from-[var(--color-tech-primary)]/20 to-[var(--color-tech-surface)]/50"
                          : isLegal
                            ? "border-[var(--color-legal-border)]/30 bg-[var(--color-legal-surface)]/30"
                            : "border-[var(--color-tech-border)]/30 bg-[var(--color-tech-surface)]/30"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          isLegal
                            ? "bg-[var(--color-legal-primary)]/10 text-[var(--color-legal-primary)]"
                            : "bg-[var(--color-tech-primary)]/10 text-[var(--color-tech-primary)]"
                        )}
                      >
                        <SectionIcon className="h-5 w-5" />
                      </div>
                      <Heading as="h3" size="lg" weight="semibold">
                        {section.title}
                      </Heading>
                    </div>

                    {/* Section Content */}
                    <div className="p-5 sm:p-6">
                      {/* Alert Blocks */}
                      {section.alerts && section.alerts.length > 0 && (
                        <div className="mb-5 space-y-3">
                          {section.alerts.map((alert, idx) => (
                            <div
                              key={`alert-${idx}`}
                              className={cn(
                                "flex items-start gap-3 rounded-xl border-l-4 p-4",
                                alert.variant === "warning"
                                  ? "border-l-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                                  : "border-l-blue-500 bg-blue-500/10 text-blue-900 dark:text-blue-200"
                              )}
                            >
                              <AlertTriangle
                                className={cn(
                                  "mt-0.5 h-5 w-5 shrink-0",
                                  alert.variant === "warning" ? "text-amber-500" : "text-blue-500"
                                )}
                              />
                              <Text size="sm" weight="medium" className="flex-1">
                                {alert.text}
                              </Text>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Price List Rendering */}
                      {isPriceSection && section.items && section.items.length > 0 ? (
                        <div className="space-y-4">
                          {/* Intro text if any */}
                          {section.markdown.split("\n")[0] &&
                            !section.markdown.split("\n")[0].startsWith("-") &&
                            !section.markdown.split("\n")[0].startsWith("#") && (
                              <Text size="sm" tone="secondary" className="mb-4">
                                {section.markdown.split("\n")[0]}
                              </Text>
                            )}

                          {/* Price items */}
                          <div className="grid gap-3 sm:grid-cols-2">
                            {section.items.map((item, idx) =>
                              item.isSubheading ? (
                                <div
                                  key={`${item.name}-${idx}`}
                                  className="col-span-full mt-2 first:mt-0"
                                >
                                  <Text size="sm" weight="semibold" tone="secondary">
                                    {item.name}
                                  </Text>
                                </div>
                              ) : (
                                <div
                                  key={`${item.name}-${idx}`}
                                  className={cn(
                                    "flex items-center justify-between gap-3 rounded-xl border p-4 transition-all",
                                    isLegal
                                      ? "border-[var(--color-legal-border)]/40 bg-[var(--color-legal-surface)]/20 hover:border-[var(--color-legal-primary)]/40"
                                      : "border-[var(--color-tech-border)]/40 bg-[var(--color-tech-surface)]/20 hover:border-[var(--color-tech-primary)]/40"
                                  )}
                                >
                                  <div className="min-w-0 flex-1">
                                    <Text size="sm" weight="medium">
                                      {item.name}
                                    </Text>
                                    {item.description && (
                                      <Text size="xs" tone="secondary" className="mt-0.5">
                                        {item.description}
                                      </Text>
                                    )}
                                  </div>
                                  {item.price && (
                                    <div
                                      className={cn(
                                        "shrink-0 rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap",
                                        isLegal
                                          ? "bg-[var(--color-legal-primary)]/10 text-[var(--color-legal-primary)]"
                                          : "bg-[var(--color-tech-primary)]/10 text-[var(--color-tech-primary)]"
                                      )}
                                    >
                                      {item.price}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : isFeatureSection && section.items && section.items.length > 0 ? (
                        /* Feature List Rendering - Different styles */
                        section.style === "steps" ? (
                          /* Numbered Steps Style */
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {section.items.map((item, idx) => (
                              <div
                                key={`${item.name}-${idx}`}
                                className={cn(
                                  "group relative overflow-hidden rounded-xl border p-5 transition-all hover:scale-[1.02]",
                                  isLegal
                                    ? "border-[var(--color-legal-primary)]/20 bg-[var(--color-legal-surface)]/30 hover:border-[var(--color-legal-primary)]/50"
                                    : "border-[var(--color-tech-primary)]/20 bg-[var(--color-tech-surface)]/30 hover:border-[var(--color-tech-primary)]/50"
                                )}
                              >
                                <div
                                  className={cn(
                                    "absolute -top-2 -right-2 text-[60px] leading-none font-black opacity-10",
                                    isLegal
                                      ? "text-[var(--color-legal-primary)]"
                                      : "text-[var(--color-tech-primary)]"
                                  )}
                                >
                                  {idx + 1}
                                </div>
                                <div className="relative">
                                  <Text size="sm" weight="semibold" className="mb-1">
                                    {item.name}
                                  </Text>
                                  {item.description && (
                                    <Text size="xs" tone="secondary">
                                      {item.description}
                                    </Text>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : section.style === "grid" ? (
                          /* Grid Cards Style for Benefits */
                          <div className="grid gap-4 sm:grid-cols-2">
                            {section.items.map((item, idx) => (
                              <div
                                key={`${item.name}-${idx}`}
                                className={cn(
                                  "flex gap-4 rounded-xl border p-5 transition-all",
                                  isLegal
                                    ? "border-[var(--color-legal-border)]/30 bg-gradient-to-br from-[var(--color-legal-surface)]/40 to-transparent"
                                    : "border-[var(--color-tech-border)]/30 bg-gradient-to-br from-[var(--color-tech-surface)]/40 to-transparent"
                                )}
                              >
                                <div
                                  className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                    isLegal
                                      ? "bg-[var(--color-legal-primary)]/15 text-[var(--color-legal-primary)]"
                                      : "bg-[var(--color-tech-primary)]/15 text-[var(--color-tech-primary)]"
                                  )}
                                >
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                  <Text size="sm" weight="semibold" className="mb-1">
                                    {item.name}
                                  </Text>
                                  {item.description && (
                                    <Text size="xs" tone="secondary" className="leading-relaxed">
                                      {item.description}
                                    </Text>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : section.style === "compact" ? (
                          /* Compact Horizontal Style */
                          <div className="flex flex-wrap gap-3">
                            {section.items.map((item, idx) => (
                              <div
                                key={`${item.name}-${idx}`}
                                className={cn(
                                  "flex items-center gap-2 rounded-full border px-4 py-2",
                                  isLegal
                                    ? "border-[var(--color-legal-border)]/40 bg-[var(--color-legal-surface)]/30"
                                    : "border-[var(--color-tech-border)]/40 bg-[var(--color-tech-surface)]/30"
                                )}
                              >
                                <CheckCircle2
                                  className={cn(
                                    "h-4 w-4",
                                    isLegal
                                      ? "text-[var(--color-legal-primary)]"
                                      : "text-[var(--color-tech-primary)]"
                                  )}
                                />
                                <Text size="sm" weight="medium">
                                  {item.name}
                                </Text>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Default Grid Style */
                          <div className="grid gap-3 sm:grid-cols-2">
                            {section.items.map((item, idx) => (
                              <div key={`${item.name}-${idx}`} className="flex items-start gap-3">
                                <div
                                  className={cn(
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                    isLegal
                                      ? "bg-[var(--color-legal-primary)]/10 text-[var(--color-legal-primary)]"
                                      : "bg-[var(--color-tech-primary)]/10 text-[var(--color-tech-primary)]"
                                  )}
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <div>
                                  <Text size="sm" weight="medium">
                                    {item.name}
                                  </Text>
                                  {item.description && (
                                    <Text size="xs" tone="secondary" className="mt-0.5">
                                      {item.description}
                                    </Text>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      ) : (
                        /* Default Prose Rendering */
                        <div
                          className="prose prose-neutral dark:prose-invert prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: section.html }}
                        />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card variant={isLegal ? "legal" : "tech"} className="p-6 sm:p-8">
              <div
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: service.html }}
              />
            </Card>
          )}
        </Container>
      </Section>

      {/* Workflow - Timeline Style */}
      <Section spacing="lg" background="secondary" className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div
            className={cn(
              "absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 md:block",
              isLegal
                ? "bg-gradient-to-b from-transparent via-[var(--color-legal-primary)]/20 to-transparent"
                : "bg-gradient-to-b from-transparent via-[var(--color-tech-primary)]/20 to-transparent"
            )}
          />
        </div>

        <Container className="relative max-w-6xl space-y-10">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Badge
              variant={isLegal ? "legal" : "tech"}
              badgeStyle="subtle"
              size="sm"
              className="uppercase"
            >
              Процесс
            </Badge>
            <Heading as="h2" size="xl" weight="bold">
              Как мы работаем над {isLegal ? "юридическими" : "digital"} проектами
            </Heading>
            <Text size="lg" tone="secondary">
              От запроса до измеримого результата — прозрачные фазы и еженедельные отчёты.
            </Text>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => (
              <Card
                key={step.title}
                variant={isLegal ? "legal" : "tech"}
                className={cn(
                  "group relative h-full overflow-hidden p-5 transition-all duration-300 hover:scale-[1.03]",
                  "border-2",
                  isLegal
                    ? "border-[var(--color-legal-primary)]/10 hover:border-[var(--color-legal-primary)]/40"
                    : "border-[var(--color-tech-primary)]/10 hover:border-[var(--color-tech-primary)]/40"
                )}
              >
                {/* Step number - large background */}
                <div
                  className={cn(
                    "absolute -top-3 -right-3 text-[80px] leading-none font-black opacity-5 transition-opacity group-hover:opacity-10",
                    isLegal
                      ? "text-[var(--color-legal-primary)]"
                      : "text-[var(--color-tech-primary)]"
                  )}
                >
                  {index + 1}
                </div>

                <div className="relative space-y-3">
                  <Heading as="h3" size="sm" weight="semibold">
                    {step.title}
                  </Heading>

                  <Text size="sm" tone="secondary" className="leading-relaxed">
                    {step.description}
                  </Text>
                </div>

                {/* Connector line for desktop */}
                {index < workflow.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-1/2 -right-3 hidden h-0.5 w-6 lg:block",
                      isLegal
                        ? "bg-[var(--color-legal-primary)]/30"
                        : "bg-[var(--color-tech-primary)]/30"
                    )}
                  />
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA - Gradient Style */}
      <Section spacing="xl">
        <Container className="max-w-5xl">
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16",
              "border-2 text-center",
              isLegal
                ? "border-[var(--color-legal-primary)]/30 bg-gradient-to-br from-[var(--color-legal-surface)] via-[var(--color-background-secondary)] to-[var(--color-legal-surface)]/50"
                : "border-[var(--color-tech-primary)]/30 bg-gradient-to-br from-[var(--color-tech-surface)] via-[var(--color-background-secondary)] to-[var(--color-tech-surface)]/50"
            )}
          >
            {/* Decorative elements */}
            <div
              className={cn(
                "pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-30 blur-3xl",
                isLegal ? "bg-[var(--color-legal-primary)]" : "bg-[var(--color-tech-primary)]"
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full opacity-20 blur-3xl",
                isLegal ? "bg-[var(--color-legal-primary)]" : "bg-[var(--color-tech-primary)]"
              )}
            />

            <div className="relative space-y-6">
              <Badge
                variant={isLegal ? "legal" : "tech"}
                badgeStyle="filled"
                size="sm"
                className="uppercase"
              >
                Следующий шаг
              </Badge>

              <Heading as="h3" size="xl" weight="bold" className="mx-auto max-w-xl">
                Обсудим {service.frontmatter.title} для вашей компании
              </Heading>

              <Text size="lg" tone="secondary" className="mx-auto max-w-lg">
                Поделитесь документацией или брифом — подготовим дорожную карту и бюджет за два
                рабочих дня.
              </Text>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  asChild
                  variant={isLegal ? "primary-legal" : "primary-tech"}
                  size="lg"
                  className="gap-2 px-8"
                >
                  <Link href="/#contact">
                    Назначить консультацию
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link href={`/services/${category}`}>Вернуться к услугам</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
