"use client";

import Script from "next/script";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { ContactForm } from "@/components/forms/ContactForm";
import { Spotlight } from "@/components/animations/Spotlight";
import { MapWrapper } from "@/components/animations/MapWrapper";
import { generateLocalBusinessSchema, generateOrganizationSchema } from "@/lib/seo";
import { generateTelegramLink, generateWhatsAppLink } from "@/lib/messenger";
import { trackPhoneClick, trackEmailClick, trackMessengerClick } from "@/lib/analytics";
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import { List } from "@/components/primitives/list";
import pagesConfig from "@/content/pages.json";
import contactsConfig from "@/content/contacts.json";

const ORGANIZATION_SCHEMA = generateOrganizationSchema();
const LOCAL_BUSINESS_SCHEMA = generateLocalBusinessSchema();

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: pagesConfig.contacts.details.labels.office,
    value: contactsConfig.office.address,
    href: contactsConfig.office.mapLink,
  },
  {
    icon: Phone,
    label: pagesConfig.contacts.details.labels.phone,
    value: contactsConfig.phone.display,
    href: contactsConfig.phone.link,
  },
  {
    icon: Mail,
    label: pagesConfig.contacts.details.labels.email,
    value: contactsConfig.email.display,
    href: contactsConfig.email.link,
  },
  {
    icon: Clock,
    label: pagesConfig.contacts.details.labels.schedule,
    value: pagesConfig.contacts.details.schedule,
  },
];

const MESSENGERS = [
  {
    label: pagesConfig.contacts.hero.messengers.telegram,
    href: generateTelegramLink(
      contactsConfig.messengers.telegram.username,
      contactsConfig.messengers.telegram.defaultMessage
    ),
    variant: "outline-telegram" as const,
  },
  {
    label: pagesConfig.contacts.hero.messengers.whatsapp,
    href: generateWhatsAppLink(
      contactsConfig.messengers.whatsapp.number,
      contactsConfig.messengers.whatsapp.defaultMessage
    ),
    variant: "outline-whatsapp" as const,
  },
];

const responseHighlights = pagesConfig.contacts.responseHighlights.items;

