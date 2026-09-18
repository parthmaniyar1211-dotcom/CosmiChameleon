import React from "react";
import { principlesData } from "../../content/principles";
import { GlassPanel } from "../ui/GlassPanel";
import { Sparkles, Shield, Cpu, Users, TrendingUp, Lightbulb } from "lucide-react";

const PRINCIPLE_ICONS = [
  Sparkles,
  Shield,
  Cpu,
  Users,
  TrendingUp,
  Lightbulb,
];

export const WhyUs: React.FC = () => {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Studio Philosophy
          </div>
          <h2
            id="why-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Why CosmiChameleon.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Six non-negotiable engineering principles guiding every architectural decision we make.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principlesData.map((principle, idx) => {
            const IconComp = PRINCIPLE_ICONS[idx] || Sparkles;
            return (
              <GlassPanel
                key={principle.id}
                variant="elevated"
                className="p-6 sm:p-8 flex flex-col justify-between group hover:border-white/[0.25] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-neutral-400">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                    {principle.title}
                  </h3>

                  <p className="text-xs font-semibold text-accent-cyan/90 font-mono mb-3">
                    {principle.summary}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
};
