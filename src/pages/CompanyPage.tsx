import React from 'react';
import { Link } from 'react-router-dom';
import { User, Linkedin, CheckCircle2, Clock, CalendarClock, ShieldAlert, UserPlus, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { ImageSlot } from '../components/ImageSlot.tsx';
import { CONFIG } from '../config.ts';
import founderPhoto from '../assets/images/regenerated_image_1792136126505.png';

export const CompanyPage: React.FC = () => {
  usePageMeta(
    'Company & Roadmap | Leadership, People & Development Milestones',
    'Meet EcoTrace leadership in Kolkata, India, and explore our developmental roadmap from laboratory validation to pilot-scale biopolymer manufacturing.'
  );

  const milestones = [
    {
      phase: 'Phase 01',
      title: 'Concept & Process Design',
      status: 'Done',
      statusColor: 'text-brand-green bg-surface border-hairline',
      icon: CheckCircle2,
      summary: 'Lignocellulosic feedstock profiling, sugar-yield stoichiometry, and downstream process architecture.',
      details: [
        'Regional sugarcane bagasse carbon content assessment',
        'Preliminary techno-economic process evaluation',
        'Polymer formulation & resin property targets',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Lab Validation',
      status: 'In progress',
      statusColor: 'text-accent-sage-dark bg-accent-sage-light border-accent-sage/40',
      icon: Clock,
      summary: 'Bench-scale biological conversion trials, carbon-to-polymer conversion kinetics, and clean extraction protocols.',
      details: [
        'Bench-scale biological conversion monitoring',
        'Bio-based polymer yield optimization',
        'Clean extraction trial batches',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Pilot-Scale Production',
      status: 'Next',
      statusColor: 'text-ink-muted bg-surface/60 border-hairline',
      icon: CalendarClock,
      summary: 'Scaled pilot conversion and compounding into commercial-grade test pellets for converter trials.',
      details: [
        'Conversion capacity scale-up in India',
        'Resin extrusion and granulator pelletization',
        'Converter early-access sample distribution',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Material Certification',
      status: 'Next',
      statusColor: 'text-ink-muted bg-surface/60 border-hairline',
      icon: CalendarClock,
      summary: 'Targeted compliance testing for compostability and biodegradability standards.',
      details: [
        'Target standard testing (e.g. IS 17088, ISO 17088, ASTM D6400)',
        'Ecotoxicity and plant germination trials',
        'Heavy metal & fluorinated chemical screening (zero PFAS)',
      ],
    },
  ];

  return (
    <div data-nav-theme="light" className="bg-bg-warm text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-accent-sage mb-3">
            05 · Organisation & Milestones
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            An honest, science-led developmental journey.
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Materials development requires empirical validation. We do not claim commercial readiness ahead of proof.
            Here is our exact operational roadmap and leadership team.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="mb-24">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Development Milestones
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-3">
              Where we are today.
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Tracking our progress from laboratory bench trials to commercial pilot packaging batches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.phase}
                  className="bg-white p-6 border border-hairline rounded-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-ink-muted">
                        {item.phase}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[11px] font-mono border ${item.statusColor}`}>
                        <Icon className="w-3 h-3" />
                        <span>{item.status}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-ink mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed mb-6">
                      {item.summary}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-hairline">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-ink-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sage mt-1 shrink-0" aria-hidden="true" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Development standing note */}
          <div className="mt-8 p-4 bg-surface border border-hairline rounded-sm flex items-start sm:items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-accent-sage shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs text-ink-muted leading-relaxed">
              <strong className="text-ink">Developmental Notice:</strong> EcoTrace does not sell commercial resin or claim formal certification prior to official laboratory sign-off. Independent standard tests (IS 17088, ASTM D6400) are scheduled on pilot batches.
            </p>
          </div>
        </div>

        {/* Team Photo Slot */}
        <div className="mb-24">
          <ImageSlot
            src=""
            alt="EcoTrace team and scientific laboratory in Kolkata, India"
            caption="EcoTrace research operations in Kolkata, West Bengal, India."
            aspect="16:9"
            recommendedSize="1600 × 900 px"
            illustrative={true}
          />
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Leadership
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-3">
              People & dedication.
            </h2>
          </div>

          {/* Founder Card */}
          <div className="bg-white p-8 sm:p-10 border border-hairline rounded-sm flex flex-col sm:flex-row gap-8 items-start sm:items-center max-w-2xl mb-12 shadow-xs">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-sm overflow-hidden border border-hairline shrink-0 bg-surface">
              <img
                src={founderPhoto}
                alt="Ujjwal Sancheti, Founder & CEO of EcoTrace Packaging"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif text-2xl font-normal text-ink">
                  Ujjwal Sancheti
                </h3>
                <a
                  href={CONFIG.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-ink p-1 rounded transition-colors"
                  aria-label="Ujjwal Sancheti on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-accent-sage-dark font-medium mb-3">
                Founder & CEO · EcoTrace Packaging Private Limited
              </p>
              <div className="p-4 bg-surface rounded-xs border border-hairline mb-4 text-xs text-ink-muted leading-relaxed">
                Leading EcoTrace&apos;s mission to valorize agricultural sugarcane waste into domestic compostable biopolymers in India. Dedicated to building circular packaging infrastructure and scaling regional biomanufacturing.
              </div>
              <p className="text-[11px] font-mono text-ink-muted">
                {CONFIG.LOCATION} · {CONFIG.PRIMARY_EMAIL}
              </p>
            </div>
          </div>

          {/* Advisors & Collaborators Row */}
          <div className="mb-12">
            <h3 className="font-serif text-xl font-normal text-ink mb-6">
              Advisors & Research Collaborators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-dashed border-hairline rounded-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-surface flex items-center justify-center shrink-0 text-ink-muted">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-ink font-medium block">
                    [ADD: Bioprocess Advisor / Academic Mentor]
                  </span>
                  <p className="text-xs text-ink-muted mt-1">
                    Biological conversion and bioprocess characterization guidance.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 border border-dashed border-hairline rounded-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm bg-surface flex items-center justify-center shrink-0 text-ink-muted">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-ink font-medium block">
                    [ADD: Polymer Compounding & Converter Advisor]
                  </span>
                  <p className="text-xs text-ink-muted mt-1">
                    Melt processing, extrusion line trials, and converter liaison.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Co-Founder Callout */}
          <div className="bg-brand-green text-white p-8 sm:p-10 rounded-sm border border-brand-green-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-accent-sage uppercase tracking-wider mb-2">
                <UserPlus className="w-4 h-4" />
                <span>Expanding Our Scientific Core</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-white mb-2">
                Seeking a Bioprocess & Biological Conversion Co-Founder or Advisor
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Are you an expert in industrial bioprocessing or lignocellulosic sugar valorization? Join us in developing a compostable, bio-based polymer from agricultural waste.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-brand-green bg-white hover:bg-surface transition-colors rounded-xs shrink-0"
            >
              <span>Connect with Ujjwal</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent-sage-dark" />
            </Link>
          </div>
        </div>

        {/* Partners & Recognition: Renders only if real */}
        <div className="mb-24">
          <div className="max-w-xl mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Ecosystem
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-2">
              Partners & Institutional Recognition
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              In accordance with our factual integrity charter, institutional partnerships, incubator affiliations, and academic collaborations will be announced here once formal agreements are executed.
            </p>
          </div>
          <div className="p-6 bg-surface border border-hairline rounded-sm text-xs font-mono text-ink-muted">
            Status: Prospective discussions active with regional research institutes and bio-refineries.
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 border border-hairline bg-white rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Have questions about our development?
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Review our frequently asked questions or submit an inquiry to our team.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-xs shrink-0"
          >
            <span>FAQ & Contact</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-sage" />
          </Link>
        </div>
      </div>
    </div>
  );
};
