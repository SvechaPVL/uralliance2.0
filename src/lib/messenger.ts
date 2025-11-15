/**
 * Messenger Utilities
 *
 * Helper functions for generating pre-filled messenger links
 * (WhatsApp, Telegram) with custom messages
 */

/**
 * Generate WhatsApp link with pre-filled message
 *
 * @param phone - Phone number in international format (e.g., "79001234567")
 * @param message - Pre-filled message text
 * @returns WhatsApp URL with encoded message
 *
 * @example
 * ```ts
 * const link = generateWhatsAppLink("79001234567", "Здравствуйте! Хочу узнать о ваших услугах");
 * // Returns: "https://wa.me/79001234567?text=Здравствуйте!%20Хочу%20узнать%20о%20ваших%20услугах"
 * ```
 */
export function generateWhatsAppLink(phone?: string, message?: string): string {
  const defaultPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "79000000000";
  const defaultMessage =
    "Здравствуйте! Я обращаюсь с сайта Uralliance. Хочу узнать больше о ваших услугах.";

  const phoneNumber = phone || defaultPhone;
  const text = message || defaultMessage;

  // Remove any non-digit characters from phone
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  // Encode message for URL
  const encodedMessage = encodeURIComponent(text);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generate Telegram link with pre-filled message
 *
 * @param username - Telegram username (without @)
 * @param message - Pre-filled message text
 * @returns Telegram URL with encoded message
 *
 * @example
 * ```ts
 * const link = generateTelegramLink("uralliance", "Здравствуйте! Интересует консультация");
 * // Returns: "https://t.me/uralliance?text=Здравствуйте!%20Интересует%20консультация"
 * ```
 */
export function generateTelegramLink(username?: string, message?: string): string {
  const defaultUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "uralliance";
  const defaultMessage =
    "Здравствуйте! Я обращаюсь с сайта Uralliance. Хочу узнать больше о ваших услугах.";

  const telegramUsername = username || defaultUsername;
  const text = message || defaultMessage;

  // Remove @ if present
  const cleanUsername = telegramUsername.replace(/^@/, "");

  // Encode message for URL
  const encodedMessage = encodeURIComponent(text);

  return `https://t.me/${cleanUsername}?text=${encodedMessage}`;
}

/**
 * Generate email mailto link with subject and body
 *
 * @param email - Email address
 * @param subject - Email subject
 * @param body - Email body text
 * @returns Mailto URL with encoded parameters
 *
 * @example
 * ```ts
 * const link = generateEmailLink("info@uralliance.ru", "Запрос консультации", "Здравствуйте...");
 * // Returns: "mailto:info@uralliance.ru?subject=Запрос%20консультации&body=Здравствуйте..."
 * ```
 */
export function generateEmailLink(email?: string, subject?: string, body?: string): string {
  const defaultEmail = "info@uralliance.ru";
  const defaultSubject = "Запрос с сайта Uralliance";
  const defaultBody = "Здравствуйте! Хочу узнать больше о ваших услугах.";

  const toEmail = email || defaultEmail;
  const emailSubject = subject || defaultSubject;
  const emailBody = body || defaultBody;

  const params = new URLSearchParams({
    subject: emailSubject,
    body: emailBody,
  });

  return `mailto:${toEmail}?${params.toString()}`;
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
    whatsapp: generateWhatsAppLink(undefined, message),
    telegram: generateTelegramLink(undefined, message),
    email: generateEmailLink(undefined, undefined, message),
  };
}
