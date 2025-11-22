"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { List } from "@/components/primitives/list";
import pricePreviewData from "@/content/price-preview.json";
import sectionsConfig from "@/content/sections.json";

/**
 * PricePreview Section
 *
 * Shows a preview of pricing with 3 main categories
 * Part of User Story 2 (US2) - Main page sections
 *
 * Categories: Consultation, Development, Integration
 * Data source: /content/price-preview.json
 */

interface PriceCard {
  id: string;
  title: string;
  description: string;
  price: number;
  priceFrom: boolean;
  unit: string;
  badge: string;
  practice: "legal" | "tech" | "both";
  featured?: boolean;
  features: string[];
}

export function PricePreview() {
  const priceCards = pricePreviewData as PriceCard[];

  // Helper function to get gradient classes based on practice
  const getGradientClasses = (practice: string) => {
    if (practice === "both") {
      return {
        bgGradient: "from-legal-500/10 via-tech-500/10 to-legal-500/5",
        textGradient: "from-legal-500 via-tech-500 to-legal-600",
      };
    }
    if (practice === "tech") {
      return {
        bgGradient: "from-tech-500/10 to-tech-500/5",
        textGradient: "from-tech-500 to-tech-600",
      };
    }
    return {
      bgGradient: "from-legal-500/10 to-legal-500/5",
      textGradient: "from-legal-500 to-legal-600",
    };
  };

  return (
    <Section spacing="lg" background="gradient-light">
      <Container>
        {/* Section header */}
        <div className="text-center mb-16">
          <Heading as="h2" size="2xl" weight="bold" className="mb-4">
            {sectionsConfig.price_preview.heading}
          </Heading>
          <Text size="xl" maxWidth="2xl" className="mx-auto text-neutral-600 dark:text-neutral-400">
            {sectionsConfig.price_preview.description}
          </Text>
        </div>

        {/* Price cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {priceCards.map((card, index) => {
            const gradientClasses = getGradientClasses(card.practice);
            const isLegal = card.practice === "legal";
            const isTech = card.practice === "tech" || card.featured;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative"
              >
                <Card
                  variant={isTech ? "tech" : "legal"}
                  padding="lg"
                  hoverable
                  className="h-full relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientClasses.bgGradient} opacity-50 pointer-events-none`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Badge */}
                    <Badge
                      variant={isTech ? "tech" : "legal"}
                      className="text-xs mb-4 w-fit"
                    >
                      {card.badge}
                    </Badge>

                    {/* Title */}
                    <Heading as="h3" size="lg" weight="bold" className="mb-2">
                      {card.title}
                    </Heading>

                    {/* Description */}
                    <Text size="base" tone="muted" className="mb-6 min-h-[3rem]">
                      {card.description}
                    </Text>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                          {card.priceFrom ? "от " : ""}
                          {card.price.toLocaleString("ru-RU")}
                        </span>
                        <Text size="xl" tone="muted">{card.unit}</Text>
                      </div>
                    </div>

                    {/* Features */}
                    <List
                      variant="checkmark"
                      spacing="md"
                      markerTone={isTech ? "tech" : "legal"}
                      className="mb-8 flex-grow"
                    >
                      {card.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </List>

                    {/* CTA */}
                    <Button
                      variant={isTech ? "primary-tech" : "primary-legal"}
                      size="md"
                      fullWidth
                    >
                      {sectionsConfig.price_preview.button}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Full price list CTA */}
        <div className="text-center">
          <Link
            href={sectionsConfig.price_preview.cta.href}
            className="inline-flex items-center gap-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:text-tech-500 dark:hover:text-tech-400 transition-colors duration-300"
          >
            {sectionsConfig.price_preview.cta.label}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
