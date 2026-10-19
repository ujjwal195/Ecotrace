import React from 'react';
import { CheckCircle2, Clock, CalendarClock, ShieldAlert } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const milestones = [
    {
      phase: 'Phase 01',
      title: 'Concept & Process Design',
      status: 'Done',
      statusColor: 'text-white bg-primary border-primary',
      icon: CheckCircle2,
      summary:
        'Lignocellulosic feedstock assessment, stoichiometric sugar-yield modeling, and downstream process architecture.',
      details: [
        'Regional sugarcane bagasse carbon content profiling',
        'Preliminary techno-economic feasibility analysis',
        'Polymer formulation & resin property targets',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Lab Validation',
      status: 'In progress',
      statusColor: 'text-ink bg-warm border-warm font-semibold',
      icon: Clock,
      summary:
        'Bench-scale biological conversion trials, carbon-to-polymer conversion kinetics, and clean extraction protocols.',
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
      statusColor: 'text-muted bg-surface/60 border-hairline',
      icon: CalendarClock,
      summary:
        'Scaled pilot conversion and compounding into commercial-grade test pellets for converter trials.',
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
      statusColor: 'text-muted bg-surface/60 border-hairline',
      icon: CalendarClock,
      summary:
        'Targeted compliance testing for compostability and biodegradability standards.',
      details: [
        'Target standard testing (e.g. IS 17088, ISO 17088, ASTM D6400)',
        'Ecotoxicity and plant germination trials',
        'Heavy metal & fluorinated chemical screening (zero PFAS)',
      ],
    },
  ];

  return (
    <section
      id="roadmap"
      data-nav-theme="light"
      className="py-24 bg-bg text-ink relative scroll-mt-16 overflow-hidden"
      aria-labelledby="roadmap-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            06. Where We Are
          </p>
          <h2
            id="roadmap-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            An honest, science-led developmental roadmap.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Materials development requires rigorous empirical validation. We do not claim commercial readiness ahead of proof.
            Here is our exact operational standing today.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.phase}
                className="bg-card border border-hairline rounded-xl p-6 flex flex-col justify-between hover:border-primary/40 transition-colors relative shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-muted">
                      {item.phase}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-medium border ${item.statusColor}`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-hairline">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage mt-1 shrink-0" aria-hidden="true" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrity Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-surface border border-hairline flex items-start sm:items-center gap-3 max-w-2xl mx-auto shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-ink font-medium">Integrity Note:</strong> Certifications (IS 17088, ASTM D6400) and pilot samples are planned developmental milestones. EcoTrace does not sell commercially or claim formal certification prior to official laboratory sign-off.
          </p>
        </div>
      </div>
    </section>
  );
};
