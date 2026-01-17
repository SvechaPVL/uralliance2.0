"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Text } from "@/components/primitives/text";
import { Badge } from "@/components/primitives/badge";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { contacts } from "@/lib/contacts";
import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  FileKey,
  Users,
  Briefcase,
  User,
  Building2,
  ShoppingCart,
  Cpu,
  Usb,
  Info,
  Phone,
} from "lucide-react";

// ============================================================================
// Данные прайса
// ============================================================================

const ECP_CATEGORIES = [
  {
    id: "directors",
    title: "Первым лицам компании и ИП",
    icon: Briefcase,
    description: "Электронные подписи для руководителей организаций и индивидуальных предпринимателей",
    items: [
      {
        name: "ЭП первого лица организации и ИП",
        price: 3950,
        description: "Оформление заявки на электронную подпись для любых бизнес-задач. Получите КЭП УЦ ФНС без посещения инспекции.",
        features: ["Квалифицированная", "1 год", "Все госсервисы"],
        note: "Если требуется ЭП для работы в ЕГАИС или обезличенная ЭП — сообщите менеджеру",
      },
      {
        name: "Продление ЭП от ФНС без посещения налоговой",
        price: 3950,
        description: "Поможем перевыпустить электронную подпись, выданную ФНС, быстро и дистанционно.",
        features: ["Квалифицированная", "1 год", "Дистанционно"],
      },
    ],
  },
  {
    id: "employees",
    title: "Сотрудникам юридических лиц",
    icon: Users,
    description: "Электронные подписи для представителей и сотрудников организаций",
    items: [
      {
        name: "Квалифицированный для сотрудников",
        price: 3000,
        description: "Для использования в системах электронного документооборота.",
        features: ["Квалифицированная", "1 год", "ЭДО"],
      },
      {
        name: "Квалифицированный для сотрудников + КриптоПро CSP",
        price: 3950,
        description: "Для использования в системах «Такском-Доклайнз» и других системах. Лицензия КриптоПро CSP в комплекте.",
        features: ["Квалифицированная", "1 год", "+ КриптоПро"],
      },
      {
        name: "Ключ представителя директора",
        price: 6000,
        description: "Универсальная электронная подпись для взаимодействия с государственными органами, а также участия в торгах на ЭТП по реализации имущества.",
        features: ["Квалифицированная", "1 год", "Госорганы + Торги"],
      },
      {
        name: "Для корпоративных систем ЭДО и мобильных приложений",
        price: 4000,
        description: "Некопируемая подпись для работы в «Такском-Файлере» и других системах ЭДО. Поддерживается запись на «Рутокен 3.0» с NFC для работы в мобильном приложении.",
        features: ["Квалифицированная", "1 год", "NFC / Мобильные"],
      },
    ],
  },
  {
    id: "selfemployed",
    title: "Самозанятым",
    icon: User,
    description: "Электронные подписи для самозанятых граждан",
    items: [
      {
        name: "Самозанятым",
        price: 2000,
        description: "Для оформления сделок с недвижимостью, открытия ИП или ООО, подачи документов в суд, получения госуслуг в электронном виде, для участия в торгах на ЭТП.",
        features: ["Квалифицированная", "1 год", "Универсальная"],
      },
      {
        name: "Самозанятым + КриптоПро CSP",
        price: 2950,
        description: "Лицензия КриптоПро CSP в комплекте. Для оформления сделок с недвижимостью, открытия ИП или ООО, подачи документов в суд.",
        features: ["Квалифицированная", "1 год", "+ КриптоПро"],
      },
    ],
  },
  {
    id: "individuals",
    title: "Физическим лицам",
    icon: User,
    description: "Электронные подписи для граждан",
    items: [
      {
        name: "Физическим лицам",
        price: 2000,
        description: "Для оформления сделок с недвижимостью, открытия ИП или ООО, подачи документов в суд, получения госуслуг в электронном виде, для участия в торгах на ЭТП.",
        features: ["Квалифицированная", "1 год", "Госуслуги"],
      },
      {
        name: "Физическим лицам + КриптоПро CSP",
        price: 2950,
        description: "Лицензия КриптоПро CSP в комплекте.",
        features: ["Квалифицированная", "1 год", "+ КриптоПро"],
      },
    ],
  },
  {
    id: "unqualified",
    title: "Неквалифицированная ЭП",
    icon: FileKey,
    description: "Для корпоративных систем и внутреннего ЭДО",
    items: [
      {
        name: "Неквалифицированная ЭП",
        price: 2300,
        description: "Выдаётся на первых лиц, сотрудников организаций, физлиц. Для использования в корпоративных системах и других видах ЭДО.",
        features: ["Неквалифицированная", "1 год", "Корпоративные системы"],
      },
      {
        name: "Неквалифицированная ЭП + КриптоПро CSP",
        price: 2950,
        description: "Лицензия КриптоПро CSP в комплекте. Для использования в корпоративных системах и других видах ЭДО.",
        features: ["Неквалифицированная", "1 год", "+ КриптоПро"],
      },
      {
        name: "КриптоViP",
        price: 3550,
        description: "Для информационных систем и ЭДО. Выпускается при помощи СКЗИ «ViPNet CSP».",
        features: ["Неквалифицированная", "1 год", "ViPNet"],
      },
    ],
  },
  {
    id: "special",
    title: "Специализированные ЭП",
    icon: Building2,
    description: "Для работы с государственными системами и отраслевыми сервисами",
    items: [
      {
        name: "ЕГАИС",
        price: 3550,
        description: "Для работы с ЕГАИС ФСКАТР (Росалкогольрегулирование).",
        features: ["Квалифицированная", "1 год", "Алкоголь"],
      },
      {
        name: "Зеленый коридор (ФТС) + Альта-Софт",
        price: 4000,
        description: "Для взаимодействия с Федеральной таможенной службой и работы в системах Альта-Софт.",
        features: ["Квалифицированная", "1 год", "Таможня"],
      },
      {
        name: "Сертификат для ГИИС ДМДК",
        price: 4000,
        description: "Для работы в Государственной интегрированной информационной системе в сфере контроля за оборотом драгоценных металлов и камней.",
        features: ["Квалифицированная", "Увеличенный срок", "Драгметаллы"],
      },
    ],
  },
  {
    id: "trading",
    title: "Электронные торги",
    icon: ShoppingCart,
    description: "Для участия в закупках и торгах на электронных площадках",
    items: [
      {
        name: "Электронные торги — Базовый",
        price: 4950,
        description: "Для работы на торговых площадках и в сервисах госорганов, не имеющих индивидуальных требований.",
        features: ["Квалифицированная", "1 год", "Базовые ЭТП"],
      },
      {
        name: "Электронные торги — Универсальный",
        price: 7950,
        description: "Для работы на большинстве популярных торговых площадок, включая «Фабрикант», «B2B-Center» и сервисы госорганов.",
        features: ["Квалифицированная", "1 год", "Все основные ЭТП"],
      },
      {
        name: "Электронные торги — B2B-Center",
        price: 6750,
        description: "Для площадки «B2B-Center» и взаимодействия с госорганами. Площадка «Фабрикант» не входит.",
        features: ["Квалифицированная", "1 год", "B2B-Center"],
      },
      {
        name: "Электронные торги — Фабрикант",
        price: 6750,
        description: "Для работы на площадке «Фабрикант» и взаимодействия с госорганами. Площадка «B2B-Center» не входит.",
        features: ["Квалифицированная", "1 год", "Фабрикант"],
      },
      {
        name: "Электронные торги — ТендерСтандарт",
        price: 8500,
        description: "Для работы на площадке «ТендерСтандарт» и взаимодействия с госорганами.",
        features: ["Квалифицированная", "1 год", "ТендерСтандарт"],
      },
      {
        name: "Электронные торги — Центр дистанционных торгов",
        price: 8500,
        description: "Для работы на площадке «Центр дистанционных торгов» и взаимодействия с госорганами.",
        features: ["Квалифицированная", "1 год", "ЦДТ"],
      },
      {
        name: "Электронные торги — ТопТорг",
        price: 8500,
        description: "Для работы на площадке «ТопТорг» и взаимодействия с госорганами.",
        features: ["Квалифицированная", "1 год", "ТопТорг"],
      },
      {
        name: "Национальное достояние",
        price: 10000,
        description: "Для участия в электронных торгах нефтяной и газовой отрасли + все возможности тарифа «Электронные торги».",
        features: ["Квалифицированная", "1 год", "Нефть и газ"],
      },
      {
        name: "Петербургская Биржа",
        price: 4550,
        description: "Для работы в системах биржи АО «Санкт-Петербургская Международная Товарно-сырьевая Биржа».",
        features: ["Квалифицированная", "1 год", "СПбМТСБ"],
      },
    ],
  },
];

