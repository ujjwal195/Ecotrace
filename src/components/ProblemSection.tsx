import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Ship, Flame, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';
import { stats, Stat } from '../data/stats.ts';

// Cookie-free analytics event dispatcher
function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(eventName, { detail: params });
    window.dispatchEvent(event);
    if ((window as unknown as { plausible?: (name: string, opts?: { props?: Record<string, string> }) => void }).plausible) {
      (window as unknown as { plausible: (name: string, opts?: { props?: Record<string, string> }) => void }).plausible(eventName, { props: params });
    }
  }
}

// Validator to ensure no undefined or NaN values are rendered
function isValidStat(s: unknown): s is Stat {
  if (!s || typeof s !== 'object') return false;
  const item = s as Record<string, unknown>;
  const requiredFields = [
    'id',
    'eyebrow',
    'headline',
    'description',
    'year',
    'sourceName',
    'sourceUrl',
    'lastVerified',
    'verified',
  ];
  for (const field of requiredFields) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      return false;
    }
  }
  return true;
}

// Animated Stat Counter component respecting prefers-reduced-motion
const AnimatedValue: React.FC<{
  value: string;
  unit: string;
  secondaryValue?: string;
  inView: boolean;
}> = ({ value, unit, secondaryValue, inView }) => {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const isReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    if (!inView || isReducedMotion.current || !value) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // ms
    let animationFrameId: number;

    // Check if range like "75–100"
    if (value.includes('–')) {
      const parts = value.split('–').map((p) => parseFloat(p.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const [minVal, maxVal] = parts;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentMin = Math.round(minVal * easeProgress);
          const currentMax = Math.round(maxVal * easeProgress);
          setDisplayValue(`${currentMin}–${currentMax}`);
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setDisplayValue(value);
          }
        };
        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
      }
    }

    // Check if lakh number like "34.69 lakh"
    if (value.includes('lakh')) {
      const numPart = parseFloat(value.replace(/[^0-9.]/g, ''));
      if (!isNaN(numPart)) {
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = (numPart * easeProgress).toFixed(2);
          setDisplayValue(`${current} lakh`);
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            setDisplayValue(value);
          }
        };
        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
      }
    }

    setDisplayValue(value);
  }, [inView, value]);

  if (!value) return null;

  return (
    <div className="mb-4">
      <div
        className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight tabular-nums"
        aria-label={`${value} ${unit}`}
      >
        <span>{displayValue}</span>
        {unit && <span className="text-sm font-sans font-normal text-muted ml-2">{unit}</span>}
      </div>
      {secondaryValue && (
        <div className="text-xs font-mono text-muted mt-0.5 tabular-nums">
          {secondaryValue}
        </div>
      )}
      <noscript>
        <div className="font-serif text-3xl font-semibold text-ink tabular-nums">
          {value} {unit} {secondaryValue ? `(${secondaryValue})` : ''}
        </div>
      </noscript>
    </div>
  );
};

