import React from "react";
import { Sparkles, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-cosmic-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white to-neutral-500 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-cosmic-950 rounded-[7px] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            </div>
          </div>
          <span className="font-bold text-white text-base tracking-tight">
            CosmiChameleon
          </span>
          <span className="text-xs font-mono text-neutral-400 pl-2 border-l border-white/[0.1]">
            Adaptive Technology Studio
          </span>
        </div>

        {/* Tagline / Copyright */}
        <div className="text-xs font-mono text-neutral-400 text-center">
          &copy; {new Date().getFullYear()} CosmiChameleon. All rights reserved. Technology That Adapts. Ideas That Evolve.
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          aria-label="Scroll to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
