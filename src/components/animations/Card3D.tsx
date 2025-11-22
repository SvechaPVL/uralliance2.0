"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface Card3DProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
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

  const springConfig = { damping: 18, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [`${maxRotation}deg`, `-${maxRotation}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`-${maxRotation}deg`, `${maxRotation}deg`]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
        }}
        className="h-full w-full"
        {...props}
      >
        <div
          className={cn(
            "rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)]/80 backdrop-blur-lg p-6 will-change-transform",
            className
          )}
          style={{
            transform: shouldTilt ? `translateZ(${depth}px)` : undefined,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
