# Quickstart: Uralliance Premium Website

**Дата**: 2025-11-06
**Цель**: Быстрый старт для разработчиков — от клонирования до первого запуска

---

## Предварительные Требования

### Обязательно

- **Node.js**: 18.x или выше (проверить: `node --version`)
- **npm** или **yarn** или **pnpm**: Любой менеджер пакетов (рекомендуется pnpm)
- **Git**: Для клонирования репозитория

### Опционально

- **VS Code**: Рекомендуемый редактор с расширениями:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript + JavaScript Language Features
- **Vercel CLI**: Для локального тестирования production build (`npm i -g vercel`)

---

## Шаг 1: Клонирование и Установка

### 1.1. Клонировать репозиторий

```bash
git clone https://github.com/your-org/uralliance2.0.git
cd uralliance2.0
```

### 1.2. Установить зависимости

```bash
npm install
# или
yarn install
# или
pnpm install
```

**Основные зависимости** (автоматически установятся):

- Next.js 14+
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Framer Motion
- GSAP
- Three.js / React Three Fiber
- react-hook-form + zod
- gray-matter (Markdown parsing)
- clsx + tailwind-merge

---

## Шаг 2: Настройка Environment Variables

### 2.1. Создать `.env.local`

```bash
cp .env.example .env.local
```

### 2.2. Заполнить значения в `.env.local`

**Обязательные для формы контактов**:

```env
# Telegram Bot API
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890

# Мессенджеры (для ссылок в Footer)
NEXT_PUBLIC_WHATSAPP_PHONE=+79991234567
NEXT_PUBLIC_TELEGRAM_USERNAME=@uralliance_bot
```

**Как получить Telegram credentials**:

