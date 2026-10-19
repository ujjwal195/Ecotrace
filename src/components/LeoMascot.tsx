import React, { useState, useEffect, useRef } from 'react';
import { LeoPose, LEO_POSE_SRC } from '../config/leoMoods.ts';

interface LeoMascotProps {
  pose: LeoPose;
  size?: number | string; // e.g. 48, 140, 160
  className?: string;
  isStage?: boolean;
  onTripleClick?: () => void;
  bounce?: boolean;
}

/**
 * Sage paw-print SVG fallback in a circle when an image asset fails to load.
 */
export const SagePawFallback: React.FC<{ size?: number | string; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`rounded-full bg-surface border border-sage/40 flex items-center justify-center text-primary shrink-0 select-none ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3/5 h-3/5 text-primary opacity-80"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="15.5" rx="4.5" ry="5.5" />
        <circle cx="6" cy="9.5" r="2.5" />
        <circle cx="10" cy="6.5" r="2.5" />
        <circle cx="14" cy="6.5" r="2.5" />
        <circle cx="18" cy="9.5" r="2.5" />
      </svg>
    </div>
  );
};

// Global cache to track preloaded images across mounts
let hasPreloadedAllMoods = false;

export const preloadAllLeoMoods = () => {
  if (hasPreloadedAllMoods || typeof window === 'undefined') return;
  hasPreloadedAllMoods = true;

  Object.values(LEO_POSE_SRC).forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export const LeoMascot: React.FC<LeoMascotProps> = ({
  pose,
  size = 140,
  className = '',
  isStage = false,
  onTripleClick,
  bounce = false,
}) => {
  const [currentPose, setCurrentPose] = useState<LeoPose>(pose);
  const [prevPose, setPrevPose] = useState<LeoPose | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Triple-click / tap tracking for easter egg
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check user prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Handle pose changes with 180ms crossfade
  useEffect(() => {
    if (pose !== currentPose) {
      if (prefersReducedMotion) {
        // Instant pose swap under reduced motion
        setCurrentPose(pose);
        setPrevPose(null);
        setIsCrossfading(false);
      } else {
        setPrevPose(currentPose);
        setCurrentPose(pose);
        setIsCrossfading(true);

        const timer = setTimeout(() => {
          setIsCrossfading(false);
          setPrevPose(null);
        }, 180);

        return () => clearTimeout(timer);
      }
    }
  }, [pose, currentPose, prefersReducedMotion]);

  const handleStageClick = () => {
    if (!onTripleClick) return;

    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onTripleClick();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 600);
    }
  };

  const handleImageError = (failedPose: LeoPose) => {
    setFailedImages((prev) => ({ ...prev, [failedPose]: true }));
  };

  const currentSrc = LEO_POSE_SRC[currentPose];
  const prevSrc = prevPose ? LEO_POSE_SRC[prevPose] : null;

  const currentFailed = failedImages[currentPose];
  const prevFailed = prevPose ? failedImages[prevPose] : false;

  return (
    <div
      onClick={isStage ? handleStageClick : undefined}
      style={{ width: size, height: size }}
      aria-hidden="true"
      className={`relative shrink-0 flex items-center justify-center select-none ${
        isStage && !prefersReducedMotion ? 'leo-stage-float cursor-pointer' : ''
      } ${bounce && !prefersReducedMotion ? 'leo-bounce' : ''} ${className}`}
    >
      {/* Previous image during 180ms crossfade */}
      {prevPose && prevSrc && !prevFailed && !prefersReducedMotion && (
        <img
          src={prevSrc}
          alt=""
          aria-hidden="true"
          onError={() => handleImageError(prevPose)}
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-180 ease-out ${
            isCrossfading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Current active image */}
      {!currentFailed ? (
        <img
          src={currentSrc}
          alt=""
          aria-hidden="true"
          onError={() => handleImageError(currentPose)}
          className={`w-full h-full object-contain pointer-events-none ${
            !prefersReducedMotion
              ? `transition-opacity duration-180 ease-out ${
                  isCrossfading ? 'opacity-100' : 'opacity-100'
                }`
              : 'opacity-100'
          }`}
        />
      ) : (
        <SagePawFallback size={size} />
      )}
    </div>
  );
};
