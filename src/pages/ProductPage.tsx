import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Package, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { ImageSlot } from '../components/ImageSlot.tsx';

export const ProductPage: React.FC = () => {
  usePageMeta(
    'Product | Bio-Based Compostable Polymer Pellets',
    'EcoTrace is developing bio-based, compostable polymer resin in pellet form derived from sugarcane bagasse agricultural waste for packaging applications.'
  );

  const applications = [
    {
      title: 'Flexible Packaging Films',
      target: 'Secondary wrapping, dry food bags & agricultural mulch films',
      description: 'Engineered with target elongation and tear resistance to run on standard blown film lines.',
    },
    {
      title: 'Rigid & Semi-Rigid Containers',
      target: 'Caps, closures, cosmetic containers & food serviceware',
      description: 'Formulated for injection molding cycle stability and structural integrity.',
    },
    {
      title: 'Thermoformed Trays & Inserts',
      target: 'Protective packaging trays & shipping dividers',
      description: 'Targeted melt strength to produce dimensionally stable vacuum-formed packaging.',
    },
  ];

  const designGoals = [
    'Bio-based carbon feedstock derived from agricultural sugarcane bagasse',
    'Pelletized resin format compatible with conventional plastic converting machinery',
    'Tuned tensile balance and elongation for flexible and rigid processing windows',
    'Zero intentionally added PFAS, plasticizers, or toxic halogenated additives',
  ];

  return (
    <div data-nav-theme="light" className="bg-bg text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            02 · Material Architecture
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            What we&apos;re building.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            EcoTrace is developing a bio-based, compostable polymer in pellet form, made by converting sugarcane bagasse
            (agricultural waste) through a biological process, intended for use in packaging.
          </p>
        </div>

        {/* Hero Image Slot */}
        <div className="mb-24">
          <ImageSlot
            src=""
            alt="EcoTrace bio-based polymer pellets in laboratory characterization dish"
            caption="Pelletized resin format designed for industrial packaging conversion."
            aspect="16:9"
            recommendedSize="1920 × 1080 px"
            illustrative={true}
          />
        </div>

        {/* Intended Applications (Targets, not claims) */}
        <div className="mb-24">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2">
              Target Formats
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal mb-3">
              Intended packaging applications.
            </h2>
            <p className="text-xs font-mono text-muted uppercase tracking-wider">
              Note: Formats represent developmental design targets, not commercial inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((app) => (
              <div key={app.title} className="bg-card p-8 border border-hairline rounded-sm flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-full bg-mist border border-hairline flex items-center justify-center text-primary mb-4">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-ink mb-2">
                    {app.title}
                  </h3>
                  <div className="text-[11px] font-mono text-primary mb-3">
                    Target: {app.target}
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Up Gallery Row */}
        <div className="mb-24">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2">
              Form & Surface
            </span>
            <h2 className="font-serif text-3xl text-ink font-normal">
              Material visualization gallery.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageSlot
              src=""
              alt="Uniform biopolymer compounding test pellets"
              caption="Resin pellets ready for extruder hopper feeding."
              aspect="4:3"
              recommendedSize="1200 × 900 px"
              illustrative={true}
            />
            <ImageSlot
              src=""
              alt="Sample film specimen blown from biopolymer resin"
              caption="Film test specimen under elongation assessment."
              aspect="4:3"
              recommendedSize="1200 × 900 px"
              illustrative={true}
            />
            <ImageSlot
              src=""
              alt="Surface macro detail of biopolymer molded surface"
              caption="Surface finish and natural translucency."
              aspect="4:3"
              recommendedSize="1200 × 900 px"
              illustrative={true}
            />
          </div>
        </div>

        {/* Target Properties & Compostability Milestone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          {/* Target Properties */}
          <div className="lg:col-span-7 bg-card p-8 sm:p-10 border border-hairline rounded-sm">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-primary">
              <Layers className="w-4 h-4" />
              <span>Material Design Objectives</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink mb-4">
              Target resin properties.
            </h2>
            <p className="text-xs font-mono text-muted mb-6 uppercase tracking-wider">
              Design goals under active lab validation — not finished commercial specifications.
            </p>

            <ul className="space-y-4">
              {designGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-5 h-5 rounded-full bg-mist border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-primary">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compostability Design Target Card */}
          <div className="lg:col-span-5 bg-surface p-8 sm:p-10 border border-hairline rounded-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary mb-3">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>Planned Milestone</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-ink mb-4">
                Compostability target.
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                Compostability is our core design target. Our formulation is engineered so that naturally occurring microorganisms
                can metabolize the biopolymer back into water, biomass, and carbon dioxide.
              </p>
              <div className="p-4 bg-card border border-hairline rounded-xs text-xs text-muted leading-relaxed">
                <strong className="text-ink font-medium block mb-1">Testing Milestone:</strong>
                Formal laboratory certifications under recognized standards (e.g. IS 17088, ISO 17088, ASTM D6400) are scheduled
                developmental milestones that will be conducted on pilot production batches.
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-hairline text-[11px] font-mono text-muted">
              Pre-commercial disclosure: No finished certified resins are currently offered for commercial sale.
            </div>
          </div>
        </div>

        {/* Application Image Slot */}
        <div className="mb-24">
          <ImageSlot
            src=""
            alt="Consumer packaging container mockup demonstrating intended biopolymer application"
            caption="Conceptual application: secondary packaging and rigid container forms."
            aspect="16:9"
            recommendedSize="1600 × 900 px"
            illustrative={true}
          />
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 border border-hairline bg-card rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Interested in compounding trials?
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              We collaborate with packaging converters to benchmark trial batches on commercial lines.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-hover transition-colors rounded-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>Request sample datasheets</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
