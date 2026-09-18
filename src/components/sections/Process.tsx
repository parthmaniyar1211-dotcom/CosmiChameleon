import React from "react";
import { processStages } from "../../content/process";
import { GlassPanel } from "../ui/GlassPanel";
import { CheckCircle2 } from "lucide-react";

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Methodology
          </div>
          <h2
            id="process-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            From Idea to Impact.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            A disciplined, phased engineering pipeline moving from discovery to scalable production deployment.
          </p>
        </div>

        {/* 5 Stages Sequential Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {processStages.map((stage) => (
            <GlassPanel
              key={stage.step}
              variant="elevated"
              className="p-6 flex flex-col justify-between group hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-accent-cyan/80 group-hover:text-accent-cyan transition-colors">
                    {stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-accent-cyan/40 group-hover:bg-accent-cyan transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {stage.title}
                </h3>

                <p className="text-xs font-medium text-neutral-300 mb-3">
                  {stage.summary}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {stage.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  Key Artifacts
                </span>
                <div className="space-y-1">
                  {stage.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-accent-cyan shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};
