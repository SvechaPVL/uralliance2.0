/**
 * SSR-rendered black overlay that hides content until IntroLoader is ready.
 * This prevents flash of content before the intro animation starts.
 *
 * The overlay is removed by IntroLoader when it adds 'intro-complete' class to body.
 */

export function IntroOverlay() {
  return (
    <div
      id="intro-overlay"
      className="pointer-events-none fixed inset-0 z-[99998] bg-[#0b0b0c] transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
