import { HTMLAttributes, forwardRef, ReactNode, createElement } from "react";
import { cn } from "@/lib/utils";

export type SectionVariant = "hero" | "default" | "compact" | "feature";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export type SectionBackground = "default" | "secondary" | "gradient-light" | "gradient-dark";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Section variant
   * @default "default"
   */
  variant?: SectionVariant;

  /**
   * Vertical spacing (padding)
   * @default "lg"
   */
  spacing?: SectionSpacing;

  /**
   * Background style
   * @default "default"
   */
  background?: SectionBackground;

  /**
   * Add top border
   * @default false
   */
  borderTop?: boolean;

  /**
   * Add bottom border
   * @default false
   */
  borderBottom?: boolean;

  /**
   * Add both borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable relative positioning
   * @default true
   */
  relative?: boolean;

  /**
   * Disable the extra top padding applied to the first section on the page
   * @default false
   */
  disableFirstSpacing?: boolean;

  /**
   * Overflow behavior
   * @default "visible"
   */
  overflow?: "visible" | "hidden";

  /**
   * Add backdrop blur
   * @default false
   */
  backdropBlur?: boolean;

  /**
   * Isolate stacking context
   * @default false
   */
  isolate?: boolean;

  /**
   * Custom element type
   * @default "section"
   */
  as?: React.ElementType;

  /**
   * Children content
   */
  children?: ReactNode;
}

const sectionVariants: Record<SectionVariant, string> = {
  hero: "min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20",
  default: "pt-16 sm:pt-20 lg:pt-24 xl:pt-28",
  compact: "pt-12 sm:pt-16 lg:pt-20",
  feature: "pt-16 sm:pt-20 lg:pt-24 xl:pt-28",
};

const sectionSpacing: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-8 sm:py-10 lg:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-24 lg:py-28 xl:py-32",
};

const sectionBackgrounds: Record<SectionBackground, string> = {
  default: "",
  secondary: "bg-[var(--color-background-secondary)]",
  "gradient-light":
    "bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950",
  "gradient-dark": "bg-gradient-to-b from-neutral-900 to-black",
};

/**
 * Section Component
 *
 * Foundational section primitive for consistent spacing, backgrounds, and layout
 * following the design system
 *
 * @example
 * ```tsx
 * <Section variant="hero">
 *   <Container>Hero content</Container>
 * </Section>
 *
 * <Section spacing="lg" background="secondary" bordered>
 *   <Container>Section content</Container>
 * </Section>
 *
 * <Section variant="feature" spacing="xl" relative overflow="hidden">
 *   <Container>Feature content</Container>
 * </Section>
 * ```
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      variant = "default",
      spacing = "lg",
      background = "default",
      borderTop = false,
      borderBottom = false,
      bordered = false,
      relative = true,
      disableFirstSpacing = false,
      overflow = "visible",
      backdropBlur = false,
      isolate = false,
      as: Component = "section",
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
          // Base styles
          "w-full",
          // Variant
          sectionVariants[variant],
          // Spacing (additional bottom padding)
          sectionSpacing[spacing],
          // Extra breathing room for the first section on the page (especially on mobile)
          !disableFirstSpacing && "first:pt-24 first:sm:pt-28 first:lg:pt-32",
          // Background
          sectionBackgrounds[background],
          // Positioning
          relative && "relative",
          isolate && "isolate",
          // Overflow
          overflow === "hidden" && "overflow-hidden",
          // Borders
          (borderTop || bordered) && "border-t border-[var(--color-border-soft)]",
          (borderBottom || bordered) && "border-b border-[var(--color-border-soft)]",
          // Effects
          backdropBlur && "backdrop-blur",
          // Custom className
          className
        ),
        ...props,
      },
      children
    );
  }
);

Section.displayName = "Section";
