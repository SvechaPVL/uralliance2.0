"use client";

import "@/lib/fixReactDevtoolsR3F";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  GradientTexture,
  Line,
  MeshDistortMaterial,
  Sparkles,
  Sphere,
} from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import type { Group, Mesh } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TECH_PALETTE = {
  core: "#24a6bb",
  shell: "#6b8631",
  accent: "#106276",
  secondary: "#a86cd9",
  backdrop: ["#01050d", "#010712", "#01050d"] as [string, string, string],
  ringPrimary: "#1b7fa1",
  ringSecondary: "#9c7c32",
  sparkles: "#7ac8da",
};

function EnergyCore() {
  const groupRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;
    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.18;
      groupRef.current.rotation.y += delta * 0.25;
    }

    if (shellRef.current) {
      const pulse = 1 + Math.sin(elapsed * 1.8) * 0.05;
      shellRef.current.scale.setScalar(1.6 * pulse);
    }

    if (coreRef.current) {
      const intensity = 0.5 + Math.sin(elapsed * 3) * 0.2;
      coreRef.current.scale.setScalar(0.95 + intensity * 0.2);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={coreRef} args={[1, 128, 128]} scale={1.25}>
        <MeshDistortMaterial
          color={TECH_PALETTE.core}
          attach="material"
          distort={prefersReducedMotion ? 0 : 0.35}
          speed={prefersReducedMotion ? 0 : 2.4}
          roughness={0.15}
          metalness={0.95}
          emissive="#9ae6f7"
          emissiveIntensity={0.55}
        />
      </Sphere>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={TECH_PALETTE.shell}
          transparent
          opacity={0.25}
          metalness={1}
          roughness={0.05}
          emissive={TECH_PALETTE.shell}
          emissiveIntensity={0.25}
          wireframe
        />
      </mesh>
    </group>
  );
}

function NeonRing({
  radius,
  color,
  rotation,
  pulsate = false,
}: {
  radius: number;
  color: string;
  rotation?: [number, number, number];
  pulsate?: boolean;
}) {
  const ringRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!ringRef.current || prefersReducedMotion) return;
    ringRef.current.rotation.x += delta * 0.05;
    ringRef.current.rotation.y += delta * 0.12;

    if (pulsate) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.08, 32, 256]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}

function GradientBackdrop() {
  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial side={DoubleSide} transparent opacity={0.95} toneMapped={false}>
        <GradientTexture stops={[0, 0.5, 1]} colors={TECH_PALETTE.backdrop} size={32} />
      </meshBasicMaterial>
    </mesh>
  );
}

function EnergyField() {
  const meshRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.2, 0]}>
      <planeGeometry args={[5, 5, 64, 64]} />
      <MeshDistortMaterial
        color={TECH_PALETTE.accent}
        transparent
        opacity={0.25}
        distort={prefersReducedMotion ? 0 : 0.4}
        speed={prefersReducedMotion ? 0 : 1.2}
        wireframe
      />
    </mesh>
  );
}

function OrbitLine({
  radius,
  color,
  rotation,
}: {
  radius: number;
  color: string;
  rotation?: [number, number, number];
}) {
  const points = useMemo(() => {
    const segments = 128;
    const circlePoints: Vector3[] = [];
    for (let i = 0; i <= segments; i += 1) {
      const theta = (i / segments) * Math.PI * 2;
      circlePoints.push(new Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return circlePoints;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      dashed
      dashScale={0.25}
      rotation={rotation}
      transparent
      opacity={0.35}
    />
  );
}

interface OrbitingParticleProps {
  radius: number;
  speed: number;
  size: number;
  color: string;
  verticalOffset?: number;
  offset?: number;
}

function OrbitingParticle({
  radius,
  speed,
  size,
  color,
  verticalOffset = 0.2,
  offset = 0,
}: OrbitingParticleProps) {
  const particleRef = useRef<Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!particleRef.current || prefersReducedMotion) return;
    const elapsed = state.clock.getElapsedTime() * speed + offset;
    particleRef.current.position.set(
      Math.cos(elapsed) * radius,
      Math.sin(elapsed * 1.2) * verticalOffset,
      Math.sin(elapsed) * radius
    );
  });

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.3}
        roughness={0.1}
        metalness={0.4}
      />
    </mesh>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = "" }: ThreeSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const orbitConfigs = useMemo(
    () => [
      { radius: 2.2, speed: 0.6, size: 0.08, color: TECH_PALETTE.secondary, verticalOffset: 0.35, offset: 0 },
      { radius: 2.6, speed: 0.45, size: 0.07, color: TECH_PALETTE.accent, verticalOffset: 0.2, offset: 1 },
      { radius: 1.8, speed: 0.9, size: 0.06, color: TECH_PALETTE.ringPrimary, verticalOffset: 0.4, offset: 2.4 },
    ],
    []
  );

  return (
    <div className={`${className} relative`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,4,10,0.95),rgba(0,0,0,0.98))]" />
      <Canvas
        className="relative"
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 4]} intensity={0.8} color={TECH_PALETTE.ringSecondary} />
        <pointLight position={[-4, -2, -3]} intensity={0.5} color={TECH_PALETTE.accent} />

        <GradientBackdrop />
        <EnergyField />

        <Float speed={prefersReducedMotion ? 0 : 1.2} rotationIntensity={prefersReducedMotion ? 0 : 0.8}>
          <EnergyCore />
        </Float>
        <NeonRing radius={2.8} color={TECH_PALETTE.ringPrimary} rotation={[Math.PI / 3, 0, 0]} pulsate />
        <NeonRing radius={2.2} color={TECH_PALETTE.ringSecondary} rotation={[Math.PI / 2, Math.PI / 4, 0]} />
        <OrbitLine radius={2.2} color={TECH_PALETTE.ringPrimary} rotation={[Math.PI / 4, 0, 0]} />
        <OrbitLine radius={2.6} color={TECH_PALETTE.ringSecondary} rotation={[Math.PI / 3, Math.PI / 3, 0]} />

        {orbitConfigs.map((config, index) => (
          <OrbitingParticle key={index} {...config} />
        ))}

        {!prefersReducedMotion && (
          <Sparkles
            count={24}
            speed={0.45}
            opacity={0.25}
            scale={[6, 6, 6]}
            size={1.5}
            color={TECH_PALETTE.sparkles}
          />
        )}
      </Canvas>
    </div>
  );
}
