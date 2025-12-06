import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Particles } from "@/components/animations/Particles";

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

  /**
   * Enable floating particles background
   * @default false
   */
  withParticles?: boolean;
}

const baseCardClasses = cn(
  "rounded-3xl relative overflow-hidden border",
  "bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-card-bg)]",
  "border-[var(--color-border)]",
  "transition-all duration-300"
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
  glass: cn("bg-[var(--color-background-secondary)]/80 border-[var(--color-border)]"),
};

const cardPaddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5 lg:p-6",
  lg: "p-5 sm:p-6 lg:p-8",
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
      withParticles = false,
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
          // Variant styles
          cardVariants[variant],
          // Padding
          cardPaddings[padding],
          // Hoverable effect (no cursor-pointer - custom cursor handles it)
          hoverable &&
            cn(
              "hover:-translate-y-1",
              variant === "legal" && "hover:border-[var(--color-legal-primary)]/40",
              variant === "tech" && "hover:border-[var(--color-tech-primary)]/40"
            ),
          // Neobrutalist style
          brutal &&
            cn(
              "border-2 border-[var(--color-text-primary)]",
              "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              hoverable &&
                "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            ),
          // Custom className
          className
        )}
        {...props}
      >
        {withParticles && (
          <Particles
            count={15}
            colors={
              variant === "legal"
                ? ["#D4AF37", "#F5E6D3"]
                : variant === "tech"
                  ? ["#06B6D4", "#22D3EE"]
                  : ["#D4AF37", "#06B6D4"]
            }
            speed={0.25}
            className="opacity-15"
          />
        )}
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
        className={cn("mb-4 border-b border-[var(--color-border)] pb-4", className)}
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
        className={cn("mt-4 border-t border-[var(--color-border)] pt-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
