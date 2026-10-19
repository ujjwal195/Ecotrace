import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { CONFIG } from '../config.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-nav-theme="light" className="group/footer bg-surface text-ink border-t border-hairline pt-16 pb-[160px] sm:pb-12" role="contentinfo">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              {/* TODO: Crop /public/footer-logo.png tightly to the artwork. */}
              <Link
                to="/"
                className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="EcoTrace home"
              >
                <div className="-ml-[10px] sm:-ml-[12px] flex items-center">
                  <span
                    role="img"
                    aria-label="EcoTrace logo mark"
                    className="footer-logo-mask h-[48px] sm:h-[56px] aspect-[543/459] bg-ink group-data-[nav-theme=dark]/footer:bg-bg transition-colors duration-200 shrink-0"
                    style={{
                      maskImage: 'url(/footer-logo.png)',
                      WebkitMaskImage: 'url(/footer-logo.png)',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                    }}
                  />
                  <img
                    src="/footer-logo.png"
                    alt="EcoTrace logo mark"
                    className="footer-logo-fallback h-[48px] sm:h-[56px] aspect-[543/459] object-contain [filter:brightness(0)] group-data-[nav-theme=dark]/footer:[filter:none] shrink-0"
                    loading="lazy"
                  />
                </div>
              </Link>
              <p className="text-xs text-muted max-w-sm leading-relaxed mb-4">
                Developing domestically produced, bio-based and compostable polymers from sugarcane bagasse agricultural waste in India.
              </p>
              <div className="text-xs text-muted font-mono">
                {CONFIG.LOCATION} · {CONFIG.PRIMARY_EMAIL}
              </div>
            </div>
            <div className="mt-6 text-[11px] font-mono text-muted/80 uppercase tracking-widest">
              Status: In Development · Pre-Commercial
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-3">
                Platform
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                <li>
                  <Link to="/problem" className="hover:text-primary transition-colors">
                    The Problem
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="hover:text-primary transition-colors">
                    Product
                  </Link>
                </li>
                <li>
                  <Link to="/process" className="hover:text-primary transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link to="/traceability" className="hover:text-primary transition-colors">
                    Traceability
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-3">
                Organisation
              </h3>
              <ul className="space-y-2 text-xs text-muted">
                <li>
                  <Link to="/company" className="hover:text-primary transition-colors">
                    Company & Roadmap
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    FAQ & Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary transition-colors">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Collaboration notice & Back to top */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold mb-3">
                Early Access
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-4">
                We share technical datasheets and pilot testing characterization protocols with qualified packaging converters and brands.
              </p>
              <Link
                to="/contact"
                className="inline-flex text-xs font-medium text-primary hover:underline transition-colors"
              >
                Register for pilot batches →
              </Link>
            </div>

            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-ink transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="Back to top of page"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© 2026 {CONFIG.COMPANY_LEGAL_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms & Standing
            </Link>
            <span className="text-ink font-semibold">EcoTrace</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
