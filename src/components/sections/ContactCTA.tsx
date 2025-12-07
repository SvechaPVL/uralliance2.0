"use client";

import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { Spotlight } from "@/components/animations/Spotlight";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { generateTelegramLink, generateWhatsAppLink } from "@/lib/messenger";
import { trackPhoneClick, trackEmailClick, trackMessengerClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import { Text } from "@/components/primitives/text";
import contactsData from "@/content/contacts.json";
import sectionsConfig from "@/content/sections.json";

const CONTACT_DETAILS = [
  {
    label: sectionsConfig.contact_cta.contactDetails.phone,
    value: contactsData.phone.main.display,
    href: contactsData.phone.main.link,
  },
  {
    label: sectionsConfig.contact_cta.contactDetails.email,
    value: contactsData.email.display,
    href: contactsData.email.link,
  },
  {
    label: sectionsConfig.contact_cta.contactDetails.office,
    value: contactsData.address.short,
    href: contactsData.address.mapLink,
  },
] as const;

const messengerActions = [
  {
    label: sectionsConfig.contact_cta.messengers.whatsapp,
    href: generateWhatsAppLink(
      contactsData.messengers.whatsapp.phone,
      contactsData.messengers.whatsapp.defaultMessage
    ),
    style: "legal" as const,
  },
  {
    label: sectionsConfig.contact_cta.messengers.telegram,
    href: generateTelegramLink(
      contactsData.messengers.telegram.username,
      contactsData.messengers.telegram.defaultMessage
    ),
    style: "tech" as const,
  },
];

/**
 * Contact CTA Section
 *
 * Combines contact details, messenger links, and the ContactForm inside
 * an animated spotlight wrapper.
 */
export function ContactCTA() {
  return (
    <Section id="contact" aria-labelledby="contact-heading" spacing="xl">
      <Container className="max-w-6xl">
        <Spotlight className="border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-8 lg:max-w-xl lg:flex-1">
              <Badge
                variant="tech"
                badgeStyle="subtle"
                size="sm"
                className="tracking-[0.35em] uppercase"
              >
                {sectionsConfig.contact_cta.badge}
              </Badge>

              <div className="space-y-4">
                <Heading as="h2" id="contact-heading" size="lg" weight="semibold">
                  {sectionsConfig.contact_cta.heading}
                </Heading>
                <Text size="lg" tone="secondary">
                  {sectionsConfig.contact_cta.description}
                </Text>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {CONTACT_DETAILS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (item.href.startsWith("tel:")) {
                        trackPhoneClick(item.value);
                      } else if (item.href.startsWith("mailto:")) {
                        trackEmailClick(item.value);
                      }
                    }}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-white/5 p-4",
                      "transition-all duration-300 hover:border-white/30 hover:bg-white/10",
                      "focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] focus-visible:outline-none"
                    )}
                  >
                    <Label as="p" size="sm" spacing="wider" tone="muted">
                      {item.label}
                    </Label>
                    <Text size="base" weight="semibold" tone="white" className="mt-2">
                      {item.value}
                    </Text>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {messengerActions.map((action) => (
                  <Button
                    key={action.label}
                    asChild
                    variant={action.style === "legal" ? "primary-legal" : "primary-tech"}
                    size="sm"
                  >
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (action.label.toLowerCase().includes("whatsapp")) {
                          trackMessengerClick("whatsapp", "contact_cta");
                        } else if (action.label.toLowerCase().includes("telegram")) {
                          trackMessengerClick("telegram", "contact_cta");
                        }
                      }}
                    >
                      {action.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full rounded-3xl border border-white/10 bg-[var(--color-background)]/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] lg:w-auto lg:max-w-[480px] lg:min-w-[420px] lg:p-8">
              <ContactForm />
            </div>
          </div>
        </Spotlight>
      </Container>
    </Section>
  );
}
