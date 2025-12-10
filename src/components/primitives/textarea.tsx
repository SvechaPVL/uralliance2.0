import { TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export type TextareaSize = "sm" | "md" | "lg";

export type TextareaVariant = "legal" | "tech" | "default";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea size
   * @default "md"
   */
  textareaSize?: TextareaSize;

  /**
   * Brand variant for focus ring
   * @default "default"
   */
  variant?: TextareaVariant;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display below textarea
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
   * Full width textarea
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Show character count
   */
  showCount?: boolean;
}

const textareaSizes: Record<TextareaSize, string> = {
  sm: "px-3 py-2 text-sm min-h-[80px]",
  md: "px-4 py-3 text-base min-h-[120px]",
  lg: "px-5 py-4 text-lg min-h-[160px]",
};

const textareaVariants: Record<TextareaVariant, string> = {
  default: "focus:ring-[var(--color-tech-primary)]",
  legal: "focus:ring-[var(--color-legal-primary)]",
  tech: "focus:ring-[var(--color-tech-primary)]",
};

/**
 * Textarea Component
 *
 * Form textarea primitive with focus states, error handling, and accessibility
 * following the dual brand identity design system
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Сообщение"
 *   variant="legal"
 *   placeholder="Опишите задачу..."
 *   required
 *   rows={5}
 * />
 *
 * <Textarea
 *   error
 *   errorMessage="Сообщение обязательно"
 *   maxLength={500}
 *   showCount
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      textareaSize = "md",
      variant = "default",
      error = false,
      errorMessage,
      helperText,
      label,
      required: isRequired = false,
      fullWidth = false,
      showCount = false,
      className,
      disabled,
      id,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = error || !!errorMessage;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {/* Label and character count */}
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className={cn(
                "text-sm font-medium text-[var(--color-text-primary)]",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
              {isRequired && <span className="ml-1 text-[var(--color-tech-primary)]">*</span>}
            </label>
          )}
          {showCount && maxLength && (
            <span className="text-sm text-[var(--color-text-muted)]">
              {currentLength} / {maxLength}
            </span>
          )}
        </div>

        {/* Textarea element */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          className={cn(
            // Base styles
            "w-full rounded-lg border bg-[var(--color-background)]",
            "transition-all duration-[var(--transition-base)]",
            "font-sans text-[var(--color-text-primary)]",
            "placeholder:text-[var(--color-text-muted)]",
            "resize-y",
            // Size
            textareaSizes[textareaSize],
            // Focus state
            "focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:outline-none",
            !hasError && textareaVariants[variant],
            // Error state
            hasError
              ? cn(
                  "border-[var(--color-error)] bg-[var(--color-error)]/5",
                  "focus:ring-[var(--color-error)]"
                )
              : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]",
            // Disabled state
            disabled &&
              "cursor-not-allowed resize-none bg-[var(--color-background-secondary)] opacity-50",
            // Custom className
            className
          )}
          {...props}
        />

        {/* Error message */}
        {hasError && errorMessage && (
          <p
            id={`${textareaId}-error`}
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
          <p id={`${textareaId}-helper`} className="text-sm text-[var(--color-text-secondary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
