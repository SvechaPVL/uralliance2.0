import type { Meta, StoryObj } from "@storybook/react";
import { ThreeScene } from "../ThreeScene";
import { List } from "@/components/primitives/list";

/**
 * ThreeScene Component - 3D animated scene with React Three Fiber
 *
 * **Note**: This component uses WebGL and may not render in all environments.
 * If you see a blank canvas, try:
 * - Refreshing the page
 * - Checking browser console for WebGL errors
 * - Ensuring hardware acceleration is enabled
 *
 * Features:
 * - Animated energy core with distortion effects
 * - Neon rings and orbiting particles
 * - Gradient backdrop with energy field
 * - Respects prefers-reduced-motion
 */
const meta = {
  title: "Animations/ThreeScene",
  component: ThreeScene,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "3D scene using React Three Fiber. Requires WebGL support. May show blank canvas in some Storybook environments - this is normal. View in browser for best experience.",
      },
    },
    // Disable some addons that may interfere with Canvas
    a11y: {
      disable: true, // Canvas content is decorative
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the container",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full h-screen bg-[var(--color-background-primary)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ThreeScene>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default 3D scene
 *
 * **Important**: If the scene doesn't load:
 * 1. Check browser console for WebGL errors
 * 2. Ensure your browser supports WebGL
 * 3. Try viewing the story in a new tab
 */
export const Default: Story = {
  args: {
    className: "w-full h-full",
  },
};

/**
 * With dark background (default)
 */
export const DarkBackground: Story = {
  args: {
    className: "w-full h-full",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Full screen scene
 */
export const FullScreen: Story = {
  args: {
    className: "w-screen h-screen",
  },
  parameters: {
    layout: "fullscreen",
  },
};

/**
 * Reduced motion preview
 *
 * To test reduced motion:
 * 1. Open DevTools
 * 2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
 * 3. Type "Emulate CSS prefers-reduced-motion"
 * 4. Select "prefers-reduced-motion: reduce"
 */
export const ReducedMotion: Story = {
  args: {
    className: "w-full h-full",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When prefers-reduced-motion is enabled, animations are disabled for accessibility. Use browser DevTools to emulate this setting.",
      },
    },
  },
};

/**
 * Comparison: Side by side (may be heavy on performance)
 */
export const SideBySide: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full h-screen p-4 bg-black">
      <div className="border border-[var(--color-border-soft)] rounded-lg overflow-hidden">
        <ThreeScene className="w-full h-full" />
      </div>
      <div className="border border-[var(--color-border-soft)] rounded-lg overflow-hidden">
        <ThreeScene className="w-full h-full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**Warning**: Running multiple Canvas instances simultaneously may impact performance.",
      },
    },
  },
};

/**
 * In hero section context
 */
export const HeroContext: Story = {
  render: () => (
    <section className="relative min-h-screen bg-gradient-to-b from-black to-neutral-950 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-[var(--color-tech-primary)] mb-6">
            Technology Solutions
          </p>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Инновационные
            <br />
            IT-решения
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Современные технологии для вашего бизнеса. Разработка, интеграция, поддержка.
          </p>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full" />
      </div>
    </section>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

/**
 * Technical information
 */
export const TechnicalInfo: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">ThreeScene Technical Details</h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
          <List variant="unordered" spacing="sm" className="text-[var(--color-text-secondary)]">
            <li>React Three Fiber - React renderer for Three.js</li>
            <li>@react-three/drei - Helpers and abstractions</li>
            <li>Three.js - WebGL 3D library</li>
            <li>WebGL - Browser 3D rendering API</li>
          </List>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Components</h3>
          <List variant="unordered" spacing="sm" className="text-[var(--color-text-secondary)]">
            <li>
              <strong>EnergyCore</strong> - Central sphere with distortion material
            </li>
            <li>
              <strong>NeonRing</strong> - Rotating torus geometry with emission
            </li>
            <li>
              <strong>OrbitingParticle</strong> - Animated particles on orbital paths
            </li>
            <li>
              <strong>GradientBackdrop</strong> - Background gradient plane
            </li>
            <li>
              <strong>EnergyField</strong> - Ground plane with wireframe distortion
            </li>
            <li>
              <strong>OrbitLine</strong> - Dashed orbital guide lines
            </li>
          </List>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Performance Notes</h3>
          <div className="bg-[var(--color-background-secondary)] p-4 rounded-lg space-y-2 text-sm">
            <p>
              <strong>Hardware acceleration:</strong> Required for smooth rendering
            </p>
            <p>
              <strong>Reduced motion:</strong> Automatically disables animations when user
              prefers reduced motion
            </p>
            <p>
              <strong>Mobile performance:</strong> May be limited on low-end devices
            </p>
            <p>
              <strong>Multiple instances:</strong> Not recommended - use single instance per page
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Known Issues</h3>
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg space-y-2 text-sm">
            <p>
              <strong>Storybook rendering:</strong> Canvas may show blank in some Storybook
              environments. This is a known limitation with WebGL contexts in iframes.
            </p>
            <p>
              <strong>Workaround:</strong> Open story in new tab or view in actual application.
            </p>
            <p>
              <strong>React DevTools:</strong> Component includes patch for React DevTools
              compatibility with R3F.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 border-t border-[var(--color-border-soft)] pt-6">
        <h3 className="text-xl font-semibold mb-4">Live Preview Below</h3>
        <div className="h-[600px] border border-[var(--color-border-soft)] rounded-lg overflow-hidden">
          <ThreeScene className="w-full h-full" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
