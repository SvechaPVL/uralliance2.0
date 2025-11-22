"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/primitives/heading";
import { Label } from "@/components/primitives/label";
import type { BentoGridItem } from "./BentoGrid";

interface CardSwiperProps {
  items: BentoGridItem[];
  cardWidth?: number;
  className?: string;
}

export const CardSwiper: React.FC<CardSwiperProps> = ({
  items,
  cardWidth = 320,
  className = "",
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: items.length }, (_, i) => i)
  );

  const getDurationFromCSS = useCallback(
    (variableName: string, element?: HTMLElement | null): number => {
      const targetElement = element || document.documentElement;
      const value = getComputedStyle(targetElement)?.getPropertyValue(variableName)?.trim();
      if (!value) return 300;
      if (value.endsWith("ms")) return parseFloat(value);
      if (value.endsWith("s")) return parseFloat(value) * 1000;
      return parseFloat(value) || 300;
    },
    []
  );

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll(".swiper-card")] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards();
    return cards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    cards.forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1";
    });
  }, [getCards]);

  const applySwipeStyles = useCallback(
    (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      card.style.setProperty("--swipe-x", `${deltaX}px`);
      card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`);
      card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75).toString();
    },
    [getActiveCard]
  );

  const handleStart = useCallback(
    (clientX: number) => {
      if (isSwiping.current) return;
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    },
    [getActiveCard]
  );

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 50;
    const duration = getDurationFromCSS("--card-swap-duration", cardStackRef.current);
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty("--swipe-x", `${direction * 300}px`);
        card.style.setProperty("--swipe-rotate", `${direction * 20}deg`);

        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`);
          }
        }, duration * 0.5);

        setTimeout(() => {
          setCardOrder((prev) => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isSwiping.current) return;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        currentX.current = clientX;
        const deltaX = currentX.current - startX.current;
        applySwipeStyles(deltaX);

        if (Math.abs(deltaX) > 50) {
          handleEnd();
        }
      });
    },
    [applySwipeStyles, handleEnd]
  );

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      handleStart(e.clientX);
    };
    const handlePointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };
    const handlePointerUp = () => {
      handleEnd();
    };

    cardStackElement.addEventListener("pointerdown", handlePointerDown);
    cardStackElement.addEventListener("pointermove", handlePointerMove);
    cardStackElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      cardStackElement.removeEventListener("pointerdown", handlePointerDown);
      cardStackElement.removeEventListener("pointermove", handlePointerMove);
      cardStackElement.removeEventListener("pointerup", handlePointerUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <section
      className={cn(
        "relative mx-auto select-none",
        "h-[600px]", // Фиксированная высота для карточек
        // Уменьшаем showcase компоненты на мобилке
        "[&_.showcase-container]:origin-top [&_.showcase-container]:scale-75",
        className
      )}
      ref={cardStackRef}
      style={
        {
          width: "100%",
          maxWidth: cardWidth + 32,
          touchAction: "none",
          transformStyle: "preserve-3d",
          "--card-perspective": "700px",
          "--card-z-offset": "12px",
          "--card-y-offset": "7px",
          "--card-max-z-index": items.length.toString(),
          "--card-swap-duration": "300ms",
        } as React.CSSProperties
      }
    >
      {cardOrder.map((originalIndex, displayIndex) => {
        const item = items[originalIndex];
        const cardContent = (
          <div className="relative flex flex-col gap-3">
            {item.icon && <div className="text-[var(--color-tech-primary)]">{item.icon}</div>}
            {item.badge && (
              <Label
                as="span"
                size="sm"
                spacing="wider"
                tone="muted"
                className="inline-flex w-fit items-center rounded-full border border-[var(--color-border-soft)] px-3 py-1"
              >
                {item.badge}
              </Label>
            )}
            {item.content ? (
              item.content
            ) : (
              <>
                {item.title && (
                  <Heading as="h3" size="md" weight="semibold">
                    {item.title}
                  </Heading>
                )}
                {item.description && (
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.description}</p>
                )}
              </>
            )}
          </div>
        );

        const cardClassName = cn(
          "swiper-card absolute cursor-grab active:cursor-grabbing",
          "left-1/2 top-1/2",
          "rounded-3xl border border-[var(--color-border)]",
          "bg-[var(--color-card-bg)]/90 backdrop-blur-xl p-6",
          "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]",
          "overflow-hidden will-change-transform",
          item.className
        );

        return (
          <article
            key={`${item.id ?? originalIndex}-${originalIndex}`}
            className={cardClassName}
            style={
              {
                "--i": (displayIndex + 1).toString(),
                zIndex: items.length - displayIndex,
                width: cardWidth,
                transform: `translate(-50%, -50%)
                           perspective(var(--card-perspective))
                           translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                           translateY(calc(var(--card-y-offset) * var(--i)))
                           translateX(var(--swipe-x, 0px))
                           rotateY(var(--swipe-rotate, 0deg))`,
              } as React.CSSProperties
            }
          >
            {item.href ? (
              <Link href={item.href} className="flex flex-col">
                {cardContent}
                <div className="relative mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  Подробнее
                  <span>→</span>
                </div>
              </Link>
            ) : (
              cardContent
            )}
          </article>
        );
      })}
    </section>
  );
};
