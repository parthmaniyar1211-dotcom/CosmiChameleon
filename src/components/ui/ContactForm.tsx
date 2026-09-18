import React, { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Mail, Building, User, Phone, DollarSign } from "lucide-react";
import { projectTypes, budgetRanges, type ProjectType } from "../../content/contact";
import { Button } from "./Button";
import { GlassPanel } from "./GlassPanel";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  budgetRange: string;
  description: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  description?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Website",
    budgetRange: "$15,000 - $35,000",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Your name is required.";
    } else if (formData.name.trim().length > 80) {
      nextErrors.name = "Name must be under 80 characters.";
    }

    if (!formData.company.trim()) {
      nextErrors.company = "Company / organization name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nextErrors.email = "Work email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Please provide a brief description of your project or problem.";
    } else if (formData.description.trim().length < 15) {
      nextErrors.description = "Please describe in a bit more detail (at least 15 characters).";
    } else if (formData.description.trim().length > 2500) {
      nextErrors.description = "Description is too long (maximum 2,500 characters).";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Persist locally so inquiries aren't lost and can be inspected
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem("cosmichameleon_inquiries") || "[]");
      existingSubmissions.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem("cosmichameleon_inquiries", JSON.stringify(existingSubmissions));
    } catch {
      // Storage unavailable or disabled
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <GlassPanel variant="elevated" className="p-8 sm:p-12 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Thanks for reaching out.
        </h3>

        <p className="text-neutral-300 leading-relaxed mb-6 font-medium">
          Your project inquiry has been captured locally. Real email delivery will be connected later.
        </p>

        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400 text-left mb-8 max-w-md mx-auto space-y-1">
          <div><strong className="text-neutral-200">Name:</strong> {formData.name}</div>
          <div><strong className="text-neutral-200">Company:</strong> {formData.company}</div>
          <div><strong className="text-neutral-200">Email:</strong> {formData.email}</div>
          <div><strong className="text-neutral-200">Type:</strong> {formData.projectType}</div>
          <div><strong className="text-neutral-200">Budget:</strong> {formData.budgetRange}</div>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              company: "",
              email: "",
              phone: "",
              projectType: "Website",
              budgetRange: "$15,000 - $35,000",
              description: "",
            });
          }}
        >
          Submit Another Inquiry
        </Button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel variant="elevated" className="p-6 sm:p-10 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
              Company / Entity <span className="text-accent-cyan">*</span>
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

        {/* Project Type Selection */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2.5">
            Project Type <span className="text-accent-cyan">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {projectTypes.map((type) => {
              const selected = formData.projectType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, projectType: type })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                    selected
                      ? "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/50 shadow-sm shadow-accent-cyan/20"
                      : "bg-white/[0.03] text-neutral-300 border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2.5">
            Target Budget Range <span className="text-accent-cyan">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {budgetRanges.map((range) => {
              const selected = formData.budgetRange === range;
              return (
                <button
                  type="button"
                  key={range}
                  onClick={() => setFormData({ ...formData, budgetRange: range })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    selected
                      ? "bg-white text-cosmic-950 font-bold border-white"
                      : "bg-white/[0.04] text-neutral-400 border-white/[0.06] hover:text-neutral-200 hover:border-white/[0.15]"
                  }`}
                >
                  <DollarSign className="w-3 h-3 inline mr-0.5" />
                  {range}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="form-desc" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
            Project Overview & Goals <span className="text-accent-cyan">*</span>
          </label>
          <textarea
            id="form-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about the problem you are solving, your current systems, target timeline, and any specific requirements..."
            className={`w-full p-4 rounded-xl bg-cosmic-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-colors resize-y ${
              errors.description ? "border-red-500/70" : "border-white/[0.1] hover:border-white/[0.2]"
            }`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-accent-cyan" />
            <span>Encrypted transmission. No spam or unsolicited marketing.</span>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isSubmitting}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isSubmitting ? "Capturing..." : "Send Project Inquiry"}
          </Button>
        </div>
      </form>
    </GlassPanel>
  );
};
