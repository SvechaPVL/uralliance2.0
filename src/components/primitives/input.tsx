import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export type InputSize = "sm" | "md" | "lg";

export type InputVariant = "legal" | "tech" | "default";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
   * Prefix icon or element
   */
  prefixIcon?: React.ReactNode;

  /**
   * Suffix icon or element
   */
  suffixIcon?: React.ReactNode;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;
}

const inputSizes: Record<InputSize, string> = {
  sm: "h-9 px-3 py-2 text-sm",
  md: "h-11 px-4 py-3 text-base",
  lg: "h-14 px-5 py-4 text-lg",
};

const inputVariants: Record<InputVariant, string> = {
  default: "focus:ring-[var(--color-tech-primary)]",
  legal: "focus:ring-[var(--color-legal-primary)]",
  tech: "focus:ring-[var(--color-tech-primary)]",
};

/**
 * Input Component
 *
 * Form input primitive with focus states, error handling, and accessibility
 * following the dual brand identity design system
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   variant="legal"
 *   placeholder="your@email.com"
 *   required
 * />
 *
 * <Input
 *   label="Search"
 *   variant="tech"
 *   prefixIcon={<SearchIcon />}
 *   helperText="Search by keyword"
 * />
 *
 * <Input
 *   error
 *   errorMessage="Invalid phone number"
 *   value="123"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      variant = "default",
      error = false,
      errorMessage,
      helperText,
      label,
      required: isRequired = false,
      prefixIcon,
      suffixIcon,
      fullWidth = false,
      className,
      disabled,
      id,
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
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
            {isRequired && <span className="ml-1 text-[var(--color-tech-primary)]">*</span>}
          </label>
        )}

        {/* Input wrapper with icons */}
        <div className="relative">
          {/* Prefix icon */}
          {prefixIcon && (
            <div
              className={cn(
                "absolute top-1/2 left-3 -translate-y-1/2",
                "text-[var(--color-text-muted)]",
                "pointer-events-none"
              )}
              aria-hidden="true"
            >
              {prefixIcon}
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
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
              "focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:outline-none",
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
              // Icon padding
              prefixIcon && "pl-10",
              suffixIcon && "pr-10",
              // Custom className
              className
            )}
            {...props}
          />

          {/* Suffix icon */}
          {suffixIcon && (
            <div
              className={cn(
                "absolute top-1/2 right-3 -translate-y-1/2",
                "text-[var(--color-text-muted)]",
                "pointer-events-none"
              )}
              aria-hidden="true"
            >
              {suffixIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {hasError && errorMessage && (
          <p id={`${inputId}-error`} className="text-sm text-[var(--color-error)]" role="alert">
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

Input.displayName = "Input";
