"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { PhoneInput } from "@/components/primitives/phone-input";
import { Select, SelectItem } from "@/components/primitives/select";
import { Textarea } from "@/components/primitives/textarea";
import { cn } from "@/lib/utils";
import type {
  ContactFormErrorResponse,
  ContactFormSuccessResponse,
  ContactFormValues,
} from "@/types/forms";
import { contactFormSchema } from "@/types/forms";
import formConfig from "@/content/form-config.json";

const SERVICE_OPTIONS = formConfig.contact.fields.service.options;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  service: SERVICE_OPTIONS[0].value as "legal" | "tech",
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
    control,
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
            : formConfig.contact.messages.error
        );
        return;
      }

      setStatus("success");
      setServerMessage(formConfig.contact.messages.success);
      reset({ ...defaultValues });
    } catch {
      setStatus("error");
      setServerMessage(formConfig.contact.messages.networkError);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Invisible honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company-field">{formConfig.contact.honeypot.label}</label>
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
          label={formConfig.contact.fields.name.label}
          placeholder={formConfig.contact.fields.name.placeholder}
          variant={formConfig.contact.fields.name.variant as any}
          fullWidth
          required={formConfig.contact.fields.name.required}
          {...register("name")}
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          label={formConfig.contact.fields.email.label}
          type="email"
          placeholder={formConfig.contact.fields.email.placeholder}
          variant={formConfig.contact.fields.email.variant as any}
          fullWidth
          required={formConfig.contact.fields.email.required}
          autoComplete="email"
          {...register("email")}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label={formConfig.contact.fields.phone.label}
              placeholder={formConfig.contact.fields.phone.placeholder}
              variant={formConfig.contact.fields.phone.variant as any}
              fullWidth
              required={formConfig.contact.fields.phone.required}
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
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <Select
              label={formConfig.contact.fields.service.label}
              variant={formConfig.contact.fields.service.variant as any}
              fullWidth
              required={formConfig.contact.fields.service.required}
              value={field.value}
              onValueChange={field.onChange}
              error={!!errors.service}
              errorMessage={errors.service?.message}
            >
              {SERVICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Textarea
        label={formConfig.contact.fields.message.label}
        variant={formConfig.contact.fields.message.variant as any}
        fullWidth
        required={formConfig.contact.fields.message.required}
        rows={5}
        maxLength={1000}
        placeholder={formConfig.contact.fields.message.placeholder}
        {...register("message")}
        error={!!errors.message}
        errorMessage={errors.message?.message}
      />

      <div className="space-y-3">
        <Button
          type="submit"
          variant={formConfig.contact.button.variant as any}
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? formConfig.contact.button.loadingLabel : formConfig.contact.button.label}
        </Button>
        <p className="text-sm text-[var(--color-text-muted)]">
          {formConfig.contact.hint}
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
