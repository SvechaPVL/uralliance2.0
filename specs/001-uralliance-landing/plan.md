# План Реализации: Uralliance Premium Website

**Ветка**: `001-uralliance-landing` | **Дата**: 2025-11-06 | **Спецификация**: [spec.md](./spec.md)
**Исходные данные**: Спецификация функции из `/specs/001-uralliance-landing/spec.md`

**Примечание**: Этот шаблон заполняется командой `/speckit.plan`. См. `.specify/templates/commands/plan.md` для рабочего процесса выполнения.

## Резюме

Премиум многостраничный корпоративный сайт для Uralliance — компании, объединяющей юридические услуги и IT-решения. Сайт следует дизайн-концепции "Neubrutalism meets Glassmorphism" с split-screen hero секцией, премиум анимациями (Framer Motion, GSAP), 3D-элементами (Three.js), и showcase-компонентами (Aceternity UI: MacBook Scroll, Bento Grid, Hero Parallax, Container Scroll). Включает 12 секций на главной странице, динамические страницы услуг (/services/legal/, /services/tech/), кейсы, прайс-лист, блог для SEO, с контентом из Markdown/JSON файлов. Интеграция с Telegram bot для форм контактов. Обязательные метрики: Lighthouse ≥90, WCAG 2.1 AA, LCP <2.5s.

## Технический Контекст

**Язык/Версия**: TypeScript 5+ (strict mode), JavaScript ES2022+ для конфигураций
**Основные Зависимости**: Next.js 14+ (App Router), React 18+, Tailwind CSS 3+, Framer Motion, GSAP, Three.js/React Three Fiber, shadcn/ui, Aceternity UI components, react-hook-form, zod, gray-matter (Markdown parsing)
**Хранилище**: Файловая система (Markdown/JSON для контента в /content/), Environment Variables (Vercel) для credentials (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, WHATSAPP_PHONE, TELEGRAM_USERNAME)
**Тестирование**: ТРЕБУЕТ УТОЧНЕНИЯ (опционально: Jest + React Testing Library, Playwright для E2E)
**Целевая Платформа**: Vercel (Node.js 18+ runtime), браузеры (Chrome, Firefox, Safari, Edge - последние 2 версии)
**Тип Проекта**: Веб-приложение (frontend-only с API Routes для Telegram bot integration)
**Цели Производительности**: Lighthouse Desktop ≥90 (все метрики), Lighthouse Mobile ≥85, LCP <2.5s, FCP <1.8s, TBT <300ms, CLS <0.1
**Ограничения**: Initial bundle <500KB (compressed), WCAG 2.1 Level AA соответствие, поддержка prefers-reduced-motion, SEO-оптимизация (Schema.org, sitemap.xml, robots.txt)
**Масштаб/Охват**: ~20 страниц (главная + динамические услуги/кейсы/блог), 12 секций на главной, 64 функциональных требования, поддержка 4 breakpoints (320px, 768px, 1024px, 1440px)

## Проверка Конституции

_КОНТРОЛЬ: Должен быть пройден перед исследованием Фазы 0. Повторная проверка после проектирования Фазы 1._

### Принцип I: Дизайн-Ориентированный Подход

- ✅ **FR-001**: Следует концепции "Neubrutalism meets Glassmorphism"
- ✅ **FR-005, FR-006, FR-008**: Анимации присутствуют (Framer Motion, GSAP, 3D-элементы)
- ✅ **FR-003**: Все интерактивные элементы имеют hover-эффекты
- ✅ **FR-002**: Визуальная иерархия Legal (золото) vs Tech (cyan)
- ✅ **FR-007**: 3D-элементы (Three.js) и параллакс (FR-010)

**Статус**: ✅ PASS

### Принцип II: Производительность и Доступность

- ✅ **SC-001, SC-002**: Lighthouse ≥90 (Desktop), ≥85 (Mobile) в критериях успеха
- ✅ **SC-003-SC-006**: Core Web Vitals метрики определены (LCP <2.5s, FCP <1.8s, TBT <300ms, CLS <0.1)
- ✅ **SC-008**: Lighthouse Accessibility ≥90
- ✅ **SC-010**: WCAG 2.1 Level AA соответствие
- ✅ **FR-032-FR-038**: Accessibility требования (keyboard navigation, ARIA, контраст ≥4.5:1)
- ✅ **FR-013**: useReducedMotion hook для prefers-reduced-motion

**Статус**: ✅ PASS

### Принцип III: Современные Технологии

- ✅ **FR-039**: Next.js 14+ с App Router (не Pages Router)
- ✅ **FR-040**: React 18+ с Server Components
- ✅ **FR-041**: TypeScript 5+ с strict mode
- ✅ **FR-042**: Tailwind CSS 3+ с CSS Variables
- ✅ Framer Motion для декларативных анимаций
- ✅ GSAP для сложных timeline-анимаций
- ✅ Three.js / React Three Fiber для 3D-визуализаций

