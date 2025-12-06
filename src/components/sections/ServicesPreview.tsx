"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import Link from "next/link";
import servicesConfig from "@/content/services-preview.json";
import sectionsConfig from "@/content/sections.json";

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
    <Section id="services" spacing="lg">
      <Container className="relative z-10">
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Label size="md" spacing="widest" tone="muted">
              {sectionsConfig.services_preview.label}
            </Label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" size="2xl" weight="semibold" className="mt-4">
              {sectionsConfig.services_preview.heading}
            </Heading>
          </motion.div>
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
                <Label size="sm" spacing="widest" tone="legal" className="opacity-80">
                  {sectionsConfig.services_preview.legal.studioLabel}
                </Label>
                <Heading as="h3" size="lg" weight="semibold" className="mt-4">
                  {sectionsConfig.services_preview.legal.heading}
                </Heading>
                <Text size="base" tone="secondary" className="mt-2">
                  {sectionsConfig.services_preview.legal.description}
                </Text>
              </div>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {servicesConfig.legal.map((service) => (
                  <motion.li key={service.title} variants={itemVariants}>
                    <Link href={`/services/legal/${service.slug}`}>
                      <Card
                        variant="legal"
                        padding="md"
                        className="group relative mb-4 cursor-pointer overflow-hidden border border-[var(--color-legal-border-soft)] bg-[var(--color-legal-surface)]/70 transition-transform duration-300 hover:-translate-y-1"
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
                            <Heading as="h4" size="sm" weight="semibold">
                              {service.title}
                            </Heading>
                            <Text size="sm" tone="secondary" className="mt-1">
                              {service.description}
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <Button asChild variant="primary-legal" size="md" className="mt-4">
                <Link href="/services/legal">{sectionsConfig.services_preview.legal.ctaLabel}</Link>
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
                <Label size="sm" spacing="widest" tone="tech" className="opacity-80">
                  {sectionsConfig.services_preview.tech.studioLabel}
                </Label>
                <Heading as="h3" size="lg" weight="semibold" className="mt-4">
                  {sectionsConfig.services_preview.tech.heading}
                </Heading>
                <Text size="base" tone="secondary" className="mt-2">
                  {sectionsConfig.services_preview.tech.description}
                </Text>
              </div>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {servicesConfig.tech.map((service) => (
                  <motion.li key={service.title} variants={itemVariants}>
                    <Link href={`/services/tech/${service.slug}`}>
                      <Card
                        variant="tech"
                        padding="md"
                        className="group relative mb-4 cursor-pointer overflow-hidden border border-[var(--color-tech-border-soft)] bg-[var(--color-tech-surface)]/70 transition-transform duration-300 hover:-translate-y-1"
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
                            <Heading as="h4" size="sm" weight="semibold">
                              {service.title}
                            </Heading>
                            <Text size="sm" tone="secondary" className="mt-1">
                              {service.description}
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <Button asChild variant="primary-tech" size="md" className="mt-4">
                <Link href="/services/tech">{sectionsConfig.services_preview.tech.ctaLabel}</Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
