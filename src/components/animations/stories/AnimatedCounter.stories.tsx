import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedCounter } from "../AnimatedCounter";

const meta = {
  title: "Animations/AnimatedCounter",
  component: AnimatedCounter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnimatedCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1000,
  },
};

export const WithLabel: Story = {
  args: {
    value: 500,
    label: "Happy Clients",
  },
};

export const WithPrefix: Story = {
  args: {
    value: 99,
    prefix: "$",
    suffix: "K",
    label: "Revenue",
  },
};

export const Percentage: Story = {
  args: {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
  },
};

export const Decimal: Story = {
  args: {
    value: 4.8,
    decimals: 1,
    suffix: "/5",
    label: "Average Rating",
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 rounded-2xl bg-gray-900 p-8">
      <AnimatedCounter
        value={1250}
        label="Projects Completed"
        className="text-center"
        valueClassName="text-4xl font-bold text-[var(--color-legal-primary)]"
      />
      <AnimatedCounter
        value={98}
        suffix="%"
        label="Client Satisfaction"
        className="text-center"
        valueClassName="text-4xl font-bold text-[var(--color-tech-primary)]"
      />
      <AnimatedCounter
        value={450}
        prefix="$"
        suffix="K"
        label="Revenue"
        className="text-center"
        valueClassName="text-4xl font-bold text-green-400"
      />
    </div>
  ),
};
