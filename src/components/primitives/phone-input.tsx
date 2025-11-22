"use client";

import { forwardRef, useId } from "react";
import InputMask from "react-input-mask";
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
 * PhoneInput Component
 *
 * Masked input for Russian phone numbers with format: +7 (XXX) XXX-XX-XX
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
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = error || !!errorMessage;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[var(--color-text-primary)]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
            {isRequired && <span className="text-[var(--color-tech-primary)] ml-1">*</span>}
          </label>
        )}

        {/* Input with mask */}
        <InputMask
          mask="+7 (999) 999-99-99"
          maskChar="_"
          disabled={disabled}
          {...props}
        >
          {(inputProps: any) => (
            <input
              {...inputProps}
              ref={ref}
              id={inputId}
              type="tel"
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? `${inputId}-error`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
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
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                !hasError && inputVariants[variant],
                // Error state
                hasError
                  ? cn(
                      "border-[var(--color-error)] bg-[var(--color-error)]/5",
                      "focus:ring-[var(--color-error)]"
                    )
                  : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]",
                // Disabled state
                disabled &&
                  "opacity-50 cursor-not-allowed bg-[var(--color-background-secondary)]",
                // Custom className
                className
              )}
            />
          )}
        </InputMask>

        {/* Error message */}
        {hasError && errorMessage && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-[var(--color-error)] flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
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
          <p
            id={`${inputId}-helper`}
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
