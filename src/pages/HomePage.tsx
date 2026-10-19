import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { heroConfig } from '../data/hero.ts';
import { HeroImage } from '../components/HeroImage.tsx';

export const HomePage: React.FC = () => {
  usePageMeta(
    'EcoTrace – Compostable Bio-Based Polymers from Sugarcane Waste',
    'EcoTrace is developing a domestically produced, bio-based polymer made from agricultural waste, designed to offer a compostable alternative to conventional plastics in India.'
  );

  const hasImage = Boolean(heroConfig.srcDesktop || heroConfig.srcMobile);
  const isPhotoDark = hasImage && heroConfig.heroTheme === 'photo-dark';

  // Scrim opacity calculation (used when hero photo is provided in photo-dark mode)
  const rawStrength = heroConfig.overlayStrength;
  const strengthValue =
    typeof rawStrength === 'number'
      ? Math.min(Math.max(rawStrength, 0.2), 1.0)
      : 0.72;

  const leftOpacity = strengthValue;
  const midOpacity = Number((strengthValue * 0.55).toFixed(2));
  const rightOpacity = Number((strengthValue * 0.14).toFixed(2));

  return (
    <div className="bg-bg text-ink">
      {/* 1. Light-First Hero (with Photo-Dark Scrim Fallback if Configured) */}
      <section
        data-nav-theme={isPhotoDark ? 'dark' : 'light'}
        className={`relative w-full min-h-[85vh] [@supports(height:1svh)]:min-h-[88svh] min-h-[560px] overflow-hidden flex flex-col pt-20 sm:pt-24 nav:pt-28 pb-12 sm:pb-16 lg:pb-20 border-b border-hairline ${
          isPhotoDark ? 'bg-deep text-white' : 'bg-bg text-ink'
        }`}
        aria-labelledby="hero-title"
      >
        {/* Layer A: Full-Bleed Photo (when provided in hero.ts) */}
        {hasImage && (
          <HeroImage
            config={heroConfig}
            className="absolute inset-0 z-0 select-none"
          />
        )}

        {/* Layer B: Dark Gradient Scrim Over Image (only in photo-dark theme for text legibility) */}
        {isPhotoDark && (
          <>
            <div
              className="absolute inset-0 z-10 pointer-events-none select-none"
              style={{
                background: `linear-gradient(to right, rgba(20, 52, 42, ${leftOpacity}) 0%, rgba(20, 52, 42, ${leftOpacity}) var(--gutter), rgba(20, 52, 42, ${midOpacity}) calc(var(--gutter) + min(44vw, 680px)), rgba(20, 52, 42, ${rightOpacity}) 85%, rgba(20, 52, 42, ${rightOpacity * 0.5}) 100%)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-[140px] z-10 pointer-events-none select-none bg-gradient-to-b from-deep/60 via-deep/30 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-56 md:hidden z-10 pointer-events-none select-none bg-gradient-to-t from-deep/85 via-deep/45 to-transparent"
              aria-hidden="true"
            />
          </>
        )}

        {/* Layer C: Light Fallback State (default: gentle mist wash & sage decorative lines) */}
        {!isPhotoDark && (
          <>
            {/* Gentle mist radial wash on the right side */}
            <div
              className="absolute -right-24 sm:-right-12 lg:right-0 top-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] lg:w-[750px] h-[500px] sm:h-[650px] lg:h-[750px] rounded-full bg-mist opacity-80 pointer-events-none blur-3xl z-0"
              aria-hidden="true"
            />

            {/* Hairline sage & primary abstract illustration (fibres flowing into pellets) */}
            <div
              className="absolute -right-12 sm:right-0 lg:right-8 top-1/2 -translate-y-1/2 w-[380px] sm:w-[540px] lg:w-[680px] h-[380px] sm:h-[540px] lg:h-[680px] max-w-full pointer-events-none select-none z-10 opacity-45 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 800 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Microscopic cellulose lattice background grid */}
                <g stroke="var(--color-sage)" strokeWidth="0.75" strokeOpacity="0.3">
                  <path d="M 280 180 L 320 160 L 360 180 L 360 220 L 320 240 L 280 220 Z" />
                  <path d="M 360 180 L 400 160 L 440 180 L 440 220 L 400 240 L 360 220 Z" />
                  <path d="M 320 240 L 360 220 L 400 240 L 400 280 L 360 300 L 320 280 Z" />
                </g>

                {/* Sweeping bagasse plant fibre streams */}
                <path
                  d="M 60 580 C 180 540, 260 420, 380 370 C 460 335, 520 310, 580 310"
                  stroke="var(--color-sage)"
                  strokeWidth="1.25"
                  strokeOpacity="0.7"
                />
                <path
                  d="M 90 630 C 220 590, 290 480, 410 410 C 490 360, 540 330, 600 320"
                  stroke="var(--color-primary)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <path
                  d="M 40 520 C 160 480, 230 360, 350 310 C 430 270, 500 260, 560 270"
                  stroke="var(--color-sage)"
                  strokeWidth="1.25"
                  strokeOpacity="0.65"
                  strokeDasharray="6 4"
                />
                <path
                  d="M 120 660 C 260 620, 340 520, 450 440 C 530 380, 570 340, 620 330"
                  stroke="var(--color-sage)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="4 6"
                />

                {/* Secondary undulating micro-fibrils */}
                <path
                  d="M 180 500 C 260 450, 310 390, 420 350 C 480 330, 530 310, 570 300"
                  stroke="var(--color-primary)"
                  strokeWidth="0.75"
                  strokeOpacity="0.45"
                />
                <path
                  d="M 230 560 C 310 500, 360 430, 460 380 C 510 350, 550 330, 590 320"
                  stroke="var(--color-sage)"
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                />

                {/* Transition nodes along fibres */}
                <circle cx="380" cy="370" r="2.5" fill="var(--color-primary)" fillOpacity="0.6" />
                <circle cx="410" cy="410" r="2" fill="var(--color-sage)" fillOpacity="0.5" />
                <circle cx="350" cy="310" r="2.5" fill="var(--color-primary)" fillOpacity="0.6" />
                <circle cx="460" cy="380" r="2" fill="var(--color-sage)" fillOpacity="0.5" />

                {/* Compounded Pellet Resin Geometries on the right */}
                <rect
                  x="540"
                  y="260"
                  width="130"
                  height="76"
                  rx="38"
                  stroke="var(--color-primary)"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                  fill="var(--color-primary-soft)"
                  fillOpacity="0.5"
                />
                <rect
                  x="556"
                  y="274"
                  width="98"
                  height="48"
                  rx="24"
                  stroke="var(--color-sage)"
                  strokeWidth="0.75"
                  strokeOpacity="0.45"
                  strokeDasharray="3 3"
                />
                <rect
                  x="610"
                  y="360"
                  width="96"
                  height="56"
                  rx="28"
                  transform="rotate(18 610 360)"
                  stroke="var(--color-sage)"
                  strokeWidth="1.25"
                  strokeOpacity="0.6"
                  fill="var(--color-primary-soft)"
                  fillOpacity="0.4"
                />
                <rect
                  x="510"
                  y="200"
                  width="74"
                  height="44"
                  rx="22"
                  transform="rotate(-12 510 200)"
                  stroke="var(--color-primary)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  fill="var(--color-mist)"
                />
                <ellipse
                  cx="605"
                  cy="298"
                  rx="150"
                  ry="95"
                  transform="rotate(-10 605 298)"
                  stroke="var(--color-sage)"
                  strokeWidth="0.75"
                  strokeDasharray="3 6"
                  strokeOpacity="0.35"
                />
              </svg>
            </div>
          </>
        )}

        {/* Layer D: Text & CTAs Content — strictly left-aligned at bottom-left */}
        <div
          className="relative z-20 w-full mt-auto"
          style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
        >
          <div className="w-full">
            {/* In Development Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft border border-hairline/60 text-xs font-mono text-ink mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-warm" aria-hidden="true" />
              <span>In Development</span>
              <span className="text-muted/40">·</span>
              <span>Domestic Biopolymer Resin</span>
              <span className="text-muted/40">·</span>
              <span>India</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink leading-[1.12] mb-8 max-w-[16ch] sm:max-w-[18ch] lg:max-w-[20ch]"
            >
              From India&apos;s sugarcane fields to <span className="italic text-primary font-normal">compostable materials.</span>
            </h1>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/product"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-hover transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span>Explore our product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary hover:bg-primary-soft transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span>Get early access</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative thin sage trace line along the bottom edge */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 pointer-events-none select-none overflow-hidden h-6"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="23"
              x2="1200"
              y2="23"
              stroke="var(--color-sage)"
              strokeWidth="1"
              strokeOpacity="0.45"
            />
            <circle
              cx="600"
              cy="23"
              r="2"
              fill="var(--color-sage)"
              fillOpacity="0.7"
            />
          </svg>
        </div>
      </section>

      {/* 2. Three-Card Teaser Row (Problem, Product, Traceability) */}
      <section
        data-nav-theme="light"
        className="py-24 sm:py-32 bg-surface border-b border-hairline"
        aria-labelledby="architecture-title"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
              Architecture
            </p>
            <h2 id="architecture-title" className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              A purposeful foundation for sustainable packaging.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Problem */}
            <div className="bg-card p-8 border border-hairline rounded-sm flex flex-col justify-between hover:border-primary/40 transition-colors shadow-2xs">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium block mb-3">
                  01 · The Problem
                </span>
                <h3 className="font-serif text-2xl text-ink font-normal mb-3">
                  Feedstock Scale & Import Realities
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  India crushes hundreds of millions of tonnes of sugarcane annually while importing fossil-heavy packaging materials. Explore our sourced market data.
                </p>
              </div>
              <Link
                to="/problem"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors pt-4 border-t border-hairline"
              >
                <span>Examine the numbers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Product */}
            <div className="bg-card p-8 border border-hairline rounded-sm flex flex-col justify-between hover:border-primary/40 transition-colors shadow-2xs">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium block mb-3">
                  02 · The Material
                </span>
                <h3 className="font-serif text-2xl text-ink font-normal mb-3">
                  Bio-Based Pellet Resin
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Compostable biopolymer pellets engineered to process on standard packaging conversion equipment for films and thermoformed containers.
                </p>
              </div>
              <Link
                to="/product"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors pt-4 border-t border-hairline"
              >
                <span>View material targets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Traceability */}
            <div className="bg-card p-8 border border-hairline rounded-sm flex flex-col justify-between hover:border-primary/40 transition-colors shadow-2xs">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium block mb-3">
                  03 · Sourcing
                </span>
                <h3 className="font-serif text-2xl text-ink font-normal mb-3">
                  Batch-Level Traceability
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Planned material origin tracking from the regional cane crushing cluster to finished resin delivery records.
                </p>
              </div>
              <Link
                to="/traceability"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors pt-4 border-t border-hairline"
              >
                <span>Explore traceability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Short "Where We Are" Bridge to Company */}
      <section
        data-nav-theme="light"
        className="py-20 sm:py-24 bg-mist/60 border-b border-hairline"
        aria-labelledby="status-title"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink mb-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span id="status-title">Current Development Status</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl text-ink font-normal leading-snug">
                Currently in Phase 02 (Lab Validation). We share characterization data and testing protocols with qualified partners on request.
              </p>
            </div>
            <Link
              to="/company"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink border border-hairline bg-card hover:border-ink transition-colors rounded-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>View roadmap & team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Early-Access Closing Panel — THE SINGLE DELIBERATE DEEP BAND */}
      <section
        data-nav-theme="dark"
        className="py-24 sm:py-32 bg-bg"
        aria-labelledby="closing-cta-title"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-deep text-white rounded-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-deep shadow-sm">
            {/* Sage trace line accent */}
            <div className="absolute top-0 inset-x-0 h-1 overflow-hidden" aria-hidden="true">
              <svg viewBox="0 0 1000 4" fill="none" className="w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="2" x2="1000" y2="2" stroke="var(--color-sage)" strokeWidth="1" strokeOpacity="0.4" />
              </svg>
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-sage block mb-2">
                Partnership Runway
              </span>
              <h2 id="closing-cta-title" className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                Join our pilot sample testing cohort.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Whether you manufacture packaging films, manage brand sustainability goals, or research bio-based materials, connect with us to evaluate sample compounding runs.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-deep bg-white hover:bg-mist transition-colors rounded-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Register interest</span>
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
