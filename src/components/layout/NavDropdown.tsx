"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";

interface DropdownItem {
  label: string;
  description: string;
  href: string;
  icon: string;
}

interface NavDropdownProps {
  label: string;
  href: string;
  icon?: string;
  items: DropdownItem[];
  category: "legal" | "tech";
  isActive?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
  layoutId?: string;
}

export function NavDropdown({
  label,
  href,
  icon,
  items,
  category,
  isActive,
  onHoverChange,
  layoutId,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isLegal = category === "legal";

  const handleMouseEnter = () => {
    setIsOpen(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onHoverChange?.(false);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Trigger button */}
      <Link
        href={href}
        className={cn(
          "relative flex cursor-pointer items-center justify-center gap-1.5 px-2 py-1.5 text-sm font-medium",
          "transition-colors duration-[var(--transition-base)]",
          "rounded-sm focus-visible:ring-2 focus-visible:outline-none",
          isLegal
            ? "text-[var(--color-text-primary)] hover:text-[var(--color-legal-primary)] focus-visible:ring-[var(--color-legal-primary)]"
            : "text-[var(--color-text-primary)] hover:text-[var(--color-tech-primary)] focus-visible:ring-[var(--color-tech-primary)]"
        )}
      >
        {icon && (
          <ServiceIcon
            name={icon}
            variant={category}
            className={cn(
              "h-4 w-4 transition-colors",
              isLegal ? "text-[var(--color-legal-primary)]" : "text-[var(--color-tech-primary)]"
            )}
          />
        )}
        <span>{label}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
        />

        {/* Hover background indicator */}
        {(isActive || isOpen) && layoutId && (
          <motion.div
            layoutId={layoutId}
            className={cn(
              "absolute inset-0 rounded-full",
              isLegal ? "bg-[var(--color-legal-primary)]/10" : "bg-[var(--color-tech-primary)]/10"
            )}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "min-w-[320px] rounded-2xl border p-4",
                "bg-[var(--color-background-secondary)]/95 backdrop-blur-xl",
                "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                isLegal
                  ? "border-[var(--color-legal-primary)]/20"
                  : "border-[var(--color-tech-primary)]/20"
              )}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between border-b border-[var(--color-border)]/50 pb-3">
                <span
                  className={cn(
                    "text-xs font-medium tracking-wider uppercase",
                    isLegal
                      ? "text-[var(--color-legal-primary)]"
                      : "text-[var(--color-tech-primary)]"
                  )}
                >
                  {isLegal ? "Юридические услуги" : "IT-решения"}
                </span>
                <Link
                  href={href}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isLegal
                      ? "text-[var(--color-text-secondary)] hover:text-[var(--color-legal-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-tech-primary)]"
                  )}
                >
                  Все услуги →
                </Link>
              </div>

              {/* Items grid */}
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200",
                        isLegal
                          ? "hover:bg-[var(--color-legal-surface)]/70"
                          : "hover:bg-[var(--color-tech-surface)]/70"
                      )}
                    >
                      {/* Icon */}
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200",
                          isLegal
                            ? "border-[var(--color-legal-border-soft)] bg-[var(--color-legal-surface)]/50 text-[var(--color-legal-primary)] group-hover:bg-[var(--color-legal-primary)] group-hover:text-white"
                            : "border-[var(--color-tech-border-soft)] bg-[var(--color-tech-surface)]/50 text-[var(--color-tech-primary)] group-hover:bg-[var(--color-tech-primary)] group-hover:text-white"
                        )}
                      >
                        <ServiceIcon name={item.icon} variant={category} className="h-4 w-4" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)]">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
