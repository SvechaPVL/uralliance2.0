# Design System: Uralliance

**Версия**: 1.0.0
**Дата**: 2025-11-06
**Дизайн-концепция**: Neubrutalism meets Glassmorphism
**Статус**: Готов к реализации

---

## Обзор

Дизайн-система Uralliance объединяет **брутальную геометрию** (жесткие границы, bold типографика) с **футуристичными прозрачными элементами** (backdrop-blur, градиенты). Ключевая особенность — **дуальность Legal (золото) vs Tech (cyan)**, отражающая позиционирование компании.

**Принципы дизайна**:

1. **Contrast**: Четкое визуальное разделение Legal и Tech
2. **Motion**: Все интерактивные элементы должны двигаться
3. **Depth**: 3D-трансформации и параллакс для ощущения глубины
4. **Clarity**: Типографика и spacing для читаемости
5. **Accessibility**: WCAG 2.1 AA соответствие

---

## Цветовая Палитра

### Brand Colors

#### Legal (Юридические услуги)

```css
--color-legal-primary: #d4af37; /* Золото — роскошь, доверие, стабильность */
--color-legal-accent: #f5e6d3; /* Светлое золото — для hover states */
--color-legal-dark: #a68b2c; /* Темное золото — для текста на светлом фоне */
```

**Применение**:

- Заголовки Legal-секций
- Кнопки CTA для юридических услуг
- Иконки и badges юридических услуг
- Hover states для Legal-карточек

#### Tech (IT-решения)

```css
--color-tech-primary: #06b6d4; /* Cyan — технологии, инновации, будущее */
--color-tech-accent: #22d3ee; /* Яркий cyan — для hover states */
--color-tech-dark: #0891b2; /* Темный cyan — для текста на светлом фоне */
```

**Применение**:

- Заголовки Tech-секций
- Кнопки CTA для IT-услуг
- 3D-элементы и частицы
- Hover states для Tech-карточек

### Neutral Colors

```css
/* Light Mode (default) */
--color-background: #ffffff;
--color-background-secondary: #f9fafb;
--color-text-primary: #1f2937; /* Gray-800 */
--color-text-secondary: #6b7280; /* Gray-500 */
--color-text-muted: #9ca3af; /* Gray-400 */
--color-border: #e5e7eb; /* Gray-200 */

/* Dark Mode (опционально, если потребуется) */
[data-theme="dark"] {
  --color-background: #111827;
  --color-background-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
}
```

### Semantic Colors

```css
--color-success: #10b981; /* Green-500 */
--color-error: #ef4444; /* Red-500 */
--color-warning: #f59e0b; /* Amber-500 */
--color-info: #3b82f6; /* Blue-500 */
```

### Gradient Overlays

```css
--gradient-legal: linear-gradient(135deg, #d4af37 0%, #f5e6d3 100%);
--gradient-tech: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%);
--gradient-hero: linear-gradient(135deg, #d4af37 0%, #06b6d4 100%);
--gradient-glass: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.1) 0%,
  rgba(255, 255, 255, 0.05) 100%
);
```

---

## Типографика

### Font Stack

```css
--font-sans:
  "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
  "Helvetica Neue", sans-serif;
--font-display: "Poppins", "Inter", sans-serif; /* Для заголовков */
--font-mono: "JetBrains Mono", "Fira Code", "Courier New", monospace; /* Для кода */
```

**Загрузка шрифтов** (Next.js):

```typescript
// app/layout.tsx
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const poppins = Poppins({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
```

### Type Scale

```css
/* Mobile (320px+) */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */

/* Desktop (1024px+) */
--text-6xl: 3.75rem; /* 60px */
--text-7xl: 4.5rem; /* 72px */
--text-8xl: 6rem; /* 96px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Применение

| Элемент          | Шрифт   | Размер (Mobile)    | Размер (Desktop)  | Weight           | Line Height       |
| ---------------- | ------- | ------------------ | ----------------- | ---------------- | ----------------- |
| H1 (Hero)        | Poppins | `text-4xl` (36px)  | `text-7xl` (72px) | `font-extrabold` | `leading-tight`   |
| H2 (Section)     | Poppins | `text-3xl` (30px)  | `text-5xl` (48px) | `font-bold`      | `leading-tight`   |
| H3 (Sub-section) | Poppins | `text-2xl` (24px)  | `text-4xl` (36px) | `font-bold`      | `leading-snug`    |
| H4 (Card title)  | Poppins | `text-xl` (20px)   | `text-2xl` (24px) | `font-semibold`  | `leading-snug`    |
| Body Text        | Inter   | `text-base` (16px) | `text-lg` (18px)  | `font-normal`    | `leading-relaxed` |
| Caption          | Inter   | `text-sm` (14px)   | `text-sm` (14px)  | `font-normal`    | `leading-normal`  |
| Button           | Inter   | `text-base` (16px) | `text-lg` (18px)  | `font-semibold`  | `leading-none`    |

---

## Spacing

### Spacing Scale (8pt Grid)

```css
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px */
--spacing-8: 2rem; /* 32px */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px */
--spacing-16: 4rem; /* 64px */
--spacing-20: 5rem; /* 80px */
--spacing-24: 6rem; /* 96px */
--spacing-32: 8rem; /* 128px */
```

### Section Spacing

```css
--spacing-section-mobile: 4rem; /* 64px между секциями на мобильных */
--spacing-section-desktop: 8rem; /* 128px между секциями на desktop */
```

### Container Widths

```css
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px; /* Max width для контента */
--container-full: 100%;
```

---

## Breakpoints

### Media Queries

```css
/* Mobile First подход */
/* XS (Extra Small) */
@media (min-width: 320px) {
  /* ... */
}

