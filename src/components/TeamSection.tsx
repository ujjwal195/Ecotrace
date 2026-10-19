import React from 'react';
import { User, Linkedin, ArrowRight, UserPlus } from 'lucide-react';
import { CONFIG } from '../config.ts';
import founderPhoto from '../assets/images/regenerated_image_1792136126505.png';

interface TeamSectionProps {
  onOpenContact: (role?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="team"
      data-nav-theme="light"
      className="py-24 bg-surface text-ink relative scroll-mt-16"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            07. People & Science
          </p>
          <h2
            id="team-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            Led by passion for deep-tech materials.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Building India&apos;s biopolymer ecosystem requires interdisciplinary dedication—bridging industrial chemistry,
            agricultural logistics, and commercial packaging conversion.
          </p>
        </div>

        {/* Founder Card */}
        <div className="max-w-2xl mb-16">
          <div className="bg-card p-8 rounded-2xl border border-hairline shadow-2xs flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            {/* Founder Photo */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-hairline shadow-xs shrink-0 bg-surface">
              <img
                src={founderPhoto}
                alt="Ujjwal Sancheti, Founder & CEO of EcoTrace Packaging"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Founder Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-2xl font-normal text-ink">
                  Ujjwal Sancheti
                </h3>
                <a
                  href={CONFIG.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink p-1.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Ujjwal Sancheti on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-3">
                Founder & CEO · EcoTrace Packaging
              </p>
              <div className="p-3.5 bg-surface rounded-lg border border-hairline mb-3">
                <p className="text-xs text-muted leading-relaxed">
                  Leading EcoTrace&apos;s mission to valorize agricultural sugarcane waste into domestic compostable biopolymers in India. Dedicated to building circular packaging infrastructure and scaling regional biomanufacturing.
                </p>
              </div>
              <p className="text-[11px] font-mono text-muted">
                Kolkata, West Bengal, India · {CONFIG.PRIMARY_EMAIL}
              </p>
            </div>
          </div>
        </div>

        {/* Advisors & Collaborators Row */}
        <div className="mb-16">
          <h3 className="font-serif text-xl font-normal text-ink mb-6">
            Advisors & Research Collaborators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl border border-dashed border-hairline flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-mist flex items-center justify-center shrink-0 text-muted">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-primary font-medium block">
                  [ADD: Bioprocess Advisor / Academic Mentor]
                </span>
                <p className="text-xs text-muted mt-1">
                  Biological conversion and bioprocess characterization support.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-dashed border-hairline flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-mist flex items-center justify-center shrink-0 text-muted">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-primary font-medium block">
                  [ADD: Polymer Compounding & Industry Advisor]
                </span>
                <p className="text-xs text-muted mt-1">
                  Melt processing, extrusion line trials, and packaging converter liaison.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Co-founder / Advisor Callout */}
        <div className="bg-mist border border-hairline text-ink p-8 rounded-2xl shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
                <UserPlus className="w-4 h-4" aria-hidden="true" />
                <span>We&apos;re Expanding Our Research Circle</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-ink mb-2">
                Seeking a Bioprocess & Biological Conversion Co-Founder / Advisor
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Are you an expert in industrial bioprocessing or lignocellulosic sugar valorization? Join us in developing a compostable, bio-based polymer from agricultural waste.
              </p>
            </div>
            <button
              onClick={() => onOpenContact('Researcher / Academic')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-all rounded-xs shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span>Connect with Ujjwal</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
