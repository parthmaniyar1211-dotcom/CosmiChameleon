import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneController } from "./SceneController";
import { StaticFallback } from "./StaticFallback";
import { useWebGLSupport } from "../../hooks/useWebGLSupport";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SharedCanvasProps {
  activeServiceIndex: number;
  activeProductIndex: number;
  activeProjectIndex: number | null;
  activeTechIndex: number;
  isStandardExperience?: boolean;
}

export const SharedCanvas: React.FC<SharedCanvasProps> = ({
  activeServiceIndex,
  activeProductIndex,
  activeProjectIndex,
  activeTechIndex,
  isStandardExperience = false,
}) => {
  const { isSupported, isChecked, isMobile, dpr } = useWebGLSupport();
  const prefersReducedMotion = useReducedMotion();
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show static fallback if Standard Experience is toggled, if WebGL is not supported,
  // if an error occurred, or before client hydration
  if (isStandardExperience || !isMounted || !isChecked || !isSupported || hasWebGLError) {
    return <StaticFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-cosmic-950"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: isMobile ? 54 : 44 }}
        dpr={dpr}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x030305, 1);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <Suspense fallback={null}>
          <SceneController
            activeServiceIndex={activeServiceIndex}
            activeProductIndex={activeProductIndex}
            activeProjectIndex={activeProjectIndex}
            activeTechIndex={activeTechIndex}
            reducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
