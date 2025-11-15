"use client";

import { Container } from "@/components/layout/Container";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { TabletMockup } from "@/components/mockups/TabletMockup";
import { motion } from "framer-motion";

export function MobileApps() {
  return (
    <section className="relative py-24">
      <Container>
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">Mobile Apps</p>
          <h3 className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)]">
            Мобильные приложения любой сложности
          </h3>
          <div className="mt-4 flex justify-center gap-3 text-xs">
            {["Swift", "Kotlin", "React Native", "Flutter"].map((tech) => (
              <span key={tech} className="rounded-full border border-[var(--color-border-soft)] px-3 py-1 text-[var(--color-text-secondary)]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-center gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PhoneMockup>
              <div className="h-full w-full bg-gradient-to-b from-[#0f172a] to-[#0b0f19]" />
            </PhoneMockup>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <TabletMockup>
              <div className="h-full w-full bg-gradient-to-b from-[#141821] to-[#0a0d13]" />
            </TabletMockup>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <PhoneMockup variant="android">
              <div className="h-full w-full bg-gradient-to-b from-[#050708] to-[#0d1119]" />
            </PhoneMockup>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
