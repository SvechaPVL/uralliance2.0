"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { useHeroProgress } from "@/context/HeroProgressContext";
import navigationConfig from "@/content/navigation.json";

/**
 * Navigation Item Interface
 */
interface DropdownItem {
  label: string;
  description: string;
  href: string;
  icon: string;
}

interface NavItem {
  label: string;
  href: string;
  icon?: string;
  category?: "legal" | "tech" | "general";
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

/**
 * Navigation Menu Items - loaded from config
 */
const navigationItems: NavItem[] = navigationConfig.header.items as NavItem[];

/**
 * Header Component (Optimized)
 *
 * Uses direct DOM manipulation for scroll-based styles to avoid
 * React re-renders on every scroll frame.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Check for client-side rendering (for portal)
  const mounted = typeof document !== "undefined";

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { subscribe, progressRef } = useHeroProgress();

  // Handle scroll effect - only updates isScrolled state (for class changes)
  useEffect(() => {
    let lastScrolled = false;

    const handleScroll = () => {
      const scrollThreshold = 20;
      const nowScrolled = window.scrollY > scrollThreshold;

      // Only update React state if changed (rare)
      if (nowScrolled !== lastScrolled) {
        lastScrolled = nowScrolled;
        setIsScrolled(nowScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Subscribe to hero progress and update styles via DOM (no React re-render)
  useEffect(() => {
    const updateStyles = (progress: number) => {
      const blended = Math.min(Math.max(progress, 0), 1);
      const shouldShowGlass = isScrolled || blended > 0.08;

      if (headerRef.current) {
        if (shouldShowGlass) {
          const goldStop = 0.1 + blended * 0.2;
          const cyanStop = 0.1 + blended * 0.25;
          const backdropAlpha = 0.55 + blended * 0.25;

          headerRef.current.style.backgroundImage = `linear-gradient(120deg, rgba(212,175,55,${goldStop}) 4%, rgba(6,182,212,${cyanStop}) 96%)`;
          headerRef.current.style.backgroundColor = `rgba(7,10,20,${backdropAlpha})`;
          headerRef.current.style.borderColor = `rgba(255,255,255,${0.05 + blended * 0.12})`;
        } else {
          headerRef.current.style.backgroundImage = "";
          headerRef.current.style.backgroundColor = "";
          headerRef.current.style.borderColor = "";
        }
      }

      if (logoRef.current) {
        logoRef.current.style.transform = `scale(${1 + blended * 0.05})`;
        logoRef.current.style.letterSpacing = `${0.02 + blended * 0.06}em`;

        if (blended > 0.4) {
          logoRef.current.style.filter = "drop-shadow(0 0 22px rgba(6,182,212,0.45))";
        } else {
          logoRef.current.style.filter = "";
        }
      }
    };

    // Initial update
    updateStyles(progressRef.current);

    // Subscribe to progress changes
    return subscribe(updateStyles);
  }, [subscribe, progressRef, isScrolled]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Initial render uses isScrolled only; subscription handles progress-based glass effect
  const shouldShowGlass = isScrolled;

  return (
    <>
      <header
        ref={headerRef}
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
      >
        <Container size="2xl">
          <nav className="flex h-20 items-center justify-between" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href={navigationConfig.header.logo.href}
              className="group relative flex items-center gap-2"
            >
              <div
                ref={logoRef}
                className={cn(
                  "font-display text-2xl font-bold",
                  "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
                  "bg-clip-text text-transparent",
                  "transition-all duration-[var(--transition-base)]",
                  "group-hover:scale-105"
                )}
              >
                {navigationConfig.header.logo.text}
              </div>
              {/* Santa Hat SVG - New Year decoration */}
              <svg
                className="absolute -top-2 -left-0.5 h-4 w-5 -rotate-[3deg] drop-shadow-sm"
                viewBox="0 0 32 24"
                fill="none"
                aria-hidden="true"
              >
                {/* Hat base (red) */}
                <path
                  d="M4 20 C4 14, 10 8, 20 8 C26 8, 30 12, 30 16 L30 20 C30 22, 28 24, 26 24 L6 24 C4 24, 4 22, 4 20Z"
                  fill="#c41e3a"
                />
                {/* Hat top curve */}
                <path
                  d="M20 8 C20 4, 24 2, 28 4"
                  stroke="#c41e3a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* White fur trim */}
                <rect x="2" y="20" width="30" height="4" rx="2" fill="#fff" />
                {/* Pompom */}
                <circle cx="29" cy="4" r="3" fill="#fff" />
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 lg:flex">
              {navigationItems.map((item) =>
                item.hasDropdown && item.dropdownItems ? (
                  <NavDropdown
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    items={item.dropdownItems}
                    category={item.category as "legal" | "tech"}
                    layoutId="nav-hover"
                  />
                ) : (
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
                )
              )}
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
