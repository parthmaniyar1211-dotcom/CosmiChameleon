import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { globalMouse } from "../../hooks/useMouseParallax";

interface CoreProps {
  progress: number;
  reducedMotion?: boolean;
}

export const Core: React.FC<CoreProps> = ({ progress, reducedMotion = false }) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const innerMatrixRef = useRef<THREE.Mesh>(null);
  const plateRefs = useRef<(THREE.Group | null)[]>([]);
  const accentRingsRef = useRef<THREE.Group>(null);

  // 4 Primary Precision Articulating Shell Plates (Quadrants)
  // Each plate represents a core architectural quadrant:
  // 0: Frontend / Interface
  // 1: Backend / Systems
  // 2: Artificial Intelligence
  // 3: Autonomous Workflows
  const plateInitialVectors = useMemo(() => [
    new THREE.Vector3(1, 1, 1).normalize(),
    new THREE.Vector3(-1, -1, 1).normalize(),
    new THREE.Vector3(-1, 1, -1).normalize(),
    new THREE.Vector3(1, -1, -1).normalize(),
  ], []);

  useFrame((_, delta) => {
    if (!rootGroupRef.current) return;

    const time = performance.now() * 0.001;
    const p = progress;

    // --- MEANINGFUL ARCHITECTURAL TRANSFORMATIONS ---
    // HERO (0.00 - 0.12): Complete, locked monolithic core (Potential)
    // ABOUT (0.12 - 0.25): Shell plates dilate, revealing inner matrix (Adaptability)
    // SERVICES (0.25 - 0.38): Plates decouple into 4 distinct capability satellites (Capabilities)
    // PRODUCTS (0.38 - 0.54): Plates reorganize into an aligned functional engine (Products)
    // WORK (0.54 - 0.68): Plates form an exhibition platform (Solutions)
    // PROCESS (0.68 - 0.82): Plates elongate along the depth axis (Engineering pipeline)
    // WHY / TECH (0.82 - 0.94): Balanced gyroscopic nexus (Architecture)
    // CONTACT (0.94 - 1.00): Plates converge and lock back into complete core ("Let's build")

    let targetDilation = 0.0;
    let targetScale = 1.0;
    let targetX = 0;
    let targetY = 0;
    let targetRotationSpeed = 0.25;
    let plateArrangement: "monolith" | "orbit" | "linear" | "pedestal" | "conduit" | "constellation" = "monolith";

    if (p < 0.12) {
      // HERO: Monolithic, precision locked, tranquil presence beneath headline
      targetDilation = 0.0;
      targetScale = 1.0;
      targetX = 0;
      targetY = -0.15;
      targetRotationSpeed = 0.16;
      plateArrangement = "monolith";
    } else if (p < 0.25) {
      // ABOUT: Subtle dilation revealing computational heart
      targetDilation = 0.45;
      targetScale = 1.0;
      targetX = 1.4;
      targetY = 0.1;
      targetRotationSpeed = 0.25;
      plateArrangement = "monolith";
    } else if (p < 0.38) {
      // SERVICES: Decoupled capability modules floating on left/orbit
      targetDilation = 1.35;
      targetScale = 0.9;
      targetX = -1.5;
      targetY = 0;
      targetRotationSpeed = 0.3;
      plateArrangement = "orbit";
    } else if (p < 0.54) {
      // PRODUCTS: Aligned systems engine on right
      targetDilation = 1.1;
      targetScale = 0.95;
      targetX = 1.6;
      targetY = 0;
      targetRotationSpeed = 0.2;
      plateArrangement = "linear";
    } else if (p < 0.68) {
      // WORK: Exhibition platform receding beneath cards
      targetDilation = 0.8;
      targetScale = 0.75;
      targetX = 0;
      targetY = -1.3;
      targetRotationSpeed = 0.15;
      plateArrangement = "pedestal";
    } else if (p < 0.82) {
      // PROCESS: Longitudinal aerodynamic conduit
      targetDilation = 1.5;
      targetScale = 0.85;
      targetX = 0;
      targetY = 0.2;
      targetRotationSpeed = 0.28;
      plateArrangement = "conduit";
    } else if (p < 0.94) {
      // WHY & TECHNOLOGY: Balanced constellation nexus
      targetDilation = 1.0;
      targetScale = 1.05;
      targetX = 0;
      targetY = 0;
      targetRotationSpeed = 0.35;
      plateArrangement = "constellation";
    } else {
      // CONTACT: Converged and complete again (Let's build)
      targetDilation = 0.0;
      targetScale = 1.25;
      targetX = 0;
      targetY = 0.2;
      targetRotationSpeed = 0.15;
      plateArrangement = "monolith";
    }

    if (reducedMotion) {
      targetDilation = 0.0;
      targetScale = 1.0;
      targetRotationSpeed = 0;
    }

    // Smooth root damping
    rootGroupRef.current.position.x = THREE.MathUtils.lerp(rootGroupRef.current.position.x, targetX, 0.06);
    rootGroupRef.current.position.y = THREE.MathUtils.lerp(rootGroupRef.current.position.y, targetY, 0.06);
    rootGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);

    // Controlled mouse parallax (gentle, restrained)
    const mouseX = reducedMotion ? 0 : globalMouse.x * 0.12;
    const mouseY = reducedMotion ? 0 : globalMouse.y * 0.1;

    rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.y,
      mouseX + (reducedMotion ? 0 : time * targetRotationSpeed),
      0.05
    );
    rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.x,
      mouseY + (reducedMotion ? 0 : Math.sin(time * 0.4) * 0.08),
      0.05
    );

    // Inner Computational Matrix rotation & gentle breathing
    if (innerMatrixRef.current) {
      const breath = 1 + (reducedMotion ? 0 : Math.sin(time * 1.6) * 0.025);
      innerMatrixRef.current.scale.set(breath, breath, breath);
      if (!reducedMotion) {
        innerMatrixRef.current.rotation.y += delta * 0.35;
        innerMatrixRef.current.rotation.x -= delta * 0.2;
      }
    }

    // Articulate each of the 4 Titanium Shell Plates
    plateRefs.current.forEach((plate, i) => {
      if (!plate) return;

      const baseDir = plateInitialVectors[i];
      let offset = baseDir.clone().multiplyScalar(0.7 + targetDilation * 0.85);

      if (plateArrangement === "linear") {
        // Aligns in an engineering sequence
        const linearX = (i - 1.5) * (0.8 + targetDilation * 0.3);
        offset.set(linearX, (i % 2 === 0 ? 0.2 : -0.2), 0);
      } else if (plateArrangement === "pedestal") {
        // Forms a balanced horizontal square base
        const angle = (i / 4) * Math.PI * 2;
        offset.set(Math.cos(angle) * 1.4, -0.3, Math.sin(angle) * 1.4);
      } else if (plateArrangement === "conduit") {
        // Elongates into a streamlined guide pointing down Z
        offset.set(baseDir.x * 0.6, baseDir.y * 0.6, (i - 1.5) * 1.2);
      }

      plate.position.lerp(offset, 0.08);

      if (!reducedMotion) {
        // Subtle micro-rotation aligning each plate along its movement normal
        plate.rotation.x = THREE.MathUtils.lerp(plate.rotation.x, baseDir.x * targetDilation * 0.4, 0.06);
        plate.rotation.y = THREE.MathUtils.lerp(plate.rotation.y, baseDir.y * targetDilation * 0.5, 0.06);
      }
    });

    // Thin mechanical alignment ring
    if (accentRingsRef.current && !reducedMotion) {
      accentRingsRef.current.rotation.z += delta * 0.15;
      accentRingsRef.current.scale.setScalar(1 + targetDilation * 0.4);
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* 1. Inner Computational Matrix (Obsidian Gem with Precision Facets) */}
      <mesh ref={innerMatrixRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial
          color="#0a0c12"
          emissive="#0d1424"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.95}
        />
      </mesh>

      {/* 2. Four Precision Titanium Shell Plates (Sculpted Chamfered Facets) */}
      {plateInitialVectors.map((_, index) => (
        <group
          key={index}
          ref={(el) => (plateRefs.current[index] = el)}
        >
          {/* Main Faceted Plate Body */}
          <mesh>
            <tetrahedronGeometry args={[0.48, 0]} />
            <meshStandardMaterial
              color="#121622"
              metalness={0.9}
              roughness={0.22}
              emissive={index % 2 === 0 ? "#112238" : "#1a1636"}
              emissiveIntensity={0.35}
            />
          </mesh>

          {/* Micro-machined Titanium Edge Lip */}
          <mesh scale={[1.04, 1.04, 1.04]}>
            <tetrahedronGeometry args={[0.48, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              wireframe
              wireframeLinewidth={1}
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Precision Sensor / Node Jewel */}
          <mesh position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* 3. Subtle Equatorial Alignment Rail (Restrained, not spinning frantically) */}
      <group ref={accentRingsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.01, 16, 64]} />
          <meshStandardMaterial
            color="#2a3346"
            metalness={0.95}
            roughness={0.3}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>
    </group>
  );
};
