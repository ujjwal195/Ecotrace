import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ExternalLink, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';
import { stats, Stat } from '../data/stats.ts';

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

    const duration = 1200;
    let animationFrameId: number;

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
        className="font-serif text-3xl sm:text-4xl font-normal text-ink tracking-tight tabular-nums"
        aria-label={`${value} ${unit}`}
      >
        <span>{displayValue}</span>
        {unit && <span className="text-xs font-mono text-muted ml-2">{unit}</span>}
      </div>
      {secondaryValue && (
        <div className="text-xs font-mono text-muted mt-0.5 tabular-nums">
          {secondaryValue}
        </div>
      )}
      <noscript>
        <div className="font-serif text-3xl font-normal text-ink tabular-nums">
          {value} {unit} {secondaryValue ? `(${secondaryValue})` : ''}
        </div>
      </noscript>
    </div>
  );
};

export const ProblemPage: React.FC = () => {
  usePageMeta(
    'The Problem | Sourced Market Data & Feedstock Scale',
    'Examine sourced benchmarks on India’s plastic packaging waste and sugarcane bagasse feedstock scale driving domestic biopolymer development.'
  );

  const [hasViewed, setHasViewed] = useState(false);
  const [readDataOpen, setReadDataOpen] = useState(false);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const isDev = import.meta.env.DEV;

  const validStats = stats.filter(isValidStat);

  const latestLastVerified = validStats.reduce((latest, curr) => {
    return curr.lastVerified > latest ? curr.lastVerified : latest;
  }, validStats[0]?.lastVerified || '2026-10-14');

  useEffect(() => {
    if (!statsContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(statsContainerRef.current);
    return () => observer.disconnect();
  }, [hasViewed]);

  return (
    <div data-nav-theme="light" className="bg-bg text-ink pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
            01 · Context & Sourced Benchmarks
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-ink mb-6 leading-tight">
            The problem, in numbers.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            India generates tens of millions of tonnes of agricultural residue every crushing season while relying almost
            exclusively on imported bio-resins and fossil plastics. Domestic biopolymer production bridges agricultural
            carbon with circular packaging requirements.
          </p>
        </div>

        {/* Narrative Context: Two Core Realities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-card p-8 border border-hairline rounded-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-3">
              Feedstock Reality
            </span>
            <h2 className="font-serif text-2xl text-ink font-normal mb-3">
              Agricultural Residue Scale
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Sugarcane mills produce immense volumes of bagasse fiber as an agricultural by-product of cane crushing.
              Bagasse represents an abundant agricultural carbon resource that can be converted into bio-based polymers without competing with food crops.
            </p>
          </div>

          <div className="bg-card p-8 border border-hairline rounded-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-3">
              Supply Vulnerability
            </span>
            <h2 className="font-serif text-2xl text-ink font-normal mb-3">
              Import Bottlenecks & Freight
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Advanced biodegradable polymers are currently imported overseas at significant tariff and shipping premiums.
              Indian packaging converters face unpredictable delivery timelines, foreign exchange exposure, and limited local compounding support.
            </p>
          </div>
        </div>

        {/* The Problem, in numbers */}
        <div ref={statsContainerRef} id="market-data" className="mb-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-hairline">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" aria-hidden="true" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-semibold">
                Sourced Market Benchmarks
              </h2>
            </div>
            <div className="text-xs text-muted font-mono">
              Last verified: {latestLastVerified}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {validStats.map((item) => {
              const isItemUnverified = !item.verified || !item.sourceUrl.startsWith('http');
              const showDevWarning = isDev && isItemUnverified;
              const hasExternalLink = item.sourceUrl && item.sourceUrl.startsWith('http');

              return (
                <div
                  key={item.id}
                  className={`bg-card p-8 border rounded-sm flex flex-col justify-between h-full relative ${
                    showDevWarning ? 'border-dashed border-primary' : 'border-hairline'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                        {item.eyebrow}
                      </span>
                      {showDevWarning && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface border border-hairline text-muted font-semibold">
                          UNVERIFIED
                        </span>
                      )}
                    </div>

                    {item.value && (
                      <AnimatedValue
                        value={item.value}
                        unit={item.unit}
                        secondaryValue={item.secondaryValue}
                        inView={hasViewed}
                      />
                    )}

                    <h3 className="font-serif text-xl font-normal text-ink mb-3 leading-snug">
                      {item.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.note && (
                      <p className="text-[11px] text-muted italic mb-4">
                        Note: {item.note}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-hairline mt-auto">
                    <div className="text-[11px] font-mono text-muted flex items-center justify-between gap-2 mb-1.5">
                      <span>Reported {item.year}</span>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 text-primary font-sans text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Verified
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
                          className="text-ink hover:text-primary underline decoration-dotted inline-flex items-center gap-1 transition-colors"
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
          <div className="mt-8 bg-surface border border-hairline rounded-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setReadDataOpen(!readDataOpen)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-expanded={readDataOpen}
            >
              <span className="text-xs font-mono uppercase tracking-widest text-ink font-medium">
                How to read this data
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted transition-transform duration-200 ${
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

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 border border-hairline bg-card rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl text-ink font-normal mb-2">
              Explore how we address this challenge.
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Review our bio-based polymer pellet format and intended packaging applications.
            </p>
          </div>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-hover transition-colors rounded-xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>View our product</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
