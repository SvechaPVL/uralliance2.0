import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { Spotlight } from "@/components/animations/Spotlight";
import { Badge } from "@/components/primitives/badge";
import { generateTelegramLink, generateWhatsAppLink } from "@/lib/messenger";
import { cn } from "@/lib/utils";

const CONTACT_DETAILS = [
  {
    label: "Телефон",
    value: "+7 (343) 123-45-67",
    href: "tel:+73431234567",
  },
  {
    label: "Email",
    value: "info@uralliance.ru",
    href: "mailto:info@uralliance.ru",
  },
  {
    label: "Офис",
    value: "Екатеринбург, ул. Бориса Ельцина, 3",
    href: "https://yandex.ru/maps/-/CDBF54~m",
  },
] as const;

const messengerActions = [
  {
    label: "Написать в WhatsApp",
    href: generateWhatsAppLink(
      undefined,
      "Здравствуйте! Я с сайта Uralliance и хочу обсудить проект."
    ),
    style: "legal" as const,
  },
  {
    label: "Написать в Telegram",
    href: generateTelegramLink(
      undefined,
      "Здравствуйте! Нужна консультация Uralliance."
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
    <section id="contact" aria-labelledby="contact-heading" className="py-24 lg:py-32">
      <Container className="max-w-6xl">
        <Spotlight className="border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 backdrop-blur-2xl px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-8">
              <Badge variant="tech" badgeStyle="subtle" size="sm" className="uppercase tracking-[0.35em]">
                Ответ за 1 рабочий день
              </Badge>

              <div className="space-y-4">
                <h2
                  id="contact-heading"
                  className="text-3xl lg:text-4xl font-display font-semibold text-[var(--color-text-primary)]"
                >
                  Готовы начать?
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)]">
                  Заполните форму или выберите удобный способ связи. Команда Uralliance подключится к
                  вашему проекту и предложит следующий шаг в течение одного рабочего дня.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {CONTACT_DETAILS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-2xl border border-white/10 bg-white/5 p-4",
                      "hover:border-white/30 hover:bg-white/10 transition-all duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)]"
                    )}
                  >
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {messengerActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                      action.style === "legal"
                        ? "bg-[var(--color-legal-primary)] text-[#0b0f19] hover:-translate-y-0.5"
                        : "bg-[var(--color-tech-primary)] text-[#03121d] hover:-translate-y-0.5"
                    )}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[var(--color-background)]/90 p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <ContactForm />
            </div>
          </div>
        </Spotlight>
      </Container>
    </section>
  );
}
