"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { HTMLAttributes, PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Diameter of the radial gradient in pixels.
   * @default 420
   */
  size?: number;

  /**
   * Primary color stop for the gradient.
   * @default "rgba(6, 182, 212, 0.35)"
   */
  color?: string;

  /**
   * Secondary color stop that blends with the primary color.
   * @default "rgba(212, 175, 55, 0.2)"
   */
  secondaryColor?: string;
}

/**
 * Spotlight Component
 *
 * Renders an interactive radial gradient that follows pointer movement.
 * Useful for CTA backgrounds that need a subtle premium highlight effect.
 */
export function Spotlight({
  children,
  className,
  size = 420,
  color = "rgba(6, 182, 212, 0.35)",
  secondaryColor = "rgba(212, 175, 55, 0.2)",
  ...props
}: SpotlightProps) {
  const mouseX = useMotionValue(size / 2);
  const mouseY = useMotionValue(size / 2);
  const springConfig = { damping: 30, stiffness: 150, mass: 0.2 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${spotlightX}px ${spotlightY}px, ${color}, ${secondaryColor}, transparent 70%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(bounds.width / 2);
    mouseY.set(bounds.height / 2);
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-3xl group/spotlight", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        style={{ backgroundImage: background }}
        className="pointer-events-none absolute inset-0 opacity-60 blur-3xl mix-blend-screen transition-opacity duration-500 group-hover/spotlight:opacity-90"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
