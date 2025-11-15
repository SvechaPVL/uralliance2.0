import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input";

/**
 * Input Component with error handling, icons, and accessibility
 *
 * Form input primitive following the dual brand identity design system.
 */
const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    variant: {
      control: "select",
      options: ["default", "legal", "tech"],
      description: "Brand variant for focus ring",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field indicator",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width input",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input
 */
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    type: "email",
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Choose a unique username",
  },
};

/**
 * Legal variant focus ring
 */
export const LegalVariant: Story = {
  args: {
    label: "Legal Document ID",
    variant: "legal",
    placeholder: "Enter document ID",
  },
};

/**
 * Tech variant focus ring
 */
export const TechVariant: Story = {
  args: {
    label: "API Key",
    variant: "tech",
    placeholder: "Enter your API key",
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    label: "Small Input",
    inputSize: "sm",
    placeholder: "Small size...",
  },
};

/**
 * Medium size (default)
 */
export const Medium: Story = {
  args: {
    label: "Medium Input",
    inputSize: "md",
    placeholder: "Medium size...",
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    label: "Large Input",
    inputSize: "lg",
    placeholder: "Large size...",
  },
};

/**
 * With error
 */
export const WithError: Story = {
  args: {
    label: "Email",
    value: "invalid-email",
    error: true,
    errorMessage: "Please enter a valid email address",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Cannot edit this",
    disabled: true,
  },
};

/**
 * With prefix icon
 */
export const WithPrefixIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    prefixIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
};

/**
 * With suffix icon
 */
export const WithSuffixIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    suffixIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

/**
 * Full width
 */
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This input takes full width",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * Input types showcase
 */
export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: "400px" }}>
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Date" type="date" />
      <Input label="Tel" type="tel" placeholder="+1 (555) 000-0000" />
      <Input label="URL" type="url" placeholder="https://example.com" />
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
    <div className="flex flex-col gap-4" style={{ width: "400px" }}>
      <Input label="Small" inputSize="sm" placeholder="Small input" />
      <Input label="Medium" inputSize="md" placeholder="Medium input" />
      <Input label="Large" inputSize="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Form example
 */
export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4" style={{ width: "400px" }}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        required
        variant="legal"
        helperText="Enter your legal name"
      />
      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
        variant="legal"
        prefixIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        }
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        variant="legal"
        prefixIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        }
      />
      <Input
        label="Message"
        placeholder="Your message..."
        variant="legal"
        helperText="Optional message for our team"
      />
    </form>
  ),
  parameters: {
    layout: "padded",
  },
};

/**
 * Error states showcase
 */
export const ErrorStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: "400px" }}>
      <Input
        label="Email"
        value="invalid-email"
        error
        errorMessage="Please enter a valid email address"
      />
      <Input
        label="Password"
        type="password"
        value="123"
        error
        errorMessage="Password must be at least 8 characters"
      />
      <Input label="Phone" value="abc" error errorMessage="Please enter a valid phone number" />
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
