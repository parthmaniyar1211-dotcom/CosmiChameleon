import React from "react";
import { techEcosystem } from "../../content/technology";
import { GlassPanel } from "../ui/GlassPanel";
import { Check, Sparkles } from "lucide-react";

interface TechnologyProps {
  activeTechIndex: number;
  onSelectTech: (index: number) => void;
}

export const Technology: React.FC<TechnologyProps> = ({
  activeTechIndex,
  onSelectTech,
}) => {
  return (
    <section
      id="technology"
      aria-labelledby="tech-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Ecosystem Topology
          </div>
          <h2
            id="tech-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Connected Technology Architecture.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            We focus on what we build—interconnected systems linking frontends, custom backends, AI agents, automated pipelines, and resilient cloud backbones.
          </p>
        </div>

        {/* Central Core Statement Card */}
        <div className="mb-8">
          <GlassPanel variant="active" className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-accent-cyan/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {techEcosystem.centralCore.name}
                </h3>
                <p className="text-sm text-accent-cyan font-mono">
                  {techEcosystem.centralCore.tagline}
                </p>
                <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                  {techEcosystem.centralCore.description}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-white bg-white/10 border border-white/20 shrink-0">
              Central Nexus
            </span>
          </GlassPanel>
        </div>

        {/* 5 Constellation Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {techEcosystem.nodes.map((node, idx) => {
            const isSelected = idx === activeTechIndex;
            return (
              <GlassPanel
                key={node.id}
                variant={isSelected ? "active" : "subtle"}
                className={`p-5 cursor-pointer group transition-all duration-300 flex flex-col justify-between ${
                  isSelected ? "border-accent-cyan/60 scale-[1.02]" : "hover:border-white/[0.2]"
                }`}
                onClick={() => onSelectTech(idx)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-accent-cyan">
                      NODE 0{idx + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? "bg-accent-cyan shadow-[0_0_8px_#38bdf8]" : "bg-transparent"
                    }`} />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                    {node.name}
                  </h4>

                  <p className="text-xs font-mono text-neutral-400 mb-3">
                    {node.role}
                  </p>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {node.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                  {node.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                      <Check className="w-3 h-3 text-accent-cyan shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
};
