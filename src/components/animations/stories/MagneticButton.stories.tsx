import type { Meta, StoryObj } from "@storybook/react";
import { MagneticButton } from "../MagneticButton";
import { Button } from "@/components/primitives/button";

const meta = {
  title: "Animations/MagneticButton",
  component: MagneticButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MagneticButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-20">
      <MagneticButton>
        <Button variant="primary-legal">Hover Over Me</Button>
      </MagneticButton>
    </div>
  ),
};

export const StrongMagnet: Story = {
  render: () => (
    <div className="p-20">
      <MagneticButton strength={60}>
        <Button variant="primary-tech" size="lg">
          Strong Magnetic Effect
        </Button>
      </MagneticButton>
    </div>
  ),
};

export const SubtleMagnet: Story = {
  render: () => (
    <div className="p-20">
      <MagneticButton strength={15}>
        <Button variant="outline-legal">Subtle Effect</Button>
      </MagneticButton>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 p-20">
      <MagneticButton>
        <Button variant="primary-legal">Button 1</Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="primary-tech">Button 2</Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="outline-legal">Button 3</Button>
      </MagneticButton>
    </div>
  ),
};
