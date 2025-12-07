/**
 * Messenger Utilities
 *
 * Helper functions for generating pre-filled messenger links.
 * All contact data comes from the centralized contacts.json.
 *
 * @deprecated Prefer importing directly from "@/lib/contacts" for new code.
 * This module is kept for backward compatibility.
 */

import { contacts, getEmailWithMessage, getTelegramLink, getWhatsAppLink } from "./contacts";

/**
 * Generate WhatsApp link with pre-filled message
 *
 * @param phone - Phone number (optional, defaults to contacts.json value)
 * @param message - Pre-filled message text
 * @returns WhatsApp URL with encoded message
 *
 * @example
 * ```ts
 * const link = generateWhatsAppLink(undefined, "Здравствуйте! Хочу узнать о ваших услугах");
 * ```
 */
export function generateWhatsAppLink(phone?: string, message?: string): string {
  // If custom phone provided, build custom URL
  if (phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    const text = message || contacts.messengers.whatsapp.defaultMessage;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }

  // Otherwise use centralized contacts
  return getWhatsAppLink(message);
}

/**
 * Generate Telegram link with pre-filled message
 *
 * @param username - Telegram username (optional, defaults to contacts.json value)
 * @param message - Pre-filled message text
 * @returns Telegram URL with encoded message
 *
 * @example
 * ```ts
 * const link = generateTelegramLink(undefined, "Здравствуйте! Интересует консультация");
 * ```
 */
export function generateTelegramLink(username?: string, message?: string): string {
  // If custom username provided, build custom URL
  if (username) {
    const cleanUsername = username.replace(/^@/, "");
    const text = message || contacts.messengers.telegram.defaultMessage;
    return `https://t.me/${cleanUsername}?text=${encodeURIComponent(text)}`;
  }

  // Otherwise use centralized contacts
  return getTelegramLink(message);
}

/**
 * Generate email mailto link with subject and body
 *
 * @param email - Email address (optional, defaults to contacts.json value)
 * @param subject - Email subject
 * @param body - Email body text
 * @returns Mailto URL with encoded parameters
 *
 * @example
 * ```ts
 * const link = generateEmailLink(undefined, "Запрос консультации", "Здравствуйте...");
 * ```
 */
export function generateEmailLink(email?: string, subject?: string, body?: string): string {
  const toEmail = email || contacts.email.display;
  const emailSubject = subject || "Запрос с сайта Uralliance";
  const emailBody = body || "Здравствуйте! Хочу узнать больше о ваших услугах.";

  // If custom email provided, build custom URL
  if (email) {
    const params = new URLSearchParams({
      subject: emailSubject,
      body: emailBody,
    });
    return `mailto:${toEmail}?${params.toString()}`;
  }

  // Otherwise use centralized contacts
  return getEmailWithMessage(subject, body);
}

/**
 * Get all messenger contact links
 *
 * @param message - Custom message (optional)
 * @returns Object with all messenger links
 *
 * @example
 * ```ts
 * const links = getAllMessengerLinks("Хочу обсудить проект");
 * // Returns: { whatsapp: "...", telegram: "...", email: "..." }
 * ```
 */
export function getAllMessengerLinks(message?: string) {
  return {
    whatsapp: getWhatsAppLink(message),
    telegram: getTelegramLink(message),
    email: getEmailWithMessage(undefined, message),
  };
}
