import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Card } from "@/components/primitives/card";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import additionalServices from "@/content/additional-services.json";

export const metadata: Metadata = {
  title: "Дополнительные услуги",
  description:
    "Дополнительные юридические и корпоративные услуги: электронные подписи, юридические адреса, экспертизы, публикации в официальных изданиях. Партнерство с ведущими банками.",
};

export default function AdditionalServicesPage() {
  const { legalServices, partnerships } = additionalServices;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", url: "https://uralliance.ru" },
          { name: "Услуги", url: "https://uralliance.ru/services" },
          { name: "Дополнительные услуги" },
        ]}
      />
      <main className="min-h-screen pt-28 pb-20">
        <Container>
          {/* Заголовок */}
          <Section>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium tracking-[0.4em] text-[var(--color-text-muted)] uppercase">
                Расширенные возможности
              </p>
              <h1 className="mb-6 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
                Дополнительные услуги
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Полный спектр корпоративных и юридических услуг для комплексной поддержки вашего
                бизнеса
              </p>
            </div>
          </Section>

          {/* Юридические услуги */}
          <Section>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {legalServices.map((service, index) => (
                <Card
                  key={service.id}
                  variant="legal"
                  className="animate-fadeInUp p-6 transition-colors hover:border-[var(--color-legal-border)]"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="mb-4">
                    <h3 className="mb-2 text-2xl font-semibold text-[var(--color-text-primary)]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {service.shortDescription}
                    </p>
                  </div>

                  <p className="mb-4 text-[var(--color-text-secondary)]">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-legal-primary)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Партнерство с банками */}
          <Section>
            <Card variant="tech" className="border-[var(--color-tech-border)] p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-tech-border-soft)] bg-[var(--color-tech-badge)] px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-tech-primary)]" />
                  <span className="text-sm font-semibold text-[var(--color-tech-primary)]">
                    Финансовые партнеры
                  </span>
                </div>

                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
                  {partnerships.title}
                </h2>

                <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
                  {partnerships.description}
                </p>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {partnerships.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-tech-surface)]">
                        <svg
                          className="h-4 w-4 text-[var(--color-tech-primary)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-[var(--color-text-secondary)]">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
                    Наши банки-партнеры:
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {partnerships.banks.map((bank, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)]/50 p-4 backdrop-blur-sm"
                      >
                        <p className="mb-1 font-semibold text-[var(--color-text-primary)]">
                          {bank.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">{bank.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Section>

          {/* CTA */}
          <Section>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)]">
                Нужна консультация?
              </h2>
              <p className="mb-8 text-[var(--color-text-secondary)]">
                Свяжитесь с нами для обсуждения вашей задачи и получения персонального предложения
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="https://t.me/svechapvl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-tech-primary)] px-8 py-4 text-lg font-semibold text-[#03121d] transition-all duration-200 hover:bg-[var(--color-tech-dark)] active:scale-95"
                >
                  Написать в Telegram
                </a>
                <a
                  href="https://wa.me/79149618687"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--color-legal-primary)] px-8 py-4 text-lg font-semibold text-[var(--color-legal-primary)] transition-all duration-200 hover:bg-[var(--color-legal-surface)] active:scale-95"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Section>
        </Container>
      </main>
    </>
  );
}
