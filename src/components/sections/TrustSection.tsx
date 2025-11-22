"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Card } from "@/components/primitives/card";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import sectionsConfig from "@/content/sections.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function TrustSection() {
  return (
    <Section spacing="lg">
      <Container className="relative z-10">
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Label size="md" spacing="widest" tone="muted">
              {sectionsConfig.trust.label}
            </Label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" size="2xl" weight="semibold" className="mt-4">
              {sectionsConfig.trust.heading}
            </Heading>
          </motion.div>
          <motion.p
            className="mt-4 text-base text-[var(--color-text-secondary)] sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {sectionsConfig.trust.description}
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
          {sectionsConfig.trust.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card variant="glass" padding="lg" className="h-full">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="gap-3"
                  valueClassName="text-4xl font-bold text-gradient lg:text-5xl"
                  label={stat.label}
                  labelClassName="text-xs uppercase tracking-wider text-[var(--color-text-muted)]"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-40">
        <div className="mx-auto h-64 w-64 rounded-full bg-gradient-to-br from-[var(--color-legal-primary)]/10 to-[var(--color-tech-primary)]/10 blur-3xl" />
      </div>
    </Section>
  );
}
