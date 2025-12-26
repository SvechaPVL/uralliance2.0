"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/primitives/button";
import { Download, Printer, Sparkles, Loader2 } from "lucide-react";

const PROMPT_CATEGORIES = [
  {
    title: "Маркетинг и контент",
    color: "from-blue-500 to-cyan-500",
    prompts: [
      {
        title: "Продающий пост",
        prompt:
          "Напиши продающий пост для [соцсеть] о [продукт/услуга]. Целевая аудитория: [описание]. Тон: [профессиональный/дружелюбный]. Добавь призыв к действию.",
      },
      {
        title: "Email-рассылка",
        prompt:
          "Создай email для [цель: продажа/информирование/возврат клиента]. Тема письма должна иметь высокий Open Rate. Длина: до 150 слов.",
      },
      {
        title: "SEO-описание",
        prompt:
          "Напиши SEO-оптимизированное описание для [страница/товар]. Ключевые слова: [список]. Длина: 150-160 символов для meta description.",
      },
      {
        title: "Контент-план",
        prompt:
          "Составь контент-план на неделю для [ниша/бизнес]. Форматы: посты, stories, reels. Цель: [вовлечение/продажи/узнаваемость].",
      },
      {
        title: "Рекламный текст",
        prompt:
          "Напиши текст для таргетированной рекламы [продукт]. Боль клиента: [проблема]. Решение: [как продукт решает]. Ограничение: 90 символов заголовок, 90 символов текст.",
      },
    ],
  },
  {
    title: "Продажи и переговоры",
    color: "from-green-500 to-emerald-500",
    prompts: [
      {
        title: "Коммерческое предложение",
        prompt:
          "Составь КП для [клиент/компания] на [услуга/товар]. Выгоды для клиента: [список]. Цена: [сумма]. Добавь раздел 'Почему мы'.",
      },
      {
        title: "Ответ на возражение",
        prompt:
          "Клиент говорит: '[возражение]'. Дай 3 варианта ответа: мягкий, аргументированный, с вопросом. Контекст: [ситуация продажи].",
      },
      {
        title: "Follow-up письмо",
        prompt:
          "Напиши follow-up после [встреча/звонок/КП]. Напомни о [договорённости]. Предложи следующий шаг. Тон: профессиональный, не навязчивый.",
      },
      {
        title: "Скрипт звонка",
        prompt:
          "Создай скрипт холодного звонка для [продукт/услуга]. Цель: [назначить встречу/продать]. Включи: приветствие, выявление потребности, презентацию, закрытие.",
      },
      {
        title: "Анализ конкурентов",
        prompt:
          "Проанализируй [конкурент] по критериям: цены, УТП, слабые стороны, целевая аудитория. Дай рекомендации как отстроиться.",
      },
    ],
  },
  {
    title: "HR и управление",
    color: "from-purple-500 to-pink-500",
    prompts: [
      {
        title: "Описание вакансии",
        prompt:
          "Напиши описание вакансии [должность]. Компания: [сфера]. Обязанности: [список]. Требования: разделить на обязательные и желательные. Добавь секцию 'Мы предлагаем'.",
      },
      {
        title: "Вопросы для собеседования",
        prompt:
          "Составь 10 вопросов для собеседования на позицию [должность]. Включи: профессиональные, поведенческие, ситуационные. Добавь критерии оценки ответов.",
      },
      {
        title: "Обратная связь сотруднику",
        prompt:
          "Напиши feedback для сотрудника. Ситуация: [описание]. Что хорошо: [достижения]. Что улучшить: [области развития]. Используй модель SBI.",
      },
      {
        title: "Onboarding план",
        prompt:
          "Создай план onboarding на первую неделю для [должность]. День за днём: задачи, встречи, материалы для изучения. Цель: быстрая адаптация.",
      },
      {
        title: "Мотивационное письмо",
        prompt:
          "Напиши письмо команде о [изменение/достижение/новый проект]. Объясни зачем это важно. Вдохнови на действие. Тон: [выбрать].",
      },
    ],
  },
  {
    title: "Документы и юридическое",
    color: "from-orange-500 to-red-500",
    prompts: [
      {
        title: "Краткое содержание договора",
        prompt:
          "Проанализируй договор и выдели: стороны, предмет, сроки, цена, ответственность, порядок расторжения. Отметь потенциальные риски.",
      },
      {
        title: "Деловое письмо",
        prompt:
          "Напиши официальное письмо в [организация] по вопросу [тема]. Цель: [запрос/претензия/благодарность]. Стиль: деловой, без канцеляризмов.",
      },
      {
        title: "Протокол совещания",
        prompt:
          "Оформи протокол совещания. Дата: [дата]. Участники: [список]. Повестка: [темы]. По каждому вопросу: решение, ответственный, срок.",
      },
      {
        title: "Служебная записка",
        prompt:
          "Составь служебную записку на имя [кому] от [от кого]. Тема: [вопрос]. Обоснование: [причины]. Просьба: [что требуется].",
      },
      {
        title: "ТЗ на проект",
        prompt:
          "Напиши техническое задание на [проект]. Разделы: цели, требования, этапы, сроки, критерии приёмки, бюджет. Формат: структурированный документ.",
      },
    ],
  },
  {
    title: "Аналитика и отчёты",
    color: "from-indigo-500 to-blue-500",
    prompts: [
      {
        title: "Сводка из документа",
        prompt:
          "Сделай краткую сводку из этого текста: [текст]. Выдели: ключевые факты, цифры, выводы. Объём: не более 200 слов.",
      },
      {
        title: "Анализ данных",
        prompt:
          "Проанализируй эти данные: [данные]. Найди: тренды, аномалии, закономерности. Дай рекомендации на основе анализа.",
      },
      {
        title: "Отчёт руководителю",
        prompt:
          "Составь отчёт за [период] по [направление]. Структура: достижения, проблемы, план на следующий период. Добавь ключевые метрики.",
      },
      {
        title: "SWOT-анализ",
        prompt:
          "Проведи SWOT-анализ для [компания/проект/идея]. По каждому разделу дай 3-5 пунктов. В конце — рекомендации по стратегии.",
      },
      {
        title: "Презентация",
        prompt:
          "Создай структуру презентации на тему [тема]. Аудитория: [кто]. Цель: [убедить/информировать]. Количество слайдов: [число]. Дай тезисы для каждого слайда.",
      },
    ],
  },
  {
    title: "Креатив и идеи",
    color: "from-pink-500 to-rose-500",
    prompts: [
      {
        title: "Генерация идей",
        prompt:
          "Предложи 10 идей для [цель: пост/продукт/акция/название]. Контекст: [ниша, аудитория]. Критерии: оригинальность, реализуемость.",
      },
      {
        title: "Нейминг",
        prompt:
          "Придумай 15 вариантов названия для [продукт/компания/проект]. Стиль: [серьёзный/игривый/технологичный]. Проверь что домены могут быть свободны.",
      },
      {
        title: "Слоган",
        prompt:
          "Создай 5 вариантов слогана для [бренд]. УТП: [главное преимущество]. Целевая аудитория: [описание]. Длина: до 7 слов.",
      },
      {
        title: "Сторителлинг",
        prompt:
          "Напиши историю для [бренд/продукт] по структуре: проблема героя → поиск решения → находит [продукт] → трансформация. Для использования в [где].",
      },
      {
        title: "Rewrite текста",
        prompt:
          "Перепиши этот текст: [текст]. Сделай его [короче/длиннее/проще/убедительнее]. Сохрани ключевую мысль. Добавь [что добавить].",
      },
    ],
  },
  {
    title: "Личная продуктивность",
    color: "from-teal-500 to-green-500",
    prompts: [
      {
        title: "Приоритизация задач",
        prompt:
          "Вот мой список задач: [задачи]. Расставь приоритеты по матрице Эйзенхауэра. Предложи порядок выполнения на сегодня.",
      },
      {
        title: "Декомпозиция проекта",
        prompt:
          "Разбей проект [название] на подзадачи. Для каждой укажи: действие, результат, зависимости. Предложи последовательность выполнения.",
      },
      {
        title: "Подготовка к встрече",
        prompt:
          "Помоги подготовиться к встрече с [кто] по теме [тема]. Составь: agenda, ключевые вопросы, возможные возражения и ответы на них.",
      },
      {
        title: "Решение проблемы",
        prompt:
          "Проблема: [описание]. Примени метод '5 почему' для поиска корневой причины. Предложи 3 варианта решения с плюсами и минусами.",
      },
      {
        title: "Обучение новому",
        prompt:
          "Хочу изучить [тема/навык]. Составь план обучения на [срок]. Включи: ресурсы, практические задания, чек-поинты для проверки прогресса.",
      },
    ],
  },
  {
    title: "Клиентский сервис",
    color: "from-cyan-500 to-blue-500",
    prompts: [
      {
        title: "Ответ на жалобу",
        prompt:
          "Клиент жалуется: '[жалоба]'. Напиши ответ: признай проблему, извинись, предложи решение, компенсацию если уместно. Тон: эмпатичный.",
      },
      {
        title: "FAQ для сайта",
        prompt:
          "Составь FAQ из 10 вопросов для [продукт/услуга]. Вопросы должны снимать типичные возражения и сомнения клиентов. Ответы: краткие, полезные.",
      },
      {
        title: "Скрипт для поддержки",
        prompt:
          "Создай скрипт ответа на типичный вопрос: '[вопрос клиента]'. Включи: приветствие, уточняющие вопросы, решение, завершение.",
      },
      {
        title: "Отзыв от клиента",
        prompt:
          "Помоги написать просьбу об отзыве для клиента после [покупка/услуга]. Объясни почему это важно. Дай конкретные вопросы для отзыва.",
      },
      {
        title: "Upsell предложение",
        prompt:
          "Клиент купил [товар/услуга]. Предложи upsell/cross-sell. Объясни выгоду для клиента. Не будь навязчивым. Предложи ограниченное предложение.",
      },
    ],
  },
];

