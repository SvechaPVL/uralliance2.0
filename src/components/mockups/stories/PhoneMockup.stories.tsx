import type { Meta, StoryObj } from "@storybook/react";
import { PhoneMockup } from "../PhoneMockup";

const meta = {
  title: "Mockups/PhoneMockup",
  component: PhoneMockup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PhoneMockup>;

export default meta;
type Story = StoryObj<typeof meta>;

const AppContent = () => (
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
    <div className="text-center">
      <h3 className="mb-2 text-2xl font-bold">Mobile App</h3>
      <p className="text-sm opacity-80">Beautiful UI</p>
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <PhoneMockup>
      <AppContent />
    </PhoneMockup>
  ),
};

export const Android: Story = {
  render: () => (
    <PhoneMockup variant="android">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500 to-teal-500">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold">Android</h3>
          <p className="text-sm opacity-80">Material Design</p>
        </div>
      </div>
    </PhoneMockup>
  ),
};

export const Landscape: Story = {
  render: () => (
    <PhoneMockup orientation="landscape">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="text-center">
          <h3 className="mb-2 text-2xl font-bold">Landscape</h3>
          <p className="text-sm opacity-80">Horizontal View</p>
        </div>
      </div>
    </PhoneMockup>
  ),
};

export const WithRealContent: Story = {
  render: () => (
    <PhoneMockup>
      <div className="h-full w-full bg-white">
        <div className="bg-gradient-to-r from-[var(--color-tech-primary)] to-[var(--color-tech-dark)] p-6 text-white">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm opacity-90">Welcome back!</p>
        </div>
        <div className="space-y-4 p-4">
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="mb-2 h-3 w-3/4 rounded bg-gray-300" />
            <div className="h-2 w-1/2 rounded bg-gray-200" />
          </div>
          <div className="rounded-lg bg-gray-100 p-4">
            <div className="mb-2 h-3 w-2/3 rounded bg-gray-300" />
            <div className="h-2 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </PhoneMockup>
  ),
};
