import { z } from "zod";

/**
 * Regular expression for validating Russian phone numbers.
 * Format: +7 (XXX) XXX-XX-XX
 */
const russianPhoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

/**
 * Schema describing the expected payload of the contact form.
 * Shared between the client (react-hook-form) and server (API route).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов")
    .trim(),
  email: z
    .string()
    .transform((value) => value?.trim() || "")
    .refine((value) => {
      // Пустое значение разрешено (email необязателен)
      if (!value) return true;
      // Если заполнено - проверяем формат
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }, "Укажите корректный email"),
  phone: z
    .string()
    .transform((value) => value?.trim() || "")
    .refine((value) => {
      // Телефон обязателен - проверяем что заполнен
      if (!value) return false;
      // Проверяем что это полный российский номер
      // и не содержит символов маски "_"
      return russianPhoneRegex.test(value) && !value.includes("_");
    }, "Введите полный номер телефона в формате +7 (XXX) XXX-XX-XX"),
  message: z
    .string()
    .max(1000, "Сообщение не должно превышать 1000 символов")
    .transform((value) => value?.trim() || "")
    .optional()
    .or(z.literal("")),
  service: z.enum(["legal", "tech"] as const, {
    message: "Выберите направление",
  }),
  /**
   * Honeypot field for spam protection.
   * Accepts only an empty string.
   */
  honeypot: z
    .string()
    .optional()
    .refine((value) => !value, {
      message: "Spam detected",
    }),
});

/**
 * TypeScript type inferred from the contact form schema.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Error detail used in API responses for invalid fields.
 */
export interface ContactFormErrorDetail {
  field: string;
  message: string;
}

/**
 * Successful API response.
 */
export interface ContactFormSuccessResponse {
  success: true;
}

/**
 * Error API response with optional validation details.
 */
export interface ContactFormErrorResponse {
  success: false;
  error: string;
  details?: ContactFormErrorDetail[];
}
