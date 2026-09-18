import React from "react";
import { GlassPanel } from "../ui/GlassPanel";
import { Globe, Code2, Cpu, Zap, Box } from "lucide-react";

export const About: React.FC = () => {
  const capabilities = [
    { label: "WEB", icon: Globe, desc: "Modern digital platforms" },
    { label: "SOFTWARE", icon: Code2, desc: "Bespoke operations tools" },
    { label: "AI", icon: Cpu, desc: "Contextual intelligent pipelines" },
    { label: "AUTOMATION", icon: Zap, desc: "Frictionless event loops" },
    { label: "PRODUCTS", icon: Box, desc: "Proprietary digital engines" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Core Narrative */}
        <div className="lg:col-span-7 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-6">
            About CosmiChameleon
          </div>

          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-8"
          >
            We Build Technology Around Your Business.
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            <p>
              Every business has different goals, customers, workflows, and challenges. That’s why we
              don’t believe in one-size-fits-all technology.
            </p>
            <p>
              CosmiChameleon combines design, development, AI, automation, and strategy to turn ideas
              and business problems into practical digital solutions.
            </p>
          </div>

          {/* Capability Badges */}
          <div className="mt-10 pt-8 border-t border-white/[0.08]">
            <span className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Integrated Capabilities
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <GlassPanel
                    key={cap.label}
                    variant="subtle"
                    className="p-3.5 flex items-center gap-3 group hover:border-white/[0.2] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0 text-accent-cyan group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm text-white tracking-wider">
                        {cap.label}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">
                        {cap.desc}
                      </div>
                    </div>
                  </GlassPanel>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Space reserved for 3D Core with branching nodes */}
        <div className="lg:col-span-5 h-64 lg:h-[500px] pointer-events-none relative flex items-center justify-center">
          {/* Subtle atmospheric gradient anchor */}
          <div className="w-72 h-72 rounded-full bg-accent-cyan/5 blur-3xl" />
        </div>
      </div>
    </section>
  );
};
