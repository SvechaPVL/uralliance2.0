"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RutokenVisualProps {
  variant?: "ecp3" | "ecp2" | "lite";
  className?: string;
  showLabel?: boolean;
}

const VARIANTS = {
  ecp3: {
    name: "ЭЦП 3.0",
    bgColor: "bg-[#0891b2]/15",
    borderColor: "border-[#0891b2]/40",
    textColor: "text-[#7dd3fc]",
    pinColor: "bg-[#0891b2]/60",
    hasNfc: true,
    price: "3 500",
  },
  ecp2: {
    name: "ЭЦП 2.0",
    bgColor: "bg-[#d4af37]/15",
    borderColor: "border-[#d4af37]/40",
    textColor: "text-[#fcd34d]",
    pinColor: "bg-[#d4af37]/60",
    hasNfc: false,
    price: "2 500",
  },
  lite: {
    name: "Lite",
    bgColor: "bg-[#6366f1]/15",
    borderColor: "border-[#6366f1]/40",
    textColor: "text-[#a5b4fc]",
    pinColor: "bg-[#6366f1]/60",
    hasNfc: false,
    price: "1 500",
  },
};

export function RutokenVisual({
  variant = "ecp3",
  className,
  showLabel = true,
}: RutokenVisualProps) {
  // Note: prefersReducedMotion can be used for future animation control
  useReducedMotion();
  const config = VARIANTS[variant];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* USB Token - flex layout без absolute */}
      <motion.div
        animate={{
          rotateY: [-10, 10, -10],
          rotateX: [5, -5, 5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        className="flex items-center"
      >
        {/* USB Connector - прозрачный стиль как у тела */}
        <div
          className={cn(
            "flex h-7 w-5 items-center justify-end rounded-l-sm border-y border-l",
            "bg-white/5",
            config.borderColor
          )}
        >
          <div className="flex h-4 w-2 flex-col justify-between py-0.5 pr-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={cn("h-0.5 w-full rounded-full", config.pinColor)} />
            ))}
          </div>
        </div>

        {/* Main body */}
        <div
          className={cn(
            "relative flex h-10 w-32 items-center justify-center rounded-r-xl border-y border-r",
            config.bgColor,
            config.borderColor
          )}
        >
          {/* Model name on body */}
          <div className="text-center">
            <div
              className={cn(
                "text-[8px] font-medium tracking-widest uppercase opacity-60",
                config.textColor
              )}
            >
              Рутокен
            </div>
            <div className={cn("text-xs font-bold tracking-wide", config.textColor)}>
              {config.name}
            </div>
          </div>

          {/* NFC indicator (for ECP 3.0) */}
          {config.hasNfc && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1/2 right-1.5 -translate-y-1/2"
            >
              <svg
                viewBox="0 0 24 24"
                className={cn("h-3 w-3", config.textColor)}
                fill="currentColor"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM8.21 16.58l-2.12-2.12c-.39-.39-.39-1.02 0-1.41l.71-.71c.39-.39 1.02-.39 1.41 0l.71.71 2.83-2.83c.39-.39 1.02-.39 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-4.24 4.24c-.39.39-1.03.39-1.42 0z" />
              </svg>
            </motion.div>
          )}

          {/* LED indicator */}
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-green-400"
          />
        </div>
      </motion.div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <p className="font-semibold text-[var(--color-text-primary)]">Рутокен {config.name}</p>
          <p className="text-lg font-bold whitespace-nowrap text-[var(--color-legal-primary)]">
            {config.price}&nbsp;₽
          </p>
          {config.hasNfc && (
            <span className="mt-1 inline-block rounded-full bg-[var(--color-tech-surface)] px-2 py-0.5 text-xs font-medium text-[var(--color-tech-primary)]">
              NFC
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function RutokenShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-card-bg)] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--color-tech-primary)]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="mb-10 text-center sm:mb-12">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
            Сертифицированные носители для ЭЦП
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Защита от копирования, совместимость со всеми госсервисами
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
          >
            <RutokenVisual variant="ecp3" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <RutokenVisual variant="ecp2" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <RutokenVisual variant="lite" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
