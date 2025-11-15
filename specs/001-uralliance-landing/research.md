# Research: Uralliance Premium Website

**Дата**: 2025-11-06
**Статус**: Завершен
**Цель**: Разрешить технические неизвестные и определить best practices для реализации

---

## 1. Тестирование: Стратегия и Инструменты

### Решение

**Опциональное тестирование** (тесты не обязательны для MVP, но рекомендованы для production).

**Выбранный стек** (если тесты требуются):

- **Unit тесты**: Jest + React Testing Library для компонентов
- **E2E тесты**: Playwright для критических user flows
- **Visual regression**: Опционально (Chromatic или Percy)

### Обоснование

1. **Конституция**: Тестирование помечено как ОПЦИОНАЛЬНО в tasks-template.md (line 11: "Тесты ОПЦИОНАЛЬНЫ - включайте их только при явном запросе в спецификации функции")
2. **Спецификация**: В spec.md НЕТ явных требований к тестам (нет FR или SC о test coverage)
3. **Приоритет MVP**: Для лендинга критичнее дизайн, анимации и SEO, чем тесты
4. **Lighthouse audit**: Производительность и accessibility валидируются через Lighthouse (SC-001 - SC-012), что достаточно для качества

**Рекомендация**: Начать без тестов, добавить позже если потребуется (User Story 9 включает optimization, но не тесты).

### Альтернативы Рассмотрены

- **Vitest**: Быстрее Jest, но меньше ecosystem для React
- **Cypress**: Популярен, но Playwright лучше для cross-browser и API mocking
- **Testing Library без Jest**: Возможно, но Jest де-факто стандарт для React

---

## 2. Интеграция Aceternity UI в Next.js 14

### Решение

**Copy-paste подход** с адаптацией компонентов под проект.

**Процесс интеграции**:

