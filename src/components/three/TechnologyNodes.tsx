import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { techEcosystem } from "../../content/technology";

interface TechnologyNodesProps {
  progress: number;
  activeTechIndex: number;
  reducedMotion?: boolean;
}

export const TechnologyNodes: React.FC<TechnologyNodesProps> = ({
  progress,
  activeTechIndex,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Visible during Technology section (progress ~ 0.82 to 0.94)
  const isVisible = progress > 0.80 && progress < 0.96;
  const opacityFactor = THREE.MathUtils.clamp((progress - 0.81) / 0.04, 0, 1) *
    THREE.MathUtils.clamp((0.95 - progress) / 0.04, 0, 1);

  const linePositions = useMemo(() => {
    const coords = new Float32Array(techEcosystem.nodes.length * 2 * 3);
    let idx = 0;
    techEcosystem.nodes.forEach((node) => {
      // From central Core (0, 0, 0)
      coords[idx++] = 0;
      coords[idx++] = 0;
      coords[idx++] = 0;
      // To Node coordinate
      coords[idx++] = node.coordinates[0];
      coords[idx++] = node.coordinates[1];
      coords[idx++] = node.coordinates[2];
    });
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isVisible || opacityFactor <= 0.01) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = opacityFactor * 0.45;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 5 Constellation Nodes */}
      {techEcosystem.nodes.map((node, index) => {
        const isSelected = index === activeTechIndex;
        return (
          <group key={node.id} position={node.coordinates}>
            <mesh>
              <dodecahedronGeometry args={[isSelected ? 0.28 : 0.2, 0]} />
              <meshStandardMaterial
                color={isSelected ? "#38bdf8" : "#818cf8"}
                emissive={isSelected ? "#0284c7" : "#4338ca"}
                emissiveIntensity={isSelected ? 0.9 : 0.3}
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={opacityFactor * 0.9}
              />
            </mesh>
          </group>
        );
      })}

      {/* Radiant Conduits to Central Core */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};
