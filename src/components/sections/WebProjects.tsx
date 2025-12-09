"use client";

import { MacbookScrollDemo } from "@/components/animations/MacbookScroll";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import sectionsConfig from "@/content/sections.json";

export function WebProjects() {
  return (
    <Section spacing="lg" overflow="hidden">
      <div className="mx-auto max-w-5xl overflow-hidden px-4">
        <div className="mb-10 text-center">
          <Label size="sm" spacing="wider" tone="muted">
            {sectionsConfig.web_projects.label}
          </Label>
          <Heading as="h3" size="xl" weight="semibold" className="mt-4">
            {sectionsConfig.web_projects.heading}
          </Heading>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            {sectionsConfig.web_projects.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 px-4 py-1 text-[var(--color-text-secondary)]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <MacbookScrollDemo />
      </div>
    </Section>
  );
}
