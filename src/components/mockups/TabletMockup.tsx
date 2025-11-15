"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabletMockupProps {
  children: ReactNode;
  className?: string;
}

export function TabletMockup({ children, className }: TabletMockupProps) {
  return (
    <div className={cn("relative mx-auto w-[360px] rounded-[28px] border border-white/10 bg-[#05070c] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.35)]", className)}>
      <div className="rounded-[20px] border border-white/10 bg-[#080c14] p-3">
        <div className="flex h-full w-full overflow-hidden rounded-[16px] border border-white/10 bg-black">{children}</div>
      </div>
    </div>
  );
}
