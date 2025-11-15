import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Scale, Code, Target, Users, Trophy, TrendingUp, Shield, Zap } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

/**
 * About Page
 *
 * Company information, mission, values, and achievements
 */

export const metadata: Metadata = {
  title: "О компании | Uralliance",
  description:
    "Uralliance — объединяем юридическую экспертизу и IT-технологии для комплексного решения бизнес-задач",
  keywords: "о компании uralliance, юридические и it услуги, екатеринбург, legal tech",
};

export default function AboutPage() {
  const stats = [
    { value: "150+", label: "Реализованных проектов", icon: Trophy },
    { value: "50+", label: "Довольных клиентов", icon: Users },
    { value: "95%", label: "Выигранных дел", icon: Scale },
    { value: "5+", label: "Лет на рынке", icon: TrendingUp },
  ];

  const values = [
    {
      title: "Экспертиза",
      description:
        "Глубокие знания в юриспруденции и современных технологиях — наша команда состоит из профессионалов с многолетним опытом",
      icon: Shield,
      color: "legal" as const,
    },
    {
      title: "Эффективность",
      description:
        "Автоматизация процессов и использование передовых инструментов позволяют решать задачи быстрее конкурентов",
      icon: Zap,
      color: "tech" as const,
    },
    {
      title: "Результат",
      description:
        "Фокусируемся на измеримых результатах для бизнеса — рост выручки, снижение рисков, экономия времени",
      icon: Target,
      color: "legal" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-24 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center gap-3">
              <Badge variant="legal" className="px-4 py-2 text-base">
                Legal
              </Badge>
              <Badge variant="tech" className="px-4 py-2 text-base">
                Tech
              </Badge>
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl">О компании Uralliance</h1>

            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
              Мы объединяем юридическую экспертизу и IT-технологии для комплексного решения
              бизнес-задач
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Scale className="text-legal-500 dark:text-legal-400 h-12 w-12" />
              <div className="from-legal-500 to-tech-500 h-12 w-px bg-gradient-to-b" />
              <Code className="text-tech-500 dark:text-tech-400 h-12 w-12" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Card className="border-legal-500 dark:border-tech-400 border-2 p-12">
              <h2 className="mb-6 text-center text-3xl font-bold md:text-4xl">Наша миссия</h2>
              <p className="mb-6 text-center text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                <span className="from-legal-500 to-tech-500 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
                  Объединяем Legal + Tech
                </span>{" "}
                — предоставляем бизнесу комплексные решения, где юридическая защита сочетается с
                технологической автоматизацией.
              </p>
              <p className="text-center text-lg text-neutral-600 dark:text-neutral-400">
                Мы верим, что современный бизнес нуждается не просто в юристе или программисте, а в
                партнёре, который понимает обе стороны процесса и может создать работающую систему.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-16 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Цифры и факты</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="group hover:border-legal-500 dark:hover:border-tech-400 border-2 p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="mb-4 flex justify-center">
                    <Icon className="text-legal-500 group-hover:text-tech-500 dark:text-tech-400 dark:group-hover:text-legal-400 h-12 w-12 transition-colors" />
                  </div>
                  <div className="from-legal-500 to-tech-500 mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Наши ценности</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="group border-2 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="mb-6">
                    <Icon
                      className={`h-16 w-16 ${
                        value.color === "legal"
                          ? "text-legal-500 dark:text-legal-400"
                          : "text-tech-500 dark:text-tech-400"
                      }`}
                    />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{value.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white py-16 dark:from-neutral-900 dark:to-neutral-950">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Почему выбирают нас
            </h2>
            <div className="space-y-6">
              <Card className="border-legal-500 border-l-4 p-6">
                <h3 className="mb-2 text-xl font-bold">Комплексный подход Legal + Tech</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Не нужно искать отдельно юриста и программиста — мы решаем обе задачи в рамках
                  одного проекта, экономя ваше время и бюджет
                </p>
              </Card>

              <Card className="border-tech-500 border-l-4 p-6">
                <h3 className="mb-2 text-xl font-bold">Опыт работы с екатеринбургским бизнесом</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Знаем специфику региона, особенности местных судов и регуляторов, работаем с
                  компаниями от стартапов до крупных корпораций
                </p>
              </Card>

              <Card className="border-legal-500 border-l-4 p-6">
                <h3 className="mb-2 text-xl font-bold">Прозрачное ценообразование</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Фиксированные цены на типовые услуги, детальная смета для сложных проектов — вы
                  всегда знаете, за что платите
                </p>
              </Card>

              <Card className="border-tech-500 border-l-4 p-6">
                <h3 className="mb-2 text-xl font-bold">Современные технологии</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Используем актуальный стек (React, Next.js, Python, CRM Битрикс24/amoCRM) и
                  внедряем автоматизацию на каждом этапе
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-neutral-50 py-24 dark:from-neutral-950 dark:to-neutral-900">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Готовы начать сотрудничество?</h2>
            <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
              Свяжитесь с нами для бесплатной консультации и обсуждения вашего проекта
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/#contact"
                className="from-legal-500 to-tech-500 hover:from-legal-600 hover:to-tech-600 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Связаться с нами
                <span className="text-xl">→</span>
              </Link>
              <Link
                href="/price"
                className="hover:border-legal-500 dark:hover:border-tech-400 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-300 px-8 py-4 font-semibold transition-all duration-300 dark:border-neutral-700"
              >
                Посмотреть прайс
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
