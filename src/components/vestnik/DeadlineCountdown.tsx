"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ScheduleIssue {
  issue: string;
  releaseDate: string;
  deadline: string;
}

interface QuarterData {
  name: string;
  issues: ScheduleIssue[];
}

interface DeadlineCountdownProps {
  schedule: Record<string, QuarterData>;
  className?: string;
}

// Парсим дату из формата "DD месяц" в Date
function parseScheduleDate(dateStr: string, year: number): Date {
  const months: Record<string, number> = {
    января: 0,
    февраля: 1,
    марта: 2,
    апреля: 3,
    мая: 4,
    июня: 5,
    июля: 6,
    августа: 7,
    сентября: 8,
    октября: 9,
    ноября: 10,
    декабря: 11,
  };

  const [day, month] = dateStr.split(" ");
  const monthIndex = months[month.toLowerCase()];

  if (monthIndex === undefined) {
    return new Date();
  }

  // Дедлайн в 14:00 по Москве (UTC+3)
  // Создаём дату в UTC, затем корректируем на московское время
  // 14:00 MSK = 11:00 UTC
  const utcDate = Date.UTC(year, monthIndex, parseInt(day), 11, 0, 0);
  return new Date(utcDate);
}

// Найти ближайший deadline
function findNextDeadline(
  schedule: Record<string, QuarterData>
): { issue: string; releaseDate: string; deadline: Date } | null {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Собираем все issues с вычисленными датами deadline
  const allIssuesWithDates: Array<{
    issue: string;
    releaseDate: string;
    deadline: Date;
  }> = [];

  // Определяем год для каждого deadline на основе месяца
  // Q4 (октябрь-декабрь) deadlines - текущий год
  // Q1 (январь-март) deadlines - следующий год если сейчас декабрь
  const currentMonth = now.getMonth(); // 0-11

  Object.entries(schedule).forEach(([, quarter]) => {
    quarter.issues.forEach((issue) => {
      let deadlineYear = currentYear;

      // Если deadline в январе-марте и сейчас октябрь-декабрь,
      // то deadline в следующем году
      if (
        (issue.deadline.includes("января") ||
          issue.deadline.includes("февраля") ||
          issue.deadline.includes("марта")) &&
        currentMonth >= 9
      ) {
        deadlineYear = currentYear + 1;
      }

      const deadline = parseScheduleDate(issue.deadline, deadlineYear);
      allIssuesWithDates.push({
        issue: issue.issue,
        releaseDate: issue.releaseDate,
        deadline,
      });
    });
  });

  // Сортируем по дате deadline
  allIssuesWithDates.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());

  // Ищем ближайший deadline который еще не прошел
  for (const issue of allIssuesWithDates) {
    if (issue.deadline > now) {
      return issue;
    }
  }

  // Если все прошли, возвращаем первый из следующего цикла
  if (allIssuesWithDates.length > 0) {
    const firstIssue = allIssuesWithDates[0];
    return {
      ...firstIssue,
      deadline: new Date(
        firstIssue.deadline.getFullYear() + 1,
        firstIssue.deadline.getMonth(),
        firstIssue.deadline.getDate(),
        23,
        59,
        59
      ),
    };
  }

  return null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(deadline: Date): TimeLeft {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function DeadlineCountdown({ schedule, className }: DeadlineCountdownProps) {
  // Trigger для пересчёта следующего дедлайна когда текущий истекает
  const [refreshKey, setRefreshKey] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshKey intentionally triggers recalculation
  const nextDeadline = useMemo(() => findNextDeadline(schedule), [schedule, refreshKey]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  // Separate effect for mount state to satisfy eslint
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!nextDeadline) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(nextDeadline.deadline);
      setTimeLeft(newTimeLeft);

      // Когда дедлайн прошёл — пересчитать следующий выпуск
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        // Небольшая задержка чтобы дать времени пройти
        setTimeout(() => setRefreshKey((k) => k + 1), 1000);
      }
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft(nextDeadline.deadline));

    return () => clearInterval(timer);
  }, [nextDeadline]);

  if (!nextDeadline) {
    return null;
  }

  // Show placeholder during SSR
  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[var(--color-legal-primary)]/20 bg-gradient-to-br from-[var(--color-legal-surface)]/50 to-[var(--color-legal-surface)]/30 p-4",
          className
        )}
      >
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--color-legal-primary)]" />
          <span className="text-xs font-medium text-[var(--color-text-secondary)]">
            Загрузка...
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["дней", "часов", "минут", "секунд"].map((label) => (
            <div key={label} className="text-center">
              <div className="rounded-lg bg-[var(--color-card-bg)] px-2 py-2 shadow-sm">
                <span className="text-2xl font-bold text-[var(--color-legal-primary)] tabular-nums">
                  --
                </span>
              </div>
              <span className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-legal-primary)]/20 bg-gradient-to-br from-[var(--color-legal-surface)]/50 to-[var(--color-legal-surface)]/30 p-4",
        className
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-[var(--color-legal-primary)]" />
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          До окончания приёма в №{nextDeadline.issue} от {nextDeadline.releaseDate}
        </span>
      </div>

      {/* Countdown */}
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <div className="rounded-lg bg-[var(--color-card-bg)] px-2 py-2 shadow-sm">
            <span className="text-2xl font-bold text-[var(--color-legal-primary)] tabular-nums">
              {formatNumber(timeLeft.days)}
            </span>
          </div>
          <span className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">дней</span>
        </div>
        <div className="text-center">
          <div className="rounded-lg bg-[var(--color-card-bg)] px-2 py-2 shadow-sm">
            <span className="text-2xl font-bold text-[var(--color-legal-primary)] tabular-nums">
              {formatNumber(timeLeft.hours)}
            </span>
          </div>
          <span className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">часов</span>
        </div>
        <div className="text-center">
          <div className="rounded-lg bg-[var(--color-card-bg)] px-2 py-2 shadow-sm">
            <span className="text-2xl font-bold text-[var(--color-legal-primary)] tabular-nums">
              {formatNumber(timeLeft.minutes)}
            </span>
          </div>
          <span className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">минут</span>
        </div>
        <div className="text-center">
          <div className="rounded-lg bg-[var(--color-card-bg)] px-2 py-2 shadow-sm">
            <span className="text-2xl font-bold text-[var(--color-legal-primary)] tabular-nums">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
          <span className="mt-1 block text-[10px] text-[var(--color-text-secondary)]">секунд</span>
        </div>
      </div>
    </div>
  );
}
