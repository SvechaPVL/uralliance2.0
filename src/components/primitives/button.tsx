import { ButtonHTMLAttributes, CSSProperties, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
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
  | "outline"
  | "ghost"
  | "outline-telegram"
  | "outline-whatsapp";

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

  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior. Use when you need to render a Link or other element as a button
   * @default false
   */
  asChild?: boolean;
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
  outline: cn(
    "border border-[var(--color-border)] text-[var(--color-text-primary)] bg-transparent",
    "hover:bg-[var(--color-background-secondary)] hover:border-[var(--color-text-primary)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  ghost: cn(
    "text-[var(--color-text-primary)] bg-transparent",
    "hover:bg-[var(--color-background-secondary)]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  "outline-telegram": cn(
    "border-2 border-[#229ED9] text-[#229ED9]",
    "hover:bg-[#229ED9]/10 hover:text-white hover:border-[#8fd9ff]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  "outline-whatsapp": cn(
    "border-2 border-[#25D366] text-[#25D366]",
    "hover:bg-[#25D366]/10 hover:text-white hover:border-[#7ef0a9]",
    "active:scale-95",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ),
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm h-9",
  md: "px-6 py-3 text-base h-11",
  lg: "px-8 py-4 text-lg h-14",
};

function getUnderlineGradients(variant: ButtonVariant) {
  if (variant === "outline-telegram") {
    return {
      solid: "linear-gradient(to right, transparent, #229ED9, transparent)",
      blur: "linear-gradient(to right, transparent, #8fd9ff, transparent)",
    };
  }

  if (variant === "outline-whatsapp") {
    return {
      solid: "linear-gradient(to right, transparent, #25D366, transparent)",
      blur: "linear-gradient(to right, transparent, #7ef0a9, transparent)",
    };
  }

  const isLegal = variant.includes("legal");
  const mainColor = isLegal ? "var(--color-tech-primary)" : "var(--color-legal-primary)";
  const secondaryColor = isLegal ? "var(--color-tech-dark)" : "var(--color-legal-dark)";

  return {
    solid: `linear-gradient(to right, transparent, ${mainColor}, transparent)`,
    blur: `linear-gradient(to right, transparent, ${secondaryColor}, transparent)`,
  };
}

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
      asChild = false,
      className,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const underline = getUnderlineGradients(variant);
    const combinedStyle = {
      ...(style ?? {}),
      "--btn-underline-solid": underline.solid,
      "--btn-underline-blur": underline.blur,
    } as CSSProperties;
    const classes = cn(
      "relative group/btn overflow-visible isolate btn-underline",
      "inline-flex items-center justify-center gap-2",
      "font-semibold rounded-lg",
      "transition-all duration-[var(--transition-base)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      variant === "primary-legal" || variant === "secondary-legal" || variant === "outline-legal"
        ? "focus-visible:ring-[var(--color-legal-primary)]"
        : variant === "outline" || variant === "ghost"
        ? "focus-visible:ring-[var(--color-text-primary)]"
        : variant === "outline-telegram"
        ? "focus-visible:ring-[#229ED9]"
        : variant === "outline-whatsapp"
        ? "focus-visible:ring-[#25D366]"
        : "focus-visible:ring-[var(--color-tech-primary)]",
      buttonVariants[variant],
      buttonSizes[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
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
      </>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={classes}
          aria-disabled={isDisabled}
          data-disabled={isDisabled ? "true" : undefined}
          style={combinedStyle}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={classes}
        style={combinedStyle}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
