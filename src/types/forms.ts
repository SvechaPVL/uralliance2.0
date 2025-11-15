import { z } from "zod";

/**
 * Regular expression for validating phone numbers.
 * Allows digits, spaces, parentheses, dashes, and optional leading plus.
 */
const phoneRegex = /^\+?[0-9\s\-()]+$/;

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
    .optional()
    .transform((value) => value?.trim() || "")
    .refine(
      (value) => !value || phoneRegex.test(value),
      "Телефон может содержать только цифры, пробелы, +, -, ()"
    ),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(1000, "Сообщение не должно превышать 1000 символов")
    .trim(),
  service: z.enum(["legal", "tech"], {
    required_error: "Выберите направление",
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
