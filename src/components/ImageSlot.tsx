import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export interface ImageSlotProps {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: '16:9' | '4:3' | '1:1' | '3:4';
  credit?: string;
  illustrative?: boolean;
  recommendedSize?: string;
  className?: string;
}

const aspectClasses: Record<'16:9' | '4:3' | '1:1' | '3:4', string> = {
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:4': 'aspect-[3/4]',
};

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt,
  caption,
  aspect = '16:9',
  credit,
  illustrative = false,
  recommendedSize,
  className = '',
}) => {
  const isDev = import.meta.env.DEV;

  // If no image source provided:
  // In development, render a clean mist placeholder box with dashed hairline border.
  // In production, return null so layout collapses cleanly without broken boxes.
  if (!src || src.trim() === '') {
    if (!isDev) {
      return null;
    }

    return (
      <figure className={`w-full my-6 ${className}`}>
        <div
          className={`w-full ${aspectClasses[aspect]} bg-mist border border-dashed border-hairline rounded-sm flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden`}
          role="img"
          aria-label={`Image slot placeholder: ${alt}`}
        >
          <div className="w-10 h-10 rounded-full bg-card border border-hairline flex items-center justify-center text-muted mb-3 shadow-2xs">
            <ImageIcon className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <p className="font-mono text-xs text-ink font-medium max-w-xs leading-snug">
            [ADD IMAGE: {alt}]
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-muted">
            <span>Ratio {aspect}</span>
            {recommendedSize && (
              <>
                <span>·</span>
                <span>Rec: {recommendedSize}</span>
              </>
            )}
          </div>
          {illustrative && (
            <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-ink px-2 py-0.5 rounded-xs bg-primary-soft border border-hairline shadow-2xs">
              Illustrative
            </span>
          )}
        </div>
        {(caption || credit) && (
          <figcaption className="mt-2 text-xs text-muted flex items-center justify-between font-mono">
            {caption && <span>{caption}</span>}
            {credit && <span className="text-[10px]">Photo: {credit}</span>}
          </figcaption>
        )}
      </figure>
    );
  }

  // Live image rendering
  return (
    <figure className={`w-full my-6 ${className}`}>
      <div className={`w-full ${aspectClasses[aspect]} relative overflow-hidden rounded-sm border border-hairline bg-mist`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {illustrative && (
          <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider text-ink px-2 py-0.5 rounded-xs bg-primary-soft border border-hairline shadow-2xs">
            Illustrative
          </span>
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2 text-xs text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-1 leading-relaxed">
          {caption && <span>{caption}</span>}
          {credit && <span className="text-[11px] font-mono text-muted/80">Credit: {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
};
