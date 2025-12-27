import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { load } from "cheerio";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function extractToc(html: string): TocItem[] {
  if (!html) {
    return [];
  }

  const $ = load(html);
  const items: TocItem[] = [];

  $("h2[id], h3[id]").each((_, element) => {
    const level = Number(element.tagName[1]) as 2 | 3;
    const id = $(element).attr("id");
    const text = $(element).text();

    if (id && text) {
      items.push({ id, text, level });
    }
  });

  return items;
}

export async function generateStaticParams() {
  // Blog posts live in content/blog. Filenames correspond to slugs.
  // We can reuse filesystem reader from lib by scanning there,
  // but to avoid duplicating logic we read via getBlogPostBySlug once.
  // Instead of reading directory manually here (to keep FS logic centralized),
  // we import fs lazily to list slugs.
  const { readdir } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const blogDir = join(process.cwd(), "content/blog");

  try {
    const files = (await readdir(blogDir)).filter((file) => file.endsWith(".md"));
    return files.map((file) => ({ slug: file.replace(/\.md$/, "") }));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);
    const { frontmatter } = post;

    return {
      title: `${frontmatter.title} | Блог Юральянс`,
      description: `${frontmatter.excerpt} Читайте в блоге Юральянс.`,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        type: "article",
        url: `https://www.uralliance.ru/blog/${slug}`,
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
      title: "Статья не найдена",
      description: "Похоже, материал был удалён или ещё не опубликован.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;

  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, html, content } = post!;
  const toc = extractToc(html ?? "");
  const relatedPosts = await getRelatedPosts(frontmatter.relatedPosts ?? []);

  const readingTime = Math.max(1, Math.round(content.split(/\s+/).length / 180));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedDate ?? frontmatter.date,
    image: frontmatter.image,
    keywords: frontmatter.keywords,
    publisher: {
      "@type": "Organization",
      name: "Uralliance",
      url: "https://www.uralliance.ru",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.uralliance.ru/blog/${slug}`,
    },
    description: frontmatter.excerpt,
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Блог", url: "https://uralliance.ru/blog" },
          { name: frontmatter.title },
        ]}
      />

      <article id="top" className="pb-24 lg:pb-32">
        <Section background="secondary" spacing="xl" isolate overflow="hidden">
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
            <Badge variant="neutral" badgeStyle="subtle" className="bg-white/15 text-white">
              {frontmatter.category}
            </Badge>
            <Heading as="h1" size="2xl" weight="semibold" display tone="white">
              {frontmatter.title}
            </Heading>
            <p className="max-w-3xl text-lg text-white/80">{frontmatter.excerpt}</p>
            <div className="flex flex-wrap gap-6 text-sm text-white/80">
              <div>
                <Label size="sm" spacing="wider" tone="white" className="opacity-60">
                  Автор
                </Label>
                <p className="mt-2 text-lg font-semibold text-white">{frontmatter.author}</p>
              </div>
              <div>
                <Label size="sm" spacing="wider" tone="white" className="opacity-60">
                  Опубликовано
                </Label>
                <p className="mt-2 text-lg font-semibold text-white">
                  {new Date(frontmatter.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <Label size="sm" spacing="wider" tone="white" className="opacity-60">
                  Время чтения
                </Label>
                <p className="mt-2 text-lg font-semibold text-white">{readingTime} мин</p>
              </div>
            </div>
          </Container>
        </Section>

        <Container className="mt-16 grid gap-12 lg:grid-cols-[3fr,1fr]">
          <div
            className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
          />

          <aside className="space-y-8">
            {toc.length > 0 && (
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 p-6">
                <Label size="sm" spacing="wider" tone="muted" className="mb-4">
                  Оглавление
                </Label>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={cn(item.level === 3 && "pl-4 text-[var(--color-text-muted)]")}
                    >
                      <a
                        href={`#${item.id}`}
                        className="transition-colors hover:text-[var(--color-tech-primary)]"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 p-6">
              <Label size="sm" spacing="wider" tone="muted" className="mb-4">
                Навигация
              </Label>
              <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 transition-colors hover:text-[var(--color-tech-primary)]"
                >
                  ← Все статьи
                </Link>
                <a
                  href="#top"
                  className="flex items-center gap-2 transition-colors hover:text-[var(--color-tech-primary)]"
                >
                  ↑ В начало
                </a>
              </div>
            </div>
          </aside>
        </Container>

        <Container className="mt-24 space-y-8">
          <div className="flex items-center justify-between">
            <Heading as="h2" size="lg" weight="semibold">
              Связанные материалы
            </Heading>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--color-tech-primary)] transition-colors hover:text-white"
            >
              Смотреть все →
            </Link>
          </div>

          {relatedPosts.length === 0 ? (
            <p className="text-[var(--color-text-secondary)]">
              Мы подбираем материалы по этой теме. Загляните позже — скоро здесь появятся
              рекомендации.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-card-bg)]/80 p-6 transition-colors hover:border-white/20"
                >
                  <Label size="sm" spacing="wider" tone="muted">
                    {related.frontmatter.category}
                  </Label>
                  <p className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">
                    {related.frontmatter.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {related.frontmatter.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Container>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
    </>
  );
}
