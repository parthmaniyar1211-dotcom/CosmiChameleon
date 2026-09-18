import { Layers } from "lucide-react";

interface ExperienceToggleProps {
  isStandard: boolean;
  onToggle: (standard: boolean) => void;
  className?: string;
}

export const ExperienceToggle: React.FC<ExperienceToggleProps> = ({
  isStandard,
  onToggle,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isStandard)}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
        isStandard
          ? "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40"
          : "bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-neutral-200 hover:border-white/[0.15]"
      } ${className}`}
      title={isStandard ? "Switch to 3D Immersive Experience" : "Switch to Standard Lightweight Experience"}
      aria-label={isStandard ? "Switch to 3D Immersive Experience" : "View Standard Experience"}
    >
      <Layers className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">
        {isStandard ? "Standard Mode" : "3D Mode"}
      </span>
    </button>
  );
};
