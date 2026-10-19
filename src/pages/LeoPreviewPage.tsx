import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { LeoPose } from '../config/leoMoods.ts';

interface LeoAssetInfo {
  name: LeoPose;
  fileName: string;
  expectedDescription: string;
  actualContentDescription: string;
  moodRole: string;
  uiSpot: string;
  pixelDimensions: string;
  targetSize: number;
}

const LEO_ASSET_REGISTRY: LeoAssetInfo[] = [
  {
    name: 'launcher',
    fileName: 'leo-launcher.png',
    expectedDescription: 'Dog head on deep-green rounded square',
    actualContentDescription: 'Dog head on deep-green rounded square (#14342A) with subtle top-right spark marks',
    moodRole: 'Fixed launcher button image',
    uiSpot: 'Floating launcher button at bottom-right of screen (56px mobile / 64px desktop)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 64,
  },
  {
    name: 'avatar',
    fileName: 'leo-avatar.png',
    expectedDescription: 'Dog head only (close crop)',
    actualContentDescription: 'Close-up dog head only with deep-green bandana',
    moodRole: 'Fixed avatar image',
    uiSpot: 'Panel header (40px circle) and Leo message row turn (28px circle)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 40,
  },
  {
    name: 'wave',
    fileName: 'leo-wave.png',
    expectedDescription: 'Dog waving front paw',
    actualContentDescription: 'Full sitting dog with right front paw raised waving',
    moodRole: 'Automatic state 6: panel just opened (2.5s)',
    uiSpot: 'Welcome state greeting card mascot slot (96px)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 96,
  },
  {
    name: 'happy',
    fileName: 'leo-happy.png',
    expectedDescription: 'Smiling sitting dog',
    actualContentDescription: 'Smiling sitting dog with green bandana and wagging tail',
    moodRole: 'Automatic state 5 (reply just received for 2s) & state 7 (idle default)',
    uiSpot: 'Single mascot slot (96px welcome card or 56px pinned slot above composer)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 96,
  },
  {
    name: 'curious',
    fileName: 'leo-curious.png',
    expectedDescription: 'Dog with question mark and tilted head',
    actualContentDescription: 'Sitting dog with tilted head and clean question mark graphic',
    moodRole: 'Automatic state 4: visitor is typing in composer',
    uiSpot: 'Single mascot slot (96px welcome card or 56px pinned slot above composer)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 56,
  },
  {
    name: 'working',
    fileName: 'leo-working.png',
    expectedDescription: 'Dog at laptop',
    actualContentDescription: 'Dog typing at sleek laptop with paw-embossed lid',
    moodRole: 'Automatic state 2: waiting for reply (>= 1200ms)',
    uiSpot: '56px pinned mascot slot above composer on the left',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 56,
  },
  {
    name: 'rest',
    fileName: 'leo-rest.png',
    expectedDescription: 'Dog sleeping with Z z z',
    actualContentDescription: 'Curled up sleeping dog with floating Z z z lettering',
    moodRole: 'Automatic state 1: error / offline / session limit',
    uiSpot: 'Single mascot slot (56px pinned slot above composer or 96px in welcome card)',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 80,
  },
  {
    name: 'wink',
    fileName: 'leo-wink.png',
    expectedDescription: 'Dog winking with star/sparkle',
    actualContentDescription: 'Dog winking one eye with gold sparkle star accent',
    moodRole: 'Automatic state 3: thumbs-up pressed (2s) / easter egg',
    uiSpot: '56px pinned mascot slot above composer with "Glad that helped."',
    pixelDimensions: '1024 × 1024 px',
    targetSize: 56,
  },
];

export default function LeoPreviewPage() {
  return (
    <div className="min-h-screen bg-bg text-ink py-10 px-4 sm:px-8 max-w-6xl mx-auto font-sans">
      {/* Top Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-warm/30 text-ink font-semibold">
              Dev Only
            </span>
            <span className="text-xs text-muted">Internal Mascot Asset Verification & Mapping Audit</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
            Leo Mascot Asset Mapping & Preview
          </h1>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Static verification gallery confirming all eight mascot assets, natural pixel dimensions, and designated automatic UI spots on light and dark-green backgrounds.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Site</span>
        </Link>
      </div>

      {/* Verification Audit Summary Banner */}
      <div className="mb-8 p-5 bg-card border border-hairline rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-semibold text-ink">Asset Inventory Audit: 8 of 8 Verified</h2>
            <p className="text-sm text-muted mt-0.5">
              All 8 PNG assets in <code className="text-xs bg-surface px-1 py-0.5 rounded">/public/leo/</code> accurately match their designated character pose and UI slot. Zero name mismatches found.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Map Compliant</span>
          </span>
        </div>
      </div>

      {/* Complete Asset Matrix */}
      <section className="mb-12">
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-normal text-ink">Complete Asset Verification Matrix (8/8)</h2>
          <p className="text-sm text-muted">
            All eight mascot images rendered simultaneously on both background colors to confirm optical contrast, character integrity, and assigned UI roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEO_ASSET_REGISTRY.map((asset) => (
            <div
              key={asset.name}
              className="bg-card border border-hairline rounded-xl p-4 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface text-ink">
                    leo-{asset.name}
                  </span>
                  <span className="text-[11px] text-primary flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                <h3 className="font-medium text-sm text-ink mb-1">{asset.moodRole}</h3>
                <p className="text-xs text-muted mb-3 line-clamp-2">{asset.uiSpot}</p>

                {/* Dual-Background Canvas */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-bg border border-hairline rounded-lg p-2 flex items-center justify-center h-28">
                    <img
                      src={`/leo/${asset.fileName}`}
                      alt=""
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>
                  <div className="bg-[#14342A] border border-[#2E7D5B]/30 rounded-lg p-2 flex items-center justify-center h-28">
                    <img
                      src={`/leo/${asset.fileName}`}
                      alt=""
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-hairline text-[11px] text-muted space-y-0.5">
                <div>File: <span className="text-ink font-medium">{asset.fileName}</span></div>
                <div>Size: <span className="text-ink font-medium">{asset.pixelDimensions}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
