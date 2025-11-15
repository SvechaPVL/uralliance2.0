import {
  Scale,
  Briefcase,
  Database,
  Globe,
  MessageSquare,
  Package,
  FileText,
  Shield,
  Code,
  Smartphone,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Map of icon names to Lucide icon components
 */
const iconMap: Record<string, LucideIcon> = {
  Scale,
  Briefcase,
  Database,
  Globe,
  MessageSquare,
  Package,
  FileText,
  Shield,
  Code,
  Smartphone,
};

interface ServiceIconProps {
  /**
   * Icon name (e.g., "Scale", "Briefcase")
   */
  name: string;

  /**
   * Icon size class
   * @default "h-12 w-12"
   */
  className?: string;

  /**
   * Icon color variant
   */
  variant?: "legal" | "tech" | "neutral";
}

/**
 * ServiceIcon Component
 *
 * Renders a Lucide icon based on the provided name.
 * Used for displaying service icons throughout the site.
 */
export function ServiceIcon({ name, className, variant = "neutral" }: ServiceIconProps) {
  const Icon = iconMap[name];

  if (!Icon) {
    // Fallback to FileText if icon not found
    const FallbackIcon = iconMap.FileText;
    return (
      <FallbackIcon
        className={cn(
          "h-12 w-12",
          {
            "text-legal-500 dark:text-legal-400": variant === "legal",
            "text-tech-500 dark:text-tech-400": variant === "tech",
            "text-neutral-600 dark:text-neutral-400": variant === "neutral",
          },
          className
        )}
      />
    );
  }

  return (
    <Icon
      className={cn(
        "h-12 w-12",
        {
          "text-legal-500 dark:text-legal-400": variant === "legal",
          "text-tech-500 dark:text-tech-400": variant === "tech",
          "text-neutral-600 dark:text-neutral-400": variant === "neutral",
        },
        className
      )}
    />
  );
}
