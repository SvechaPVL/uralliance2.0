"use client";

import { Container } from "@/components/layout/Container";
import { BentoGrid, type BentoGridItem } from "@/components/animations/BentoGrid";
import { Card3D } from "@/components/animations/Card3D";
import { TelegramChat } from "@/components/showcases/TelegramChat";
import { CrmMatrix } from "@/components/showcases/CrmMatrix";
import { WebBrowserShowcase } from "@/components/showcases/WebBrowser";
import { MobileCafeApp } from "@/components/showcases/MobileCafeApp";

const bentoItems: BentoGridItem[] = [
  {
    id: "crm",
    colSpan: 3,
    rowSpan: 2,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="relative flex h-full flex-col justify-between gap-6 p-6">
          <div>
            <span className="inline-flex items-center rounded-full border border-[var(--color-tech-border-soft)] px-3 py-1 text-xs uppercase tracking-[0.3em] text-[var(--color-tech-primary)]">
              CRM интеграции
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
              Единый контур продаж и операций
            </h3>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Синхронизируем 1С, Bitrix24, Telegram и внутренние сервисы, чтобы заявки не терялись,
              а менеджеры видели полный контекст.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-[var(--color-text-secondary)]">
            {["1С + CRM", "Webhook шины", "ETL пайплайны", "Роли и права"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-tech-primary)] shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-4 flex-1">
            <CrmMatrix />
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "bots",
    colSpan: 2,
    rowSpan: 2,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col gap-4 p-6">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Telegram / WhatsApp
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white">Чат-боты и омниканал</h3>
            <p className="mt-2 text-sm text-white/80">
              Платежи, воронки, подключение операторов и интеграция с CRM.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <TelegramChat />
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "whatsapp",
    colSpan: 2,
    rowSpan: 1,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col justify-between gap-4 p-6">
          <span className="text-xs uppercase tracking-[0.4em] text-[var(--color-tech-primary)]">
            WhatsApp API
          </span>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Мобильные приложения под бренд</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Напоминания, статусы заказов и платежи прямо в мессенджере.
          </p>
          <div className="mt-2 flex-1">
            <MobileCafeApp />
          </div>
        </div>
      </Card3D>
    ),
  },
  {
    id: "web",
    colSpan: 3,
    rowSpan: 1,
    className: "border-0 bg-transparent p-0 select-none",
    content: (
      <Card3D className="h-full rounded-3xl p-0">
        <div className="flex h-full flex-col justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-[var(--color-border-soft)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
              Web / PWA
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-[var(--color-text-muted)]">
              Lighthouse 95+
            </div>
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Сайты и личные кабинеты, которые продают
          </h3>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]">
            {["SEO + контент", "Адаптив 360°", "CMS / headless", "A/B тесты"].map((item) => (
              <span key={item} className="rounded-full border border-[var(--color-border-soft)] px-3 py-1">
                {item}
              </span>
            ))}
          </div>
          <div className="flex-1 pt-4">
            <WebBrowserShowcase />
          </div>
        </div>
      </Card3D>
    ),
  },
];

export function TechShowcase() {
  return (
    <section className="relative py-28 sm:py-32">
      <Container className="relative z-10 select-none">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-text-muted)]">Tech Stack</p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
            Внедряем продукты полного цикла — от интеграций до персональных AI-ботов.
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Переосмысливаем процессы через связку CRM, мессенджеров, веб-платформ и аналитики.
          </p>
        </div>

        <div className="mx-auto max-w-[1500px] px-4 lg:px-12">
          <BentoGrid items={bentoItems} rowHeight="minmax(260px, auto)" />
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 top-10 opacity-40">
        <div className="mx-auto h-72 w-72 rounded-full bg-gradient-to-br from-[var(--color-tech-surface-strong)] to-transparent blur-3xl" />
      </div>
    </section>
  );
}
