"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LeadRow {
  company: string;
  channel: string;
  status: string;
  synced: string;
}

const rows: LeadRow[] = [
  {
    company: "Aurum Logistics",
    channel: "Bitrix24 ↔ 1C",
    status: "Счет синхронизирован",
    synced: "10:32",
  },
  {
    company: "Codex Media",
    channel: "amoCRM ↔ Telegram",
    status: "Лид квалифицирован",
    synced: "10:29",
  },
  { company: "Vega Retail", channel: "Asana ↔ 1C", status: "Задача обновлена", synced: "10:27" },
  {
    company: "Nordic Metals",
    channel: "HubSpot ↔ SAP",
    status: "Контакт обогащен",
    synced: "10:24",
  },
];

const statusPill = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function CrmMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rows.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, []);

  const activeRow = useMemo(() => rows[activeIndex], [activeIndex]);

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/5 bg-[#05070c] p-3 text-white sm:gap-4 sm:p-4">
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-[#7c8da3] uppercase sm:text-xs">
        <span>Синхронизация</span>
        <span>{activeRow.synced}</span>
      </div>

      <div className="space-y-2 text-sm text-white/80 sm:space-y-3">
        {rows.slice(0, 2).map((row, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={row.company}
              className={cn(
                "rounded-xl border border-white/5 px-3 py-2 transition-colors sm:rounded-2xl sm:px-4 sm:py-3",
                isActive ? "bg-white/5" : "bg-transparent"
              )}
            >
              <div className="flex items-center justify-between text-[10px] text-[#94a3b8] sm:text-xs">
                <span>{row.channel}</span>
                <span>{row.synced}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between sm:mt-2">
                <p className="text-sm font-medium text-white sm:text-base">{row.company}</p>
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      {...statusPill}
                      className="rounded-full border border-[#0ea5e9]/40 bg-[#0f8ab1]/20 px-2 py-0.5 text-[10px] text-[#7dd3fc] sm:px-3 sm:py-1 sm:text-xs"
                    >
                      LIVE
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-0.5 text-xs text-[#cbd5f5] sm:mt-1 sm:text-sm">{row.status}</p>
            </div>
          );
        })}
      </div>

      <div className="hidden rounded-2xl border border-white/5 bg-[#07090f] p-4 sm:block">
        <div className="flex items-center justify-between text-xs text-[#94a3b8]">
          <span>Интеграции</span>
          <span>Статус</span>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          {["Finance API", "Маркетинг", "Склад"].map((item, idx) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-white/90">{item}</span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs",
                  idx === 0 ? "bg-[#0f8ab1]/20 text-[#7dd3fc]" : "bg-white/5 text-white/70"
                )}
              >
                {idx === 0 ? "Выполняется" : "Готово"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
