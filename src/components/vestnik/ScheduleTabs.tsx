"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/primitives/card";
import { Newspaper, CalendarDays, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/primitives/button";
import Link from "next/link";

interface ScheduleIssue {
  issue: string;
  releaseDate: string;
  deadline: string;
}

interface QuarterData {
  name: string;
  issues: ScheduleIssue[];
}

interface ScheduleTabsProps {
  schedule: Record<string, QuarterData>;
}

const QUARTER_KEYS = ["q1", "q2", "q3", "q4"] as const;

export function ScheduleTabs({ schedule }: ScheduleTabsProps) {
  const [activeQuarter, setActiveQuarter] = useState<string>("q1");
  const currentData = schedule[activeQuarter];

  return (
    <div className="space-y-6">
      {/* Quarter tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {QUARTER_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveQuarter(key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeQuarter === key
                ? "bg-[var(--color-legal-primary)] text-white shadow-md"
                : "bg-[var(--color-legal-surface)]/50 text-[var(--color-text-secondary)] hover:bg-[var(--color-legal-surface)] hover:text-[var(--color-text-primary)]"
            )}
          >
            {schedule[key].name}
          </button>
        ))}
      </div>

      {/* Schedule table */}
      <Card variant="legal" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-legal-border)]/30 bg-[var(--color-legal-surface)]/30">
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Выпуск
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Дата выхода
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--color-legal-primary)]" />
                    Срок приёма
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.issues.map((item, idx) => (
                <tr
                  key={item.issue}
                  className={cn(
                    "transition-colors",
                    idx % 2 === 0
                      ? "bg-[var(--color-card-bg)]"
                      : "bg-[var(--color-background-secondary)]/30"
                  )}
                >
                  <td className="px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">
                    №{item.issue}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    {item.releaseDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    {item.deadline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Link to official schedule */}
      <div className="text-center">
        <Button asChild variant="outline" size="sm">
          <Link
            href="https://www.vestnik-gosreg.ru/schedule-vgr/?utm_source=uralliance&utm_medium=partner&utm_campaign=vestnik"
            target="_blank"
            rel="noopener noreferrer"
          >
            Официальный график
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
