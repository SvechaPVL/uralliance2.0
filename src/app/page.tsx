import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TechShowcase } from "@/components/sections/TechShowcase";
import { WebProjects } from "@/components/sections/WebProjects";
import { MobileApps } from "@/components/sections/MobileApps";
import { Integration } from "@/components/sections/Integration";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PricePreview } from "@/components/sections/PricePreview";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Home Page
 *
 * Main landing page for Uralliance website
 * Combines Legal and Tech services in a premium dual-identity design
 */
export default function Home() {
  return (
    <>
      {/* Hero Section - US1 */}
      <HeroSection />

      {/* Trust Section - US2 */}
      <TrustSection />

      {/* Services Preview - US2 */}
      <ServicesPreview />

      {/* Tech Showcase - US2 */}
      <TechShowcase />

      {/* Web Projects Showcase - US2 */}
      <WebProjects />

      {/* Mobile Apps Showcase - US2 */}
      <MobileApps />

      {/* Integration Ecosystem - US2 */}
      <Integration />

      {/* Process Timeline - US2 */}
      <ProcessTimeline />

      {/* Partners Section */}
      <PartnersSection />

      {/* Price Preview - US2 */}
      <PricePreview />

      {/* Contact CTA - US3 */}
      <ContactCTA />
    </>
  );
}
