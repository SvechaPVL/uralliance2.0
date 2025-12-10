import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type CheckboxVariant = "legal" | "tech" | "default";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Brand variant for focus ring and checked state
   * @default "default"
   */
  variant?: CheckboxVariant;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Label content (can include links)
   */
  label?: React.ReactNode;

  /**
   * Whether checkbox is required (adds asterisk to label)
   */
  required?: boolean;
}

const checkboxVariants: Record<CheckboxVariant, string> = {
  default:
    "checked:bg-[var(--color-info)] checked:border-[var(--color-info)] focus:ring-[var(--color-info)]",
  legal:
    "checked:bg-[var(--color-legal-primary)] checked:border-[var(--color-legal-primary)] focus:ring-[var(--color-legal-primary)]",
  tech: "checked:bg-[var(--color-tech-primary)] checked:border-[var(--color-tech-primary)] focus:ring-[var(--color-tech-primary)]",
};

/**
 * Checkbox Component
 *
 * Form checkbox primitive with focus states, error handling, and accessibility
 * following the dual brand identity design system
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Согласен с условиями"
 *   variant="legal"
 *   required
 * />
 *
 * <Checkbox
 *   label={<>Принимаю <a href="/privacy">политику</a></>}
 *   variant="tech"
 *   error
 *   errorMessage="Необходимо согласие"
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = "default",
      error = false,
      errorMessage,
      label,
      required: isRequired = false,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = error || !!errorMessage;

    return (
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            "flex items-start gap-3",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {/* Custom checkbox wrapper */}
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${checkboxId}-error` : undefined}
              className={cn(
                // Base styles
                "peer h-5 w-5 cursor-pointer appearance-none rounded border-2",
                "transition-all duration-[var(--transition-base)]",
                // Focus state
                "focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:outline-none",
                // Variant styles
                checkboxVariants[variant],
                // Error state
                hasError
                  ? "border-[var(--color-error)] focus:ring-[var(--color-error)]"
                  : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]",
                // Disabled state
                disabled && "cursor-not-allowed opacity-50",
                className
              )}
              {...props}
            />
            {/* Check icon */}
            <Check
              className={cn(
                "pointer-events-none absolute top-0.5 left-0.5 h-4 w-4",
                "text-white opacity-0 transition-opacity",
                "peer-checked:opacity-100"
              )}
              strokeWidth={3}
              aria-hidden="true"
            />
          </div>

          {/* Label */}
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "cursor-pointer text-sm text-[var(--color-text-secondary)] select-none",
                "[&_a]:cursor-pointer [&_a]:text-[var(--color-text-primary)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[var(--color-text-secondary)]",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
              {isRequired && <span className="ml-0.5 text-[var(--color-tech-primary)]">*</span>}
            </label>
          )}
        </div>

        {/* Error message */}
        {hasError && errorMessage && (
          <p
            id={`${checkboxId}-error`}
            className="ml-8 flex items-center gap-1 text-sm text-[var(--color-error)]"
            role="alert"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
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
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
