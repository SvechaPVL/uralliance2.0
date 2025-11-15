"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { cn } from "@/lib/utils";
import type {
  ContactFormErrorResponse,
  ContactFormSuccessResponse,
  ContactFormValues,
} from "@/types/forms";
import { contactFormSchema } from "@/types/forms";

const SERVICE_OPTIONS = [
  { label: "Юридическая задача", value: "legal" },
  { label: "IT-проект", value: "tech" },
] as const;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  service: "legal",
  honeypot: "",
};

/**
 * Contact Form Component
 *
 * Validates user input with zod + react-hook-form and submits data
 * to the /api/contact endpoint. Includes honeypot spam protection.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result: ContactFormErrorResponse | ContactFormSuccessResponse = await response.json();

      if (!response.ok || !result.success) {
        setStatus("error");
        setServerMessage(
          "error" in result && result.error
            ? result.error
            : "Не удалось отправить заявку. Попробуйте позже."
        );
        return;
      }

      setStatus("success");
      setServerMessage("Спасибо! Мы свяжемся с вами в течение рабочего дня.");
      reset({ ...defaultValues });
    } catch {
      setStatus("error");
      setServerMessage("Произошла ошибка. Попробуйте еще раз чуть позже.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Invisible honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company-field">Ваша компания</label>
        <input
          id="company-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Имя"
          placeholder="Как к вам обращаться?"
          variant="legal"
          fullWidth
          required
          {...register("name")}
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          variant="tech"
          fullWidth
          required
          autoComplete="email"
          {...register("email")}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Телефон"
          type="tel"
          placeholder="+7 (900) 000-00-00"
          variant="legal"
          fullWidth
          autoComplete="tel"
          {...register("phone")}
          error={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-service"
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            Направление
          </label>
          <select
            id="contact-service"
            required
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "contact-service-error" : undefined}
            className={cn(
              "w-full rounded-lg border bg-[var(--color-background)] px-4 py-3 text-base",
              "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-tech-primary)]",
              errors.service
                ? "border-[var(--color-error)] bg-[var(--color-error)]/5"
                : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
            )}
            {...register("service")}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="contact-service-error" className="text-sm text-[var(--color-error)]">
              {errors.service.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Сообщение
        </label>
        <textarea
          id="contact-message"
          rows={5}
          maxLength={1000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Опишите задачу или идею проекта..."
          className={cn(
            "w-full rounded-lg border bg-[var(--color-background)] px-4 py-3 text-base",
            "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-legal-primary)]",
            errors.message
              ? "border-[var(--color-error)] bg-[var(--color-error)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
          )}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-[var(--color-error)]">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Button type="submit" variant="primary-tech" fullWidth isLoading={isSubmitting}>
          Отправить заявку
        </Button>
        <p className="text-sm text-[var(--color-text-muted)]">
          Отвечаем в течение рабочего дня. Все данные передаются по защищенному каналу.
        </p>
        {serverMessage && (
          <p
            role="status"
            aria-live={status === "error" ? "assertive" : "polite"}
            className={cn(
              "text-sm font-medium",
              status === "success"
                ? "text-[var(--color-tech-primary)]"
                : "text-[var(--color-error)]"
            )}
          >
            {serverMessage}
          </p>
        )}
      </div>
    </form>
  );
}
