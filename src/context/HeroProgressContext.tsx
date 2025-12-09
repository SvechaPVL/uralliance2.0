"use client";

import * as React from "react";

type HeroProgressContextValue = {
  /** Ref to get current progress without causing re-renders */
  progressRef: React.MutableRefObject<number>;
  /** Subscribe to progress changes for components that need to react */
  subscribe: (callback: (progress: number) => void) => () => void;
  /** Update progress (used by HeroSection) */
  setProgress: (value: number) => void;
};

const HeroProgressContext = React.createContext<HeroProgressContextValue | undefined>(undefined);

/**
 * HeroProgressProvider (Optimized)
 *
 * Uses subscription pattern instead of React state to avoid
 * cascading re-renders on every scroll frame.
 */
export function HeroProgressProvider({ children }: { children: React.ReactNode }) {
  const progressRef = React.useRef(0);
  const subscribersRef = React.useRef<Set<(progress: number) => void>>(new Set());

  const subscribe = React.useCallback((callback: (progress: number) => void) => {
    subscribersRef.current.add(callback);
    // Immediately call with current value
    callback(progressRef.current);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, []);

  const setProgress = React.useCallback((value: number) => {
    if (progressRef.current === value) return;
    progressRef.current = value;
    // Notify subscribers without React re-render
    subscribersRef.current.forEach((cb) => cb(value));
  }, []);

  const value = React.useMemo(
    () => ({
      progressRef,
      subscribe,
      setProgress,
    }),
    [subscribe, setProgress]
  );

  return <HeroProgressContext.Provider value={value}>{children}</HeroProgressContext.Provider>;
}

export function useHeroProgress() {
  const context = React.useContext(HeroProgressContext);
  if (!context) {
    throw new Error("useHeroProgress must be used within a HeroProgressProvider");
  }
  return context;
}

/**
 * Hook for components that need to react to progress changes
 * Uses subscription to avoid re-rendering the entire tree
 */
export function useHeroProgressValue() {
  const { subscribe } = useHeroProgress();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    return subscribe(setProgress);
  }, [subscribe]);

  return progress;
}