1. Установить зависимости Aceternity UI: `framer-motion`, `clsx`, `tailwind-merge`
2. Скопировать нужные компоненты из [ui.aceternity.com](https://ui.aceternity.com) в `src/components/animations/`
3. Адаптировать под TypeScript strict mode (добавить типы для props)
4. Убедиться в совместимости с Next.js Server Components (пометить `'use client'` где нужны хуки)
5. Настроить Tailwind CSS с плагинами (требуется для некоторых эффектов)

**Требуемые компоненты**:

- MacBook Scroll: https://ui.aceternity.com/components/macbook-scroll
- Container Scroll: https://21st.dev/community/components/aceternity/container-scroll-animation/default
- Bento Grid: https://ui.aceternity.com/components/bento-grid
- Hero Parallax: https://ui.aceternity.com/components/hero-parallax
- 3D Card: https://ui.aceternity.com/components/3d-card-effect
- Spotlight: https://ui.aceternity.com/components/spotlight

### Обоснование

1. **Aceternity UI не npm пакет**: Это коллекция копируемых компонентов (как shadcn/ui)
2. **Кастомизация**: Copy-paste позволяет адаптировать анимации под дизайн (цвета Legal/Tech)
3. **Совместимость**: Все компоненты Aceternity используют Framer Motion, который совместим с Next.js 14
4. **Производительность**: Можно оптимизировать (например, lazy load с IntersectionObserver - FR-064)

### Альтернативы Рассмотрены

- **Создать все анимации с нуля**: Долго (2-3 дня на все эффекты), менее протестировано
- **Использовать другие UI libraries**: Magic UI, Cult UI — похожи, но Aceternity более популярен и документирован
- **Minimalist approach без премиум анимаций**: Противоречит конституции (Принцип I требует 3D-элементы и анимации)

---

## 3. Markdown Parsing с Frontmatter (gray-matter)

### Решение

Использовать **gray-matter** + **remark/rehype** ecosystem для парсинга Markdown.

**Стек**:

- `gray-matter`: Парсинг frontmatter (YAML метаданные в Markdown)
- `remark`: Парсинг Markdown в AST
- `remark-html`: Конвертация Markdown в HTML
- `rehype-highlight`: Syntax highlighting для code blocks (если нужно)
- `rehype-sanitize`: Санитизация HTML для безопасности

**Пример утилиты** (`src/lib/content.ts`):

```typescript
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getServiceBySlug(category: "legal" | "tech", slug: string) {
  const filePath = path.join(process.cwd(), "content/services", category, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    frontmatter: data as ServiceFrontmatter,
    html: htmlContent,
  };
}
```

### Обоснование

1. **gray-matter**: Де-факто стандарт для frontmatter, используется в Next.js примерах
2. **remark/rehype**: Унифицированный ecosystem, extensible (можно добавить плагины)
3. **Производительность**: Парсинг происходит на сервере (Next.js Server Components), не влияет на bundle size
4. **Типобезопасность**: Frontmatter типизируется через TypeScript interfaces

### Альтернативы Рассмотрены

- **MDX**: Слишком мощный (позволяет JSX в Markdown), но не нужен (контент статичный)
- **markdown-it**: Альтернатива remark, но меньше плагинов
- **Прямой парсинг через регулярки**: Хрупко, не поддерживает edge cases

---

## 4. Telegram Bot API Integration в Next.js API Routes

### Решение

**Next.js API Route** (`app/api/contact/route.ts`) с прямым HTTP запросом к Telegram Bot API.

**Реализация**:

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  service: z.enum(["legal", "tech"]),
  honeypot: z.string().max(0), // Должно быть пустым (защита от спама)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Honeypot защита
    if (data.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Форматирование сообщения в Markdown
    const message = `
**Новая заявка с сайта Uralliance**

**Имя:** ${data.name}
**Email:** ${data.email}
**Телефон:** ${data.phone || "Не указан"}
**Направление:** ${data.service === "legal" ? "Юридические услуги" : "IT-решения"}

**Сообщение:**
${data.message}
    `;

    // Отправка в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!telegramResponse.ok) {
      throw new Error("Telegram API error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

**Environment Variables** (`.env.example`):

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
WHATSAPP_PHONE=+79991234567
TELEGRAM_USERNAME=@uralliance_bot
```

### Обоснование

1. **Простота**: Не требует внешних библиотек (только fetch)
2. **Безопасность**: Credentials в Environment Variables (Vercel), не экспонируются в клиенте
3. **Валидация**: Zod схемы на сервере (типобезопасно)
4. **Spam защита**: Honeypot поле (FR-026) — простое и эффективное
5. **Markdown форматирование**: Telegram поддерживает Markdown (parse_mode: "Markdown")

### Альтернативы Рассмотрены

- **node-telegram-bot-api**: Избыточно (нужна только отправка сообщений, не polling)
- **Telegraf**: Фреймворк для ботов, но не нужен для простой отправки
- **Прямой POST из клиента**: Небезопасно (экспонирует bot token)

---

## 5. Оптимизация Performance для Three.js в Next.js

### Решение

**Lazy loading с IntersectionObserver** + **React Three Fiber** с оптимизациями.

**Подход**:

1. Динамический импорт Three.js компонентов только когда секция видна
2. Использовать `next/dynamic` с `{ ssr: false }` для Three.js
3. Preload assets (текстуры, модели) заранее
4. Simplify геометрию для мобильных устройств

**Пример** (`src/components/sections/HeroSection.tsx`):

```typescript
'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Lazy load Three.js компонента
const ThreeScene = dynamic(() => import('@/components/animations/ThreeScene'), {
  ssr: false, // Не рендерить на сервере
  loading: () => <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-cyan-500/20" />,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [shouldLoadThree, setShouldLoadThree] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldLoadThree) {
      setShouldLoadThree(true);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative h-screen">
      {/* Legal сторона */}
      <div className="absolute left-0 w-1/2">...</div>

      {/* Tech сторона с 3D */}
      <div className="absolute right-0 w-1/2">
        {shouldLoadThree && <ThreeScene />}
      </div>
    </section>
  );
}
```

**Оптимизации Three.js**:

- Ограничить FPS до 30 на мобильных (вместо 60)
- Использовать `THREE.InstancedMesh` для повторяющихся объектов
- Отключить shadows на слабых устройствах
- Dispose геометрий и материалов при unmount

### Обоснование

1. **Bundle size**: Three.js ~600KB (compressed ~150KB) — lazy loading критичен для LCP
2. **Производительность**: IntersectionObserver предотвращает рендеринг до visibility (FR-029, FR-064)
3. **SSR compatibility**: `ssr: false` избегает ошибок hydration (Three.js использует `window`)
4. **Progressive enhancement**: Fallback (градиент) для устройств без WebGL

### Альтернативы Рассмотрены

- **Vanilla Three.js без React Three Fiber**: Больше контроля, но сложнее интеграция с React
- **2D альтернатива (Canvas 2D)**: Дешевле, но не соответствует требованиям (FR-007 требует 3D)
- **Preload Three.js на всех страницах**: Убивает performance metrics

---

## 6. Schema.org Структура для Многостраничного Сайта

### Решение

**JSON-LD разметка на каждой странице** с типами: Organization, Service, OfferCatalog, Article, LocalBusiness.

**Структура**:

1. **Главная страница** (`/`): Organization + LocalBusiness
2. **Страницы услуг** (`/services/legal/[slug]`): Service + Organization (provider)
3. **Прайс-лист** (`/price/`): OfferCatalog с itemListElement
4. **Кейсы** (`/cases/[slug]`): CreativeWork или Article
5. **Блог** (`/blog/[slug]`): Article с author, datePublished, dateModified
6. **Контакты** (`/contacts/`): LocalBusiness с address, telephone, geo

**Пример утилиты** (`src/lib/seo.ts`):

```typescript
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Uralliance",
    url: "https://uralliance.ru",
    logo: "https://uralliance.ru/logo.png",
    description: "Юридические услуги и IT-решения для бизнеса",
    sameAs: ["https://t.me/uralliance", "https://wa.me/79991234567"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-999-123-45-67",
      contactType: "Customer Service",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Uralliance",
    },
    areaServed: { "@type": "Country", name: "Russia" },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "RUB",
    },
  };
}
```

**Внедрение** в каждую страницу:

```typescript
// app/page.tsx
import { generateOrganizationSchema } from '@/lib/seo';

