import React from 'react';

interface TraceLineProps {
  className?: string;
  variant?: 'horizontal' | 'divider' | 'hero';
}

export const TraceLine: React.FC<TraceLineProps> = ({ className = '', variant = 'horizontal' }) => {
  if (variant === 'hero') {
    return (
      <div className={`relative pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Hairline sage trace line with subtle connecting loop */}
          <path
            d="M 0 50 L 420 50 Q 480 50 510 30 Q 540 10 600 10 Q 660 10 690 30 Q 720 50 780 50 L 1200 50"
            stroke="var(--color-sage)"
            strokeWidth="1"
            className="opacity-70"
          />
          {/* Subtle trace node */}
          <circle cx="600" cy="10" r="2.5" fill="var(--color-sage)" className="opacity-80" />
        </svg>
      </div>
    );
  }

  // Divider variant
  return (
    <div className={`w-full flex items-center justify-center my-12 pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-full max-w-5xl h-[1px] bg-hairline relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-sage" />
      </div>
    </div>
  );
};
