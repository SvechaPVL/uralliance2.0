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

const baseCardClasses = cn(
  "group/card rounded-[28px] relative overflow-hidden border border-white/10",
  "bg-[var(--color-card-bg)]/75 backdrop-blur-[18px]",
  "shadow-[0_25px_70px_-35px_rgba(0,0,0,0.65)]",
  "transform-gpu transition duration-[360ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]",
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-white/10 before:opacity-40 before:content-['']",
  "after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:h-[2px] after:bg-white/30 after:opacity-60 after:blur-[2px] after:content-['']"
);

const cardVariants: Record<CardVariant, string> = {
  default: "",
  legal: cn(
    "bg-gradient-to-br from-[var(--color-legal-surface)]/90 to-[var(--color-legal-surface-strong)]/90",
    "border-[var(--color-legal-border)]/50 text-[var(--color-text-primary)]"
  ),
  tech: cn(
    "bg-gradient-to-br from-[var(--color-tech-surface)]/90 to-[var(--color-tech-surface-strong)]/90",
    "border-[var(--color-tech-border)]/50 text-[var(--color-text-primary)]"
  ),
  glass: cn(
    "bg-[var(--color-glass-strong)] border-white/15 backdrop-blur-[24px]"
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
 *   <CardHeader>Главная фича</CardHeader>
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
          baseCardClasses,
          "motion-reduce:transition-none motion-reduce:transform-none",
          // Variant styles
          cardVariants[variant],
          // Padding
          cardPaddings[padding],
          // Hoverable effect
          hoverable &&
            cn(
              "cursor-pointer",
              "hover:-translate-y-[3px] hover:shadow-[0_25px_55px_-30px_rgba(0,0,0,0.55)]",
              "motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none",
              "hover:border-white/20",
              variant === "legal" && "hover:border-[var(--color-legal-primary)]/35",
              variant === "tech" && "hover:border-[var(--color-tech-primary)]/35",
              variant === "glass" && "hover:bg-[var(--color-glass)]/90"
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
