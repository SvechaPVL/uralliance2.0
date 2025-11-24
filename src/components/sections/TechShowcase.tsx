"use client";

import { Container } from "@/components/layout/Container";
import { BentoGrid, type BentoGridItem } from "@/components/animations/BentoGrid";
import { Card3D } from "@/components/animations/Card3D";
import { TelegramChat } from "@/components/showcases/TelegramChat";
import { CrmMatrix } from "@/components/showcases/CrmMatrix";
import { WebBrowserShowcase } from "@/components/showcases/WebBrowser";
import { MobileCafeApp } from "@/components/showcases/MobileCafeApp";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { motion } from "framer-motion";
import sectionsConfig from "@/content/sections.json";

const bentoItems: BentoGridItem[] = [
  {
    id: "crm",
    colSpan: 3,
    rowSpan: 2,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="relative flex h-full flex-col justify-between gap-6 p-6">
          <div>
            <Label
              as="span"
              size="sm"
              spacing="wider"
              tone="tech"
              className="inline-flex items-center rounded-full border border-[var(--color-tech-border-soft)] px-3 py-1"
            >
              {sectionsConfig.tech_showcase.cards.crm.badge}
            </Label>
            <Heading as="h3" size="lg" weight="semibold" className="mt-4">
              {sectionsConfig.tech_showcase.cards.crm.title}
            </Heading>
            <Text size="base" tone="secondary" className="mt-3">
              {sectionsConfig.tech_showcase.cards.crm.description}
            </Text>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)]">
            {sectionsConfig.tech_showcase.cards.crm.features.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                {item}
              </div>
            ))}
          </div>
          <div className="showcase-container mt-4 flex-1">
            <CrmMatrix />
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "bots",
    colSpan: 2,
    rowSpan: 2,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col gap-2 p-6 sm:gap-4">
          <div>
            <Label
              as="span"
              size="sm"
              spacing="wider"
              tone="white"
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 opacity-80"
            >
              {sectionsConfig.tech_showcase.cards.bots.badge}
            </Label>
            <Heading as="h3" size="md" weight="semibold" tone="white" className="mt-4">
              {sectionsConfig.tech_showcase.cards.bots.title}
            </Heading>
            <Text size="sm" className="mt-2 text-white/80">
              {sectionsConfig.tech_showcase.cards.bots.description}
            </Text>
          </div>
          <div className="showcase-container flex flex-1 items-center justify-center">
            <TelegramChat />
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "whatsapp",
    colSpan: 2,
    rowSpan: 1,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col justify-between gap-2 p-6 sm:gap-4">
          <Label as="span" size="sm" spacing="widest" tone="tech">
            {sectionsConfig.tech_showcase.cards.whatsapp.badge}
          </Label>
          <Heading as="h3" size="sm" weight="semibold">
            {sectionsConfig.tech_showcase.cards.whatsapp.title}
          </Heading>
          <Text size="sm" tone="secondary">
            {sectionsConfig.tech_showcase.cards.whatsapp.description}
          </Text>
          <div className="showcase-container mt-2 flex-1">
            {/* Desktop: single phone */}
            <div className="hidden sm:block">
              <MobileCafeApp />
            </div>
            {/* Mobile: horizontal scroll with multiple phones */}
            <div className="flex gap-4 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
              <div className="flex-shrink-0 scale-90">
                <MobileCafeApp />
              </div>
              <div className="flex-shrink-0 scale-90">
                <MobileCafeApp />
              </div>
              <div className="flex-shrink-0 scale-90">
                <MobileCafeApp />
              </div>
            </div>
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "web",
    colSpan: 3,
    rowSpan: 1,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col justify-between gap-2 p-6 sm:gap-4">
          <Label as="div" size="sm" spacing="widest" tone="muted">
            {sectionsConfig.tech_showcase.cards.web.additionalBadge}
          </Label>
          <Heading as="h3" size="md" weight="semibold">
            {sectionsConfig.tech_showcase.cards.web.title}
          </Heading>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]">
            {sectionsConfig.tech_showcase.cards.web.features.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-border-soft)] px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="showcase-container flex-1 pt-4">
            <WebBrowserShowcase />
          </div>
        </div>
      </Card3D>
    ),
  },
];

export function TechShowcase() {
  return (
    <Section spacing="xl" overflow="visible">
      <Container className="relative z-10 flex flex-col select-none">
        <div className="mb-6 max-w-3xl sm:mb-8 lg:mb-12">
          <Label size="md" spacing="widest" tone="muted">
            {sectionsConfig.tech_showcase.label}
          </Label>
          <Heading as="h2" size="2xl" weight="semibold" className="mt-3 sm:mt-4">
            {sectionsConfig.tech_showcase.heading}
          </Heading>
          <Text size="base" tone="secondary" className="mt-2 sm:mt-3">
            {sectionsConfig.tech_showcase.description}
          </Text>
        </div>

        {/* Swipe hint for mobile */}
        <motion.div
          className="mb-4 flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span>Попробуйте свайпать</span>
        </motion.div>

        <div className="mx-auto mt-12 max-w-[1500px] px-4 sm:mt-0 lg:px-12">
          <BentoGrid items={bentoItems} rowHeight="minmax(260px, auto)" />
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 top-10 opacity-40">
        <div className="mx-auto h-72 w-72 rounded-full bg-gradient-to-br from-[var(--color-tech-surface-strong)] to-transparent blur-3xl" />
      </div>
    </Section>
  );
}
