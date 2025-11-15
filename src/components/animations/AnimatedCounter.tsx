"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface AnimatedCounterProps {
  /**
   * Target value to animate towards
   */
  value: number;
  /**
   * Starting value (defaults to 0)
   */
  start?: number;
  /**
   * Duration of the animation in seconds
   * @default 1.2
   */
  duration?: number;
  /**
   * Number of decimal places to display
   * @default 0
   */
  decimals?: number;
  /**
   * Optional prefix (e.g., currency symbol)
   */
  prefix?: string;
  /**
   * Optional suffix (e.g., %)
   */
  suffix?: string;
  /**
   * Optional caption below the number
   */
  label?: string;
  /**
   * Custom wrapper class
   */
  className?: string;
  /**
   * Custom class for value text
   */
  valueClassName?: string;
  /**
   * Custom class for label text
   */
  labelClassName?: string;
}

/**
 * AnimatedCounter Component
 *
 * Counts from a starting value to a target value when the component enters the viewport.
 * Respects prefers-reduced-motion by skipping the animation.
 */
export function AnimatedCounter({
  value,
  start = 0,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  className,
  valueClassName,
  labelClassName,
}: AnimatedCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    const controls = animate(start, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, value, start, duration, prefersReducedMotion]);

  const formattedValue = useMemo(() => {
    const currentValue = prefersReducedMotion ? value : displayValue;
    return currentValue.toLocaleString("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [displayValue, decimals, prefersReducedMotion, value]);

  return (
    <div ref={ref} className={cn("flex flex-col items-start gap-2", className)}>
      <span
        className={cn(
          "text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl",
          valueClassName
        )}
        aria-live="polite"
      >
        {prefix && <span className="opacity-80">{prefix}</span>}
        {formattedValue}
        {suffix && <span className="ml-1 opacity-80">{suffix}</span>}
      </span>
      {label && (
        <span className={cn("text-sm uppercase tracking-widest text-[var(--color-text-muted)]", labelClassName)}>
          {label}
        </span>
      )}
    </div>
  );
}
