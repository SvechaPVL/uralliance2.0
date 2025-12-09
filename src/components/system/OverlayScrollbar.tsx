"use client";

import * as React from "react";

const MIN_THUMB_SIZE = 32;

/**
 * OverlayScrollbar Component (Optimized)
 *
 * Zero React re-renders during scroll.
 * Uses direct DOM manipulation for position updates.
 */
export function OverlayScrollbar() {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const thumbRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | undefined>(undefined);
  const dimensionsRef = React.useRef({
    thumbHeight: MIN_THUMB_SIZE,
    maxThumbOffset: 0,
    maxScroll: 0,
  });
  const isDragging = React.useRef(false);
  const dragState = React.useRef({
    startY: 0,
    startThumbTop: 0,
  });

  // Update thumb position directly (no React re-render)
  const updateThumbPosition = React.useCallback(() => {
    if (!thumbRef.current) return;
    const { maxThumbOffset, maxScroll } = dimensionsRef.current;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbOffset : 0;
    thumbRef.current.style.transform = `translateY(${thumbTop}px)`;
  }, []);

  // Calculate dimensions and update thumb height (only on resize)
  const updateDimensions = React.useCallback(() => {
    if (typeof window === "undefined" || !trackRef.current || !thumbRef.current) return;

    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = scrollHeight - viewportHeight;

    if (maxScroll <= 4) {
      trackRef.current.style.display = "none";
      return;
    }

    trackRef.current.style.display = "flex";
    const trackHeight = viewportHeight - 32; // 16px top + 16px bottom padding
    const thumbHeight = Math.max((viewportHeight / scrollHeight) * trackHeight, MIN_THUMB_SIZE);
    const maxThumbOffset = Math.max(trackHeight - thumbHeight, 0.0001);

    dimensionsRef.current = { thumbHeight, maxThumbOffset, maxScroll };
    thumbRef.current.style.height = `${thumbHeight}px`;

    // Also update position after dimension change
    updateThumbPosition();
  }, [updateThumbPosition]);

  // Scroll handler - direct DOM update via RAF
  React.useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current != null || isDragging.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = undefined;
        updateThumbPosition();
      });
    };

    // Initial setup
    updateDimensions();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions, updateThumbPosition]);

  // Drag handling
  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current || !thumbRef.current) return;
      event.preventDefault();

      const { maxThumbOffset, maxScroll } = dimensionsRef.current;
      const delta = event.clientY - dragState.current.startY;
      const nextThumb = Math.min(
        Math.max(dragState.current.startThumbTop + delta, 0),
        maxThumbOffset
      );
      const ratio = maxThumbOffset > 0 ? nextThumb / maxThumbOffset : 0;

      window.scrollTo({ top: ratio * maxScroll });
      thumbRef.current.style.transform = `translateY(${nextThumb}px)`;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const currentTransform = thumbRef.current?.style.transform || "translateY(0px)";
    const match = currentTransform.match(/translateY\(([^)]+)px\)/);
    const currentTop = match ? parseFloat(match[1]) : 0;

    dragState.current = {
      startY: event.clientY,
      startThumbTop: currentTop,
    };
    isDragging.current = true;
  };

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.thumb === "true") return;
    const { maxScroll } = dimensionsRef.current;
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = event.clientY - rect.top;
    const ratio = offset / rect.height;
    window.scrollTo({ top: ratio * maxScroll });
  };

  return (
    <div
      ref={trackRef}
      className="overlay-scrollbar"
      onPointerDown={handleTrackPointerDown}
      aria-hidden="true"
      style={{ display: "none" }} // Hidden by default, shown after hydration
    >
      <div
        ref={thumbRef}
        data-thumb="true"
        className="overlay-scrollbar__thumb"
        style={{
          height: `${MIN_THUMB_SIZE}px`,
          transform: "translateY(0px)",
        }}
        onPointerDown={handleThumbPointerDown}
      />
    </div>
  );
}
