"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { ServiceIcon } from "@/components/primitives/ServiceIcon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";
import navigationConfig from "@/content/navigation.json";
import contactsConfig from "@/content/contacts.json";

/**
 * Dropdown Item Interface
 */
interface DropdownItem {
  label: string;
  description: string;
  href: string;
  icon: string;
}

/**
 * Navigation Item Interface
 */
interface NavItem {
  label: string;
  href: string;
  category?: "legal" | "tech" | "general";
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
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
  const scrollRef = useRef(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (href: string) => {
    setOpenAccordion((prev) => (prev === href ? null : href));
  };

  // Lock body scroll when menu is open (preserve scroll position)
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isOpen) {
      scrollRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else if (document.body.style.position === "fixed") {
      const offset = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (offset) {
        window.scrollTo(0, -parseInt(offset, 10) || 0);
      }
    }

    return () => {
      if (document.body.style.position === "fixed") {
        const offset = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        if (offset) {
          window.scrollTo(0, -parseInt(offset, 10) || 0);
        }
      }
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
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
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
              "fixed top-0 right-0 bottom-0 z-[70]",
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
            <div className="flex items-center justify-between border-b border-[var(--color-border)] p-6">
              <div
                className={cn(
                  "font-display text-xl font-bold",
                  "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                  "bg-clip-text text-transparent"
                )}
              >
                {contactsConfig.company}
              </div>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "rounded-lg p-2",
                  "text-[var(--color-text-primary)]",
                  "hover:bg-[var(--color-background-secondary)]",
                  "transition-colors duration-[var(--transition-base)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] focus-visible:outline-none"
                )}
                aria-label="Close mobile menu"
              >
                <svg
                  className="h-6 w-6"
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
                    {item.hasDropdown && item.dropdownItems ? (
                      <div>
                        {/* Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleAccordion(item.href)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-4 py-3",
                            "text-lg font-medium text-[var(--color-text-primary)]",
                            "hover:bg-[var(--color-background-secondary)]",
                            "transition-colors duration-[var(--transition-base)]",
                            "focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] focus-visible:outline-none",
                            item.category === "legal" && "hover:text-[var(--color-legal-primary)]",
                            item.category === "tech" && "hover:text-[var(--color-tech-primary)]"
                          )}
                          aria-expanded={openAccordion === item.href}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              openAccordion === item.href && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Accordion Content */}
                        <AnimatePresence>
                          {openAccordion === item.href && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-1 space-y-1 pl-4">
                                {/* Link to main category page */}
                                <li>
                                  <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                                      "text-sm font-medium",
                                      "transition-colors duration-[var(--transition-base)]",
                                      item.category === "legal"
                                        ? "text-[var(--color-legal-primary)] hover:bg-[var(--color-legal-surface)]/50"
                                        : "text-[var(--color-tech-primary)] hover:bg-[var(--color-tech-surface)]/50"
                                    )}
                                  >
                                    Все{" "}
                                    {item.category === "legal"
                                      ? "юридические услуги"
                                      : "IT-решения"}{" "}
                                    →
                                  </Link>
                                </li>
                                {item.dropdownItems.map((subItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      onClick={onClose}
                                      className={cn(
                                        "flex items-start gap-3 rounded-lg px-3 py-2.5",
                                        "hover:bg-[var(--color-background-secondary)]",
                                        "transition-colors duration-[var(--transition-base)]"
                                      )}
                                    >
                                      <div
                                        className={cn(
                                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                          item.category === "legal"
                                            ? "bg-[var(--color-legal-surface)]/70 text-[var(--color-legal-primary)]"
                                            : "bg-[var(--color-tech-surface)]/70 text-[var(--color-tech-primary)]"
                                        )}
                                      >
                                        <ServiceIcon
                                          name={subItem.icon}
                                          variant={item.category as "legal" | "tech"}
                                          className="h-4 w-4"
                                        />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                                          {subItem.label}
                                        </p>
                                        <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-lg px-4 py-3",
                          "text-lg font-medium text-[var(--color-text-primary)]",
                          "hover:bg-[var(--color-background-secondary)]",
                          "transition-colors duration-[var(--transition-base)]",
                          "focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] focus-visible:outline-none",
                          item.category === "legal" && "hover:text-[var(--color-legal-primary)]",
                          item.category === "tech" && "hover:text-[var(--color-tech-primary)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="mt-8 space-y-3">
                {navigationConfig.mobile.ctaButtons.map((button) => (
                  <Button
                    key={button.label}
                    variant={button.variant as "primary-legal" | "primary-tech"}
                    size="lg"
                    fullWidth
                    asChild
                  >
                    <Link href={button.href} onClick={onClose}>
                      {button.label}
                    </Link>
                  </Button>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={itemVariants}
                className="mt-8 border-t border-[var(--color-border)] pt-8"
              >
                <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                  {navigationConfig.mobile.contactHint}
                </p>
                <div className="space-y-3">
                  <a
                    href={contactsConfig.phone.link}
                    onClick={() => trackPhoneClick(contactsConfig.phone.display)}
                    className={cn(
                      "flex items-center gap-3",
                      "text-[var(--color-text-primary)]",
                      "hover:text-[var(--color-tech-primary)]",
                      "transition-colors duration-[var(--transition-base)]",
                      "rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] focus-visible:outline-none"
                    )}
                  >
                    <svg
                      className="h-5 w-5"
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
                    <span>{contactsConfig.phone.display}</span>
                  </a>
                  <a
                    href={contactsConfig.email.link}
                    onClick={() => trackEmailClick(contactsConfig.email.display)}
                    className={cn(
                      "flex items-center gap-3",
                      "text-[var(--color-text-primary)]",
                      "hover:text-[var(--color-tech-primary)]",
                      "transition-colors duration-[var(--transition-base)]",
                      "rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-[var(--color-tech-primary)] focus-visible:outline-none"
                    )}
                  >
                    <svg
                      className="h-5 w-5"
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
                    <span>{contactsConfig.email.display}</span>
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
