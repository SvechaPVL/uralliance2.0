"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBreadcrumbItems } from "@/lib/breadcrumbs";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  /** Explicit items (if not provided, auto-detects from path) */
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Navigation Component
 *
 * Can work in two modes:
 * 1. Explicit items - pass items prop
 * 2. Auto-detect - uses current path to look up in BREADCRUMB_MAP
 *
 * @example
 * ```tsx
 * // Auto-detect from URL
 * <Breadcrumb />
 *
 * // Explicit items
 * <Breadcrumb
 *   items={[
 *     { label: "Юридические услуги", href: "/services/legal" },
 *     { label: "Ликвидация ООО" }
 *   ]}
 * />
 * ```
 */
export function Breadcrumb({ items: explicitItems, className }: BreadcrumbProps) {
  const pathname = usePathname();
  const items = explicitItems ?? getBreadcrumbItems(pathname);

  // Don't render if no items
  if (!items.length) {
    return null;
  }

  return (
    <nav
      aria-label="Навигация"
      className={cn(
        "flex items-center gap-2 text-sm text-[var(--color-text-secondary)]",
        className
      )}
    >
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-[var(--color-text-primary)]"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Главная</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-[var(--color-text-primary)]">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--color-text-primary)]"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
