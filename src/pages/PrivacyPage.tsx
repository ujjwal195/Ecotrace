import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { CONFIG } from '../config.ts';

export const PrivacyPage: React.FC = () => {
  usePageMeta(
    'Privacy Policy | EcoTrace Packaging',
    'EcoTrace Privacy Policy and data handling practices for early-access pilot registrations.'
  );

  return (
    <div data-nav-theme="light" className="bg-bg text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-ink mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return home</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-mist border border-hairline flex items-center justify-center text-primary">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-muted">
              Last Updated: October 2026 · {CONFIG.COMPANY_LEGAL_NAME}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-muted leading-relaxed pt-6 border-t border-hairline">
          <p>
            Welcome to <strong>{CONFIG.COMPANY_LEGAL_NAME}</strong> (operating as &quot;{CONFIG.BRAND_NAME}&quot;).
            We are dedicated to safeguarding the personal and commercial information you entrust to us when inquiring about
            our domestic bioplastic resin and collaborative trials.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">1. Information We Collect</h2>
          <p>
            When you complete our early-access or contact form, we collect the details you voluntarily submit: your name,
            work email, organisation, industry sector, specific technical inquiries, and packaging parameters. We do not track or sell your personal data.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To evaluate mutual fit for pilot sample resin testing and compounding trials.</li>
            <li>To communicate developmental milestones, technical datasheets, and certification progress.</li>
            <li>To respond to research collaboration and investment inquiries.</li>
          </ul>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">3. Confidentiality & Non-Disclosure</h2>
          <p>
            Packaging specifications and company details are treated with commercial confidentiality. We do not share inquiries
            with third-party marketing brokers.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">4. Contact & Inquiries</h2>
          <p>
            If you wish to update or erase your contact records from our early-access waitlist, please email us directly at{' '}
            <a href={`mailto:${CONFIG.PRIMARY_EMAIL}`} className="text-primary underline hover:text-primary-hover">
              {CONFIG.PRIMARY_EMAIL}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};
