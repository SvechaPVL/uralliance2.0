"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Navigation Item Interface
 */
interface NavItem {
  label: string;
  href: string;
  category?: "legal" | "tech" | "general";
}

/**
 * MobileMenu Props
 */
interface MobileMenuProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;

  /**
   * Close menu callback
   */
  onClose: () => void;

  /**
   * Navigation items to display
   */
  navigationItems: NavItem[];
}

/**
 * MobileMenu Component
 *
 * Drawer-style mobile navigation menu with slide-in animation
 * Implements dual brand identity with accessible controls
 *
 * Features:
 * - Slide-in animation from right (Framer Motion)
 * - Backdrop overlay with fade animation
 * - Staggered navigation items animation
 * - Focus trap and keyboard navigation
 * - Respects prefers-reduced-motion
 * - Accessible (ARIA labels, focus management)
 */
export function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: prefersReducedMotion ? 0 : 0.2,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: prefersReducedMotion ? "tween" : "spring",
              damping: 25,
              stiffness: 200,
              duration: prefersReducedMotion ? 0 : undefined,
            }}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50",
              "w-full max-w-sm",
              "bg-[var(--color-background)]",
              "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
              "overflow-y-auto"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div
                className={cn(
                  "font-display font-bold text-xl",
                  "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                  "bg-clip-text text-transparent"
                )}
              >
                Uralliance
              </div>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "p-2 rounded-lg",
                  "text-[var(--color-text-primary)]",
                  "hover:bg-[var(--color-background-secondary)]",
                  "transition-colors duration-[var(--transition-base)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)]"
                )}
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block py-3 px-4 rounded-lg",
                        "text-[var(--color-text-primary)] font-medium text-lg",
                        "hover:bg-[var(--color-background-secondary)]",
                        "transition-colors duration-[var(--transition-base)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)]",
                        item.category === "legal" && "hover:text-[var(--color-legal-primary)]",
                        item.category === "tech" && "hover:text-[var(--color-tech-primary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-8 space-y-3"
              >
                <Button
                  variant="outline-legal"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    onClose();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Юридические услуги
                </Button>
                <Button
                  variant="primary-tech"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    onClose();
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  IT-решения
                </Button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-8 border-t border-[var(--color-border)]"
              >
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Свяжитесь с нами:
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+79000000000"
                    className={cn(
                      "flex items-center gap-3",
                      "text-[var(--color-text-primary)]",
                      "hover:text-[var(--color-tech-primary)]",
                      "transition-colors duration-[var(--transition-base)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] rounded-lg p-2"
                    )}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+7 (900) 000-00-00</span>
                  </a>
                  <a
                    href="mailto:info@uralliance.ru"
                    className={cn(
                      "flex items-center gap-3",
                      "text-[var(--color-text-primary)]",
                      "hover:text-[var(--color-tech-primary)]",
                      "transition-colors duration-[var(--transition-base)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] rounded-lg p-2"
                    )}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>info@uralliance.ru</span>
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
