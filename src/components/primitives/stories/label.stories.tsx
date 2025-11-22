import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";

/**
 * Label Component (Eyebrow Text) - small uppercase labels
 *
 * Used for section labels, categories, and metadata throughout the design system.
 */
const meta = {
  title: "Primitives/Label",
  component: Label,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Label size",
    },
    spacing: {
      control: "select",
      options: ["normal", "wide", "wider", "widest"],
      description: "Letter spacing",
    },
    tone: {
      control: "select",
      options: ["default", "primary", "secondary", "muted", "legal", "tech", "white"],
      description: "Color tone",
    },
    uppercase: {
      control: "boolean",
      description: "Transform to uppercase",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    as: {
      control: "select",
      options: ["p", "span", "label", "div"],
      description: "HTML element type",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default label with standard styling
 */
export const Default: Story = {
  args: {
    children: "Section Label",
  },
};

/**
 * Extra small size
 */
export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small Label",
  },
};

/**
 * Small size (default)
 */
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Label",
  },
};

/**
 * Medium size
 */
export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Label",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Label",
  },
};

/**
 * Legal brand color
 */
export const LegalTone: Story = {
  args: {
    tone: "legal",
    children: "Legal Services",
  },
};

/**
 * Tech brand color
 */
export const TechTone: Story = {
  args: {
    tone: "tech",
    children: "Technology Solutions",
  },
};

/**
 * Muted tone (default)
 */
export const MutedTone: Story = {
  args: {
    tone: "muted",
    children: "Muted Label",
  },
};

/**
 * Primary tone
 */
export const PrimaryTone: Story = {
  args: {
    tone: "primary",
    children: "Primary Label",
  },
};

/**
 * Secondary tone
 */
export const SecondaryTone: Story = {
  args: {
    tone: "secondary",
    children: "Secondary Label",
  },
};

/**
 * White tone for dark backgrounds
 */
export const WhiteTone: Story = {
  args: {
    tone: "white",
    children: "White Label",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Normal spacing
 */
export const NormalSpacing: Story = {
  args: {
    spacing: "normal",
    children: "Normal Spacing",
  },
};

/**
 * Wide spacing
 */
export const WideSpacing: Story = {
  args: {
    spacing: "wide",
    children: "Wide Spacing",
  },
};

/**
 * Wider spacing
 */
export const WiderSpacing: Story = {
  args: {
    spacing: "wider",
    children: "Wider Spacing",
  },
};

/**
 * Widest spacing (default)
 */
export const WidestSpacing: Story = {
  args: {
    spacing: "widest",
    children: "Widest Spacing",
  },
};

/**
 * Not uppercase
 */
export const NotUppercase: Story = {
  args: {
    uppercase: false,
    children: "Regular Case Label",
  },
};

/**
 * Bold weight
 */
export const BoldWeight: Story = {
  args: {
    weight: "bold",
    children: "Bold Label",
  },
};

/**
 * Semibold weight
 */
export const SemiboldWeight: Story = {
  args: {
    weight: "semibold",
    children: "Semibold Label",
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">XS</p>
        <Label size="xs">Extra Small Label</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">SM (default)</p>
        <Label size="sm">Small Label</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">MD</p>
        <Label size="md">Medium Label</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">LG</p>
        <Label size="lg">Large Label</Label>
      </div>
    </div>
  ),
};

/**
 * All tones comparison
 */
export const AllTones: Story = {
  render: () => (
    <div className="space-y-3">
      <Label tone="default">Default Tone</Label>
      <Label tone="primary">Primary Tone</Label>
      <Label tone="secondary">Secondary Tone</Label>
      <Label tone="muted">Muted Tone</Label>
      <Label tone="legal">Legal Tone</Label>
      <Label tone="tech">Tech Tone</Label>
    </div>
  ),
};

/**
 * All spacing comparison
 */
export const AllSpacings: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Normal</p>
        <Label spacing="normal">Normal Spacing</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Wide (0.2em)</p>
        <Label spacing="wide">Wide Spacing</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Wider (0.3em)</p>
        <Label spacing="wider">Wider Spacing</Label>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Widest (0.4em - default)</p>
        <Label spacing="widest">Widest Spacing</Label>
      </div>
    </div>
  ),
};

/**
 * Above heading (common pattern)
 */
export const AboveHeading: Story = {
  render: () => (
    <div className="space-y-2">
      <Label tone="legal">Our Services</Label>
      <h2 className="text-4xl font-bold">Transform Your Business</h2>
    </div>
  ),
};

/**
 * Metadata field (common pattern)
 */
export const MetadataField: Story = {
  render: () => (
    <div className="space-y-2">
      <Label size="xs">Client</Label>
      <p className="text-lg font-semibold">UrAlliance Technologies</p>
    </div>
  ),
};

/**
 * Category badge alternative
 */
export const CategoryBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="inline-block px-4 py-2 bg-[var(--color-background-secondary)] rounded-full">
        <Label tone="legal" size="xs">
          Legal Services
        </Label>
      </div>
      <div className="inline-block px-4 py-2 bg-[var(--color-background-secondary)] rounded-full">
        <Label tone="tech" size="xs">
          Technology
        </Label>
      </div>
    </div>
  ),
};
