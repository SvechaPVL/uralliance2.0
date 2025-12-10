"use client";

import { useState } from "react";
import { Section } from "@/components/primitives/section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Label } from "@/components/primitives/label";
import { Card } from "@/components/primitives/card";
import { Cpu, ChevronDown } from "lucide-react";

const CRYPTOPRO_PRICES_MAIN = [
  { name: "КриптоПро CSP 5.0", price: 1850, period: "1 год" },
  { name: "КриптоПро Office Signature", price: 1200, period: "бессрочная" },
];

const CRYPTOPRO_PRICES_EXTRA = [
  { name: "КриптоПро CSP 5.0 (серверная)", price: 70000, period: "бессрочная" },
  { name: "КриптоПро TSP Client", price: 1800, period: "бессрочная" },
  { name: "КриптоПро OCSP Client", price: 1800, period: "бессрочная" },
  { name: "КриптоПро Revocation Provider", price: 1800, period: "бессрочная" },
];

export function CryptoProSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <Section spacing="md">
      <Container className="max-w-6xl space-y-8">
        <div className="text-center">
          <Label size="sm" spacing="wider" tone="muted">
            Программное обеспечение
          </Label>
          <Heading as="h2" size="xl" weight="semibold" className="mt-2">
            Лицензии КриптоПро
          </Heading>
          <Text size="lg" tone="secondary" className="mt-3">
            ПО для работы с электронной подписью
          </Text>
        </div>

        {/* Main licenses */}
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {CRYPTOPRO_PRICES_MAIN.map((item) => (
            <Card key={item.name} variant="tech" padding="md" className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-tech-surface)]">
                <Cpu className="h-6 w-6 text-[var(--color-tech-primary)]" />
              </div>
              <Heading as="h3" size="sm" weight="semibold">
                {item.name}
              </Heading>
              <Text size="sm" tone="secondary">
                {item.period}
              </Text>
              <div className="mt-3 text-2xl font-bold whitespace-nowrap text-[var(--color-tech-primary)]">
                {item.price.toLocaleString("ru-RU")}&nbsp;₽
              </div>
            </Card>
          ))}
        </div>

        {/* Extra licenses (collapsible but always rendered for SEO) */}
        <div
          className={`mx-auto grid max-w-4xl gap-4 overflow-hidden transition-all duration-300 sm:grid-cols-2 lg:grid-cols-4 ${
            showAll ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {CRYPTOPRO_PRICES_EXTRA.map((item) => (
            <Card key={item.name} variant="tech" padding="sm" className="text-center">
              <Heading as="h3" size="xs" weight="semibold">
                {item.name}
              </Heading>
              <Text size="xs" tone="secondary">
                {item.period}
              </Text>
              <div className="mt-2 text-lg font-bold whitespace-nowrap text-[var(--color-tech-primary)]">
                {item.price.toLocaleString("ru-RU")}&nbsp;₽
              </div>
            </Card>
          ))}
        </div>

        {/* Toggle button */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-tech-primary)]/30 bg-[var(--color-tech-surface)]/40 px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-tech-primary)] hover:bg-[var(--color-tech-surface)]"
          >
            {showAll ? "Скрыть" : "Показать все лицензии"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </Container>
    </Section>
  );
}
