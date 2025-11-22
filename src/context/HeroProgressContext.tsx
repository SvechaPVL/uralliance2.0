"use client";

import * as React from "react";

type HeroProgressContextValue = {
  progress: number;
  setProgress: (value: number) => void;
};

const HeroProgressContext = React.createContext<HeroProgressContextValue | undefined>(undefined);

export function HeroProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = React.useState(0);
  const value = React.useMemo(() => ({ progress, setProgress }), [progress]);

  return <HeroProgressContext.Provider value={value}>{children}</HeroProgressContext.Provider>;
}

export function useHeroProgress() {
  const context = React.useContext(HeroProgressContext);
  if (!context) {
    throw new Error("useHeroProgress must be used within a HeroProgressProvider");
  }
  return context;
}
