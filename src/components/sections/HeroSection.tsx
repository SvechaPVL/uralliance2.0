"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackCTAClick, getABVariant } from "@/lib/analytics";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { useHeroProgress } from "@/context/HeroProgressContext";
import sectionsConfig from "@/content/sections.json";
import Link from "next/link";
import { Newspaper, FileKey, FileText, ArrowRight, Globe } from "lucide-react";

// Tag to URL mapping for legal services
const LEGAL_TAG_LINKS: Record<string, string> = {
  "Ликвидация": "/services/legal/liquidation",
  "Реорганизация": "/services/legal/reorganization",
  "Судебные споры": "/services/legal/arbitrazh",
  "Бухгалтерия": "/services/legal/accounting",
  "Договоры": "/services/legal/contracts",
};

// Tag to URL mapping for tech services
const TECH_TAG_LINKS: Record<string, string> = {
  "Чат-боты для клиентов": "/services/tech/bots",
  "Сайты и приложения": "/services/tech/web",
  "Связь с вашими программами": "/services/tech/crm",
  "Связь с 1С": "/services/tech/1c",
};

// Quick links for hero section
const QUICK_LINKS = [
  {
    href: "/services/legal/vestnik",
    label: "Журнал Вестник",
    icon: Newspaper,
    variant: "legal" as const,
  },
  {
    href: "/services/legal/fedresurs",
    label: "Федресурс",
    icon: Globe,
    variant: "legal" as const,
  },
  {
    href: "/ecp",
    label: "ЭЦП и Рутокены",
    icon: FileKey,
    variant: "legal" as const,
  },
  {
    href: "/edo",
    label: "ЭДО и Отчётность",
    icon: FileText,
    variant: "legal" as const,
  },
];

// A/B Test: Hero CTA Button Texts
const HERO_CTA_VARIANTS = {
  A: {
    legal: "Получить консультацию",
    tech: "Обсудить проект",
  },
  B: {
    legal: "Записаться на встречу",
    tech: "Начать разработку",
  },
  C: {
    legal: "Связаться с юристом",
    tech: "Заказать разработку",
  },
} as const;

// Dynamic import VortexBackground with SSR disabled (Next.js recommended approach)
const VortexBackground = dynamic(
  () => import("@/components/animations/VortexBackground").then((mod) => mod.VortexBackground),
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
 * - Vortex particle background with dual-color theme (gold + cyan)
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

  // Responsive particle count for mobile optimization
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // A/B Test: Get variant for Hero CTA using useSyncExternalStore for SSR safety
  const ctaVariant = useSyncExternalStore(
    // Subscribe - no-op since variant doesn't change
    () => () => {},
    // Client snapshot
    () => getABVariant("hero_cta", ["A", "B", "C"]),
    // Server snapshot - default value for SSR
    () => "A" as const
  );
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

  const shouldRenderVortex = !prefersReducedMotion;

  return (
    <Section
      variant="page-hero"
      spacing="none"
      overflow="hidden"
      disableFirstSpacing
      className="min-h-screen pt-[calc(6rem+var(--promo-banner-height))] pb-12 select-none sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-16 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-20"
      aria-label="Hero section"
      ref={heroSectionRef}
    >
      {/* Vortex Particle Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Base gradient that shows through the vortex */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.25),transparent_60%),radial-gradient(ellipse_60%_40%_at_70%_80%,rgba(212,175,55,0.15),transparent_50%)]" />

        {shouldRenderVortex ? (
          <VortexBackground
            containerClassName="h-full w-full"
            particleCount={isMobile ? 250 : 600}
            colorMode="dual"
            baseSpeed={isMobile ? 0.06 : 0.08}
            backgroundOpacity={0.08}
            mouseInfluence={0}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(70% 60% at 15% 25%, rgba(212, 175, 55, 0.15), transparent 65%),
                radial-gradient(70% 60% at 85% 25%, rgba(6, 182, 212, 0.15), transparent 65%)
              `,
            }}
          />
        )}

        {/* Vignette disabled - testing without it */}
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

          {/* Quick Links */}
          <div className="-mx-4 mt-4 px-4 sm:mx-0 sm:px-0">
            <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0 lg:justify-start">
              <span className="shrink-0 text-xs text-[var(--color-text-muted)] sm:text-sm">
                Популярное:
              </span>
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-legal-border)]/30 bg-[var(--color-legal-surface)]/30 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-[var(--color-text-primary)] backdrop-blur-sm transition-all hover:border-[var(--color-legal-primary)]/50 hover:bg-[var(--color-legal-surface)]/60 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <link.icon className="h-3.5 w-3.5 text-[var(--color-legal-primary)] sm:h-4 sm:w-4" />
                  {link.label}
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-70" />
                </Link>
              ))}
            </div>
          </div>
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
                  {legalTags.map((tag) => {
                    const href = LEGAL_TAG_LINKS[tag];
                    return href ? (
                      <Link
                        key={tag}
                        href={href}
                        className="group flex items-center gap-2 transition-colors hover:text-[var(--color-legal-primary)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-legal-primary)] shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-shadow group-hover:shadow-[0_0_16px_rgba(212,175,55,0.8)]" />
                        {tag}
                      </Link>
                    ) : (
                      <div key={tag} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-legal-primary)] shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                        {tag}
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <MagneticButton strength={20}>
                  <Button
                    variant="primary-legal"
                    size="lg"
                    onClick={() => {
                      trackCTAClick("hero_legal", HERO_CTA_VARIANTS[ctaVariant].legal);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {HERO_CTA_VARIANTS[ctaVariant].legal}
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
                  {techFeatures.map((feature) => {
                    const href = TECH_TAG_LINKS[feature];
                    return href ? (
                      <Link
                        key={feature}
                        href={href}
                        className="group flex items-center gap-2 transition-colors hover:text-[var(--color-tech-primary)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-shadow group-hover:shadow-[0_0_16px_rgba(6,182,212,0.8)]" />
                        {feature}
                      </Link>
                    ) : (
                      <div key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                        {feature}
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant={sectionsConfig.hero.tech.cta[0].variant as "secondary-tech"}
                    size="lg"
                  >
                    <a
                      href={sectionsConfig.hero.tech.cta[0].href}
                      onClick={() =>
                        trackCTAClick("hero_tech", sectionsConfig.hero.tech.cta[0].label)
                      }
                    >
                      {sectionsConfig.hero.tech.cta[0].label}
                    </a>
                  </Button>
                  <MagneticButton strength={20}>
                    <Button
                      variant={sectionsConfig.hero.tech.cta[1].variant as "primary-tech"}
                      size="lg"
                      onClick={() => {
                        trackCTAClick("hero_tech", HERO_CTA_VARIANTS[ctaVariant].tech);
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {HERO_CTA_VARIANTS[ctaVariant].tech}
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div className="mt-8 flex flex-col items-center gap-4 text-[var(--color-text-muted)] sm:flex-row sm:justify-center sm:gap-6 lg:justify-start">
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
