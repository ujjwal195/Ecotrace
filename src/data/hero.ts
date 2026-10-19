export type HeroTheme = 'light' | 'photo-dark';

export interface HeroFocalPoint {
  desktop: string;
  mobile: string;
}

export interface HeroConfig {
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  focalPoint: HeroFocalPoint;
  overlayStrength: 'auto' | number;
  heroTheme?: HeroTheme;
}

/**
 * Hero Configuration for the Home Page
 *
 * Guidelines:
 * - srcDesktop: High-resolution landscape image (WebP or AVIF, target < 250 KB)
 * - srcMobile: Portrait / square crop image (WebP or AVIF, target < 120 KB)
 * - focalPoint: CSS object-position for desktop (e.g. "70% 50%") and mobile (e.g. "50% 40%")
 * - overlayStrength: "auto" for smart contrast calculation or numeric (0.0 to 1.0)
 * - heroTheme: "light" | "photo-dark" (defaults to "light")
 *
 * Current state: Defaults to light hero with gentle mist wash and sage abstract illustration.
 */
export const heroConfig: HeroConfig = {
  srcDesktop: '',
  srcMobile: '',
  alt: 'EcoTrace agricultural bagasse biopolymer material development in India',
  focalPoint: {
    desktop: '70% 50%',
    mobile: '50% 40%',
  },
  overlayStrength: 'auto',
  heroTheme: 'light',
};
