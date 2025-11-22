"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/primitives/heading";

/**
 * Timeline Props
 */
export interface TimelineProps {
  steps: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

/**
 * Timeline Component
 *
 * Animated timeline with step-by-step reveal on scroll
 * Uses Framer Motion for scroll-triggered animations
 *
 * @component
 * @example
 * ```tsx
 * <Timeline
 *   steps={[
 *     { title: "Анализ", description: "Изучаем ваш бизнес" },
 *     { title: "Прототип", description: "Создаем концепцию" }
 *   ]}
 * />
 * ```
 */
export function Timeline({ steps, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate progress line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={cn("relative py-12", className)}>
      {/* Background line */}
      <div className="absolute left-8 top-0 w-px h-full bg-neutral-200 dark:bg-neutral-800" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-8 top-0 w-px bg-gradient-to-b from-legal-500 via-tech-500 to-legal-500"
        style={{ height: lineHeight }}
      />

      {/* Steps */}
      <div className="relative space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative flex items-start gap-6"
          >
            {/* Step number/icon */}
            <div className="relative z-10 flex-shrink-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-lg">
                {step.icon ? (
                  <div className="text-2xl">{step.icon}</div>
                ) : (
                  <span className="text-xl font-bold bg-gradient-to-br from-legal-500 to-tech-500 bg-clip-text text-transparent">
                    {index + 1}
                  </span>
                )}
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 pt-2">
              <Heading as="h3" size="md" weight="bold" className="mb-2">{step.title}</Heading>
              <p className="text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
