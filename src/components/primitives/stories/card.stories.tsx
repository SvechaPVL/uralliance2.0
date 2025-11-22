import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardContent, CardFooter } from "../card";
import { Button } from "../button";

/**
 * Card Component with glassmorphism and neobrutalism support
 *
 * Foundational card primitive following the dual brand identity design system.
 */
const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "legal", "tech", "glass"],
      description: "Visual style variant",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Padding size",
    },
    hoverable: {
      control: "boolean",
      description: "Enable hover effect",
    },
    brutal: {
      control: "boolean",
      description: "Apply neobrutalist border style",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card with standard styling
 */
export const Default: Story = {
  args: {
    variant: "default",
    padding: "md",
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Card Title</h3>
        <p className="text-[var(--color-text-secondary)]">
          This is a default card with glassmorphism effect and soft borders.
        </p>
      </div>
    ),
  },
};

/**
 * Legal variant - for legal services content
 */
export const Legal: Story = {
  args: {
    variant: "legal",
    padding: "lg",
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Legal Services</h3>
        <p className="text-[var(--color-text-secondary)]">
          Professional legal consultation with specialized expertise.
        </p>
      </div>
    ),
  },
};

/**
 * Tech variant - for tech solutions content
 */
export const Tech: Story = {
  args: {
    variant: "tech",
    padding: "lg",
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Tech Solutions</h3>
        <p className="text-[var(--color-text-secondary)]">
          Cutting-edge technology solutions for your business.
        </p>
      </div>
    ),
  },
};

/**
 * Glass variant - enhanced glassmorphism
 */
export const Glass: Story = {
  args: {
    variant: "glass",
    padding: "md",
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Glass Card</h3>
        <p className="text-[var(--color-text-secondary)]">
          Enhanced glassmorphism effect with stronger backdrop blur.
        </p>
      </div>
    ),
  },
};

/**
 * Hoverable card
 */
export const Hoverable: Story = {
  args: {
    variant: "legal",
    padding: "lg",
    hoverable: true,
    style: { transitionDuration: "0.6s" },
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Hover Me!</h3>
        <p className="text-[var(--color-text-secondary)]">
          This card has interactive hover effects.
        </p>
      </div>
    ),
  },
};

/**
 * Neobrutalist style card
 */
export const Brutal: Story = {
  args: {
    variant: "default",
    padding: "lg",
    brutal: true,
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Neobrutalist Card</h3>
        <p className="text-[var(--color-text-secondary)]">
          Bold borders with offset shadow following neobrutalism design.
        </p>
      </div>
    ),
  },
};

/**
 * Brutal + Hoverable combination
 */
export const BrutalHoverable: Story = {
  args: {
    variant: "tech",
    padding: "lg",
    brutal: true,
    hoverable: true,
    children: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Interactive Brutal</h3>
        <p className="text-[var(--color-text-secondary)]">
          Neobrutalist style with hover animation.
        </p>
      </div>
    ),
  },
};

/**
 * Card with Header, Content, and Footer
 */
export const WithSections: Story = {
  render: () => (
    <Card variant="legal" padding="none" style={{ width: "400px" }}>
      <CardHeader className="px-6 pt-6">
        <h3 className="text-2xl font-bold">Pro Plan</h3>
        <p className="text-[var(--color-text-secondary)]">Everything you need</p>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Unlimited consultations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>24/7 support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Priority response</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button variant="primary-legal" fullWidth>
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Product card example
 */
export const ProductCard: Story = {
  render: () => (
    <Card variant="tech" padding="none" hoverable style={{ width: "320px" }}>
      <div className="h-48 rounded-t-3xl bg-gradient-to-br from-[var(--color-tech-primary)] to-[var(--color-tech-dark)]" />
      <CardContent className="p-6">
        <h3 className="mb-2 text-xl font-bold">Tech Solution</h3>
        <p className="mb-4 text-[var(--color-text-secondary)]">
          Innovative technology platform for modern businesses.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$99</span>
          <Button variant="primary-tech" size="sm">
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * No padding card
 */
export const NoPadding: Story = {
  args: {
    variant: "glass",
    padding: "none",
    children: (
      <div className="flex h-64 items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Card with no padding</p>
      </div>
    ),
  },
};

/**
 * Small padding
 */
export const SmallPadding: Story = {
  args: {
    variant: "default",
    padding: "sm",
    children: <p>Card with small padding (p-4)</p>,
  },
};

/**
 * Large padding
 */
export const LargePadding: Story = {
  args: {
    variant: "legal",
    padding: "lg",
    children: <p>Card with large padding (p-8)</p>,
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: "800px" }}>
      <Card variant="default" padding="md">
        <h4 className="mb-2 font-bold">Default</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">Standard glassmorphism card</p>
      </Card>
      <Card variant="legal" padding="md">
        <h4 className="mb-2 font-bold">Legal</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">Legal services variant</p>
      </Card>
      <Card variant="tech" padding="md">
        <h4 className="mb-2 font-bold">Tech</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">Tech solutions variant</p>
      </Card>
      <Card variant="glass" padding="md">
        <h4 className="mb-2 font-bold">Glass</h4>
        <p className="text-sm text-[var(--color-text-secondary)]">Enhanced glass effect</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
