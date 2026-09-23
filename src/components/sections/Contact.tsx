import React from "react";
import { ContactForm } from "../ui/ContactForm";
import { contactInfo } from "../../content/contact";
import { studioSocialPresence } from "../../content/projects";
import { Mail, Clock, MapPin } from "lucide-react";
import { InstagramIcon, LinkedInIcon } from "../ui/SocialIcons";

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
            Contact CosmiChameleon
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Initiate a Technical Discussion
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto">
            Whether you are evaluating a custom software architecture, deploying an AI agent system, or building an enterprise digital product, get in touch with our team.
          </p>
        </div>

        {/* Studio Direct Channels & Guarantees */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
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

        {/* CosmiChameleon Official Social Bar */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4 mb-8 text-xs font-mono">
          <a
            href={studioSocialPresence.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] text-neutral-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.08] transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>{studioSocialPresence.instagram.label}</span>
          </a>

          <a
            href={studioSocialPresence.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] text-neutral-300 hover:text-white hover:bg-white/[0.07] border border-white/[0.08] transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{studioSocialPresence.linkedin.label}</span>
          </a>
        </div>

        {/* Validated Inquiry Form */}
        <ContactForm />
      </div>
    </section>
  );
};

