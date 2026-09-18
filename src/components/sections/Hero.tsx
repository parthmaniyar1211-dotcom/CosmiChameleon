import React from "react";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="CosmiChameleon Hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-12 overflow-hidden"
    >
      {/* 1. Hierarchy Level 1: Brand & Studio Identification */}
      <div className="z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-white/[0.03] border border-white/[0.08] text-neutral-300 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="font-semibold text-white">COSMICHAMELEON</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400 hidden sm:inline">ADAPTIVE TECHNOLOGY STUDIO</span>
        </div>
      </div>

      {/* 2 & 3. Hierarchy Levels 2-5: Main Typography, Supporting Copy & CTAs */}
      <div className="max-w-4xl mx-auto my-auto z-10 flex flex-col items-center">
        {/* Subtle text contrast shield for guaranteed legibility over 3D Core */}
        <div className="rounded-3xl p-2 sm:p-4 transition-all">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] mb-6">
            <span>Technology That Adapts.</span>
            <br />
            <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
              Ideas That Evolve.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-8">
            CosmiChameleon builds websites, software, AI systems, automation, and digital products
            designed around the way your business works.
          </p>

          {/* Core Focus Areas in One Clean Subdued Line */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400 mb-8">
            <span>AI</span>
            <span className="text-neutral-600">•</span>
            <span>WEB</span>
            <span className="text-neutral-600">•</span>
            <span>SOFTWARE</span>
            <span className="text-neutral-600">•</span>
            <span>AUTOMATION</span>
            <span className="text-neutral-600">•</span>
            <span>DATA</span>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href="#work" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                className="w-full sm:w-auto"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Explore Selected Work
              </Button>
            </a>

            <a href="#products" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Products
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Explore Indicator */}
      <div className="pt-6 z-10">
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg p-1"
        >
          <span className="tracking-widest uppercase text-[11px]">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-accent-cyan" />
        </a>
      </div>
    </section>
  );
};
