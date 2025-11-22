"use client";

import { Container } from "@/components/layout/Container";
import { IPhoneMockup } from "@/components/animations/IPhoneMockup";
import { motion } from "framer-motion";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import sectionsConfig from "@/content/sections.json";

export function MobileApps() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="mb-12 text-center">
          <Label size="sm" spacing="wider" tone="muted">
            {sectionsConfig.mobile_apps.label}
          </Label>
          <Heading as="h3" size="xl" weight="semibold" className="mt-4">
            {sectionsConfig.mobile_apps.heading}
          </Heading>
          <div className="mt-4 flex justify-center gap-3 text-xs">
            {sectionsConfig.mobile_apps.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--color-border-soft)] px-3 py-1 text-[var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {/* Scroll hint for mobile */}
        <motion.div
          className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-secondary)] sm:hidden"
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
          <span>Листайте влево</span>
        </motion.div>

        <div className="relative">
          <div className="flex items-end justify-start overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:mt-10 sm:flex-wrap sm:justify-center sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <motion.div
              className="scale-75 sm:scale-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <IPhoneMockup
                model="15-pro"
                color="space-black"
                scale={0.85}
                wallpaper="/images/mobile_apps/food_delivery_app.svg"
                wallpaperFit="cover"
                wallpaperPosition="top center"
              />
            </motion.div>
            <motion.div
              className="scale-75 sm:scale-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <IPhoneMockup
                model="15"
                color="midnight"
                scale={0.85}
                wallpaper="/images/mobile_apps/fitness_app.svg"
                wallpaperFit="cover"
                wallpaperPosition="top center"
              />
            </motion.div>
            <motion.div
              className="scale-75 sm:scale-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <IPhoneMockup
                model="15-pro"
                color="natural-titanium"
                scale={0.85}
                wallpaper="/images/mobile_apps/shop_app.svg"
                wallpaperFit="cover"
                wallpaperPosition="top center"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