export default function ContactsPage() {
  return (
    <>
      <Script
        id="ld-json-organization-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <Script
        id="ld-json-local-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
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
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.2),_transparent_55%)]" />
          <Container className="space-y-10">
            <div className="space-y-6 text-center">
              <Badge variant="tech" badgeStyle="subtle">
                {pagesConfig.contacts.hero.badges.support}
              </Badge>
              <Heading as="h1" size="2xl" weight="semibold">
                {pagesConfig.contacts.hero.heading}
              </Heading>
              <Text size="lg" tone="secondary" className="sm:text-xl">
                {pagesConfig.contacts.hero.description}
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                {MESSENGERS.map((messenger) => (
                  <Button
                    key={messenger.label}
                    asChild
                    variant={messenger.variant}
                    size="md"
                    icon={<MessageSquare className="h-5 w-5" />}
                  >
                    <a
                      href={messenger.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (messenger.label.toLowerCase().includes("telegram")) {
                          trackMessengerClick("telegram", "contacts_page_hero");
                        } else if (messenger.label.toLowerCase().includes("whatsapp")) {
                          trackMessengerClick("whatsapp", "contacts_page_hero");
                        }
                      }}
                    >
                      {messenger.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Contact info */}
        <Section spacing="md" className="pt-4 pb-16">
          <Container className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {CONTACT_DETAILS.map((detail) => {
                const content = (
                  <Card
                    key={detail.label}
                    variant="tech"
                    className="h-full space-y-3 p-6 hover:shadow-[0_20px_45px_-30px_rgba(0,0,0,0.75)]"
                    hoverable
                  >
                    <Label size="md" spacing="wider" tone="muted">
                      {detail.label}
                    </Label>
                    <Text size="lg" weight="semibold">
                      {detail.value}
                    </Text>
                  </Card>
                );

                if (!detail.href) {
                  return content;
                }

                const external = detail.href.startsWith("http");

                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="block"
                    onClick={() => {
                      if (detail.href?.startsWith("tel:")) {
                        trackPhoneClick(detail.value);
                      } else if (detail.href?.startsWith("mailto:")) {
                        trackEmailClick(detail.value);
                      }
                    }}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Form + details */}
        <Section spacing="md">
          <Container className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
            <Spotlight className="border border-[var(--color-border-soft)] bg-[var(--color-card-bg)]/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mx-auto max-w-3xl rounded-3xl border border-white/5 bg-[var(--color-background)]/90 p-6 sm:p-8">
                <div className="mb-8 space-y-3">
                  <Badge variant="tech" badgeStyle="subtle" size="sm">
                    {pagesConfig.contacts.form.badge}
                  </Badge>
                  <Heading as="h2" size="xl" weight="semibold">
                    {pagesConfig.contacts.form.heading}
                  </Heading>
                  <Text size="lg" tone="secondary">
                    {pagesConfig.contacts.form.description}
                  </Text>
                </div>
                <ContactForm />
              </div>
            </Spotlight>

            <div className="space-y-6">
              <Card variant="tech" className="space-y-4 p-6">
                <Label size="md" spacing="wider" tone="muted">
                  {pagesConfig.contacts.responseHighlights.label}
                </Label>
                <List
                  variant="feature"
                  spacing="md"
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {responseHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
                <div className="rounded-2xl border border-dashed border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                  {pagesConfig.contacts.responseHighlights.note}
                </div>
              </Card>
              <Card variant="tech" className="space-y-4 p-6">
                <Label size="md" spacing="wider" tone="muted">
                  {pagesConfig.contacts.meeting.label}
                </Label>
                <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                  <p>{pagesConfig.contacts.meeting.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="primary-tech" size="sm">
                      <Link
                        href={contactsConfig.phone.link}
                        onClick={() => trackPhoneClick(contactsConfig.phone.display)}
                      >
                        {pagesConfig.contacts.meeting.buttons.call}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="border border-[var(--color-border)]"
                    >
                      <Link
                        href={contactsConfig.email.link}
                        onClick={() => trackEmailClick(contactsConfig.email.display)}
                      >
                        {pagesConfig.contacts.meeting.buttons.email}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Map */}
        <Section spacing="md" background="secondary">
          <Container className="space-y-6">
            <div className="flex items-center gap-3">
              <Navigation className="h-10 w-10 rounded-2xl bg-[var(--color-card-bg)] p-2" />
              <div>
                <Text size="xl" weight="semibold">
                  {pagesConfig.contacts.map.label}
                </Text>
              </div>
            </div>
            <Card variant="tech" className="overflow-hidden p-0">
              <MapWrapper
                lat={contactsConfig.office.coordinates.lat}
                lng={contactsConfig.office.coordinates.lng}
                zoom={17}
                height="420px"
                markerTitle={pagesConfig.contacts.map.iframeTitle}
                mapUrl={contactsConfig.office.mapLink}
              />
            </Card>
          </Container>
        </Section>

        {/* CTA */}
        <Section spacing="md">
          <Container>
            <Card variant="tech" padding="lg" className="text-center">
              <Label size="md" spacing="wider" tone="muted">
                {pagesConfig.contacts.cta.label}
              </Label>
              <Heading as="h3" size="lg" weight="semibold">
                {pagesConfig.contacts.cta.heading}
              </Heading>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="primary-legal" size="md">
                  <Link href={pagesConfig.contacts.cta.buttons.price.href}>
                    {pagesConfig.contacts.cta.buttons.price.label}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="md">
                  <Link
                    href={pagesConfig.contacts.cta.buttons.email.href}
                    onClick={() => trackEmailClick(contactsConfig.email.display)}
                  >
                    {pagesConfig.contacts.cta.buttons.email.label}
                  </Link>
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </div>
    </>
  );
}
