import React from "react";
import { productsData } from "../../content/products";
import { GlassPanel } from "../ui/GlassPanel";
import { Button } from "../ui/Button";
import { ExternalLink, CheckCircle2, Shield, Mail, Mic, Lock } from "lucide-react";

interface ProductsProps {
  activeProductIndex: number;
  onSelectProduct: (index: number) => void;
}

export const Products: React.FC<ProductsProps> = ({
  activeProductIndex,
  onSelectProduct,
}) => {
  const currentProduct = productsData[activeProductIndex] || productsData[0];

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            CosmiChameleon Product Lab
          </div>
          <h2
            id="products-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            <span>We Don’t Just Build For Clients.</span>
            <br />
            <span className="bg-gradient-to-r from-accent-cyan via-white to-accent-violet bg-clip-text text-transparent">
              We Build Technology.
            </span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            We build digital products, software systems, AI experiences, and automation platforms designed around real problems.
          </p>
        </div>

        {/* Product Lab Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Switcher Cards */}
          <div className="lg:col-span-4 space-y-3">
            {productsData.map((prod, idx) => {
              const isSelected = idx === activeProductIndex;
              return (
                <button
                  key={prod.id}
                  onClick={() => onSelectProduct(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                    isSelected
                      ? "bg-white/[0.09] border-accent-cyan/50 shadow-xl shadow-accent-cyan/10"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent-cyan font-semibold">
                      {prod.badge}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-accent-cyan shadow-[0_0_8px_#38bdf8]" : "bg-transparent"
                    }`} />
                  </div>
                  <div className="text-lg font-bold text-white mb-1">
                    {prod.title}
                  </div>
                  <div className="text-xs text-neutral-400 line-clamp-2">
                    {prod.headline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Software Console Preview */}
          <div className="lg:col-span-8">
            <GlassPanel variant="elevated" className="p-6 sm:p-8 lg:p-10 border border-white/[0.12]">
              {/* Product Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
                    {currentProduct.badge}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {currentProduct.title}
                  </h3>
                </div>

                {currentProduct.tags && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {currentProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-neutral-300 border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Description */}
              <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
                {currentProduct.description}
              </p>

              {/* SPECIFIC PRODUCT SOFTWARE INTERACTION SIMULATIONS */}
              {activeProductIndex === 0 && (
                /* PRODUCT 1: SHIELDSCOPE SECURITY CONSOLE */
                <div className="mt-8 p-5 rounded-xl bg-cosmic-950/80 border border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-accent-cyan" />
                      ShieldScope Perimeter Telemetry
                    </span>
                    <span className="text-accent-cyan font-semibold font-mono">Status: Surface Monitored & Enforced</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">SSL/TLS Grade</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> A+ Enforced
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">CVE Threats</div>
                      <div className="text-sm font-bold text-accent-cyan mt-1">0 Detected</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Endpoints</div>
                      <div className="text-sm font-bold text-white mt-1">24 Tracked</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Alerting</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1">Real-Time</div>
                    </div>
                  </div>
                </div>
              )}

              {activeProductIndex === 1 && (
                /* PRODUCT 2: MAILX DISPATCH PIPELINE */
                <div className="mt-8 p-5 rounded-xl bg-cosmic-950/80 border border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-accent-emerald" />
                      MailX High-Throughput Dispatch
                    </span>
                    <span className="text-emerald-400 font-semibold font-mono">Status: Queue Pipeline Active</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Event Ingest", "Dynamic Render", "DKIM/SPF Sign", "Deliverability Guard", "Inbox Reached"].map((step, idx) => (
                      <div key={step} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                        <div className="text-[10px] font-mono text-accent-cyan font-bold mb-1">0{idx + 1}</div>
                        <div className="text-xs font-medium text-white">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeProductIndex === 2 && (
                /* PRODUCT 3: VOICE AGENT ACOUSTIC CONSOLE */
                <div className="mt-8 p-5 rounded-xl bg-cosmic-950/80 border border-white/[0.08]">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-accent-violet" />
                      Voice Agent Acoustic Telemetry
                    </span>
                    <span className="text-accent-violet font-semibold font-mono">Status: WebRTC Stream Connected</span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Streaming ASR</div>
                        <div className="text-xs font-bold text-accent-cyan mt-0.5">&lt;120ms Latency</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Turn Taking</div>
                        <div className="text-xs font-bold text-emerald-400 mt-0.5">Graceful Interrupt</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Tool Calling</div>
                        <div className="text-xs font-bold text-white mt-0.5">Autonomous CRM</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">Audio Synthesis</div>
                        <div className="text-xs font-bold text-accent-violet mt-0.5">Neural Stream</div>
                      </div>
                    </div>

                    {/* Acoustic Frequency Waveform */}
                    <div className="h-6 bg-white/[0.03] border border-white/[0.05] rounded-lg flex items-center px-3 gap-1 overflow-hidden">
                      {[6, 12, 18, 22, 14, 8, 16, 24, 18, 12, 6, 10, 20, 24, 16, 10, 8, 14, 20, 12, 18, 14, 8, 6].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-accent-violet/70 rounded-full shrink-0"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Engineering Highlights */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-4">
                  Engineering Highlights &amp; Mechanics
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProduct.features.map((feat) => (
                    <div
                      key={feat.label}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <div className="flex items-center gap-2 font-semibold text-sm text-white mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                        <span>{feat.label}</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {feat.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product CTA */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-400">
                  Live operational deployment
                </span>
                <a
                  href={currentProduct.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="md"
                    variant="primary"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    {currentProduct.ctaText}
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
