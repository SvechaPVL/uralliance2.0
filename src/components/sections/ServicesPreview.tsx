"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";

const services = {
  legal: [
    { title: "Корпоративные сделки", description: "M&A, опционы, сопровождение инвестиций." },
    { title: "Договорная работа", description: "Конструкторы, аудит, претензионная защита." },
    { title: "Недвижимость", description: "Due diligence объектов, сопровождение сделок." },
    { title: "Комплаенс и ИБ", description: "Политики, персональные данные, регламенты." },
  ],
  tech: [
    { title: "Интеграции 1С / CRM", description: "Сквозные процессы, обмен данными, API." },
    { title: "PWA и веб-платформы", description: "Лендинги, кабинеты, маркетплейсы, SEO." },
    { title: "Чат-боты и мессенджеры", description: "Telegram/WhatsApp, платежи, омниканал." },
    { title: "ИИ и автоматизация", description: "RAG-ассистенты, классификация, обработка." },
  ],
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const listVariants = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesPreview() {
  return (
    <section className="relative py-20 sm:py-24">
      <Container className="relative z-10">
        <div className="mb-12 max-w-3xl">
          <motion.p
            className="text-sm uppercase tracking-[0.4em] text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Legal × Tech
          </motion.p>
          <motion.h2
            className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Две практики, один партнер: закрываем юридические вопросы и цифровые продукты в связке.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Legal column */}
          <motion.div
            className="flex flex-col gap-4"
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card variant="legal" padding="lg" className="h-full">
              <div className="mb-6 select-none">
                <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-legal-dark)] opacity-80">
                  Legal Studio
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  Юридическое сопровождение
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  Корпоративные, договорные и комплаенс-задачи в одной плоскости.
                </p>
              </div>
              <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {services.legal.map((service) => (
                  <motion.li key={service.title} variants={itemVariants}>
                    <Card
                      variant="glass"
                      padding="md"
                      className="group relative mb-4 overflow-hidden border border-[var(--color-legal-border-soft)] bg-[var(--color-legal-surface)]/70 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div
                        className="pointer-events-none absolute inset-[-30%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(120% 140% at 10% 10%, rgba(212,175,55,0.25), transparent 60%)",
                        }}
                      />
                      <div className="relative flex items-start justify-between gap-2 select-none">
                        <div>
                          <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">{service.title}</h4>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{service.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.li>
                ))}
              </motion.ul>
              <Button variant="primary-legal" size="md" className="mt-4">
                Все legal-услуги
              </Button>
            </Card>
          </motion.div>

          {/* Tech column */}
          <motion.div
            className="flex flex-col gap-4"
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15 }}
          >
            <Card variant="tech" padding="lg" className="h-full">
              <div className="mb-6 select-none">
                <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-tech-primary)] opacity-80">
                  Tech Studio
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                  IT и цифровые сервисы
                </h3>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  Интеграции, продукты и AI-решения с плотной связкой с бизнес-процессами.
                </p>
              </div>
              <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {services.tech.map((service) => (
                  <motion.li key={service.title} variants={itemVariants}>
                    <Card
                      variant="glass"
                      padding="md"
                      className="group relative mb-4 overflow-hidden border border-[var(--color-tech-border-soft)] bg-[var(--color-tech-surface)]/70 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div
                        className="pointer-events-none absolute inset-[-30%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(120% 140% at 90% 10%, rgba(6,182,212,0.25), transparent 60%)",
                        }}
                      />
                      <div className="relative flex items-start justify-between gap-2 select-none">
                        <div>
                          <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">{service.title}</h4>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{service.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.li>
                ))}
              </motion.ul>
              <Button variant="primary-tech" size="md" className="mt-4">
                Все tech-услуги
              </Button>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
