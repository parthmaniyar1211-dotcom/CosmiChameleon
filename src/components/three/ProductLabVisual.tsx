import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProductLabVisualProps {
  progress: number;
  activeProductIndex: number;
  reducedMotion?: boolean;
}

export const ProductLabVisual: React.FC<ProductLabVisualProps> = ({
  progress,
  activeProductIndex,
  reducedMotion = false,
}) => {
  const labGroupRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Group>(null);
  const automationFlowRef = useRef<THREE.Group>(null);
  const voiceAcousticRef = useRef<THREE.Group>(null);

  // Visible during Product section (progress ~ 0.38 to 0.56)
  const isVisible = progress > 0.35 && progress < 0.60;
  const opacityFactor = THREE.MathUtils.clamp((progress - 0.37) / 0.05, 0, 1) *
    THREE.MathUtils.clamp((0.58 - progress) / 0.05, 0, 1);

  useFrame((_, delta) => {
    if (!labGroupRef.current) return;

    if (!isVisible || opacityFactor <= 0.01) {
      labGroupRef.current.visible = false;
      return;
    }
    labGroupRef.current.visible = true;

    const time = performance.now() * 0.001;

    // ShieldScope Security Perimeter (Product 0)
    if (shieldRef.current) {
      const isTarget = activeProductIndex === 0;
      shieldRef.current.visible = isTarget;
      if (isTarget && !reducedMotion) {
        shieldRef.current.rotation.y = Math.sin(time * 0.8) * 0.25;
        shieldRef.current.rotation.z = Math.cos(time * 0.6) * 0.1;
      }
    }

    // MailX Automation Pipeline Nodes & Data Packets (Product 1)
    if (automationFlowRef.current) {
      const isTarget = activeProductIndex === 1;
      automationFlowRef.current.visible = isTarget;
      if (isTarget && !reducedMotion) {
        automationFlowRef.current.rotation.z = Math.sin(time * 0.8) * 0.04;
      }
    }

    // Voice Agent Acoustic Resonator & Neural Core (Product 2)
    if (voiceAcousticRef.current) {
      const isTarget = activeProductIndex === 2;
      voiceAcousticRef.current.visible = isTarget;
      if (isTarget && !reducedMotion) {
        voiceAcousticRef.current.rotation.y += delta * 0.5;
        voiceAcousticRef.current.rotation.x = Math.sin(time * 1.2) * 0.2;
      }
    }
  });

  return (
    <group ref={labGroupRef} position={[1.5, 0, 0]}>
      {/* Product 01: ShieldScope 3D Security Perimeter & Scanning Shield */}
      <group ref={shieldRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.75, 0.12, 6]} />
          <meshStandardMaterial
            color="#0b1329"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.05, 0.14, 6]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#38bdf8"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Product 02: MailX 5-Node Dispatch Pipeline */}
      <group ref={automationFlowRef}>
        {[-1.6, -0.8, 0, 0.8, 1.6].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
              <meshStandardMaterial
                color={idx === 1 ? "#34d399" : idx === 2 ? "#38bdf8" : "#818cf8"}
                emissive={idx === 1 ? "#059669" : idx === 2 ? "#0284c7" : "#4338ca"}
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Flow Connectors */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.02, 0.02]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Product 03: Voice Agent Acoustic Resonator & Neural Core */}
      <group ref={voiceAcousticRef}>
        <mesh>
          <octahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            emissive="#818cf8"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
