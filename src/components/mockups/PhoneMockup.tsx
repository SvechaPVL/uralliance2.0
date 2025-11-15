"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children: ReactNode;
  variant?: "iphone" | "android";
  orientation?: "portrait" | "landscape";
  className?: string;
}

export function PhoneMockup({
  children,
  variant = "iphone",
  orientation = "portrait",
  className,
}: PhoneMockupProps) {
  const base = cn(
    "relative flex items-center justify-center border border-white/10 bg-[#05070c] p-3 text-white shadow-[0_20px_45px_rgba(0,0,0,0.4)]",
    orientation === "portrait" ? "w-[240px] rounded-[34px]" : "w-[400px] h-[220px] rounded-[32px]"
  );

  return (
    <div className={cn(base, className)}>
      <div
        className={cn(
          "relative flex h-full w-full overflow-hidden border border-white/10",
          variant === "iphone" ? "rounded-[22px]" : "rounded-[24px]"
        )}
      >
        {variant === "iphone" && (
          <div className="absolute top-3 left-1/2 h-5 w-28 -translate-x-1/2 rounded-full bg-black/60" />
        )}
        {children}
      </div>
    </div>
  );
}
