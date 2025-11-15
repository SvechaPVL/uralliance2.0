import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { cn } from "@/lib/utils";
import { getAllCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Кейсы Uralliance — Legal & Tech портфолио",
  description:
    "Bento-галерея реализованных проектов Uralliance: юридические победы и технологические внедрения с измеримыми результатами.",
  openGraph: {
    title: "Кейсы Uralliance",
    description:
      "Портфолио юридических и технологических проектов: M&A сделки, интеграции CRM, автоматизация и судебные победы.",
    url: "https://www.uralliance.ru/cases",
    type: "website",
  },
};

const filterOptions = [
  { label: "Все кейсы", value: "all" },
  { label: "Legal", value: "legal" },
  { label: "Tech", value: "tech" },
] as const;

type FilterValue = (typeof filterOptions)[number]["value"];

interface CasesPageProps {
  searchParams?: Promise<{
    type?: string;
  }>;
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const allCases = await getAllCases();

  const resolvedSearchParams = (await searchParams) ?? undefined;

  const filterParam = resolvedSearchParams?.type;
  const activeFilter: FilterValue =
    filterParam === "legal" || filterParam === "tech" ? filterParam : "all";

  const filteredCases =
    activeFilter === "all"
      ? allCases
      : allCases.filter((caseStudy) => caseStudy.frontmatter.serviceType === activeFilter);

  const activeFilterLabel =
    filterOptions.find((filter) => filter.value === activeFilter)?.label ?? "Все кейсы";

  return (
    <section className="py-24 lg:py-32">
      <Container className="space-y-12">
        <header className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">Portfolio</p>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-display font-semibold text-[var(--color-text-primary)]">
              Реальные результаты Legal &amp; Tech
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Мы беремся за проекты, где важна измеримая отдача: от автоматизации продаж до сложных сделок и
              судебных побед. Исследуйте портфолио и переходите к детальному описанию каждого кейса.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap gap-3">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.value;
            const href = filter.value === "all" ? "/cases" : `/cases?type=${filter.value}`;

            return (
              <Link
                key={filter.value}
                href={href}
                scroll={false}
                className={cn(
                  "px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                  "hover:-translate-y-0.5",
                  isActive
                    ? filter.value === "tech"
                      ? "border-[var(--color-tech-primary)] text-[var(--color-tech-primary)] bg-[var(--color-tech-primary)]/10"
                      : "border-[var(--color-legal-primary)] text-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
                aria-pressed={isActive}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>

        {filteredCases.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] p-12 text-center">
            <p className="text-lg text-[var(--color-text-secondary)]">
              Кейсы категории{" "}
              <span className="font-semibold text-[var(--color-text-primary)]">{activeFilterLabel}</span> появятся
              совсем скоро.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 auto-rows-fr">
            {filteredCases.map((caseStudy, index) => {
              const { frontmatter, slug } = caseStudy;
              const isEmphasized = index === 0 && activeFilter === "all";
              const badgeVariant = frontmatter.serviceType === "tech" ? "tech" : "legal";

              return (
                <article
                  key={slug}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-[var(--color-border-soft)]",
                    "bg-[var(--color-card-bg)]/80 backdrop-blur-2xl flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
                    "transition-transform duration-300 hover:-translate-y-1 hover:border-white/20",
                    isEmphasized && "md:col-span-2"
                  )}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={frontmatter.image}
                      alt={frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={isEmphasized ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <Badge variant={badgeVariant} badgeStyle="filled" size="sm">
                        {frontmatter.serviceType === "tech" ? "Tech" : "Legal"}
                      </Badge>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        {new Date(frontmatter.date).toLocaleDateString("ru-RU", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="space-y-3">
                      <p className="text-sm text-[var(--color-text-muted)]">{frontmatter.client}</p>
                      <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                        {frontmatter.title}
                      </h2>
                      <p className="text-base text-[var(--color-text-secondary)]">{frontmatter.shortDescription}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Результаты</p>
                      <p className="text-sm font-semibold text-white mt-2">{frontmatter.resultMetrics}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <Link
                        href={`/cases/${slug}`}
                        className="text-sm font-semibold text-[var(--color-tech-primary)] hover:text-white transition-colors"
                      >
                        Смотреть кейс →
                      </Link>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {frontmatter.technologies?.length ?? 0} технологий
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
