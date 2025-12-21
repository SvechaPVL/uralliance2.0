import { defaultOgImage } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { getAllBlogPosts } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";

export const metadata: Metadata = {
  title: "Блог Uralliance — Legal & Tech экспертиза",
  description:
    "Статьи об арбитражной практике, LegalTech и автоматизации бизнеса. Разбираем реальные кейсы и делимся рабочими инструментами.",
  openGraph: {
    title: "Блог Uralliance",
    description: "Юридическая аналитика, IT-решения и практичные чек-листы для бизнеса.",
    url: "https://www.uralliance.ru/blog",
    type: "website",
    images: [defaultOgImage],
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <Section spacing="xl">
      <Container className="space-y-16">
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <Label size="sm" spacing="wider" tone="muted">
            Insights
          </Label>
          <div className="space-y-4">
            <Heading as="h1" size="2xl" weight="semibold" display>
              Блог о Legal &amp; Tech
            </Heading>
            <Text size="lg" tone="secondary">
              Делимся стратегиями, которые помогают клиентам выигрывать суды, запускать LegalTech и
              масштабировать продукты без хаоса.
            </Text>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] p-12 text-center">
            <Text size="lg" tone="secondary">
              Мы готовим первые материалы. Подпишитесь на Telegram, чтобы узнать о запуске первыми.
            </Text>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className={cn(
                  "overflow-hidden rounded-3xl border border-[var(--color-border-soft)]",
                  "bg-[var(--color-card-bg)]/80 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl",
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
                      <Badge
                        variant="neutral"
                        badgeStyle="subtle"
                        size="sm"
                        className="bg-white/15 text-white"
                      >
                        {post.frontmatter.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center gap-3">
                      <Label as="span" size="sm" spacing="wider" tone="muted">
                        {new Date(post.frontmatter.date).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Label>
                      <span className="h-1 w-1 rounded-full bg-[var(--color-border)]" />
                      <Label as="span" size="sm" spacing="wider" tone="muted">
                        {post.frontmatter.author}
                      </Label>
                    </div>
                    <Heading as="h2" size="lg" weight="semibold">
                      {post.frontmatter.title}
                    </Heading>
                    <Text size="base" tone="secondary">
                      {post.frontmatter.excerpt}
                    </Text>
                    <Text size="sm" weight="semibold" tone="tech">
                      Читать статью →
                    </Text>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
