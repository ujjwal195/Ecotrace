import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta.ts';

export const NotFoundPage: React.FC = () => {
  usePageMeta(
    'Page Not Found | EcoTrace',
    'The requested URL does not exist or has been moved.'
  );

  return (
    <div data-nav-theme="light" className="bg-bg text-ink py-28 sm:py-36 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-3">
          Error 404
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink font-normal mb-4">
          Page Not Found
        </h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          The link you followed does not exist or has been moved. Explore our bio-based polymer development from the homepage.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary-hover transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Home className="w-3.5 h-3.5 text-white" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
