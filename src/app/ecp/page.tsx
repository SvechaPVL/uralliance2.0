import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Label } from "@/components/primitives/label";
import { RutokenShowcase } from "@/components/showcases/RutokenVisual";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import type { Metadata } from "next";
import { FileKey, Shield, CheckCircle2, Clock, HeadphonesIcon, Percent, Usb } from "lucide-react";
import { CryptoProSection } from "@/components/ecp/CryptoProSection";
import { EcpPricesSection } from "@/components/ecp/EcpPricesSection";

export const metadata: Metadata = {
  title: "ЭЦП и Рутокены во Владивостоке | Uralliance",
  description:
    "Купить рутокен и получить электронную подпись во Владивостоке. Рутокен ЭЦП 3.0, Lite, Lite ЭЦП. Лицензии КриптоПро. Скидки пенсионерам.",
  keywords:
    "рутокен владивосток, эцп владивосток, купить рутокен, электронная подпись, криптопро владивосток, рутокен эцп 3.0, рутокен лайт, рутокен лайт эцп",
  alternates: {
    canonical: "/ecp",
  },
  openGraph: {
    title: "ЭЦП и Рутокены во Владивостоке",
    description:
      "Купить рутокен и получить электронную подпись. Рутокен ЭЦП 3.0, Lite. Лицензии КриптоПро.",
    type: "website",
    locale: "ru_RU",
    url: "/ecp",
    siteName: "Uralliance",
  },
};

const RUTOKEN_PRICES = [
  {
    name: "Рутокен ЭЦП 3.0",
    price: 2800,
    description: "Усиленная криптография",
    badge: "Топ продаж",
    features: ["ГОСТ 2012", "USB-A", "Сертификат ФСБ"],
  },
  {
    name: "Рутокен Lite",
    price: 2300,
    description: "Для хранения сертификатов",
    features: ["USB-A", "Базовый", "Надёжный"],
  },
  {
    name: "Рутокен Lite ЭЦП",
    price: 2500,
    description: "Для электронной подписи",
    features: ["USB-A", "ГОСТ 2012", "Сертификат ФСБ"],
  },
];

// UTM ссылка на партнёра
const TAXCOM_URL =
  "https://taxcom.ru/centr/?utm_source=uralliance&utm_medium=partner&utm_campaign=ecp";

const ADVANTAGES = [
  {
    icon: Clock,
    title: "Быстрое оформление",
    description: "Получите ЭЦП за 1-2 рабочих дня",
  },
  {
    icon: Shield,
    title: "Сертификация ФСБ",
    description: "Все носители сертифицированы",
  },
  {
    icon: HeadphonesIcon,
    title: "Техподдержка",
    description: "Помогаем с настройкой и использованием",
  },
  {
    icon: Percent,
    title: "Скидки пенсионерам",
    description: "На все наши услуги",
  },
];

