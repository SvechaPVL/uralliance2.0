import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../section";

/**
 * Section Component - foundational primitive for page sections
 *
 * Provides consistent spacing, backgrounds, borders, and layout options.
 */
const meta = {
  title: "Primitives/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["hero", "default", "compact", "feature"],
      description: "Section variant",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Vertical padding",
    },
    background: {
      control: "select",
      options: ["default", "secondary", "gradient-light", "gradient-dark"],
      description: "Background style",
    },
    borderTop: {
      control: "boolean",
      description: "Add top border",
    },
    borderBottom: {
      control: "boolean",
      description: "Add bottom border",
    },
    bordered: {
      control: "boolean",
      description: "Add both borders",
    },
    relative: {
      control: "boolean",
      description: "Enable relative positioning",
    },
    overflow: {
      control: "select",
      options: ["visible", "hidden"],
      description: "Overflow behavior",
    },
    backdropBlur: {
      control: "boolean",
      description: "Add backdrop blur",
    },
    isolate: {
      control: "boolean",
      description: "Isolate stacking context",
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = ({ title = "Section Content" }: { title?: string }) => (
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-[var(--color-text-secondary)]">
        This is a demo section with consistent spacing and styling from the Section primitive component.
      </p>
    </div>
  </div>
);

/**
 * Default section with standard spacing
 */
export const Default: Story = {
  args: {
    children: <DemoContent title="Default Section" />,
  },
};

/**
 * Hero section with full screen height
 */
export const Hero: Story = {
  args: {
    variant: "hero",
    children: (
      <div className="container mx-auto px-4 flex items-center justify-center h-full">
        <div className="max-w-3xl text-center">
          <h1 className="text-6xl font-bold mb-6">Hero Section</h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            Full screen hero section with centered content
          </p>
        </div>
      </div>
    ),
  },
};

/**
 * Section with secondary background
 */
export const Secondary: Story = {
  args: {
    background: "secondary",
    children: <DemoContent title="Secondary Background" />,
  },
};

/**
 * Section with gradient background
 */
export const GradientLight: Story = {
  args: {
    background: "gradient-light",
    spacing: "xl",
    children: <DemoContent title="Gradient Background" />,
  },
};

/**
 * Section with borders
 */
export const Bordered: Story = {
  args: {
    bordered: true,
    background: "secondary",
    children: <DemoContent title="Bordered Section" />,
  },
};

/**
 * Compact section with small spacing
 */
export const Compact: Story = {
  args: {
    spacing: "sm",
    children: <DemoContent title="Compact Section" />,
  },
};

/**
 * Large section with extra spacing
 */
export const Large: Story = {
  args: {
    spacing: "xl",
    children: <DemoContent title="Extra Large Spacing" />,
  },
};

/**
 * Section with top border only
 */
export const TopBorder: Story = {
  args: {
    borderTop: true,
    children: <DemoContent title="Top Border Section" />,
  },
};

/**
 * Section with overflow hidden
 */
export const OverflowHidden: Story = {
  args: {
    overflow: "hidden",
    relative: true,
    children: (
      <div className="container mx-auto px-4 relative">
        <DemoContent title="Overflow Hidden" />
        <div className="absolute -right-20 top-0 h-full w-40 bg-gradient-to-l from-purple-500/20 to-transparent" />
      </div>
    ),
  },
};

/**
 * Section with backdrop blur
 */
export const BackdropBlur: Story = {
  args: {
    backdropBlur: true,
    background: "secondary",
    children: <DemoContent title="Backdrop Blur Effect" />,
  },
};

/**
 * All spacing variants
 */
export const AllSpacing: Story = {
  render: () => (
    <div className="space-y-px">
      <Section spacing="sm" background="secondary">
        <DemoContent title="Small Spacing (py-12)" />
      </Section>
      <Section spacing="md" background="default">
        <DemoContent title="Medium Spacing (py-20)" />
      </Section>
      <Section spacing="lg" background="secondary">
        <DemoContent title="Large Spacing (py-24)" />
      </Section>
      <Section spacing="xl" background="default">
        <DemoContent title="Extra Large Spacing (py-28/32)" />
      </Section>
    </div>
  ),
};

/**
 * All background variants
 */
export const AllBackgrounds: Story = {
  render: () => (
    <div>
      <Section background="default" spacing="md">
        <DemoContent title="Default Background" />
      </Section>
      <Section background="secondary" spacing="md">
        <DemoContent title="Secondary Background" />
      </Section>
      <Section background="gradient-light" spacing="md">
        <DemoContent title="Gradient Light Background" />
      </Section>
    </div>
  ),
};

/**
 * Feature section example
 */
export const FeatureExample: Story = {
  render: () => (
    <Section variant="feature" spacing="xl" background="secondary" bordered>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--color-legal-primary)] rounded-2xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature One</h3>
            <p className="text-[var(--color-text-secondary)]">
              Description of the first feature
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--color-tech-primary)] rounded-2xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature Two</h3>
            <p className="text-[var(--color-text-secondary)]">
              Description of the second feature
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--color-legal-primary)] rounded-2xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Feature Three</h3>
            <p className="text-[var(--color-text-secondary)]">
              Description of the third feature
            </p>
          </div>
        </div>
      </div>
    </Section>
  ),
};
