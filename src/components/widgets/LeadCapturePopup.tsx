"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { PhoneInput } from "@/components/primitives/phone-input";
import { Checkbox } from "@/components/primitives/checkbox";
import { reachGoal } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// A/B Test Variants
const VARIANTS = [
  {
    id: "discount",
    icon: Gift,
    title: "Скидка 10% на первый заказ",
    subtitle: "Только для новых клиентов",
    description: "Оставьте телефон — мы позвоним и расскажем, как получить скидку",
    buttonText: "Получить скидку",
    color: "legal" as const,
  },
  {
    id: "consultation",
    icon: MessageSquare,
    title: "Бесплатная консультация",
    subtitle: "15 минут с экспертом",
    description: "Ответим на ваши вопросы по юридическим или IT услугам",
    buttonText: "Записаться",
    color: "tech" as const,
  },
  {
    id: "audit",
    icon: Sparkles,
    title: "Бесплатный аудит",
    subtitle: "Найдём точки роста",
    description: "Проанализируем ваш сайт или документы и дадим рекомендации",
    buttonText: "Заказать аудит",
    color: "tech" as const,
  },
  {
    id: "urgent",
    icon: Zap,
    title: "Нужна срочная помощь?",
    subtitle: "Ответим за 5 минут",
    description: "Оставьте номер — перезвоним и поможем решить вашу задачу",
    buttonText: "Перезвоните мне",
    color: "legal" as const,
  },
];

// Trigger configuration
interface TriggerConfig {
  timeOnSite: number; // seconds
  scrollDepth: number; // percentage (0-100)
  pageViews: number; // number of pages
  exitIntent: boolean;
  enabled: boolean;
}

const DEFAULT_TRIGGERS: TriggerConfig = {
  timeOnSite: 30, // 30 seconds
  scrollDepth: 50, // 50% scroll
  pageViews: 2, // 2 pages visited
  exitIntent: true,
  enabled: true,
};

const STORAGE_KEY = "leadCapture";
const STORAGE_VIEWS_KEY = "pageViews";
const DISMISS_DAYS = 7; // Don't show for 7 days after dismiss
const SUBMIT_DAYS = 30; // Don't show for 30 days after submit

interface LeadCapturePopupProps {
  triggers?: Partial<TriggerConfig>;
}