**Статус**: ✅ PASS

### Принцип IV: Компонентная Архитектура

- ✅ **FR-046-FR-063**: UI компоненты четко определены (shadcn/ui базовые, Aceternity UI showcase, кастомные device mockups)
- ✅ Структура компонентов: primitives, layout, sections, animations (соответствует конституции)
- ⚠️ **designsystem.md**: НЕ создан на данный момент (должен быть создан в Фазе 1 согласно конституции)
- ✅ Компоненты параметризованы через props (FR-049-FR-052)
- ✅ Анимации параметризованы (FR-052, FR-064)

**Статус**: ⚠️ CONDITIONAL PASS (требуется создание designsystem.md в Фазе 1)

### Принцип V: Типобезопасность Везде

- ✅ **FR-041**: TypeScript strict mode обязателен
- ✅ **FR-043**: Все React компоненты ДОЛЖНЫ иметь явные TypeScript интерфейсы для props (без `any`)
- ✅ **FR-019**: react-hook-form + zod для валидации форм (типобезопасные схемы)
- ✅ Сущности типизированы (Service, PriceItem, CaseStudy, BlogPost, ContactFormSubmission, MessengerContact)

**Статус**: ✅ PASS

### Технологический Стек

- ✅ **Frontend**: Next.js 14+, React 18+, TypeScript 5+, Tailwind CSS 3+, Framer Motion, GSAP, Three.js
- ✅ **Деплой**: Vercel (соответствует конституции)
- ✅ **Инструменты разработки**: ESLint (FR-044), Prettier (FR-044), Husky + lint-staged (FR-045)

**Статус**: ✅ PASS

### Этапы Реализации (из конституции)

Конституция определяет обязательные этапы:

1. **Этап 1: Фундамент (1-2 дня)** - Next.js проект, Tailwind, designsystem.md, базовые компоненты
2. **Этап 2: Hero + Навигация (1 день)** - Split-screen Hero, Sticky navigation, мобильное меню
3. **Этап 3: Основные секции (2-3 дня)** - Услуги, Кейсы, Процесс, Форма
4. **Этап 4: Анимации + полировка (1-2 дня)** - GSAP scroll triggers, микро-анимации, Lighthouse audit, Accessibility audit

**Соответствие**: ✅ Спецификация структурирована по User Stories (P1-P9), которые можно сопоставить с этими этапами

### Контрольные Точки Качества

- ✅ **Перед коммитом**: ESLint, TypeScript, Prettier (FR-044, FR-045)
- ✅ **Перед PR**: Lighthouse ≥90, Responsive design, No `any` без обоснования (SC-001, SC-002, SC-017, FR-043)
- ✅ **Перед production**: Lighthouse ≥90, WCAG 2.1 AA, Cross-browser, Mobile testing, Forms валидация, SEO, Analytics (SC-001-SC-026)

**Статус**: ✅ PASS

### Итоговая Оценка

| Принцип                              | Статус         | Примечания                                    |
| ------------------------------------ | -------------- | --------------------------------------------- |
| I. Дизайн-Ориентированный Подход     | ✅ PASS        | Все обязательные требования выполнены         |
| II. Производительность и Доступность | ✅ PASS        | Метрики и accessibility требования определены |
| III. Современные Технологии          | ✅ PASS        | Next.js 14+, React 18+, TypeScript 5+ strict  |
| IV. Компонентная Архитектура         | ⚠️ CONDITIONAL | Требуется designsystem.md в Фазе 1            |
| V. Типобезопасность Везде            | ✅ PASS        | Strict mode, типизация сущностей и форм       |
| Технологический Стек                 | ✅ PASS        | Соответствует конституции                     |
| Этапы Реализации                     | ✅ PASS        | User Stories сопоставимы с этапами            |
| Контрольные Точки                    | ✅ PASS        | Все checkpoints определены                    |

**Общий Статус**: ✅ **PASS** (с обязательством создать designsystem.md в Фазе 1)

**Требуемые Действия**:

1. Создать `/designsystem.md` в Фазе 1 с документацией дизайн-системы (цвета, типографика, spacing, breakpoints)
2. Убедиться, что базовые компоненты (Button, Card, Container, Input) реализованы ДО страниц

## Структура Проекта

### Документация (эта функция)

```text
specs/[###-функция]/
├── plan.md              # Этот файл (вывод команды /speckit.plan)
├── research.md          # Вывод Фазы 0 (команда /speckit.plan)
├── data-model.md        # Вывод Фазы 1 (команда /speckit.plan)
├── quickstart.md        # Вывод Фазы 1 (команда /speckit.plan)
├── contracts/           # Вывод Фазы 1 (команда /speckit.plan)
└── tasks.md             # Вывод Фазы 2 (команда /speckit.tasks - НЕ создается командой /speckit.plan)
```

