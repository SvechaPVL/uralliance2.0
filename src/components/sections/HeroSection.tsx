"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/primitives/button";
import { Card } from "@/components/primitives/card";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Particles } from "@/components/animations/Particles";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const legalTags = ["Корпоративные споры", "Недвижимость", "Договоры"];
  const techFeatures = ["Чат-боты", "PWA и сайты", "API", "1С интеграции"];
  const techSceneRef = useRef<HTMLDivElement>(null);
  const techSceneInView = useInView(techSceneRef, { amount: 0.3 });
  const shouldRenderThreeScene = !prefersReducedMotion && techSceneInView;
  const shouldRenderParticles = !prefersReducedMotion;

  return (
    <section
      className="relative min-h-screen overflow-hidden select-none pt-24"
      aria-label="Hero section"
    >
      {/* Gradient backgrounds */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-1/2 gradient-legal"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-1/2 gradient-tech"
        aria-hidden="true"
      />

      {/* 3D Background Scene */}
      <div
        ref={techSceneRef}
        className="pointer-events-none absolute inset-y-0 right-0 hidden md:block w-3/4 lg:w-1/2 opacity-25"
        aria-hidden="true"
      >
        {shouldRenderThreeScene && <ThreeScene className="w-full h-full" />}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="relative mb-12 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-card-bg)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)] backdrop-blur">
            Legal × Tech Studio
          </span>
          <p className="mt-4 text-base text-[var(--color-text-secondary)] max-w-3xl mx-auto lg:mx-0">
            Премиальная связка юристов и инженеров: одна команда закрывает договоры, сделки и
            цифровые продукты, чтобы бизнес рос уверенно и без бюрократии.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[calc(100vh-8rem)]">
          {/* Legal Side Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          >
            <Card variant="legal" padding="lg" className="relative overflow-hidden">
              {/* Particles Background */}
              {shouldRenderParticles && (
                <Particles count={18} colors={["#D4AF37", "#F5E6D3"]} speed={0.22} className="opacity-20" />
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[var(--color-legal-badge)] border border-[var(--color-legal-border-soft)] backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-legal-primary)] animate-pulse" />
                  <span className="text-sm font-semibold text-[var(--color-legal-primary)]">
                    Юридические услуги
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-display font-bold text-4xl lg:text-5xl mb-6 text-[var(--color-text-primary)]">
                  Правовая поддержка{" "}
                  <span className="text-gradient">
                    бизнеса
                  </span>
                  <br />
                  без бюрократии
                </h1>

                {/* Description */}
                <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  Корпоративное право, договоры, интеллектуальная собственность. Профессионально,
                  надёжно, результативно.
                </p>

                {/* Tags */}
                <div className="grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)] mb-8">
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
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Консультация юриста
                  </Button>
                </MagneticButton>
              </div>
            </Card>
          </motion.div>

          {/* Tech Side Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.1 }}
          >
            <Card variant="tech" padding="lg" className="relative overflow-hidden">
              {/* Particles Background */}
              {shouldRenderParticles && (
                <Particles count={20} colors={["#06B6D4", "#22D3EE"]} speed={0.3} className="opacity-25" />
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[var(--color-tech-badge)] border border-[var(--color-tech-border-soft)] backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-tech-primary)] animate-pulse" />
                  <span className="text-sm font-semibold text-[var(--color-tech-primary)]">
                    IT-решения
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6 text-[var(--color-text-primary)]">
                  IT-решения{" "}
                  <span className="text-gradient">
                    и интеграции
                  </span>
                  <br />
                  для роста и контроля
                </h2>

                {/* Description */}
                <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                  Веб-разработка, мобильные приложения, Telegram боты, CRM интеграции. Современно,
                  масштабируемо, эффективно.
                </p>

                {/* Feature list */}
                <div className="grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)] mb-8">
                  {techFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--color-tech-border-soft)] bg-[var(--color-tech-surface)] px-6 py-3 font-semibold tracking-tight text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-tech-surface-strong)]"
                  >
                    Смотреть услуги
                  </a>
                  <MagneticButton strength={20}>
                    <Button
                      variant="primary-tech"
                      size="lg"
                      onClick={() => {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Обсудить проект
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <div className="mt-12 flex flex-col items-center gap-4 text-[var(--color-text-muted)] sm:flex-row sm:gap-6 sm:justify-center lg:justify-start">
          <div className="hidden sm:block h-px w-16 bg-[var(--color-border)]/70" />
          <span className="text-center text-[0.7rem] uppercase tracking-[0.4em] sm:text-left">
            Мы защищаем и ускоряем ваш бизнес
          </span>
          <div className="hidden sm:block h-px w-16 bg-[var(--color-border)]/70" />
        </div>
      </div>
    </section>
  );
}
