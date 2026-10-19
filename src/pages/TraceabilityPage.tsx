import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, FileCheck2, ArrowUpRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { ImageSlot } from '../components/ImageSlot.tsx';

export const TraceabilityPage: React.FC = () => {
  usePageMeta(
    'Traceability | Batch Origin & Custody Architecture',
    'EcoTrace is designing batch-level origin transparency connecting regional sugarcane agriculture to finished biopolymer packaging pellets.'
  );

  const stages = [
    {
      number: '01',
      title: 'Feedstock Origin',
      summary: 'Regional sugarcane harvesting zone, milling cluster source, and agricultural residue lot records.',
    },
    {
      number: '02',
      title: 'Conversion',
      summary: 'Biological conversion batch identifier, conversion run dates, and processing metrics.',
    },
    {
      number: '03',
      title: 'Quality Testing',
      summary: 'Target material characterization logs, melt-flow windows, and developmental purity screening.',
    },
    {
      number: '04',
      title: 'Batch Record',
      summary: 'Custody record linking initial agricultural feedstock delivery to compounded pellet lot numbers.',
    },
    {
      number: '05',
      title: 'Delivery',
      summary: 'Dispatch lot code with accompanying technical datasheet and target Certificate of Analysis.',
    },
  ];

  return (
    <div data-nav-theme="light" className="bg-bg-warm text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-accent-sage mb-3">
            04 · Sourcing Transparency
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            Know where your material comes from.
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-4">
            We aim to make each batch traceable from agricultural feedstock to finished pellets.
            By designing custody tracking into our supply chain from the outset, we plan to provide verifiable origin records
            for every pellet lot we produce.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-hairline rounded-xs text-xs font-mono text-ink-muted">
            <Compass className="w-3.5 h-3.5 text-accent-sage" />
            <span>Design principle and planned capability — pre-commercial milestone</span>
          </div>
        </div>

        {/* Feedstock Image Slot */}
        <div className="mb-24">
          <ImageSlot
            src=""
            alt="Sugarcane agricultural harvesting zone in regional India"
            caption="Agricultural origin: regional sugarcane harvesting zones providing non-food bagasse residue."
            aspect="16:9"
            recommendedSize="1600 × 900 px"
            illustrative={true}
          />
        </div>

        {/* 5-Stage Planned Approach Timeline */}
        <div className="mb-24">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Planned Approach
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-3">
              Five-stage custody framework.
            </h2>
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider">
              Architecture for future commercial batch documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="bg-white p-6 border border-hairline rounded-sm flex flex-col justify-between hover:border-accent-sage transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl text-accent-sage font-normal">
                      {stage.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-accent-sage/60" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-ink mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {stage.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustrative Batch Record Card */}
        <div className="mb-24">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Specimen Architecture
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal">
              Illustrative batch record.
            </h2>
          </div>

          <div className="bg-white border border-hairline rounded-sm p-8 sm:p-10 relative overflow-hidden">
            {/* Prominent Disclaimer Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-surface border border-hairline text-xs font-mono text-ink-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-sage" />
              <strong className="text-ink">Illustrative example — not real data</strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-hairline">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                  Batch Identifier
                </span>
                <span className="font-mono text-sm text-ink font-semibold">
                  [EXAMPLE BATCH ID]
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                  Feedstock Source
                </span>
                <span className="font-mono text-sm text-ink">
                  [EXAMPLE REGIONAL CANE ZONE]
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                  Operational Standing
                </span>
                <span className="font-mono text-sm text-accent-sage-dark font-medium">
                  Developmental Trial
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block mb-1">
                  Intended Testing
                </span>
                <span className="font-mono text-sm text-ink">
                  Compostability & Rheology (Design Target)
                </span>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-ink-muted leading-relaxed">
              <div>
                <strong className="text-ink font-mono block mb-1">1. Feedstock Verification</strong>
                Agricultural residue batch records logging harvest year and milling point.
              </div>
              <div>
                <strong className="text-ink font-mono block mb-1">2. Bioprocess Integrity</strong>
                Clean biological conversion run timestamp and parameters log.
              </div>
              <div>
                <strong className="text-ink font-mono block mb-1">3. Downstream Custody</strong>
                Extruder pelletization tracking and partner trial delivery tag.
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-hairline text-[11px] font-mono text-ink-muted italic">
              Notice: EcoTrace does not operate a public lookup engine or blockchain ledger. This demonstrates our intended batch architecture.
            </div>
          </div>
        </div>

        {/* Sample Labelling Image Slot */}
        <div className="mb-24">
          <ImageSlot
            src=""
            alt="Illustrative sample specimen bag with developmental batch tracking label"
            caption="Sample packaging tag design indicating lot origin details for converter evaluation."
            aspect="4:3"
            recommendedSize="1200 × 900 px"
            illustrative={true}
          />
        </div>

        {/* Why It Matters to Brands (Qualitative Benefits) */}
        <div className="mb-24">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Brand Value
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-3">
              Why origin transparency matters.
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              Modern sustainability reporting requires verifiable supply-chain substantiation without vague environmental claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-hairline rounded-sm">
              <div className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-accent-sage mb-4">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="font-serif text-xl text-ink font-normal mb-2">
                Supply Transparency
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Clear documentation demonstrating your packaging resin originated from agricultural residues rather than fossil petrochemicals.
              </p>
            </div>

            <div className="bg-white p-8 border border-hairline rounded-sm">
              <div className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-accent-sage mb-4">
                <FileCheck2 className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="font-serif text-xl text-ink font-normal mb-2">
                Audit Readiness
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Structured batch data designed to satisfy corporate ESG disclosures, statutory EPR guidelines, and circular compliance reviews.
              </p>
            </div>

            <div className="bg-white p-8 border border-hairline rounded-sm">
              <div className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-accent-sage mb-4">
                <Compass className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="font-serif text-xl text-ink font-normal mb-2">
                Substantiated Sourcing
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Supportable claims for consumer-facing sustainability communications based on documented regional raw material streams.
              </p>
            </div>
          </div>
        </div>

        {/* Co-Design Callout */}
        <div className="p-8 sm:p-12 border border-hairline bg-surface rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-sage block mb-2">
              Co-Development Invitation
            </span>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Early partners can help shape what we record and share.
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              We invite converter partners and brands to participate in structuring our batch custody requirements to fit their enterprise auditing workflows.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-xs shrink-0"
          >
            <span>Shape our tracking</span>
            <ArrowUpRight className="w-4 h-4 text-accent-sage" />
          </Link>
        </div>
      </div>
    </div>
  );
};
