import React from "react";
import { industriesData } from "../../content/industries";
import { GlassPanel } from "../ui/GlassPanel";
import { Building2 } from "lucide-react";

export const Industries: React.FC = () => {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Domain Versatility
          </div>
          <h2
            id="industries-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4"
          >
            Built for Different Kinds of Businesses.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            We adapt our engineering architecture to solve domain-specific commercial and operational challenges.
          </p>
        </div>

        {/* 10 Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industriesData.map((ind) => (
            <GlassPanel
              key={ind.id}
              variant="subtle"
              className="p-5 flex flex-col justify-between group hover:border-white/[0.2] transition-all duration-200"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-colors mb-4">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-base mb-2 group-hover:text-accent-cyan transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {ind.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {ind.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};
