import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { globalScroll } from "../../hooks/useScrollProgress";
import { globalMouse } from "../../hooks/useMouseParallax";
import { Core } from "./Core";
import { CoreParticles } from "./CoreParticles";
import { ServiceObjects } from "./ServiceObjects";
import { ProductLabVisual } from "./ProductLabVisual";
import { ProjectGalleryVisual } from "./ProjectGalleryVisual";
import { ProcessTunnel } from "./ProcessTunnel";
import { TechnologyNodes } from "./TechnologyNodes";

interface SceneControllerProps {
  activeServiceIndex: number;
  activeProductIndex: number;
  activeProjectIndex: number | null;
  activeTechIndex: number;
  reducedMotion?: boolean;
}

export const SceneController: React.FC<SceneControllerProps> = ({
  activeServiceIndex,
  activeProductIndex,
  activeProjectIndex,
  activeTechIndex,
  reducedMotion = false,
}) => {
  const { camera } = useThree();

  const smoothedProgressRef = useRef(0);
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.4));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const targetProgress = globalScroll.progress;

    if (reducedMotion) {
      smoothedProgressRef.current = targetProgress;
    } else {
      smoothedProgressRef.current = THREE.MathUtils.damp(
        smoothedProgressRef.current,
        targetProgress,
        9,
        delta
      );
    }

    const p = smoothedProgressRef.current;

    // Camera keyframing designed to prevent text obstruction
    let camX = 0;
    let camY = 0;
    let camZ = 5.4;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (p < 0.12) {
      // HERO: Positioned with gentle depth so text is 100% clear
      camX = 0;
      camY = 0.05;
      camZ = 5.2;
      lookX = 0;
      lookY = -0.05;
    } else if (p < 0.25) {
      // ABOUT: Core moves smoothly to right
      camX = -0.6;
      camY = 0.1;
      camZ = 4.6;
      lookX = 0.6;
      lookY = 0;
    } else if (p < 0.38) {
      // SERVICES: Core satellites float on left
      camX = 0.7;
      camY = -0.05;
      camZ = 4.4;
      lookX = -0.7;
      lookY = 0;
    } else if (p < 0.54) {
      // PRODUCTS: Core engine aligns on right
      camX = -0.7;
      camY = 0.05;
      camZ = 4.5;
      lookX = 0.7;
      lookY = 0;
    } else if (p < 0.68) {
      // WORK: Core rests below as gallery pedestal
      camX = 0;
      camY = 0.4;
      camZ = 5.0;
      lookX = 0;
      lookY = -0.3;
    } else if (p < 0.82) {
      // PROCESS: Longitudinal perspective guide
      camX = 0;
      camY = 0.05;
      camZ = 3.8;
      lookX = 0;
      lookY = 0;
    } else if (p < 0.94) {
      // TECHNOLOGY: Centered constellation
      camX = 0;
      camY = 0.15;
      camZ = 4.8;
      lookX = 0;
      lookY = 0;
    } else {
      // CONTACT: Majestic locked monolith
      camX = 0;
      camY = 0.1;
      camZ = 5.4;
      lookX = 0;
      lookY = 0;
    }

    // Controlled parallax
    if (!reducedMotion) {
      camX += globalMouse.x * 0.18;
      camY += globalMouse.y * 0.14;
    }

    targetCamPos.current.set(camX, camY, camZ);
    targetCamLook.current.set(lookX, lookY, lookZ);

    camera.position.lerp(targetCamPos.current, 0.07);
    camera.lookAt(targetCamLook.current);
  });

  return (
    <>
      {/* Refined Studio Directional & Ambient Lighting (Soft, Matte, Luxury) */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.0}
        color="#ffffff"
      />
      <directionalLight
        position={[-6, -3, -2]}
        intensity={0.4}
        color="#38bdf8"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color="#818cf8"
        distance={5}
      />

      {/* Atmospheric Micro-Particles */}
      <CoreParticles count={140} reducedMotion={reducedMotion} />

      {/* The Central Visual Protagonist: The CosmiChameleon Core */}
      <Core
        progress={smoothedProgressRef.current}
        reducedMotion={reducedMotion}
      />

      {/* Section-Specific Orbital Environments */}
      <ServiceObjects
        progress={smoothedProgressRef.current}
        activeServiceIndex={activeServiceIndex}
        reducedMotion={reducedMotion}
      />

      <ProductLabVisual
        progress={smoothedProgressRef.current}
        activeProductIndex={activeProductIndex}
        reducedMotion={reducedMotion}
      />

      <ProjectGalleryVisual
        progress={smoothedProgressRef.current}
        activeProjectIndex={activeProjectIndex}
        reducedMotion={reducedMotion}
      />

      <ProcessTunnel
        progress={smoothedProgressRef.current}
        reducedMotion={reducedMotion}
      />

      <TechnologyNodes
        progress={smoothedProgressRef.current}
        activeTechIndex={activeTechIndex}
        reducedMotion={reducedMotion}
      />
    </>
  );
};
