import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useNavTheme } from '../hooks/useNavTheme.ts';

interface NavLinkItem {
  name: string;
  path: string;
}

interface DesktopNavProps {
  navLinks: NavLinkItem[];
  isActive: (path: string) => boolean;
  isEffectiveDark: boolean;
}

interface MobileNavProps {
  navLinks: NavLinkItem[];
  isActive: (path: string) => boolean;
  isEffectiveDark: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * DesktopNav: horizontal nav visible ONLY at widths >= 900px (nav breakpoint).
 * Logo on the far left; all 7 nav links and "Get early access" button grouped
 * on the far right in a single horizontal row (nowrap). No menu icon or kebab button.
 */
export const DesktopNav: React.FC<DesktopNavProps> = ({
  navLinks,
  isActive,
  isEffectiveDark,
}) => {
  return (
    <div
      className="hidden nav:flex items-center justify-between w-full h-full gap-[clamp(24px,3vw,32px)]"
      style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
    >
      {/* Logo on the far left (links to Home) */}
      <Link
        to="/"
        className={`inline-flex items-center shrink-0 rounded-xs focus-visible:outline-none focus-visible:ring-2 ${
          isEffectiveDark ? 'focus-visible:ring-sage' : 'focus-visible:ring-primary'
        }`}
        aria-label="EcoTrace home"
      >
        {/* TODO: Replace /public/logo.png with a transparent PNG or SVG of the mark and wordmark (white on transparent) so it can be recoloured. */}
        {isEffectiveDark ? (
          <img
            src="/logo.png"
            alt="EcoTrace"
            className="h-[24px] nav:h-[26px] w-auto max-w-[180px] nav:max-w-[210px] object-contain transition-opacity duration-200 motion-reduce:transition-none"
            loading="eager"
          />
        ) : (
          <span
            role="img"
            aria-label="EcoTrace"
            className="inline-block h-[24px] nav:h-[26px] aspect-[1003/153] bg-ink transition-colors duration-200 motion-reduce:transition-none"
            style={{
              maskImage: 'url(/logo.png)',
              WebkitMaskImage: 'url(/logo.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'left center',
              WebkitMaskPosition: 'left center',
            }}
          />
        )}
      </Link>

      {/* Nav items grouped together on the far right in one horizontal row */}
      <nav
        aria-label="Primary"
        className="flex items-center gap-[clamp(10px,1.2vw,24px)] text-[clamp(13px,1.05vw,14px)] font-medium shrink-0 whitespace-nowrap"
      >
        {navLinks.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              aria-current={active ? 'page' : undefined}
              className={`relative min-h-[44px] inline-flex items-center py-1 tracking-wide whitespace-nowrap transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 rounded-xs ${
                isEffectiveDark
                  ? active
                    ? 'text-white font-semibold focus-visible:ring-sage'
                    : 'text-white/80 hover:text-white focus-visible:ring-sage'
                  : active
                    ? 'text-ink font-semibold focus-visible:ring-primary'
                    : 'text-muted hover:text-ink focus-visible:ring-primary'
              }`}
            >
              <span>{link.name}</span>
              {active && (
                <span
                  className={`absolute bottom-2 left-0 right-0 h-[2px] pointer-events-none ${
                    isEffectiveDark ? 'bg-sage' : 'bg-primary'
                  }`}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}

        {/* "Get early access" button grouped at far right */}
        <Link
          to="/contact"
          className={`inline-flex items-center gap-1.5 px-[clamp(10px,1vw,16px)] py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap min-h-[38px] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 ${
            isEffectiveDark
              ? 'bg-white text-deep hover:bg-mist focus-visible:ring-sage'
              : 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary'
          }`}
        >
          <span>Get early access</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
};

/**
 * MobileNav: mobile nav visible ONLY at widths < 900px.
 * Logo on the left and three-dot kebab button on the right.
 * Contains solid opaque slide-down menu panel. No horizontal link row.
 */
export const MobileNav: React.FC<MobileNavProps> = ({
  navLinks,
  isActive,
  isEffectiveDark,
  isMenuOpen,
  setIsMenuOpen,
  menuButtonRef,
}) => {
  return (
    <div
      className="flex nav:hidden items-center justify-between w-full h-full gap-4"
      style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
    >
      {/* Logo on the left (links to Home) */}
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className={`inline-flex items-center shrink-0 rounded-xs focus-visible:outline-none focus-visible:ring-2 ${
          isEffectiveDark && !isMenuOpen ? 'focus-visible:ring-sage' : 'focus-visible:ring-primary'
        }`}
        aria-label="EcoTrace home"
      >
        {/* TODO: Replace /public/logo.png with a transparent PNG or SVG of the mark and wordmark (white on transparent) so it can be recoloured. */}
        {isEffectiveDark && !isMenuOpen ? (
          <img
            src="/logo.png"
            alt="EcoTrace"
            className="h-[22px] w-auto max-w-[160px] object-contain transition-opacity duration-200 motion-reduce:transition-none"
            loading="eager"
          />
        ) : (
          <span
            role="img"
            aria-label="EcoTrace"
            className="inline-block h-[22px] aspect-[1003/153] bg-ink transition-colors duration-200 motion-reduce:transition-none"
            style={{
              maskImage: 'url(/logo.png)',
              WebkitMaskImage: 'url(/logo.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'left center',
              WebkitMaskPosition: 'left center',
            }}
          />
        )}
      </Link>

      {/* Three-dot (kebab) menu button on the right */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu-panel"
        aria-haspopup="true"
        className={`min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xs transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 ${
          isEffectiveDark && !isMenuOpen
            ? 'text-white focus-visible:ring-sage hover:bg-white/10'
            : 'text-ink focus-visible:ring-primary hover:bg-surface'
        }`}
      >
        <span className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
          {/* Vertical three-dot icon: roughly 4px dots (r=2) stacked vertically */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`absolute inset-0 w-6 h-6 transition-all duration-150 motion-reduce:transition-none ${
              isMenuOpen
                ? 'opacity-0 scale-75 rotate-90'
                : 'opacity-100 scale-100 rotate-0'
            }`}
            aria-hidden="true"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>

          {/* Close "X" icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 w-6 h-6 transition-all duration-150 motion-reduce:transition-none ${
              isMenuOpen
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-75 -rotate-90'
            }`}
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </button>

      {/* Solid Opaque Mobile Menu Panel (< 900px) */}
      <div
        id="mobile-menu-panel"
        role="region"
        aria-label="Mobile Navigation"
        className={`nav:hidden absolute top-full left-0 right-0 w-full bg-bg border-b border-hairline shadow-xl transition-all duration-200 ease-out motion-reduce:transition-none ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <nav aria-label="Mobile Primary" className="flex flex-col w-full">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
                className={`relative flex items-center min-h-[52px] h-[54px] border-b border-hairline text-[18px] sm:text-[19px] tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active
                    ? 'text-ink font-semibold bg-primary-soft/30'
                    : 'text-muted hover:text-ink hover:bg-surface/50'
                }`}
              >
                {/* Primary left bar indicator for active page */}
                {active && (
                  <span
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* "Get early access" button, full width, at the bottom */}
          <div className="py-6" style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-primary text-white font-semibold text-xs uppercase tracking-wider hover:bg-primary-hover transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Get early access</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { navTheme, isScrolled } = useNavTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Problem', path: '/problem' },
    { name: 'Product', path: '/product' },
    { name: 'Process', path: '/process' },
    { name: 'Traceability', path: '/traceability' },
    { name: 'Company', path: '/company' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isEffectiveDark = navTheme === 'dark';

  // Close menu on route navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock page scrolling when menu is open and sync attribute for launcher visibility
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMenuOpen) {
        document.body.setAttribute('data-mobile-menu-open', 'true');
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
          document.body.removeAttribute('data-mobile-menu-open');
        };
      } else {
        document.body.removeAttribute('data-mobile-menu-open');
      }
    }
  }, [isMenuOpen]);

  // Close menu on Escape key press and restore focus to menu button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // When resizing across the 900px breakpoint to desktop, close mobile menu and unlock scroll
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on click outside the header/panel
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMenuOpen]);

  // Header surface styling:
  // - Top (< 24px): fully transparent background, no border, no shadow
  // - Scrolled (>= 24px) light: solid bg (#FAF8F2) with hairline bottom border
  // - Scrolled (>= 24px) dark: solid deep (#14342A) with subtle border
  // - When menu open: solid bg (#FAF8F2) with hairline bottom border
  const headerSurfaceStyle = isMenuOpen
    ? 'bg-bg border-b border-hairline shadow-none'
    : isScrolled
      ? isEffectiveDark
        ? 'bg-deep border-b border-white/10 shadow-none'
        : 'bg-bg border-b border-hairline shadow-none'
      : 'bg-transparent border-b border-transparent shadow-none';

  // Header height:
  // - Desktop (>= 900px): 72px (64px when scrolled)
  // - Mobile/Tablet (< 900px): 64px (56px when scrolled)
  const headerHeightClass = isScrolled
    ? 'h-[56px] nav:h-[64px]'
    : 'h-[64px] nav:h-[72px]';

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 ${headerHeightClass} ${headerSurfaceStyle} transition-[height,background-color,border-color] duration-200 motion-reduce:transition-none`}
      >
        {/* Desktop navigation: rendered and shown via CSS hidden nav:flex */}
        <DesktopNav
          navLinks={navLinks}
          isActive={isActive}
          isEffectiveDark={isEffectiveDark && !isMenuOpen}
        />

        {/* Mobile navigation: rendered and shown via CSS flex nav:hidden */}
        <MobileNav
          navLinks={navLinks}
          isActive={isActive}
          isEffectiveDark={isEffectiveDark}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          menuButtonRef={menuButtonRef}
        />
      </header>

      {/* Dimmed backdrop when mobile menu is open (closes menu when tapped outside) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-xs nav:hidden transition-opacity duration-200 motion-reduce:transition-none"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
