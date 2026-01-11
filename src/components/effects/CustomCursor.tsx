"use client";

import { useEffect, useRef, useCallback, useSyncExternalStore } from "react";

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

// Colors for each variant
const COLORS: Record<CursorVariant, string> = {
  default: "#ffffff",
  pointer: "#ffffff",
  text: "#ffffff",
  legal: "#06B6D4",
  tech: "#D4AF37",
};

/**
 * CustomCursor Component (Optimized)
 *
 * Zero React re-renders during mouse movement.
 * Uses direct DOM manipulation for position updates.
 */
export function CustomCursor() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<CursorVariant>("default");
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  // Apply variant styles directly to DOM
  const applyVariant = useCallback((variant: CursorVariant) => {
    if (!arrowRef.current || !handRef.current || !textRef.current) return;

    const color = COLORS[variant];
    const isPointer = variant === "pointer" || variant === "legal" || variant === "tech";
    const isText = variant === "text";

    // Arrow cursor
    arrowRef.current.style.transform = `translate(-3px, -1px) scale(${isPointer || isText ? 0 : 1})`;
    arrowRef.current.style.opacity = isPointer || isText ? "0" : "1";
    const arrowPath = arrowRef.current.querySelector("path");
    if (arrowPath) arrowPath.setAttribute("stroke", color);

    // Hand cursor
    handRef.current.style.transform = `translate(-6px, 0) scale(${isPointer ? 1 : 0})`;
    handRef.current.style.opacity = isPointer ? "1" : "0";
    const handPath = handRef.current.querySelector("path");
    if (handPath) handPath.setAttribute("stroke", color);

    // Text cursor
    textRef.current.style.transform = `translate(-2px, -10px) scale(${isText ? 1 : 0})`;
    textRef.current.style.opacity = isText ? "1" : "0";
    const textPath = textRef.current.querySelector("path");
    if (textPath) textPath.setAttribute("stroke", color);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Skip custom cursor on devices with touchscreen (Surface, touchscreen laptops)
    // These devices often have weaker GPUs and the custom cursor causes lag
    const hasTouchscreen = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    // Skip if: touchscreen device, prefers reduced motion, or no mouse/trackpad
    if (hasTouchscreen || prefersReducedMotion || !hasFinePointer || !hasHover) {
      return;
    }

    // Direct DOM position update - no React re-render
    const handleMove = (e: PointerEvent) => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
          rafRef.current = 0;
        });
      }
    };

    // Optimized hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let newVariant: CursorVariant = "default";

      // Data attributes (fastest path)
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        const attr = cursorAttr.getAttribute("data-cursor") as CursorVariant;
        if (attr === "legal" || attr === "tech" || attr === "pointer" || attr === "text") {
          newVariant = attr;
        }
      }
      // Text inputs (except checkboxes and radios)
      else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        const inputType = (target as HTMLInputElement).type;
        if (inputType === "checkbox" || inputType === "radio") {
          newVariant = "pointer";
        } else {
          newVariant = "text";
        }
      }
      // Labels associated with checkboxes/radios
      else if (target.tagName === "LABEL") {
        const labelFor = (target as HTMLLabelElement).htmlFor;
        if (labelFor) {
          const input = document.getElementById(labelFor) as HTMLInputElement | null;
          if (input && (input.type === "checkbox" || input.type === "radio")) {
            newVariant = "pointer";
          }
        }
      }
      // Clickable elements
      else {
        const clickable = target.closest("a, button, [role='button'], summary");
        if (clickable || target.tagName === "A" || target.tagName === "BUTTON") {
          const el = clickable || target;
          const classes = el.className?.toString() || "";

          if (classes.includes("legal")) {
            newVariant = "legal";
          } else if (classes.includes("tech")) {
            newVariant = "tech";
          } else {
            newVariant = "pointer";
          }
        }
      }

      // Only update DOM if changed
      if (newVariant !== variantRef.current) {
        variantRef.current = newVariant;
        applyVariant(newVariant);
      }
    };

    // Hide cursor when mouse leaves the window
    const handleMouseLeave = () => {
      if (cursorRef.current && isVisibleRef.current) {
        isVisibleRef.current = false;
        cursorRef.current.style.opacity = "0";
      }
    };

    // Show cursor when mouse enters the window
    const handleMouseEnter = () => {
      if (cursorRef.current && !isVisibleRef.current) {
        isVisibleRef.current = true;
        cursorRef.current.style.opacity = "1";
      }
    };

    // Single event listener - pointermove covers mouse
    document.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, applyVariant]);

  if (!mounted) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100000] hidden md:block"
      style={{ transform: "translate(-100px, -100px)" }}
    >
      {/* Arrow cursor */}
      <div
        ref={arrowRef}
        className="absolute top-0 left-0"
        style={{
          transform: "translate(-3px, -1px) scale(1)",
          opacity: 1,
          transition: "transform 100ms, opacity 100ms",
        }}
      >
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
          <path
            d="M3 1L3 21L7.5 16.5L12 25L15 23.5L10.5 15L17 15L3 1Z"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Hand cursor */}
      <div
        ref={handRef}
        className="absolute top-0 left-0"
        style={{
          transform: "translate(-6px, 0) scale(0)",
          opacity: 0,
          transition: "transform 100ms, opacity 100ms",
        }}
      >
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
          <path
            d="M8 8V18M8 8C8 7.44772 8.44772 7 9 7C9.55228 7 10 7.44772 10 8V13M8 8C8 7.44772 7.55228 7 7 7C6.44772 7 6 7.44772 6 8V16C6 20.4183 9.58172 24 14 24C17.3137 24 20 21.3137 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13M10 13V8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8V13M12 13C12 12.4477 12.4477 12 13 12C13.5523 12 14 12.4477 14 13M12 13V14M14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13M14 13V14M18 13V14"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Text cursor (I-beam) */}
      <div
        ref={textRef}
        className="absolute top-0 left-0"
        style={{
          transform: "translate(-2px, -10px) scale(0)",
          opacity: 0,
          transition: "transform 100ms, opacity 100ms",
        }}
      >
        <svg width="8" height="24" viewBox="0 0 8 24" fill="none">
          <path d="M1 2H7M1 22H7M4 2V22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