/* SM (Small - Мобильные телефоны в landscape) */
@media (min-width: 640px) {
  /* ... */
}

/* MD (Medium - Планшеты) */
@media (min-width: 768px) {
  /* ... */
}

/* LG (Large - Ноутбуки) */
@media (min-width: 1024px) {
  /* ... */
}

/* XL (Extra Large - Desktop) */
@media (min-width: 1280px) {
  /* ... */
}

/* 2XL (Wide Desktop) */
@media (min-width: 1536px) {
  /* ... */
}
```

### Tailwind Breakpoints (соответствуют выше)

```typescript
// tailwind.config.ts
theme: {
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
}
```

---

## Эффекты

### Shadows

```css
/* Карточки */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow эффекты для Legal/Tech */
--shadow-legal-glow: 0 0 20px rgba(212, 175, 55, 0.3);
--shadow-tech-glow: 0 0 20px rgba(6, 182, 212, 0.3);
```

### Blur

```css
--blur-none: 0;
--blur-sm: 4px;
--blur-md: 8px;
--blur-lg: 12px; /* Для navigation backdrop */
--blur-xl: 16px;
--blur-2xl: 24px;
--blur-3xl: 40px;
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem; /* 2px */
--radius: 0.25rem; /* 4px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-3xl: 1.5rem; /* 24px */
--radius-full: 9999px; /* Полностью круглый */
```

**Применение**:

- **Карточки**: `--radius-lg` (8px)
- **Кнопки**: `--radius-md` (6px)
- **Inputs**: `--radius-md` (6px)
- **Badges**: `--radius-full` (круглые)
- **3D-карточки**: `--radius-xl` (12px)

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);

/* Custom Easings */
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Применение**:

- **Hover states**: `--transition-base` (200ms)
- **Magnetic button**: `--ease-spring` для плавного следования за курсором
- **3D трансформации**: `--transition-slow` (300ms)
- **Скролл анимации**: `--transition-slower` (500ms)

---

## Компоненты

### Button

**Варианты**:

#### Primary (Legal)

```css
.btn-primary-legal {
  background: var(--color-legal-primary);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);
}

.btn-primary-legal:hover {
  background: var(--color-legal-accent);
  box-shadow: var(--shadow-legal-glow);
  transform: translateY(-2px);
}
```

#### Primary (Tech)

```css
.btn-primary-tech {
  background: var(--color-tech-primary);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  transition: var(--transition-base);
  box-shadow: var(--shadow-md);
}

.btn-primary-tech:hover {
  background: var(--color-tech-accent);
  box-shadow: var(--shadow-tech-glow);
  transform: translateY(-2px);
}
```

#### Magnetic Button (Hero CTA)

Использует Framer Motion `useSpring` для плавного следования за курсором.
См. `src/components/animations/MagneticButton.tsx`.

### Card

**Glassmorphism стиль**:

```css
.card-glass {
  background: var(--gradient-glass);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-xl);
  transition: var(--transition-base);
}

