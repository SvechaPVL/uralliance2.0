"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Brand color hues for particles:
 * - Legal (Gold): HSL hue ~45
 * - Tech (Cyan): HSL hue ~185
 */
const BRAND_HUES = {
  legal: 45, // Gold #d4af37
  tech: 187, // Cyan #06b6d4
} as const;

interface VortexBackgroundProps {
  className?: string;
  containerClassName?: string;
  /**
   * Number of particles (default: 500)
   */
  particleCount?: number;
  /**
   * Color mode: "dual" uses both brand colors, "legal" or "tech" for single color
   */
  colorMode?: "dual" | "legal" | "tech";
  /**
   * Base speed of particles (default: 0.1)
   */
  baseSpeed?: number;
  /**
   * Background opacity (0-1), lower = more transparent to show gradient behind
   */
  backgroundOpacity?: number;
  /**
   * Mouse interaction strength (0 = disabled, higher = stronger attraction)
   */
  mouseInfluence?: number;
  /**
   * Radius of mouse influence in pixels
   */
  mouseRadius?: number;
}

export function VortexBackground({
  className,
  containerClassName,
  particleCount = 500,
  colorMode = "dual",
  baseSpeed = 0.1,
  backgroundOpacity = 0.3,
  mouseInfluence = 0.15,
  mouseRadius = 250,
}: VortexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const drawRef = useRef<
    ((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) | null
  >(null);
  const prefersReducedMotion = useReducedMotion();

  // Mobile detection for adaptive rendering
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Particle system constants - adaptive for mobile
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const baseTTL = isMobile ? 60 : 80;
  const rangeTTL = isMobile ? 150 : 200;
  const rangeSpeed = isMobile ? 1.0 : 1.2;
  const baseRadius = isMobile ? 0.8 : 1;
  const rangeRadius = isMobile ? 2 : 2.5;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0003;

  const TAU = 2 * Math.PI;

  // Refs for mutable state
  const tickRef = useRef(0);
  const noise3DRef = useRef(createNoise3D());
  const particlePropsRef = useRef(new Float32Array(particlePropsLength));
  const centerRef = useRef<[number, number]>([0, 0]);
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Mouse position tracking
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const rand = (n: number): number => n * Math.random();
  const fadeInOut = (t: number, m: number): number => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1: number, n2: number, speed: number): number => (1 - speed) * n1 + speed * n2;

  /**
   * Get hue based on color mode
   */
  const getHue = useCallback((): number => {
    if (colorMode === "legal") return BRAND_HUES.legal;
    if (colorMode === "tech") return BRAND_HUES.tech;
    // Dual mode: randomly pick between legal and tech
    return Math.random() > 0.5 ? BRAND_HUES.legal : BRAND_HUES.tech;
  }, [colorMode]);

  const initParticle = useCallback(
    (i: number) => {
      const { width, height } = sizeRef.current;
      if (!width || !height) return;

      // Spawn particles across entire section
      const x = rand(width);
      const y = rand(height);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = getHue();

      particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    },
    [baseSpeed, getHue, baseTTL, rangeTTL, rangeSpeed, baseRadius, rangeRadius]
  );

  const initParticles = useCallback(() => {
    tickRef.current = 0;
    particlePropsRef.current = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }, [particlePropsLength, initParticle]);

  const checkBounds = (x: number, y: number): boolean => {
    const { width, height } = sizeRef.current;
    return x > width || x < 0 || y > height || y < 0;
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    // Subtle background effect - slightly more visible
    ctx.strokeStyle = `hsla(${hue}, 75%, 50%, ${fadeInOut(life, ttl) * 0.7})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const updateParticle = useCallback(
    (i: number, ctx: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const props = particlePropsRef.current;
      const tick = tickRef.current;
      const noise3D = noise3DRef.current;
      const mouse = mouseRef.current;

      const i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i,
        i9 = 8 + i;

      const x = props[i];
      const y = props[i2];
      const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;

      // Base velocity from noise
      let vx = lerp(props[i3], Math.cos(n), 0.5);
      let vy = lerp(props[i4], Math.sin(n), 0.5);

      // Mouse influence - create vortex/attraction effect
      if (mouse.active && mouseInfluence > 0) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 1) {
          // Normalized distance (0 = at cursor, 1 = at edge of radius)
          const normalizedDist = dist / mouseRadius;
          // Influence falls off with distance (stronger near cursor)
          const influence = (1 - normalizedDist) * mouseInfluence;

          // Create swirling vortex effect
          // Tangent vector (perpendicular to direction towards cursor) creates rotation
          const tangentX = -dy / dist;
          const tangentY = dx / dist;

          // Attraction towards cursor
          const attractX = dx / dist;
          const attractY = dy / dist;

          // Combine tangent (swirl) and attraction
          // Strong swirl creates visible vortex effect
          const swirlFactor = 1.2;
          const attractFactor = 0.5;

          vx += (tangentX * swirlFactor + attractX * attractFactor) * influence * 4;
          vy += (tangentY * swirlFactor + attractY * attractFactor) * influence * 4;
        }
      }

      let life = props[i5];
      const ttl = props[i6];
      const speed = props[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = props[i8];
      const hue = props[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

      life++;

      props[i] = x2;
      props[i2] = y2;
      props[i3] = vx;
      props[i4] = vy;
      props[i5] = life;

      if (checkBounds(x, y) || life > ttl) {
        initParticle(i);
      }
    },
    [initParticle, mouseInfluence, mouseRadius]
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i, ctx);
      }
    },
    [particlePropsLength, updateParticle]
  );

  const renderGlow = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Subtle glow for background effect
    ctx.save();
    ctx.filter = "blur(6px) brightness(130%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.6;
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const draw = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      if (prefersReducedMotion) return;

      // Skip animation when not visible (performance optimization)
      if (!isVisibleRef.current) {
        return;
      }

      tickRef.current++;

      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Simple dark background for motion blur effect
      if (backgroundOpacity > 0) {
        ctx.fillStyle = `rgba(11, 11, 12, ${backgroundOpacity})`;
        ctx.fillRect(0, 0, width, height);
      }

      drawParticles(ctx);
      renderGlow(canvas, ctx);
      renderToScreen(canvas, ctx);

      animationRef.current = window.requestAnimationFrame(() => {
        drawRef.current?.(canvas, ctx);
      });
    },
    [prefersReducedMotion, backgroundOpacity, drawParticles]
  );

  // Keep drawRef in sync
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  const resize = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null) => {
      // Use container size instead of window size
      const container = containerRef.current;
      const width = container?.clientWidth || window.innerWidth;
      const height = container?.clientHeight || window.innerHeight;

      // Use devicePixelRatio for sharp rendering on retina displays
      // On mobile, cap at 2 to save GPU resources
      const dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 2)
        : window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Store logical size for particle bounds checking
      sizeRef.current = { width, height };

      // On mobile, shift vortex center higher (35% from top instead of 50%)
      const centerY = isMobile ? 0.35 * height : 0.5 * height;
      centerRef.current = [0.5 * width, centerY];
    },
    [isMobile]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resize(canvas, ctx);
    initParticles();

    if (!prefersReducedMotion) {
      draw(canvas, ctx);
    }

    const handleResize = () => {
      // Reset transform before resize to avoid stacking scales
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize(canvas, ctx);
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    // IntersectionObserver to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting ?? true;
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = isVisible;

        // Restart animation when becoming visible again
        if (isVisible && !wasVisible && !prefersReducedMotion) {
          draw(canvas, ctx);
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resize, initParticles, draw, prefersReducedMotion]);

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={cn("relative h-full w-full", containerClassName)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.25),rgba(212,175,55,0.15),transparent_70%)]" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </motion.div>

      {className && <div className={cn("relative z-10", className)} />}
    </div>
  );
}