export function LeadCapturePopup({ triggers = {} }: LeadCapturePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<(typeof VARIANTS)[number] | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const config = { ...DEFAULT_TRIGGERS, ...triggers };
  const hasTriggered = useRef(false);
  const exitIntentHandler = useRef<((e: MouseEvent) => void) | null>(null);

  // Get or create A/B variant (sticky per user)
  const getVariant = useCallback(() => {
    if (typeof window === "undefined") return VARIANTS[0];

    const stored = localStorage.getItem(`${STORAGE_KEY}_variant`);
    if (stored) {
      const found = VARIANTS.find((v) => v.id === stored);
      if (found) return found;
    }

    // Random variant selection
    const randomVariant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    localStorage.setItem(`${STORAGE_KEY}_variant`, randomVariant.id);

    // Track variant assignment
    reachGoal("lead_popup_variant_assigned", { variant: randomVariant.id });

    return randomVariant;
  }, []);

  // Check if popup should be shown
  const shouldShow = useCallback(() => {
    if (typeof window === "undefined") return false;
    if (!config.enabled) return false;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const now = Date.now();

      // Check if dismissed recently
      if (data.dismissed && now - data.dismissed < DISMISS_DAYS * 24 * 60 * 60 * 1000) {
        return false;
      }

      // Check if submitted recently
      if (data.submitted && now - data.submitted < SUBMIT_DAYS * 24 * 60 * 60 * 1000) {
        return false;
      }
    }

    return true;
  }, [config.enabled]);

  // Track page views
  useEffect(() => {
    if (typeof window === "undefined") return;

    const views = parseInt(sessionStorage.getItem(STORAGE_VIEWS_KEY) || "0", 10) + 1;
    sessionStorage.setItem(STORAGE_VIEWS_KEY, views.toString());
  }, []);

  // Trigger: Time on site
  useEffect(() => {
    if (!config.enabled || hasTriggered.current || !shouldShow()) return;

    const timer = setTimeout(() => {
      if (!hasTriggered.current && shouldShow()) {
        hasTriggered.current = true;
        setVariant(getVariant());
        setIsOpen(true);
        reachGoal("lead_popup_shown", { trigger: "time", variant: getVariant().id });
      }
    }, config.timeOnSite * 1000);

    return () => clearTimeout(timer);
  }, [config.enabled, config.timeOnSite, getVariant, shouldShow]);

  // Trigger: Scroll depth
  useEffect(() => {
    if (!config.enabled || hasTriggered.current || !shouldShow()) return;

    const handleScroll = () => {
      if (hasTriggered.current) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= config.scrollDepth && shouldShow()) {
        hasTriggered.current = true;
        setVariant(getVariant());
        setIsOpen(true);
        reachGoal("lead_popup_shown", { trigger: "scroll", variant: getVariant().id });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.enabled, config.scrollDepth, getVariant, shouldShow]);

  // Trigger: Page views
  useEffect(() => {
    if (!config.enabled || hasTriggered.current || !shouldShow()) return;

    const views = parseInt(sessionStorage.getItem(STORAGE_VIEWS_KEY) || "0", 10);
    if (views >= config.pageViews && shouldShow()) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => {
        if (!hasTriggered.current) {
          hasTriggered.current = true;
          setVariant(getVariant());
          setIsOpen(true);
          reachGoal("lead_popup_shown", { trigger: "pageViews", variant: getVariant().id });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [config.enabled, config.pageViews, getVariant, shouldShow]);

  // Trigger: Exit intent
  useEffect(() => {
    if (!config.enabled || !config.exitIntent || !shouldShow()) return;

    exitIntentHandler.current = (e: MouseEvent) => {
      if (hasTriggered.current || !shouldShow()) return;

      // Detect mouse leaving viewport from top
      if (e.clientY <= 5) {
        hasTriggered.current = true;
        setVariant(getVariant());
        setIsOpen(true);
        reachGoal("lead_popup_shown", { trigger: "exitIntent", variant: getVariant().id });
      }
    };

    document.addEventListener("mouseleave", exitIntentHandler.current);
    return () => {
      if (exitIntentHandler.current) {
        document.removeEventListener("mouseleave", exitIntentHandler.current);
      }
    };
  }, [config.enabled, config.exitIntent, getVariant, shouldShow]);

  const handleClose = () => {
    setIsOpen(false);

    // Save dismiss timestamp
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, dismissed: Date.now() }));

    reachGoal("lead_popup_dismissed", { variant: variant?.id || "unknown" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !consent || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Лид из попапа",
          phone,
          email: "",
          message: `Лид из попапа: ${variant?.title}`,
          service: variant?.color === "legal" ? "legal" : "tech",
          honeypot: "",
          consent: true,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);

        // Save submit timestamp
        const stored = localStorage.getItem(STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : {};
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, submitted: Date.now() }));

        reachGoal("lead_popup_submit", { variant: variant?.id || "unknown" });

        // Close after showing success
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch {
      // Silently fail, don't block user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!variant) return null;

  const Icon = variant.icon;
  const isLegal = variant.color === "legal";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-[9999] w-[85vw] max-w-xs -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl",
                isLegal
                  ? "border-[var(--color-legal-primary)]/30 bg-[#0d1117]/95 bg-gradient-to-br from-[#0d1117]/95 to-[var(--color-legal-surface)]"
                  : "border-[var(--color-tech-primary)]/30 bg-[#0d1117]/95 bg-gradient-to-br from-[#0d1117]/95 to-[var(--color-tech-surface)]"
              )}
            >
              {/* Decorative glow */}
              <div
                className={cn(
                  "pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl",
                  isLegal
                    ? "bg-[var(--color-legal-primary)]/20"
                    : "bg-[var(--color-tech-primary)]/20"
                )}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-white/10 hover:text-[var(--color-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative p-6 sm:p-8">
                {isSubmitted ? (
                  // Success state
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 text-center"
                  >
                    <div
                      className={cn(
                        "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                        isLegal
                          ? "bg-[var(--color-legal-primary)]/20"
                          : "bg-[var(--color-tech-primary)]/20"
                      )}
                    >
                      <Sparkles
                        className={cn(
                          "h-8 w-8",
                          isLegal
                            ? "text-[var(--color-legal-primary)]"
                            : "text-[var(--color-tech-primary)]"
                        )}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Спасибо!</h3>
                    <p className="mt-2 text-[var(--color-text-secondary)]">
                      Мы перезвоним вам в ближайшее время
                    </p>
                  </motion.div>
                ) : (
                  // Form state
                  <>
                    {/* Icon */}
                    <div
                      className={cn(
                        "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl",
                        isLegal
                          ? "bg-[var(--color-legal-primary)]/20"
                          : "bg-[var(--color-tech-primary)]/20"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-7 w-7",
                          isLegal
                            ? "text-[var(--color-legal-primary)]"
                            : "text-[var(--color-tech-primary)]"
                        )}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {variant.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-sm font-medium",
                        isLegal
                          ? "text-[var(--color-legal-primary)]"
                          : "text-[var(--color-tech-primary)]"
                      )}
                    >
                      {variant.subtitle}
                    </p>
                    <p className="mt-3 text-[var(--color-text-secondary)]">{variant.description}</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <Input
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant={isLegal ? "legal" : "tech"}
                        fullWidth
                      />
                      <PhoneInput
                        placeholder="+7 (900) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant={isLegal ? "legal" : "tech"}
                        fullWidth
                        required
                      />
                      <Checkbox
                        label={
                          <>
                            Даю согласие на обработку{" "}
                            <a
                              href="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                            >
                              персональных данных
                            </a>
                          </>
                        }
                        variant={isLegal ? "legal" : "tech"}
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <Button
                        type="submit"
                        variant={isLegal ? "primary-legal" : "primary-tech"}
                        fullWidth
                        isLoading={isSubmitting}
                        disabled={!consent}
                      >
                        {variant.buttonText}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
