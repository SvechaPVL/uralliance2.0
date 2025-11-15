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
  { company: "Aurum Logistics", channel: "Bitrix24 ↔ 1C", status: "Счет синхронизирован", synced: "10:32" },
  { company: "Codex Media", channel: "amoCRM ↔ Telegram", status: "Лид квалифицирован", synced: "10:29" },
  { company: "Vega Retail", channel: "Asana ↔ 1C", status: "Задача обновлена", synced: "10:27" },
  { company: "Nordic Metals", channel: "HubSpot ↔ SAP", status: "Контакт обогащен", synced: "10:24" },
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
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-[#05070c] p-4 text-white">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[#7c8da3]">
        <span>Синхронизация</span>
        <span>{activeRow.synced}</span>
      </div>

      <div className="space-y-3 text-sm text-white/80">
        {rows.map((row, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={row.company}
              className={cn(
                "rounded-2xl border border-white/5 px-4 py-3 transition-colors",
                isActive ? "bg-white/5" : "bg-transparent"
              )}
            >
              <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                <span>{row.channel}</span>
                <span>{row.synced}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-base font-medium text-white">{row.company}</p>
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      {...statusPill}
                      className="rounded-full border border-[#0ea5e9]/40 bg-[#0f8ab1]/20 px-3 py-1 text-xs text-[#7dd3fc]"
                    >
                      LIVE
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-1 text-sm text-[#cbd5f5]">{row.status}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#07090f] p-4">
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
