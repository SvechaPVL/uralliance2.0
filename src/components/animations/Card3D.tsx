"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface Card3DProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
  > {
  /**
   * Maximum rotation in degrees
   * @default 6
   */
  maxRotation?: number;
  /**
   * Perspective distance in px
   * @default 1200
   */
  perspective?: number;
  /**
   * Depth offset applied to the content block
   * @default 45
   */
  depth?: number;
}

export function Card3D({
  maxRotation = 6,
  perspective = 1200,
  depth = 45,
  className,
  children,
  ...props
}: Card3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef<number>(0);

  // Lighter spring config - less stiffness = fewer calculations
  const springConfig = { damping: 25, stiffness: 80, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [`${maxRotation}deg`, `-${maxRotation}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${maxRotation}deg`, `${maxRotation}deg`]);

  // RAF-throttled pointer handler to reduce calculations
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;

      // Throttle with RAF - only update once per frame
      if (rafRef.current) return;

      // Capture values immediately (event object is pooled/recycled)
      const rect = event.currentTarget.getBoundingClientRect();
      const clientX = event.clientX;
      const clientY = event.clientY;

      rafRef.current = requestAnimationFrame(() => {
        const xPct = (clientX - rect.left) / rect.width - 0.5;
        const yPct = (clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
        rafRef.current = 0;
      });
    },
    [prefersReducedMotion, mouseX, mouseY]
  );

  const resetTilt = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const shouldTilt = !prefersReducedMotion;

  return (
    <div className="h-full w-full" style={{ perspective: `${perspective}px` }}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={{
          rotateX: shouldTilt ? rotateX : "0deg",
          rotateY: shouldTilt ? rotateY : "0deg",
          transformStyle: "preserve-3d",
          willChange: shouldTilt ? "transform" : "auto",
        }}
        className="h-full w-full"
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-3xl border border-[var(--color-border)] p-6",
            // Solid background - no backdrop-blur with 3D transforms (causes lag)
            "bg-[var(--color-background-secondary)]",
            className
          )}
          style={{
            transform: shouldTilt ? `translateZ(${depth}px)` : undefined,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
