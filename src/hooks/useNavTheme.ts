import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export type NavTheme = 'dark' | 'light';

export interface UseNavThemeReturn {
  navTheme: NavTheme;
  isScrolled: boolean;
}

/**
 * useNavTheme
 * Detects whether the section directly beneath the fixed header's vertical center line
 * is tagged as 'dark' or 'light' via `data-nav-theme`.
 * Updates on route change, window resize, and scroll.
 * Features:
 * - Defaults to "light" for all pages in the light-first theme.
 * - Dynamically switches to "dark" when crossing sections marked with data-nav-theme="dark"
 *   (e.g., the deep CTA band or a photo-dark hero).
 * - Employs a 6px hysteresis window around boundaries to eliminate visual flickering.
 * - Tracks whether page is scrolled past the 24px threshold.
 */
export function useNavTheme(): UseNavThemeReturn {
  const location = useLocation();

  // Light theme is now the default state across all routes
  const [navTheme, setNavTheme] = useState<NavTheme>('light');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const currentThemeRef = useRef<NavTheme>('light');

  // Immediate sync on route change before paint
  useEffect(() => {
    setNavTheme('light');
    currentThemeRef.current = 'light';

    const scrollY = window.scrollY || window.pageYOffset || 0;
    setIsScrolled(scrollY > 24);
  }, [location.pathname]);

  useEffect(() => {
    // Height of the header at resting position
    const headerHeight = 72;
    const headerCenter = headerHeight / 2;
    const hysteresis = 6; // px margin to resist bouncing at section boundaries

    const evaluateTheme = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setIsScrolled(scrollY > 24);

      // Query all sections with explicit data-nav-theme
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));
      if (sections.length === 0) {
        if (currentThemeRef.current !== 'light') {
          currentThemeRef.current = 'light';
          setNavTheme('light');
        }
        return;
      }

      let matchingTheme: NavTheme = 'light';

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const theme = section.getAttribute('data-nav-theme') as NavTheme;
        if (theme !== 'dark' && theme !== 'light') continue;

        const isCurrent = theme === currentThemeRef.current;
        // Expand boundary slightly if this is already the active theme (hysteresis)
        const topBound = isCurrent ? headerCenter - hysteresis : headerCenter;
        const bottomBound = isCurrent ? headerCenter + hysteresis : headerCenter;

        if (rect.top <= topBound && rect.bottom >= bottomBound) {
          matchingTheme = theme;
          break;
        }
      }

      if (matchingTheme !== currentThemeRef.current) {
        currentThemeRef.current = matchingTheme;
        setNavTheme(matchingTheme);
      }
    };

    window.addEventListener('scroll', evaluateTheme, { passive: true });
    window.addEventListener('resize', evaluateTheme, { passive: true });

    // Evaluate once layout is ready
    const frameId = requestAnimationFrame(evaluateTheme);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', evaluateTheme);
      window.removeEventListener('resize', evaluateTheme);
    };
  }, [location.pathname]);

  return { navTheme, isScrolled };
}
