"use client";

import { Timeline } from "@/components/animations/Timeline";
import { Container } from "@/components/layout/Container";
import { Search, Ruler, Settings, Rocket } from "lucide-react";

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
      icon: <Search className="text-legal-500 dark:text-legal-400 h-8 w-8" />,
    },
    {
      title: "Прототип",
      description:
        "Создаем детальную концепцию проекта: прототипы интерфейсов, архитектуру решения, план реализации",
      icon: <Ruler className="text-tech-500 dark:text-tech-400 h-8 w-8" />,
    },
    {
      title: "Разработка",
      description:
        "Реализуем проект с использованием современных технологий, регулярно предоставляем промежуточные результаты",
      icon: <Settings className="text-legal-500 dark:text-legal-400 h-8 w-8" />,
    },
    {
      title: "Запуск",
      description:
        "Внедряем решение, обучаем команду, обеспечиваем техническую поддержку и сопровождение",
      icon: <Rocket className="text-tech-500 dark:text-tech-400 h-8 w-8" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-neutral-50 to-white py-24 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <Container>
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Как мы работаем</h2>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600 dark:text-neutral-400">
            Проверенный процесс от анализа до запуска — каждый этап нацелен на результат
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <Timeline steps={steps} />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
            Готовы начать работу над проектом?
          </p>
          <a
            href="#contact"
            className="from-legal-500 to-tech-500 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Обсудить проект
            <span className="text-xl">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
