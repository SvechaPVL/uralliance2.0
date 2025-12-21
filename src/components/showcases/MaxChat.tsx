"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface Message {
  type: "user" | "bot";
  text: string;
  time: string;
  buttons?: string[];
}

const scriptedMessages: Message[] = [
  {
    type: "bot",
    text: "Добро пожаловать! Я бот-помощник вашего магазина. Чем могу помочь?",
    time: "10:15",
    buttons: ["Каталог", "Статус заказа", "Связь с менеджером"],
  },
  { type: "user", text: "Каталог", time: "10:16" },
  {
    type: "bot",
    text: "Выберите категорию товаров:",
    time: "10:16",
    buttons: ["Электроника", "Одежда", "Для дома"],
  },
  { type: "user", text: "Электроника", time: "10:17" },
  {
    type: "bot",
    text: "Популярные товары:\n\n📱 Смартфон X Pro — 45 990 ₽\n💻 Ноутбук Ultra — 89 990 ₽\n🎧 Наушники Air — 12 990 ₽",
    time: "10:17",
    buttons: ["Подробнее", "Добавить в корзину"],
  },
  { type: "user", text: "Добавить в корзину", time: "10:18" },
  {
    type: "bot",
    text: "✅ Смартфон X Pro добавлен в корзину!\n\nВаша корзина: 1 товар на 45 990 ₽",
    time: "10:18",
    buttons: ["Оформить заказ", "Продолжить покупки"],
  },
];

function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
    </svg>
  );
}

function DoubleCheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l5 5L17 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l5 5L22 7" />
    </svg>
  );
}

export function MaxChat() {
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>(prefersReducedMotion ? scriptedMessages : []);
  const [isTyping, setIsTyping] = useState(false);
  const [index, setIndex] = useState(prefersReducedMotion ? scriptedMessages.length : 0);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    if (prefersReducedMotion) return;
    setMessages([]);
    setIsTyping(false);
    setIndex(0);
  };

  useEffect(() => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || index >= scriptedMessages.length) return;

    const current = scriptedMessages[index];
    const delay = current.type === "user" ? 1400 : 2000;
    const typingDelay = current.type === "bot" ? 1000 : 0;

    const timer = window.setTimeout(() => {
      if (typingDelay) {
        setIsTyping(true);
        window.setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, current]);
          setIndex((prev) => prev + 1);
        }, typingDelay);
      } else {
        setMessages((prev) => [...prev, current]);
        setIndex((prev) => prev + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [index, prefersReducedMotion]);

  return (
    <div className="relative mx-auto h-[420px] w-[290px] sm:h-[520px] sm:w-[300px]">
      {/* Phone frame with MAX branding colors */}
      <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-[#1a1f2e] via-[#0d1117] to-[#0a0d14] shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0f1420] to-[#0a0d14] text-white">
          {/* Header - MAX style with gradient */}
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#2563eb]/20 via-[#1d4ed8]/15 to-[#3b82f6]/10 px-4 py-4 text-sm backdrop-blur-sm">
            {/* Back arrow */}
            <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Avatar - Badge style */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#3b82f6] bg-[#3b82f6]/10">
              <svg
                className="h-5 w-5 text-[#3b82f6]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
              {/* Online indicator */}
              <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[#0f1420] bg-emerald-400" />
            </div>

            <div className="flex-1 leading-tight">
              <div className="font-semibold tracking-wide">МагазинБот</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                онлайн
              </div>
            </div>

            {/* Reset button */}
            {!prefersReducedMotion && (
              <button
                onClick={reset}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Повторить сценарий"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10a8 8 0 0113-3l1 1M19 14a8 8 0 01-13 3l-1-1"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Chat body */}
          <div
            ref={chatBodyRef}
            className="flex-1 space-y-3 overflow-y-auto px-3 py-4 text-sm leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence initial={false}>
              {messages.map((message, idx) => (
                <motion.div
                  key={`${message.time}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[85%]">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 whitespace-pre-line select-none",
                        message.type === "user"
                          ? "rounded-br-md border border-[#3b82f6] bg-[#3b82f6]/15 text-[#93c5fd]"
                          : "rounded-bl-md border border-white/5 bg-[#1a1f2e] text-white/90"
                      )}
                    >
                      <div className="text-[14px] leading-relaxed">{message.text}</div>
                      <div
                        className={cn(
                          "mt-1.5 flex items-center justify-end gap-1 text-[10px]",
                          message.type === "user" ? "text-[#60a5fa]" : "text-white/40"
                        )}
                      >
                        <span>{message.time}</span>
                        {message.type === "user" && <DoubleCheckIcon />}
                      </div>
                    </div>

                    {/* Inline buttons for bot messages */}
                    {message.type === "bot" && message.buttons && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="mt-2 flex flex-wrap gap-1.5"
                      >
                        {message.buttons.map((btn) => (
                          <div
                            key={btn}
                            className="rounded-xl border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-3 py-1.5 text-xs font-medium text-[#60a5fa] transition-colors hover:bg-[#3b82f6]/20"
                          >
                            {btn}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md border border-white/5 bg-[#1a1f2e] px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 0.15, 0.3].map((delay) => (
                      <motion.span
                        key={delay}
                        className="h-2 w-2 rounded-full bg-[#3b82f6]"
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input area - MAX style */}
          <div className="flex items-center gap-2 border-t border-white/5 bg-[#0d1117] px-3 py-3">
            {/* Attach button */}
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white/70">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            {/* Input field */}
            <div className="flex-1 rounded-full border border-white/10 bg-[#1a1f2e] px-4 py-2 text-sm text-white/40">
              Написать сообщение...
            </div>

            {/* Send button - Badge style */}
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3b82f6] bg-[#3b82f6]/10 text-[#3b82f6] transition-colors hover:bg-[#3b82f6]/20">
              <svg className="h-4 w-4 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Phone buttons */}
        <div className="absolute top-24 left-0 h-10 w-1 rounded-r-full bg-black/40" />
        <div className="absolute top-40 left-0 h-16 w-1 rounded-r-full bg-black/30" />
        <div className="absolute top-32 right-0 h-12 w-1 rounded-l-full bg-black/35" />
      </div>
    </div>
  );
}
