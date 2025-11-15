"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * MagneticButton Props
 */
interface MagneticButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode;

  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Maximum magnetic pull distance in pixels
   * @default 30
   */
  strength?: number;

  /**
   * Spring stiffness (higher = snappier)
   * @default 150
   */
  stiffness?: number;

  /**
   * Spring damping (higher = less bouncy)
   * @default 15
   */
  damping?: number;
}

/**
 * MagneticButton Component
 *
 * Interactive button that smoothly follows cursor movement with spring physics
 * Creates a magnetic attraction effect for premium UX
 *
 * Features:
 * - Spring-based animation using Framer Motion useSpring
 * - Configurable magnetic strength and spring physics
 * - Automatically returns to center when cursor leaves
 * - Respects prefers-reduced-motion (disables effect)
 * - Smooth interpolation for natural movement
 *
 * @example
 * ```tsx
 * <MagneticButton strength={40} stiffness={200}>
 *   <Button variant="primary-tech">
 *     Click Me
 *   </Button>
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  className,
  strength = 30,
  stiffness = 150,
  damping = 15,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness, damping });
  const y = useSpring(targetY, { stiffness, damping });
  const scaleTarget = useMotionValue(1);
  const scale = useSpring(scaleTarget, { stiffness: stiffness * 0.8, damping });

  const clamp = (value: number, max: number) => {
    if (value > max) return max;
    if (value < -max) return -max;
    return value;
  };

  // Handle mouse move within the button
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic pull (limited by strength)
    const pullX = clamp((distanceX / rect.width) * strength, strength);
    const pullY = clamp((distanceY / rect.height) * strength, strength);

    targetX.set(pullX);
    targetY.set(pullY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    targetX.set(0);
    targetY.set(0);
    scaleTarget.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (prefersReducedMotion) return;
        scaleTarget.set(1.03);
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        x: prefersReducedMotion ? 0 : x,
        y: prefersReducedMotion ? 0 : y,
        scale: prefersReducedMotion ? 1 : scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
