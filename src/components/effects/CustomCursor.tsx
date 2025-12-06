"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";

type CursorVariant = "default" | "pointer" | "text" | "legal" | "tech";

// SSR-safe subscription for mounted state
function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * CustomCursor Component (Optimized)
 *
 * Lightweight cursor with morphing shapes - NO DELAY
 * - SVG arrow cursor in brand colors
 * - Morphs to hand on clickable, text cursor on inputs
 * - Legal gold / Tech cyan theming
 */
export function CustomCursor() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const variantRef = useRef<CursorVariant>("default");
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!mounted) return;

    // Skip on touch devices
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      return;
    }

    // Mouse/pointer move - instant update via RAF
    // Listen to both mousemove and pointermove for compatibility with drag operations
    const handleMove = (e: MouseEvent | PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(posRef.current);
          rafRef.current = 0;
        });
      }
    };

    // Optimized hover detection - no getComputedStyle
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let newVariant: CursorVariant = "default";

      // Data attributes (fastest)
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        const attr = cursorAttr.getAttribute("data-cursor");
        if (attr === "legal" || attr === "tech" || attr === "pointer" || attr === "text") {
          newVariant = attr;
        }
      }
      // Text inputs
      else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        newVariant = "text";
      }
      // Clickable elements
      else if (
        target.closest("a, button, [role='button'], summary") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        // Check brand context via class
        const el = target.closest("a, button, [role='button']") || target;
        const classes = el.className || "";
        if (classes.includes("legal") || el.closest("[class*='legal']")) {
          newVariant = "legal";
        } else if (classes.includes("tech") || el.closest("[class*='tech']")) {
          newVariant = "tech";
        } else {
          newVariant = "pointer";
        }
      }

      // Only update if changed
      if (newVariant !== variantRef.current) {
        variantRef.current = newVariant;
        setVariant(newVariant);
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  // Inverted colors for contrast - legal section gets cyan, tech gets gold
  const colors: Record<CursorVariant, string> = {
    default: "#ffffff",
    pointer: "#ffffff",
    text: "#ffffff",
    legal: "#06B6D4", // cyan on gold background
    tech: "#D4AF37", // gold on cyan background
  };

  const color = colors[variant];

  return (
    <>
      {/* Main cursor - no delay */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {/* Arrow cursor - same style as hand */}
        <div
          className="absolute top-0 left-0 transition-all duration-100"
          style={{
            transform: `translate(-3px, -1px) scale(${variant === "pointer" || variant === "legal" || variant === "tech" || variant === "text" ? 0 : 1})`,
            opacity:
              variant === "pointer" ||
              variant === "legal" ||
              variant === "tech" ||
              variant === "text"
                ? 0
                : 1,
          }}
        >
          {/* Glow behind arrow */}
          <div
            className="absolute -top-1 -left-1 h-10 w-10 animate-pulse rounded-full opacity-60"
            style={{
              background: `radial-gradient(circle, ${color}35 0%, transparent 70%)`,
            }}
          />
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            {/* Arrow outline style - same as hand */}
            <path
              d="M3 1L3 21L7.5 16.5L12 25L15 23.5L10.5 15L17 15L3 1Z"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Hand cursor */}
        <div
          className="absolute top-0 left-0 transition-all duration-100"
          style={{
            transform: `translate(-6px, 0) scale(${variant === "pointer" || variant === "legal" || variant === "tech" ? 1 : 0})`,
            opacity: variant === "pointer" || variant === "legal" || variant === "tech" ? 1 : 0,
          }}
        >
          {(variant === "legal" || variant === "tech") && (
            <div
              className="absolute -top-1 -left-2 h-12 w-12 animate-pulse rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              }}
            />
          )}
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path
              d="M8 8V18M8 8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8V13M8 8C8 7.44772 7.55228 7 7 7C6.44772 7 6 7.44772 6 8V16C6 20.4183 9.58172 24 14 24C17.3137 24 20 21.3137 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13M10 13V8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8V13M12 13C12 12.4477 12.4477 12 13 12C13.5523 12 14 12.4477 14 13M12 13V14M14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13M14 13V14M18 13V14"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Text cursor (I-beam) */}
        <div
          className="absolute top-0 left-0 transition-all duration-100"
          style={{
            transform: `translate(-2px, -10px) scale(${variant === "text" ? 1 : 0})`,
            opacity: variant === "text" ? 1 : 0,
          }}
        >
          <svg width="8" height="24" viewBox="0 0 8 24" fill="none">
            <path d="M1 2H7M1 22H7M4 2V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Trail dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{
          transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
        }}
      >
        <div
          className="h-3 w-3 rounded-full opacity-40 blur-[2px] transition-colors duration-100"
          style={{ backgroundColor: color }}
        />
      </div>
    </>
  );
}
