"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * PricePreview Section
 *
 * Shows a preview of pricing with 3 main categories
 * Part of User Story 2 (US2) - Main page sections
 *
 * Categories: Consultation, Development, Integration
 */
export function PricePreview() {
  const priceCards = [
    {
      title: "Консультация",
      description: "Юридическая или IT-консультация от экспертов",
      price: "от 3 000",
      unit: "₽",
      features: [
        "Анализ ситуации",
        "Экспертное мнение",
        "Рекомендации",
        "Письменное заключение",
      ],
      badge: "Быстрый старт",
      gradient: "from-legal-500/10 to-legal-500/5",
      borderGradient: "from-legal-500 to-legal-600",
    },
    {
      title: "Разработка",
      description: "Веб-сайты, мобильные приложения, CRM-системы",
      price: "от 50 000",
      unit: "₽",
      features: [
        "Дизайн и прототип",
        "Разработка под ключ",
        "Тестирование",
        "Запуск и обучение",
      ],
      badge: "Популярное",
      gradient: "from-tech-500/10 to-tech-500/5",
      borderGradient: "from-tech-500 to-tech-600",
      featured: true,
    },
    {
      title: "Интеграция",
      description: "Связываем CRM, мессенджеры, 1С в единую систему",
      price: "от 80 000",
      unit: "₽",
      features: [
        "Анализ процессов",
        "Настройка интеграций",
        "Автоматизация",
        "Поддержка 24/7",
      ],
      badge: "Максимальный эффект",
      gradient: "from-legal-500/10 via-tech-500/10 to-legal-500/10",
      borderGradient: "from-legal-500 via-tech-500 to-legal-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Container>
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Прозрачные цены
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Честная стоимость без скрытых платежей — вы знаете за что платите
          </p>
        </div>

        {/* Price cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {priceCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative"
            >
              <Card
                className={`h-full p-8 relative overflow-hidden backdrop-blur-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  card.featured
                    ? "border-tech-500 dark:border-tech-400"
                    : "border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="mb-4">
                    <Badge
                      variant={card.featured ? "tech" : "legal"}
                      className="text-xs"
                    >
                      {card.badge}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 min-h-[3rem]">
                    {card.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl font-bold bg-gradient-to-r ${card.borderGradient} bg-clip-text text-transparent`}
                      >
                        {card.price}
                      </span>
                      <span className="text-xl text-neutral-600 dark:text-neutral-400">
                        {card.unit}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-legal-500 dark:text-legal-400 mt-1">
                          ✓
                        </span>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      card.featured
                        ? "bg-gradient-to-r from-tech-500 to-tech-600 text-white hover:shadow-lg hover:shadow-tech-500/50"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    Подробнее
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full price list CTA */}
        <div className="text-center">
          <Link
            href="/price"
            className="inline-flex items-center gap-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:text-tech-500 dark:hover:text-tech-400 transition-colors duration-300"
          >
            Полный прайс-лист
            <span className="text-xl">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
