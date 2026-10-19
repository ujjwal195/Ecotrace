import React, { Component, ErrorInfo, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LeoMascot } from './LeoMascot.tsx';
import { launcherBottomDesktop, launcherSideDesktop } from '../config/leo.ts';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

interface State {
  hasError: boolean;
}

export class LeoErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (typeof console !== 'undefined') {
      console.error('[Leo ErrorBoundary caught error]:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <aside
          role="dialog"
          aria-label="Chat with Leo"
          className="fixed z-[60] bg-card border border-hairline shadow-xl flex flex-col overflow-hidden text-ink
            inset-0 sm:inset-auto sm:rounded-2xl sm:w-[390px] sm:h-[620px] sm:max-h-[82svh]"
          style={{
            bottom: typeof window !== 'undefined' && window.innerWidth >= 640
              ? `calc(env(safe-area-inset-bottom, 0px) + ${launcherBottomDesktop}px)`
              : '0',
            right: typeof window !== 'undefined' && window.innerWidth >= 640
              ? `calc(env(safe-area-inset-right, 0px) + ${launcherSideDesktop}px)`
              : '0',
          }}
        >
          {/* Header */}
          <header className="bg-bg border-b border-hairline px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface border border-hairline overflow-hidden shrink-0 flex items-center justify-center">
                <LeoMascot pose="rest" size={40} className="pointer-events-none" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-normal text-ink leading-tight">Leo</h2>
                <p className="text-xs text-muted leading-tight mt-0.5">AI assistant for EcoTrace</p>
              </div>
            </div>

            <button
              type="button"
              onClick={this.props.onClose}
              aria-label="Close chat"
              className="p-2 text-muted hover:text-ink rounded-lg hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </header>

          {/* Unavailable Body */}
          <div className="flex-1 bg-bg flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <LeoMascot pose="rest" size={96} className="pointer-events-none" />
            </div>
            <p className="text-[15px] leading-[1.6] text-ink max-w-[280px] mb-6">
              Leo isn't available right now. Please use our Contact page.
            </p>
            <Link
              to="/contact"
              onClick={this.props.onClose}
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Contact page
            </Link>
          </div>
        </aside>
      );
    }

    return this.props.children;
  }
}
