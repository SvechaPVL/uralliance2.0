import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HeroParallax } from "@/components/animations/HeroParallax";
import { Badge } from "@/components/primitives/badge";
import { getAllCases } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Cases Preview Section (Homepage)
 *
 * Server component fetches latest case studies and pipes them into
 * the client-side parallax cards for subtle motion.
 */
export async function CasesPreview() {
  const cases = await getAllCases();
  const featured = cases.slice(0, 3);

  return (
    <section className="relative py-24">
      <Container>
        <div className="mb-10 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Cases</p>
          <h3 className="text-3xl font-semibold text-[var(--color-text-primary)]">
            Реальные проекты и результаты
          </h3>
          <p className="text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Пару недавних побед. Полное портфолио — в отдельном разделе. Каждый кейс ведёт на детальную
            страницу с задачей, решением и метриками.
          </p>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] py-12 text-center">
            <p className="text-[var(--color-text-secondary)]">Кейсы появятся здесь уже скоро.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {featured.map((caseStudy) => (
              <HeroParallax key={caseStudy.slug}>
                <Link
                  href={`/cases/${caseStudy.slug}`}
                  className={cn(
                    "block rounded-3xl border border-white/10 bg-white/5 px-6 py-8",
                    "hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  )}
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                    <Badge
                      variant={caseStudy.frontmatter.serviceType === "tech" ? "tech" : "legal"}
                      badgeStyle="subtle"
                      size="sm"
                    >
                      {caseStudy.frontmatter.serviceType === "tech" ? "Tech" : "Legal"}
                    </Badge>
                    <span>{caseStudy.frontmatter.client}</span>
                  </div>
                  <h4 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                    {caseStudy.frontmatter.title}
                  </h4>
                  <p className="mt-3 text-base text-[var(--color-text-secondary)]">
                    {caseStudy.frontmatter.shortDescription}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-[var(--color-text-primary)]">
                    {caseStudy.frontmatter.resultMetrics}
                  </p>
                </Link>
              </HeroParallax>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/cases"
            className="text-sm font-semibold text-[var(--color-tech-primary)] hover:text-white transition-colors"
          >
            Смотреть все кейсы →
          </Link>
        </div>
      </Container>
    </section>
  );
}