export default function EcpPage() {
  return (
    <>
      <ServiceJsonLd
        name="ЭЦП и Рутокены"
        description="Получение ЭЦП и продажа рутокенов во Владивостоке"
      />
      <BreadcrumbJsonLd
        items={[{ name: "Главная", url: "https://uralliance.ru" }, { name: "ЭЦП и Рутокены" }]}
      />

      {/* Hero Section */}
      <Section
        variant="page-hero"
        spacing="none"
        background="secondary"
        disableFirstSpacing
        className="pt-[calc(6rem+var(--promo-banner-height))] pb-16 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-20 lg:pt-[calc(8rem+var(--promo-banner-height))] lg:pb-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={TAXCOM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Badge variant="tech" badgeStyle="outline" className="gap-1.5 font-semibold">
                    <Shield className="h-3.5 w-3.5" />
                    Партнёр Такском
                  </Badge>
                </Link>
                <Badge variant="legal" badgeStyle="subtle" className="tracking-widest uppercase">
                  ЭЦП
                </Badge>
                <Badge variant="tech" badgeStyle="subtle" className="tracking-widest uppercase">
                  Рутокены
                </Badge>
              </div>

              <Heading as="h1" size="3xl" weight="bold">
                Электронная подпись и рутокены во Владивостоке
              </Heading>

              <Text size="lg" tone="secondary">
                Продаём сертифицированные USB-токены и помогаем получить квалифицированную
                электронную подпись. Полное сопровождение от выбора до настройки.
              </Text>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="primary-legal" size="lg">
                  <Link href="/#contact">
                    <FileKey className="mr-2 h-5 w-5" />
                    Заказать ЭЦП
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#prices">Смотреть цены</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">1 час</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">на оформление</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-tech-primary)]">10+</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    лет службы токена
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-legal-primary)]">ФСБ</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">сертификация</div>
                </div>
              </div>
            </div>

            {/* Visual Showcase */}
            <div className="flex items-center justify-center">
              <RutokenShowcase />
            </div>
          </div>
        </Container>
      </Section>

      {/* Advantages */}
      <Section spacing="md">
        <Container className="max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item) => (
              <Card key={item.title} variant="legal" padding="md" className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-legal-surface)]">
                  <item.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
                </div>
                <Heading as="h3" size="sm" weight="semibold">
                  {item.title}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {item.description}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rutoken Prices */}
      <Section spacing="md" background="secondary" id="prices">
        <Container className="max-w-6xl space-y-8">
          <div className="text-center">
            <Label size="sm" spacing="wider" tone="muted">
              Носители для ЭЦП
            </Label>
            <Heading as="h2" size="xl" weight="semibold" className="mt-2">
              Рутокены — USB-токены для электронной подписи
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Сертифицированные носители с защитой от копирования
            </Text>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RUTOKEN_PRICES.map((item) => (
              <Card key={item.name} variant="legal" padding="md" className="flex flex-col">
                {/* Badge row - фиксированная высота для выравнивания */}
                <div className="mb-3 flex h-5 justify-end">
                  {item.badge && (
                    <Badge variant="legal" badgeStyle="filled" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </div>

                {/* Content - flex-1 для равной высоты */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-legal-surface)]">
                      <Usb className="h-5 w-5 text-[var(--color-legal-primary)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Heading as="h3" size="sm" weight="semibold">
                        {item.name}
                      </Heading>
                      <Text size="sm" tone="secondary">
                        {item.description}
                      </Text>
                    </div>
                  </div>

                  {/* Footer - всегда внизу */}
                  <div className="mt-auto flex items-end justify-between pt-4">
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-[var(--color-background-secondary)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="text-right text-xl font-bold whitespace-nowrap text-[var(--color-legal-primary)]">
                      {item.price.toLocaleString("ru-RU")}&nbsp;₽
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CryptoPro Prices */}
      <CryptoProSection />

      {/* ECP Prices */}
      <EcpPricesSection />

      {/* Why Rutoken */}
      <Section spacing="md">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg">
            <div className="text-center">
              <Heading as="h2" size="xl" weight="semibold">
                Почему рутокен, а не флешка?
              </Heading>
              <Text size="lg" tone="secondary" className="mt-3">
                USB-токен — это специализированный криптографический носитель
              </Text>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Защита от копирования", desc: "Ключ нельзя скопировать с токена" },
                { title: "Сертификация ФСБ", desc: "Обязательное требование для КЭП" },
                { title: "Надёжность", desc: "Работает 10+ лет без замены" },
                { title: "Совместимость", desc: "Поддерживается всеми госсервисами" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-legal-primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" background="secondary">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg" className="text-center">
            <Badge variant="legal" badgeStyle="filled" className="mb-4">
              Скидки пенсионерам
            </Badge>
            <Heading as="h2" size="xl" weight="semibold">
              Готовы оформить ЭЦП?
            </Heading>
            <Text size="lg" tone="secondary" className="mt-3">
              Оставьте заявку — поможем выбрать подходящий вариант и оформим за 1-2 дня
            </Text>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary-legal" size="lg">
                <Link href="/#contact">Оставить заявку</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={contacts.phone.main.link}>Позвонить</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
