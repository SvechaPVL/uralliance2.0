"use client";

import { Timeline } from "@/components/animations/Timeline";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/primitives/button";
import { Search, Ruler, Settings, Rocket } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import sectionsConfig from "@/content/sections.json";

/**
 * ProcessTimeline Section
 *
 * Shows the 4-step work process with animated timeline
 * Part of User Story 2 (US2) - Main page sections
 *
 * Steps: Analysis → Prototype → Development → Launch
 */
export function ProcessTimeline() {
  // Icon mapping
  const iconMap: Record<string, React.ReactElement> = {
    Search: <Search className="text-legal-500 dark:text-legal-400 h-8 w-8" />,
    Ruler: <Ruler className="text-tech-500 dark:text-tech-400 h-8 w-8" />,
    Settings: <Settings className="text-legal-500 dark:text-legal-400 h-8 w-8" />,
    Rocket: <Rocket className="text-tech-500 dark:text-tech-400 h-8 w-8" />,
  };

  const steps = sectionsConfig.process.steps.map((step) => ({
    ...step,
    icon: iconMap[step.icon],
  }));

  return (
    <Section spacing="lg" background="gradient-light">
      <Container>
        {/* Section header */}
        <div className="mb-16 text-center">
          <Heading as="h2" size="2xl" weight="bold" className="mb-4">
            {sectionsConfig.process.heading}
          </Heading>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600 dark:text-neutral-400">
            {sectionsConfig.process.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <Timeline steps={steps} />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild variant={sectionsConfig.process.cta.variant as any} size="lg">
            <a href={sectionsConfig.process.cta.href}>
              {sectionsConfig.process.cta.label}
              <span className="text-xl">→</span>
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
