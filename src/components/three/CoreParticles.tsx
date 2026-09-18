import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalMouse } from "../../hooks/useMouseParallax";

interface CoreParticlesProps {
  count?: number;
  reducedMotion?: boolean;
}

export const CoreParticles: React.FC<CoreParticlesProps> = ({
  count = 140,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3.0 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }

    return [pos];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    // Tranquil ambient drift
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;

    // Micro reaction to mouse
    pointsRef.current.rotation.x += (globalMouse.y * 0.02 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y += (globalMouse.x * 0.02 - pointsRef.current.rotation.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#cbd5e1"
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  );
};
