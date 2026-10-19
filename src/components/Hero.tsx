import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { TraceLine } from './TraceLine.tsx';

interface HeroProps {
  onOpenEarlyAccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section
      data-nav-theme="light"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 bg-bg text-ink overflow-hidden border-b border-hairline"
      aria-labelledby="hero-heading"
    >
      {/* Gentle mist radial wash on the right side */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-mist opacity-80 pointer-events-none blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-36 -left-36 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-mist opacity-60 pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        {/* Status indicator chip */}
        <div className="inline-flex items-center gap-2 mb-8 text-xs font-mono tracking-widest uppercase text-ink px-3 py-1 rounded-full bg-primary-soft border border-hairline/60">
          <span className="w-2 h-2 rounded-full bg-warm animate-pulse" aria-hidden="true" />
          <span>Deep-Tech Materials</span>
          <span className="text-muted/40" aria-hidden="true">·</span>
          <span>In development</span>
          <span className="text-muted/40" aria-hidden="true">·</span>
          <span>India</span>
        </div>

        {/* Hero Headline */}
        <h1
          id="hero-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink max-w-4xl leading-[1.15] mb-6"
        >
          From India&apos;s sugarcane fields to <span className="italic text-primary font-normal">compostable materials.</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-xl text-muted max-w-2xl font-light leading-relaxed mb-10">
          EcoTrace is developing a domestically produced, bio-based polymer made from agricultural waste, designed to offer a compostable alternative to conventional plastics.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-all rounded-xs shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]"
          >
            <span>Get early access</span>
            <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <a
            href="#approach"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-primary hover:bg-primary-soft transition-colors rounded-xs border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>Explore our product</span>
            <ArrowDown className="w-4 h-4 text-primary" aria-hidden="true" />
          </a>
        </div>

        {/* Animated continuous trace-line motif */}
        <div className="w-full mt-12 max-w-3xl">
          <TraceLine variant="hero" />
        </div>
      </div>
    </section>
  );
};
