import React from 'react';
import { X, Shield } from 'lucide-react';
import { CONFIG } from '../config.ts';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="bg-card text-ink border border-hairline rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close Privacy Policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 id="privacy-title" className="font-serif text-2xl font-normal text-ink">
              Privacy Policy
            </h2>
            <p className="text-xs text-muted font-mono">
              Last Updated: October 2026 · {CONFIG.COMPANY_LEGAL_NAME}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
          <p>
            Welcome to <strong>{CONFIG.COMPANY_LEGAL_NAME}</strong> (operating as &quot;{CONFIG.BRAND_NAME}&quot;).
            We are dedicated to safeguarding the personal and commercial information you entrust to us when inquiring about
            our domestic bioplastic resin and collaborative trials.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">1. Information We Collect</h3>
          <p>
            When you complete our early-access or contact form, we collect the details you voluntarily submit: your name,
            work email, organisation, industry sector, specific technical inquiries, and packaging parameters. We do not track or sell your personal data.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">2. How We Use Your Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To evaluate mutual fit for pilot sample resin testing and compounding trials.</li>
            <li>To communicate developmental milestones, technical datasheets, and certification progress.</li>
            <li>To respond to research collaboration and investment inquiries.</li>
          </ul>

          <h3 className="font-serif text-base font-medium text-ink pt-2">3. Confidentiality & Non-Disclosure</h3>
          <p>
            Packaging specifications and company details are treated with commercial confidentiality. We do not share inquiries
            with external commercial third parties. If required, mutual Non-Disclosure Agreements (NDAs) are executed prior to sharing proprietary testing data.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">4. Contact & Data Access</h3>
          <p>
            If you wish to update or erase your contact records from our early-access waitlist, please email us directly at{' '}
            <a href={`mailto:${CONFIG.PRIMARY_EMAIL}`} className="text-primary underline">
              {CONFIG.PRIMARY_EMAIL}
            </a>.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xs bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
