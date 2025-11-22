import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../text";

/**
 * Text Component - body text and paragraph primitive
 *
 * Provides consistent typography for body content throughout the design system.
 */
const meta = {
  title: "Primitives/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl"],
      description: "Text size",
    },
    tone: {
      control: "select",
      options: ["default", "primary", "secondary", "muted", "white", "legal", "tech"],
      description: "Color tone",
    },
    leading: {
      control: "select",
      options: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      description: "Line height",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    maxWidth: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "prose"],
      description: "Maximum width constraint",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis",
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "li"],
      description: "HTML element type",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const loremShort = "The quick brown fox jumps over the lazy dog.";
const loremMedium =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const loremLong =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/**
 * Default text with standard styling
 */
export const Default: Story = {
  args: {
    children: loremMedium,
  },
};

/**
 * Extra small size
 */
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: loremMedium,
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    size: "sm",
    children: loremMedium,
  },
};

/**
 * Base size (default)
 */
export const Base: Story = {
  args: {
    size: "base",
    children: loremMedium,
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: "lg",
    children: loremMedium,
  },
};

/**
 * Extra large size
 */
export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: loremMedium,
  },
};

/**
 * 2XL size
 */
export const TwoXL: Story = {
  args: {
    size: "2xl",
    children: loremShort,
  },
};

/**
 * Primary tone (default)
 */
export const PrimaryTone: Story = {
  args: {
    tone: "primary",
    children: loremMedium,
  },
};

/**
 * Secondary tone
 */
export const SecondaryTone: Story = {
  args: {
    tone: "secondary",
    children: loremMedium,
  },
};

/**
 * Muted tone
 */
export const MutedTone: Story = {
  args: {
    tone: "muted",
    children: loremMedium,
  },
};

/**
 * Legal brand color
 */
export const LegalTone: Story = {
  args: {
    tone: "legal",
    children: "Legal services text with brand color",
  },
};

/**
 * Tech brand color
 */
export const TechTone: Story = {
  args: {
    tone: "tech",
    children: "Technology solutions text with brand color",
  },
};

/**
 * White tone for dark backgrounds
 */
export const WhiteTone: Story = {
  args: {
    tone: "white",
    children: loremMedium,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Relaxed line height (common for body text)
 */
export const RelaxedLeading: Story = {
  args: {
    size: "lg",
    leading: "relaxed",
    children: loremLong,
  },
};

/**
 * Tight line height
 */
export const TightLeading: Story = {
  args: {
    size: "lg",
    leading: "tight",
    children: loremLong,
  },
};

/**
 * Loose line height
 */
export const LooseLeading: Story = {
  args: {
    size: "lg",
    leading: "loose",
    children: loremLong,
  },
};

/**
 * Bold weight
 */
export const BoldWeight: Story = {
  args: {
    weight: "bold",
    children: loremMedium,
  },
};

/**
 * Semibold weight
 */
export const SemiboldWeight: Story = {
  args: {
    weight: "semibold",
    children: loremMedium,
  },
};

/**
 * Medium weight
 */
export const MediumWeight: Story = {
  args: {
    weight: "medium",
    children: loremMedium,
  },
};

/**
 * Prose max width (optimal for reading)
 */
export const ProseWidth: Story = {
  args: {
    size: "lg",
    leading: "relaxed",
    maxWidth: "prose",
    children: loremLong,
  },
};

/**
 * Constrained width (medium)
 */
export const ConstrainedWidth: Story = {
  args: {
    size: "base",
    maxWidth: "md",
    children: loremMedium,
  },
};

/**
 * Truncated text
 */
export const Truncated: Story = {
  args: {
    truncate: true,
    maxWidth: "xs",
    children: loremLong,
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">XS</p>
        <Text size="xs">{loremShort}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">SM</p>
        <Text size="sm">{loremShort}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Base (default)</p>
        <Text size="base">{loremShort}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">LG</p>
        <Text size="lg">{loremShort}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">XL</p>
        <Text size="xl">{loremShort}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">2XL</p>
        <Text size="2xl">{loremShort}</Text>
      </div>
    </div>
  ),
};

/**
 * All tones comparison
 */
export const AllTones: Story = {
  render: () => (
    <div className="space-y-4">
      <Text tone="default">Default tone (primary text color)</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="secondary">Secondary tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="legal">Legal brand tone</Text>
      <Text tone="tech">Tech brand tone</Text>
    </div>
  ),
};

/**
 * All leadings comparison
 */
export const AllLeadings: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">None</p>
        <Text leading="none">{loremMedium}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Tight</p>
        <Text leading="tight">{loremMedium}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Snug</p>
        <Text leading="snug">{loremMedium}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Normal (default)</p>
        <Text leading="normal">{loremMedium}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Relaxed</p>
        <Text leading="relaxed">{loremMedium}</Text>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Loose</p>
        <Text leading="loose">{loremMedium}</Text>
      </div>
    </div>
  ),
};

/**
 * Article body example
 */
export const ArticleBody: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="lg" tone="secondary" leading="relaxed" maxWidth="prose">
        {loremLong}
      </Text>
      <Text size="lg" tone="secondary" leading="relaxed" maxWidth="prose">
        {loremMedium}
      </Text>
    </div>
  ),
};

/**
 * Description under heading (common pattern)
 */
export const DescriptionPattern: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-4xl font-bold">Section Heading</h2>
      <Text size="xl" tone="secondary">
        {loremMedium}
      </Text>
    </div>
  ),
};
