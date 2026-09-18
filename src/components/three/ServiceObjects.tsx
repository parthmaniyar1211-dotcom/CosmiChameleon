import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { servicesData } from "../../content/services";

interface ServiceObjectsProps {
  progress: number;
  activeServiceIndex: number;
  onSelectService?: (index: number) => void;
  reducedMotion?: boolean;
}

export const ServiceObjects: React.FC<ServiceObjectsProps> = ({
  progress,
  activeServiceIndex,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const itemsRef = useRef<(THREE.Mesh | null)[]>([]);

  // Visible primarily during the Services phase (progress ~ 0.20 to 0.38)
  const isVisible = progress > 0.16 && progress < 0.44;
  const opacityFactor = THREE.MathUtils.clamp((progress - 0.18) / 0.06, 0, 1) *
    THREE.MathUtils.clamp((0.42 - progress) / 0.06, 0, 1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isVisible || opacityFactor <= 0.01) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Slow orbital rotation
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    // Update each satellite object
    itemsRef.current.forEach((mesh, index) => {
      if (!mesh) return;

      const isSelected = index === activeServiceIndex;
      const targetScale = isSelected ? 1.35 : 0.9;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      if (!reducedMotion) {
        mesh.rotation.x += delta * (isSelected ? 0.8 : 0.3);
        mesh.rotation.y += delta * (isSelected ? 1.0 : 0.4);
      }

      // Material emissive highlight
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          isSelected ? 0.8 : 0.2,
          0.1
        );
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, opacityFactor * (isSelected ? 0.95 : 0.5), 0.1);
      }
    });
  });

  return (
    <group ref={groupRef} position={[-1.2, 0, 0]}>
      {servicesData.map((service, index) => {
        const radius = 2.4;
        const x = radius * Math.cos(service.orbitAngle);
        const z = radius * Math.sin(service.orbitAngle);

        return (
          <group key={service.id} position={[x, (index % 2 === 0 ? 0.3 : -0.3), z]}>
            <mesh
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <octahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial
                color={index === activeServiceIndex ? "#38bdf8" : "#818cf8"}
                emissive={index === activeServiceIndex ? "#0284c7" : "#4338ca"}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
