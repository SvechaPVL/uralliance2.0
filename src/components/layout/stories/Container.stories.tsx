import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../Container";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
    <h2 className="mb-2 text-2xl font-bold">Container Content</h2>
    <p>This content is constrained by the container width.</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container>
        <DemoContent />
      </Container>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="min-h-screen space-y-8 bg-gray-100 py-8">
      <Container size="xs">
        <div className="rounded bg-blue-500 p-4 text-white">XS Container</div>
      </Container>
      <Container size="sm">
        <div className="rounded bg-green-500 p-4 text-white">SM Container</div>
      </Container>
      <Container size="md">
        <div className="rounded bg-yellow-500 p-4 text-white">MD Container</div>
      </Container>
      <Container size="lg">
        <div className="rounded bg-orange-500 p-4 text-white">LG Container</div>
      </Container>
      <Container size="xl">
        <div className="rounded bg-red-500 p-4 text-white">XL Container</div>
      </Container>
      <Container size="2xl">
        <div className="rounded bg-purple-500 p-4 text-white">2XL Container</div>
      </Container>
      <Container size="full">
        <div className="rounded bg-pink-500 p-4 text-white">Full Width Container</div>
      </Container>
    </div>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container noPadding>
        <div className="rounded bg-teal-500 p-8 text-white">Container without padding</div>
      </Container>
    </div>
  ),
};

export const AsSection: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container as="section" size="xl">
        <DemoContent />
      </Container>
    </div>
  ),
};