export const ProblemSection: React.FC = () => {
  const [hasViewed, setHasViewed] = useState(false);
  const [readDataOpen, setReadDataOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isDev = import.meta.env.DEV;

  // Filter valid stats objects
  const validStats = stats.filter(isValidStat);

  // Compute latest verification date
  const latestLastVerified = validStats.reduce((latest, curr) => {
    return curr.lastVerified > latest ? curr.lastVerified : latest;
  }, validStats[0]?.lastVerified || '2026-10-14');

  // Trigger market_data_viewed analytics on scroll entry
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
          trackEvent('market_data_viewed');
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasViewed]);

  const handleSourceClick = (statId: string) => {
    trackEvent('stat_source_clicked', { stat_id: statId });
  };

  return (
    <section
      ref={sectionRef}
      id="problem"
      data-nav-theme="light"
      className="py-24 bg-surface text-ink relative scroll-mt-16"
      aria-labelledby="problem-heading"
    >
      {/* Anchor for direct market data navigation */}
      <div id="market-data" className="absolute -top-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            01. The Challenge
          </p>
          <h2
            id="problem-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink leading-[1.2] mb-6"
          >
            Why India needs a domestic biopolymer alternative.
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            India generates millions of tons of agricultural residue every harvest season while remaining critically dependent
            on fossil-fuel petroleum polymers and expensive imported bio-resins that often require industrial high-heat facilities.
          </p>
        </div>

        {/* Narrative Grid: Two core friction points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card p-8 rounded-xl border border-hairline shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-5">
                <Flame className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink mb-3">
                Agricultural Residue Dilemma
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Sugarcane mills produce immense volumes of bagasse fiber as an agricultural by-product of cane crushing.
                Bagasse represents an abundant agricultural carbon resource that can be converted into bio-based polymers.
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl border border-hairline shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center text-primary mb-5">
                <Ship className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink mb-3">
                Import Bottleneck & Supply Vulnerability
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Currently, advanced biodegradable polymers must largely be imported from overseas at significant
                freight and tariff costs. Indian packaging converters have few reliable domestic sources of compostable resin.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-section: The problem, in numbers */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" aria-hidden="true" />
              <h3 id="market-data-heading" className="text-sm font-semibold text-ink uppercase tracking-wider font-mono">
                The problem, in numbers
              </h3>
            </div>
            <div className="text-xs text-muted font-mono">
              Last verified: {latestLastVerified}
            </div>
          </div>

          {/* Cards Grid: Rendered strictly from stats array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {validStats.map((item) => {
              const isItemUnverified = !item.verified || !item.sourceUrl.startsWith('http');
              const showDevWarning = isDev && isItemUnverified;
              const hasExternalLink = item.sourceUrl && item.sourceUrl.startsWith('http');

              return (
                <div
                  key={item.id}
                  className={`bg-card p-7 rounded-xl flex flex-col justify-between h-full shadow-2xs transition-all relative ${
                    showDevWarning
                      ? 'border-2 border-dashed border-primary/80'
                      : 'border border-hairline hover:border-primary/40'
                  }`}
                >
                  {/* Top content */}
                  <div>
                    {/* Header line with Eyebrow & Dev Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                        {item.eyebrow}
                      </span>
                      {showDevWarning && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary-soft text-ink border border-hairline font-bold shrink-0">
                          UNVERIFIED
                        </span>
                      )}
                    </div>

                    {/* Numeric Value (if present) */}
                    {item.value && (
                      <AnimatedValue
                        value={item.value}
                        unit={item.unit}
                        secondaryValue={item.secondaryValue}
                        inView={hasViewed}
                      />
                    )}

                    {/* Headline */}
                    <h4 className="font-serif text-lg sm:text-xl font-normal text-ink mb-3 leading-snug">
                      {item.headline}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Note (optional) */}
                    {item.note && (
                      <p className="text-[11px] text-muted italic mb-4">
                        Note: {item.note}
                      </p>
                    )}
                  </div>

                  {/* Bottom pinned source block */}
                  <div className="pt-4 border-t border-hairline mt-auto">
                    <div className="text-[11px] font-mono text-muted flex items-center justify-between gap-2 mb-1.5">
                      <span>Reported {item.year}</span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-primary font-sans text-[10px]">
                          <CheckCircle2 className="w-3 h-3 text-primary" /> Verified
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] font-mono leading-relaxed text-muted">
                      Source:{' '}
                      {hasExternalLink ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleSourceClick(item.id)}
                          className="text-primary hover:underline decoration-dotted inline-flex items-center gap-1 font-medium transition-colors"
                        >
                          <span>{item.sourceName}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-ink font-medium">{item.sourceName}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expandable Disclosure: How to read this data */}
          <div className="mt-8 bg-card border border-hairline rounded-xl overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setReadDataOpen(!readDataOpen)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-expanded={readDataOpen}
            >
              <span className="text-xs font-semibold text-ink uppercase tracking-wider font-mono">
                How to read this data
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform duration-200 ${
                  readDataOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {readDataOpen && (
              <div className="px-6 pb-5 pt-1 text-xs text-muted leading-relaxed border-t border-hairline">
                <p className="mb-2">
                  Figures presented above are compiled directly from public government databases, parliamentary replies,
                  and official regulatory reports. Some figures are self-reported by regional pollution control bodies or
                  estimated based on annual milling statistics.
                </p>
                <p>
                  We audit and update these benchmarks periodically as updated annual reports from official agencies are gazetted.
                  If you have verified source documentation or updated data, please reach out via our contact channels.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
