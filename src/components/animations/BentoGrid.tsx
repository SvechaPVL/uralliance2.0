"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";

export type BentoGridItem = {
  /**
   * Unique key (falls back to index)
   */
  id?: string;
  /**
   * Optional label displayed at the top
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * CTA label
   */
  badge?: string;
  /**
   * Optional link for the card
   */
  href?: string;
  /**
   * Grid column span (desktop)
   */
  colSpan?: 1 | 2 | 3 | 4;
  /**
   * Grid row span (desktop)
   */
  rowSpan?: 1 | 2 | 3;
  /**
   * Custom class names
   */
  className?: string;
  /**
   * Custom content override
   */
  content?: React.ReactNode;
};

export interface BentoGridProps {
  items: BentoGridItem[];
  /**
   * Override base classes for the grid
   */
  className?: string;
  /**
   * Auto row height (default 220px)
   */
  rowHeight?: string;
}

const colSpanMap: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

const rowSpanMap: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function BentoGrid({ items, className, rowHeight = "minmax(220px, auto)" }: BentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12",
        "sm:grid-cols-2 lg:grid-cols-5",
        className
      )}
      style={{ gridAutoRows: rowHeight }}
    >
      {items.map((item, index) => {
        const cardContent = (
          <div className="relative flex flex-col gap-3">
            {item.icon && <div className="text-[var(--color-tech-primary)]">{item.icon}</div>}
            {item.badge && (
              <Label
                as="span"
                size="sm"
                spacing="wider"
                tone="muted"
                className="inline-flex w-fit items-center rounded-full border border-[var(--color-border-soft)] px-3 py-1"
              >
                {item.badge}
              </Label>
            )}
            {item.content ? (
              item.content
            ) : (
              <>
                {item.title && (
                  <Heading as="h3" size="md" weight="semibold">
                    {item.title}
                  </Heading>
                )}
                {item.description && (
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.description}</p>
                )}
              </>
            )}
          </div>
        );

        const cardClassName = cn(
          "group relative flex h-full flex-col justify-between rounded-3xl border border-[var(--color-border)]",
          "bg-[var(--color-card-bg)]/70 backdrop-blur-xl p-6 transition-all duration-500",
          "hover:-translate-y-0.5 hover:border-[var(--color-border-soft)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)]",
          item.className
        );

        return (
          <motion.div
            key={item.id ?? index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : index * 0.05,
            }}
            className={cn(colSpanMap[item.colSpan ?? 1], rowSpanMap[item.rowSpan ?? 1])}
          >
            {item.href ? (
              <Link href={item.href} className={cardClassName}>
                {cardContent}
                <div className="relative mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  Подробнее
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ) : (
              <div className={cardClassName}>{cardContent}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
