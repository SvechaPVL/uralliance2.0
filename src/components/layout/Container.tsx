import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width constraint
   * @default "2xl"
   */
  size?: ContainerSize;

  /**
   * Remove horizontal padding
   * @default false
   */
  noPadding?: boolean;

  /**
   * Center the container
   * @default true
   */
  center?: boolean;

  /**
   * Custom element type
   * @default "div"
   */
  as?: React.ElementType;
}

const containerSizes: Record<ContainerSize, string> = {
  xs: "max-w-[var(--container-xs)]",
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  "2xl": "max-w-[var(--container-2xl)]",
  full: "max-w-full",
};

/**
 * Container Component
 *
 * Layout primitive for constraining content width with responsive padding
 * following the 8pt grid system
 *
 * @example
 * ```tsx
 * <Container size="2xl">
 *   <h1>Page Content</h1>
 * </Container>
 *
 * <Container size="lg" noPadding>
 *   <FullWidthImage />
 * </Container>
 *
 * <Container as="section" size="xl">
 *   <Article />
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "2xl",
      noPadding = false,
      center = true,
      as: Component = "div",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = Component as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(
          // Max width
          containerSizes[size],
          // Centering
          center && "mx-auto",
          // Responsive padding (mobile: 16px, tablet: 24px, desktop: 32px)
          !noPadding && "px-4 md:px-6 lg:px-8",
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

Container.displayName = "Container";