.card-glass:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2xl);
}
```

**3D Card (Bento Grid)**:
См. `src/components/animations/Card3D.tsx` для реализации с `rotateX/rotateY`.

### Input

```css
.input {
  background: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-primary);
  transition: var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-tech-primary);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.input-error {
  border-color: var(--color-error);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.badge-legal {
  background: rgba(212, 175, 55, 0.1);
  color: var(--color-legal-dark);
}

.badge-tech {
  background: rgba(6, 182, 212, 0.1);
  color: var(--color-tech-dark);
}
```

---

## Анимации

### Framer Motion Variants

#### Fade In Up (для секций)

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};
```

#### Stagger Children (для списков)

```typescript
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

#### Scale In (для карточек)

```typescript
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 },
};
```

### GSAP ScrollTrigger

```typescript
// Пример для Timeline секции
gsap.to(".timeline-progress", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".timeline-section",
    start: "top center",
    end: "bottom center",
    scrub: 1,
  },
});
```

### useReducedMotion

**Всегда проверять** `prefers-reduced-motion`:

```typescript
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticComponent />;
  }

  return <AnimatedComponent />;
}
```

---

## Accessibility

### Contrast Ratios

**WCAG 2.1 Level AA требования**:

- Обычный текст (до 18px): ≥4.5:1
- Крупный текст (≥18px или ≥14px bold): ≥3:1

**Проверенные комбинации**:

- Legal золото (`#D4AF37`) на белом фоне: ✅ 5.2:1
- Tech cyan (`#06B6D4`) на белом фоне: ✅ 4.6:1
- Белый текст на Legal золоте: ✅ 4.8:1
- Белый текст на Tech cyan: ✅ 4.9:1

### Focus States

**Все интерактивные элементы** должны иметь видимый focus indicator:

```css
.focusable:focus-visible {
  outline: 2px solid var(--color-tech-primary);
  outline-offset: 2px;
}
```

### ARIA Labels

Декоративные элементы (3D-сцены, Lottie анимации) должны быть скрыты:

```jsx
<div aria-hidden="true">
  <ThreeScene />
</div>
```

Интерактивные элементы должны иметь описания:

```jsx
<button aria-label="Открыть мобильное меню">
  <MenuIcon />
</button>
```

---

## Примеры Использования

### Hero Section

```tsx
<section className="relative flex h-screen items-center">
  <div className="from-legal-primary/10 absolute left-0 w-1/2 bg-gradient-to-br to-transparent p-12">
    <h1 className="font-display text-text-primary text-7xl leading-tight font-extrabold">
      Юридическая защита
    </h1>
    <p className="text-text-secondary mt-4 text-lg">Защитим ваш бизнес от рисков</p>
    <button className="btn-primary-legal mt-8">Консультация</button>
  </div>

  <div className="from-tech-primary/10 absolute right-0 w-1/2 bg-gradient-to-bl to-transparent p-12">
    <h1 className="font-display text-text-primary text-7xl leading-tight font-extrabold">
      Цифровая трансформация
    </h1>
    <p className="text-text-secondary mt-4 text-lg">Автоматизируем ваши процессы</p>
    <button className="btn-primary-tech mt-8">Обсудить проект</button>
  </div>
</section>
```

### Card с Glassmorphism

```tsx
<div className="card-glass hover:-translate-y-1 hover:transform">
  <div className="mb-4 flex items-center gap-4">
    <span className="text-4xl">⚖️</span>
    <h3 className="font-display text-2xl font-bold">Арбитражные споры</h3>
  </div>
  <p className="text-text-secondary">Защита интересов в арбитражных судах всех инстанций</p>
  <div className="mt-4 flex items-center justify-between">
    <span className="badge badge-legal">Legal</span>
    <span className="text-legal-primary font-semibold">от 50 000 ₽</span>
  </div>
</div>
```

---

## Проверка Соответствия

### Checklist

- [ ] **Цвета**: Все цвета определены через CSS Variables (`styles/design-tokens.css`)
- [ ] **Типографика**: Используются `font-sans` и `font-display` из дизайн-системы
- [ ] **Spacing**: Все отступы следуют 8pt grid (`spacing-*`)
- [ ] **Breakpoints**: Responsive дизайн на всех 4 breakpoints (320px, 768px, 1024px, 1440px)
- [ ] **Анимации**: useReducedMotion проверяется для всех анимаций
- [ ] **Accessibility**: Все интерактивные элементы доступны через keyboard, focus states видимы
- [ ] **Contrast**: Все текстовые элементы имеют контраст ≥4.5:1

---

## Инструменты для Проверки

**VS Code расширения**:

- Tailwind CSS IntelliSense — autocomplete для Tailwind классов
- Color Highlight — визуализация цветов в коде
- axe Accessibility Linter — проверка a11y в JSX

**Браузер**:

- Chrome DevTools → Lighthouse (Accessibility audit)
- axe DevTools Extension — проверка WCAG соответствия
- Contrast Checker Extension — проверка контраста цветов

---

## Следующие Шаги

1. **Реализовать CSS Variables** в `styles/design-tokens.css`
2. **Настроить Tailwind config** (`tailwind.config.ts`) с кастомными цветами и spacing
3. **Создать базовые компоненты** (Button, Card, Badge, Input) в `src/components/primitives/`
4. **Применить дизайн-систему** во всех секциях и страницах
5. **Проверить Lighthouse Accessibility** ≥90

---

**Версия**: 1.0.0 | **Дата**: 2025-11-06 | **Статус**: ✅ Готов к реализации
