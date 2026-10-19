import React from 'react';
import { X, FileText } from 'lucide-react';
import { CONFIG } from '../config.ts';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
    >
      <div className="bg-card text-ink border border-hairline rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close Terms of Service"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 id="terms-title" className="font-serif text-2xl font-normal text-ink">
              Terms of Use & Developmental Notice
            </h2>
            <p className="text-xs text-muted font-mono">
              EcoTrace Packaging Private Limited · Kolkata, India
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
          <p>
            This website is provided by <strong>{CONFIG.COMPANY_LEGAL_NAME}</strong> for informational, research alignment,
            and early-access partnership purposes.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">1. Research & Developmental Standing</h3>
          <p>
            EcoTrace is developing bio-based, compostable polymer resin from agricultural sugarcane bagasse. Content on this website
            describes ongoing laboratory development, target polymer specifications, and planned certification milestones.
            Nothing on this website constitutes an offer for commercial sale of finished resin or an unverified warranty of performance.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">2. Intellectual Property</h3>
          <p>
            The EcoTrace brand, orbital mark, wordmark, website layout, copy, and process descriptions are the proprietary intellectual property of {CONFIG.COMPANY_LEGAL_NAME}.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">3. Forward-Looking Statements</h3>
          <p>
            Statements regarding planned pilot facilities, testing timelines, and biodegradability benchmarks represent honest
            development targets and may be refined as empirical lab data progresses.
          </p>

          <h3 className="font-serif text-base font-medium text-ink pt-2">4. Governing Law</h3>
          <p>
            These terms are governed by the laws of India, with jurisdiction in Kolkata, West Bengal.
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
