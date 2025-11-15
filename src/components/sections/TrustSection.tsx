"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Card } from "@/components/primitives/card";

const stats = [
  { value: 500, suffix: "+", label: "реализованных проектов" },
  { value: 15, suffix: " лет", label: "опыта команды" },
  { value: 98, suffix: "%", label: "довольных клиентов" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function TrustSection() {
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
            доверяют лидеры рынка
          </motion.p>
          <motion.h2
            className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Более десяти лет объединяем юридический опыт и технологические продукты в рамках одной
            команды Uralliance.
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-[var(--color-text-secondary)] sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Нас выбирают компании, которым нужен не подрядчик, а стратегический партнёр: защищаем
            сделки, внедряем интеграции, масштабируем процессы без бюрократии.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card variant="glass" padding="lg" className="h-full">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="gap-3"
                  valueClassName="text-4xl font-bold text-gradient lg:text-5xl"
                  label={stat.label}
                  labelClassName="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-40">
        <div className="mx-auto h-64 w-64 rounded-full bg-gradient-to-br from-[var(--color-legal-primary)]/10 to-[var(--color-tech-primary)]/10 blur-3xl" />
      </div>
    </section>
  );
}
