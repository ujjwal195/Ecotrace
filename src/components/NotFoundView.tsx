import React from 'react';
import { Home } from 'lucide-react';

interface NotFoundViewProps {
  onReturnHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="max-w-md w-full text-center relative z-10 bg-card border border-hairline p-8 rounded-2xl shadow-xl">
        <div className="w-16 h-16 rounded-xl bg-mist border border-hairline mx-auto mb-6 flex items-center justify-center p-2">
          <img
            src="/favicon.svg"
            alt="EcoTrace emblem"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="font-serif tracking-widest text-muted text-xs font-semibold mb-2 uppercase">
          EcoTrace
        </div>

        <h1 className="font-serif text-5xl font-normal text-ink mb-3">404</h1>
        <h2 className="font-serif text-xl font-normal text-ink mb-4">
          Page Not Found
        </h2>
        <p className="text-xs sm:text-sm text-muted leading-relaxed mb-8">
          The requested URL does not exist or has been moved. Explore our compostable biopolymer development on the homepage.
        </p>

        <button
          onClick={onReturnHome}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors rounded-xs shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Home className="w-4 h-4" />
          <span>Return to EcoTrace Home</span>
        </button>
      </div>
    </div>
  );
};
