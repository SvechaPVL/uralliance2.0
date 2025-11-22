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
  email: z.string().email("Укажите корректный email"),
  phone: z
    .string()
    .transform((value) => value?.trim() || "")
    .refine(
      (value) => {
        // Пустое значение разрешено
        if (!value) return true;
        // Проверяем что это полный российский номер
        // и не содержит символов маски "_"
        return russianPhoneRegex.test(value) && !value.includes("_");
      },
      "Введите полный номер телефона в формате +7 (XXX) XXX-XX-XX"
    ),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(1000, "Сообщение не должно превышать 1000 символов")
    .trim(),
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
