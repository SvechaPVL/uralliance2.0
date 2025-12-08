"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/primitives/card";
import { Label } from "@/components/primitives/label";
import { QuickContactForm } from "@/components/forms/QuickContactForm";

interface ServiceHeroCardProps {
  price: string;
  serviceName: string;
  variant: "legal" | "tech";
}

/**
 * Service Hero Card with Quick Contact Form
 *
 * Shows price prominently and includes an inline form
 * for maximum conversion - no redirect needed.
 */
export function ServiceHeroCard({ price, serviceName, variant }: ServiceHeroCardProps) {
  const isLegal = variant === "legal";

  return (
    <Card variant={variant} className="flex flex-col p-5 sm:p-6 md:col-span-4">
      {/* Price - prominent at top */}
      <div className="mb-5 border-b border-[var(--color-border)]/30 pb-5">
        <Label size="sm" spacing="wider" tone="muted" className="uppercase">
          Стоимость
        </Label>
        <div
          className={cn(
            "mt-2 text-2xl font-bold sm:text-3xl",
            isLegal
              ? "bg-gradient-to-r from-[var(--color-legal-primary)] to-[var(--color-legal-400)] bg-clip-text text-transparent"
              : "bg-gradient-to-r from-[var(--color-tech-primary)] to-[var(--color-tech-400)] bg-clip-text text-transparent"
          )}
        >
          {price}
        </div>
      </div>

      {/* Quick Form - main conversion element */}
      <div className="flex-1">
        <Label size="sm" spacing="wider" tone="muted" className="mb-4 block uppercase">
          Быстрая заявка
        </Label>
        <QuickContactForm variant={variant} serviceName={serviceName} />
      </div>
    </Card>
  );
}
