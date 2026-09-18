import React from "react";
import { ContactForm } from "../ui/ContactForm";
import { contactInfo } from "../../content/contact";
import { Mail, Clock, MapPin } from "lucide-react";

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-4">
            Get in Touch
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Interested in building something similar?
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto">
            Whether you need a custom software platform, an AI operational system, or a high-performance web experience, reach out to discuss your technical initiatives.
          </p>
        </div>

        {/* Studio Service Guarantees Bar */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300">
            <Clock className="w-4 h-4 text-accent-cyan shrink-0" />
            <span>{contactInfo.responseTime}</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300">
            <Mail className="w-4 h-4 text-accent-violet shrink-0" />
            <a href={`mailto:${contactInfo.directEmail}`} className="hover:text-white transition-colors truncate">
              {contactInfo.directEmail}
            </a>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300">
            <MapPin className="w-4 h-4 text-accent-emerald shrink-0" />
            <span>{contactInfo.location}</span>
          </div>
        </div>

        {/* Validated Inquiry Form */}
        <ContactForm />
      </div>
    </section>
  );
};
