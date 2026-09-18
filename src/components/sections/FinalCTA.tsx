import React from "react";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

export const FinalCTA: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Final Call to Action"
      className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden border-t border-white/[0.05]"
    >
      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-6">
          Next Steps
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight mb-6">
          Technology That Adapts.
        </h2>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10">
          Have an engineering challenge or platform vision? Explore our software systems or initiate a technical discussion.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
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

          <a href="#contact" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
