import { getServiceBySlug, getAllServiceSlugs } from "@/lib/content";
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
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { List } from "@/components/primitives/list";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

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

interface ContentSection {
  title: string;
  markdown: string;
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
        sections.push({
          title: currentTitle,
          markdown: buffer.join("\n").trim(),
        });
      }
      currentTitle = line.replace(/^##\s+/, "").trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  if (currentTitle && buffer.length) {
    sections.push({
      title: currentTitle,
      markdown: buffer.join("\n").trim(),
    });
  }

  return sections.filter((section) => section.markdown.length > 0);
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

    return {
      title: `${service.frontmatter.title} | ${isLegal ? "Юридические услуги" : "IT-услуги"} | Uralliance`,
      description: service.frontmatter.description,
      keywords: service.frontmatter.seo.keywords,
      openGraph: {
        title: service.frontmatter.title,
        description: service.frontmatter.description,
        type: "website",
        images: service.frontmatter.seo.ogImage ? [{ url: service.frontmatter.seo.ogImage }] : [],
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
      {/* Hero */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-5xl">
          <Card variant="glass" className="space-y-10 p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={isLegal ? "legal" : "tech"} badgeStyle="subtle" size="sm" className="uppercase tracking-[0.3em]">
                {isLegal ? "Legal" : "Tech"}
              </Badge>
              <Label size="sm" spacing="wider" tone="muted">
                {isLegal ? "Юридическая практика Uralliance" : "Цифровая практика Uralliance"}
              </Label>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.4fr,0.8fr]">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Badge
                    variant={isLegal ? "legal" : "tech"}
                    badgeStyle="filled"
                    className="h-20 w-20 rounded-3xl"
                  >
                    <ServiceIcon
                      name={service.frontmatter.icon}
                      variant={isLegal ? "legal" : "tech"}
                      className="h-10 w-10"
                    />
                  </Badge>
                  <div className="space-y-4">
                    <Heading as="h1" size="2xl" weight="semibold">
                      {service.frontmatter.title}
                    </Heading>
                    <Text size="lg" tone="secondary">
                      {service.frontmatter.description}
                    </Text>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {focusItems.map((focus) => (
                    <Badge
                      key={focus}
                      variant={isLegal ? "legal" : "tech"}
                      badgeStyle="subtle"
                      size="sm"
                      className="rounded-full px-4 py-1 text-xs uppercase tracking-[0.2em]"
                    >
                      {focus}
                    </Badge>
                  ))}
                </div>
              </div>

              <Card variant="glass" padding="md">
                <List variant="feature" spacing="lg">
                  <li>
                    <Label size="sm" spacing="wider" tone="muted">
                      Стоимость
                    </Label>
                    <Text size="lg" weight="semibold" className="mt-1">
                      {service.frontmatter.price}
                    </Text>
                  </li>
                  <li>
                    <Label size="sm" spacing="wider" tone="muted">
                      Команда
                    </Label>
                    <Text size="sm" tone="secondary" className="mt-1">
                      {isLegal ? "Партнёры-юристы и судебная команда" : "Менеджер проекта, дизайнер и разработчики"}
                    </Text>
                  </li>
                  <li>
                    <Label size="sm" spacing="wider" tone="muted">
                      Формат
                    </Label>
                    <Text size="sm" tone="secondary" className="mt-1">
                      Соберём отдельную команду под задачу, зафиксируем результаты договором и понятными отчётами.
                    </Text>
                  </li>
                </List>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant={isLegal ? "primary-legal" : "primary-tech"} size="md">
                    <Link href="/contacts">Обсудить задачу</Link>
                  </Button>
                  <Button asChild variant="outline" size="md">
                    <Link href={`/services/${category}`}>Все услуги</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Content */}
      <Section spacing="md">
        <Container className="max-w-5xl space-y-8">
          <div className="space-y-3 text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Что входит
            </Label>
            <Heading as="h2" size="xl" weight="semibold">
              Детали услуги «{service.frontmatter.title}»
            </Heading>
            <Text size="lg" tone="secondary">
              Структурируем задачи по блокам: от этапов запуска до конкретных deliverables.
            </Text>
          </div>
          {hasStructuredSections ? (
            <div className="grid gap-6 md:grid-cols-2">
              {structuredSections.map((section) => (
                <Card key={section.title} variant="glass" padding="md" className="space-y-4">
                  <Heading as="h3" size="lg" weight="semibold">
                    {section.title}
                  </Heading>
                  <div
                    className="prose prose-neutral dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: section.html }}
                  />
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="glass" className="p-8">
              <div
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: service.html }}
              />
            </Card>
          )}
        </Container>
      </Section>

      {/* Workflow */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-5xl space-y-8">
          <div className="text-center space-y-3">
            <Label size="sm" spacing="wider" tone="muted">
              Процесс
            </Label>
            <Heading as="h2" size="xl" weight="semibold">
              Как мы работаем над {isLegal ? "юридическими" : "digital"} проектами
            </Heading>
            <Text size="lg" tone="secondary">
              От запроса до измеримого результата команда ведёт прозрачные фазы и отправляет отчёты еженедельно.
            </Text>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {workflow.map((step, index) => (
              <Card
                key={step.title}
                variant="glass"
                padding="md"
                className="h-full"
              >
                <Label size="sm" spacing="wider" tone="muted">
                  Шаг {String(index + 1).padStart(2, "0")}
                </Label>
                <Heading as="h3" size="lg" weight="semibold" className="mt-3">
                  {step.title}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {step.description}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container className="max-w-4xl">
          <Card variant="glass" padding="lg" className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Следующий шаг
            </Label>
            <Heading as="h3" size="lg" weight="semibold">
              Обсудим {service.frontmatter.title} для вашей компании
            </Heading>
            <Text size="lg" tone="secondary">
              Поделитесь документацией или брифом — подготовим дорожную карту и бюджет за два рабочих дня.
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant={isLegal ? "primary-legal" : "primary-tech"} size="lg">
                <Link href="/#contact">Назначить консультацию</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/services/${category}`}>Вернуться к услугам</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
