"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LaptopMockupProps {
  children: ReactNode;
  className?: string;
}

export function LaptopMockup({ children, className }: LaptopMockupProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div className="mx-auto rounded-t-[32px] border border-white/10 bg-gradient-to-b from-[#0d111a] to-[#05070c] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <div className="mx-auto my-2 h-1 w-16 rounded-full bg-white/10" />
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0b1321]">
          {children}
        </div>
      </div>
      <div className="mx-auto h-2 w-[80%] rounded-b-[32px] bg-gradient-to-b from-[#04070b] to-[#0e1118]" />
    </div>
  );
}
