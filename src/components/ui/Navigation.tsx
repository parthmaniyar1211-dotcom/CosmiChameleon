import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { ExperienceToggle } from "./ExperienceToggle";
import type { SectionId } from "../../hooks/useScrollProgress";

interface NavigationProps {
  activeSection: SectionId;
  isStandardExperience: boolean;
  onToggleStandardExperience: (standard: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  id: SectionId;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Technology", href: "#technology", id: "technology" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isStandardExperience,
  onToggleStandardExperience,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2.5 sm:py-3" : "py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl glass-nav transition-all duration-300 border border-white/[0.08] shadow-xl shadow-black/40"
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg px-1 py-0.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-neutral-500 p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-cosmic-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent-cyan transition-transform group-hover:rotate-12" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white text-base group-hover:text-accent-cyan transition-colors">
                  CosmiChameleon
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono hidden sm:inline-block">
                  Adaptive Systems
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full" />
                    )}
                  </a>
                );
              })}
              <div className="h-4 w-[1px] bg-white/[0.1] mx-1" />
              <ExperienceToggle
                isStandard={isStandardExperience}
                onToggle={onToggleStandardExperience}
              />
            </div>

            {/* Mobile Actions: Experience Toggle & Hamburger */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <ExperienceToggle
                isStandard={isStandardExperience}
                onToggle={onToggleStandardExperience}
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 md:hidden bg-cosmic-950/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 animate-fade-in"
        >
          <div className="flex flex-col space-y-3 my-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-2xl font-semibold transition-colors py-2 flex items-center justify-between border-b border-white/[0.05] ${
                    isActive ? "text-accent-cyan" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-50" />
                </a>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center justify-between py-2 text-xs font-mono text-neutral-400">
              <span>Display Preference:</span>
              <ExperienceToggle
                isStandard={isStandardExperience}
                onToggle={onToggleStandardExperience}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
