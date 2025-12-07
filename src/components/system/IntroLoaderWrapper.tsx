"use client";

import dynamic from "next/dynamic";

const IntroLoader = dynamic(() => import("./IntroLoader").then((mod) => mod.IntroLoader), {
  ssr: false,
});

interface IntroLoaderWrapperProps {
  minDisplayTime?: number;
}

export function IntroLoaderWrapper({ minDisplayTime = 2500 }: IntroLoaderWrapperProps) {
  return <IntroLoader minDisplayTime={minDisplayTime} />;
}
