import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "hero";

export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";

export type HeadingTone = "default" | "primary" | "secondary" | "muted" | "white" | "legal" | "tech";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level (semantic HTML tag)
   * @default "h2"
   */
  as?: HeadingLevel;

  /**
   * Visual size (independent of semantic level)
   * @default "lg"
   */
  size?: HeadingSize;

  /**
   * Font weight
   * @default "bold"
   */
  weight?: HeadingWeight;

  /**
   * Color tone
   * @default "default"
   */
  tone?: HeadingTone;

  /**
   * Use display font family
   * @default false
   */
  display?: boolean;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;
}

const headingSizes: Record<HeadingSize, string> = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl md:text-5xl",
  "2xl": "text-4xl sm:text-5xl md:text-6xl",
  "3xl": "text-5xl sm:text-6xl md:text-7xl",
  hero: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
};

const headingWeights: Record<HeadingWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const headingTones: Record<HeadingTone, string> = {
  default: "text-[var(--color-text-primary)]",
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  muted: "text-[var(--color-text-muted)]",
  white: "text-white",
  legal: "text-[var(--color-legal-primary)]",
  tech: "text-[var(--color-tech-primary)]",
};

/**
 * Heading Component
 *
 * Semantic heading component with consistent typography following the design system.
 * Separates semantic level (as) from visual appearance (size).
 *
 * @example
 * ```tsx
 * <Heading as="h1" size="hero" weight="bold">
 *   Hero Title
 * </Heading>
 *
 * <Heading as="h2" size="xl" display>
 *   Section Title
 * </Heading>
 *
 * <Heading as="h3" size="lg" tone="legal">
 *   Subsection Title
 * </Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h2",
      size = "lg",
      weight = "bold",
      tone = "default",
      display = false,
      truncate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          "tracking-tight",
          // Size
          headingSizes[size],
          // Weight
          headingWeights[weight],
          // Tone
          headingTones[tone],
          // Font family
          display && "font-display",
          // Truncate
          truncate && "truncate",
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
