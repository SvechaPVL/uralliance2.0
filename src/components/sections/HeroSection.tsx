"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { useHeroProgress } from "@/context/HeroProgressContext";
import sectionsConfig from "@/content/sections.json";

// Dynamic import ThreeScene with SSR disabled (Next.js recommended approach)
const ThreeScene = dynamic(
  () => import("@/components/animations/ThreeScene").then((mod) => mod.ThreeScene),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * HeroSection Component
 *
 * Split-screen Hero section with Legal/Tech identity morphing
 * Features premium animations and interactive 3D elements
 *
 * Features:
 * - Split-screen design (Legal gold left, Tech cyan right)
 * - Hover morphing effect (accent colors shift)
 * - Glowing center line with pulse animation
 * - Particles background effect
 * - 3D scene on Tech side (lazy loaded)
 * - Magnetic CTA buttons
 * - Responsive (vertical stack on mobile)
 * - Accessible keyboard navigation
 * - Respects prefers-reduced-motion
 *
 * Layout:
 * Desktop: Side-by-side (50/50 split)
 * Mobile: Vertical stack (Legal on top, Tech below)
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const legalTags = sectionsConfig.hero.legal.tags;
  const techFeatures = sectionsConfig.hero.tech.features;
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const { setProgress } = useHeroProgress();
  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      const clampedHeight = Math.max(rect.height, 1);
      const rawProgress = -rect.top / clampedHeight;
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(nextProgress);
    };

    handleScroll();

    let raf = 0;
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [setProgress]);
  const [desktopViewport, setDesktopViewport] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return false;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => setDesktopViewport(event.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);
  const shouldRenderThreeScene = !prefersReducedMotion && desktopViewport;

  return (
    <Section
      variant="hero"
      overflow="hidden"
      className="select-none"
      aria-label="Hero section"
      ref={heroSectionRef}
    >
      {/* 3D Background Scene */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {shouldRenderThreeScene ? (
          <ThreeScene className="h-full w-full" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.35),rgba(3,7,18,0.95))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.85)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="relative mb-6 text-center sm:mb-10 lg:mb-12 lg:text-left">
          <Label
            as="span"
            size="sm"
            spacing="wider"
            tone="muted"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-card-bg)] px-4 py-2 backdrop-blur"
          >
            {sectionsConfig.hero.main.tagline}
          </Label>
          <Text
            size="base"
            tone="secondary"
            maxWidth="3xl"
            className="mx-auto mt-3 sm:mt-4 lg:mx-0"
          >
            {sectionsConfig.hero.main.description}
          </Text>
        </header>

        <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Legal Side Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          >
            <Card variant="legal" padding="lg" className="relative overflow-hidden" withParticles>
              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-legal-border-soft)] bg-[var(--color-legal-badge)] px-4 py-2 backdrop-blur-sm sm:mb-5 lg:mb-6">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-legal-primary)]" />
                  <span className="text-sm font-semibold text-[var(--color-legal-primary)]">
                    {sectionsConfig.hero.legal.badge}
                  </span>
                </div>

                {/* Heading */}
                <Heading
                  as="h1"
                  size="2xl"
                  weight="bold"
                  tone="primary"
                  display
                  className="mb-4 sm:mb-5 lg:mb-6"
                >
                  {sectionsConfig.hero.legal.title}
                </Heading>

                {/* Description */}
                <Text size="lg" tone="secondary" leading="relaxed" className="mb-4 sm:mb-5 lg:mb-6">
                  {sectionsConfig.hero.legal.description}
                </Text>

                {/* Tags */}
                <div className="mb-6 grid grid-cols-2 gap-2 text-sm text-[var(--color-text-secondary)] sm:mb-7 sm:gap-3 lg:mb-8">
                  {legalTags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-legal-primary)] shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                      {tag}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <MagneticButton strength={20}>
                  <Button
                    variant="primary-legal"
                    size="lg"
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {sectionsConfig.hero.legal.cta.label}
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </motion.div>

          {/* Tech Side Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            <Card variant="tech" padding="lg" className="relative overflow-hidden" withParticles>
              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-tech-border-soft)] bg-[var(--color-tech-badge)] px-4 py-2 backdrop-blur-sm sm:mb-5 lg:mb-6">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-tech-primary)]" />
                  <span className="text-sm font-semibold text-[var(--color-tech-primary)]">
                    {sectionsConfig.hero.tech.badge}
                  </span>
                </div>

                {/* Heading */}
                <Heading
                  as="h2"
                  size="2xl"
                  weight="bold"
                  tone="primary"
                  display
                  className="mb-4 sm:mb-5 lg:mb-6"
                >
                  {sectionsConfig.hero.tech.title}
                </Heading>

                {/* Description */}
                <Text size="lg" tone="secondary" leading="relaxed" className="mb-4 sm:mb-5 lg:mb-6">
                  {sectionsConfig.hero.tech.description}
                </Text>

                {/* Feature list */}
                <div className="mb-6 grid grid-cols-2 gap-2 text-sm text-[var(--color-text-secondary)] sm:mb-7 sm:gap-3 lg:mb-8">
                  {techFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant={sectionsConfig.hero.tech.cta[0].variant as "secondary-tech"}
                    size="lg"
                  >
                    <a href={sectionsConfig.hero.tech.cta[0].href}>
                      {sectionsConfig.hero.tech.cta[0].label}
                    </a>
                  </Button>
                  <MagneticButton strength={20}>
                    <Button
                      variant={sectionsConfig.hero.tech.cta[1].variant as "primary-tech"}
                      size="lg"
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {sectionsConfig.hero.tech.cta[1].label}
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div className="mt-12 flex flex-col items-center gap-4 text-[var(--color-text-muted)] sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
          <div className="hidden h-px w-16 bg-[var(--color-border)]/70 sm:block" />
          <Label
            as="span"
            size="xs"
            spacing="widest"
            tone="muted"
            className="text-center sm:text-left"
          >
            {sectionsConfig.hero.main.bottomHint}
          </Label>
          <div className="hidden h-px w-16 bg-[var(--color-border)]/70 sm:block" />
        </div>
      </div>
    </Section>
  );
}
