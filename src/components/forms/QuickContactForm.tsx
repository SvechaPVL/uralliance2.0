"use client";

import { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { PhoneInput } from "@/components/primitives/phone-input";
import { Checkbox } from "@/components/primitives/checkbox";
import { cn } from "@/lib/utils";
import { reachGoal } from "@/lib/analytics";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";

const quickContactSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите телефон"),
  honeypot: z.string().max(0),
  consent: z.boolean().refine((value) => value === true, {
    message: "Необходимо согласие",
  }),
});

type QuickContactValues = z.infer<typeof quickContactSchema>;

interface QuickContactFormProps {
  variant?: "legal" | "tech";
  serviceName?: string;
  className?: string;
}

/**
 * Quick Contact Form for Hero Section
 *
 * Compact 2-field form for maximum conversion.
 * Only asks for name and phone - minimal friction.
 */
export function QuickContactForm({
  variant = "legal",
  serviceName,
  className,
}: QuickContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const formStartTracked = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuickContactValues>({
    resolver: zodResolver(quickContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      honeypot: "",
      consent: false,
    },
  });

  const handleFormStart = useCallback(() => {
    if (!formStartTracked.current) {
      reachGoal("quick_form_start", serviceName ? { service: serviceName } : undefined);
      formStartTracked.current = true;
    }
  }, [serviceName]);

  const onSubmit = useCallback(
    async (values: QuickContactValues) => {
      setStatus("idle");
      setServerMessage(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            service: variant,
            message: serviceName ? `Интересует услуга: ${serviceName}` : "Быстрая заявка с сайта",
            email: "",
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          setStatus("error");
          setServerMessage("Ошибка отправки. Попробуйте ещё раз.");
          reachGoal("quick_form_error", serviceName ? { service: serviceName } : undefined);
          return;
        }

        setStatus("success");
        setServerMessage("Заявка отправлена! Перезвоним в течение 15 минут.");
        reachGoal("quick_form_submit", serviceName ? { service: serviceName } : undefined);
        reset();
      } catch {
        setStatus("error");
        setServerMessage("Ошибка сети. Проверьте соединение.");
        reachGoal("quick_form_error", {
          error: "network",
          ...(serviceName && { service: serviceName }),
        });
      }
    },
    [variant, serviceName, reset]
  );

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 text-center",
          variant === "legal"
            ? "border-[var(--color-legal-primary)]/30 bg-[var(--color-legal-surface)]/50"
            : "border-[var(--color-tech-primary)]/30 bg-[var(--color-tech-surface)]/50",
          className
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            variant === "legal"
              ? "bg-[var(--color-legal-primary)]/20 text-[var(--color-legal-primary)]"
              : "bg-[var(--color-tech-primary)]/20 text-[var(--color-tech-primary)]"
          )}
        >
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <Input
        label="Ваше имя"
        placeholder="Иван Петров"
        variant="default"
        fullWidth
        required
        {...register("name")}
        onFocus={handleFormStart}
        error={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            label="Телефон"
            placeholder="+7 (999) 123-45-67"
            variant="default"
            fullWidth
            required
            autoComplete="tel"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        )}
      />

      <Checkbox
        label={
          <>
            Согласен на обработку{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              персональных данных
            </a>
          </>
        }
        variant={variant}
        required
        {...register("consent")}
        error={!!errors.consent}
        errorMessage={errors.consent?.message}
      />

      <Button
        type="submit"
        variant={variant === "legal" ? "primary-legal" : "primary-tech"}
        fullWidth
        isLoading={isSubmitting}
        className="gap-2"
      >
        {isSubmitting ? (
          "Отправляем..."
        ) : (
          <>
            Получить консультацию
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>

      {status === "error" && serverMessage && (
        <p className="text-center text-sm text-[var(--color-error)]">{serverMessage}</p>
      )}

      <p className="text-center text-xs text-[var(--color-text-muted)]">
        Перезвоним за 15 минут в рабочее время
      </p>
    </form>
  );
}
