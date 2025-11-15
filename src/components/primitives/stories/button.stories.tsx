import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";

/**
 * Button Component with dual brand identity (Legal/Tech)
 *
 * Supports multiple variants, sizes, loading states, and icons.
 */
const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary-legal",
        "primary-tech",
        "secondary-legal",
        "secondary-tech",
        "outline-legal",
        "outline-tech",
        "ghost",
      ],
      description: "Visual style variant following Legal/Tech brand",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary Legal variant - main CTA for legal services
 */
export const PrimaryLegal: Story = {
  args: {
    variant: "primary-legal",
    children: "Get Legal Support",
  },
};

/**
 * Primary Tech variant - main CTA for tech solutions
 */
export const PrimaryTech: Story = {
  args: {
    variant: "primary-tech",
    children: "Deploy Solution",
  },
};

/**
 * Secondary Legal variant
 */
export const SecondaryLegal: Story = {
  args: {
    variant: "secondary-legal",
    children: "Learn More",
  },
};

/**
 * Secondary Tech variant
 */
export const SecondaryTech: Story = {
  args: {
    variant: "secondary-tech",
    children: "View Details",
  },
};

/**
 * Outline Legal variant
 */
export const OutlineLegal: Story = {
  args: {
    variant: "outline-legal",
    children: "Contact Us",
  },
};

/**
 * Outline Tech variant
 */
export const OutlineTech: Story = {
  args: {
    variant: "outline-tech",
    children: "Explore",
  },
};

/**
 * Ghost variant - subtle button for less prominent actions
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancel",
  },
};

/**
 * Small size button
 */
export const Small: Story = {
  args: {
    variant: "primary-legal",
    size: "sm",
    children: "Small Button",
  },
};

/**
 * Medium size button (default)
 */
export const Medium: Story = {
  args: {
    variant: "primary-tech",
    size: "md",
    children: "Medium Button",
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    variant: "primary-legal",
    size: "lg",
    children: "Large Button",
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    variant: "primary-tech",
    isLoading: true,
    children: "Processing...",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    variant: "primary-legal",
    disabled: true,
    children: "Disabled Button",
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    variant: "primary-tech",
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * Button with left icon
 */
export const WithLeftIcon: Story = {
  args: {
    variant: "primary-legal",
    children: "Continue",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    iconPosition: "right",
  },
};

/**
 * Button with right icon
 */
export const WithRightIcon: Story = {
  args: {
    variant: "primary-tech",
    children: "Download",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
    iconPosition: "right",
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary-legal">Primary Legal</Button>
        <Button variant="primary-tech">Primary Tech</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary-legal">Secondary Legal</Button>
        <Button variant="secondary-tech">Secondary Tech</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline-legal">Outline Legal</Button>
        <Button variant="outline-tech">Outline Tech</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * All sizes showcase
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button variant="primary-legal" size="sm">
        Small
      </Button>
      <Button variant="primary-legal" size="md">
        Medium
      </Button>
      <Button variant="primary-legal" size="lg">
        Large
      </Button>
    </div>
  ),
};
