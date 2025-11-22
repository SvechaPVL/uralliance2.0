"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface Message {
  type: "user" | "bot";
  text: string;
  time: string;
}

const scriptedMessages: Message[] = [
  {
    type: "bot",
    text: "Привет! Готов помочь с записью. Доступные команды:\nЗаписаться\nМои записи\nОтменить запись",
    time: "14:20",
  },
  { type: "user", text: "Записаться", time: "14:21" },
  {
    type: "bot",
    text: "Отлично! На какую дату вы хотите записаться?\nНапример: 15 января или завтра.",
    time: "14:21",
  },
  { type: "user", text: "15 января", time: "14:22" },
  {
    type: "bot",
    text: "Выберите удобное время:\n10:00 • 12:00 • 15:00 • 17:00",
    time: "14:22",
  },
  { type: "user", text: "15:00", time: "14:23" },
  {
    type: "bot",
    text: "Готово!\nДата: 15 января 2025\nВремя: 15:00\nНапомню за час до встречи.",
    time: "14:23",
  },
  { type: "user", text: "Мои записи", time: "14:24" },
  {
    type: "bot",
    text: "Активные записи:\n1) 15 января, 15:00 — подтверждена",
    time: "14:24",
  },
];

function CheckIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
    </svg>
  );
}

export function TelegramChat() {
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
    const delay = current.type === "user" ? 1200 : 1800;
    const typingDelay = current.type === "bot" ? 900 : 0;

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
    <div className="relative mx-auto h-[380px] w-[272px] sm:h-[520px]">
      <div className="absolute inset-0 rounded-[34px] bg-gradient-to-b from-[#0c111b] via-[#05070c] to-[#010203] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#05070c] text-white">
          <div className="flex items-center gap-3 bg-[#0a0f18] px-4 py-3 text-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0f8ab1]/40 bg-[#0f8ab1]/15 text-xs font-semibold tracking-[0.3em] text-[#7dd3fc]">
              UA
            </div>
            <div className="flex-1 leading-tight">
              <div className="font-medium tracking-wide">Бот записи</div>
              <div className="text-xs text-[#8ca3b8]">online • Uralliance</div>
            </div>
            {!prefersReducedMotion && (
              <button
                onClick={reset}
                className="rounded-full p-2 text-[#8ca3b8] transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Повторить сценарий"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v6h6M20 20v-6h-6"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10a8 8 0 0113-3l1 1M19 14a8 8 0 01-13 3l-1-1"
                  ></path>
                </svg>
              </button>
            )}
          </div>

          <div
            ref={chatBodyRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence initial={false}>
              {messages.map((message, idx) => (
                <motion.div
                  key={`${message.time}-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-line select-none",
                      message.type === "user"
                        ? "rounded-br-3xl border border-[#0f8ab1]/40 bg-[#0f8ab1]/12 text-[#7dd3fc]"
                        : "rounded-bl-md border border-white/5 bg-[#10121a] text-white/90"
                    )}
                  >
                    <div className="text-[15px]">{message.text}</div>
                    <div
                      className={cn(
                        "mt-1 flex items-center justify-end gap-1 text-[11px]",
                        message.type === "user" ? "text-[#dff6ff]" : "text-[#94a3b8]"
                      )}
                    >
                      <span>{message.time}</span>
                      {message.type === "user" && <CheckIcon />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-[#182533] px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.span
                        key={delay}
                        className="h-2 w-2 rounded-full bg-[#7c8891]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-[#0a0f18] px-4 py-3 text-sm text-[#8ca3b8]">
            <div className="flex-1 rounded-full bg-[#050608] px-4 py-2 text-xs tracking-[0.3em] text-[#94a3b8] uppercase">
              Сообщение
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f8ab1]/40 bg-[#0f8ab1]/15 text-[#7dd3fc]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-0 h-12 w-1 rounded-r-full bg-black/30" />
        <div className="absolute top-36 left-0 h-16 w-1 rounded-r-full bg-black/20" />
        <div className="absolute top-28 right-0 h-10 w-1 rounded-l-full bg-black/25" />
      </div>
    </div>
  );
}
