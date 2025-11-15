import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Button variant types following the dual brand identity
 */
export type ButtonVariant =
  | "primary-legal"
  | "primary-tech"
  | "secondary-legal"
  | "secondary-tech"
  | "outline-legal"
  | "outline-tech"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default "primary-legal"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Loading state - disables interaction and shows loading indicator
   */
  isLoading?: boolean;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Icon element (React node)
   */
  icon?: React.ReactNode;

  /**
   * Icon position
   * @default "left"
   */
  iconPosition?: "left" | "right";
}

const buttonVariants: Record<ButtonVariant, string> = {
  "primary-legal": cn(
    "bg-[var(--color-legal-primary)] text-[#0b0f19]",
    "hover:bg-[var(--color-legal-dark)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-legal-primary)]"
  ),
  "primary-tech": cn(
    "bg-[var(--color-tech-primary)] text-[#03121d]",
    "hover:bg-[var(--color-tech-dark)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-tech-primary)]"
  ),
  "secondary-legal": cn(
    "bg-[var(--color-legal-accent)] text-[var(--color-legal-dark)]",
    "hover:bg-[var(--color-legal-primary)] hover:text-[var(--color-text-primary)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  "secondary-tech": cn(
    "bg-[var(--color-tech-accent)]/20 text-[var(--color-tech-dark)]",
    "hover:bg-[var(--color-tech-accent)]/40",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  "outline-legal": cn(
    "border-2 border-[var(--color-legal-primary)] text-[var(--color-legal-dark)]",
    "hover:bg-[var(--color-legal-surface)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-legal-primary)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  "outline-tech": cn(
    "border-2 border-[var(--color-tech-primary)] text-[var(--color-tech-primary)]",
    "hover:bg-[var(--color-tech-primary)]/10 hover:border-[var(--color-tech-dark)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  ghost: cn(
    "text-[var(--color-text-primary)] bg-transparent",
    "hover:bg-[var(--color-background-secondary)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm h-9",
  md: "px-6 py-3 text-base h-11",
  lg: "px-8 py-4 text-lg h-14",
};

/**
 * Button Component
 *
 * Foundational button primitive following Neobrutalism design
 * with Legal/Tech brand variants
 *
 * @example
 * ```tsx
 * <Button variant="primary-legal" size="md">
 *   Get Legal Support
 * </Button>
 *
 * <Button variant="primary-tech" icon={<ArrowIcon />} isLoading>
 *   Deploy Solution
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary-legal",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2",
          "font-semibold rounded-lg",
          "transition-all duration-[var(--transition-base)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variant === "primary-legal" || variant === "secondary-legal" || variant === "outline-legal"
            ? "focus-visible:ring-[var(--color-legal-primary)]"
            : "focus-visible:ring-[var(--color-tech-primary)]",
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Full width
          fullWidth && "w-full",
          // Custom className
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && icon && iconPosition === "left" && (
          <span className="flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {!isLoading && icon && iconPosition === "right" && (
          <span className="flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
