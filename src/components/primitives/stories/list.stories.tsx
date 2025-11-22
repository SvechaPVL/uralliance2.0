import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../list";

/**
 * List Component - consistent list styling
 *
 * Provides variants for unordered, ordered, feature, and checkmark lists.
 */
const meta = {
  title: "Primitives/List",
  component: List,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["unordered", "ordered", "feature", "checkmark"],
      description: "List variant",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Spacing between items",
    },
    markerTone: {
      control: "select",
      options: ["default", "legal", "tech", "muted"],
      description: "Marker/bullet color tone",
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  "First item in the list",
  "Second item with more details",
  "Third item to demonstrate spacing",
  "Fourth item for completeness",
];

/**
 * Default unordered list
 */
export const Default: Story = {
  args: {
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Unordered list with standard bullets
 */
export const Unordered: Story = {
  args: {
    variant: "unordered",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Ordered list with numbers
 */
export const Ordered: Story = {
  args: {
    variant: "ordered",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Feature list with custom bullets
 */
export const Feature: Story = {
  args: {
    variant: "feature",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Checkmark list for completed items
 */
export const Checkmark: Story = {
  args: {
    variant: "checkmark",
    markerTone: "legal",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Small spacing between items
 */
export const SmallSpacing: Story = {
  args: {
    variant: "feature",
    spacing: "sm",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Medium spacing (default)
 */
export const MediumSpacing: Story = {
  args: {
    variant: "feature",
    spacing: "md",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Large spacing between items
 */
export const LargeSpacing: Story = {
  args: {
    variant: "feature",
    spacing: "lg",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Legal brand marker color
 */
export const LegalMarker: Story = {
  args: {
    variant: "checkmark",
    markerTone: "legal",
    children: [
      <li key={1}>Юридическая консультация</li>,
      <li key={2}>Составление договоров</li>,
      <li key={3}>Регистрация бизнеса</li>,
      <li key={4}>Защита интересов в суде</li>,
    ],
  },
};

/**
 * Tech brand marker color
 */
export const TechMarker: Story = {
  args: {
    variant: "checkmark",
    markerTone: "tech",
    children: [
      <li key={1}>Web development</li>,
      <li key={2}>Mobile applications</li>,
      <li key={3}>CRM integration</li>,
      <li key={4}>Cloud infrastructure</li>,
    ],
  },
};

/**
 * Muted marker color
 */
export const MutedMarker: Story = {
  args: {
    variant: "feature",
    markerTone: "muted",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * Custom marker
 */
export const CustomMarker: Story = {
  args: {
    variant: "feature",
    marker: "→",
    markerTone: "tech",
    children: items.map((item, i) => <li key={i}>{item}</li>),
  },
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Unordered</p>
        <List variant="unordered">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Ordered</p>
        <List variant="ordered">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Feature</p>
        <List variant="feature">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Checkmark</p>
        <List variant="checkmark" markerTone="legal">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
    </div>
  ),
};

/**
 * All spacing comparison
 */
export const AllSpacings: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small spacing</p>
        <List variant="feature" spacing="sm">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium spacing (default)</p>
        <List variant="feature" spacing="md">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large spacing</p>
        <List variant="feature" spacing="lg">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </List>
      </div>
    </div>
  ),
};

/**
 * Feature list with heading (common pattern)
 */
export const FeatureListWithHeading: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="text-2xl font-bold mb-6">Наши преимущества</h3>
      <List variant="checkmark" markerTone="legal" spacing="lg">
        <li>Опыт работы более 10 лет</li>
        <li>Индивидуальный подход к каждому клиенту</li>
        <li>Прозрачное ценообразование</li>
        <li>Гарантия результата</li>
      </List>
    </div>
  ),
};

/**
 * Service features (common pattern)
 */
export const ServiceFeatures: Story = {
  render: () => (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[var(--color-legal-primary)]">
          Юридические услуги
        </h4>
        <List variant="checkmark" markerTone="legal">
          <li>Регистрация компаний</li>
          <li>Договорное право</li>
          <li>Налоговое консультирование</li>
          <li>Судебная защита</li>
        </List>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[var(--color-tech-primary)]">
          IT-решения
        </h4>
        <List variant="checkmark" markerTone="tech">
          <li>Разработка веб-приложений</li>
          <li>Мобильные приложения</li>
          <li>Интеграция систем</li>
          <li>Облачная инфраструктура</li>
        </List>
      </div>
    </div>
  ),
};

/**
 * Step-by-step process (ordered list)
 */
export const StepByStepProcess: Story = {
  render: () => (
    <div className="max-w-lg">
      <h3 className="text-2xl font-bold mb-6">Процесс работы</h3>
      <List variant="ordered" spacing="lg" className="text-lg">
        <li>Первичная консультация и анализ задачи</li>
        <li>Разработка стратегии и плана действий</li>
        <li>Реализация проекта с регулярной отчётностью</li>
        <li>Сдача результата и постпроектная поддержка</li>
      </List>
    </div>
  ),
};
