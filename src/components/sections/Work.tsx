import React from "react";
import {
  selectedWorkData,
  managedSocialAccounts,
  type ProjectItem
} from "../../content/projects";
import { GlassPanel } from "../ui/GlassPanel";
import { ExternalLink, Cpu, ShieldCheck, Share2 } from "lucide-react";
import { InstagramIcon } from "../ui/SocialIcons";

interface WorkProps {
  onSelectProject: (project: ProjectItem) => void;
  onHoverProject: (index: number | null) => void;
}

export const Work: React.FC<WorkProps> = ({
  onSelectProject,
  onHoverProject,
}) => {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10 space-y-20">
        {/* ================= PART 1: SELECTED WORK ================= */}
        <div>
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
              Real-world software platforms, digital products, and operational systems built for performance and scale.
            </p>
          </div>

          {/* Selected Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {selectedWorkData.map((project, idx) => (
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

                  {/* Description */}
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-accent-cyan transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
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

        {/* ================= PART 2: SOCIAL & DIGITAL WORK ================= */}
        <div id="social-work" className="pt-8 border-t border-white/[0.08]">
          {/* Sub-Section Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-violet/10 text-accent-violet border border-accent-violet/20 mb-4">
              <Share2 className="w-3.5 h-3.5" />
              Social &amp; Digital Work
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-3">
              Managed Client Accounts
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Client social accounts managed by CosmiChameleon. We direct social strategy, brand storytelling, visual curation, and digital engagement.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-accent-violet shrink-0" />
              <span>Accounts listed below are client brands managed by CosmiChameleon, not owned properties.</span>
            </div>
          </div>

          {/* Client Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {managedSocialAccounts.map((account) => (
              <GlassPanel
                key={account.id}
                variant="elevated"
                className="p-6 sm:p-8 group hover:border-accent-violet/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                      {account.service}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {account.accountType}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-accent-violet transition-colors">
                      {account.clientName}
                    </h4>
                    <div className="text-xs font-mono text-neutral-400 mt-1">
                      Service: {account.service}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                    {account.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <a
                    href={account.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] text-white hover:bg-accent-violet hover:text-white transition-colors border border-white/[0.12] hover:border-accent-violet/50 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>{account.ctaText}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <span className="text-xs font-mono text-neutral-500">
                    Official Client Profile
                  </span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
