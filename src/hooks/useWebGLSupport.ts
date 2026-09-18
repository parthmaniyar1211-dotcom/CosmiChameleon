import { useEffect, useState } from "react";

export interface WebGLStatus {
  isSupported: boolean;
  isChecked: boolean;
  isMobile: boolean;
  dpr: number;
}

export function useWebGLSupport(): WebGLStatus {
  const [status, setStatus] = useState<WebGLStatus>({
    isSupported: true,
    isChecked: false,
    isMobile: false,
    dpr: 1
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const targetDpr = Math.min(window.devicePixelRatio || 1, isMobileDevice ? 1.25 : 1.75);

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const supported = Boolean(gl && gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext));

      setStatus({
        isSupported: supported,
        isChecked: true,
        isMobile: isMobileDevice,
        dpr: targetDpr
      });
    } catch {
      setStatus({
        isSupported: false,
        isChecked: true,
        isMobile: isMobileDevice,
        dpr: 1
      });
    }
  }, []);

  return status;
}