const ACCESSORIES = [
  {
    name: "Рутокен ЭЦП 3.0",
    price: 2800,
    description: "Усиленная криптография, сертификат ФСБ. Топ продаж.",
    recommended: true,
  },
  {
    name: "Рутокен ЭЦП",
    price: 2500,
    description: "Криптографический носитель с аппаратной поддержкой ГОСТ.",
  },
  {
    name: "Рутокен Lite",
    price: 2300,
    description: "Базовый носитель для хранения сертификатов.",
  },
];

const CRYPTOPRO_LICENSES = [
  {
    name: "КриптоПро CSP 5.0",
    price: 1850,
    period: "1 год",
    description: "Основное ПО для работы с электронной подписью на компьютере.",
  },
  {
    name: "КриптоПро Office Signature",
    price: 1200,
    period: "бессрочная",
    description: "Для подписания документов Word и Excel.",
  },
  {
    name: "КриптоПро CSP 5.0 (серверная)",
    price: 70000,
    period: "бессрочная",
    description: "Для серверного использования.",
  },
  {
    name: "КриптоПро TSP Client",
    price: 1800,
    period: "бессрочная",
    description: "Клиент службы штампов времени.",
  },
  {
    name: "КриптоПро OCSP Client",
    price: 1800,
    period: "бессрочная",
    description: "Проверка статуса сертификата в реальном времени.",
  },
];

