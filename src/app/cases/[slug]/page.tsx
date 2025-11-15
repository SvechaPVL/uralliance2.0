import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { cn } from "@/lib/utils";
import { getAllCases, getCaseBySlug } from "@/lib/content";

interface CaseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const cases = await getAllCases();
  return cases.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const caseStudy = await getCaseBySlug(slug);
    const { frontmatter } = caseStudy;

    return {
      title: `${frontmatter.title} — кейс Uralliance`,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.shortDescription,
        type: "article",
        url: `https://www.uralliance.ru/cases/${slug}`,
        images: [
          {
            url: frontmatter.image,
            alt: frontmatter.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Кейс не найден",
      description: "Указанный кейс недоступен или был удалён.",
    };
  }
}

export default async function CaseDetailsPage({ params }: CaseDetailsPageProps) {
  const { slug } = await params;
  let caseStudy;

  try {
    caseStudy = await getCaseBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, html } = caseStudy!;
  const badgeVariant = frontmatter.serviceType === "tech" ? "tech" : "legal";

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: frontmatter.title,
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    image: frontmatter.image,
    genre: frontmatter.serviceType === "tech" ? "Technology" : "Legal",
    about: {
      "@type": "Thing",
      name: frontmatter.serviceType === "tech" ? "Digital transformation" : "Legal services",
    },
    creator: {
      "@type": "Organization",
      name: "Uralliance",
      url: "https://www.uralliance.ru",
    },
    keywords: [
      frontmatter.client,
      frontmatter.serviceType === "tech" ? "tech case study" : "legal case study",
      ...((frontmatter.technologies as string[] | undefined) ?? []),
    ],
  };

  return (
    <article className="pb-24 lg:pb-32">
      <section className="relative isolate overflow-hidden bg-[var(--color-background-secondary)] py-24 lg:py-32">
        <div className="absolute inset-0">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
        </div>
        <Container className="relative z-10 space-y-8">
          <Badge variant={badgeVariant} badgeStyle="subtle">
            {frontmatter.serviceType === "tech" ? "Tech проект" : "Legal проект"}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-white">{frontmatter.title}</h1>
          <p className="max-w-3xl text-lg text-white/80">{frontmatter.shortDescription}</p>
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-white/60">Клиент</p>
              <p className="mt-2 text-lg font-semibold text-white">{frontmatter.client}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-white/60">Дата</p>
              <p className="mt-2 text-lg font-semibold text-white">{formattedDate}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-white/60">Результаты</p>
              <p className="mt-2 text-lg font-semibold text-white">{frontmatter.resultMetrics}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className={cn(
                "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold",
                "bg-[var(--color-tech-primary)] text-[#03121d]",
                "hover:bg-[var(--color-tech-dark)] transition-colors"
              )}
            >
              Обсудить похожий проект
            </Link>
            <Link
              href="/cases"
              className={cn(
                "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold",
                "border border-white/30 text-white hover:bg-white/10 transition-colors"
              )}
            >
              ← Назад к кейсам
            </Link>
          </div>
        </Container>
      </section>

      <Container className="mt-16 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div
            className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />

          <aside className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)]/70 p-6">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
              Детали проекта
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs">Клиент</dt>
                <dd className="text-[var(--color-text-primary)] font-medium">{frontmatter.client}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs">Сегмент</dt>
                <dd className="text-[var(--color-text-primary)] font-medium">
                  {frontmatter.serviceType === "tech" ? "Технологический" : "Юридический"}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs">
                  Результаты
                </dt>
                <dd className="text-[var(--color-text-primary)] font-medium">
                  {frontmatter.resultMetrics}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs">Дата</dt>
                <dd className="text-[var(--color-text-primary)] font-medium">{formattedDate}</dd>
              </div>
            </dl>

            {frontmatter.technologies?.length ? (
              <div className="mt-8">
                <p className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs mb-4">
                  Технологии
                </p>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.technologies.map((tech) => (
                    <Badge key={tech} variant="tech" badgeStyle="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
