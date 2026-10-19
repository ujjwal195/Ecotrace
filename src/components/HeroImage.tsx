import React, { useId } from 'react';
import { HeroConfig, heroConfig as defaultHeroConfig } from '../data/hero.ts';

interface HeroImageProps {
  config?: HeroConfig;
  className?: string;
}

/**
 * HeroImage Component
 *
 * Renders an art-directed <picture> element supporting separate desktop and mobile crops,
 * custom per-breakpoint focal points to prevent subject cropping, eager high-priority loading,
 * and explicit aspect dimensions to eliminate Cumulative Layout Shift (CLS).
 */
export const HeroImage: React.FC<HeroImageProps> = ({
  config = defaultHeroConfig,
  className = '',
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const { srcDesktop, srcMobile, alt, focalPoint } = config;

  if (!srcDesktop && !srcMobile) {
    return null;
  }

  const desktopPos = focalPoint?.desktop || '70% 50%';
  const mobilePos = focalPoint?.mobile || '50% 40%';
  const imgClass = `hero-art-img-${uniqueId}`;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <style>{`
        .${imgClass} {
          object-position: ${mobilePos};
        }
        @media (min-width: 768px) {
          .${imgClass} {
            object-position: ${desktopPos};
          }
        }
      `}</style>
      <picture className="w-full h-full block">
        {srcDesktop && (
          <source
            media="(min-width: 768px)"
            srcSet={srcDesktop}
          />
        )}
        {(srcMobile || srcDesktop) && (
          <source
            media="(max-width: 767px)"
            srcSet={srcMobile || srcDesktop}
          />
        )}
        <img
          src={srcDesktop || srcMobile}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className={`w-full h-full object-cover select-none pointer-events-none ${imgClass}`}
        />
      </picture>
    </div>
  );
};
