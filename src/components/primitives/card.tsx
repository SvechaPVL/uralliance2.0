import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "legal" | "tech" | "glass";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Padding size
   * @default "md"
   */
  padding?: CardPadding;

  /**
   * Enable hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Apply neobrutalist border style
   * @default false
   */
  brutal?: boolean;
}

const cardVariants: Record<CardVariant, string> = {
  default: cn(
    "bg-[var(--color-card-bg)] backdrop-blur-[14px] border border-[var(--color-border-soft)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
  ),
  legal: cn(
    "bg-[var(--color-legal-surface)] backdrop-blur-[16px]",
    "border border-[var(--color-legal-border-soft)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    "hover:shadow-[0_18px_40px_-30px_rgba(212,175,55,0.35)]"
  ),
  tech: cn(
    "bg-[var(--color-tech-surface)] backdrop-blur-[16px]",
    "border border-[var(--color-tech-border-soft)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    "hover:shadow-[0_18px_40px_-30px_rgba(6,182,212,0.35)]"
  ),
  glass: cn(
    // Enhanced glassmorphism effect
    "bg-[var(--color-glass-strong)] backdrop-blur-[18px]",
    "border border-[var(--color-border-soft)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
  ),
};

const cardPaddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * Card Component
 *
 * Foundational card primitive with glassmorphism and neobrutalism support
 * following the dual brand identity design system
 *
 * @example
 * ```tsx
 * <Card variant="legal" padding="lg" hoverable>
 *   <h3>Legal Services</h3>
 *   <p>Professional legal consultation</p>
 * </Card>
 *
 * <Card variant="glass" brutal>
 *   <CardHeader>Premium Feature</CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      brutal = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "rounded-3xl transition-all duration-[var(--transition-base)]",
          // Variant styles
          cardVariants[variant],
          // Padding
          cardPaddings[padding],
          // Hoverable effect
          hoverable &&
            cn(
              "cursor-pointer",
              "hover:scale-[1.01]",
              variant === "legal" && "hover:border-[var(--color-legal-primary)]/40",
              variant === "tech" && "hover:border-[var(--color-tech-primary)]/40",
              variant === "glass" && "hover:bg-[var(--color-glass)]"
            ),
          // Neobrutalist style
          brutal &&
            cn(
              "border-2 border-[var(--color-text-primary)]",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              hoverable && "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            ),
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader Component
 *
 * Optional header section for Card
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-4 pb-4 border-b border-[var(--color-border)]", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * CardContent Component
 *
 * Main content section for Card
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

/**
 * CardFooter Component
 *
 * Optional footer section for Card
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mt-4 pt-4 border-t border-[var(--color-border)]", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
