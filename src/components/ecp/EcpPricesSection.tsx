"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/primitives/section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Label } from "@/components/primitives/label";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { FileKey, ChevronDown, FileText } from "lucide-react";

// Основные ЭЦП (всегда видны)
const ECP_PRICES_MAIN = [
  { name: "Физическим лицам", price: 2000, period: "1 год" },
  { name: "Самозанятым", price: 2000, period: "1 год" },
  { name: "Для сотрудников", price: 3000, period: "1 год" },
  { name: "Для директора/ИП", price: 3950, period: "1 год" },
  { name: "Продление ЭП от ФНС", price: 3950, period: "1 год" },
  { name: "Ключ представителя", price: 6000, period: "1 год" },
];

// Дополнительные ЭЦП (скрыты по умолчанию)
const ECP_PRICES_EXTRA = [
  { name: "Сотрудник + КриптоПро", price: 3950, period: "1 год" },
  { name: "Физлицо + КриптоПро", price: 2950, period: "1 год" },
  { name: "Неквалифицированная ЭП", price: 2300, period: "1 год" },
  { name: "Неквалифицированная + КриптоПро", price: 2950, period: "1 год" },
  { name: "КриптоViP", price: 3550, period: "1 год" },
  { name: "ЕГАИС", price: 3550, period: "1 год" },
  { name: "Электронные торги (Базовый)", price: 4950, period: "1 год" },
  { name: "Электронные торги (Универсальный)", price: 7950, period: "1 год" },
  { name: "Электронные торги (B2B-Center)", price: 6750, period: "1 год" },
  { name: "Петербургская Биржа", price: 4550, period: "1 год" },
];

export function EcpPricesSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <Section spacing="md" background="secondary">
      <Container className="max-w-6xl space-y-8">
        <div className="text-center">
          <Label size="sm" spacing="wider" tone="muted">
            Электронная подпись
          </Label>
          <Heading as="h2" size="xl" weight="semibold" className="mt-2">
            Виды ЭЦП и цены
          </Heading>
          <Text size="lg" tone="secondary" className="mt-3">
            Квалифицированные и неквалифицированные сертификаты
          </Text>
        </div>

        {/* Main ECP prices */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ECP_PRICES_MAIN.map((item) => (
            <Card key={item.name} variant="legal" padding="md">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-legal-surface)]">
                  <FileKey className="h-5 w-5 text-[var(--color-legal-primary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <Heading as="h3" size="sm" weight="semibold">
                    {item.name}
                  </Heading>
                  <Text size="sm" tone="secondary">
                    {item.period}
                  </Text>
                  <div className="mt-2 text-xl font-bold whitespace-nowrap text-[var(--color-legal-primary)]">
                    {item.price.toLocaleString("ru-RU")}&nbsp;₽
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Extra ECP prices (collapsible but always rendered for SEO) */}
        <div
          className={`mx-auto grid max-w-5xl gap-3 overflow-hidden transition-all duration-300 sm:grid-cols-2 lg:grid-cols-4 ${
            showAll ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {ECP_PRICES_EXTRA.map((item) => (
            <Card key={item.name} variant="legal" padding="sm">
              <Heading as="h3" size="sm" weight="semibold">
                {item.name}
              </Heading>
              <Text size="xs" tone="secondary">
                {item.period}
              </Text>
              <div className="mt-2 text-lg font-bold whitespace-nowrap text-[var(--color-legal-primary)]">
                {item.price.toLocaleString("ru-RU")}&nbsp;₽
              </div>
            </Card>
          ))}
        </div>

        {/* Toggle button + Full price link */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/40 px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]"
          >
            {showAll ? "Скрыть" : "Показать все виды ЭЦП"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
          <Button asChild variant="outline" size="sm">
            <Link href="/ecp/price">
              <FileText className="mr-2 h-4 w-4" />
              Полный прайс с описаниями
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
