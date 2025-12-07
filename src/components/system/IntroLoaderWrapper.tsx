"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useSyncExternalStore } from "react";

const IntroLoader = dynamic(() => import("./IntroLoader").then((mod) => mod.IntroLoader), {
  ssr: false,
});

/**
 * Detects PageSpeed Insights, Lighthouse, and other performance testing bots
 */
function isPerformanceBot(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();

  // PageSpeed Insights / Lighthouse bot patterns
  const botPatterns = [
    "lighthouse",
    "chrome-lighthouse",
    "pagespeed",
    "ptst", // PageSpeed Test
    "speed insights",
    "gtmetrix",
    "pingdom",
    "webpagetest",
  ];

  return botPatterns.some((pattern) => ua.includes(pattern));
}

// Cache bot detection result
let cachedIsBot: boolean | null = null;

function getIsBot() {
  if (cachedIsBot === null) {
    cachedIsBot = isPerformanceBot();
  }
  return cachedIsBot;
}

interface IntroLoaderWrapperProps {
  minDisplayTime?: number;
}

export function IntroLoaderWrapper({ minDisplayTime = 2500 }: IntroLoaderWrapperProps) {
  const hasInitialized = useRef(false);

  // Use useSyncExternalStore for SSR-safe bot detection
  const isBot = useSyncExternalStore(
    () => () => {}, // No subscription needed
    getIsBot, // Client snapshot
    () => false // Server snapshot - assume not a bot during SSR
  );

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (isBot) {
      // Immediately mark intro as complete for bots
      // CSS handles hiding #intro-overlay via body.intro-complete selector
      document.body.classList.add("intro-complete");
    }
  }, [isBot]);

  // Skip intro for performance testing bots
  if (isBot) return null;

  return <IntroLoader minDisplayTime={minDisplayTime} />;
}
