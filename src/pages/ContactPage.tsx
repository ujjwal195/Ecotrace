import React, { useState } from 'react';
import { ChevronDown, Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { CONFIG, TargetAudienceRole } from '../config.ts';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const ContactPage: React.FC = () => {
  usePageMeta(
    'Contact & FAQ | Early-Access Requests & Inquiries',
    'Submit an early-access request for EcoTrace bio-based polymer sample batches and find clear answers to common development questions.'
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Is it available now?',
      answer: "Not yet. We're in development; join the early-access list.",
    },
    {
      id: 'faq-2',
      question: 'What is it made from?',
      answer: 'Sugarcane bagasse (agricultural waste left after sugar extraction).',
    },
    {
      id: 'faq-3',
      question: 'How is it compostable?',
      answer: 'It is designed to break down naturally in standard industrial or home composting environments without leaving persistent microplastics (testing and certification in progress).',
    },
    {
      id: 'faq-4',
      question: 'How will you sell it?',
      answer: 'In pellet form to converters and packaging manufacturers.',
    },
    {
      id: 'faq-5',
      question: 'Can it replace conventional plastic today?',
      answer: 'We are developing formulations to match the processing characteristics of common packaging plastics; testing is ongoing.',
    },
    {
      id: 'faq-6',
      question: 'Are you certified?',
      answer: 'Certifications (e.g. ISO 17088 / IS 17088, TUV OK Compost) are part of our development roadmap and will be pursued as formulations finalize.',
    },
    {
      id: 'faq-7',
      question: 'How can I get technical details?',
      answer: 'Contact us; we share data sheets and development updates under mutual NDA with qualified partners.',
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    role: 'Brand' as TargetAudienceRole,
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.organisation.trim()) newErrors.organisation = 'Please provide your organisation name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your work email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address.';
    }
    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to receive updates regarding biopolymer pilot batches.';
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

    if (CONFIG.FORM_ENDPOINT && CONFIG.FORM_ENDPOINT.trim() !== '') {
      setIsSubmitting(true);
      try {
        const response = await fetch(CONFIG.FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmittedViaApi(true);
        } else {
          setApiError('Unable to transmit inquiry. Please use direct email fallback.');
          setShowMailtoFallback(true);
        }
      } catch (err) {
        setApiError('Network connection issue. Please use direct email fallback.');
        setShowMailtoFallback(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setShowMailtoFallback(true);
    }
  };

  return (
    <div data-nav-theme="light" className="bg-bg text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            06 · Clarifications & Collaboration
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            Frequently asked questions & inquiries.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Find clear answers to common questions about our biopolymer development, or submit an inquiry
            to register your organisation for upcoming sample compounding batches.
          </p>
        </div>

        {/* 1. FAQ Accordion */}
        <div className="mb-24">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal">
              Direct, transparent answers.
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-card border border-hairline rounded-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal text-ink">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-muted leading-relaxed border-t border-hairline">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Contact & Early-Access Form Section */}
        <div id="inquiry-form" className="scroll-mt-24">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2">
              Registration
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-2">
              Register for pilot batches.
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              We discuss technical testing protocols with packaging converters, brand sustainability teams, and research groups.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-card p-8 pb-[160px] sm:p-10 sm:pb-10 border border-hairline rounded-sm">
              {submittedViaApi ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-mist border border-hairline flex items-center justify-center mx-auto mb-4 text-primary">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ink mb-2">
                    Inquiry Submitted
                  </h3>
                  <p className="text-sm text-muted max-w-md mx-auto leading-relaxed mb-6">
                    Thank you, {formData.name}. Your details have been delivered to our team. We will review your application for our upcoming pilot cohort.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedViaApi(false);
                      setShowMailtoFallback(false);
                    }}
                    className="text-xs font-mono uppercase tracking-wider text-primary hover:underline"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {apiError && (
                    <div className="p-3 bg-mist border border-hairline rounded-xs text-xs text-ink flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xs bg-card border ${
                          errors.name ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="e.g. Priya Sharma"
                      />
                      {errors.name && <p className="text-[11px] text-error mt-1 font-mono">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="organisation" className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                        Organisation <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="organisation"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xs bg-card border ${
                          errors.organisation ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="Company or institution"
                      />
                      {errors.organisation && <p className="text-[11px] text-error mt-1 font-mono">{errors.organisation}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="role" className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                        Sector / Role <span className="text-primary">*</span>
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as TargetAudienceRole })}
                        className="w-full px-3.5 py-2.5 rounded-xs bg-card border border-hairline text-ink text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="Brand">Brand (FMCG / Retail Packaging)</option>
                        <option value="Packaging Converter">Packaging Converter (Extrusion / Molding)</option>
                        <option value="Investor / Incubator">Investor / Incubator</option>
                        <option value="Researcher / Academic">Researcher / Academic Lab</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                        Work Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xs bg-card border ${
                          errors.email ? 'border-error text-error' : 'border-hairline'
                        } text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`}
                        placeholder="name@company.com"
                      />
                      {errors.email && <p className="text-[11px] text-error mt-1 font-mono">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Optional field: What would you like to know? */}
                  <div>
                    <label htmlFor="inquiryDetails" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1">
                      What would you like to know? <span className="text-muted lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="inquiryDetails"
                      value={formData.inquiryDetails}
                      onChange={(e) => setFormData({ ...formData, inquiryDetails: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xs bg-card border border-hairline text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="e.g. feedstock source, testing timeline, partner discussions, technical details under NDA"
                    />
                    <p className="text-[11px] font-mono text-muted mt-1.5">
                      e.g. feedstock source, testing timeline, partner discussions, technical details under NDA
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                      Target Application / Notes
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xs bg-card border border-hairline text-ink placeholder-muted/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Briefly describe your intended packaging application (e.g. blown film, thermoformed trays, injection caps)..."
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded-xs border-hairline text-primary focus:ring-primary accent-primary"
                    />
                    <label htmlFor="consent" className="text-xs text-muted leading-relaxed">
                      I agree to be contacted by EcoTrace regarding domestic biopolymer pilot batches, material updates, and trial characterization.
                    </label>
                  </div>
                  {errors.consent && <p className="text-[11px] text-error font-mono -mt-2">{errors.consent}</p>}

                  {showMailtoFallback && (
                    <div className="p-4 bg-surface border border-hairline rounded-xs text-xs space-y-3">
                      <div className="font-mono text-ink font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-primary" />
                        <span>Ready to transmit via direct mail</span>
                      </div>
                      <p className="text-muted leading-relaxed">
                        Click the button below to send your pre-filled inquiry directly to our founder via your desktop or mobile email application.
                      </p>
                      <a
                        href={constructMailtoUrl()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        <span>Open pre-filled email ({CONFIG.PRIMARY_EMAIL})</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </a>
                    </div>
                  )}

                  {!showMailtoFallback && (
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-hover disabled:opacity-50 transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        {isSubmitting ? (
                          <span>Transmitting...</span>
                        ) : (
                          <>
                            <span>Register interest</span>
                            <Send className="w-3.5 h-3.5 text-white" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Direct Details Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface p-8 border border-hairline rounded-sm">
                <h3 className="font-serif text-xl font-normal text-ink mb-4">
                  Direct Inquiries
                </h3>
                <div className="space-y-4 text-xs text-muted">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase tracking-wider text-[11px] block text-ink">Email</span>
                      <a href={`mailto:${CONFIG.PRIMARY_EMAIL}`} className="text-primary hover:underline decoration-dotted">
                        {CONFIG.PRIMARY_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono uppercase tracking-wider text-[11px] block text-ink">Registered Office</span>
                      <span className="text-ink">{CONFIG.LOCATION}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline text-[11px] font-mono text-muted leading-relaxed">
                  EcoTrace Packaging Private Limited handles confidential proprietary formulation data under Non-Disclosure Agreements (NDAs).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
