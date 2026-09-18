import React, { useState, useMemo } from "react";
import { projectsData, type ProjectItem } from "../../content/projects";
import { GlassPanel } from "../ui/GlassPanel";
import { ExternalLink, Filter, Cpu } from "lucide-react";

interface WorkProps {
  onSelectProject: (project: ProjectItem) => void;
  onHoverProject: (index: number | null) => void;
}

export const Work: React.FC<WorkProps> = ({
  onSelectProject,
  onHoverProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Security / SaaS / Web Platform",
    "Automation / Software Platform",
    "AI / Voice / Software",
    "Logistics / Web Platform"
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            CosmiChameleon Portfolio
          </div>
          <h2
            id="work-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Selected Work
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            A selection of digital products, software platforms, and technology experiences we&apos;ve built.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? "bg-white text-cosmic-950 font-bold border-white"
                  : "bg-white/[0.03] text-neutral-400 border-white/[0.06] hover:text-white hover:border-white/[0.15]"
              }`}
            >
              {cat === "All" ? "All Systems" : cat.split(" / ")[0]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <GlassPanel
              key={project.id}
              variant="elevated"
              className="p-6 sm:p-8 group hover:border-accent-cyan/40 transition-all duration-300 flex flex-col justify-between"
              onMouseEnter={() => onHoverProject(idx)}
              onMouseLeave={() => onHoverProject(null)}
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {project.year}
                  </span>
                </div>

                {/* Title & Headline */}
                <div className="mb-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-neutral-400 mt-1">
                    {project.headline}
                  </div>
                </div>

                {/* Concise Description */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technology.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-neutral-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  {/* Primary Direct Link */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-cosmic-950 hover:bg-accent-cyan hover:text-cosmic-950 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                  >
                    <span>{project.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Secondary Modal Trigger */}
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-accent-cyan transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/[0.04]"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};
