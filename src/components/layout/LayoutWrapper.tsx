"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OverlayScrollbar } from "@/components/system/OverlayScrollbar";
import { CookieConsent } from "@/components/system/CookieConsent";
import { FloatingContactButton } from "@/components/widgets/FloatingContactButton";
import { LeadCapturePopup } from "@/components/widgets/LeadCapturePopup";
import { PromoBanner } from "@/components/system/PromoBanner";
import { IntroLoaderWrapper } from "@/components/system/IntroLoaderWrapper";
import { HeroProgressProvider } from "@/context/HeroProgressContext";
import { ToastProvider } from "@/components/system/Toast";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { IntroOverlay } from "@/components/system/IntroOverlay";

// Pages that should render without layout (header, footer, etc.)
const MINIMAL_LAYOUT_PATHS = ["/ai-cheatsheet"];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMinimalLayout = MINIMAL_LAYOUT_PATHS.some((path) => pathname?.startsWith(path));

  // Minimal layout - just content
  if (isMinimalLayout) {
    return <main>{children}</main>;
  }

  // Full layout with all components
  return (
    <>
      <IntroOverlay />
      <IntroLoaderWrapper minDisplayTime={5500} />
      <CustomCursor />

      <ToastProvider>
        <HeroProgressProvider>
          <PromoBanner
            id="pensioner-discount"
            badge="Акция"
            message="Скидки для пенсионеров на все услуги!"
            link={{
              href: "/#contact",
              label: "Узнать подробности",
            }}
            variant="legal"
            hideForDays={7}
          />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <OverlayScrollbar />
          <CookieConsent />
          <FloatingContactButton />
          <LeadCapturePopup
            triggers={{
              timeOnSite: 30,
              scrollDepth: 50,
              pageViews: 2,
              exitIntent: true,
            }}
          />
        </HeroProgressProvider>
      </ToastProvider>
    </>
  );
}
