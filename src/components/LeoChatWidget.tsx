import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  LEO_ENDPOINT,
  launcherBottomMobile,
  launcherSideMobile,
  launcherBottomDesktop,
  launcherSideDesktop,
} from '../config/leo.ts';
import { LEO_POSE_SRC } from '../config/leoMoods.ts';
import { SagePawFallback } from './LeoMascot.tsx';
import { LeoErrorBoundary } from './LeoErrorBoundary.tsx';

const LazyLeoChatDialog = React.lazy(() => import('./LeoChatDialog.tsx'));

const PAGE_NUDGES: Record<string, string> = {
  '/': 'Ask Leo about EcoTrace',
  '/problem': 'Want these numbers explained?',
  '/product': "Questions about what we're building?",
  '/process': 'Curious how it works at a high level?',
  '/traceability': 'Ask me about traceability',
  '/company': 'Want to know about the team or roadmap?',
  '/contact': 'Not sure how to reach us? Ask me.',
};

// Safe sessionStorage helper with try/catch
const storage = {
  get: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return sessionStorage.getItem(key);
      }
    } catch {
      // safe fallback
    }
    return null;
  },
  set: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(key, value);
      }
    } catch {
      // quota or security restriction fallback
    }
  },
};

// Cookie-free analytics event dispatcher (safe no-op if analytics disabled)
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('ecotrace_analytics', {
          detail: { event: eventName, ...data, timestamp: Date.now() },
        })
      );
    } catch {
      // safe fallback
    }
  }
};

