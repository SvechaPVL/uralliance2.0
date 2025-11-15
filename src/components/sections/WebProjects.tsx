"use client";

import { MacbookScroll } from "@/components/animations/MacbookScroll";

export function WebProjects() {
  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Web Projects</p>
          <h3 className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)]">Сайты, которые продают</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            {["Lighthouse 95+", "SEO-оптимизация", "Адаптивный дизайн"].map((badge) => (
              <span key={badge} className="rounded-full border border-white/10 px-4 py-1 text-[var(--color-text-secondary)]">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <MacbookScroll>
          <div className="h-[360px] bg-gradient-to-r from-[#0f172a] to-[#1a1035]" />
        </MacbookScroll>
      </div>
    </section>
  );
}
