import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('/root/.bun/install/global/node_modules/playwright-core');

const outDir = path.resolve('public/leo');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const BANDANA_PAW = `
  <ellipse cx="256" cy="388" rx="8" ry="10" fill="#FFFFFF" />
  <circle cx="242" cy="374" r="5" fill="#FFFFFF" />
  <circle cx="251" cy="368" r="5" fill="#FFFFFF" />
  <circle cx="261" cy="368" r="5" fill="#FFFFFF" />
  <circle cx="270" cy="374" r="5" fill="#FFFFFF" />
`;

const BANDANA = `
  <!-- Bandana triangle around neck -->
  <path d="M 180 340 Q 256 360 332 340 L 256 425 Z" fill="#1B4931" stroke="#14342A" stroke-width="2" />
  ${BANDANA_PAW}
`;

function getHeadGroup({ mouthOpen = true, winking = false, sleeping = false, tilted = false } = {}) {
  const transform = tilted ? 'transform="rotate(6 256 240)"' : '';
  
  const eyes = sleeping
    ? `
      <path d="M 200 230 Q 220 245 240 230" stroke="#2A180E" stroke-width="6" stroke-linecap="round" fill="none" />
      <path d="M 272 230 Q 292 245 312 230" stroke="#2A180E" stroke-width="6" stroke-linecap="round" fill="none" />
    `
    : winking
    ? `
      <ellipse cx="218" cy="224" rx="20" ry="24" fill="#2A180E" />
      <circle cx="212" cy="216" r="8" fill="#FFFFFF" />
      <circle cx="225" cy="230" r="3" fill="#FFFFFF" />
      <path d="M 274 226 Q 294 242 314 224" stroke="#2A180E" stroke-width="7" stroke-linecap="round" fill="none" />
    `
    : `
      <ellipse cx="218" cy="224" rx="20" ry="24" fill="#2A180E" />
      <circle cx="212" cy="216" r="8" fill="#FFFFFF" />
      <circle cx="225" cy="230" r="3" fill="#FFFFFF" />
      <ellipse cx="294" cy="224" rx="20" ry="24" fill="#2A180E" />
      <circle cx="288" cy="216" r="8" fill="#FFFFFF" />
      <circle cx="301" cy="230" r="3" fill="#FFFFFF" />
    `;

  const mouth = sleeping
    ? `
      <path d="M 238 288 Q 256 298 274 288" stroke="#2A180E" stroke-width="4" stroke-linecap="round" fill="none" />
    `
    : mouthOpen
    ? `
      <path d="M 226 276 Q 256 325 286 276" fill="#8B2635" stroke="#2A180E" stroke-width="4" />
      <path d="M 238 288 Q 256 322 274 288" fill="#E86A7A" />
      <path d="M 256 266 L 256 284" stroke="#2A180E" stroke-width="3" stroke-linecap="round" />
    `
    : `
      <path d="M 232 276 Q 244 288 256 276 Q 268 288 280 276" stroke="#2A180E" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M 256 266 L 256 276" stroke="#2A180E" stroke-width="3" stroke-linecap="round" />
    `;

  return `
    <g ${transform}>
      <!-- Ears -->
      <path d="M 175 180 C 130 190 110 270 145 320 C 160 340 190 320 185 270 Z" fill="#D68A36" stroke="#B87122" stroke-width="3" />
      <path d="M 337 180 C 382 190 402 270 367 320 C 352 340 322 320 327 270 Z" fill="#D68A36" stroke="#B87122" stroke-width="3" />
      
      <!-- Head Base -->
      <ellipse cx="256" cy="226" rx="100" ry="94" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
      
      <!-- Cheeks -->
      <path d="M 158 240 Q 146 250 156 262 Q 144 272 162 280" stroke="#D68A36" stroke-width="2.5" fill="none" />
      <path d="M 354 240 Q 366 250 356 262 Q 368 272 350 280" stroke="#D68A36" stroke-width="2.5" fill="none" />
      
      <!-- Forehead Tuft -->
      <path d="M 244 135 Q 256 120 268 135 Q 256 142 244 135 Z" fill="#F7D8AE" />

      <!-- Muzzle -->
      <ellipse cx="256" cy="268" rx="46" ry="34" fill="#FCE9CC" />

      <!-- Nose -->
      <path d="M 242 254 C 242 248 270 248 270 254 C 270 266 242 266 242 254 Z" fill="#1A1412" />
      <ellipse cx="251" cy="252" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.6" />

      ${eyes}
      ${mouth}
    </g>
  `;
}

