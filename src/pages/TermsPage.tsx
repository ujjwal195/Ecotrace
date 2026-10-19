import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { CONFIG } from '../config.ts';

export const TermsPage: React.FC = () => {
  usePageMeta(
    'Terms of Use & Developmental Standing | EcoTrace',
    'Terms of Use and developmental standing disclosure for EcoTrace Packaging Private Limited.'
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
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Terms of Use & Developmental Notice
            </h1>
            <p className="text-xs font-mono text-muted">
              {CONFIG.COMPANY_LEGAL_NAME} · Kolkata, India
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-muted leading-relaxed pt-6 border-t border-hairline">
          <p>
            This website is provided by <strong>{CONFIG.COMPANY_LEGAL_NAME}</strong> for informational, research alignment,
            and early-access partnership purposes.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">1. Research & Developmental Standing</h2>
          <p>
            EcoTrace is developing bio-based, compostable polymer resin from agricultural sugarcane bagasse. Content on this website
            describes ongoing laboratory development, target polymer specifications, and planned certification milestones.
            Nothing on this website constitutes an offer for commercial sale of finished resin or an unverified warranty of performance.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">2. Intellectual Property</h2>
          <p>
            The EcoTrace brand, logo wordmark, website layout, copy, and process descriptions are the proprietary intellectual property of {CONFIG.COMPANY_LEGAL_NAME}.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">3. Forward-Looking Statements</h2>
          <p>
            Statements regarding planned pilot facilities, testing timelines, and biodegradability benchmarks represent honest
            development targets and may be refined as empirical lab data progresses.
          </p>

          <h2 className="font-serif text-xl font-normal text-ink pt-4">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with jurisdiction in Kolkata, West Bengal.
          </p>
        </div>
      </div>
    </div>
  );
};
