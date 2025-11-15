"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
import Link from "next/link";
import { Check, ArrowUpDown } from "lucide-react";
import pricesData from "@/../../content/prices.json";

type PriceCategory = "all" | "legal" | "tech";
type SortOrder = "asc" | "desc" | "none";

/**
 * Price List Page
 *
 * Displays all services with pricing information.
 * Includes filtering by category and sorting by price.
 */
export default function PricePage() {
  const [category, setCategory] = useState<PriceCategory>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  // Filter and sort prices
  const filteredPrices = useMemo(() => {
    let filtered = pricesData.prices;

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((price) => price.category === category);
    }

    // Sort by price
    if (sortOrder !== "none") {
      filtered = [...filtered].sort((a, b) => {
        // Extract numeric value from price string (e.g., "от 30 000 ₽" -> 30000)
        const parsePrice = (priceStr: string) => {
          const match = priceStr.match(/(\d+[\s\d]*)/);
          return match ? parseInt(match[1].replace(/\s/g, ""), 10) : 0;
        };

        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);

        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [category, sortOrder]);

  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder("none");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">Прайс-лист услуг</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Прозрачные цены на все юридические и IT-услуги. Точная стоимость определяется после
              анализа вашей задачи.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="border-b bg-white py-8 dark:border-neutral-800 dark:bg-neutral-950">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={category === "all" ? "default" : "outline"}
                onClick={() => setCategory("all")}
              >
                Все услуги
              </Button>
              <Button
                variant={category === "legal" ? "default" : "outline"}
                onClick={() => setCategory("legal")}
                className={
                  category === "legal"
                    ? "from-legal-500 to-legal-600 bg-gradient-to-r text-white"
                    : ""
                }
              >
                <Badge variant="legal" className="mr-2">
                  Legal
                </Badge>
                Юридические
              </Button>
              <Button
                variant={category === "tech" ? "default" : "outline"}
                onClick={() => setCategory("tech")}
                className={
                  category === "tech" ? "from-tech-500 to-tech-600 bg-gradient-to-r text-white" : ""
                }
              >
                <Badge variant="tech" className="mr-2">
                  Tech
                </Badge>
                IT-услуги
              </Button>
            </div>

            {/* Sort Button */}
            <Button variant="outline" onClick={toggleSort} className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "none" && "Сортировать"}
              {sortOrder === "asc" && "По возрастанию цены"}
              {sortOrder === "desc" && "По убыванию цены"}
            </Button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Найдено услуг: <span className="font-semibold">{filteredPrices.length}</span>
          </div>
        </Container>
      </section>

      {/* Prices Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrices.map((price) => (
              <Card
                key={price.id}
                className={`relative h-full p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  price.featured
                    ? "border-legal-500 dark:border-tech-400 border-2"
                    : "border-2 border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {/* Featured Badge */}
                {price.featured && (
                  <div className="from-legal-500 to-tech-500 absolute top-4 right-4 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white">
                    Популярная
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <ServiceIcon
                    name={getIconForService(price.id)}
                    variant={price.category}
                    className="h-16 w-16"
                  />
                </div>

                {/* Category Badge */}
                <Badge variant={price.category} className="mb-4">
                  {price.category === "legal" ? "Legal" : "Tech"}
                </Badge>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-bold">{price.title}</h3>

                {/* Description */}
                <p className="mb-6 text-neutral-600 dark:text-neutral-400">{price.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div
                    className={`bg-gradient-to-r text-3xl font-bold ${
                      price.category === "legal"
                        ? "from-legal-500 to-legal-600"
                        : "from-tech-500 to-tech-600"
                    } bg-clip-text text-transparent`}
                  >
                    {price.price}
                  </div>
                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
                    {price.unit}
                  </div>
                </div>

                {/* Features */}
                {price.features && price.features.length > 0 && (
                  <ul className="mb-6 space-y-2">
                    {price.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="text-legal-500 dark:text-tech-400 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <Link
                  href="/#contact"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all hover:shadow-lg ${
                    price.category === "legal"
                      ? "from-legal-500 to-legal-600 hover:from-legal-600 hover:to-legal-700 bg-gradient-to-r text-white"
                      : "from-tech-500 to-tech-600 hover:from-tech-600 hover:to-tech-700 bg-gradient-to-r text-white"
                  }`}
                >
                  Заказать услугу
                  <span className="text-xl">→</span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-24 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Нужна консультация?</h2>
            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
              Свяжитесь с нами для бесплатной консультации и точной оценки стоимости вашего проекта
            </p>
            <Link
              href="/#contact"
              className="from-legal-500 to-tech-500 hover:from-legal-600 hover:to-tech-600 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Получить консультацию
              <span className="text-xl">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

/**
 * Helper function to map price IDs to icon names
 */
function getIconForService(id: string): string {
  const iconMap: Record<string, string> = {
    "legal-arbitrazh": "Scale",
    "legal-corporate": "Briefcase",
    "legal-consultation": "FileText",
    "tech-crm": "Database",
    "tech-web": "Globe",
    "tech-bot": "MessageSquare",
    "tech-1c": "Package",
    "tech-consultation": "Code",
  };

  return iconMap[id] || "FileText";
}
