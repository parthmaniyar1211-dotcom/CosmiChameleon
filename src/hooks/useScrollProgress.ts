import { useEffect, useState, useRef } from "react";

export type SectionId =
  | "hero"
  | "about"
  | "services"
  | "industries"
  | "products"
  | "work"
  | "process"
  | "why-us"
  | "technology"
  | "final-cta"
  | "contact";

export interface ScrollState {
  progress: number;
  scrollY: number;
  activeSection: SectionId;
}

// Global mutable progress object for zero-overhead 60fps reading in R3F useFrame
export const globalScroll = {
  progress: 0,
  targetProgress: 0,
  scrollY: 0,
  activeSection: "hero" as SectionId,
  listeners: new Set<(state: ScrollState) => void>()
};

const SECTION_IDS: SectionId[] = [
  "hero",
  "about",
  "services",
  "industries",
  "products",
  "work",
  "process",
  "why-us",
  "technology",
  "final-cta",
  "contact"
];

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    activeSection: "hero"
  });

  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = docHeight > 0 ? Math.min(Math.max(currentScrollY / docHeight, 0), 1) : 0;

      globalScroll.scrollY = currentScrollY;
      globalScroll.targetProgress = rawProgress;
      globalScroll.progress = rawProgress;

      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          // Identify current section
          let detectedSection: SectionId = "hero";
          const viewportMid = currentScrollY + window.innerHeight * 0.35;

          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (viewportMid >= top && viewportMid < top + height) {
                detectedSection = id;
                break;
              }
            }
          }

          globalScroll.activeSection = detectedSection;

          setScrollState({
            progress: rawProgress,
            scrollY: currentScrollY,
            activeSection: detectedSection
          });

          globalScroll.listeners.forEach((listener) =>
            listener({
              progress: rawProgress,
              scrollY: currentScrollY,
              activeSection: detectedSection
            })
          );

          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return scrollState;
}
