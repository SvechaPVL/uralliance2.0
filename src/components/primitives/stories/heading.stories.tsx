import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../heading";

/**
 * Heading Component - semantic typography primitive
 *
 * Provides consistent heading styles with separation of semantic level and visual appearance.
 */
const meta = {
  title: "Primitives/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Semantic HTML heading level",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "hero"],
      description: "Visual size (independent of semantic level)",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    tone: {
      control: "select",
      options: ["default", "primary", "secondary", "muted", "white", "legal", "tech"],
      description: "Color tone",
    },
    display: {
      control: "boolean",
      description: "Use display font family",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default heading with standard styling
 */
export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

/**
 * Hero size heading for landing pages
 */
export const Hero: Story = {
  args: {
    as: "h1",
    size: "hero",
    weight: "bold",
    display: true,
    children: "Transform Your Business",
  },
};

/**
 * Extra large heading
 */
export const ExtraLarge: Story = {
  args: {
    as: "h1",
    size: "3xl",
    weight: "bold",
    children: "Major Section Title",
  },
};

/**
 * Large heading (default size)
 */
export const Large: Story = {
  args: {
    as: "h2",
    size: "xl",
    weight: "bold",
    children: "Section Heading",
  },
};

/**
 * Medium heading
 */
export const Medium: Story = {
  args: {
    as: "h3",
    size: "lg",
    weight: "semibold",
    children: "Subsection Heading",
  },
};

/**
 * Small heading
 */
export const Small: Story = {
  args: {
    as: "h4",
    size: "md",
    weight: "semibold",
    children: "Card Title",
  },
};

/**
 * Extra small heading
 */
export const ExtraSmall: Story = {
  args: {
    as: "h5",
    size: "sm",
    weight: "medium",
    children: "Small Section Title",
  },
};

/**
 * Legal brand color
 */
export const LegalTone: Story = {
  args: {
    as: "h2",
    size: "xl",
    tone: "legal",
    children: "Legal Services Heading",
  },
};

/**
 * Tech brand color
 */
export const TechTone: Story = {
  args: {
    as: "h2",
    size: "xl",
    tone: "tech",
    children: "Technology Solutions Heading",
  },
};

/**
 * Secondary tone
 */
export const SecondaryTone: Story = {
  args: {
    as: "h2",
    size: "lg",
    tone: "secondary",
    children: "Secondary Information",
  },
};

/**
 * Muted tone
 */
export const MutedTone: Story = {
  args: {
    as: "h3",
    size: "md",
    tone: "muted",
    children: "Less Emphasized Heading",
  },
};

/**
 * White tone for dark backgrounds
 */
export const WhiteTone: Story = {
  args: {
    as: "h2",
    size: "xl",
    tone: "white",
    children: "Heading on Dark Background",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * With display font
 */
export const DisplayFont: Story = {
  args: {
    as: "h1",
    size: "2xl",
    display: true,
    children: "Display Font Heading",
  },
};

/**
 * Truncated text
 */
export const Truncated: Story = {
  args: {
    as: "h2",
    size: "lg",
    truncate: true,
    children: "This is a very long heading that will be truncated with an ellipsis when it exceeds the container width",
    className: "max-w-xs",
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Hero</p>
        <Heading as="h1" size="hero">
          Hero Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">3XL</p>
        <Heading as="h1" size="3xl">
          3XL Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">2XL</p>
        <Heading as="h1" size="2xl">
          2XL Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">XL</p>
        <Heading as="h2" size="xl">
          XL Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">LG</p>
        <Heading as="h2" size="lg">
          LG Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">MD</p>
        <Heading as="h3" size="md">
          MD Heading
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">SM</p>
        <Heading as="h4" size="sm">
          SM Heading
        </Heading>
      </div>
    </div>
  ),
};

/**
 * All weights comparison
 */
export const AllWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h2" size="xl" weight="normal">
        Normal Weight
      </Heading>
      <Heading as="h2" size="xl" weight="medium">
        Medium Weight
      </Heading>
      <Heading as="h2" size="xl" weight="semibold">
        Semibold Weight
      </Heading>
      <Heading as="h2" size="xl" weight="bold">
        Bold Weight
      </Heading>
    </div>
  ),
};

/**
 * All tones comparison
 */
export const AllTones: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h3" size="lg" tone="default">
        Default Tone
      </Heading>
      <Heading as="h3" size="lg" tone="primary">
        Primary Tone
      </Heading>
      <Heading as="h3" size="lg" tone="secondary">
        Secondary Tone
      </Heading>
      <Heading as="h3" size="lg" tone="muted">
        Muted Tone
      </Heading>
      <Heading as="h3" size="lg" tone="legal">
        Legal Tone
      </Heading>
      <Heading as="h3" size="lg" tone="tech">
        Tech Tone
      </Heading>
    </div>
  ),
};

/**
 * Semantic vs Visual example
 */
export const SemanticVsVisual: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">
          Semantic h1, but visually small (for SEO while maintaining design)
        </p>
        <Heading as="h1" size="md">
          This is an H1 that looks like H3
        </Heading>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">
          Semantic h3, but visually large (for design hierarchy)
        </p>
        <Heading as="h3" size="2xl">
          This is an H3 that looks like H1
        </Heading>
      </div>
    </div>
  ),
};
