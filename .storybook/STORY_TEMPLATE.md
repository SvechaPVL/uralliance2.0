# Шаблон для создания Storybook Stories

Этот документ поможет вам создавать stories для всех остальных компонентов.

## Базовый шаблон

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourComponent } from "../YourComponent"; // Используйте именованный импорт!

/**
 * Описание компонента
 */
const meta = {
  title: "Category/YourComponent",
  component: YourComponent,
  parameters: {
    layout: "centered", // или "padded" или "fullscreen"
  },
  tags: ["autodocs"],
  argTypes: {
    // Опционально: настройки для интерактивных контролов
    propName: {
      control: "select",
      options: ["option1", "option2"],
      description: "Описание пропа",
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Базовый пример
 */
export const Default: Story = {
  args: {
    // пропсы компонента
  },
};

/**
 * Пример с кастомным рендером
 */
export const CustomExample: Story = {
  render: () => <YourComponent prop1="value1">Custom content</YourComponent>,
};
```

## Категории компонентов

### 1. Primitives (Примитивные компоненты)

**Папка:** `src/components/primitives/stories/`
**Категория в Storybook:** `Primitives/ComponentName`

✅ Созданы:

- Button
- Card
- Badge
- Input

🔧 Осталось создать stories для:

- (Все примитивы готовы!)

### 2. Layout (Компоненты разметки)

**Папка:** `src/components/layout/stories/`
**Категория в Storybook:** `Layout/ComponentName`

✅ Созданы:

- Container

🔧 Осталось создать stories для:

- Header
- Footer
- MobileMenu

**Пример для Header:**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

### 3. Animations (Анимированные компоненты)

**Папка:** `src/components/animations/stories/`
**Категория в Storybook:** `Animations/ComponentName`

✅ Созданы:

- AnimatedCounter
- MagneticButton

🔧 Осталось создать stories для:

- BentoGrid
- Card3D
- HeroParallax
- MacbookScroll
- Particles
- Spotlight
- ThreeScene
- Timeline

**Совет:** Для 3D и сложных анимаций используйте `layout: "fullscreen"` и добавьте фон для лучшей визуализации.

### 4. Mockups (Макеты устройств)

**Папка:** `src/components/mockups/stories/`
**Категория в Storybook:** `Mockups/ComponentName`

✅ Созданы:

- PhoneMockup

🔧 Осталось создать stories для:

- LaptopMockup
- TabletMockup

### 5. Forms (Формы)

**Папка:** `src/components/forms/stories/`
**Категория в Storybook:** `Forms/ComponentName`

🔧 Создать stories для:

- ContactForm

**Пример для ContactForm:**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ContactForm } from "../ContactForm";

const meta = {
  title: "Forms/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  // Показать состояние с ошибками
};
```

### 6. Sections (Секции страниц)

**Папка:** `src/components/sections/stories/`
**Категория в Storybook:** `Sections/ComponentName`

🔧 Создать stories для:

- HeroSection
- ServicesPreview
- CasesPreview
- ProcessTimeline
- TechShowcase
- PricePreview
- ContactCTA
- TrustSection
- Integration
- MobileApps
- WebProjects

**Совет:** Используйте `layout: "fullscreen"` для секций.

### 7. Showcases (Демо-компоненты)

**Папка:** `src/components/showcases/stories/`
**Категория в Storybook:** `Showcases/ComponentName`

🔧 Создать stories для:

- CrmMatrix
- MobileCafeApp
- TelegramChat
- WebBrowser

## Быстрые команды

### Создать story файл:

```bash
# Для примитива
touch src/components/primitives/stories/ComponentName.stories.tsx

# Для анимации
touch src/components/animations/stories/ComponentName.stories.tsx

# И т.д. для других категорий
```

### Проверить все stories:

```bash
npm run storybook
```

Откроется браузер на `http://localhost:6006`

## Полезные настройки

### Layout параметры:

- `centered` - для маленьких компонентов (кнопки, инпуты)
- `padded` - для средних компонентов с отступами
- `fullscreen` - для больших секций и страниц

### ArgTypes для частых случаев:

```tsx
argTypes: {
  // Boolean
  disabled: { control: "boolean" },

  // Select
  variant: {
    control: "select",
    options: ["primary", "secondary"],
  },

  // Color picker
  color: { control: "color" },

  // Range
  size: {
    control: { type: "range", min: 0, max: 100, step: 1 },
  },

  // Text
  label: { control: "text" },
}
```

## Автодокументация

Добавьте JSDoc комментарии к пропам компонента:

```tsx
interface Props {
  /**
   * Основной вариант отображения
   * @default "primary"
   */
  variant?: "primary" | "secondary";

  /**
   * Размер компонента
   */
  size?: "sm" | "md" | "lg";
}
```

Storybook автоматически подхватит эти описания!

## Тестирование

Stories можно использовать для тестирования с Vitest:

```bash
npx vitest
```

## Дополнительные ресурсы

- Документация Storybook: https://storybook.js.org/docs
- Примеры stories: `src/components/primitives/stories/`
- Аддоны: https://storybook.js.org/addons