// 1. leo-launcher: dog head filling the deep-green rounded square with no large empty margin
const svgLauncher = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Deep Green Rounded Square Background -->
  <rect x="16" y="16" width="480" height="480" rx="112" fill="#14342A" />
  <rect x="16" y="16" width="480" height="480" rx="112" stroke="#2E7D5B" stroke-width="8" stroke-opacity="0.5" />
  
  <!-- Exclamation/spark accent marks in top-right -->
  <line x1="430" y1="110" x2="465" y2="75" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" />
  <line x1="405" y1="85" x2="422" y2="68" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-opacity="0.8" />

  <!-- Dog Head zoomed in to prominently fill the square -->
  <g transform="translate(256, 305) scale(1.68) translate(-256, -240)">
    <path d="M 180 340 Q 256 360 332 340 L 350 450 L 162 450 Z" fill="#E8A858" />
    ${BANDANA}
    ${getHeadGroup({ mouthOpen: true })}
  </g>
</svg>
`;

// 2. leo-avatar: head only (close crop filling the avatar circle)
const svgAvatar = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Close-up head crop filling the 512x512 space -->
  <g transform="translate(256, 280) scale(1.85) translate(-256, -236)">
    ${BANDANA}
    ${getHeadGroup({ mouthOpen: true })}
  </g>
</svg>
`;

// 3. leo-happy: smiling sitting
const svgHappy = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Back legs -->
  <ellipse cx="150" cy="425" rx="42" ry="26" fill="#D68A36" />
  <ellipse cx="362" cy="425" rx="42" ry="26" fill="#D68A36" />
  <!-- Tail -->
  <path d="M 370 410 Q 430 390 440 330 Q 420 340 380 380" fill="#E8A858" stroke="#D68A36" stroke-width="2" />
  <!-- Torso -->
  <path d="M 188 330 C 180 380 180 430 200 450 L 312 450 C 332 430 332 380 324 330 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <!-- Front legs -->
  <rect x="210" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <rect x="264" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <!-- Front paws -->
  <ellipse cx="229" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
  <ellipse cx="283" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />

  ${BANDANA}
  ${getHeadGroup({ mouthOpen: true })}
</svg>
`;

// 4. leo-wave: waving front paw
const svgWave = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 142 410 Q 82 390 72 330 Q 92 340 132 380" fill="#E8A858" stroke="#D68A36" stroke-width="2" />
  <ellipse cx="150" cy="425" rx="42" ry="26" fill="#D68A36" />
  <ellipse cx="362" cy="425" rx="42" ry="26" fill="#D68A36" />
  <path d="M 188 330 C 180 380 180 430 200 450 L 312 450 C 332 430 332 380 324 330 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  
  <rect x="200" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <ellipse cx="219" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />

  <!-- Right Arm raised high waving! -->
  <path d="M 310 330 C 350 310 400 240 405 210 C 410 190 385 185 365 205 C 340 230 310 300 295 335 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <ellipse cx="390" cy="205" rx="20" ry="22" fill="#FCE9CC" stroke="#D68A36" stroke-width="2.5" />
  <ellipse cx="390" cy="210" rx="7" ry="8" fill="#2A180E" />
  <circle cx="379" cy="198" r="4" fill="#2A180E" />
  <circle cx="387" cy="193" r="4" fill="#2A180E" />
  <circle cx="395" cy="193" r="4" fill="#2A180E" />
  <circle cx="403" cy="198" r="4" fill="#2A180E" />

  <path d="M 425 185 Q 435 205 425 225" stroke="#2E7D5B" stroke-width="3" stroke-linecap="round" fill="none" />
  <path d="M 438 190 Q 448 205 438 220" stroke="#8FB89D" stroke-width="2.5" stroke-linecap="round" fill="none" />

  ${BANDANA}
  ${getHeadGroup({ mouthOpen: true })}
</svg>
`;

// 5. leo-curious: question mark
const svgCurious = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(390, 75) scale(1.45)">
    <path d="M 0 10 C 0 0 25 0 25 15 C 25 25 12 28 12 38" stroke="#14342A" stroke-width="7" stroke-linecap="round" fill="none" />
    <circle cx="12" cy="50" r="4" fill="#14342A" />
  </g>

  <ellipse cx="150" cy="425" rx="42" ry="26" fill="#D68A36" />
  <ellipse cx="362" cy="425" rx="42" ry="26" fill="#D68A36" />
  <path d="M 188 330 C 180 380 180 430 200 450 L 312 450 C 332 430 332 380 324 330 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <rect x="210" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <rect x="264" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <ellipse cx="229" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
  <ellipse cx="283" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />

  ${BANDANA}
  ${getHeadGroup({ mouthOpen: false, tilted: true })}