// ============================================================================
// Компонент страницы
// ============================================================================

export default function EcpPricePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide navigation, header, footer, promo banner, buttons */
          nav, header, footer, .no-print, button,
          [class*="promo-banner"], [class*="PromoBanner"],
          [data-promo-banner], .promo-banner {
            display: none !important;
          }

          /* Reset backgrounds and shadows */
          body {
            background: white !important;
            color: black !important;
            font-size: 11pt !important;
          }

          section {
            background: white !important;
            padding: 0.5rem 0 !important;
            break-inside: avoid;
          }

          /* Cards styling for print */
          [class*="card"], [class*="Card"] {
            border: 1px solid #ddd !important;
            background: white !important;
            box-shadow: none !important;
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Price highlighting */
          .price-value {
            color: black !important;
            font-weight: bold !important;
          }

          /* Headers */
          h1, h2, h3 {
            color: black !important;
          }

          /* Badges */
          [class*="badge"], [class*="Badge"] {
            border: 1px solid #666 !important;
            background: #f5f5f5 !important;
            color: black !important;
          }

          /* Page breaks */
          .print-break-before {
            page-break-before: always;
          }

          /* Compact layout */
          .container {
            max-width: 100% !important;
            padding: 0 1rem !important;
          }

          /* Company info for print */
          .print-header {
            display: block !important;
            text-align: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid black;
          }
        }

        @media screen {
          .print-header {
            display: none;
          }
        }
      `}</style>

      {/* Print Header (only visible when printing) */}
      <div className="print-header">
        <h1 style={{ fontSize: "18pt", margin: 0 }}>ООО «Юральянс» — Прайс-лист на ЭЦП</h1>
        <p style={{ margin: "0.5rem 0" }}>Владивосток, ул. Суханова, 11, офис 77</p>
        <p style={{ margin: 0 }}>Тел: +7 (914) 705-47-13 | info@uralliance.ru | uralliance.ru</p>
      </div>

      {/* Hero */}
      <Section
        variant="page-hero"
        spacing="none"
        background="secondary"
        disableFirstSpacing
        className="no-print pt-[calc(6rem+var(--promo-banner-height))] pb-12 sm:pt-[calc(7rem+var(--promo-banner-height))] sm:pb-16"
      >
        <Container className="max-w-6xl">
          <Breadcrumb className="mb-6" />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="legal" badgeStyle="outline" className="gap-1.5 font-semibold">
                  <FileKey className="h-3.5 w-3.5" />
                  Полный прайс-лист
                </Badge>
              </div>

              <Heading as="h1" size="2xl" weight="bold">
                Прайс-лист на электронные подписи
              </Heading>

              <Text size="lg" tone="secondary" className="max-w-2xl">
                Все виды ЭЦП, носители и лицензии КриптоПро. Подробные описания и цены. Страница оптимизирована для печати.
              </Text>
            </div>

            <div className="no-print flex flex-wrap gap-3">
              <Button variant="outline" size="md" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Распечатать
              </Button>
              <Button asChild variant="ghost" size="md">
                <Link href="/ecp">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Contact */}
      <Section spacing="sm" className="no-print">
        <Container className="max-w-6xl">
          <Card variant="legal" padding="md" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-[var(--color-legal-primary)]" />
              <Text size="sm">
                Нужна помощь с выбором? Проконсультируем и подберём бесплатно
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary-legal" size="sm">
                <Link href={contacts.phone.tech.link}>
                  <Phone className="mr-2 h-4 w-4" />
                  {contacts.phone.tech.display}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/#contact">Оставить заявку</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* ECP Categories */}
      {ECP_CATEGORIES.map((category, catIndex) => (
        <Section
          key={category.id}
          spacing="md"
          background={catIndex % 2 === 0 ? "default" : "secondary"}
          className={catIndex === 4 ? "print-break-before" : ""}
        >
          <Container className="max-w-6xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-legal-surface)]">
                <category.icon className="h-6 w-6 text-[var(--color-legal-primary)]" />
              </div>
              <div>
                <Heading as="h2" size="lg" weight="semibold">
                  {category.title}
                </Heading>
                <Text size="sm" tone="secondary">
                  {category.description}
                </Text>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <Card key={item.name} variant="legal" padding="md" className="flex flex-col">
                  <div className="flex-1 space-y-3">
                    <Heading as="h3" size="sm" weight="semibold">
                      {item.name}
                    </Heading>
                    <Text size="sm" tone="secondary">
                      {item.description}
                    </Text>
                    {item.note && (
                      <Text size="xs" tone="secondary" className="italic">
                        {item.note}
                      </Text>
                    )}
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
                  </div>
                  <div className="mt-4 border-t border-[var(--color-border-soft)] pt-4">
                    <div className="price-value text-2xl font-bold text-[var(--color-legal-primary)]">
                      {item.price.toLocaleString("ru-RU")}&nbsp;₽
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* Accessories Section */}
      <Section spacing="md" background="secondary" className="print-break-before">
        <Container className="max-w-6xl space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-tech-surface)]">
              <Usb className="h-6 w-6 text-[var(--color-tech-primary)]" />
            </div>
            <div>
              <Heading as="h2" size="lg" weight="semibold">
                Носители для ЭЦП (Рутокены)
              </Heading>
              <Text size="sm" tone="secondary">
                USB-токены для безопасного хранения электронной подписи
              </Text>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {ACCESSORIES.map((item) => (
              <Card key={item.name} variant="tech" padding="md" className="relative">
                {item.recommended && (
                  <Badge variant="tech" badgeStyle="filled" size="sm" className="absolute top-3 right-3">
                    Рекомендуем
                  </Badge>
                )}
                <Heading as="h3" size="sm" weight="semibold">
                  {item.name}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {item.description}
                </Text>
                <div className="price-value mt-4 text-2xl font-bold text-[var(--color-tech-primary)]">
                  {item.price.toLocaleString("ru-RU")}&nbsp;₽
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CryptoPro Section */}
      <Section spacing="md">
        <Container className="max-w-6xl space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-tech-surface)]">
              <Cpu className="h-6 w-6 text-[var(--color-tech-primary)]" />
            </div>
            <div>
              <Heading as="h2" size="lg" weight="semibold">
                Лицензии КриптоПро
              </Heading>
              <Text size="sm" tone="secondary">
                Программное обеспечение для работы с электронной подписью
              </Text>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CRYPTOPRO_LICENSES.map((item) => (
              <Card key={item.name} variant="tech" padding="md">
                <Heading as="h3" size="sm" weight="semibold">
                  {item.name}
                </Heading>
                <Text size="sm" tone="secondary" className="mt-2">
                  {item.description}
                </Text>
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-xs text-[var(--color-text-secondary)]">{item.period}</span>
                  <span className="price-value text-xl font-bold text-[var(--color-tech-primary)]">
                    {item.price.toLocaleString("ru-RU")}&nbsp;₽
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Info Section */}
      <Section spacing="md" background="secondary">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg">
            <Heading as="h2" size="lg" weight="semibold" className="text-center">
              Важная информация
            </Heading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <Heading as="h3" size="sm" weight="semibold" className="mb-2">
                  Что такое квалифицированная ЭП?
                </Heading>
                <Text size="sm" tone="secondary">
                  Квалифицированная электронная подпись (КЭП) — это цифровой аналог собственноручной подписи с полной юридической силой. Выдаётся аккредитованными удостоверяющими центрами и подходит для работы со всеми государственными сервисами.
                </Text>
              </div>
              <div>
                <Heading as="h3" size="sm" weight="semibold" className="mb-2">
                  Зачем нужен носитель (токен)?
                </Heading>
                <Text size="sm" tone="secondary">
                  USB-токен — защищённый носитель для хранения ключа электронной подписи. В отличие от флешки, токен защищает ключ от копирования и обеспечивает безопасность вашей подписи.
                </Text>
              </div>
              <div>
                <Heading as="h3" size="sm" weight="semibold" className="mb-2">
                  Зачем нужен КриптоПро?
                </Heading>
                <Text size="sm" tone="secondary">
                  КриптоПро CSP — программа, которая позволяет использовать электронную подпись на компьютере. Без неё подписывать документы не получится. Некоторые тарифы уже включают лицензию.
                </Text>
              </div>
              <div>
                <Heading as="h3" size="sm" weight="semibold" className="mb-2">
                  Срок действия
                </Heading>
                <Text size="sm" tone="secondary">
                  Большинство сертификатов ЭП выдаётся на 1 год. После окончания срока необходимо продление. Носитель (токен) можно использовать многократно — при продлении покупать новый не нужно.
                </Text>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg" className="no-print">
        <Container className="max-w-4xl">
          <Card variant="legal" padding="lg" className="text-center">
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
                <Link href={contacts.phone.tech.link}>
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить
                </Link>
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
