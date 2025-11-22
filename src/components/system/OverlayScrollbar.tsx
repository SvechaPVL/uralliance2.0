"use client";

import * as React from "react";

const MIN_THUMB_SIZE = 32;

type ScrollbarState = {
  visible: boolean;
  thumbHeight: number;
  thumbTop: number;
  maxThumbOffset: number;
  maxScroll: number;
};

export function OverlayScrollbar() {
  const [state, setState] = React.useState<ScrollbarState>({
    visible: false,
    thumbHeight: MIN_THUMB_SIZE,
    thumbTop: 0,
    maxThumbOffset: 0,
    maxScroll: 0,
  });
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const dragState = React.useRef({
    startY: 0,
    startThumbTop: 0,
    maxThumbOffset: 0,
    maxScroll: 0,
  });
  const isDragging = React.useRef(false);
  const rafRef = React.useRef<number | undefined>(undefined);

  const scheduleUpdate = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = scrollHeight - viewportHeight;
    const visible = maxScroll > 4;

    if (!visible) {
      setState((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }

    const trackHeight = viewportHeight;
    const thumbHeight = Math.max((viewportHeight / scrollHeight) * trackHeight, MIN_THUMB_SIZE);
    const maxThumbOffset = Math.max(trackHeight - thumbHeight, 0.0001);
    const scrollTop = window.scrollY || doc.scrollTop;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbOffset : 0;

    setState({
      visible: true,
      thumbHeight,
      thumbTop,
      maxThumbOffset,
      maxScroll,
    });
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = undefined;
        scheduleUpdate();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scheduleUpdate]);

  const stopDragging = React.useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
  }, []);

  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current) return;
      event.preventDefault();
      const { startY, startThumbTop, maxThumbOffset, maxScroll } = dragState.current;
      const delta = event.clientY - startY;
      const nextThumb = Math.min(Math.max(startThumbTop + delta, 0), maxThumbOffset);
      const ratio = maxThumbOffset > 0 ? nextThumb / maxThumbOffset : 0;
      window.scrollTo({ top: ratio * maxScroll });
    };

    const handlePointerUp = () => {
      stopDragging();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [stopDragging]);

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!state.visible) return;
    event.preventDefault();
    dragState.current = {
      startY: event.clientY,
      startThumbTop: state.thumbTop,
      maxThumbOffset: state.maxThumbOffset,
      maxScroll: state.maxScroll,
    };
    isDragging.current = true;
  };

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!state.visible) return;
    if ((event.target as HTMLElement).dataset.thumb === "true") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offset = event.clientY - rect.top;
    const ratio = offset / rect.height;
    window.scrollTo({ top: ratio * state.maxScroll });
  };

  if (!state.visible) return null;

  return (
    <div
      ref={trackRef}
      className="overlay-scrollbar"
      onPointerDown={handleTrackPointerDown}
      aria-hidden="true"
    >
      <div
        data-thumb="true"
        className="overlay-scrollbar__thumb"
        style={{
          height: `${state.thumbHeight}px`,
          transform: `translateY(${state.thumbTop}px)`,
        }}
        onPointerDown={handleThumbPointerDown}
      />
    </div>
  );
}
