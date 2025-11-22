"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Particle Interface
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

/**
 * Particles Props
 */
interface ParticlesProps {
  /**
   * Number of particles to render
   * @default 50
   */
  count?: number;

  /**
   * Particle colors (Legal gold / Tech cyan)
   * @default ["#D4AF37", "#06B6D4"]
   */
  colors?: string[];

  /**
   * Particle size range [min, max]
   * @default [1, 3]
   */
  sizeRange?: [number, number];

  /**
   * Animation speed multiplier
   * @default 1
   */
  speed?: number;

  /**
   * Additional className for container
   */
  className?: string;

  /**
   * Disable all pointer events (mobile touch fix)
   * @default true
   */
  disableInteraction?: boolean;
}

/**
 * Particles Component
 *
 * Animated particle effect using Canvas API for Hero section background
 * Creates an ambient, dynamic atmosphere with floating particles
 *
 * Features:
 * - Custom Canvas implementation for performance
 * - Configurable particle count, colors, and speed
 * - Smooth animation using requestAnimationFrame
 * - Responsive to window resize
 * - Respects prefers-reduced-motion (static particles)
 * - Legal gold and Tech cyan color palette
 *
 * @example
 * ```tsx
 * <Particles
 *   count={80}
 *   colors={["#D4AF37", "#06B6D4", "#FFFFFF"]}
 *   speed={0.5}
 * />
 * ```
 */
export function Particles({
  count = 50,
  colors = ["#D4AF37", "#06B6D4"],
  sizeRange = [1, 3],
  speed = 1,
  className = "",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const disableAnimation = prefersReducedMotion;

    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      return { width, height };
    };

    const initParticles = (width: number, height: number) => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 0.5,
        vy: (Math.random() - 0.5) * speed * 0.5,
        radius: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        opacity: 0.3 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const updateParticle = (particle: Particle, width: number, height: number) => {
      if (disableAnimation) return;

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    };

    const renderFrame = (width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        updateParticle(particle, width, height);
        drawParticle(particle);
      });
    };

    let size = resizeCanvas();
    initParticles(size.width, size.height);

    const step = () => {
      renderFrame(size.width, size.height);
      animationFrameRef.current = requestAnimationFrame(step);
    };

    if (disableAnimation) {
      renderFrame(size.width, size.height);
    } else {
      step();
    }

    // Handle window resize
    const handleResize = () => {
      size = resizeCanvas();
      initParticles(size.width, size.height);
      if (disableAnimation) {
        renderFrame(size.width, size.height);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [count, colors, sizeRange, speed, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        touchAction: "none",
        userSelect: "none",
      }}
    />
  );
}
