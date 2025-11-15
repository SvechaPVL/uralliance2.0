"use client";

import { LaptopMockup } from "@/components/mockups/LaptopMockup";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MacbookScrollProps {
  children: ReactNode;
  className?: string;
}

export function MacbookScroll({ children, className }: MacbookScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const screenScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.12]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);

  return (
    <div ref={ref} className={cn("relative min-h-[120vh] w-full", className)}>
      <motion.div
        style={prefersReducedMotion ? undefined : { y: translateY }}
        className="sticky top-16 flex w-full justify-center sm:top-24"
      >
        <div className="relative w-full max-w-4xl">
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 bottom-4 h-24 rounded-full bg-cyan-400/30 blur-[90px]"
              style={{ opacity: glowOpacity }}
            />
          )}

          <LaptopMockup>
            <motion.div
              style={prefersReducedMotion ? undefined : { scale: screenScale }}
              className="h-full origin-center"
            >
              {children}
            </motion.div>
          </LaptopMockup>
        </div>
      </motion.div>
    </div>
  );
}
