"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { contacts, getWhatsAppLink, getTelegramLink } from "@/lib/contacts";
import { reachGoal } from "@/lib/analytics";
import { Phone, MessageCircle, Send, X } from "lucide-react";

/**
 * Floating Action Button for Quick Contact
 *
 * Shows a circular button that expands UPWARD to reveal
 * phone, WhatsApp, and Telegram contact options.
 */
export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handlePhoneClick = useCallback(() => {
    reachGoal("phone_click", { location: "fab" });
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
            "flex flex-col items-center gap-3",
            "transition-all duration-300",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {/* Telegram - top (appears last) */}
          <a
            href={getTelegramLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              "border border-[#0088cc]/40 bg-[#0088cc]/15 text-[#0088cc]",
              "shadow-lg backdrop-blur-sm transition-all duration-300",
              "hover:scale-110 hover:border-[#0088cc]/60 hover:bg-[#0088cc]/25",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
            aria-label="Написать в Telegram"
          >
            <Send className="h-5 w-5" />
          </a>

          {/* WhatsApp - middle */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              "border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366]",
              "shadow-lg backdrop-blur-sm transition-all duration-300",
              "hover:scale-110 hover:border-[#25D366]/60 hover:bg-[#25D366]/25",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "50ms" : "0ms" }}
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          {/* Phone - bottom (appears first) */}
          <a
            href={contacts.phone.main.link}
            onClick={handlePhoneClick}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              "border border-[#22c55e]/40 bg-[#22c55e]/15 text-[#22c55e]",
              "shadow-lg backdrop-blur-sm transition-all duration-300",
              "hover:scale-110 hover:border-[#22c55e]/60 hover:bg-[#22c55e]/25",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "0ms" : "0ms" }}
            aria-label="Позвонить"
          >
            <Phone className="h-5 w-5" />
          </a>
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
            "focus:ring-2 focus:ring-[var(--color-legal-primary)]/50 focus:ring-offset-2 focus:outline-none"
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
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </span>
        </button>
      </div>
    </>
  );
}
