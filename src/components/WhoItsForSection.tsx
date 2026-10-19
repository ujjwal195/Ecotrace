import React from 'react';
import { Package, Cpu, FlaskConical, ArrowRight } from 'lucide-react';
import { TargetAudienceRole } from '../config.ts';

interface WhoItsForProps {
  onSelectRole: (role: TargetAudienceRole) => void;
}

export const WhoItsForSection: React.FC<WhoItsForProps> = ({ onSelectRole }) => {
  const audiences = [
    {
      role: 'Brand' as TargetAudienceRole,
      icon: Package,
      title: 'Consumer Brands',
      subtitle: 'FMCG, Food, Personal Care & Packaging',
      description:
        'Forward-thinking brands looking to replace petroleum flexible films, rigid caps, trays, and secondary packaging with compostable bio-based materials.',
      offering:
        'What we offer: Early pilot sample batches, technical datasheets, and co-development partnerships to validate biopolymer pellets in your packaging lines.',
      cta: 'Request Brand Pilot Samples',
    },
    {
      role: 'Packaging Converter' as TargetAudienceRole,
      icon: Cpu,
      title: 'Packaging Converters',
      subtitle: 'Extrusion, Thermoforming & Molders',
      description:
        'Industrial processors seeking domestic bio-based resin pellets that run efficiently on standard plastic processing equipment without major re-tooling.',
      offering:
        'What we offer: Biopolymer compounding test pellets, melt-flow specs, thermal processing windows, and collaborative trial protocols.',
      cta: 'Explore Converter Compounding',
    },
    {
      role: 'Researcher / Academic' as TargetAudienceRole,
      icon: FlaskConical,
      title: 'Researchers & Incubators',
      subtitle: 'Bioprocess Labs & Deep-Tech Investors',
      description:
        'Academic institutions, laboratories, and climate-tech funds focused on novel agricultural feedstocks and clean polymer science.',
      offering:
        'What we offer: Collaborative research grants, characterization trials, material analysis data sharing, and strategic investment discussions.',
      cta: 'Collaborate on Research',
    },
  ];

  return (
    <section
      id="who-its-for"
      data-nav-theme="light"
      className="py-24 bg-bg text-ink relative scroll-mt-16"
      aria-labelledby="who-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            05. Ecosystem
          </p>
          <h2
            id="who-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            Built for partners ready for bio-based materials.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Whether you manufacture packaging units, steer brand sustainability roadmaps, or research bio-based materials,
            EcoTrace provides a collaborative runway for early domestic biopolymer integration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {audiences.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="bg-card rounded-xl p-8 border border-hairline shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors relative"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-mist flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-primary font-semibold mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ink mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="p-4 bg-surface rounded-lg border border-hairline mb-8">
                    <p className="text-xs text-ink font-medium leading-relaxed">
                      {item.offering}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onSelectRole(item.role)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-primary bg-card hover:bg-primary hover:text-white transition-all rounded border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg group"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
