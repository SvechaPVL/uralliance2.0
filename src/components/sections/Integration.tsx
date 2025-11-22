"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/primitives/section";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import integrationsConfig from "@/content/integrations.json";
import sectionsConfig from "@/content/sections.json";

const icons = integrationsConfig.items.map((item) => ({
  label: item.label,
  color: item.color,
  x: item.position.x,
  y: item.position.y,
}));

const connections = [
  { from: "15% 35%", to: "50% 15%" },
  { from: "85% 35%", to: "50% 15%" },
  { from: "50% 15%", to: "30% 70%" },
  { from: "50% 15%", to: "70% 70%" },
];

export function Integration() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <Label size="sm" spacing="wider" tone="muted">
            {sectionsConfig.integration.heading}
          </Label>
          <Heading as="h3" size="xl" weight="semibold" className="mt-4">
            {integrationsConfig.title}
          </Heading>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            {integrationsConfig.description}
          </p>
        </div>

        <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/5 bg-[#05070c] sm:h-[420px]">
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
          {icons.map((icon, idx) => (
            <motion.div
              key={icon.label}
              className="absolute flex items-center justify-center"
              style={{
                left: icon.x,
                top: icon.y,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="rounded-xl border bg-gradient-to-b from-white/10 to-white/5 px-3 py-2 shadow-lg backdrop-blur-sm sm:rounded-2xl sm:px-6 sm:py-4"
                style={{
                  transform: "translate(-50%, -50%)",
                  borderColor: `${icon.color}40`,
                  boxShadow: `0 0 30px ${icon.color}20`,
                }}
              >
                <span
                  className="block text-center text-xs font-bold tracking-tight whitespace-nowrap sm:text-lg"
                  style={{ color: icon.color }}
                >
                  {icon.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