### Исходный Код (корень репозитория)

```text
uralliance2.0/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout с Header/Footer
│   ├── page.tsx                  # Главная страница (/)
│   ├── globals.css               # Global styles + Tailwind imports
│   ├── api/                      # API Routes
│   │   └── contact/
│   │       └── route.ts          # POST /api/contact - Telegram bot integration
│   ├── services/
│   │   ├── [category]/           # Dynamic route: /services/legal/, /services/tech/
│   │   │   ├── page.tsx          # Список услуг категории
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Детальная страница услуги
│   │   └── layout.tsx            # Layout для страниц услуг
│   ├── price/
│   │   └── page.tsx              # Прайс-лист страница
│   ├── cases/
│   │   ├── page.tsx              # Галерея кейсов
│   │   └── [slug]/
│   │       └── page.tsx          # Детальная страница кейса
│   ├── blog/
│   │   ├── page.tsx              # Список статей блога
│   │   └── [slug]/
│   │       └── page.tsx          # Детальная страница статьи
│   ├── about/
│   │   └── page.tsx              # О компании
│   ├── contacts/
│   │   └── page.tsx              # Контакты + карта
│   ├── sitemap.ts                # Автогенерация sitemap.xml
│   └── robots.ts                 # Генерация robots.txt
│
├── src/
│   ├── components/
│   │   ├── primitives/           # shadcn/ui базовые компоненты
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   └── form.tsx
│   │   ├── layout/               # Layout компоненты
│   │   │   ├── Header.tsx        # Sticky navigation с blur-эффектом
│   │   │   ├── Footer.tsx        # Footer с ссылками
│   │   │   ├── MobileMenu.tsx    # Drawer-меню для мобильных
│   │   │   └── Container.tsx     # Max-width container
│   │   ├── sections/             # Секции главной страницы
│   │   │   ├── HeroSection.tsx   # Split-screen Hero с морфингом
│   │   │   ├── TrustSection.tsx  # Animated counters
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── TechShowcase.tsx  # Bento Grid
│   │   │   ├── WebProjects.tsx   # MacBook Scroll
│   │   │   ├── MobileApps.tsx    # Container Scroll
│   │   │   ├── Integration.tsx   # SVG анимации связей
│   │   │   ├── CasesPreview.tsx  # Hero Parallax
│   │   │   ├── ProcessTimeline.tsx
│   │   │   ├── PricePreview.tsx
│   │   │   └── ContactCTA.tsx    # Форма контактов
│   │   ├── animations/           # Aceternity UI + кастомные анимированные компоненты
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── MacbookScroll.tsx
│   │   │   ├── ContainerScroll.tsx
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── HeroParallax.tsx
│   │   │   ├── Card3D.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── Particles.tsx
│   │   ├── mockups/              # Device mockups
│   │   │   ├── PhoneMockup.tsx   # iPhone, Android варианты
│   │   │   ├── LaptopMockup.tsx  # MacBook стиль
│   │   │   ├── TabletMockup.tsx
│   │   │   └── DesktopMockup.tsx
│   │   └── forms/                # Формы
│   │       └── ContactForm.tsx   # react-hook-form + zod + honeypot
│   ├── lib/
│   │   ├── utils.ts              # cn() helper (clsx + tailwind-merge)
│   │   ├── content.ts            # Функции для чтения Markdown/JSON
│   │   ├── telegram.ts           # Telegram Bot API wrapper
│   │   └── seo.ts                # Schema.org helpers, метатеги
│   ├── hooks/
│   │   ├── useReducedMotion.ts   # prefers-reduced-motion hook
│   │   ├── useScrollTrigger.ts   # GSAP ScrollTrigger wrapper
│   │   └── useIntersectionObserver.ts
│   └── types/
│       ├── content.ts            # TypeScript типы для Service, PriceItem, CaseStudy, BlogPost
│       ├── forms.ts              # Типы и Zod схемы для форм
│       └── api.ts                # Типы для API responses
│
├── content/                      # Контент в Markdown/JSON
│   ├── services/
│   │   ├── legal/
│   │   │   ├── arbitrazh.md      # Арбитражные споры
│   │   │   ├── corporate.md      # Корпоративное право
│   │   │   └── ...
│   │   └── tech/
│   │       ├── crm.md            # Интеграция CRM
│   │       ├── web.md            # Разработка сайтов
│   │       └── ...
│   ├── cases/
│   │   ├── case-1.md
│   │   └── ...
│   ├── blog/
│   │   ├── article-1.md
│   │   └── ...
│   └── prices.json               # Прайс-лист
│
├── public/                       # Статические файлы
│   ├── images/
│   │   ├── logo.svg
│   │   ├── cases/                # Изображения кейсов
│   │   ├── blog/                 # Изображения статей
│   │   └── og-image.jpg          # Open Graph default image
│   └── fonts/                    # Кастомные шрифты (если нужны)
│
├── styles/                       # Дополнительные стили
│   └── design-tokens.css         # CSS Variables для дизайн-системы
│
├── tailwind.config.ts            # Tailwind конфигурация + CSS Variables
├── tsconfig.json                 # TypeScript config (strict mode)
├── next.config.js                # Next.js конфигурация
├── package.json                  # Зависимости
├── .eslintrc.json                # ESLint config (Next.js)
├── .prettierrc                   # Prettier config
├── .env.local                    # Environment variables (local, в .gitignore)
├── .env.example                  # Шаблон для env variables
└── designsystem.md               # Документация дизайн-системы (создать в Фазе 1)
```

