"use client";

import { motion } from "framer-motion";
import { Gauge, Smartphone, Search, Zap, ShoppingCart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const metrics = [
  { icon: Zap, label: "Скорость", value: "<2 сек", color: "#22c55e" },
  { icon: Smartphone, label: "Мобильные", value: "Адаптив", color: "#3b82f6" },
  { icon: Search, label: "Яндекс/Google", value: "Топ-10", color: "#a855f7" },
  { icon: Gauge, label: "Конверсия", value: "+40%", color: "#f59e0b" },
];

const features = [
  { icon: ShoppingCart, label: "Каталог", delay: 0 },
  { icon: MessageCircle, label: "Чат", delay: 0.2 },
];

export function WebBrowserShowcase() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* Glow effect behind browser */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-tech-primary)]/20 blur-3xl" />
      </div>

      {/* Browser window */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl border border-[var(--color-tech-border)]/30 bg-gradient-to-b from-[#0c1220] to-[#080c14] p-3 shadow-[var(--color-tech-primary)]/10 shadow-2xl"
      >
        {/* Browser header */}
        <div className="flex items-center gap-2 rounded-xl bg-[#050810] px-3 py-2">
          <div className="flex gap-1.5">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-[#ef4444]"
              whileHover={{ scale: 1.2 }}
            />
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"
              whileHover={{ scale: 1.2 }}
            />
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-[#22c55e]"
              whileHover={{ scale: 1.2 }}
            />
          </div>
          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-white/5 px-3 py-1">
            <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs text-white/60">yourcompany.ru</span>
          </div>
        </div>

        {/* Website preview */}
        <div className="mt-3 space-y-3">
          {/* Hero section mockup with animation */}
          <motion.div
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-tech-primary)]/25 to-[var(--color-tech-primary)]/5 p-4"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.div
              className="h-3 w-28 rounded bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: 112 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="mt-2 h-2 w-36 rounded bg-white/15"
              initial={{ width: 0 }}
              animate={{ width: 144 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            <motion.div
              className="mt-3 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="h-7 w-24 rounded-lg bg-[var(--color-tech-primary)] shadow-[var(--color-tech-primary)]/30 shadow-lg" />
              <div className="h-7 w-20 rounded-lg border border-white/20 bg-white/5" />
            </motion.div>
          </motion.div>

          {/* Animated cards */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-lg bg-white/5 p-2"
                animate={{
                  borderColor: activeCard === i ? "rgba(74, 222, 128, 0.5)" : "transparent",
                  scale: activeCard === i ? 1.02 : 1,
                }}
                style={{ borderWidth: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-8 rounded bg-white/10"
                  animate={{
                    backgroundColor:
                      activeCard === i ? "rgba(74, 222, 128, 0.15)" : "rgba(255,255,255,0.1)",
                  }}
                />
                <div className="mt-2 h-1.5 w-full rounded bg-white/5" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-white/5" />
              </motion.div>
            ))}
          </div>

          {/* Bottom bar with features */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <div className="flex gap-3">
              {features.map((f) => (
                <motion.div
                  key={f.label}
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + f.delay }}
                >
                  <f.icon className="h-3 w-3 text-[var(--color-tech-primary)]" />
                  <span className="text-[10px] text-white/50">{f.label}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="h-5 w-5 rounded-full bg-[var(--color-tech-primary)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating metrics */}
      <div className="absolute -right-2 -bottom-2 grid grid-cols-2 gap-2 sm:-right-6 sm:-bottom-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a0f1a]/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm sm:px-3 sm:py-2"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
            >
              <metric.icon
                className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
                style={{ color: metric.color }}
              />
            </motion.div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-white sm:text-xs">{metric.value}</div>
              <div className="truncate text-[9px] text-white/50 sm:text-[10px]">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-3 -left-3 h-6 w-6 rounded-full border border-[var(--color-tech-primary)]/30 bg-[var(--color-tech-primary)]/10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-1 right-8 h-2 w-2 rounded-full bg-[var(--color-tech-primary)]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
