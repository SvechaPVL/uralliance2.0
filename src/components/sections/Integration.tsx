"use client";

import { motion } from "framer-motion";

const icons = [
  { label: "WhatsApp", x: "10%", y: "40%" },
  { label: "CRM", x: "50%", y: "20%" },
  { label: "Telegram", x: "90%", y: "40%" },
  { label: "1C", x: "50%", y: "80%" },
];

const connections = [
  { from: "10% 40%", to: "50% 20%" },
  { from: "90% 40%", to: "50% 20%" },
  { from: "50% 20%", to: "50% 80%" },
];

export function Integration() {
  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Integration Ecosystem</p>
          <h3 className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)]">Интеграции, которые работают</h3>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            WhatsApp ↔ CRM ↔ Telegram, API 1C и кастомные коннекторы в одной схеме.
          </p>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/5 bg-[#05070c]">
          <svg className="absolute inset-0 h-full w-full">
            {connections.map((conn, idx) => (
              <motion.line
                key={idx}
                x1={conn.from.split(" ")[0]}
                y1={conn.from.split(" ")[1]}
                x2={conn.to.split(" ")[0]}
                y2={conn.to.split(" ")[1]}
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: idx * 0.3 }}
              />
            ))}
          </svg>
          {icons.map((icon) => (
            <div
              key={icon.label}
              className="absolute flex flex-col items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              style={{ left: icon.x, top: icon.y, transform: "translate(-50%, -50%)" }}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#22d3ee]" />
              {icon.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
