import React, { useEffect } from "react";
import { X, ArrowLeft, Cpu, Layers, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";
import type { ProjectItem } from "../../content/projects";
import { Button } from "./Button";
import { GlassPanel } from "./GlassPanel";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassPanel variant="elevated" className="p-6 sm:p-8 border border-white/[0.15]">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <Button
              variant="secondary"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={onClose}
            >
              Back to Selected Work
            </Button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Title & Category */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.06]">
                {project.year}
              </span>
            </div>

            <h2 id="project-modal-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-accent-cyan mt-1">
              {project.headline}
            </p>
          </div>

          {/* Deep Content Grid */}
          <div className="mt-8 space-y-6 text-sm sm:text-base leading-relaxed text-neutral-300">
            {/* Overview */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-white font-semibold mb-2">
                <Layers className="w-4 h-4 text-accent-cyan" />
                <span>Architecture & Overview</span>
              </div>
              <p className="text-neutral-300">{project.description}</p>
            </div>

            {/* Core Capabilities */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent-violet" />
                <span>Key Technical Capabilities</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center gap-2 text-xs text-neutral-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 mb-3">
                Technologies & Platform Mechanics
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.06] text-neutral-200 border border-white/[0.08]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-accent-cyan" />
              <span>Verified production deployment</span>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="md"
                variant="primary"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                {project.ctaText}
              </Button>
            </a>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
