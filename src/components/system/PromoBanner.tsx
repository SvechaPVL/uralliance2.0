"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface PromoBannerProps {
  /** Unique ID for localStorage persistence */
  id: string;
  /** Main promo message */
  message: string;
  /** Optional link */
  link?: {
    href: string;
    label: string;
  };
  /** Optional badge text */
  badge?: string;
  /** Variant: legal (gold) or tech (cyan) */
  variant?: "legal" | "tech";
  /** Auto-hide after X days (0 = never re-show) */
  hideForDays?: number;
}

// CSS custom property name for banner height
const BANNER_HEIGHT_VAR = "--promo-banner-height";

export function PromoBanner({
  id,
  message,
  link,
  badge,
  variant = "legal",
  hideForDays = 7,
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const storageKey = `promo-banner-${id}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const { dismissedAt } = JSON.parse(stored);
      const daysSinceDismissed = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      // Show again if hideForDays passed (0 means never re-show)
      if (hideForDays > 0 && daysSinceDismissed >= hideForDays) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
      }
    } else {
      // Never dismissed - show with small delay
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [storageKey, hideForDays]);

  // Update CSS variable when visibility changes
  useEffect(() => {
    if (isVisible && bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, `${height}px`);
    } else {
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, "0px");
    }

    return () => {
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, "0px");
    };
  }, [isVisible]);

  const dismiss = () => {
    localStorage.setItem(storageKey, JSON.stringify({ dismissedAt: Date.now() }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const bgColor =
    variant === "legal"
      ? "bg-gradient-to-r from-[var(--color-legal-surface)] to-[var(--color-legal-surface)]/80"
      : "bg-gradient-to-r from-[var(--color-tech-surface)] to-[var(--color-tech-surface)]/80";

  const accentColor =
    variant === "legal" ? "text-[var(--color-legal-primary)]" : "text-[var(--color-tech-primary)]";

  const borderColor =
    variant === "legal"
      ? "border-[var(--color-legal-primary)]/30"
      : "border-[var(--color-tech-primary)]/30";

  return (
    <div
      ref={bannerRef}
      className="promo-banner animate-in slide-in-from-top fixed top-20 right-0 left-0 z-[45] duration-500 print:hidden"
      role="banner"
      aria-label="Промо-акция"
    >
      <div className={`${bgColor} border-b ${borderColor} shadow-lg`}>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 sm:gap-4 sm:py-2.5">
          {/* Badge */}
          {badge && (
            <span
              className={`hidden rounded-full ${variant === "legal" ? "bg-[var(--color-legal-primary)]" : "bg-[var(--color-tech-primary)]"} px-2.5 py-0.5 text-xs font-semibold text-[#03121d] sm:inline-flex`}
            >
              {badge}
            </span>
          )}

          {/* Message */}
          <p className="text-center text-sm font-medium text-[var(--color-text-primary)] sm:text-base">
            {message}
            {link && (
              <>
                {" "}
                <Link
                  href={link.href}
                  className={`${accentColor} underline underline-offset-2 transition-colors hover:opacity-80`}
                >
                  {link.label}
                </Link>
              </>
            )}
          </p>

          {/* Close button */}
          <button
            onClick={dismiss}
            className="ml-2 flex-shrink-0 rounded-full p-1 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]"
            aria-label="Закрыть баннер"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
