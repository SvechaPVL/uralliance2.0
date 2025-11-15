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
export async function generateMetadata({ params }: ServicesCategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (category !== "legal" && category !== "tech") {
    return {};
  }

  const isLegal = category === "legal";

  return {
    title: isLegal ? "Юридические услуги | Uralliance" : "IT-услуги и разработка | Uralliance",
    description: isLegal
      ? "Профессиональные юридические услуги для бизнеса: арбитражные споры, корпоративное право, налоговое консультирование"
      : "Разработка сайтов, мобильных приложений, интеграция CRM-систем и автоматизация бизнес-процессов",
    keywords: isLegal
      ? "юридические услуги екатеринбург, юрист для бизнеса, арбитражный суд"
      : "разработка сайтов екатеринбург, создание crm, it-услуги",
  };
}

export default async function ServicesCategoryPage({ params }: ServicesCategoryPageProps) {
  const { category } = await params;

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
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant={isLegal ? "legal" : "tech"} className="mb-6 px-6 py-2 text-lg">
              {isLegal ? "⚖️ Legal" : "💻 Tech"}
            </Badge>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">{categoryTitle}</h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400">{categoryDescription}</p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${category}/${service.slug}`}
                className="group"
              >
                <Card className="hover:border-legal-500 dark:hover:border-tech-400 h-full border-2 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Icon */}
                  <div className="mb-4 text-5xl">{service.frontmatter.icon}</div>

                  {/* Title */}
                  <h2 className="group-hover:text-legal-500 dark:group-hover:text-tech-400 mb-3 text-2xl font-bold transition-colors">
                    {service.frontmatter.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 line-clamp-3 text-neutral-600 dark:text-neutral-400">
                    {service.frontmatter.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className={`bg-gradient-to-r text-lg font-semibold ${
                        isLegal ? "from-legal-500 to-legal-600" : "from-tech-500 to-tech-600"
                      } bg-clip-text text-transparent`}
                    >
                      {service.frontmatter.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="text-legal-500 dark:text-tech-400 flex items-center gap-2 font-semibold transition-all group-hover:gap-4">
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
      <section className="bg-gradient-to-b from-white to-neutral-50 py-24 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Нужна консультация?</h2>
            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
              Свяжитесь с нами и получите бесплатную консультацию по вашему вопросу
            </p>
            <Link
              href="/#contact"
              className={`inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isLegal
                  ? "from-legal-500 to-legal-600 bg-gradient-to-r text-white"
                  : "from-tech-500 to-tech-600 bg-gradient-to-r text-white"
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
