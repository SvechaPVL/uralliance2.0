"use client";

import { useEffect } from "react";
import Script from "next/script";

interface DelovayaSredaPixelProps {
  partnerId: string;
}

/**
 * Пиксель отслеживания Деловой среды (партнёрская программа Сбербанка)
 *
 * Используется для автоматической передачи статистики показов баннеров
 * и реферальных ссылок в ИС НЕО.
 *
 * @see https://partners.dasreda.ru/knowledge/conditions/documents
 */
export function DelovayaSredaPixel({ partnerId }: DelovayaSredaPixelProps) {
  useEffect(() => {
    // Инициализация пикселя при монтировании
    if (typeof window !== "undefined") {
      const win = window as Window & { dsPartnerPixel?: Array<Record<string, unknown>> };
      win.dsPartnerPixel = win.dsPartnerPixel || [];
      win.dsPartnerPixel.push({
        partnerId: partnerId,
        event: "pageview",
        timestamp: Date.now(),
      });
    }
  }, [partnerId]);

  return (
    <>
      {/* Пиксель отслеживания Деловой среды */}
      <Script
        id="delovaya-sreda-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                'ds.start': new Date().getTime(),
                partnerId: '${partnerId}'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dsPartnerPixel' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://partners.dasreda.ru/pixel.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dsPartnerPixel', '${partnerId}');
          `,
        }}
      />

      {/* Fallback noscript pixel image */}
      <noscript>
        <img
          src={`https://partners.dasreda.ru/pixel.gif?partnerId=${partnerId}&t=${Date.now()}`}
          alt=""
          width="1"
          height="1"
          style={{ display: "none" }}
        />
      </noscript>
    </>
  );
}