1. **Bot Token**: Создать бота через [@BotFather](https://t.me/BotFather)
   - Отправить `/newbot`
   - Следовать инструкциям
   - Получить токен вида `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
2. **Chat ID**: Получить ID чата куда будут приходить сообщения
   - Добавить бота в приватный чат или группу
   - Отправить сообщение в чат
   - Открыть `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найти `"chat":{"id":-1001234567890}`

---

## Шаг 3: Запуск Development Server

### 3.1. Запустить dev server

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

### 3.2. Открыть в браузере

```
http://localhost:3000
```

**Что вы увидите**:

- Главная страница с Hero секцией (split-screen Legal/Tech)
- Sticky navigation
- Все секции главной страницы с анимациями (если контент добавлен)

**Hot Reload**: Изменения в коде автоматически обновляются без перезагрузки сервера.

---

## Шаг 4: Добавление Контента

### 4.1. Структура контента

```
content/
├── services/
│   ├── legal/
│   │   └── arbitrazh.md
│   └── tech/
│       └── crm.md
├── cases/
│   └── case-1.md
├── blog/
│   └── article-1.md
└── prices.json
```

### 4.2. Создать первую услугу

```bash
mkdir -p content/services/legal
cat > content/services/legal/arbitrazh.md <<'EOF'
---
title: "Арбитражные споры"
description: "Защита интересов в арбитражных судах всех инстанций"
price: "от 50 000 ₽"
icon: "⚖️"
category: "legal"
order: 1
seo:
  keywords: "арбитраж екатеринбург, арбитражный юрист"
  ogImage: "/images/services/arbitrazh-og.jpg"
---

## Что входит в услугу

- Анализ документов
- Подготовка иска
- Представительство в суде

## Стоимость

Стоимость зависит от сложности дела. Консультация — от 3 000 ₽.
EOF
```

### 4.3. Перейти на страницу услуги

```
http://localhost:3000/services/legal/arbitrazh
```

### 4.4. Создать прайс-лист

```bash
cat > content/prices.json <<'EOF'
[
  {
    "id": "legal-consultation",
    "title": "Консультация юриста",
    "description": "Юридическая консультация по любым вопросам",
    "price": 3000,
    "priceFrom": false,
    "unit": "час",
    "category": "Консультации"
  },
  {
    "id": "crm-integration",
    "title": "Интеграция CRM",
    "description": "Интеграция CRM с 1С, WhatsApp, Telegram",
    "price": 80000,
    "priceFrom": true,
    "unit": "проект",
    "category": "CRM"
  }
]
EOF
```

Прайс-лист доступен на: `http://localhost:3000/price/`

---

## Шаг 5: Проверка Качества Кода

### 5.1. Запустить линтеры

```bash
# ESLint
npm run lint

# TypeScript проверка
npm run type-check
# или (если нет скрипта)
npx tsc --noEmit

# Prettier форматирование
npm run format
# или (если нет скрипта)
npx prettier --write .
```

### 5.2. Исправить ошибки

- **ESLint**: Автофикс — `npm run lint -- --fix`
- **Prettier**: Автоформат — `npx prettier --write .`
- **TypeScript**: Исправить вручную (ошибки типов)

---

## Шаг 6: Тестирование Контактной Формы

### 6.1. Убедиться, что Telegram credentials заполнены в `.env.local`

### 6.2. Открыть главную страницу, прокрутить до формы

```
http://localhost:3000/#contact
```

### 6.3. Заполнить форму и отправить

**Что произойдет**:

1. Клиентская валидация (react-hook-form + zod)
2. POST запрос на `/api/contact`
3. Серверная валидация + honeypot проверка
4. Отправка сообщения в Telegram bot
5. Success message на странице

### 6.4. Проверить Telegram чат

Сообщение должно прийти в формате:

```
**Новая заявка с сайта Uralliance**

**Имя:** Иван Петров
**Email:** ivan@example.com
**Телефон:** +79991234567
**Направление:** Юридические услуги

**Сообщение:**
Нужна консультация по арбитражному спору
```

---

## Шаг 7: Production Build

### 7.1. Создать production build

```bash
npm run build
```

**Что происходит**:

- TypeScript компиляция
- Next.js static generation для всех страниц
- Оптимизация bundle (tree-shaking, minification)
- Генерация sitemap.xml, robots.txt

### 7.2. Запустить production server локально

```bash
npm run start
```

Сайт доступен на `http://localhost:3000` (production mode).

### 7.3. Проверить Lighthouse метрики

**Chrome DevTools**:

1. Открыть DevTools (F12)
2. Lighthouse tab → Generate report
3. Проверить метрики:
   - Performance ≥90
   - Accessibility ≥90
   - Best Practices ≥90
   - SEO ≥90

**Если метрики ниже**:

- Проверить размер bundle (`npm run analyze` если настроен @next/bundle-analyzer)
- Проверить lazy loading для Three.js компонентов
- Проверить image optimization (Next.js Image component)

---

## Шаг 8: Деплой на Vercel

### 8.1. Установить Vercel CLI (опционально)

```bash
npm i -g vercel
```

### 8.2. Деплой через Vercel CLI

```bash
vercel
```

**Следовать инструкциям**:

- Link to existing project? → No
- Project name: uralliance
- Directory to deploy: ./
- Want to override settings? → No

### 8.3. Настроить Environment Variables в Vercel Dashboard

1. Открыть [vercel.com/dashboard](https://vercel.com/dashboard)
2. Выбрать проект uralliance
3. Settings → Environment Variables
4. Добавить:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_WHATSAPP_PHONE`
   - `NEXT_PUBLIC_TELEGRAM_USERNAME`

### 8.4. Redeploy после добавления env vars

```bash
vercel --prod
```

### 8.5. Проверить production сайт

```
https://uralliance.vercel.app
# или custom domain
https://uralliance.ru
```

---

## Шаг 9: Настройка Custom Domain (опционально)

### 9.1. В Vercel Dashboard

1. Settings → Domains
2. Add Domain: `uralliance.ru`
3. Следовать инструкциям по настройке DNS

### 9.2. Настроить DNS записи

**У вашего регистратора доменов**:

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 9.3. Дождаться propagation (до 48 часов)

Проверить: `https://uralliance.ru`

---

## Troubleshooting

### Проблема: `npm install` fails

**Решение**:

- Проверить версию Node.js: `node --version` (должна быть ≥18.x)
- Очистить cache: `npm cache clean --force`
- Удалить `node_modules` и `package-lock.json`, повторить `npm install`

### Проблема: TypeScript ошибки при запуске

**Решение**:

- Проверить `tsconfig.json` (должен быть `"strict": true`)
- Запустить `npx tsc --noEmit` для полной проверки типов
- Исправить ошибки типов (нельзя игнорировать!)

### Проблема: Контактная форма не отправляет сообщения

**Решение**:

- Проверить `.env.local` (должны быть заполнены `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- Проверить консоль браузера (F12) — есть ли ошибки?
- Проверить логи Next.js в терминале — есть ли ошибки от Telegram API?
- Проверить, что бот добавлен в чат и имеет права отправлять сообщения

### Проблема: Three.js компоненты не рендерятся

**Решение**:

- Проверить, что компонент помечен `'use client'` (Three.js не работает на сервере)
- Проверить, что используется `dynamic import` с `{ ssr: false }`
- Проверить консоль браузера — возможно ошибка WebGL

### Проблема: Lighthouse Performance <90

**Решение**:

- Проверить размер bundle: `npm run build` → смотреть output
- Убедиться, что Three.js загружается lazy (IntersectionObserver)
- Убедиться, что изображения оптимизированы (Next.js Image component)
- Проверить, что GSAP и Framer Motion не загружаются сразу для всех секций

---

## Полезные Команды

| Команда                 | Описание                                              |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | Запустить development server на http://localhost:3000 |
| `npm run build`         | Создать production build                              |
| `npm run start`         | Запустить production server локально                  |
| `npm run lint`          | Запустить ESLint проверку                             |
| `npm run lint -- --fix` | Автофикс ESLint ошибок                                |
| `npm run type-check`    | Проверка TypeScript типов                             |
| `npm run format`        | Форматирование кода через Prettier                    |
| `vercel`                | Деплой на Vercel (preview)                            |
| `vercel --prod`         | Деплой на Vercel (production)                         |

---

## Следующие Шаги

1. **Изучить designsystem.md** — документация дизайн-системы (цвета, типографика, spacing)
2. **Прочитать spec.md** — полная спецификация функциональных требований
3. **Изучить data-model.md** — структуры данных для контента
4. **Прочитать research.md** — технические решения и best practices
5. **Начать реализацию** — следовать tasks.md (будет создан командой `/speckit.tasks`)

---

## Поддержка

**Документация**:

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- GSAP: https://greensock.com/docs/
- Aceternity UI: https://ui.aceternity.com

**Вопросы по проекту**: См. spec.md, research.md, plan.md
