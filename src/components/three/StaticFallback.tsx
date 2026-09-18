import React from "react";

export const StaticFallback: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center bg-cosmic-950"
    >
      {/* Restrained Atmospheric Background Vignette */}
      <div className="absolute w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-accent-cyan/[0.04] via-accent-violet/[0.03] to-transparent blur-3xl opacity-50" />

      {/* Architectural Geometric Monolith Projection (Matches Refined Core) */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center opacity-60 transition-opacity">
        {/* Alignment Gauge Ring */}
        <div className="absolute inset-8 rounded-full border border-white/[0.06] rotate-45 scale-95" />

        {/* Precision Faceted Polyhedron SVG Blueprint */}
        <svg
          viewBox="0 0 240 240"
          className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quadrant Plate 1 (Top Left) */}
          <polygon
            points="120,40 180,80 120,110 60,70"
            fill="#121622"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />

          {/* Quadrant Plate 2 (Top Right) */}
          <polygon
            points="180,80 200,150 140,170 120,110"
            fill="#0f131d"
            stroke="#818cf8"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Quadrant Plate 3 (Bottom) */}
          <polygon
            points="120,110 140,170 120,200 80,160"
            fill="#161b29"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Quadrant Plate 4 (Left) */}
          <polygon
            points="60,70 120,110 80,160 40,120"
            fill="#0a0d14"
            stroke="#818cf8"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Inner Central Computational Obsidian Matrix */}
          <polygon
            points="120,95 140,115 120,135 100,115"
            fill="#04060a"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.9"
          />
          <circle cx="120" cy="115" r="4" fill="#38bdf8" fillOpacity="0.85" />

          {/* Precision Alignment Markings */}
          <circle cx="120" cy="40" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
          <circle cx="200" cy="150" r="2.5" fill="#818cf8" fillOpacity="0.7" />
          <circle cx="120" cy="200" r="2.5" fill="#38bdf8" fillOpacity="0.7" />
          <circle cx="40" cy="120" r="2.5" fill="#818cf8" fillOpacity="0.7" />
        </svg>
      </div>
    </div>
  );
};
