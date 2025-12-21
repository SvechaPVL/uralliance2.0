"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { FileX, CheckCircle2, Shield, Clock } from "lucide-react";

interface LiquidationShowcaseProps {
  className?: string;
}

/**
 * Animated document with "LIQUIDATED" stamp for liquidation page
 * Visual representation of the liquidation process completion
 */
export function LiquidationShowcase({ className }: LiquidationShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Main document */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotateY: [-3, 3, -3],
                rotateX: [2, -2, 2],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Document body */}
        <div className="relative h-[340px] w-[260px] overflow-hidden rounded-lg border border-[var(--color-legal-primary)]/30 bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:from-gray-800 dark:to-gray-900">
          {/* Document header */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-[var(--color-legal-surface)] to-[var(--color-card-bg)] px-5 py-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10">
                <FileX className="h-4 w-4 text-[var(--color-legal-primary)]" />
              </div>
              <div>
                <div className="text-[10px] font-semibold tracking-wide text-[var(--color-text-primary)] uppercase">
                  Выписка ЕГРЮЛ
                </div>
                <div className="text-[8px] text-[var(--color-text-secondary)]">
                  Лист записи об исключении
                </div>
              </div>
            </div>
          </div>

          {/* Document content - fake text lines */}
          <div className="space-y-3 px-5 py-4">
            {/* Company name */}
            <div className="space-y-1">
              <div className="h-1.5 w-16 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="h-2.5 w-36 rounded-full bg-gray-400 dark:bg-gray-500" />
            </div>

            {/* OGRN */}
            <div className="space-y-1">
              <div className="h-1.5 w-10 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="h-2 w-28 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* INN */}
            <div className="space-y-1">
              <div className="h-1.5 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="h-2 w-24 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Status section with highlight */}
            <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Статус: Прекращено
                </span>
              </div>
              <div className="mt-1 text-[8px] text-emerald-600/80 dark:text-emerald-400/80">
                Исключено из ЕГРЮЛ
              </div>
            </div>

            {/* More fake lines */}
            <div className="space-y-1.5 pt-2">
              <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-1.5 w-5/6 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-1.5 w-4/6 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Stamp overlay */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, rotate: -12 }
                : { opacity: 0, scale: 1.5, rotate: 0 }
            }
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-lg border-4 border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10 px-4 py-2 backdrop-blur-sm">
              <div className="text-center text-lg font-black tracking-[0.15em] text-[var(--color-legal-primary)] uppercase">
                Ликвидировано
              </div>
              <div className="mt-0.5 text-center text-[8px] font-semibold text-[var(--color-legal-primary)]/80">
                ИФНС России
              </div>
            </div>
          </motion.div>

          {/* Document footer with date */}
          <div className="absolute right-0 bottom-0 left-0 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-[8px] text-gray-500 dark:text-gray-400">
                Дата: {new Date().toLocaleDateString("ru-RU")}
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-legal-primary)]/10">
                <Shield className="h-3 w-3 text-[var(--color-legal-primary)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating timeline badge */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [-4, 4, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full border border-[var(--color-legal-primary)] bg-[var(--color-background-primary)] px-3 py-1.5 shadow-lg"
        >
          <Clock className="h-3.5 w-3.5 text-[var(--color-legal-primary)]" />
          <span className="text-xs font-semibold text-[var(--color-legal-primary)]">3-4 мес.</span>
        </motion.div>

        {/* Floating checkmark badge */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [4, -4, 4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-3 -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
        >
          <CheckCircle2 className="h-6 w-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Simplified timeline visualization for liquidation process
 */
export function LiquidationTimeline() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    { label: "Решение", icon: "📋" },
    { label: "Публикации", icon: "📰" },
    { label: "Расчёты", icon: "💰" },
    { label: "Исключение", icon: "✅" },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <motion.div
          key={step.label}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-legal-primary)] bg-[var(--color-legal-primary)]/10 text-lg">
              {step.icon}
            </div>
            <span className="mt-1 text-[10px] font-medium text-[var(--color-text-secondary)]">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="mb-4 h-0.5 w-6 bg-[var(--color-legal-primary)]/30" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
