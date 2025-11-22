import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

export type TextTone = "default" | "primary" | "secondary" | "muted" | "white" | "legal" | "tech";

export type TextLeading = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Text size
   * @default "base"
   */
  size?: TextSize;

  /**
   * Color tone
   * @default "default"
   */
  tone?: TextTone;

  /**
   * Line height
   * @default "normal"
   */
  leading?: TextLeading;

  /**
   * Font weight
   * @default "normal"
   */
  weight?: TextWeight;

  /**
   * Maximum width constraint
   * @default undefined
   */
  maxWidth?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "prose";

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Custom element type
   * @default "p"
   */
  as?: "p" | "span" | "div" | "li";
}

const textSizes: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const textTones: Record<TextTone, string> = {
  default: "text-[var(--color-text-primary)]",
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  muted: "text-[var(--color-text-muted)]",
  white: "text-white",
  legal: "text-[var(--color-legal-primary)]",
  tech: "text-[var(--color-tech-primary)]",
};

const textLeadings: Record<TextLeading, string> = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

const textWeights: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textMaxWidths = {
  none: "",
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  prose: "max-w-prose",
};

/**
 * Text Component
 *
 * Body text component for paragraphs and inline text with consistent styling
 * following the design system.
 *
 * @example
 * ```tsx
 * <Text>
 *   Standard paragraph text
 * </Text>
 *
 * <Text size="lg" tone="secondary" leading="relaxed">
 *   Large secondary text with relaxed line height
 * </Text>
 *
 * <Text maxWidth="prose" leading="relaxed">
 *   Content constrained to optimal reading width
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      as: Component = "p",
      size = "base",
      tone = "default",
      leading = "normal",
      weight = "normal",
      maxWidth,
      truncate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = Component as any;
    return (
      <Comp
        ref={ref}
        className={cn(
          // Size
          textSizes[size],
          // Tone
          textTones[tone],
          // Leading
          textLeadings[leading],
          // Weight
          textWeights[weight],
          // Max width
          maxWidth && textMaxWidths[maxWidth],
          // Truncate
          truncate && "truncate",
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Text.displayName = "Text";
