"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { Newspaper, ShieldCheck } from "lucide-react";
import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { Label } from "@/components/primitives/label";

interface VestnikVisualProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * 3D animated magazine/journal visual for Vestnik page
 * Inspired by RutokenVisual component style
 */
export function VestnikVisual({ className, showLabel = true }: VestnikVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Magazine - 3D animated - INCREASED SIZE */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotateY: [-8, 8, -8],
                rotateX: [3, -3, 3],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Magazine body - MUCH BIGGER */}
        <div className="relative h-80 w-56 overflow-hidden rounded-xl border border-[var(--color-legal-primary)]/30 bg-gradient-to-br from-white to-gray-100 shadow-2xl dark:from-gray-800 dark:to-gray-900">
          {/* Spine shadow */}
          <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-r from-black/10 to-transparent" />

          {/* Header band */}
          <div className="absolute top-0 right-0 left-0 h-14 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
            <div className="flex h-full items-center justify-center">
              <span className="text-[10px] font-bold tracking-wider text-white uppercase">
                Вестник госрегистрации
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="absolute top-16 right-4 left-4 space-y-3">
            {/* Issue number */}
            <div className="text-center">
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                Выпуск №1 (1024)
              </span>
            </div>

            {/* Decorative lines representing text */}
            <div className="space-y-2">
              <div className="mx-auto h-2 w-32 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="mx-auto h-2 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="mx-auto h-2 w-30 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Central icon */}
            <div className="flex justify-center py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-legal-primary)]/10">
                <Newspaper className="h-8 w-8 text-[var(--color-legal-primary)]" />
              </div>
            </div>

            {/* More decorative lines */}
            <div className="space-y-1.5">
              <div className="mx-auto h-1.5 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="mx-auto h-1.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="mx-auto h-1.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Footer with date */}
          <div className="absolute right-0 bottom-0 left-0 h-9 border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-full items-center justify-center">
              <span className="text-[10px] text-gray-500 dark:text-gray-400">Январь 2025</span>
            </div>
          </div>

          {/* Page edges effect */}
          <div className="absolute top-2 right-0 h-76 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600" />
        </div>

        {/* Floating badge - BIGGER */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-legal-primary)] shadow-xl"
        >
          <ShieldCheck className="h-7 w-7 text-white" />
        </motion.div>
      </motion.div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <p className="font-semibold text-[var(--color-text-primary)]">Официальное издание</p>
          <p className="text-sm text-[var(--color-text-secondary)]">для юридических лиц</p>
        </div>
      )}
    </div>
  );
}

/**
 * Full showcase component with contact info and quick form for Vestnik page hero
 */
export function VestnikShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-card-bg)] px-6 py-8 sm:px-8 sm:py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[var(--color-legal-primary)]/10 blur-3xl" />
      </div>

      <div className="relative space-y-6">
        {/* Magazine Visual */}
        <div className="flex justify-center">
          <VestnikVisual showLabel={false} />
        </div>

        {/* Quick Contact Form */}
        <div className="border-t border-[var(--color-border)]/30 pt-5">
          <Label
            size="sm"
            spacing="wider"
            tone="muted"
            className="mb-3 block text-center uppercase"
          >
            Быстрая заявка
          </Label>
          <QuickContactForm variant="legal" serviceName="Публикация в Вестнике" />
        </div>
      </div>
    </div>
  );
}