export default function HomePage() {
  const schema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Остальной контент */}
    </>
  );
}
```

### Обоснование

1. **SEO**: Schema.org улучшает Rich Snippets в Google (звездочки, цены, FAQ)
2. **Требования**: FR-055 - FR-059 явно требуют Schema.org разметку
3. **JSON-LD**: Рекомендуемый формат Google (vs Microdata или RDFa)
4. **Типобезопасность**: TypeScript interfaces для каждого типа Schema

### Альтернативы Рассмотрены

- **Microdata**: Встроенная разметка в HTML — сложнее поддерживать
- **RDFa**: Устаревший стандарт
- **next-seo библиотека**: Упрощает метатеги, но не Schema.org (придется добавлять вручную)

---

## 7. CSS Variables для Дизайн-Системы

### Решение

**Tailwind CSS Custom Properties** + **CSS Variables** в `styles/design-tokens.css`.

**Структура** (`styles/design-tokens.css`):

```css
:root {
  /* Colors - Legal */
  --color-legal-primary: #d4af37; /* Золото */
  --color-legal-accent: #f5e6d3;

  /* Colors - Tech */
  --color-tech-primary: #06b6d4; /* Cyan */
  --color-tech-accent: #22d3ee;

  /* Colors - Neutral */
  --color-background: #ffffff;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Poppins", sans-serif;

  /* Spacing */
  --spacing-section: 8rem; /* 128px */
  --spacing-container-max: 1440px;

  /* Breakpoints (reference only, not directly usable) */
  /* mobile: 320px, tablet: 768px, desktop: 1024px, wide: 1440px */

  /* Effects */
  --blur-nav: 12px;
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --color-background: #111827;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
}
```

**Интеграция с Tailwind** (`tailwind.config.ts`):

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        legal: {
          primary: "var(--color-legal-primary)",
          accent: "var(--color-legal-accent)",
        },
        tech: {
          primary: "var(--color-tech-primary)",
          accent: "var(--color-tech-accent)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      maxWidth: {
        container: "var(--spacing-container-max)",
      },
      backdropBlur: {
        nav: "var(--blur-nav)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### Обоснование

1. **Конституция**: FR-004 требует CSS Variables для всех цветов
2. **Темизация**: Легко переключать dark/light mode (если потребуется)
3. **Консистентность**: Единый источник правды для дизайн-токенов
4. **Tailwind совместимость**: CSS Variables работают с Tailwind utilities

### Альтернативы Рассмотрены

- **Только Tailwind config**: Сложнее использовать вне Tailwind классов
- **SCSS переменные**: Требует дополнительный build step
- **Hardcoded значения**: Противоречит конституции (FR-004)

---

## Итоговая Резолюция

| Неизвестное              | Решение                                          | Статус       |
| ------------------------ | ------------------------------------------------ | ------------ |
| Тестирование             | Опционально (Jest + Playwright если потребуется) | ✅ Разрешено |
| Aceternity UI интеграция | Copy-paste подход с адаптацией                   | ✅ Разрешено |
| Markdown parsing         | gray-matter + remark/rehype                      | ✅ Разрешено |
| Telegram Bot API         | Next.js API Route + fetch                        | ✅ Разрешено |
| Three.js оптимизация     | Lazy loading + IntersectionObserver              | ✅ Разрешено |
| Schema.org структура     | JSON-LD на каждой странице                       | ✅ Разрешено |
| CSS Variables            | Tailwind + CSS Variables                         | ✅ Разрешено |

**Следующий шаг**: Фаза 1 — Проектирование (data-model.md, contracts/, quickstart.md, designsystem.md)
