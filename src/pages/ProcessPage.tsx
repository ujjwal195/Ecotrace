import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { ImageSlot } from '../components/ImageSlot.tsx';

// TODO: review real lab photos for confidential details before publishing

export const ProcessPage: React.FC = () => {
  usePageMeta(
    'Process | From Agricultural Waste to Biopolymer Pellets',
    'Follow EcoTrace’s 4-step conversion journey transforming regional sugarcane bagasse into compostable biopolymer resin pellets.'
  );

  const steps = [
    {
      number: '01',
      title: 'Agricultural Waste',
      subheading: 'Sugarcane Bagasse Feedstock',
      summary: 'Fibrous residue sourced directly from regional sugarcane milling clusters in India.',
      imageAlt: 'Raw sugarcane bagasse residue after cane crushing',
      imageCaption: 'Step 01: Sourcing abundant agricultural bagasse from regional mills.',
    },
    {
      number: '02',
      title: 'Sugars',
      subheading: 'Refined Carbon Stream',
      summary: 'Plant fibers are converted into a clean biological carbon stream.',
      imageAlt: 'Clarified agricultural plant sugars hydrolysate',
      imageCaption: 'Step 02: Refining plant carbon into soluble sugars.',
    },
    {
      number: '03',
      title: 'Biological Conversion',
      subheading: 'Biological Synthesis',
      summary: 'Biological conversion transforms refined plant carbon into a bio-based polymer resin.',
      imageAlt: 'Biological conversion synthesis container',
      imageCaption: 'Step 03: Biological synthesis of bio-based polymer.',
    },
    {
      number: '04',
      title: 'Compostable Pellets',
      subheading: 'Resin Granules for Converters',
      summary: 'Downstream harvesting and extrusion yield standard compounding pellets for packaging.',
      imageAlt: 'Finished biopolymer compounding pellets ready for packaging conversion',
      imageCaption: 'Step 04: Compounding and pelletization for commercial converters.',
    },
  ];

  return (
    <div data-nav-theme="light" className="bg-bg-warm text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-accent-sage mb-3">
            03 · Conversion Journey
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            From waste to pellets.
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Our conversion journey transforms agricultural by-products into functional, compostable biopolymer pellets
            engineered for the packaging industry.
          </p>
        </div>

        {/* 4-Step Visual Grid with Image Slots */}
        <div className="space-y-16 mb-24">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 sm:p-10 border border-hairline rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6">
                <span className="font-serif text-3xl sm:text-4xl text-accent-sage font-normal block mb-2">
                  {step.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-2">
                  {step.subheading}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mb-4">
                  {step.title}
                </h2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {step.summary}
                </p>
              </div>

              <div className="lg:col-span-6">
                <ImageSlot
                  src=""
                  alt={step.imageAlt}
                  caption={step.imageCaption}
                  aspect="4:3"
                  recommendedSize="1200 × 900 px"
                  illustrative={true}
                  className="my-0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Confidential Technical Details Callout */}
        <div className="bg-surface p-8 sm:p-10 border border-hairline rounded-sm mb-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">
              <Lock className="w-4 h-4 text-accent-sage" />
              <span>Proprietary Process Data</span>
            </div>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Detailed technical information is shared with qualified partners on request.
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              We provide deep-dive characterization data, stoichiometry models, and conversion kinetics directly to industrial converters,
              co-developers, and research collaborators under confidentiality agreements.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-xs shrink-0"
          >
            <span>Request technical brief</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-sage" />
          </Link>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 border border-hairline bg-white rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Traceability from farm to resin.
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Learn how we intend to record material origin at every stage of the conversion lifecycle.
            </p>
          </div>
          <Link
            to="/traceability"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink border border-hairline bg-white hover:border-ink transition-colors rounded-xs shrink-0"
          >
            <span>Explore traceability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
