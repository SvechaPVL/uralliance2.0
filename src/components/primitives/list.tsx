import { HTMLAttributes, forwardRef, ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

export type ListVariant = "unordered" | "ordered" | "feature" | "checkmark";

export type ListSpacing = "none" | "sm" | "md" | "lg";

export type ListMarkerTone = "default" | "legal" | "tech" | "muted";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * List variant
   * @default "unordered"
   */
  variant?: ListVariant;

  /**
   * Spacing between items
   * @default "md"
   */
  spacing?: ListSpacing;

  /**
   * Marker/bullet color tone
   * @default "default"
   */
  markerTone?: ListMarkerTone;

  /**
   * Custom marker (for feature variant)
   */
  marker?: ReactNode;

  /**
   * Items as children
   */
  children: ReactNode;
}

const listSpacings: Record<ListSpacing, string> = {
  none: "space-y-0",
  sm: "space-y-2",
  md: "space-y-3",
  lg: "space-y-4",
};

const markerTones: Record<ListMarkerTone, string> = {
  default: "text-[var(--color-text-primary)]",
  legal: "text-[var(--color-legal-primary)]",
  tech: "text-[var(--color-tech-primary)]",
  muted: "text-[var(--color-text-muted)]",
};

/**
 * List Component
 *
 * Consistent list styling for unordered, ordered, and feature lists.
 *
 * @example
 * ```tsx
 * <List variant="feature" markerTone="legal">
 *   <li>First feature</li>
 *   <li>Second feature</li>
 * </List>
 *
 * <List variant="checkmark" spacing="lg">
 *   <li>Task completed</li>
 *   <li>Another task</li>
 * </List>
 *
 * <List variant="ordered">
 *   <li>Step one</li>
 *   <li>Step two</li>
 * </List>
 * ```
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      variant = "unordered",
      spacing = "md",
      markerTone = "default",
      marker,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = variant === "ordered" ? "ol" : "ul";
    const Comp = Component as any;

    // Base list styles
    const baseStyles = cn(
      // Spacing
      listSpacings[spacing],
      // Custom className
      className
    );

    // Variant-specific styles
    const variantStyles = {
      unordered: "list-disc list-inside",
      ordered: "list-decimal list-inside",
      feature: "",
      checkmark: "",
    };

    // For feature and checkmark variants, we need to style individual items
    if (variant === "feature" || variant === "checkmark") {
      return (
        <Comp
          ref={ref}
          className={baseStyles}
          {...props}
        >
          {Array.isArray(children)
            ? children.map((child, index) => {
                if (!child) return null;
                const childElement = child as any;
                return (
                  <li key={index} className="flex items-start gap-2">
                    <span className={cn("mt-1 flex-shrink-0", markerTones[markerTone])}>
                      {marker || (variant === "checkmark" ? "✓" : "·")}
                    </span>
                    <span className="flex-1">{childElement.props?.children}</span>
                  </li>
                );
              })
            : children}
        </Comp>
      );
    }

    // Standard list (unordered/ordered)
    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variantStyles[variant])}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

List.displayName = "List";