</svg>
`;

// 6. leo-working: at a laptop
const svgWorking = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 188 300 C 180 360 180 420 200 440 L 312 440 C 332 420 332 360 324 300 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <ellipse cx="150" cy="430" rx="42" ry="24" fill="#D68A36" />
  <ellipse cx="362" cy="430" rx="42" ry="24" fill="#D68A36" />

  ${BANDANA}
  ${getHeadGroup({ mouthOpen: false })}

  <!-- Sleek Laptop in foreground -->
  <g transform="translate(146, 360)">
    <path d="M 10 90 L 210 90 L 195 106 L 25 106 Z" fill="#6A7B73" stroke="#14342A" stroke-width="2.5" />
    <rect x="28" y="8" width="164" height="84" rx="8" fill="#43554D" stroke="#14342A" stroke-width="3" />
    
    <!-- White glowing paw on laptop lid -->
    <g transform="translate(110, 50) scale(0.65)">
      <ellipse cx="0" cy="5" rx="8" ry="10" fill="#FFFFFF" opacity="0.9" />
      <circle cx="-12" cy="-9" r="5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="-4" cy="-15" r="5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="6" cy="-15" r="5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="14" cy="-9" r="5" fill="#FFFFFF" opacity="0.9" />
    </g>

    <ellipse cx="40" cy="94" rx="16" ry="10" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
    <ellipse cx="180" cy="94" rx="16" ry="10" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
  </g>
</svg>
`;

// 7. leo-rest: sleeping with Z z z
const svgRest = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="#14342A" opacity="0.8">
    <text x="350" y="160" font-family="sans-serif" font-size="34" font-weight="bold">Z</text>
    <text x="382" y="130" font-family="sans-serif" font-size="26" font-weight="bold">z</text>
    <text x="408" y="105" font-family="sans-serif" font-size="20" font-weight="bold">z</text>
  </g>

  <ellipse cx="256" cy="385" rx="160" ry="85" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <path d="M 120 410 Q 80 380 90 340 Q 110 360 130 390" fill="#E8A858" stroke="#D68A36" stroke-width="2" />
  
  <ellipse cx="225" cy="420" rx="32" ry="18" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
  <ellipse cx="287" cy="420" rx="32" ry="18" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />

  <g transform="translate(0, 50)">
    ${BANDANA}
    ${getHeadGroup({ mouthOpen: false, sleeping: true })}
  </g>
</svg>
`;

// 8. leo-wink: winking eye with sparkle
const svgWink = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 400 110 Q 400 135 375 135 Q 400 135 400 160 Q 400 135 425 135 Q 400 135 400 110 Z" fill="#D9A04E" />

  <ellipse cx="150" cy="425" rx="42" ry="26" fill="#D68A36" />
  <ellipse cx="362" cy="425" rx="42" ry="26" fill="#D68A36" />
  <path d="M 188 330 C 180 380 180 430 200 450 L 312 450 C 332 430 332 380 324 330 Z" fill="#F2BA74" stroke="#D68A36" stroke-width="3" />
  <rect x="210" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <rect x="264" y="370" width="38" height="96" rx="19" fill="#F2BA74" stroke="#D68A36" stroke-width="2.5" />
  <ellipse cx="229" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />
  <ellipse cx="283" cy="460" rx="22" ry="14" fill="#FCE9CC" stroke="#D68A36" stroke-width="2" />

  ${BANDANA}
  ${getHeadGroup({ mouthOpen: true, winking: true })}
</svg>
`;

const assets = [
  { name: 'leo-launcher', svg: svgLauncher },
  { name: 'leo-avatar', svg: svgAvatar },
  { name: 'leo-happy', svg: svgHappy },
  { name: 'leo-wave', svg: svgWave },
  { name: 'leo-curious', svg: svgCurious },
  { name: 'leo-working', svg: svgWorking },
  { name: 'leo-rest', svg: svgRest },
  { name: 'leo-wink', svg: svgWink },
];

async function generate() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage({
    viewport: { width: 512, height: 512 },
    deviceScaleFactor: 2,
  });

  for (const item of assets) {
    const svgFile = path.join(outDir, `${item.name}.svg`);
    const pngFile = path.join(outDir, `${item.name}.png`);
    const webpFile = path.join(outDir, `${item.name}.webp`);

    fs.writeFileSync(svgFile, item.svg.trim(), 'utf8');

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 512px; height: 512px; background: transparent; overflow: hidden; }
            svg { width: 512px; height: 512px; display: block; }
          </style>
        </head>
        <body>${item.svg.trim()}</body>
      </html>
    `);

    await page.screenshot({
      path: pngFile,
      omitBackground: true,
    });
    console.log(`Rendered PNG: ${pngFile}`);

    try {
      execSync(`convert "${pngFile}" "${webpFile}"`);
      console.log(`Rendered WebP: ${webpFile}`);
    } catch {
      // ignore
    }
  }

  await browser.close();
}

generate().catch(console.error);
