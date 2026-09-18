import { useEffect, useRef } from "react";

export const globalMouse = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

export function useMouseParallax() {
  const isTouchRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleTouch = () => {
      isTouchRef.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      globalMouse.targetX = x;
      globalMouse.targetY = y;
    };

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return globalMouse;
}
