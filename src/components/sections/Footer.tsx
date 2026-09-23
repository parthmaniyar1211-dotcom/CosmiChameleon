import React from "react";
import { Sparkles, ArrowUp, ExternalLink, Mail } from "lucide-react";
import { studioSocialPresence } from "../../content/projects";
import { InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Technology", href: "#technology" },
    { label: "Contact", href: "#contact" },
  ];

  const productLinks = [
    { label: "ShieldScope", href: "https://shieldscope.netlify.app/" },
    { label: "MailX", href: "https://mailx-mu.vercel.app/" },
    { label: "Voice Agent", href: "https://voice-agent-lac-ten.vercel.app/login" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-cosmic-950/90 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Studio Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-neutral-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-cosmic-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                CosmiChameleon
              </span>
            </div>

            <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase">
              Technology • AI • Software • Automation
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              We build technology, AI systems, software, and digital products engineered for operational resilience and business scale.
            </p>

            <div className="pt-2">
              <a
                href="mailto:hello@cosmichameleon.com"
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white transition-colors py-1"
              >
                <Mail className="w-3.5 h-3.5 text-accent-cyan" />
                <span>hello@cosmichameleon.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {productLinks.map((prod) => (
                <li key={prod.label}>
                  <a
                    href={prod.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-accent-cyan transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{prod.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Social Presence */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-4">
              Studio Social
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li>
                <a
                  href={studioSocialPresence.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-pink-400 transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href={studioSocialPresence.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-accent-cyan transition-colors flex items-center gap-2"
                >
                  <LinkedInIcon className="w-4 h-4 text-accent-cyan shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} CosmiChameleon. All rights reserved. Technology That Adapts. Ideas That Evolve.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
