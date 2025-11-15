"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Navigation Item Interface
 */
interface NavItem {
  label: string;
  href: string;
  category?: "legal" | "tech" | "general";
}

/**
 * Navigation Menu Items
 */
const navigationItems: NavItem[] = [
  { label: "Главная", href: "/", category: "general" },
  { label: "Юридические услуги", href: "/services/legal", category: "legal" },
  { label: "IT-решения", href: "/services/tech", category: "tech" },
  { label: "Прайс", href: "/price", category: "general" },
  { label: "Кейсы", href: "/cases", category: "general" },
  { label: "Блог", href: "/blog", category: "general" },
  { label: "О компании", href: "/about", category: "general" },
  { label: "Контакты", href: "/contacts", category: "general" },
];

/**
 * Header Component
 *
 * Sticky navigation header with glassmorphism blur effect on scroll
 * Implements dual brand identity (Legal/Tech) with smooth transitions
 *
 * Features:
 * - Sticky positioning with scroll-triggered blur effect
 * - Desktop horizontal navigation
 * - Mobile hamburger menu trigger
 * - Legal/Tech CTA buttons
 * - Accessible keyboard navigation
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 20;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={cn(
        // Base styles
        "fixed top-0 right-0 left-0 z-50",
        "transition-all duration-[var(--transition-base)]",
        "select-none",
        // Scrolled state
        isScrolled
          ? cn(
              "bg-[var(--color-background)]/80 backdrop-blur-[var(--blur-lg)]",
              "shadow-[0_6px_20px_rgba(0,0,0,0.25)]",
              "border-b border-[var(--color-border)]"
            )
          : "bg-transparent"
      )}
    >
      <Container size="2xl">
        <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div
              className={cn(
                "font-display text-2xl font-bold",
                "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                "bg-clip-text text-transparent",
                "transition-all duration-[var(--transition-base)]",
                "group-hover:scale-105"
              )}
            >
              Uralliance
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-medium text-[var(--color-text-primary)]",
                  "transition-colors duration-[var(--transition-base)]",
                  "hover:text-[var(--color-legal-primary)]",
                  "rounded-sm px-2 py-1 focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] focus-visible:outline-none",
                  item.category === "legal" && "hover:text-[var(--color-legal-primary)]",
                  item.category === "tech" && "hover:text-[var(--color-tech-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline-legal"
              size="sm"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Legal
            </Button>
            <Button
              variant="primary-tech"
              size="sm"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Tech
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={cn(
              "lg:hidden",
              "rounded-lg p-2",
              "text-[var(--color-text-primary)]",
              "hover:bg-[var(--color-background-secondary)]",
              "transition-colors duration-[var(--transition-base)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-legal-primary)] focus-visible:outline-none"
            )}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                // X icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </header>
  );
}
