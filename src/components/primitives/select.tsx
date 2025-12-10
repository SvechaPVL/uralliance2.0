"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Core Radix UI Select Components (unchanged from your example)
// ============================================================================

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-input bg-background text-foreground focus:border-ring focus:ring-ring/20 data-[placeholder]:text-muted-foreground/70 flex h-11 w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-start text-base shadow-sm shadow-black/5 focus:ring-[3px] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="text-muted-foreground/80 h-4 w-4 shrink-0" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & { usePortal?: boolean }
>(({ className, children, position = "popper", usePortal = true, ...props }, ref) => {
  const content = (
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "border-input bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[8rem] overflow-hidden rounded-lg border shadow-lg shadow-black/5 [&_[role=group]]:py-1",
        position === "popper" &&
          "w-full min-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)]")}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  );

  return usePortal ? <SelectPrimitive.Portal>{content}</SelectPrimitive.Portal> : content;
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("text-muted-foreground py-1.5 ps-8 pe-2 text-xs font-medium", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-md py-1.5 ps-8 pe-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute start-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("bg-border -mx-1 my-1 h-px", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ============================================================================
// Custom Wrapper Component (compatible with our form system)
// ============================================================================

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "legal" | "tech" | "default";

export interface SelectProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  variant?: SelectVariant;
  selectSize?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
}

const selectVariants: Record<SelectVariant, string> = {
  default: "focus:ring-[var(--color-tech-primary)]",
  legal: "focus:ring-[var(--color-legal-primary)]",
  tech: "focus:ring-[var(--color-tech-primary)]",
};

/**
 * Select Component
 *
 * Beautiful select dropdown using Radix UI with legal/tech variants
 *
 * @example
 * ```tsx
 * <Select
 *   label="Направление"
 *   variant="tech"
 *   required
 *   value={value}
 *   onValueChange={setValue}
 * >
 *   <SelectItem value="legal">Юридическая задача</SelectItem>
 *   <SelectItem value="tech">IT-проект</SelectItem>
 * </Select>
 * ```
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      required: isRequired = false,
      error = false,
      errorMessage,
      helperText,
      variant = "default",
      selectSize = "md",
      fullWidth = false,
      disabled = false,
      value,
      onValueChange,
      defaultValue,
      placeholder = "Выберите...",
      children,
      name,
    },
    ref
  ) => {
    const hasError = error || !!errorMessage;
    const selectId = React.useId();

    return (
      <div className={cn("relative flex flex-col gap-1.5", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-sm font-medium text-[var(--color-text-primary)]",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
            {isRequired && <span className="ml-1 text-[var(--color-tech-primary)]">*</span>}
          </label>
        )}

        {/* Select */}
        <SelectRoot
          value={value}
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
        >
          <SelectTrigger
            ref={ref}
            id={selectId}
            className={cn(
              "transition-all duration-[var(--transition-base)]",
              !hasError && selectVariants[variant],
              hasError &&
                "border-[var(--color-error)] bg-[var(--color-error)]/5 focus:ring-[var(--color-error)]",
              fullWidth && "w-full"
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent usePortal={false}>{children}</SelectContent>
        </SelectRoot>

        {/* Error message */}
        {hasError && errorMessage && (
          <p id={`${selectId}-error`} className="text-sm text-[var(--color-error)]" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Helper text */}
        {!hasError && helperText && (
          <p id={`${selectId}-helper`} className="text-sm text-[var(--color-text-secondary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Export all components for advanced usage
export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