const TIPS = [
  {
    title: "Будь конкретным",
    description: "Чем точнее запрос, тем лучше результат. Указывай контекст, формат, длину.",
  },
  {
    title: "Давай примеры",
    description: "Покажи AI пример желаемого результата — он поймёт стиль и формат.",
  },
  {
    title: "Итерируй",
    description: "Первый ответ редко идеален. Уточняй: 'Сделай короче', 'Добавь цифры'.",
  },
  {
    title: "Задавай роль",
    description: "'Ты — опытный маркетолог' работает лучше, чем просто 'напиши текст'.",
  },
  {
    title: "Проверяй факты",
    description: "AI может ошибаться в датах, именах, цифрах. Всегда проверяй важное.",
  },
  {
    title: "Не загружай секреты",
    description: "Не отправляй пароли, персональные данные клиентов, коммерческие тайны.",
  },
];

export default function AICheatsheetPage() {
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [10, 10, 10, 10],
        filename: "Шпаргалка_по_AI_Uralliance.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Fallback to print
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-trigger PDF download if ?download=true
  useEffect(() => {
    if (searchParams.get("download") === "true") {
      const timer = setTimeout(() => {
        handleDownloadPDF();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-before: always;
          }
          @page {
            margin: 1cm;
            size: A4;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Header with download button - hidden when printing */}
        <div className="no-print sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-[var(--color-text-primary)]">
                  Шпаргалка по работе с AI
                </h1>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  50 промптов для бизнеса от Uralliance
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="md" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Печать</span>
              </Button>
              <Button
                variant="primary-tech"
                size="md"
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">
                  {isGenerating ? "Генерация..." : "Скачать PDF"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="container mx-auto px-4 py-8">
          {/* Title page for print */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-tech-primary)] to-purple-500">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              50 промптов для бизнеса
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-[var(--color-text-secondary)]">
              Готовые шаблоны запросов к ChatGPT, YandexGPT и другим нейросетям для маркетинга,
              продаж, HR, аналитики и управления
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span>Uralliance</span>
              <span>•</span>
              <span>uralliance.ru</span>
              <span>•</span>
              <span>+7 (423) 205-60-10</span>
            </div>
          </div>

          {/* Tips section */}
          <div className="mb-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-text-primary)]">
              6 правил эффективной работы с AI
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TIPS.map((tip, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-tech-primary)]/10 text-sm font-bold text-[var(--color-tech-primary)]">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {tip.title}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      {tip.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompts by category */}
          {PROMPT_CATEGORIES.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`mb-8 ${categoryIndex > 0 && categoryIndex % 2 === 0 ? "print-break" : ""}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`h-8 w-1 rounded-full bg-gradient-to-b ${category.color}`}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                  {category.title}
                </h2>
                <span className="rounded-full bg-[var(--color-tech-primary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-tech-primary)]">
                  {category.prompts.length} промптов
                </span>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {category.prompts.map((prompt, promptIndex) => (
                  <div
                    key={promptIndex}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-tech-primary)]/10 text-xs font-bold text-[var(--color-tech-primary)]">
                        {categoryIndex * 5 + promptIndex + 1}
                      </span>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">
                        {prompt.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {prompt.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-12 rounded-2xl border border-[var(--color-tech-primary)]/30 bg-gradient-to-br from-[var(--color-tech-surface)] to-[var(--color-card-bg)] p-6 text-center">
            <h2 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
              Хотите освоить AI на профессиональном уровне?
            </h2>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              Записывайтесь на корпоративное обучение — научим вашу команду использовать нейросети
              эффективно
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-[var(--color-text-primary)]">uralliance.ru/ai-training</span>
              <span className="text-[var(--color-text-secondary)]">•</span>
              <span className="text-[var(--color-text-primary)]">+7 (423) 205-60-10</span>
              <span className="text-[var(--color-text-secondary)]">•</span>
              <span className="text-[var(--color-text-primary)]">info@uralliance.ru</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
