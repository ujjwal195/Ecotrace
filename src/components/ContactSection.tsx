import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Linkedin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { CONFIG, TargetAudienceRole } from '../config.ts';

interface ContactSectionProps {
  initialRole?: TargetAudienceRole | '';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialRole = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    role: (initialRole as TargetAudienceRole) || 'Brand',
    email: '',
    inquiryDetails: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedViaApi, setSubmittedViaApi] = useState(false);
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (initialRole) {
      setFormData((prev) => ({ ...prev, role: initialRole as TargetAudienceRole }));
    }
  }, [initialRole]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.organisation.trim()) newErrors.organisation = 'Please provide your company or institution name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address.';
    }
    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to receive updates regarding biopolymer sample trials.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const constructMailtoUrl = () => {
    const subject = encodeURIComponent(`[Early Access Inquiry] ${formData.organisation} - ${formData.name} (${formData.role})`);
    const body = encodeURIComponent(
      `Hello EcoTrace Team,\n\nI would like to register for early-access development updates and sample batches.\n\nName: ${formData.name}\nOrganisation: ${formData.organisation}\nRole: ${formData.role}\nEmail: ${formData.email}\n\nWhat would you like to know:\n${formData.inquiryDetails || 'None specified.'}\n\nProject / Packaging Scope:\n${formData.message || 'No additional notes provided.'}\n\nBest regards,\n${formData.name}`
    );
    return `mailto:${CONFIG.PRIMARY_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    if (!CONFIG.FORM_ENDPOINT || CONFIG.FORM_ENDPOINT.trim() === '') {
      setTimeout(() => {
        setIsSubmitting(false);
        setShowMailtoFallback(true);
      }, 400);
      return;
    }

    try {
      const response = await fetch(CONFIG.FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'ecotrace_website_early_access',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmittedViaApi(true);
        setShowMailtoFallback(false);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      setShowMailtoFallback(true);
      setApiError('Unable to transmit directly to the endpoint. Please submit using your email client below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-nav-theme="light"
      className="py-24 bg-bg text-ink relative scroll-mt-16 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
                09. Early Access & Inquiries
              </p>
              <h2
                id="contact-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
              >
                Join our pilot sample cohort.
              </h2>
              <p className="text-base text-muted leading-relaxed mb-8">
                We are actively discussing pilot testing protocols with packaging converters, sustainable consumer brands,
                and research institutions. Register your interest for priority sample distribution.
              </p>

              {/* Direct Company Details */}
              <div className="space-y-4 pt-6 border-t border-hairline">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mist flex items-center justify-center text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-muted uppercase block">
                      Direct Inquiries
                    </span>
                    <a
                      href={`mailto:${CONFIG.PRIMARY_EMAIL}`}
                      className="text-sm text-ink hover:text-primary transition-colors font-medium underline decoration-dotted"
                    >
                      {CONFIG.PRIMARY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mist flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-muted uppercase block">
                      Registered Location
                    </span>
                    <span className="text-sm text-ink">{CONFIG.LOCATION}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mist flex items-center justify-center text-primary">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-muted uppercase block">
                      Company Network
                    </span>
                    <span className="text-xs text-muted font-mono">
                      {CONFIG.LINKEDIN_URL}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline text-xs text-muted">
              <p>
                EcoTrace Packaging Private Limited respects confidential formulation data. Non-Disclosure Agreements (NDAs) can be executed for formal pilot testing.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-hairline rounded-2xl p-6 pb-[160px] sm:p-8 sm:pb-8 shadow-2xs">
              {submittedViaApi ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-mist text-primary flex items-center justify-center mx-auto mb-4 border border-hairline">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ink mb-2">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto leading-relaxed mb-6">
                    Thank you, {formData.name}. Your details have been delivered to our founder team. We will review your application for our upcoming pilot batch cohort.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedViaApi(false);
                      setShowMailtoFallback(false);
                      setFormData({
                        name: '',
                        organisation: '',
                        role: 'Brand',
                        email: '',
                        inquiryDetails: '',
                        message: '',
                        consent: false,
                      });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {apiError && (
                    <div className="p-3.5 rounded-lg bg-mist border border-hairline flex items-start gap-2.5 text-xs text-ink">
                      <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-ink mb-1.5">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-card border ${
                          errors.name ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="Dr. / Ms. / Mr. Full Name"
                      />
                      {errors.name && <p className="text-[11px] text-error mt-1 font-mono">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="organisation" className="block text-xs font-medium text-ink mb-1.5">
                        Company / Institution <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="organisation"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-card border ${
                          errors.organisation ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="Organisation Name"
                      />
                      {errors.organisation && <p className="text-[11px] text-error mt-1 font-mono">{errors.organisation}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="role" className="block text-xs font-medium text-ink mb-1.5">
                        Your Sector / Role <span className="text-primary">*</span>
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as TargetAudienceRole })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-card border border-hairline text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="Brand">Brand (FMCG / Retail Packaging)</option>
                        <option value="Packaging Converter">Packaging Converter (Extrusion / Molding)</option>
                        <option value="Investor / Incubator">Investor / Incubator</option>
                        <option value="Researcher / Academic">Researcher / Academic Lab</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-ink mb-1.5">
                        Work Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-card border ${
                          errors.email ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="name@company.com"
                      />
                      {errors.email && <p className="text-[11px] text-error mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Optional field: What would you like to know? */}
                  <div>
                    <label htmlFor="inquiryDetails" className="block text-xs font-medium text-ink mb-1">
                      What would you like to know? <span className="text-muted font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="inquiryDetails"
                      value={formData.inquiryDetails}
                      onChange={(e) => setFormData({ ...formData, inquiryDetails: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-card border border-hairline text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="e.g. feedstock source, testing timeline, partner discussions, technical details under NDA"
                    />
                    <p className="text-[11px] text-muted mt-1">
                      e.g. feedstock source, testing timeline, partner discussions, technical details under NDA
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-ink mb-1.5">
                      Intended Application / Packaging Requirements
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-card border border-hairline text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Share details on your target packaging application (e.g. film blowing, injection molded closures, barrier requirements)..."
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-hairline text-primary focus:ring-primary bg-card"
                    />
                    <label htmlFor="consent" className="text-xs text-muted leading-normal">
                      I agree to be contacted by EcoTrace regarding domestic biopolymer pilot batches, material updates, and trial characterization.
                    </label>
                  </div>
                  {errors.consent && <p className="text-[11px] text-error -mt-2 font-mono">{errors.consent}</p>}

                  {/* Mailto fallback notice */}
                  {showMailtoFallback && (
                    <div className="p-4 rounded-xl bg-mist border border-hairline text-xs text-ink space-y-3">
                      <div className="flex items-center gap-2 font-medium text-primary">
                        <AlertCircle className="w-4 h-4" />
                        <span>Ready to send via direct mail</span>
                      </div>
                      <p className="text-[11px] text-muted leading-relaxed">
                        No external API endpoint is currently configured in <code className="font-mono text-ink">src/config.ts</code>.
                        Click the button below to send your pre-filled inquiry directly to our founder via your email client.
                      </p>
                      <a
                        href={constructMailtoUrl()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded text-xs transition-colors shadow-xs"
                      >
                        <span>Open Pre-Filled Email ({CONFIG.PRIMARY_EMAIL})</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {!showMailtoFallback && (
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition-all rounded shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-bg"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Register Early Access</span>
                            <Send className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
