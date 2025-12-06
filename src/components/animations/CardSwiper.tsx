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
  const activeCardRef = useRef<HTMLElement | null>(null);

  // Состояния свайпа
  const isSwiping = useRef(false);
  const isAnimating = useRef(false); // Блокировка во время анимации
  const startX = useRef(0);
  const currentX = useRef(0);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: items.length }, (_, i) => i)
  );

  const SWIPE_THRESHOLD = 60;
  const ANIMATION_DURATION = 200; // ms

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll(".swiper-card")] as HTMLElement[];
  }, []);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    cards.forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
    });
  }, [getCards]);

  const handleStart = useCallback(
    (clientX: number) => {
      // Блокируем если анимация в процессе
      if (isAnimating.current || isSwiping.current) return;

      const cards = getCards();
      if (cards.length === 0) return;

      activeCardRef.current = cards[0];
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;

      // Убираем transition для мгновенного отклика
      if (activeCardRef.current) {
        activeCardRef.current.style.transition = "none";
      }
    },
    [getCards]
  );

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current || isAnimating.current || !activeCardRef.current) return;

    currentX.current = clientX;
    const deltaX = currentX.current - startX.current;

    // Применяем трансформацию напрямую без RAF для лучшей отзывчивости
    activeCardRef.current.style.setProperty("--swipe-x", `${deltaX}px`);
    activeCardRef.current.style.setProperty("--swipe-rotate", `${deltaX * 0.15}deg`);
  }, []);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current || isAnimating.current) return;

    const card = activeCardRef.current;
    if (!card) {
      isSwiping.current = false;
      return;
    }

    const deltaX = currentX.current - startX.current;
    const shouldSwipe = Math.abs(deltaX) > SWIPE_THRESHOLD;

    // Включаем transition для анимации
    card.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1)`;

    if (shouldSwipe) {
      // Блокируем новые свайпы
      isAnimating.current = true;
      isSwiping.current = false;

      const direction = Math.sign(deltaX);

      // Улетаем за экран
      card.style.setProperty("--swipe-x", `${direction * 350}px`);
      card.style.setProperty("--swipe-rotate", `${direction * 25}deg`);

      // Ждём окончания анимации
      const handleTransitionEnd = () => {
        card.removeEventListener("transitionend", handleTransitionEnd);

        // Убираем transition перед перестановкой
        card.style.transition = "none";

        // Меняем порядок карточек
        setCardOrder((prev) => {
          if (prev.length === 0) return [];
          return [...prev.slice(1), prev[0]];
        });

        // Разблокируем после небольшой паузы
        requestAnimationFrame(() => {
          isAnimating.current = false;
          activeCardRef.current = null;
        });
      };

      card.addEventListener("transitionend", handleTransitionEnd, { once: true });

      // Fallback если transitionend не сработает
      setTimeout(() => {
        if (isAnimating.current) {
          isAnimating.current = false;
          activeCardRef.current = null;
        }
      }, ANIMATION_DURATION + 50);
    } else {
      // Возвращаем на место
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      isSwiping.current = false;
      activeCardRef.current = null;
    }

    startX.current = 0;
    currentX.current = 0;
  }, []);

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isSwiping.current) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handlePointerUp = () => {
      handleEnd();
    };

    const handlePointerCancel = () => {
      // При отмене возвращаем карточку на место
      if (isSwiping.current && activeCardRef.current) {
        activeCardRef.current.style.transition = `transform ${ANIMATION_DURATION}ms ease-out`;
        activeCardRef.current.style.setProperty("--swipe-x", "0px");
        activeCardRef.current.style.setProperty("--swipe-rotate", "0deg");
      }
      isSwiping.current = false;
      activeCardRef.current = null;
      startX.current = 0;
      currentX.current = 0;
    };

    cardStackElement.addEventListener("pointerdown", handlePointerDown, { passive: false });
    cardStackElement.addEventListener("pointermove", handlePointerMove, { passive: false });
    cardStackElement.addEventListener("pointerup", handlePointerUp);
    cardStackElement.addEventListener("pointercancel", handlePointerCancel);
    cardStackElement.addEventListener("pointerleave", handlePointerUp);

    return () => {
      cardStackElement.removeEventListener("pointerdown", handlePointerDown);
      cardStackElement.removeEventListener("pointermove", handlePointerMove);
      cardStackElement.removeEventListener("pointerup", handlePointerUp);
      cardStackElement.removeEventListener("pointercancel", handlePointerCancel);
      cardStackElement.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <section
      className={cn(
        "relative mx-auto select-none",
        "h-[600px]",
        "[&_.showcase-container]:origin-top [&_.showcase-container]:scale-75",
        className
      )}
      ref={cardStackRef}
      style={
        {
          width: "100%",
          maxWidth: cardWidth + 32,
          touchAction: "none",
          "--card-perspective": "700px",
          "--card-z-offset": "12px",
          "--card-y-offset": "7px",
          "--card-max-z-index": items.length.toString(),
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
          "bg-[var(--color-card-bg)] p-6",
          "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]",
          "overflow-hidden",
          // GPU acceleration для первых 3 карточек
          displayIndex < 3 && "will-change-transform",
          // Pointer events только для верхней карточки
          displayIndex !== 0 && "pointer-events-none",
          item.className
        );

        return (
          <article
            key={`${item.id ?? originalIndex}-${originalIndex}`}
            className={cardClassName}
            style={
              {
                "--i": (displayIndex + 1).toString(),
                "--swipe-x": "0px",
                "--swipe-rotate": "0deg",
                zIndex: items.length - displayIndex,
                width: cardWidth,
                transform: `translate(-50%, -50%)
                           perspective(var(--card-perspective))
                           translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                           translateY(calc(var(--card-y-offset) * var(--i)))
                           translateX(var(--swipe-x))
                           rotateY(var(--swipe-rotate))`,
                contentVisibility: displayIndex > 2 ? "auto" : "visible",
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
