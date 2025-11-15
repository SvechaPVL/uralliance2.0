import { getServicesByCategory } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * Services Category Page
 *
 * Displays all services for a specific category (legal or tech)
 * Uses dynamic routing: /services/legal/ or /services/tech/
 */

interface ServicesCategoryPageProps {
  params: {
    category: string;
  };
}

// Generate static params for both categories
export function generateStaticParams() {
  return [{ category: "legal" }, { category: "tech" }];
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ServicesCategoryPageProps): Promise<Metadata> {
  const { category } = params;

  if (category !== "legal" && category !== "tech") {
    return {};
  }

  const isLegal = category === "legal";

  return {
    title: isLegal
      ? "Юридические услуги | Uralliance"
      : "IT-услуги и разработка | Uralliance",
    description: isLegal
      ? "Профессиональные юридические услуги для бизнеса: арбитражные споры, корпоративное право, налоговое консультирование"
      : "Разработка сайтов, мобильных приложений, интеграция CRM-систем и автоматизация бизнес-процессов",
    keywords: isLegal
      ? "юридические услуги екатеринбург, юрист для бизнеса, арбитражный суд"
      : "разработка сайтов екатеринбург, создание crm, it-услуги",
  };
}

export default async function ServicesCategoryPage({
  params,
}: ServicesCategoryPageProps) {
  const { category } = params;

  // Validate category
  if (category !== "legal" && category !== "tech") {
    notFound();
  }

  const services = await getServicesByCategory(category);

  const isLegal = category === "legal";
  const categoryTitle = isLegal ? "Юридические услуги" : "IT-услуги";
  const categoryDescription = isLegal
    ? "Защита бизнеса на всех этапах — от консультации до суда"
    : "Современные технологии для роста вашего бизнеса";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge
              variant={isLegal ? "legal" : "tech"}
              className="mb-6 text-lg px-6 py-2"
            >
              {isLegal ? "⚖️ Legal" : "💻 Tech"}
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {categoryTitle}
            </h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              {categoryDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${category}/${service.slug}`}
                className="group"
              >
                <Card className="h-full p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 hover:border-legal-500 dark:hover:border-tech-400">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{service.frontmatter.icon}</div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-legal-500 dark:group-hover:text-tech-400 transition-colors">
                    {service.frontmatter.title}
                  </h2>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3">
                    {service.frontmatter.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className={`text-lg font-semibold bg-gradient-to-r ${
                        isLegal
                          ? "from-legal-500 to-legal-600"
                          : "from-tech-500 to-tech-600"
                      } bg-clip-text text-transparent`}
                    >
                      {service.frontmatter.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-legal-500 dark:text-tech-400 font-semibold group-hover:gap-4 transition-all">
                    Подробнее
                    <span className="text-xl">→</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Нужна консультация?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Свяжитесь с нами и получите бесплатную консультацию по вашему
              вопросу
            </p>
            <Link
              href="/#contact"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isLegal
                  ? "bg-gradient-to-r from-legal-500 to-legal-600 text-white"
                  : "bg-gradient-to-r from-tech-500 to-tech-600 text-white"
              }`}
            >
              Связаться с нами
              <span className="text-xl">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
