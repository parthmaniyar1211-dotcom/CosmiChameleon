import React, { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Mail, Building, User, Phone, Loader2 } from "lucide-react";
import { projectInterests, type ProjectInterest } from "../../content/contact";
import { Button } from "./Button";
import { GlassPanel } from "./GlassPanel";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: ProjectInterest;
  message: string;
  website_hp: string; // Anti-spam honeypot (must stay blank)
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "AI Solutions & Agents",
    message: "",
    website_hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Your name is required.";
    } else if (formData.name.trim().length > 80) {
      nextErrors.name = "Name must be under 80 characters.";
    }

    if (!formData.company.trim()) {
      nextErrors.company = "Company / organization name is required.";
    } else if (formData.company.trim().length > 100) {
      nextErrors.company = "Company name must be under 100 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nextErrors.email = "Work email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please provide an overview of your project or technical problem.";
    } else if (formData.message.trim().length < 15) {
      nextErrors.message = "Please describe in a bit more detail (minimum 15 characters).";
    } else if (formData.message.trim().length > 2500) {
      nextErrors.message = "Message exceeds the maximum limit of 2,500 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    // Honeypot check: If the hidden field is filled, silently discard
    if (formData.website_hp.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Dynamic API base URL configuration:
      // Uses environment variable VITE_API_BASE_URL if set, otherwise relative /api/contact for universal hosting
      const rawBase = import.meta.env.VITE_API_BASE_URL;
      const apiEndpoint = rawBase
        ? `${rawBase.replace(/\/+$/, "")}/api/contact`
        : "/api/contact";

      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interest: formData.interest,
        message: formData.message.trim(),
        website_hp: formData.website_hp,
        source: "CosmiChameleon Website",
        timestamp: new Date().toISOString()
      };

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== false) {
        // Success: Reset form and show confirmation
        setSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          interest: "AI Solutions & Agents",
          message: "",
          website_hp: "",
        });
      } else {
        const errorMsg = result?.error || result?.message || "Unable to send inquiry. Please try again or reach out directly to hello@cosmichameleon.com.";
        setApiError(errorMsg);
      }
    } catch {
      setApiError("Unable to reach the inquiry server. Please verify your network connection or contact hello@cosmichameleon.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <GlassPanel variant="elevated" className="p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Inquiry received. We’ll be in touch.
        </h3>

        <p className="text-neutral-300 leading-relaxed mb-6 font-normal">
          Thank you for reaching out to CosmiChameleon. Our engineering team reviews all incoming technical inquiries within 24 business hours.
        </p>

        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setSubmitted(false);
          }}
        >
          Submit Another Inquiry
        </Button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel variant="elevated" className="p-6 sm:p-10 max-w-3xl mx-auto">
      {apiError && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Submission Error</span>
            <p className="text-xs text-red-300/90">{apiError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam honeypot field - visually hidden */}
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="form-website-hp">Leave this empty</label>
          <input
            id="form-website-hp"
            name="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_hp}
            onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Your Name <span className="text-accent-cyan">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                id="form-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Mercer"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors ${
                  errors.name ? "border-red-500/70" : "border-white/[0.1] hover:border-white/[0.2]"
                }`}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="form-company" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Company / Organization <span className="text-accent-cyan">*</span>
            </label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                id="form-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Technologies"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors ${
                  errors.company ? "border-red-500/70" : "border-white/[0.1] hover:border-white/[0.2]"
                }`}
              />
            </div>
            {errors.company && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email */}
          <div>
            <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Work Email <span className="text-accent-cyan">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                id="form-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@acme.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors ${
                  errors.email ? "border-red-500/70" : "border-white/[0.1] hover:border-white/[0.2]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="form-phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
              Phone / WhatsApp (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                id="form-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950/70 border border-white/[0.1] hover:border-white/[0.2] text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Project / Interest Selection */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2.5">
            Project / Interest <span className="text-accent-cyan">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {projectInterests.map((interest) => {
              const selected = formData.interest === interest;
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => setFormData({ ...formData, interest })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                    selected
                      ? "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/50 shadow-sm shadow-accent-cyan/20"
                      : "bg-white/[0.03] text-neutral-300 border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Message */}
        <div>
          <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
            Message &amp; Project Overview <span className="text-accent-cyan">*</span>
          </label>
          <textarea
            id="form-message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your technical initiative, existing architecture, timeline, and requirements..."
            className={`w-full p-4 rounded-xl bg-cosmic-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors resize-y ${
              errors.message ? "border-red-500/70" : "border-white/[0.1] hover:border-white/[0.2]"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-accent-cyan" />
            <span>Encrypted transmission. No marketing solicitations.</span>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isSubmitting}
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          >
            {isSubmitting ? "Sending Inquiry..." : "Send Inquiry"}
          </Button>
        </div>
      </form>
    </GlassPanel>
  );
};
