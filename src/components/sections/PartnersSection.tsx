"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Label } from "@/components/primitives/label";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import Image from "next/image";
import {
  Banknote,
  ArrowRight,
  ExternalLink,
  Shield,
  Handshake,
} from "lucide-react";
import { SberbankBannerPixel } from "@/components/system/AdriverPixel";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Реферальная ссылка из партнёрской программы Деловой среды
const REFERRAL_LINK = "https://partners.dasreda.ru/landing/products?partnerID=61dfc7384e62472725c2";

const PARTNERS = [
  {
    id: "sberbank",
    name: "Сбербанк Бизнес",
    subtitle: "Деловая среда",
    description: "Кредиты и финансовые продукты для ИП и ООО от крупнейшего банка России",
    logo: "/images/partners/sberbank-logo.svg",
    banner: "/images/partners/sberbank-banner.png",
    color: "#21a038",
    features: ["Кредиты до 200 млн ₽", "Ставка от 16%", "Решение за 1-3 дня"],
    link: REFERRAL_LINK,
    internalLink: "/sberbank",
    isExternal: true,
    badge: "Официальный агент",
  },
];

export function PartnersSection() {
  return (
    <Section spacing="lg" background="secondary">
      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Label size="md" spacing="widest" tone="muted">
              Партнёры
            </Label>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" size="2xl" weight="semibold" className="mt-4">
              Финансовые решения для бизнеса
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Text size="lg" tone="secondary" className="mx-auto mt-4 max-w-2xl">
              Как официальный агент Деловой среды помогаем предпринимателям
              получить доступ к финансовым продуктам Сбербанка
            </Text>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <motion.div
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {PARTNERS.map((partner) => (
            <motion.div key={partner.id} variants={fadeInUp}>
              <Card
                variant="legal"
                padding="lg"
                className="relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl"
                style={{ borderColor: `${partner.color}30` }}
              >
                {/* Background decoration */}
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl"
                  style={{ backgroundColor: `${partner.color}10` }}
                />

                <div className="relative grid items-center gap-8 lg:grid-cols-2">
                  {/* Left side - Content */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="legal"
                        badgeStyle="outline"
                        className="gap-1.5 font-semibold"
                        style={{
                          borderColor: `${partner.color}50`,
                          color: partner.color,
                        }}
                      >
                        <Shield className="h-3.5 w-3.5" />
                        {partner.badge}
                      </Badge>
                    </div>

                    <div>
                      <Heading as="h3" size="xl" weight="semibold">
                        {partner.name}
                      </Heading>
                      <Text size="sm" tone="muted" className="mt-1">
                        {partner.subtitle}
                      </Text>
                    </div>

                    <Text tone="secondary" className="max-w-lg">
                      {partner.description}
                    </Text>

                    <div className="flex flex-wrap gap-2">
                      {partner.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="legal"
                          badgeStyle="subtle"
                          size="sm"
                          style={{
                            backgroundColor: `${partner.color}10`,
                            color: partner.color,
                          }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <Button
                        asChild
                        variant="primary-legal"
                        size="lg"
                        style={{
                          backgroundColor: partner.color,
                        }}
                        className="hover:opacity-90"
                      >
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Banknote className="mr-2 h-5 w-5" />
                          Подать заявку
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href={partner.internalLink}>
                          Подробнее
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right side - Banner */}
                  <div className="flex justify-center lg:justify-end">
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-2xl border-2 p-1 shadow-lg transition-all hover:shadow-2xl"
                      style={{ borderColor: `${partner.color}30` }}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <Image
                          src={partner.banner}
                          alt={`${partner.name} — ${partner.subtitle}`}
                          width={350}
                          height={350}
                          className="h-auto w-full max-w-[350px] transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Floating badge */}
                      <div
                        className="absolute -top-3 -right-3 rounded-full border bg-[var(--color-background-primary)] px-3 py-1.5 text-xs font-semibold shadow-lg"
                        style={{
                          borderColor: partner.color,
                          color: partner.color,
                        }}
                      >
                        <Handshake className="mr-1 inline h-3 w-3" />
                        Партнёр
                      </div>

                      {/* Пиксель аудита показов баннера */}
                      {partner.id === "sberbank" && <SberbankBannerPixel />}
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Text size="xs" tone="muted" className="text-center">
            Реклама. АО «Деловая среда». ИНН 7736641983. Не является публичной офертой.
          </Text>
        </motion.div>
      </Container>

      {/* Background blur */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-40">
        <div className="mx-auto h-64 w-64 rounded-full bg-gradient-to-br from-[#21a038]/10 to-[var(--color-legal-primary)]/10 blur-3xl" />
      </div>
    </Section>
  );
}
