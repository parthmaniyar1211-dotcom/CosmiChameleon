import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projectsData } from "../../content/projects";

interface ProjectGalleryVisualProps {
  progress: number;
  activeProjectIndex: number | null;
  onSelectProject?: (index: number) => void;
  reducedMotion?: boolean;
}

export const ProjectGalleryVisual: React.FC<ProjectGalleryVisualProps> = ({
  progress,
  activeProjectIndex,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screensRef = useRef<(THREE.Mesh | null)[]>([]);

  // Visible during Work / Portfolio section (progress ~ 0.52 to 0.68)
  const isVisible = progress > 0.50 && progress < 0.72;
  const opacityFactor = THREE.MathUtils.clamp((progress - 0.51) / 0.05, 0, 1) *
    THREE.MathUtils.clamp((0.71 - progress) / 0.05, 0, 1);

  useFrame(() => {
    if (!groupRef.current) return;

    if (!isVisible || opacityFactor <= 0.01) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    const time = performance.now() * 0.001;

    screensRef.current.forEach((screen, idx) => {
      if (!screen) return;

      const isFocused = activeProjectIndex === idx;
      const targetScale = isFocused ? 1.25 : 1.0;
      screen.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      if (!reducedMotion) {
        screen.position.y = (Math.sin(time + idx * 1.2) * 0.08) - 0.2;
      }

      const mat = screen.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          isFocused ? 0.8 : 0.25,
          0.1
        );
        mat.opacity = opacityFactor * 0.75;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.2, -1]}>
      {projectsData.map((project, idx) => {
        const angle = ((idx - 1.5) / 3) * 0.8;
        const radius = 3.5;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + 3.0;

        return (
          <mesh
            key={project.id}
            ref={(el) => (screensRef.current[idx] = el)}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <planeGeometry args={[1.4, 0.95]} />
            <meshStandardMaterial
              color="#090d16"
              emissive={idx % 2 === 0 ? "#38bdf8" : "#818cf8"}
              emissiveIntensity={0.25}
              roughness={0.15}
              metalness={0.85}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};
