import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { getAllBlogPosts } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог Uralliance — Legal & Tech экспертиза",
  description:
    "Статьи об арбитражной практике, LegalTech и автоматизации бизнеса. Разбираем реальные кейсы и делимся рабочими инструментами.",
  openGraph: {
    title: "Блог Uralliance",
    description: "Юридическая аналитика, IT-решения и практичные чек-листы для бизнеса.",
    url: "https://www.uralliance.ru/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-24 lg:py-32">
      <Container className="space-y-16">
        <header className="space-y-6 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">Insights</p>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-display font-semibold text-[var(--color-text-primary)]">
              Блог о Legal &amp; Tech
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Делимся стратегиями, которые помогают клиентам выигрывать суды, запускать LegalTech и масштабировать
              продукты без хаоса.
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] p-12 text-center">
            <p className="text-lg text-[var(--color-text-secondary)]">
              Мы готовим первые материалы. Подпишитесь на Telegram, чтобы узнать о запуске первыми.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className={cn(
                  "rounded-3xl border border-[var(--color-border-soft)] overflow-hidden",
                  "bg-[var(--color-card-bg)]/80 backdrop-blur-2xl shadow-[0_18px_40px_rgba(0,0,0,0.25)]",
                  "transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
                )}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-64 w-full">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 45vw, 100vw"
                      priority={post.slug === posts[0]?.slug}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="neutral" badgeStyle="subtle" size="sm" className="bg-white/15 text-white">
                        {post.frontmatter.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                      <span>
                        {new Date(post.frontmatter.date).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[var(--color-border)]" />
                      <span>{post.frontmatter.author}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-base text-[var(--color-text-secondary)]">
                      {post.frontmatter.excerpt}
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-tech-primary)]">Читать статью →</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
