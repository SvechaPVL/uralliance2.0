"use client";

import Image from "next/image";
import { SberbankBannerPixel } from "@/components/system/AdriverPixel";

interface SberbankBannerProps {
  referralLink: string;
}

export function SberbankBanner({ referralLink }: SberbankBannerProps) {
  return (
    <a
      href={referralLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border-2 border-[#21a038]/30 bg-gradient-to-br from-[#21a038]/5 to-transparent p-1 shadow-xl transition-all hover:border-[#21a038]/50 hover:shadow-2xl"
    >
      {/* Баннер Деловой среды */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src="/images/partners/sberbank-banner.png"
          alt="Кредиты для бизнеса от Сбербанка — Деловая среда"
          width={400}
          height={400}
          className="h-auto w-full max-w-[400px] transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 z-10 rounded-full border border-[#21a038] bg-[var(--color-background-primary)] px-3 py-1.5 text-xs font-semibold text-[#21a038] shadow-lg">
        Партнёр
      </div>

      {/* Пиксель аудита показов баннера */}
      <SberbankBannerPixel />
    </a>
  );
}
