import { HTMLAttributes, forwardRef, ReactNode, createElement } from "react";
import { cn } from "@/lib/utils";

export type LabelSize = "xs" | "sm" | "md" | "lg";

export type LabelSpacing = "normal" | "wide" | "wider" | "widest";

export type LabelTone = "default" | "primary" | "secondary" | "muted" | "legal" | "tech" | "white";

export interface LabelProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {
  /**
   * Label size
   * @default "sm"
   */
  size?: LabelSize;

  /**
   * Letter spacing
   * @default "widest"
   */
  spacing?: LabelSpacing;

  /**
   * Color tone
   * @default "muted"
   */
  tone?: LabelTone;

  /**
   * Transform to uppercase
   * @default true
   */
  uppercase?: boolean;

  /**
   * Font weight
   * @default "medium"
   */
  weight?: "normal" | "medium" | "semibold" | "bold";

  /**
   * Custom element type
   * @default "p"
   */
  as?: "p" | "span" | "label" | "div" | "dt" | "dd";

  /**
   * Children content
   */
  children?: ReactNode;
}

const labelSizes: Record<LabelSize, string> = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const labelSpacings: Record<LabelSpacing, string> = {
  normal: "tracking-normal",
  wide: "tracking-[0.2em]",
  wider: "tracking-[0.3em]",
  widest: "tracking-[0.4em]",
};

const labelTones: Record<LabelTone, string> = {
  default: "text-[var(--color-text-primary)]",
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  muted: "text-[var(--color-text-muted)]",
  legal: "text-[var(--color-legal-primary)]",
  tech: "text-[var(--color-tech-primary)]",
  white: "text-white",
};

const labelWeights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

/**
 * Label Component (Eyebrow Text)
 *
 * Small uppercase text used for section labels, categories, and metadata.
 * Commonly appears above headings or as descriptive labels.
 *
 * @example
 * ```tsx
 * <Label>Section Label</Label>
 *
 * <Label tone="legal" spacing="widest">
 *   Legal Services
 * </Label>
 *
 * <Label size="md" tone="tech" uppercase={false}>
 *   Technology
 * </Label>
 * ```
 */
export const Label = forwardRef<HTMLParagraphElement, LabelProps>(
  (
    {
      as: Component = "p",
      size = "sm",
      spacing = "widest",
      tone = "muted",
      uppercase = true,
      weight = "medium",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return createElement(
      Component,
      {
        ref,
        className: cn(
          // Size
          labelSizes[size],
          // Spacing
          labelSpacings[spacing],
          // Tone
          labelTones[tone],
          // Weight
          labelWeights[weight],
          // Uppercase
          uppercase && "uppercase",
          // Custom className
          className
        ),
        ...props,
      },
      children
    );
  }
);

Label.displayName = "Label";
