"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="animate-in slide-in-from-bottom fixed right-0 bottom-0 left-0 z-[100] p-3 duration-300 sm:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-[0_25px_70px_-35px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:rounded-2xl sm:p-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            {/* Icon - скрыт на мобилках */}
            <div className="hidden flex-shrink-0 sm:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-tech-surface)]">
                <svg
                  className="h-6 w-6 text-[var(--color-tech-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3
                id="cookie-consent-title"
                className="mb-1 text-base font-semibold text-[var(--color-text-primary)] sm:mb-2 sm:text-lg"
              >
                Мы используем cookies
              </h3>
              <p
                id="cookie-consent-description"
                className="text-xs leading-relaxed text-[var(--color-text-secondary)] sm:text-sm"
              >
                Для улучшения работы сайта. Подробнее в{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--color-tech-primary)] underline transition-colors hover:text-[var(--color-tech-dark)]"
                >
                  Политике конфиденциальности
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-row gap-2 sm:w-auto sm:gap-3">
              <button
                onClick={declineCookies}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)] sm:flex-none sm:px-6 sm:py-2.5 sm:text-sm"
                aria-label="Отклонить cookies"
              >
                Отклонить
              </button>
              <button
                onClick={acceptCookies}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-[var(--color-tech-primary)] px-4 py-2 text-xs font-semibold text-[#03121d] transition-all duration-200 hover:bg-[var(--color-tech-dark)] active:scale-95 sm:flex-none sm:px-6 sm:py-2.5 sm:text-sm"
                aria-label="Принять cookies"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