export const LeoChatWidget: React.FC = () => {
  const location = useLocation();

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [launcherImageError, setLauncherImageError] = useState(false);

  // Responsive state for mobile layout (< 640px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  // Nudge banner state
  const [showNudge, setShowNudge] = useState(false);
  const nudgeDismissedRef = useRef(false);

  // DOM Refs
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Handle client hydration & resize
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // In-app browsers feature detection: requestIdleCallback with 1200ms fallback to preload lazy dialog chunk
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scheduleIdle =
      'requestIdleCallback' in window
        ? (window as any).requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1200);

    const idleHandle = scheduleIdle(() => {
      import('./LeoChatDialog.tsx').catch(() => {
        // Prefetch errors gracefully handled on open
      });
    });

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && typeof idleHandle === 'number') {
        (window as any).cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  // Track if mobile nav menu is open (hide launcher while menu is open, return on close and route change)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkMobileMenu = () => {
      const hasAttr = document.body.getAttribute('data-mobile-menu-open') === 'true';
      const panel = document.getElementById('mobile-menu-panel');
      const isVisible =
        panel &&
        panel.classList.contains('opacity-100') &&
        window.innerWidth < 900;
      setIsMobileMenuOpen(Boolean(hasAttr || isVisible));
    };

    checkMobileMenu();

    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-mobile-menu-open'] });

    const interval = setInterval(checkMobileMenu, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Return launcher on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Page-aware nudge after 8s on a page
  useEffect(() => {
    const hasNudgedSession = storage.get('ecotrace_leo_nudge_shown');
    if (hasNudgedSession || isOpen || nudgeDismissedRef.current) return;

    const timer = setTimeout(() => {
      if (!isOpen && !nudgeDismissedRef.current && !storage.get('ecotrace_leo_nudge_shown')) {
        setShowNudge(true);
        storage.set('ecotrace_leo_nudge_shown', 'true');
        trackEvent('leo_nudge_shown', { page: location.pathname });

        setTimeout(() => {
          setShowNudge(false);
        }, 7000);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [location.pathname, isOpen]);

  // Keyboard shortcut: pressing "/" opens chat; Esc closes
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !(document.activeElement as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setIsOpen(true);
        trackEvent('leo_opened', { via: 'slash_shortcut' });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Production-safe diagnostic: if URL contains ?leo-debug=1, log rendering status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('leo-debug') === '1') {
          const isVisible = !isOpen && !isMobileMenuOpen;
          let preventReason: string | null = null;
          if (isOpen) {
            preventReason = 'Chat panel is currently open (isOpen=true)';
          } else if (isMobileMenuOpen) {
            preventReason = 'Mobile navigation menu is open (isMobileMenuOpen=true)';
          } else if (!isMounted) {
            preventReason = 'Component not mounted yet (isMounted=false)';
          }

          console.log('[Leo Debug Diagnostic]', {
            isMounted,
            isOpen,
            isMobileMenuOpen,
            isProd: import.meta.env.PROD,
            isEndpointConfigured: Boolean(LEO_ENDPOINT && LEO_ENDPOINT.trim() !== ''),
            isLauncherVisible: isVisible,
            preventReason: preventReason || 'None (Launcher is rendering normally)',
            screen: {
              width: window.innerWidth,
              height: window.innerHeight,
              isMobile,
            },
            offsets: {
              mobile: { bottom: launcherBottomMobile, side: launcherSideMobile },
              desktop: { bottom: launcherBottomDesktop, side: launcherSideDesktop },
            },
            portalContainer: document.body ? 'document.body available' : 'missing',
          });
        }
      } catch (err) {
        console.warn('[Leo Debug Diagnostic Error]', err);
      }
    }
  }, [isMounted, isOpen, isMobileMenuOpen, isMobile]);

  if (!isMounted || typeof document === 'undefined') {
    return null;
  }

  const currentNudgeText = PAGE_NUDGES[location.pathname] || 'Ask Leo about EcoTrace';

  // Compute fixed position offsets using tunable constants without vh, vw, or --gutter
  const positionStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        zIndex: 60,
        right: `calc(env(safe-area-inset-right, 0px) + ${launcherSideMobile}px)`,
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${launcherBottomMobile}px)`,
      }
    : {
        position: 'fixed',
        zIndex: 60,
        right: `${launcherSideDesktop}px`,
        bottom: `${launcherBottomDesktop}px`,
      };

  return createPortal(
    <>
      {/* 1. Floating Launcher & Relative Nudge Speech Bubble */}
      {!isOpen && !isMobileMenuOpen && (
        <div style={positionStyle} className="pointer-events-none select-none">
          {/* Nudge Bubble: Positioned relative to launcher, max-width calc(100vw - 96px) to prevent edge clipping */}
          {showNudge && (
            <div
              role="status"
              className="pointer-events-auto absolute bottom-[calc(100%+12px)] right-0 bg-card text-ink border border-hairline rounded-xl p-3 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
              style={{
                maxWidth: 'calc(100vw - 96px)',
                width: 'max-content',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setShowNudge(false);
                  nudgeDismissedRef.current = true;
                }}
                className="text-left text-sm text-ink font-medium hover:text-primary transition-colors focus-visible:outline-none"
              >
                {currentNudgeText}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNudge(false);
                  nudgeDismissedRef.current = true;
                }}
                aria-label="Dismiss message"
                className="text-muted hover:text-ink p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Launcher Button: 56px on mobile, 64px on desktop, never collapses */}
          <button
            ref={launcherRef}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Chat with Leo, the EcoTrace AI assistant"
            aria-expanded={isOpen}
            aria-controls="leo-chat-dialog"
            className="pointer-events-auto relative w-[56px] h-[56px] min-w-[56px] min-h-[56px] sm:w-[64px] sm:h-[64px] sm:min-w-[64px] sm:min-h-[64px] rounded-2xl bg-[#14342A] text-white shadow-lg overflow-hidden border border-hairline flex items-center justify-center leo-launcher-interactive leo-stage-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg shrink-0"
          >
            {!launcherImageError ? (
              <img
                src={LEO_POSE_SRC.launcher}
                alt=""
                aria-hidden="true"
                onError={() => setLauncherImageError(true)}
                className="w-full h-full object-cover scale-[1.18] object-center select-none pointer-events-none"
                loading="eager"
              />
            ) : (
              <SagePawFallback size={32} className="w-8 h-8 text-primary" />
            )}
          </button>
        </div>
      )}

      {/* 2. Chat Dialog Panel: Lazy loaded inside ErrorBoundary & Suspense */}
      {isOpen && (
        <LeoErrorBoundary onClose={() => setIsOpen(false)}>
          <React.Suspense
            fallback={
              <aside
                role="dialog"
                aria-label="Loading chat"
                className="fixed z-[60] bg-card border border-hairline shadow-xl flex flex-col items-center justify-center text-ink inset-0 sm:inset-auto sm:rounded-2xl sm:w-[390px] sm:h-[620px] sm:max-h-[82svh]"
                style={{
                  bottom: isMobile ? '0' : `${launcherBottomDesktop}px`,
                  right: isMobile ? '0' : `${launcherSideDesktop}px`,
                }}
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-3" />
                <p className="text-xs text-muted font-medium">Opening Leo...</p>
              </aside>
            }
          >
            <LazyLeoChatDialog
              onClose={() => {
                setIsOpen(false);
                launcherRef.current?.focus();
              }}
            />
          </React.Suspense>
        </LeoErrorBoundary>
      )}
    </>,
    document.body
  );
};
