import { getServiceBySlug, getAllServiceSlugs } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * Service Detail Page
 *
 * Displays full service information with Markdown content
 * Uses dynamic routing: /services/{category}/{slug}/
 */

interface ServiceDetailPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { category, slug } = params;

  if (category !== "legal" && category !== "tech") {
    return {};
  }

  try {
    const service = await getServiceBySlug(category, slug);
    const isLegal = category === "legal";

    return {
      title: `${service.frontmatter.title} | ${isLegal ? "Юридические услуги" : "IT-услуги"} | Uralliance`,
      description: service.frontmatter.description,
      keywords: service.frontmatter.seo.keywords,
      openGraph: {
        title: service.frontmatter.title,
        description: service.frontmatter.description,
        type: "website",
        images: service.frontmatter.seo.ogImage
          ? [{ url: service.frontmatter.seo.ogImage }]
          : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { category, slug } = params;

  // Validate category
  if (category !== "legal" && category !== "tech") {
    notFound();
  }

  let service;
  try {
    service = await getServiceBySlug(category, slug);
  } catch {
    notFound();
  }

  const isLegal = category === "legal";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Badge
              variant={isLegal ? "legal" : "tech"}
              className="mb-6 text-base px-4 py-2"
            >
              {isLegal ? "⚖️ Юридические услуги" : "💻 IT-услуги"}
            </Badge>

            {/* Icon + Title */}
            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl">{service.frontmatter.icon}</div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {service.frontmatter.title}
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  {service.frontmatter.description}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 p-6 bg-gradient-to-r from-legal-50 to-tech-50 dark:from-legal-900/20 dark:to-tech-900/20 rounded-lg border-2 border-legal-200 dark:border-legal-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                Стоимость
              </div>
              <div
                className={`text-3xl font-bold bg-gradient-to-r ${
                  isLegal
                    ? "from-legal-500 to-legal-600"
                    : "from-tech-500 to-tech-600"
                } bg-clip-text text-transparent`}
              >
                {service.frontmatter.price}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Markdown Content */}
            <div
              className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                prose-li:text-neutral-700 dark:prose-li:text-neutral-300
                prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
                prose-a:text-legal-500 dark:prose-a:text-tech-400
                prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: service.html }}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Оставьте заявку и получите бесплатную консультацию по вашему
              вопросу
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  isLegal
                    ? "bg-gradient-to-r from-legal-500 to-legal-600 text-white"
                    : "bg-gradient-to-r from-tech-500 to-tech-600 text-white"
                }`}
              >
                Заказать услугу
                <span className="text-xl">→</span>
              </Link>
              <Link
                href={`/services/${category}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-neutral-300 dark:border-neutral-700 hover:border-legal-500 dark:hover:border-tech-400 transition-all duration-300"
              >
                ← Все услуги
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