**Решение по Структуре**:

Выбрана структура **Next.js 14 App Router** (одиночное веб-приложение frontend-only с API Routes). Это не традиционное разделение backend/frontend, а современная архитектура с Server Components и API Routes в одном проекте.

**Обоснование**:

1. **app/** - Next.js 14 App Router (не Pages Router) для файловой маршрутизации
2. **src/components/** - компонентная архитектура согласно конституции (primitives, layout, sections, animations)
3. **content/** - файловое хранилище для контента (Markdown/JSON), не требует БД
4. **app/api/** - API Routes для Telegram bot integration (серверная логика)
5. **src/lib/** - утилиты и helpers (content parsing, SEO, Telegram API)
6. **src/types/** - централизованная типизация

**Ключевые директории**:

- `app/[page]/page.tsx` - страницы сайта
- `src/components/sections/` - секции главной страницы
- `src/components/animations/` - Aceternity UI компоненты
- `content/` - весь контент сайта (услуги, кейсы, блог)

## Отслеживание Сложности

> **Заполняйте ТОЛЬКО если Проверка Конституции имеет нарушения, которые должны быть обоснованы**

**Нарушений НЕТ** — все принципы конституции соблюдены, дополнительное обоснование не требуется.

---

## Повторная Проверка Конституции (После Фазы 1)

_КОНТРОЛЬ: Выполнена после завершения проектирования (research.md, data-model.md, contracts/, quickstart.md, designsystem.md)_

### Принцип IV: Компонентная Архитектура (Повторная проверка)

**Предыдущий статус**: ⚠️ CONDITIONAL PASS (требовалось создать designsystem.md в Фазе 1)

**Текущий статус**: ✅ **PASS**

**Проверка**:

- ✅ `designsystem.md` создан в корне проекта (`/designsystem.md`)
- ✅ Документация включает: цвета, типографику, spacing, breakpoints, компоненты, эффекты, accessibility
- ✅ CSS Variables определены для всех цветов дизайн-системы
- ✅ Структура компонентов документирована (primitives, layout, sections, animations)

**Обязательство выполнено**: designsystem.md создан и полностью соответствует требованиям конституции (Этап 1: Фундамент).

### Итоговая Оценка (После Фазы 1)

| Принцип                              | Статус      | Изменение                        |
| ------------------------------------ | ----------- | -------------------------------- |
| I. Дизайн-Ориентированный Подход     | ✅ PASS     | Без изменений                    |
| II. Производительность и Доступность | ✅ PASS     | Без изменений                    |
| III. Современные Технологии          | ✅ PASS     | Без изменений                    |
| IV. Компонентная Архитектура         | ✅ **PASS** | ⚠️ → ✅ (designsystem.md создан) |
| V. Типобезопасность Везде            | ✅ PASS     | Без изменений                    |
| Технологический Стек                 | ✅ PASS     | Без изменений                    |
| Этапы Реализации                     | ✅ PASS     | Без изменений                    |
| Контрольные Точки                    | ✅ PASS     | Без изменений                    |

**Общий Статус**: ✅ **FULL PASS** (все принципы полностью соблюдены)

**Артефакты Фазы 0 и Фазы 1**:

- ✅ `/specs/001-uralliance-landing/research.md` — технические решения и best practices
- ✅ `/specs/001-uralliance-landing/data-model.md` — структуры данных для контента
- ✅ `/specs/001-uralliance-landing/contracts/api-contact.yaml` — API контракт для Telegram bot endpoint
- ✅ `/specs/001-uralliance-landing/quickstart.md` — инструкции по запуску для разработчиков
- ✅ `/designsystem.md` — документация дизайн-системы (обязательно по конституции)

**Проект готов к Фазе 2**: Генерация tasks.md (команда `/speckit.tasks`)
