# UrAlliance 2.0

**Современный сайт для юридических и IT-услуг с продуманным дизайном и компонентной архитектурой.**

## 🚀 Быстрый старт

```bash
# Установка зависимостей
make install

# Запуск dev сервера и Storybook
make dev-all

# Остановка всех сервисов
make stop
```

После запуска откройте:
- **Сайт**: http://localhost:3000
- **Storybook**: http://localhost:6006

---

## 📋 Команды Makefile

| Команда | Описание |
|---------|----------|
| `make help` | Показать все доступные команды |
| `make install` | Установить зависимости |
| `make dev` | Запустить Next.js dev server |
| `make storybook` | Запустить Storybook |
| `make dev-all` | Запустить оба сервиса в фоне |
| `make stop` | Остановить все сервисы |
| `make stop-dev` | Остановить только Next.js |
| `make stop-storybook` | Остановить только Storybook |
| `make build` | Собрать production bundle |
| `make lint` | Проверить код линтером |
| `make lint-fix` | Автоматически исправить ошибки |
| `make clean` | Очистить кэш и остановить сервисы |
| `make restart` | Перезапустить все сервисы |
| `make status` | Проверить статус сервисов |

---

## 🛠 Технологии

### Frontend
- **Next.js 16.0.1** - React framework с App Router
- **React 19.2.0** - UI библиотека
- **TypeScript** - Типизация
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Анимации

### Design System
- **Storybook 10.0.7** - Component development environment
- **Radix UI** - Headless UI primitives
- **Custom Design Tokens** - Переменные цветов и размеров

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Turbopack** - Fast bundler (Next.js)

---

## 📁 Структура проекта

```
uralliance2.0/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # Страница "О нас"
│   │   ├── blog/               # Блог
│   │   ├── cases/              # Кейсы
│   │   ├── contacts/           # Контакты
│   │   ├── price/              # Цены
│   │   ├── services/           # Услуги
│   │   └── layout.tsx          # Root layout
│   │
│   ├── components/
│   │   ├── primitives/         # Базовые UI компоненты
│   │   │   ├── button.tsx      # Кнопка
│   │   │   ├── card.tsx        # Карточка
│   │   │   ├── badge.tsx       # Бейдж
│   │   │   ├── input.tsx       # Поле ввода
│   │   │   ├── section.tsx     # Секция
│   │   │   ├── heading.tsx     # Заголовок
│   │   │   ├── label.tsx       # Label/Eyebrow
│   │   │   ├── text.tsx        # Текст/параграф
│   │   │   ├── list.tsx        # Списки
│   │   │   └── stories/        # Storybook stories
│   │   │
│   │   ├── sections/           # Секции страниц
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── CasesPreview.tsx
│   │   │   ├── TechShowcase.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/             # Layout компоненты
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── animations/         # Анимированные компоненты
│   │   │   ├── ThreeScene.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   └── MagneticButton.tsx
│   │   │
│   │   └── mockups/            # Mockup компоненты
│   │       └── PhoneMockup.tsx
│   │
│   ├── lib/                    # Утилиты и хелперы
│   │   ├── utils.ts            # Общие утилиты (cn, etc.)
│   │   └── seo.ts              # SEO утилиты
│   │
│   └── types/                  # TypeScript типы
│       └── content.ts
│
├── content/                    # Контент (JSON/MD)
│   ├── services.json           # Данные услуг
│   ├── cases.json              # Кейсы
│   ├── blog.json               # Посты блога
│   └── prices.json             # Прайсы
│
├── public/                     # Статические файлы
│   └── images/                 # Изображения
│
├── .storybook/                 # Конфигурация Storybook
│   ├── main.ts
│   ├── preview.ts
│   └── STORY_TEMPLATE.md       # Шаблон для создания stories
│
├── scripts/                    # Скрипты
│   └── create-story.sh         # Генератор stories
│
├── Makefile                    # Make команды
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🎨 Design System

### Primitive Components

Все UI компоненты построены на переиспользуемых примитивах:

#### **Button** - Кнопки
```tsx
import { Button } from "@/components/primitives/button";

