"use client";

// Fallback for React DevTools beta builds where renderers without semver crash the panel.
if (typeof window !== "undefined") {
  const hook = (window as typeof window & {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      registerRenderer?: (renderer: { version?: string }) => void;
      __patchedForR3F?: boolean;
    };
  }).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (hook && !hook.__patchedForR3F) {
    const original = hook.registerRenderer;
    hook.registerRenderer = (renderer) => {
      if (renderer && !renderer.version) {
        renderer.version = "0.0.0";
      }
      original?.(renderer);
    };
    hook.__patchedForR3F = true;
  }
}

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Mesh } from "three";

/**
 * Animated Sphere Component
 *
 * 3D sphere with distortion effect and rotation
 */
function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  // Rotate sphere on each frame
  useFrame((state, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;

    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#06B6D4"
        attach="material"
        distort={prefersReducedMotion ? 0 : 0.4}
        speed={prefersReducedMotion ? 0 : 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

/**
 * ThreeScene Props
 */
interface ThreeSceneProps {
  /**
   * Additional className for container
   */
  className?: string;
}

/**
 * ThreeScene Component
 *
 * 3D scene using React Three Fiber for the Tech side of Hero section
 * Creates a futuristic, premium visual with animated distorted sphere
 *
 * Features:
 * - React Three Fiber for 3D rendering
 * - Animated distorted sphere with metallic material
 * - Smooth rotation animation
 * - Ambient and directional lighting
 * - OrbitControls for interactive viewing (optional)
 * - Respects prefers-reduced-motion (static scene)
 * - Tech brand color (cyan #06B6D4)
 *
 * @example
 * ```tsx
 * <ThreeScene className="w-full h-full" />
 * ```
 */
export function ThreeScene({ className = "" }: ThreeSceneProps) {
  return (
    <div className={`${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06B6D4" />

        {/* 3D Object */}
        <AnimatedSphere />

        {/* Camera controls disabled to avoid scroll-blocking warnings */}
        {/* OrbitControls removed for better performance and no scroll conflicts */}
      </Canvas>
    </div>
  );
}
