"use client";

import { forwardRef, useId, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { InputSize, InputVariant } from "./input";

export interface PhoneInputProps {
  /**
   * Input size
   * @default "md"
   */
  inputSize?: InputSize;

  /**
   * Brand variant for focus ring
   * @default "default"
   */
  variant?: InputVariant;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display below input
   */
  helperText?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Whether label is required (adds asterisk)
   */
  required?: boolean;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Input value
   */
  value?: string;

  /**
   * onChange handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * onBlur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Input name
   */
  name?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the input
   */
  id?: string;

  /**
   * Autocomplete attribute
   */
  autoComplete?: string;
}

const inputSizes: Record<InputSize, string> = {
  sm: "h-9 px-3 py-2 text-sm",
  md: "h-11 px-4 py-3 text-base",
  lg: "h-14 px-5 py-4 text-lg",
};

const inputVariants: Record<InputVariant, string> = {
  default: "focus:ring-[var(--color-info)]",
  legal: "focus:ring-[var(--color-legal-primary)]",
  tech: "focus:ring-[var(--color-tech-primary)]",
};

/**
 * Форматирует номер телефона в формат +7 (XXX) XXX-XX-XX
 */
function formatPhoneNumber(value: string): string {
  // Убираем все нецифровые символы
  const digits = value.replace(/\D/g, "");

  // Если пусто, возвращаем пустую строку
  if (!digits) {
    return "";
  }

  // Если начинается с 8, заменяем на 7
  let phoneDigits = digits;
  if (phoneDigits.startsWith("8")) {
    phoneDigits = "7" + phoneDigits.slice(1);
  }

  // Если не начинается с 7 и есть цифры, добавляем 7
  if (phoneDigits && !phoneDigits.startsWith("7")) {
    phoneDigits = "7" + phoneDigits;
  }

  // Берем только первые 11 цифр (7 + 10 цифр номера)
  phoneDigits = phoneDigits.slice(0, 11);

  // Форматируем в +7 (XXX) XXX-XX-XX
  let formatted = "+7";

  if (phoneDigits.length > 1) {
    formatted += " (" + phoneDigits.slice(1, 4);
  }
  if (phoneDigits.length >= 5) {
    formatted += ") " + phoneDigits.slice(4, 7);
  }
  if (phoneDigits.length >= 8) {
    formatted += "-" + phoneDigits.slice(7, 9);
  }
  if (phoneDigits.length >= 10) {
    formatted += "-" + phoneDigits.slice(9, 11);
  }

  return formatted;
}

/**
 * PhoneInput Component
 *
 * Input for Russian phone numbers with format: +7 (XXX) XXX-XX-XX
 * Automatically adds +7 prefix and formats the number as user types
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   label="Телефон"
 *   variant="legal"
 *   placeholder="+7 (900) 000-00-00"
 *   required
 * />
 * ```
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      inputSize = "md",
      variant = "default",
      error = false,
      errorMessage,
      helperText,
      label,
      required: isRequired = false,
      fullWidth = false,
      className,
      disabled,
      id,
      placeholder = "+7 (900) 000-00-00",
      autoComplete = "tel",
      value = "",
      onChange,
      onBlur,
      name,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = error || !!errorMessage;

    const innerRef = useRef<HTMLInputElement>(null);

    // Объединяем рефы
    useEffect(() => {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else if (ref) {
        ref.current = innerRef.current;
      }
    }, [ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      const inputValue = e.target.value;

      // Если пользователь стирает всё или оставляет только "+", очищаем поле
      if (!inputValue || inputValue === "+" || inputValue === "+7") {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: "", name: name || "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        return;
      }

      // Форматируем введённое значение
      const formatted = formatPhoneNumber(inputValue);

      // Если после форматирования получили только "+7", очищаем поле
      if (formatted === "+7") {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: "", name: name || "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        return;
      }

      // Вызываем onChange с отформатированным значением
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted, name: name || "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[var(--color-text-primary)]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
            {isRequired && <span className="ml-1 text-[var(--color-tech-primary)]">*</span>}
          </label>
        )}

        {/* Input */}
        <input
          ref={innerRef}
          id={inputId}
          type="tel"
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            // Base styles
            "w-full rounded-lg border bg-[var(--color-background)]",
            "transition-all duration-[var(--transition-base)]",
            "font-sans text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-muted)]",
            // Size
            inputSizes[inputSize],
            // Focus state
            "focus:ring-2 focus:ring-offset-2 focus:outline-none",
            !hasError && inputVariants[variant],
            // Error state
            hasError
              ? cn(
                  "border-[var(--color-error)] bg-[var(--color-error)]/5",
                  "focus:ring-[var(--color-error)]"
                )
              : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]",
            // Disabled state
            disabled && "cursor-not-allowed bg-[var(--color-background-secondary)] opacity-50",
            // Custom className
            className
          )}
          {...props}
        />

        {/* Error message */}
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-sm text-[var(--color-error)]"
            role="alert"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {!hasError && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-[var(--color-text-secondary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