<Button variant="primary-legal" size="lg">
  Получить консультацию
</Button>
```

Варианты: `primary-legal`, `primary-tech`, `secondary-legal`, `secondary-tech`, `outline-legal`, `outline-tech`, `ghost`, `link`

#### **Section** - Секции страниц
```tsx
import { Section } from "@/components/primitives/section";

<Section variant="hero" background="gradient-light">
  {/* content */}
</Section>
```

Варианты: `hero`, `default`, `compact`, `feature`

#### **Heading** - Заголовки
```tsx
import { Heading } from "@/components/primitives/heading";

<Heading as="h1" size="hero" tone="legal">
  Заголовок
</Heading>
```

Размеры: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `hero`

#### **Label** - Eyebrow текст
```tsx
import { Label } from "@/components/primitives/label";

<Label tone="legal" spacing="widest">
  Наши услуги
</Label>
```

#### **Text** - Параграфы
```tsx
import { Text } from "@/components/primitives/text";

<Text size="lg" tone="secondary" leading="relaxed">
  Описание услуги...
</Text>
```

#### **List** - Списки
```tsx
import { List } from "@/components/primitives/list";

<List variant="checkmark" markerTone="legal">
  <li>Пункт 1</li>
  <li>Пункт 2</li>
</List>
```

### Color System

Проект использует dual-brand систему:
- **Legal** (золотой): `#D4AF37` - для юридических услуг
- **Tech** (cyan): `#06B6D4` - для IT-услуг

CSS переменные в `globals.css`:
```css
--color-legal-primary: #D4AF37;
--color-tech-primary: #06B6D4;
--color-text-primary: ...;
--color-text-secondary: ...;
--color-background-secondary: ...;
```

---

## 📚 Storybook

Все примитивы задокументированы в Storybook с примерами использования:

```bash
make storybook
# Открыть http://localhost:6006
```

Категории компонентов:
- **Primitives** - Базовые компоненты (Button, Section, Heading, etc.)
- **Layout** - Layout компоненты (Container, Header, Footer)
- **Animations** - Анимированные компоненты
- **Mockups** - Mockup компоненты

### Создание новых stories

```bash
# Использовать скрипт генератора
./scripts/create-story.sh ComponentName Category

# Или вручную по шаблону
cat .storybook/STORY_TEMPLATE.md
```

---

## 🔧 Разработка

### Соглашения о коде

1. **Все компоненты используют именованные экспорты**:
   ```tsx
   export const Component = () => { ... }
   ```

2. **Используйте ТОЛЬКО варианты компонентов, НЕ кастомные стили**:
   ```tsx
   // ✅ Правильно
   <Button variant="primary-tech" size="lg">Click</Button>

   // ❌ Неправильно
   <Button className="bg-blue-500 px-4 py-2">Click</Button>
   ```

3. **Используйте примитивы вместо HTML тегов**:
   ```tsx
   // ✅ Правильно
   <Section variant="default" spacing="lg">
     <Heading as="h2" size="xl">Title</Heading>
     <Text size="lg" tone="secondary">Description</Text>
   </Section>

   // ❌ Неправильно
   <section className="py-24">
     <h2 className="text-4xl font-bold">Title</h2>
     <p className="text-lg text-gray-600">Description</p>
   </section>
   ```

4. **TypeScript** - все компоненты должны быть типизированы

5. **forwardRef** - используйте для всех примитивов

### Git Workflow

Проект использует Husky для pre-commit hooks:
- Автоматический lint перед коммитом
- Проверка форматирования

```bash
git add .
git commit -m "feat: Add new feature"
```

---

## 🚢 Production Build

```bash
# Собрать production bundle
make build

# Запустить production сервер
npm start
```

---

## 📖 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

---

## 📝 License

Copyright © 2024 UrAlliance. All rights reserved.
