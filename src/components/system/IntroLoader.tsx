"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Vector2D {
  x: number;
  y: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Brand colors
const COLORS = {
  legal: { r: 212, g: 175, b: 55 }, // #d4af37 - золото
  tech: { r: 6, g: 182, b: 212 }, // #06b6d4 - cyan
  white: { r: 226, g: 232, b: 240 }, // #e2e8f0 - text-primary
};

// Performance tiers for adaptive quality
type PerformanceTier = "high" | "medium" | "low" | "minimal";

const PERFORMANCE_CONFIG: Record<
  PerformanceTier,
  { pixelStepsMultiplier: number; skipFrames: number; dprCap: number }
> = {
  high: { pixelStepsMultiplier: 1.0, skipFrames: 0, dprCap: 3 },
  medium: { pixelStepsMultiplier: 1.5, skipFrames: 0, dprCap: 2 },
  low: { pixelStepsMultiplier: 2.5, skipFrames: 1, dprCap: 1.5 },
  minimal: { pixelStepsMultiplier: 4.0, skipFrames: 2, dprCap: 1 },
};

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };

  closeEnoughTarget = 100;
  maxSpeed = 1.0;
  maxForce = 0.1;
  particleSize = 3;
  isKilled = false;

  startColor: RGB = { r: 0, g: 0, b: 0 };
  targetColor: RGB = { r: 0, g: 0, b: 0 };
  colorWeight = 0;
  colorBlendRate = 0.02;

  // Pre-computed current color (avoid object creation every frame)
  currentR = 0;
  currentG = 0;
  currentB = 0;

  move() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;

    // Fast inverse sqrt approximation isn't worth it in JS, but avoid sqrt when possible
    const distSq = dx * dx + dy * dy;
    const distance = Math.sqrt(distSq);

    let proximityMult = 1;
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    if (distance > 0.1) {
      const invDist = 1 / distance;
      const desiredX = dx * invDist * this.maxSpeed * proximityMult;
      const desiredY = dy * invDist * this.maxSpeed * proximityMult;

      let steerX = desiredX - this.vel.x;
      let steerY = desiredY - this.vel.y;

      const steerMagSq = steerX * steerX + steerY * steerY;
      if (steerMagSq > this.maxForce * this.maxForce) {
        const steerMag = Math.sqrt(steerMagSq);
        const invSteer = this.maxForce / steerMag;
        steerX *= invSteer;
        steerY *= invSteer;
      }

      this.vel.x += steerX;
      this.vel.y += steerY;
    }

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  updateColor() {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const w = this.colorWeight;
    this.currentR = (this.startColor.r + (this.targetColor.r - this.startColor.r) * w) | 0;
    this.currentG = (this.startColor.g + (this.targetColor.g - this.startColor.g) * w) | 0;
    this.currentB = (this.startColor.b + (this.targetColor.b - this.startColor.b) * w) | 0;
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2;
      const mag = (width + height) / 2;
      this.target.x = width / 2 + Math.cos(angle) * mag;
      this.target.y = height / 2 + Math.sin(angle) * mag;

      const w = this.colorWeight;
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * w,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * w,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * w,
      };
      this.targetColor = { r: 11, g: 11, b: 12 }; // Background color

      this.colorWeight = 0;
      this.isKilled = true;
    }
  }
}

interface IntroLoaderProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

const WORDS = ["ЮРАЛЬЯНС", "URALLIANCE"];

