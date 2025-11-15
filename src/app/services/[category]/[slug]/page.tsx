import { getServiceBySlug, getAllServiceSlugs } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/primitives/badge";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
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
export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { category, slug } = await params;

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
        images: service.frontmatter.seo.ogImage ? [{ url: service.frontmatter.seo.ogImage }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { category, slug } = await params;

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
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Category Badge */}
            <Badge variant={isLegal ? "legal" : "tech"} className="mb-6 px-4 py-2 text-base">
              {isLegal ? "Юридические услуги" : "IT-услуги"}
            </Badge>

            {/* Icon + Title */}
            <div className="mb-6 flex items-start gap-6">
              <ServiceIcon
                name={service.frontmatter.icon}
                variant={isLegal ? "legal" : "tech"}
                className="h-20 w-20"
              />
              <div className="flex-1">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl">{service.frontmatter.title}</h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400">
                  {service.frontmatter.description}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="from-legal-50 to-tech-50 dark:from-legal-900/20 dark:to-tech-900/20 border-legal-200 dark:border-legal-800 mt-8 rounded-lg border-2 bg-gradient-to-r p-6">
              <div className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">Стоимость</div>
              <div
                className={`bg-gradient-to-r text-3xl font-bold ${
                  isLegal ? "from-legal-500 to-legal-600" : "from-tech-500 to-tech-600"
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
          <div className="mx-auto max-w-4xl">
            {/* Markdown Content */}
            <div
              className="prose prose-lg prose-neutral dark:prose-invert prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-a:text-legal-500 dark:prose-a:text-tech-400 prose-a:no-underline hover:prose-a:underline max-w-none"
              dangerouslySetInnerHTML={{ __html: service.html }}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-24 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Готовы начать?</h2>
            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
              Оставьте заявку и получите бесплатную консультацию по вашему вопросу
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isLegal
                    ? "from-legal-500 to-legal-600 bg-gradient-to-r text-white"
                    : "from-tech-500 to-tech-600 bg-gradient-to-r text-white"
                }`}
              >
                Заказать услугу
                <span className="text-xl">→</span>
              </Link>
              <Link
                href={`/services/${category}`}
                className="hover:border-legal-500 dark:hover:border-tech-400 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-300 px-8 py-4 font-semibold transition-all duration-300 dark:border-neutral-700"
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
