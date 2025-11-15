"use client";

import { Timeline } from "@/components/animations/Timeline";
import { Container } from "@/components/layout/Container";

/**
 * ProcessTimeline Section
 *
 * Shows the 4-step work process with animated timeline
 * Part of User Story 2 (US2) - Main page sections
 *
 * Steps: Analysis → Prototype → Development → Launch
 */
export function ProcessTimeline() {
  const steps = [
    {
      title: "Анализ",
      description:
        "Погружаемся в специфику вашего бизнеса, изучаем задачи и определяем оптимальное решение",
      icon: "🔍",
    },
    {
      title: "Прототип",
      description:
        "Создаем детальную концепцию проекта: прототипы интерфейсов, архитектуру решения, план реализации",
      icon: "📐",
    },
    {
      title: "Разработка",
      description:
        "Реализуем проект с использованием современных технологий, регулярно предоставляем промежуточные результаты",
      icon: "⚙️",
    },
    {
      title: "Запуск",
      description:
        "Внедряем решение, обучаем команду, обеспечиваем техническую поддержку и сопровождение",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Container>
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Проверенный процесс от анализа до запуска — каждый этап нацелен на
            результат
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <Timeline steps={steps} />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
            Готовы начать работу над проектом?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-legal-500 to-tech-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Обсудить проект
            <span className="text-xl">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
