"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { contacts, getWhatsAppLink, getTelegramLink } from "@/lib/contacts";
import { reachGoal } from "@/lib/analytics";
import { Phone, MessageCircle, Send, X } from "lucide-react";

/**
 * Floating Action Button for Quick Contact
 *
 * Shows a circular button that expands to reveal
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
    <div className="fixed right-6 bottom-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Contact options - shown when open */}
      <div
        className={cn(
          "flex flex-col items-center gap-3 transition-all duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {/* Phone */}
        <a
          href={contacts.phone.main.link}
          onClick={handlePhoneClick}
          className={cn(
            "group flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
            "bg-green-500 text-white transition-all duration-300",
            "hover:scale-110 hover:shadow-xl",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
          aria-label="Позвонить"
        >
          <Phone className="h-5 w-5" />
        </a>

        {/* WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className={cn(
            "group flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
            "bg-[#25D366] text-white transition-all duration-300",
            "hover:scale-110 hover:shadow-xl",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{ transitionDelay: isOpen ? "50ms" : "0ms" }}
          aria-label="Написать в WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>

        {/* Telegram */}
        <a
          href={getTelegramLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTelegramClick}
          className={cn(
            "group flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
            "bg-[#0088cc] text-white transition-all duration-300",
            "hover:scale-110 hover:shadow-xl",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{ transitionDelay: isOpen ? "0ms" : "0ms" }}
          aria-label="Написать в Telegram"
        >
          <Send className="h-5 w-5" />
        </a>
      </div>

      {/* Main FAB button */}
      <button
        onClick={toggle}
        className={cn(
          "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-xl",
          "bg-gradient-to-br from-[var(--color-legal-primary)] to-[var(--color-tech-primary)]",
          "text-white transition-all duration-300",
          "hover:scale-105 hover:shadow-2xl",
          "focus:ring-2 focus:ring-[var(--color-legal-primary)]/50 focus:ring-offset-2 focus:outline-none"
        )}
        aria-label={isOpen ? "Закрыть контакты" : "Связаться с нами"}
        aria-expanded={isOpen}
      >
        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-legal-primary)]/30" />
        )}

        {/* Icon */}
        <span
          className={cn("transition-transform duration-300", isOpen ? "rotate-45" : "rotate-0")}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </button>

      {/* Backdrop - close on click outside */}
      {isOpen && (
        <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}
