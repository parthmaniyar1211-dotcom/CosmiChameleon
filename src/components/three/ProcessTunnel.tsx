import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { processStages } from "../../content/process";

interface ProcessTunnelProps {
  progress: number;
  reducedMotion?: boolean;
}

export const ProcessTunnel: React.FC<ProcessTunnelProps> = ({
  progress,
  reducedMotion = false,
}) => {
  const tunnelGroupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<(THREE.Group | null)[]>([]);

  // Visible during Process section (progress ~ 0.65 to 0.82)
  const isVisible = progress > 0.63 && progress < 0.85;
  const opacityFactor = THREE.MathUtils.clamp((progress - 0.64) / 0.04, 0, 1) *
    THREE.MathUtils.clamp((0.84 - progress) / 0.04, 0, 1);

  useFrame((_, delta) => {
    if (!tunnelGroupRef.current) return;

    if (!isVisible || opacityFactor <= 0.01) {
      tunnelGroupRef.current.visible = false;
      return;
    }
    tunnelGroupRef.current.visible = true;

    // Relative progress in the process section [0 to 1]
    const relativeProg = THREE.MathUtils.clamp((progress - 0.65) / 0.16, 0, 1);

    // Scroll drives tunnel camera penetration depth
    const targetZ = relativeProg * 6.0;
    tunnelGroupRef.current.position.z = THREE.MathUtils.lerp(
      tunnelGroupRef.current.position.z,
      targetZ - 2.5,
      0.08
    );

    if (!reducedMotion) {
      tunnelGroupRef.current.rotation.z += delta * 0.1;
    }

    // Update ring materials
    ringsRef.current.forEach((ring, idx) => {
      if (!ring) return;
      const ringActive = Math.abs(relativeProg * 4 - idx) < 0.8;
      ring.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.emissiveIntensity = THREE.MathUtils.lerp(
            mat.emissiveIntensity,
            ringActive ? 0.9 : 0.2,
            0.1
          );
          mat.opacity = opacityFactor * (ringActive ? 0.85 : 0.4);
        }
      });
    });
  });

  return (
    <group ref={tunnelGroupRef} position={[0, 0, -4]}>
      {processStages.map((stage, idx) => {
        const z = -idx * 1.8;
        return (
          <group
            key={stage.step}
            ref={(el) => (ringsRef.current[idx] = el)}
            position={[0, 0, z]}
          >
            {/* Hexagonal Tunnel Portal Ring */}
            <mesh>
              <ringGeometry args={[1.8, 1.84, 6]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={0.3}
                side={THREE.DoubleSide}
                transparent
                opacity={0.5}
              />
            </mesh>

            {/* Corner Node Gems */}
            {[0, 1, 2, 3, 4, 5].map((cornerIdx) => {
              const theta = (cornerIdx / 6) * Math.PI * 2;
              const r = 1.82;
              return (
                <mesh
                  key={cornerIdx}
                  position={[r * Math.cos(theta), r * Math.sin(theta), 0]}
                >
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshStandardMaterial
                    color="#ffffff"
                    emissive="#38bdf8"
                    emissiveIntensity={0.8}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
