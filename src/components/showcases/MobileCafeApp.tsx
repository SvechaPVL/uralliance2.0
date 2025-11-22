"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  { name: "Flat White", price: "250 ₽" },
  { name: "Раф Лаванда", price: "280 ₽" },
  { name: "Колд Брю", price: "300 ₽" },
];

export function MobileCafeApp() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-[260px] rounded-[32px] border border-white/10 bg-[#05070c] p-3 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
      <div className="rounded-[24px] border border-white/10 bg-[#080c14] p-4">
        <div className="text-xs tracking-[0.3em] text-white/60 uppercase">Coffee Club</div>
        <div className="mt-4 h-24 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#140c19] sm:h-36" />
        <div className="mt-4 text-sm">
          <div className="text-white/80">Сегодня в меню</div>
          <div className="mt-3 space-y-2">
            {items.slice(0, 2).map((item, idx) => (
              <motion.div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2"
                animate={{
                  borderColor: idx === active ? "#22d3ee" : "rgba(255,255,255,0.1)",
                  scale: idx === active ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span>{item.name}</span>
                <span className="text-white/60">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 sm:block">
          Приложение для сети кофеен: онлайн-заказы, кешбэк, push-уведомления.
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full rounded-full bg-[#22d3ee]/20 py-2 text-sm font-semibold text-[#22d3ee]"
        >
          Оформить заказ
        </motion.button>
      </div>
    </div>
  );
}
