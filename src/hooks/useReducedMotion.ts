import { useSyncExternalStore } from "react";

/**
 * useReducedMotion Hook
 *
 * Detects if the user has enabled "prefers-reduced-motion" in their system settings
 * and updates when the preference changes. This is critical for accessibility (WCAG 2.1 AA).
 *
 * Use this hook to conditionally disable or reduce animations for users who prefer
 * less motion, preventing vestibular disorders or motion sickness.
 *
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 *
 * @example
 * ```tsx
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <motion.div
 *       animate={{ opacity: 1 }}
 *       transition={{
 *         duration: prefersReducedMotion ? 0 : 0.5
 *       }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function Hero() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   useEffect(() => {
 *     if (!prefersReducedMotion) {
 *       // Initialize GSAP animations
 *       gsap.to('.hero-title', { y: 0, opacity: 1 });
 *     }
 *   }, [prefersReducedMotion]);
 *
 *   return <div className="hero-title">Welcome</div>;
 * }
 * ```
 */
const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

const getMediaQuery = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.matchMedia(MEDIA_QUERY);
};

const subscribe = (callback: () => void) => {
  const mediaQuery = getMediaQuery();

  if (!mediaQuery) {
    return () => {};
  }

  const handler = () => callback();

  if ("addEventListener" in mediaQuery) {
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }

  (mediaQuery as any).addListener(handler);
  return () => {
    (mediaQuery as any).removeListener(handler);
  };
};

const getSnapshot = () => {
  const mediaQuery = getMediaQuery();
  return mediaQuery ? mediaQuery.matches : false;
};

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
