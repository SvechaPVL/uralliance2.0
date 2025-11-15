import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "legal"
  | "tech"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral";

export type BadgeStyle = "filled" | "outline" | "subtle";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Color variant
   * @default "neutral"
   */
  variant?: BadgeVariant;

  /**
   * Visual style
   * @default "filled"
   */
  badgeStyle?: BadgeStyle;

  /**
   * Badge size
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Optional icon element
   */
  icon?: React.ReactNode;

  /**
   * Icon position
   * @default "left"
   */
  iconPosition?: "left" | "right";
}

const badgeVariants: Record<BadgeVariant, Record<BadgeStyle, string>> = {
  legal: {
    filled: "bg-[var(--color-legal-primary)] text-[var(--color-text-primary)]",
    outline: "border border-[var(--color-legal-primary)] text-[var(--color-legal-dark)]",
    subtle: "bg-[var(--color-legal-accent)] text-[var(--color-legal-dark)]",
  },
  tech: {
    filled: "bg-[var(--color-tech-primary)] text-white",
    outline: "border border-[var(--color-tech-primary)] text-[var(--color-tech-dark)]",
    subtle: "bg-[var(--color-tech-accent)]/20 text-[var(--color-tech-dark)]",
  },
  success: {
    filled: "bg-[var(--color-success)] text-white",
    outline: "border border-[var(--color-success)] text-[var(--color-success)]",
    subtle: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  },
  error: {
    filled: "bg-[var(--color-error)] text-white",
    outline: "border border-[var(--color-error)] text-[var(--color-error)]",
    subtle: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
  },
  warning: {
    filled: "bg-[var(--color-warning)] text-white",
    outline: "border border-[var(--color-warning)] text-[var(--color-warning)]",
    subtle: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  },
  info: {
    filled: "bg-[var(--color-info)] text-white",
    outline: "border border-[var(--color-info)] text-[var(--color-info)]",
    subtle: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
  },
  neutral: {
    filled: "bg-[var(--color-text-primary)] text-white",
    outline: "border border-[var(--color-text-primary)] text-[var(--color-text-primary)]",
    subtle: "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]",
  },
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs h-5",
  md: "px-2.5 py-1 text-sm h-6",
  lg: "px-3 py-1.5 text-base h-8",
};

/**
 * Badge Component
 *
 * Compact inline component for labels, status indicators, and tags
 * following the Legal/Tech dual brand identity
 *
 * @example
 * ```tsx
 * <Badge variant="legal" badgeStyle="filled">
 *   Premium
 * </Badge>
 *
 * <Badge variant="tech" badgeStyle="outline" icon={<CheckIcon />}>
 *   Verified
 * </Badge>
 *
 * <Badge variant="success" size="sm">
 *   Active
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "neutral",
      badgeStyle = "filled",
      size = "md",
      icon,
      iconPosition = "left",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-1",
          "font-medium rounded-full",
          "whitespace-nowrap",
          // Variant + Style
          badgeVariants[variant][badgeStyle],
          // Size
          badgeSizes[size],
          // Custom className
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
