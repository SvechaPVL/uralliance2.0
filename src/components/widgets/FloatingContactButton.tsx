"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { contacts, getWhatsAppLink, getTelegramLink } from "@/lib/contacts";
import { reachGoal } from "@/lib/analytics";
import { Phone, MessageCircle, Send, X, FileText, Shield, Monitor } from "lucide-react";

// Телефоны с категориями
const PHONE_OPTIONS = [
  {
    label: "Вестник | Федресурс",
    phone: contacts.phone.main,
    icon: FileText,
    color: "#7c3aed", // violet
  },
  {
    label: "ЭЦП | Юр. консультация",
    phone: contacts.phone.legal,
    icon: Shield,
    color: "#0891b2", // cyan
  },
  {
    label: "ЭЦП | IT-консультация",
    phone: contacts.phone.tech,
    icon: Monitor,
    color: "#059669", // emerald
  },
];

/**
 * Floating Action Button for Quick Contact
 *
 * Shows a circular button that expands UPWARD to reveal
 * phone options by category, WhatsApp, and Telegram contact options.
 */
export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handlePhoneClick = useCallback((label: string) => {
    reachGoal("phone_click", { location: "fab", category: label });
    setIsOpen(false);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    reachGoal("whatsapp_click", { location: "fab" });
    setIsOpen(false);
  }, []);

  const handleTelegramClick = useCallback(() => {
    reachGoal("telegram_click", { location: "fab" });
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Backdrop - close on click outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* FAB Container - fixed at bottom right */}
      <div className="fixed right-6 bottom-6 z-50">
        {/* Contact options - expand UPWARD from main button */}
        <div
          className={cn(
            "absolute bottom-16 left-1/2 -translate-x-1/2",
            "flex flex-col items-center gap-2",
            "transition-all duration-300",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {/* Telegram - top */}
          <a
            href={getTelegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full px-4",
              "border border-[#0088cc]/40 bg-[#0088cc]/15 text-[#0088cc]",
              "shadow-lg backdrop-blur-sm transition-all duration-300",
              "hover:scale-105 hover:border-[#0088cc]/60 hover:bg-[#0088cc]/25",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
            aria-label="Написать в Telegram"
          >
            <Send className="h-4 w-4" />
            <span className="text-sm font-medium whitespace-nowrap">Telegram</span>
          </a>

          {/* WhatsApp */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full px-4",
              "border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366]",
              "shadow-lg backdrop-blur-sm transition-all duration-300",
              "hover:scale-105 hover:border-[#25D366]/60 hover:bg-[#25D366]/25",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
          </a>

          {/* Phone options with categories */}
          {PHONE_OPTIONS.map((option, index) => {
            const Icon = option.icon;
            return (
              <a
                key={option.label}
                href={option.phone.link}
                onClick={() => handlePhoneClick(option.label)}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-full px-4",
                  "shadow-lg backdrop-blur-sm transition-all duration-300",
                  "hover:scale-105",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${50 - index * 25}ms` : "0ms",
                  borderColor: `${option.color}66`,
                  backgroundColor: `${option.color}26`,
                  color: option.color,
                }}
                aria-label={`Позвонить: ${option.label}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
              </a>
            );
          })}
        </div>

        {/* Main FAB button */}
        <button
          onClick={toggle}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full",
            "border border-[var(--color-legal-primary)]/40 bg-[var(--color-legal-primary)]/15",
            "text-[var(--color-legal-primary)] backdrop-blur-sm",
            "shadow-lg transition-all duration-300",
            "hover:scale-105 hover:border-[var(--color-legal-primary)]/60 hover:bg-[var(--color-legal-primary)]/25",
            "focus:ring-2 focus:ring-[var(--color-legal-primary)]/50 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:outline-none"
          )}
          aria-label={isOpen ? "Закрыть контакты" : "Связаться с нами"}
          aria-expanded={isOpen}
        >
          {/* Pulse animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 animate-ping rounded-full border border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-primary)]/10" />
          )}

          {/* Icon */}
          <span
            className={cn(
              "relative transition-transform duration-300",
              isOpen ? "rotate-45" : "rotate-0"
            )}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
          </span>
        </button>
      </div>
    </>
  );
}
