import React from 'react';
import { MapPin, ShieldCheck, Factory, Sprout } from 'lucide-react';

export const WhyIndiaSection: React.FC = () => {
  const points = [
    {
      icon: Sprout,
      title: 'Feedstock Abundance',
      description:
        'India produces substantial volumes of sugarcane annually. Sugarcane bagasse is generated during every milling cycle, creating an abundant, localized agricultural carbon supply that does not compete with food crops.',
    },
    {
      icon: ShieldCheck,
      title: 'Supply-Chain Resilience',
      description:
        'Bioplastic converters frequently face volatile foreign exchange rates, extended ocean shipping lead times, and unpredictable import tariffs. Domestic biopolymer production provides localized supply certainty.',
    },
    {
      icon: Factory,
      title: 'Domestic Manufacturing',
      description:
        'Developing domestic manufacturing capacity establishes valuable processing capabilities within India, supporting regional employment and fostering local circular biomanufacturing.',
    },
    {
      icon: MapPin,
      title: 'Regional Operations Hub',
      description:
        'Based in Kolkata, EcoTrace is situated with direct regional connectivity to agricultural hinterlands, research institutions, and transport corridors across Eastern and Northern India.',
    },
  ];

  return (
    <section
      id="why-india"
      data-nav-theme="light"
      className="py-24 bg-surface text-ink relative scroll-mt-16 overflow-hidden"
      aria-labelledby="why-india-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            04. Strategic Advantage
          </p>
          <h2
            id="why-india-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            Why domestic manufacturing matters.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            By developing bio-based polymers in close proximity to agricultural feedstock, we reduce international freight requirements
            and contribute to a resilient domestic materials ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-card border border-hairline rounded-xl p-8 hover:border-primary/40 transition-colors flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-mist flex items-center justify-center text-primary mb-5 border border-hairline">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-ink mb-3">
                    {point.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
