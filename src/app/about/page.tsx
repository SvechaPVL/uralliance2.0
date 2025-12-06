import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ArrowUpRight, Cpu, Layers, Scale } from "lucide-react";
import { generateOrganizationSchema } from "@/lib/seo";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { List } from "@/components/primitives/list";
import pagesConfig from "@/content/pages.json";

const organizationSchema = generateOrganizationSchema();

export const metadata: Metadata = {
  title: pagesConfig.about.title,
  description: pagesConfig.about.description,
  keywords: pagesConfig.about.keywords,
};

const iconMap = {
  Scale,
  Cpu,
  Layers,
} as const;

export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-json-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
        {/* Hero */}
        <Section
          variant="page-hero"
          spacing="none"
          isolate
          overflow="hidden"
          disableFirstSpacing
          className="pt-[calc(6rem+var(--promo-banner-height))] pb-16 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-20 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-24"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.25),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.35),_transparent_65%)]" />
          <Container className="space-y-12">
            <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-8">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="legal" badgeStyle="subtle" size="sm">
                    {pagesConfig.about.hero.badges.location}
                  </Badge>
                  <Badge variant="tech" badgeStyle="subtle" size="sm">
                    {pagesConfig.about.hero.badges.established}
                  </Badge>
                </div>
                <div className="space-y-6">
                  <Heading as="h1" size="2xl" weight="semibold">
                    {pagesConfig.about.hero.heading}
                    <span className="bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)] bg-clip-text text-transparent">
                      {pagesConfig.about.hero.headingGradient}
                    </span>
                    {pagesConfig.about.hero.headingContinued}
                  </Heading>
                  <Text size="lg" tone="secondary" className="sm:text-xl">
                    {pagesConfig.about.hero.description}
                  </Text>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="primary-legal" size="md">
                    <Link href={pagesConfig.about.hero.buttons.legal.href}>
                      {pagesConfig.about.hero.buttons.legal.label}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="md"
                    className="border border-[var(--color-border)]"
                  >
                    <Link href={pagesConfig.about.hero.buttons.tech.href}>
                      {pagesConfig.about.hero.buttons.tech.label}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <Card variant="tech" className="space-y-6 p-8">
                <Label size="md" spacing="wider" tone="muted">
                  {pagesConfig.about.hero.manifest.label}
                </Label>
                <Text size="2xl" weight="semibold">
                  {pagesConfig.about.hero.manifest.heading}
                </Text>
                <List
                  variant="feature"
                  spacing="lg"
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {pagesConfig.about.hero.manifest.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              </Card>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pagesConfig.about.stats.map((stat) => (
                <Card key={stat.label} variant="tech" className="p-6">
                  <Text size="2xl" weight="semibold" className="text-4xl">
                    {stat.value}
                  </Text>
                  <Text size="sm" tone="secondary" className="mt-2">
                    {stat.label}
                  </Text>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Synergy */}
        <Section spacing="md">
          <Container className="space-y-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card variant="legal" className="space-y-6 p-8">
                <Badge variant="legal" badgeStyle="outline" size="sm">
                  {pagesConfig.about.synergy.legal.badge}
                </Badge>
                <Heading as="h2" size="xl" weight="semibold">
                  {pagesConfig.about.synergy.legal.heading}
                </Heading>
                <Text size="lg" tone="secondary">
                  {pagesConfig.about.synergy.legal.description}
                </Text>
                <List
                  variant="feature"
                  spacing="md"
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {pagesConfig.about.synergy.legal.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </List>
              </Card>

              <Card variant="tech" className="space-y-6 p-8">
                <Badge variant="tech" badgeStyle="outline" size="sm">
                  {pagesConfig.about.synergy.tech.badge}
                </Badge>
                <Heading as="h2" size="xl" weight="semibold">
                  {pagesConfig.about.synergy.tech.heading}
                </Heading>
                <Text size="lg" tone="secondary">
                  {pagesConfig.about.synergy.tech.description}
                </Text>
                <List
                  variant="feature"
                  spacing="md"
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {pagesConfig.about.synergy.tech.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </List>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section spacing="md" background="secondary" bordered>
          <Container className="space-y-10">
            <div className="space-y-4 text-center">
              <Badge variant="tech" badgeStyle="subtle">
                {pagesConfig.about.values.badge}
              </Badge>
              <Heading as="h2" size="2xl" weight="semibold">
                {pagesConfig.about.values.heading}
              </Heading>
              <Text size="lg" tone="secondary">
                {pagesConfig.about.values.description}
              </Text>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pagesConfig.about.values.items.map((value) => {
                const Icon = iconMap[value.icon as keyof typeof iconMap];
                return (
                  <Card key={value.title} variant="tech" className="space-y-4 p-6">
                    <Icon className="h-12 w-12 text-[var(--color-text-primary)]" />
                    <Heading as="h3" size="lg" weight="semibold">
                      {value.title}
                    </Heading>
                    <Text size="sm" tone="secondary">
                      {value.description}
                    </Text>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Differentiators */}
        <Section spacing="md">
          <Container className="space-y-8">
            <div className="space-y-4">
              <Badge variant="legal" badgeStyle="subtle">
                {pagesConfig.about.differentiators.badge}
              </Badge>
              <Heading as="h2" size="2xl" weight="semibold">
                {pagesConfig.about.differentiators.heading}
              </Heading>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {pagesConfig.about.differentiators.items.map((diff) => (
                <Card key={diff.title} variant="legal" className="space-y-3 p-6">
                  <Heading as="h3" size="md" weight="semibold">
                    {diff.title}
                  </Heading>
                  <Text size="sm" tone="secondary">
                    {diff.description}
                  </Text>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Timeline */}
        <Section spacing="md" borderTop>
          <Container className="space-y-12">
            <div className="space-y-4">
              <Badge variant="tech" badgeStyle="subtle">
                {pagesConfig.about.timeline.badge}
              </Badge>
              <Heading as="h2" size="2xl" weight="semibold">
                {pagesConfig.about.timeline.heading}
              </Heading>
            </div>
            <div className="space-y-8">
              {pagesConfig.about.timeline.items.map((item) => (
                <div
                  key={item.year}
                  className="grid gap-6 rounded-3xl border border-[var(--color-border)] p-6 lg:grid-cols-[120px,1fr,220px]"
                >
                  <div>
                    <Label size="md" spacing="wider" tone="muted">
                      {item.year}
                    </Label>
                  </div>
                  <div>
                    <Heading as="h3" size="lg" weight="semibold">
                      {item.title}
                    </Heading>
                    <Text size="sm" tone="secondary" className="mt-2">
                      {item.description}
                    </Text>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-background-secondary)] p-4 text-sm text-[var(--color-text-secondary)]">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section spacing="lg" className="pt-12 pb-24">
          <Container>
            <Card variant="tech" className="relative overflow-hidden p-10 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.25),_transparent_60%)]" />
              <div className="relative space-y-6">
                <Label size="md" spacing="wider" tone="muted">
                  {pagesConfig.about.cta.label}
                </Label>
                <Heading as="h3" size="lg" weight="semibold">
                  {pagesConfig.about.cta.heading}
                </Heading>
                <Text size="lg" tone="secondary">
                  {pagesConfig.about.cta.description}
                </Text>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="primary-tech" size="md">
                    <Link href={pagesConfig.about.cta.buttons.contact.href}>
                      {pagesConfig.about.cta.buttons.contact.label}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="md">
                    <Link href={pagesConfig.about.cta.buttons.price.href}>
                      {pagesConfig.about.cta.buttons.price.label}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </Container>
        </Section>
      </div>
    </>
  );
}
