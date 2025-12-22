"use client";

import { motion } from "framer-motion";
import { Gauge, Smartphone, Search, Zap } from "lucide-react";

const metrics = [
  { icon: Gauge, label: "Lighthouse", value: "95+", color: "#22c55e" },
  { icon: Smartphone, label: "Мобильная версия", value: "100%", color: "#3b82f6" },
  { icon: Search, label: "SEO Ready", value: "Да", color: "#a855f7" },
  { icon: Zap, label: "Загрузка", value: "<2с", color: "#f59e0b" },
];

export function WebBrowserShowcase() {
  return (
    <div className="relative w-full max-w-md">
      {/* Browser window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-[var(--color-tech-border)]/30 bg-[#0a0f1a] p-3 shadow-2xl"
      >
        {/* Browser header */}
        <div className="flex items-center gap-2 rounded-xl bg-[#050810] px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-xs text-white/50">
            yoursite.ru
          </div>
        </div>

        {/* Website preview */}
        <div className="mt-3 space-y-3">
          {/* Hero section mockup */}
          <div className="rounded-xl bg-gradient-to-br from-[var(--color-tech-primary)]/20 to-[var(--color-tech-primary)]/5 p-4">
            <div className="h-3 w-24 rounded bg-white/20" />
            <div className="mt-2 h-2 w-32 rounded bg-white/10" />
            <div className="mt-3 h-6 w-20 rounded-md bg-[var(--color-tech-primary)]/50" />
          </div>

          {/* Content blocks */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-white/5 p-2">
                <div className="h-8 rounded bg-white/10" />
                <div className="mt-2 h-1.5 w-full rounded bg-white/5" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-white/5" />
              </div>
            ))}
          </div>

          {/* Footer mockup */}
          <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2">
            <div className="h-2 w-16 rounded bg-white/10" />
            <div className="h-2 w-12 rounded bg-white/10" />
          </div>
        </div>
      </motion.div>

      {/* Metrics cards - floating around the browser */}
      <div className="absolute -right-4 -bottom-4 grid grid-cols-2 gap-2 sm:-right-8 sm:-bottom-8">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a0f1a]/95 px-3 py-2 shadow-lg backdrop-blur-sm"
          >
            <metric.icon className="h-4 w-4 shrink-0" style={{ color: metric.color }} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white">{metric.value}</div>
              <div className="truncate text-[10px] text-white/50">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
