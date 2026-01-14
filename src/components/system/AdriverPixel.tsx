"use client";

import { useEffect, useRef } from "react";

interface AdriverPixelProps {
  /** ID баннера для отслеживания */
  bannerId: string;
  /** ID рекламодателя */
  adId: string;
  /** ID площадки */
  pid: string;
}

/**
 * Пиксель аудита размещения AdRiver
 *
 * Устанавливается рядом с баннером для отслеживания показов.
 * Невидимая картинка 1x1, не влияет на дизайн.
 *
 * @see https://ad.adriver.ru
 */
export function AdriverPixel({ bannerId, adId, pid }: AdriverPixelProps) {
  const pixelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pixelRef.current && typeof window !== "undefined") {
      const rndNum = Math.round(Math.random() * 1000000000);
      const tail = document.referrer
        ? encodeURIComponent(document.referrer)
        : "unknown";

      const img = document.createElement("img");
      img.src = `https://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&bt=21&ad=${adId}&pid=${pid}&bid=${bannerId}&bn=${bannerId}&exss=&rnd=${rndNum}&tail256=${tail}`;
      img.width = 1;
      img.height = 1;
      img.style.display = "none";
      img.referrerPolicy = "no-referrer-when-downgrade";
      img.alt = "";

      pixelRef.current.appendChild(img);
    }
  }, [bannerId, adId, pid]);

  return <div ref={pixelRef} aria-hidden="true" />;
}

/**
 * Готовый пиксель для баннера Сбербанка/Деловой среды
 */
export function SberbankBannerPixel() {
  return (
    <AdriverPixel
      bannerId="13867212"
      adId="831662"
      pid="4696450"
    />
  );
}
