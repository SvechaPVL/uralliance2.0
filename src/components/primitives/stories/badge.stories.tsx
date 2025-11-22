import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../badge";

/**
 * Badge Component for labels, status indicators, and tags
 *
 * Compact inline component following the Legal/Tech dual brand identity.
 */
const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["legal", "tech", "success", "error", "warning", "info", "neutral"],
      description: "Color variant",
    },
    badgeStyle: {
      control: "select",
      options: ["filled", "outline", "subtle"],
      description: "Visual style",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Legal variant - filled style
 */
export const Legal: Story = {
  args: {
    variant: "legal",
    badgeStyle: "filled",
    children: "Highlight",
  },
};

/**
 * Tech variant - filled style
 */
export const Tech: Story = {
  args: {
    variant: "tech",
    badgeStyle: "filled",
    children: "Pro",
  },
};

/**
 * Success badge
 */
export const Success: Story = {
  args: {
    variant: "success",
    badgeStyle: "filled",
    children: "Active",
  },
};

/**
 * Error badge
 */
export const Error: Story = {
  args: {
    variant: "error",
    badgeStyle: "filled",
    children: "Inactive",
  },
};

/**
 * Warning badge
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    badgeStyle: "filled",
    children: "Pending",
  },
};

/**
 * Info badge
 */
export const Info: Story = {
  args: {
    variant: "info",
    badgeStyle: "filled",
    children: "New",
  },
};

/**
 * Neutral badge (default)
 */
export const Neutral: Story = {
  args: {
    variant: "neutral",
    badgeStyle: "filled",
    children: "Default",
  },
};

/**
 * Outline style
 */
export const Outline: Story = {
  args: {
    variant: "legal",
    badgeStyle: "outline",
    children: "Outline",
  },
};

/**
 * Subtle style
 */
export const Subtle: Story = {
  args: {
    variant: "tech",
    badgeStyle: "subtle",
    children: "Subtle",
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    variant: "legal",
    size: "sm",
    children: "Small",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    variant: "tech",
    size: "md",
    children: "Medium",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    variant: "success",
    size: "lg",
    children: "Large",
  },
};

/**
 * Badge with left icon
 */
export const WithLeftIcon: Story = {
  args: {
    variant: "success",
    children: "Verified",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    iconPosition: "left",
  },
};

/**
 * Badge with right icon
 */
export const WithRightIcon: Story = {
  args: {
    variant: "tech",
    children: "Live",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    iconPosition: "right",
  },
};

/**
 * All variants showcase - Filled style
 */
export const AllVariantsFilled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="legal">Legal</Badge>
      <Badge variant="tech">Tech</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

/**
 * All variants showcase - Outline style
 */
export const AllVariantsOutline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="legal" badgeStyle="outline">
        Legal
      </Badge>
      <Badge variant="tech" badgeStyle="outline">
        Tech
      </Badge>
      <Badge variant="success" badgeStyle="outline">
        Success
      </Badge>
      <Badge variant="error" badgeStyle="outline">
        Error
      </Badge>
      <Badge variant="warning" badgeStyle="outline">
        Warning
      </Badge>
      <Badge variant="info" badgeStyle="outline">
        Info
      </Badge>
      <Badge variant="neutral" badgeStyle="outline">
        Neutral
      </Badge>
    </div>
  ),
};

/**
 * All variants showcase - Subtle style
 */
export const AllVariantsSubtle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="legal" badgeStyle="subtle">
        Legal
      </Badge>
      <Badge variant="tech" badgeStyle="subtle">
        Tech
      </Badge>
      <Badge variant="success" badgeStyle="subtle">
        Success
      </Badge>
      <Badge variant="error" badgeStyle="subtle">
        Error
      </Badge>
      <Badge variant="warning" badgeStyle="subtle">
        Warning
      </Badge>
      <Badge variant="info" badgeStyle="subtle">
        Info
      </Badge>
      <Badge variant="neutral" badgeStyle="subtle">
        Neutral
      </Badge>
    </div>
  ),
};

/**
 * All sizes showcase
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="legal" size="sm">
        Small
      </Badge>
      <Badge variant="legal" size="md">
        Medium
      </Badge>
      <Badge variant="legal" size="lg">
        Large
      </Badge>
    </div>
  ),
};

/**
 * Status indicators example
 */
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span>User Status:</span>
        <Badge variant="success" badgeStyle="subtle" size="sm">
          Online
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Payment:</span>
        <Badge variant="warning" badgeStyle="filled" size="sm">
          Pending
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Verification:</span>
        <Badge
          variant="success"
          badgeStyle="outline"
          size="sm"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        >
          Verified
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Account:</span>
        <Badge variant="error" badgeStyle="subtle" size="sm">
          Suspended
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Tags example
 */
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="tech" badgeStyle="subtle">
        React
      </Badge>
      <Badge variant="tech" badgeStyle="subtle">
        TypeScript
      </Badge>
      <Badge variant="tech" badgeStyle="subtle">
        Next.js
      </Badge>
      <Badge variant="legal" badgeStyle="subtle">
        Legal Tech
      </Badge>
      <Badge variant="info" badgeStyle="subtle">
        Documentation
      </Badge>
    </div>
  ),
};
