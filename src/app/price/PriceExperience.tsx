"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
import type { PriceItem } from "@/types/content";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { List } from "@/components/primitives/list";
import { Text } from "@/components/primitives/text";

type FilterCategory = "all" | "legal" | "tech";
type SortOrder = "featured" | "asc" | "desc";

interface PriceExperienceProps {
  prices: PriceItem[];
}

const currencyFormatter = new Intl.NumberFormat("ru-RU");

const summaryBullets = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Комплексность",
    description: "Legal + Tech экспертиза в одной команде",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Прозрачность",
    description: "Фиксируем условия в договоре и SLA",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Единый стиль",
    description: "Сильный визуал и анимации для всех решений",
  },
];

export function PriceExperience({ prices }: PriceExperienceProps) {
  const [category, setCategory] = useState<FilterCategory>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const stats = useMemo(() => {
    const legalCount = prices.filter((item) => item.practice === "legal").length;
    const techCount = prices.length - legalCount;
    const featuredCount = prices.filter((item) => item.featured).length;
    const minPrice = Math.min(...prices.map((item) => item.price));
    const maxPrice = Math.max(...prices.map((item) => item.price));
    const averagePrice = Math.round(
      prices.reduce((acc, item) => acc + item.price, 0) / prices.length
    );

    return {
      legalCount,
      techCount,
      featuredCount,
      minPrice,
      maxPrice,
      averagePrice,
      total: prices.length,
    };
  }, [prices]);

  const categoryCards = useMemo(
    () => [
      {
        value: "all" as FilterCategory,
        label: "Все направления",
        description: `${stats.total} позиций`,
        tone: "neutral",
        pill: "Legal + Tech",
      },
      {
        value: "legal" as FilterCategory,
        label: "Legal практика",
        description: `${stats.legalCount} услуг`,
        tone: "legal",
        pill: "Арбитраж, налоги, договоры",
      },
      {
        value: "tech" as FilterCategory,
        label: "Tech решения",
        description: `${stats.techCount} услуг`,
        tone: "tech",
        pill: "CRM, интеграции, боты",
      },
    ],
    [stats]
  );

  const filteredPrices = useMemo(() => {
    let list = [...prices];

    if (category !== "all") {
      list = list.filter((item) => item.practice === category);
    }

    if (sortOrder === "asc") {
      return list.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      return list.sort((a, b) => b.price - a.price);
    }

    return list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
  }, [prices, category, sortOrder]);

  const toggleSortOrder = () => {
    if (sortOrder === "featured") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("featured");
    }
  };

  const sortLabel =
    sortOrder === "featured"
      ? "Сначала рекомендуемые"
      : sortOrder === "asc"
        ? "По цене ↑"
        : "По цене ↓";

  return (
    <>
      {/* Hero */}
      <Section spacing="lg">
        <Container className="space-y-10">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge variant="tech" badgeStyle="subtle" size="sm">
                  Offer Catalog · 2025
                </Badge>
                <Badge variant="legal" badgeStyle="subtle" size="sm">
                  Обновлено ежемесячно
                </Badge>
              </div>

              <div className="space-y-6">
                <Heading as="h1" size="2xl" weight="semibold">
                  Актуальный прайс-лист Legal + Tech
                </Heading>
                <Text size="lg" tone="secondary" className="sm:text-xl">
                  Прозрачные тарифы на арбитраж, договорную работу, интеграции и цифровые продукты.
                  Стоимость фиксируем в договоре и сопровождаем проект до результата.
                </Text>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/#contact">Получить точный расчёт</Link>
                </Button>
                <Button asChild variant="outline-legal" size="lg">
                  <Link href="/services/legal">Смотреть услуги</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {summaryBullets.map((bullet) => (
                  <Card key={bullet.title} variant="glass" padding="md" className="space-y-2">
                    <Text tone="muted">{bullet.icon}</Text>
                    <Label size="md" weight="semibold" spacing="wide" tone="muted">
                      {bullet.title}
                    </Label>
                    <Text size="base" tone="secondary">{bullet.description}</Text>
                  </Card>
                ))}
              </div>
            </div>
        </Container>
      </Section>

      {/* Filters */}
      <Section spacing="sm" background="secondary" bordered backdropBlur>
        <Container className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Label size="md" spacing="wider" tone="muted">
                Фильтрация
              </Label>
              <Heading as="h2" size="lg" weight="semibold">Настройте прайс под ваш сценарий</Heading>
            </div>

            <Button
              type="button"
              variant="outline-tech"
              size="sm"
              icon={<ArrowUpDown className="h-4 w-4" />}
              onClick={toggleSortOrder}
            >
              {sortLabel}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categoryCards.map((card) => (
              <Card
                key={card.value}
                variant="glass"
                padding="md"
                hoverable
                onClick={() => setCategory(card.value)}
                className={cn(
                  "cursor-pointer text-left",
                  card.value === category && "ring-2 ring-[var(--color-text-primary)]"
                )}
                aria-pressed={card.value === category}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCategory(card.value);
                  }
                }}
              >
                <Label size="sm" spacing="wider" tone="muted">
                  {card.label}
                </Label>
                <Text size="2xl" weight="semibold" className="mt-2">{card.description}</Text>
                <Text size="sm" tone="secondary" className="mt-3">{card.pill}</Text>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InsightBadge label="Включены работы" value="Аналитика, дизайн, разработка" />
            <InsightBadge label="Срок запуска" value="от 10 рабочих дней" />
            <InsightBadge label="Формат оплаты" value="50/50 или milestone" />
            <InsightBadge label="Гарантии" value="SLA + юридическая защита" />
          </div>
        </Container>
      </Section>

      {/* Pricing grid */}
      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredPrices.map((price) => (
              <Card
                key={price.id}
                variant={price.practice === "legal" ? "legal" : "tech"}
                hoverable
                className="flex h-full flex-col gap-6 p-7"
              >
                {price.featured && (
                  <Badge variant="tech" badgeStyle="filled" size="sm" className="absolute right-5 top-5">
                    ТОП
                  </Badge>
                )}

                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10">
                    <ServiceIcon
                      name={getIconForService(price.id)}
                      variant={price.practice}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <Heading as="h3" size="lg" weight="semibold">{price.title}</Heading>
                  </div>

                  <div className="space-y-1">
                    <Label size="sm" spacing="wider" tone="muted">
                      Стоимость
                    </Label>
                    <Text size="2xl" weight="semibold">
                      {price.priceFrom ? "от " : ""}
                      {currencyFormatter.format(price.price)} ₽
                    </Text>
                  </div>

                  {price.features && (
                    <List variant="checkmark" spacing="sm" className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      {price.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </List>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant={price.practice === "legal" ? "primary-legal" : "primary-tech"}
                    size="sm"
                    className="flex-1"
                  >
                    <Link href="/#contact">
                      Запросить смету
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant={price.practice === "legal" ? "outline-legal" : "outline-tech"}
                    size="sm"
                  >
                    <Link href={price.practice === "legal" ? "/services/legal" : "/services/tech"}>
                      Подробнее
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" className="pb-24 pt-0">
        <Container>
          <Card variant="glass" padding="lg" className="text-center">
            <div className="space-y-6">
              <Label size="md" spacing="wider" tone="muted">
                Готовы обсудить стоимость?
              </Label>
              <Heading as="h3" size="lg" weight="semibold">
                Синхронизируем Legal и Tech бюджет под ваш roadmap
              </Heading>
              <Text size="lg" tone="secondary">
                Отправьте нам документацию или ТЗ — команда Uralliance подготовит расчёт и предложит
                два сценария запуска.
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="primary-tech" size="lg">
                  <Link href="/contacts">
                    Назначить звонок
                  </Link>
                </Button>
                <Button asChild variant="outline-tech" size="lg">
                  <Link href="mailto:info@uralliance.ru">
                    info@uralliance.ru
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

function InsightBadge({ label, value }: { label: string; value: string }) {
  return (
    <Card variant="glass" padding="sm" className="border-dashed">
      <Label size="sm" spacing="wider" tone="muted">{label}</Label>
      <Text size="sm" weight="semibold" tone="secondary" className="mt-1">{value}</Text>
    </Card>
  );
}

function getIconForService(id: string): string {
  const iconMap: Record<string, string> = {
    "legal-arbitrazh": "Scale",
    "legal-corporate": "Briefcase",
    "legal-consultation": "FileText",
    "legal-bankruptcy": "Shield",
    "legal-tax": "Gavel",
    "legal-contracts": "PenTool",
    "tech-crm": "Database",
    "tech-web": "Globe",
    "tech-bot": "MessageSquare",
    "tech-1c": "Package",
    "tech-consultation": "Code",
    "tech-analytics": "BarChart",
    "tech-support": "Headphones",
  };

  return iconMap[id] || "FileText";
}

export default PriceExperience;
