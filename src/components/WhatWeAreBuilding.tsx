import React from 'react';
import { Leaf, Droplets, Package, RefreshCw } from 'lucide-react';

export const WhatWeAreBuilding: React.FC = () => {
  return (
    <section
      id="what-we-are-building"
      data-nav-theme="light"
      className="py-24 bg-surface text-ink relative scroll-mt-16 overflow-hidden"
      aria-labelledby="building-heading"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            02. The Solution
          </p>
          <h2
            id="building-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            What we&apos;re building.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            EcoTrace is developing a bio-based, compostable polymer in pellet form, made by converting sugarcane bagasse
            (agricultural waste) through a biological process, intended for use in packaging.
          </p>
        </div>

        {/* Core Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="bg-card border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-4">
                <Leaf className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-normal text-ink mb-2">
                Agricultural Feedstock
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Utilizing non-food sugarcane bagasse from agricultural processing rather than fossil hydrocarbons.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-primary tracking-wide uppercase font-mono">
              Renewable Carbon
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-card border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-4">
                <RefreshCw className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-normal text-ink mb-2">
                Biological Conversion
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Transforming plant carbon through natural biological synthesis into high-integrity polymer resin.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-primary tracking-wide uppercase font-mono">
              Biological Route
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-card border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-4">
                <Package className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-normal text-ink mb-2">
                Pelletized Format
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Supplied as compounding resin granules designed to integrate into commercial packaging conversion lines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-primary tracking-wide uppercase font-mono">
              Packaging Format
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-card border border-hairline rounded-xl p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-4">
                <Droplets className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-normal text-ink mb-2">
                Compostable Design
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Targeted to biodegrade responsibly at end-of-life, returning organic carbon back to the soil environment.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-hairline text-[11px] text-primary tracking-wide uppercase font-mono">
              Design Target
            </div>
          </div>
        </div>

        {/* Clean Context Banner */}
        <div className="bg-mist/70 border border-hairline rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-primary tracking-wider uppercase block mb-1">
                Technical Collaboration
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink mb-2">
                Transparent Dialogue with Industry Partners
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                We share detailed material characterization data, resin specifications, and processing windows directly
                with qualified brands, packaging converters, and research collaborators upon request.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-primary hover:bg-primary-hover text-white text-xs font-semibold shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Request Technical Information
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
