"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cards = [
  { label: "Каталоги авто", description: "Автоматически подгружаем остатки из 1С." },
  { label: "A/B тесты", description: "Запускаем варианты hero и коммерческих блоков." },
  { label: "Онлайн-чаты", description: "Telegram, WhatsApp, web-виджет с пушами." },
];

export function WebBrowserShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-[200px] w-full flex-col rounded-3xl border border-white/5 bg-[#05070c] p-3 text-white sm:min-h-[360px] lg:min-h-[420px] lg:p-6">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/5 bg-[#070a11] px-3 py-2 text-xs text-white/60 sm:gap-3 sm:px-4">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
          <span className="h-2 w-2 rounded-full bg-[#10b981]" />
        </div>
        <div className="min-w-[160px] flex-1 rounded-full bg-white/5 px-3 py-1 text-center text-[11px] tracking-wide text-white/70">
          autoservices.uralliance.ru
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4 md:flex-row md:gap-6">
        <div className="flex-1 rounded-2xl border border-white/5 bg-gradient-to-b from-white/15 via-transparent to-transparent p-3 sm:p-4 lg:p-6">
          <motion.div
            key={active}
            className="h-24 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#140c19] sm:h-32 sm:rounded-3xl lg:h-48"
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="mt-3 text-sm sm:mt-4 lg:mt-6">
            <div className="text-xs text-white/80 sm:text-sm">Что делаем</div>
            <motion.ul
              className="mt-2 space-y-2 text-white/70 sm:mt-3 sm:space-y-3"
              key={`list-${active}`}
            >
              {cards.slice(0, 2).map((card, idx) => (
                <motion.li
                  key={card.label}
                  className="rounded-xl border border-white/10 px-2 py-1.5 sm:rounded-2xl sm:px-3 sm:py-2"
                  animate={{ opacity: idx === active ? 1 : 0.4, scale: idx === active ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs font-semibold text-white sm:text-sm">{card.label}</div>
                  <p className="text-[10px] sm:text-xs">{card.description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <div className="hidden w-full space-y-3 md:block md:w-64">
          {["Калькулятор стоимости", "Онлайн-чат", "SEO-аудит"].map((title, idx) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-white/5 bg-[#070a11]/80 px-4 py-4 text-sm"
              animate={{ opacity: idx === active ? 1 : 0.4 }}
            >
              <div className="text-xs tracking-[0.3em] text-white/60 uppercase">{title}</div>
              <div className="mt-2 text-lg font-semibold text-white/90">
                {idx === 0 ? "Авто-каталог" : idx === 1 ? "Ответ 2 мин" : "95/100"}
              </div>
              <div className="mt-2 h-1 rounded-full bg-white/10" />
            </motion.div>
          ))}
          <motion.div
            className="rounded-2xl border border-white/5 bg-[#070a11]/80 px-4 py-4 text-sm"
            animate={{ opacity: 0.6 }}
          >
            <div className="text-white/80">Личный кабинет</div>
            <p className="text-xs text-white/50">Документы, статусы и платежи для клиента.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
