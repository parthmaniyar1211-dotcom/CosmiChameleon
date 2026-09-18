import React from "react";
import { servicesData } from "../../content/services";
import { GlassPanel } from "../ui/GlassPanel";
import { Button } from "../ui/Button";
import { Check, ArrowRight, Globe, Code2, Cpu, Zap, ShoppingCart, Layout, Layers, UserCheck, type LucideIcon } from "lucide-react";

interface ServicesProps {
  activeIndex: number;
  onSelectService: (index: number) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Globe,
  Code2,
  Cpu,
  Zap,
  ShoppingCart,
  Layout,
  Layers,
};

export const Services: React.FC<ServicesProps> = ({
  activeIndex,
  onSelectService,
}) => {
  const currentService = servicesData[activeIndex] || servicesData[0];
  const CurrentIcon = ICON_MAP[currentService.icon] || Globe;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Services &amp; Capabilities
          </div>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4"
          >
            Capabilities Engineered for Purpose.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Select a service to inspect architectural scope, who it is designed for, and key deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Selector Tabs */}
          <div className="lg:col-span-5 space-y-2">
            {servicesData.map((service, idx) => {
              const isSelected = idx === activeIndex;
              const IconComp = ICON_MAP[service.icon] || Globe;

              return (
                <button
                  key={service.id}
                  onClick={() => onSelectService(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 flex items-center justify-between group border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                    isSelected
                      ? "bg-white/[0.08] border-accent-cyan/40 shadow-lg shadow-accent-cyan/5"
                      : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs text-neutral-400 group-hover:text-accent-cyan transition-colors">
                      {service.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-sm sm:text-base font-semibold transition-colors ${
                        isSelected ? "text-white" : "text-neutral-300 group-hover:text-white"
                      }`}>
                        {service.title}
                      </div>
                      <div className="text-xs text-neutral-400 hidden sm:block truncate max-w-xs">
                        {service.tagline}
                      </div>
                    </div>
                  </div>

                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? "bg-accent-cyan shadow-[0_0_8px_#38bdf8]" : "bg-transparent group-hover:bg-white/20"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Glass Information Panel */}
          <div className="lg:col-span-7">
            <GlassPanel variant="elevated" className="p-6 sm:p-8 lg:p-10 border border-white/[0.12]">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                      Service {currentService.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {currentService.title}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20">
                  Active Focus
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                {currentService.description}
              </p>

              {/* Who Is It For Highlight */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-0.5">
                    Who This Is For
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-200">
                    {currentService.whoIsItFor}
                  </div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-3.5">
                  Core Capabilities &amp; Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentService.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <Check className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-200">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-neutral-400 font-mono">
                  Tailored architectural scoping available
                </span>
                <a href="#contact">
                  <Button
                    size="md"
                    variant="primary"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Discuss This Service
                  </Button>
                </a>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
};
