"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Zap } from "lucide-react";

const DEMO_MESSAGES = [
  {
    role: "user" as const,
    text: "Напиши продающий пост для соцсетей",
  },
  {
    role: "assistant" as const,
    text: "Устали тратить часы на рутину? AI-помощник сделает за минуты то, на что раньше уходил день. Попробуйте бесплатно!",
  },
  {
    role: "user" as const,
    text: "Сократи текст договора до 3 пунктов",
  },
  {
    role: "assistant" as const,
    text: "1. Срок действия: 12 месяцев\n2. Оплата: 50% предоплата\n3. Расторжение: за 30 дней",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-[var(--color-tech-primary)]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 25);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          className="inline-block h-4 w-0.5 bg-[var(--color-tech-primary)]"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export function AIChatShowcase() {
  const [messages, setMessages] = useState<typeof DEMO_MESSAGES>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const addNextMessage = () => {
      if (currentIndex >= DEMO_MESSAGES.length) {
        // Reset after delay
        setTimeout(() => {
          setMessages([]);
          setCurrentIndex(0);
        }, 3000);
        return;
      }

      const message = DEMO_MESSAGES[currentIndex];

      if (message.role === "user") {
        setMessages((prev) => [...prev, message]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, message]);
          setCurrentIndex((prev) => prev + 1);
        }, 1500);
      }
    };

    const timer = setTimeout(addNextMessage, currentIndex === 0 ? 1000 : 2000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-md">
      {/* Glow effect */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--color-tech-primary)]/20 via-purple-500/10 to-[var(--color-tech-primary)]/20 blur-2xl" />

      {/* Chat window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-tech-primary)]/30 bg-[var(--color-card-bg)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-tech-surface)] to-[var(--color-card-bg)] px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">
              AI-ассистент
            </div>
            <div className="flex items-center gap-1 text-xs text-[var(--color-tech-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Онлайн
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full bg-[var(--color-tech-primary)]/10 px-2 py-1 text-xs text-[var(--color-tech-primary)]">
            <Zap className="h-3 w-3" />
            GPT-4o
          </div>
        </div>

        {/* Messages */}
        <div className="h-[280px] space-y-3 overflow-y-auto p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-[var(--color-tech-primary)] text-white"
                      : "border border-[var(--color-border)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]"
                  }`}
                >
                  {message.role === "assistant" && index === messages.length - 1 ? (
                    <TypewriterText text={message.text} />
                  ) : (
                    <span className="whitespace-pre-line">{message.text}</span>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-background-secondary)]">
                    <User className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-secondary)]">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2.5">
            <span className="flex-1 text-sm text-[var(--color-text-secondary)]">
              Спросите что угодно...
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-tech-primary)]">
              <Send className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -top-4 left-2 rounded-lg border border-[var(--color-tech-primary)]/30 bg-[var(--color-card-bg)] px-3 py-1.5 text-xs font-medium shadow-lg sm:-left-8"
      >
        <span className="text-[var(--color-tech-primary)]">5 сек</span>
        <span className="text-[var(--color-text-secondary)]"> — время ответа</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-2 -bottom-4 rounded-lg border border-green-500/30 bg-[var(--color-card-bg)] px-3 py-1.5 text-xs font-medium shadow-lg sm:-right-8"
      >
        <span className="text-green-400">80%</span>
        <span className="text-[var(--color-text-secondary)]"> рутины автоматизировано</span>
      </motion.div>
    </div>
  );
}
