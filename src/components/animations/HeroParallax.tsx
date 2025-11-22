"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useMemo, useRef } from "react";

interface HeroParallaxProps {
  children: ReactNode;
  className?: string;
}

export function HeroParallax({ children, className }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const combinedClassName = useMemo(
    () => ["relative", className].filter(Boolean).join(" "),
    [className]
  );

  return (
    <motion.div ref={ref} className={combinedClassName} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