export function IntroLoader({ onComplete, minDisplayTime = 2500 }: IntroLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const isExitingRef = useRef(false);

  // Performance monitoring refs
  const performanceTierRef = useRef<PerformanceTier>("high");
  const skipFrameCounterRef = useRef(0);
  const fpsHistoryRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(0);
  const fpsCheckIntervalRef = useRef(0);

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    startTimeRef.current = Date.now();
    setIsMounted(true);

    // Detect initial performance tier based on device capabilities
    // FPS monitoring will automatically adjust if needed
    const detectInitialTier = (): PerformanceTier => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        return "minimal";
      }

      // Check hardware capabilities
      const cores = navigator.hardwareConcurrency || 4;
      const dpr = window.devicePixelRatio || 1;
      const isMobile = window.innerWidth < 768;

      // Mobile devices - start at medium, FPS will adjust if needed
      if (isMobile) {
        return "medium";
      }

      // Very low-end device (2 cores or less)
      if (cores <= 2) {
        return "medium";
      }

      // High DPR (3x+) needs more GPU power - start medium
      if (dpr >= 3) {
        return "medium";
      }

      // Default: start high, FPS monitoring will downgrade if laggy
      return "high";
    };

    performanceTierRef.current = detectInitialTier();
  }, []);

  // Get dimensions for canvas
  // CRITICAL: On Android Chrome, document.documentElement.clientHeight returns
  // a value LARGER than the visible viewport (includes area under address bar).
  // The container with `fixed inset-0` matches exactly the visible viewport,
  // so we MUST use container dimensions as the primary source.
  const getCanvasDimensions = useCallback(() => {
    if (typeof window === "undefined") {
      return { width: 1920, height: 1080 };
    }

    // PRIMARY: Use container dimensions - it's fixed inset-0 and matches visible viewport exactly
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return { width: rect.width, height: rect.height };
      }
    }

    // FALLBACK: Use window.innerWidth/Height - NOT documentElement which is wrong on Android
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Safety: ensure we have valid dimensions
    if (width <= 0) width = window.screen.width || 360;
    if (height <= 0) height = window.screen.height || 800;

    return { width, height };
  }, []);

  // Responsive settings based on screen size and performance tier
  const getResponsiveSettings = useCallback(() => {
    const { width } = getCanvasDimensions();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isRetina = dpr >= 2;

    // Apply performance tier settings for particle count only
    const config = PERFORMANCE_CONFIG[performanceTierRef.current];

    // Base pixel steps - higher = fewer particles
    let basePixelSteps = isMobile ? 6 : isTablet ? 6 : isRetina ? 8 : 6;
    // Apply performance multiplier
    const pixelSteps = Math.round(basePixelSteps * config.pixelStepsMultiplier);

    return {
      // More pixel steps = fewer particles (better performance)
      pixelSteps,
      // Larger particles compensate for fewer of them
      particleSizeMin: isMobile ? 1.5 : isRetina ? 2.5 : 2,
      particleSizeMax: isMobile ? 2.5 : isRetina ? 4 : 3,
      // Faster particles on mobile (less distance to travel)
      speedMin: isMobile ? 6 : 8,
      speedMax: isMobile ? 10 : 12,
      // Font size limits
      fontSizeMax: isMobile ? 60 : isTablet ? 80 : 120,
      fontSizeDivisor: isMobile ? 6 : 8,
      // Color blend rate - SLOWER so we can see multicolor effect
      colorBlendRateMin: 0.005,
      colorBlendRateMax: 0.015,
    };
  }, [getCanvasDimensions]);

  const settingsRef = useRef(getResponsiveSettings());

  const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: x + Math.cos(angle) * mag,
      y: y + Math.sin(angle) * mag,
    };
  };

  const getColorForWord = (wordIndex: number): RGB => {
    // Each word converges to a single solid color for readability
    // ЮРАЛЬЯНС = gold (legal), URALLIANCE = cyan (tech)
    return wordIndex === 0 ? COLORS.legal : COLORS.tech;
  };

  const getRandomBrandColor = (): RGB => {
    // Random starting color - particles fly with mixed colors
    return Math.random() > 0.5 ? COLORS.legal : COLORS.tech;
  };

  const nextWord = useCallback((word: string, canvas: HTMLCanvasElement) => {
    const settings = settingsRef.current;
    const dpr = window.devicePixelRatio || 1;

    // Use logical dimensions (CSS pixels) for text positioning
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    const offscreenCanvas = document.createElement("canvas");
    // Offscreen canvas uses logical dimensions (no dpr multiplication)
    offscreenCanvas.width = logicalWidth;
    offscreenCanvas.height = logicalHeight;
    const offscreenCtx = offscreenCanvas.getContext("2d")!;

    // FULL STATE RESET - critical for Android compatibility
    offscreenCtx.setTransform(1, 0, 0, 1, 0, 0); // Reset any transforms
    offscreenCtx.globalAlpha = 1;
    offscreenCtx.globalCompositeOperation = "source-over";
    offscreenCtx.clearRect(0, 0, logicalWidth, logicalHeight); // Clear canvas

    // Responsive font size based on logical width
    const fontSize = Math.min(logicalWidth / settings.fontSizeDivisor, settings.fontSizeMax);

    // CRITICAL: Reset canvas state to avoid inherited RTL or other issues on Android
    offscreenCtx.direction = "ltr";
    offscreenCtx.fillStyle = "white";
    // Use explicit "normal" font-style to prevent italic on Android
    // Format: font-style font-weight font-size font-family
    offscreenCtx.font = `normal bold ${fontSize}px sans-serif`;

    // MANUAL CENTERING - textAlign:center is unreliable on some Android devices
    // Measure text width and calculate position manually
    const textMetrics = offscreenCtx.measureText(word);
    const textWidth = textMetrics.width;
    const textX = (logicalWidth - textWidth) / 2;
    // For vertical centering, use fontSize as approximation (actualBoundingBox not always available)
    const textY = logicalHeight / 2 + fontSize * 0.35; // 0.35 factor for visual center

    offscreenCtx.textAlign = "left"; // Use left align with manual X position
    offscreenCtx.textBaseline = "alphabetic"; // Most reliable baseline
    offscreenCtx.fillText(word, textX, textY);

    const imageData = offscreenCtx.getImageData(0, 0, logicalWidth, logicalHeight);
    const pixels = imageData.data;

    const particles = particlesRef.current;
    let particleIndex = 0;

    const coordsIndexes: number[] = [];
    for (let i = 0; i < pixels.length; i += settings.pixelSteps * 4) {
      coordsIndexes.push(i);
    }

    // Shuffle for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex;
      const alpha = pixels[pixelIndex + 3];

      if (alpha > 0) {
        // Coordinates in logical pixels (CSS pixels)
        // IMPORTANT: Use imageData.width for correct row calculation
        const imgWidth = imageData.width;
        const pixelPos = pixelIndex / 4;
        const x = pixelPos % imgWidth;
        const y = Math.floor(pixelPos / imgWidth);

        let particle: Particle;

        if (particleIndex < particles.length) {
          // Reuse existing particle
          particle = particles[particleIndex];
          particle.isKilled = false;
          particleIndex++;

          // For existing particles: blend current color and set new target
          particle.startColor = {
            r:
              particle.startColor.r +
              (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
            g:
              particle.startColor.g +
              (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
            b:
              particle.startColor.b +
              (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
          };
          particle.targetColor = getColorForWord(wordIndexRef.current);
          particle.colorWeight = 0;
        } else {
          // Create new particle
          particle = new Particle();

          // Use logical dimensions for particle spawning
          const randomPos = generateRandomPos(
            logicalWidth / 2,
            logicalHeight / 2,
            (logicalWidth + logicalHeight) / 2
          );
          particle.pos.x = randomPos.x;
          particle.pos.y = randomPos.y;

          // Responsive particle settings
          const speedRange = settings.speedMax - settings.speedMin;
          particle.maxSpeed = Math.random() * speedRange + settings.speedMin;
          particle.maxForce = particle.maxSpeed * 0.08;

          const sizeRange = settings.particleSizeMax - settings.particleSizeMin;
          particle.particleSize = Math.random() * sizeRange + settings.particleSizeMin;

          // Slower color blend for visible multicolor effect
          const colorBlendRange = settings.colorBlendRateMax - settings.colorBlendRateMin;
          particle.colorBlendRate = Math.random() * colorBlendRange + settings.colorBlendRateMin;

          // NEW particles start with RANDOM color, target is word color
          // This creates the "multicolor flying -> single color forming" effect
          particle.startColor = getRandomBrandColor();
          particle.targetColor = getColorForWord(wordIndexRef.current);
          particle.colorWeight = 0; // Start from random color

          particles.push(particle);
        }

        particle.target.x = x;
        particle.target.y = y;
      }
    }

    // Kill remaining particles (use logical dimensions)
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(logicalWidth, logicalHeight);
    }
  }, []);

  const handleExit = useCallback(() => {
    if (isExitingRef.current) return;
    isExitingRef.current = true;

    const canvas = canvasRef.current;
    if (canvas) {
      // Kill all particles (use logical dimensions)
      const dpr = window.devicePixelRatio || 1;
      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;
      particlesRef.current.forEach((particle) => {
        particle.kill(logicalWidth, logicalHeight);
      });
    }

    // Show main content when loader starts fading out
    document.body.classList.add("intro-complete");

    // SSR overlay is hidden via CSS when body.intro-complete is set
    // No direct DOM manipulation needed - CSS handles opacity transition

    setIsFadingOut(true);

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 800);
  }, [onComplete]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const now = performance.now();
    const config = PERFORMANCE_CONFIG[performanceTierRef.current];

    // FPS monitoring
    if (lastFrameTimeRef.current > 0) {
      const delta = now - lastFrameTimeRef.current;
      const fps = 1000 / delta;
      fpsHistoryRef.current.push(fps);

      // Keep only last 60 frames (1 second at 60fps)
      if (fpsHistoryRef.current.length > 60) {
        fpsHistoryRef.current.shift();
      }

      // Check FPS every 30 frames and adjust tier if needed
      fpsCheckIntervalRef.current++;
      if (fpsCheckIntervalRef.current >= 30 && fpsHistoryRef.current.length >= 30) {
        fpsCheckIntervalRef.current = 0;
        const avgFps =
          fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;

        const currentTier = performanceTierRef.current;
        let newTier = currentTier;

        // Downgrade if FPS is too low
        if (avgFps < 25 && currentTier !== "minimal") {
          const tiers: PerformanceTier[] = ["high", "medium", "low", "minimal"];
          const currentIndex = tiers.indexOf(currentTier);
          newTier = tiers[Math.min(currentIndex + 1, tiers.length - 1)];
        }
        // Upgrade if FPS is good (only if not already high)
        else if (avgFps > 55 && currentTier !== "high") {
          const tiers: PerformanceTier[] = ["high", "medium", "low", "minimal"];
          const currentIndex = tiers.indexOf(currentTier);
          newTier = tiers[Math.max(currentIndex - 1, 0)];
        }

        if (newTier !== currentTier) {
          performanceTierRef.current = newTier;
          settingsRef.current = getResponsiveSettings();
          fpsHistoryRef.current = []; // Reset history after tier change
        }
      }
    }
    lastFrameTimeRef.current = now;

    // Frame skipping for low-end devices
    if (config.skipFrames > 0) {
      skipFrameCounterRef.current++;
      if (skipFrameCounterRef.current <= config.skipFrames) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      skipFrameCounterRef.current = 0;
    }

    const ctx = canvas.getContext("2d")!;
    const particles = particlesRef.current;
    const dpr = window.devicePixelRatio || 1;

    // Logical dimensions (CSS pixels) - ctx is already scaled by dpr
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    // Background with motion blur effect (use logical dimensions)
    ctx.fillStyle = "rgba(11, 11, 12, 0.15)";
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    // Update all particles first (separate update from render for better cache locality)
    let i = 0;
    while (i < particles.length) {
      const particle = particles[i];
      particle.move();
      particle.updateColor();

      if (particle.isKilled) {
        // Check bounds using logical dimensions
        if (
          particle.pos.x < -50 ||
          particle.pos.x > logicalWidth + 50 ||
          particle.pos.y < -50 ||
          particle.pos.y > logicalHeight + 50
        ) {
          // Swap-and-pop: O(1) instead of splice O(n)
          particles[i] = particles[particles.length - 1];
          particles.pop();
          continue; // Don't increment i, process swapped particle
        }
      }
      i++;
    }

    // Batch render particles by color for fewer fillStyle changes
    // Group by approximate color (quantize to reduce unique colors)
    const colorGroups = new Map<string, Particle[]>();

    for (const particle of particles) {
      // Quantize color to reduce unique fillStyle calls (round to nearest 8)
      const qr = (particle.currentR >> 3) << 3;
      const qg = (particle.currentG >> 3) << 3;
      const qb = (particle.currentB >> 3) << 3;
      const key = `${qr},${qg},${qb}`;

      let group = colorGroups.get(key);
      if (!group) {
        group = [];
        colorGroups.set(key, group);
      }
      group.push(particle);
    }

    // Draw particles grouped by color
    for (const [colorKey, group] of colorGroups) {
      const [r, g, b] = colorKey.split(",");
      ctx.fillStyle = `rgb(${r},${g},${b})`;

      for (const particle of group) {
        ctx.fillRect(particle.pos.x, particle.pos.y, particle.particleSize, particle.particleSize);
      }
    }

    frameCountRef.current++;

    // Word transition every 180 frames (~3 seconds at 60fps)
    if (frameCountRef.current % 180 === 0 && !isExitingRef.current) {
      wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
      nextWord(WORDS[wordIndexRef.current], canvas);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [nextWord, getResponsiveSettings]);

  // Handle resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Update responsive settings on resize
      settingsRef.current = getResponsiveSettings();

      const dpr = window.devicePixelRatio || 1;
      const { width: logicalWidth, height: logicalHeight } = getCanvasDimensions();

      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Reset transform before scaling (important for resize)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      // Re-render current word with new settings
      if (particlesRef.current.length > 0) {
        nextWord(WORDS[wordIndexRef.current], canvas);
      }
    };

    // Don't call updateCanvasSize here - initAnimation does it
    // Only listen for resize events
    window.addEventListener("resize", updateCanvasSize);
    // Also listen for visualViewport changes (mobile keyboard, zoom)
    window.visualViewport?.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.visualViewport?.removeEventListener("resize", updateCanvasSize);
    };
  }, [nextWord, getResponsiveSettings, getCanvasDimensions]);

  // Main animation loop
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const initAnimation = async () => {
      // Wait for container to be fully rendered with CORRECT dimensions
      // On Android Chrome, the container may initially have wrong height
      // We need to wait until it matches the expected viewport size
      const waitForContainer = async (): Promise<{ width: number; height: number }> => {
        const expectedWidth = window.innerWidth || window.screen.width || 360;
        const expectedHeight = window.innerHeight || window.screen.height || 800;

        for (let attempt = 0; attempt < 20; attempt++) {
          await new Promise((r) => requestAnimationFrame(r));

          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Check that dimensions are valid AND height is reasonable
            // For portrait mode, height should be >= width
            // Also check that height is close to expected (within 20%)
            const heightIsReasonable =
              rect.height > 0 &&
              (rect.height >= rect.width * 0.8 || // Portrait or near-square
                Math.abs(rect.height - expectedHeight) < expectedHeight * 0.2); // Close to expected

            if (rect.width > 0 && heightIsReasonable) {
              return { width: rect.width, height: rect.height };
            }
          }

          // Increasing delay between retries
          await new Promise((r) => setTimeout(r, 30 + attempt * 10));
        }

        // Final fallback - use window dimensions directly
        console.warn("IntroLoader: Using window dimensions as fallback");
        return { width: expectedWidth, height: expectedHeight };
      };

      // Get settings for particle optimization
      settingsRef.current = getResponsiveSettings();
      const dpr = window.devicePixelRatio || 1;
      const { width: logicalWidth, height: logicalHeight } = await waitForContainer();

      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Fill initial background (use logical dimensions since ctx is scaled)
      if (ctx) {
        ctx.fillStyle = "#0b0b0c";
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      }

      // Start with first word
      nextWord(WORDS[0], canvas);

      // Start animation
      animate();
    };

    initAnimation();

    // Simple fixed-time display - show for exactly minDisplayTime
    // This ensures particles have time to form the word regardless of page load state
    const exitTimeout = setTimeout(() => {
      if (!isExitingRef.current) {
        handleExit();
      }
    }, minDisplayTime);

    // Fallback: exit after max time (safety net)
    const maxTimeout = setTimeout(
      () => {
        if (!isExitingRef.current) {
          handleExit();
        }
      },
      Math.max(minDisplayTime + 1000, 8000)
    );

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(exitTimeout);
      clearTimeout(maxTimeout);
    };
  }, [isMounted, animate, nextWord, minDisplayTime, handleExit, getCanvasDimensions, getResponsiveSettings]);

  // Don't render on server or after hiding
  if (!isMounted || !isVisible) return null;

  return (
    <div
      ref={containerRef}
      data-intro-loader
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-700 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#0b0b0c" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(70% 60% at 15% 25%, rgba(212, 175, 55, 0.08), transparent 65%),
            radial-gradient(70% 60% at 85% 25%, rgba(6, 182, 212, 0.08), transparent 65%)
          `,
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleExit}
        className="absolute right-8 bottom-8 z-10 text-sm text-white/40 transition-colors duration-300 hover:text-white/70"
        aria-label="Пропустить"
      >
        Пропустить →
      </button>
    </div>
  );
}
