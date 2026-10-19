import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ApproachSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Agricultural Waste',
      subtitle: 'Sugarcane Bagasse',
      description:
        'Sourcing surplus fibrous residue directly from regional sugarcane processing mills across India.',
      svg: (
        <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-primary" aria-hidden="true">
          <path d="M 35 90 L 35 15 M 50 90 L 50 10 M 65 90 L 65 20" strokeWidth="3" strokeLinecap="round" />
          <path d="M 30 70 Q 15 60 10 40" strokeWidth="2" strokeLinecap="round" />
          <path d="M 50 50 Q 70 40 85 25" strokeWidth="2" strokeLinecap="round" />
          <path d="M 35 35 Q 20 25 15 10" strokeWidth="2" strokeLinecap="round" />
          <line x1="31" y1="55" x2="39" y2="55" strokeWidth="3" />
          <line x1="46" y1="45" x2="54" y2="45" strokeWidth="3" />
          <line x1="61" y1="65" x2="69" y2="65" strokeWidth="3" />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Sugars',
      subtitle: 'Refined Carbon',
      description:
        'Converting plant fibers into clean biological carbon sugars to feed the conversion process.',
      svg: (
        <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-primary" aria-hidden="true">
          <polygon points="50,20 80,38 80,72 50,90 20,72 20,38" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="50" cy="20" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="80" cy="38" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="80" cy="72" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="50" cy="90" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="20" cy="72" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <circle cx="20" cy="38" r="4" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="2" />
          <path d="M 50 35 L 50 75" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Biological Conversion',
      subtitle: 'Biological Route',
      description:
        'Biological conversion processes the plant carbon, synthesizing a bio-based polymer resin.',
      svg: (
        <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-primary" aria-hidden="true">
          <rect x="25" y="25" width="50" height="55" rx="10" strokeWidth="3" />
          <line x1="50" y1="12" x2="50" y2="25" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="12" x2="58" y2="12" strokeWidth="3" strokeLinecap="round" />
          <path d="M 30 65 Q 50 55 70 65" strokeWidth="2" strokeDasharray="2 2" />
          <circle cx="42" cy="45" r="5" fill="var(--color-sage)" />
          <circle cx="58" cy="48" r="7" fill="var(--color-primary)" />
          <circle cx="48" cy="62" r="6" fill="var(--color-ink)" />
        </svg>
      ),
    },
    {
      step: '04',
      title: 'Compostable Pellets',
      subtitle: 'Resin Granules',
      description:
        'Downstream isolation and pelletization into drop-in biopolymer resin pellets for converters.',
      svg: (
        <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 stroke-primary" aria-hidden="true">
          <ellipse cx="40" cy="40" rx="14" ry="10" strokeWidth="3" fill="#FFFFFF" />
          <ellipse cx="62" cy="48" rx="16" ry="11" strokeWidth="3" fill="var(--color-sage)" />
          <ellipse cx="38" cy="65" rx="15" ry="10" strokeWidth="3" fill="var(--color-primary-soft)" />
          <ellipse cx="68" cy="72" rx="12" ry="9" strokeWidth="3" fill="#FFFFFF" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="approach"
      data-nav-theme="light"
      className="py-24 bg-bg text-ink relative scroll-mt-16"
      aria-labelledby="approach-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            03. The Journey
          </p>
          <h2
            id="approach-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            From field residue to polymer pellets.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Our conversion process connects agricultural residue with biopolymer development.
            We prioritize domestic agricultural feedstock to develop a dependable supply chain in India.
          </p>
        </div>

        {/* 4-Step Process Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-card p-7 rounded-xl border border-hairline shadow-2xs flex flex-col justify-between relative group hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-2xl font-bold text-primary">
                    {item.step}
                  </span>
                  <div className="p-2 bg-mist rounded-lg">
                    {item.svg}
                  </div>
                </div>

                <div className="text-[11px] font-mono tracking-wider uppercase text-muted mb-1">
                  {item.subtitle}
                </div>
                <h3 className="font-serif text-xl font-normal text-ink mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary">
                  <ArrowRight className="w-5 h-5 bg-mist p-0.5 rounded-full" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overview note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted italic max-w-2xl mx-auto">
            High-level overview: Technical specifications and proprietary development data are shared with qualified partners on request.
          </p>
        </div>
      </div>
    </section>
  );
};
