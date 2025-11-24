"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useHeroProgress } from "@/context/HeroProgressContext";
import navigationConfig from "@/content/navigation.json";

/**
 * Navigation Item Interface
 */
interface NavItem {
  label: string;
  href: string;
  category?: "legal" | "tech" | "general";
}

/**
 * Navigation Menu Items - loaded from config
 */
const navigationItems: NavItem[] = navigationConfig.header.items as NavItem[];

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
  const [mounted, setMounted] = useState(false);
  const { progress: heroProgress } = useHeroProgress();
  const blendedProgress = Math.min(Math.max(heroProgress, 0), 1);
  const shouldShowGlass = isScrolled || blendedProgress > 0.08;

  // Ensure component is mounted (for portal)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const headerDynamicStyle = useMemo(() => {
    if (!shouldShowGlass) return undefined;
    const goldStop = 0.1 + blendedProgress * 0.2;
    const cyanStop = 0.1 + blendedProgress * 0.25;
    const backdropAlpha = 0.55 + blendedProgress * 0.25;
    return {
      backgroundImage: `linear-gradient(120deg, rgba(212,175,55,${goldStop}) 4%, rgba(6,182,212,${cyanStop}) 96%)`,
      backgroundColor: `rgba(7,10,20,${backdropAlpha})`,
      borderColor: `rgba(255,255,255,${0.05 + blendedProgress * 0.12})`,
    };
  }, [blendedProgress, shouldShowGlass]);

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
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50",
          "transition-all duration-[var(--transition-base)]",
          "border-b select-none",
          shouldShowGlass
            ? cn(
                "shadow-[0_6px_24px_rgba(0,0,0,0.4)] backdrop-blur-[var(--blur-lg)]",
                "border-[var(--color-border)]/30"
              )
            : "border-transparent bg-transparent"
        )}
        style={headerDynamicStyle}
        data-hero-progress={blendedProgress.toFixed(2)}
      >
        <Container size="2xl">
          <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href={navigationConfig.header.logo.href}
              className="group flex items-center gap-2"
            >
              <div
                className={cn(
                  "font-display text-2xl font-bold",
                  "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                  "bg-clip-text text-transparent",
                  "transition-all duration-[var(--transition-base)]",
                  "group-hover:scale-105",
                  blendedProgress > 0.4 && "drop-shadow-[0_0_22px_rgba(6,182,212,0.45)]"
                )}
                style={{
                  transform: `scale(${1 + blendedProgress * 0.05})`,
                  letterSpacing: `${0.02 + blendedProgress * 0.06}em`,
                }}
              >
                {navigationConfig.header.logo.text}
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
              {navigationConfig.header.ctaButtons.map((button) => (
                <Button
                  key={button.label}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  variant={button.variant as any}
                  size="sm"
                  asChild
                >
                  <Link href={button.href}>{button.label}</Link>
                </Button>
              ))}
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
      </header>

      {/* Mobile Menu - rendered via portal to avoid z-index stacking issues */}
      {mounted &&
        createPortal(
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            navigationItems={navigationItems}
          />,
          document.body
        )}
    </>
  );
}
