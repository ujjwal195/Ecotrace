import React from 'react';
import { Handshake } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section
      id="partners"
      data-nav-theme="light"
      className="py-16 bg-bg text-ink border-t border-b border-hairline relative scroll-mt-16"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">
            Institutional Alignment
          </p>
          <h2
            id="partners-heading"
            className="font-serif text-2xl sm:text-3xl font-normal text-ink mb-4"
          >
            Partnerships & Incubators
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            In accordance with our strict factual integrity policy, EcoTrace only displays formally executed institutional
            and corporate partnership agreements.
          </p>

          {/* Empty-state / Ready-for-announcement container */}
          <div className="bg-surface border border-dashed border-hairline rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <Handshake className="w-8 h-8 text-primary mb-3 opacity-90" aria-hidden="true" />
            <h3 className="font-serif text-lg font-normal text-ink mb-1">
              Active Institutional & Laboratory Discussions
            </h3>
            <p className="text-xs text-muted max-w-lg leading-relaxed mb-4">
              [ADD: Confirmed incubator cohorts, academic research grants, or packaging converter pilot letters of intent (LOIs) once formalized.]
            </p>
            <div className="text-[11px] font-mono text-muted">
              To initiate an academic characterization or pilot trial LOI, contact us below.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
