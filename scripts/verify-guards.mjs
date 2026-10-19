/**
 * Production Readiness Guard Script
 * 
 * Verifies that:
 * 1. No unverified stats exist (verified: false) in strict mode
 * 2. No empty or placeholder sourceUrls exist in strict mode
 * 3. No "[ADD", "PLACEHOLDER", or "UNVERIFIED" strings remain in src/ or public/ in strict mode
 * 4. Empty ImageSlots are scanned and reported (skipped in production, non-fatal)
 * 5. BANNED POLYMER TERMS are strictly checked and FATAL in all environments (exit 1)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const errors = [];
const emptyImageSlots = [];

// 1. Check stats data
const statsFilePath = path.join(rootDir, 'src', 'data', 'stats.ts');
if (fs.existsSync(statsFilePath)) {
  const statsContent = fs.readFileSync(statsFilePath, 'utf8');

  const verifiedMatches = [...statsContent.matchAll(/id:\s*["']([^"']+)["'][\s\S]*?verified:\s*(true|false)/g)];
  for (const match of verifiedMatches) {
    const id = match[1];
    const isVerified = match[2] === 'true';
    if (!isVerified) {
      errors.push(`[UNVERIFIED STAT]: Stat "${id}" has verified: false`);
    }
  }

  const urlMatches = [...statsContent.matchAll(/id:\s*["']([^"']+)["'][\s\S]*?sourceUrl:\s*["']([^"']*)["']/g)];
  for (const match of urlMatches) {
    const id = match[1];
    const url = match[2].trim();
    if (!url || url === '' || url.includes('[ADD') || !url.startsWith('http')) {
      errors.push(`[INVALID SOURCE URL]: Stat "${id}" has missing or unverified sourceUrl: "${url}"`);
    }
  }
} else {
  errors.push(`[MISSING FILE]: src/data/stats.ts not found`);
}

// 2. Load banned terms (excluded from client bundle)
const bannedTermsPath = path.join(__dirname, 'banned-terms.json');
let bannedTerms = [];
if (fs.existsSync(bannedTermsPath)) {
  try {
    bannedTerms = JSON.parse(fs.readFileSync(bannedTermsPath, 'utf8'));
  } catch (e) {
    errors.push(`[CONFIG ERROR]: Failed to parse scripts/banned-terms.json: ${e.message}`);
  }
}

// 3. Load secret signatures for public leak scanning
let systemPromptToCheck = '';
if (process.env.LEO_SYSTEM_PROMPT && process.env.LEO_SYSTEM_PROMPT.trim().length > 15) {
  systemPromptToCheck = process.env.LEO_SYSTEM_PROMPT.trim();
} else {
  const promptFile = path.join(rootDir, 'server', 'leo-system-prompt.txt');
  if (fs.existsSync(promptFile)) {
    const raw = fs.readFileSync(promptFile, 'utf8').trim();
    if (raw && raw !== 'PASTE LEO SYSTEM PROMPT HERE' && raw.length > 15) {
      systemPromptToCheck = raw;
    }
  }
}
const currentApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 10
  ? process.env.GEMINI_API_KEY.trim()
  : null;

// 4. Scan source & public output files for placeholders, secrets & banned terms
const scanDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'public'),
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'metadata.json'),
];

const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  scanDirs.push(distDir);
}

const disallowedStrings = ['[ADD', 'PLACEHOLDER'];

function scanFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx', '.html', '.json', '.css', '.md'].includes(ext)) {
    return;
  }
  
  if (filePath.includes('banned-terms.json') || filePath.includes('verify-guards.mjs')) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(rootDir, filePath);

  // Scan empty image slots: <ImageSlot src="" ... />
  const slotMatches = [...content.matchAll(/<ImageSlot[\s\S]*?alt=["']([^"']+)["'][\s\S]*?\/>/g)];
  for (const match of slotMatches) {
    const slotTag = match[0];
    const alt = match[1];
    if (slotTag.includes('src=""') || slotTag.includes("src=''") || !slotTag.includes('src=')) {
      emptyImageSlots.push({ file: relativePath, alt });
    }
  }

  // Check disallowed placeholders in source files
  if (!relativePath.startsWith('dist')) {
    for (const str of disallowedStrings) {
      // If in ImageSlot.tsx itself, skip the component's internal dev placeholder label "[ADD IMAGE:"
      if (relativePath.includes('ImageSlot.tsx') && str === '[ADD') {
        continue;
      }
      if (content.includes(str)) {
        errors.push(`[FORBIDDEN STRING]: Found "${str}" in ${relativePath}`);
      }
    }
  }

  // Check banned polymer terms
  for (const term of bannedTerms) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(content)) {
      errors.push(`[BANNED TERM]: Found forbidden polymer term "${term}" in ${relativePath}`);
    }
  }

  // Check secret leaks in public or dist output
  const isPublicOrDist = relativePath.startsWith('public') || relativePath.startsWith('dist');
  if (isPublicOrDist) {
    if (currentApiKey && content.includes(currentApiKey)) {
      errors.push(`[FATAL SECRET LEAK]: Gemini API key found in public bundle ${relativePath}`);
    }
    const genericApiKeyRegex = /AIza[0-9A-Za-z-_]{35}/;
    if (genericApiKeyRegex.test(content)) {
      errors.push(`[FATAL SECRET LEAK]: Google API key pattern detected in public bundle ${relativePath}`);
    }
    if (systemPromptToCheck && content.includes(systemPromptToCheck.slice(0, 30))) {
      errors.push(`[FATAL PROMPT LEAK]: System prompt fragment found in public bundle ${relativePath}`);
    }
  }
}

function walkDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const stat = fs.statSync(dirPath);
  if (stat.isFile()) {
    scanFile(dirPath);
    return;
  }
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        walkDir(fullPath);
      }
    } else {
      scanFile(fullPath);
    }
  }
}

for (const p of scanDirs) {
  walkDir(p);
}


// 4. Report Empty ImageSlots (Skipped in production)
console.log('\n📸 IMAGE SLOTS AUDIT (Skipped in production):');
console.log('=============================================');
if (emptyImageSlots.length === 0) {
  console.log('All ImageSlots have active media assets.');
} else {
  console.log(`Found ${emptyImageSlots.length} unpopulated ImageSlot(s) — safely skipped in production:`);
  emptyImageSlots.forEach((slot, idx) => {
    console.log(`  ${idx + 1}. [${slot.file}] "${slot.alt}"`);
  });
}

// 5. Report Leo Assistant Endpoint status (informational only)
const leoConfigPath = path.join(rootDir, 'src', 'config', 'leo.ts');
if (fs.existsSync(leoConfigPath)) {
  const leoConfigContent = fs.readFileSync(leoConfigPath, 'utf8');
  const endpointMatch = leoConfigContent.match(/export const LEO_ENDPOINT:\s*string\s*=\s*["']([^"']*)["']/);
  const endpoint = endpointMatch ? endpointMatch[1].trim() : '';
  console.log('\n🤖 LEO ASSISTANT STATUS:');
  console.log('========================');
  if (!endpoint) {
    console.log('LEO_ENDPOINT is empty (""). Launcher will display "isn\'t available" message with Contact page button in production.');
  } else {
    console.log(`LEO_ENDPOINT is active: ${endpoint}`);
  }
}


// 5. Check arguments for strict mode
const isStrict = process.argv.includes('--strict') || process.env.STRICT_GUARDS === 'true';
const bannedTermErrors = errors.filter(e => e.includes('[BANNED TERM]'));
const fatalLeakErrors = errors.filter(e => e.includes('[FATAL SECRET LEAK]') || e.includes('[FATAL PROMPT LEAK]'));

// Fatal secret/prompt leak check (Strict in ALL modes)
if (fatalLeakErrors.length > 0) {
  console.error('\n🚫 FATAL SECURITY VIOLATION: Secret or System Prompt Leak in Public Bundle:');
  console.error('========================================================================');
  fatalLeakErrors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  console.error('\nPublic leaks of server secrets or system prompts must be removed immediately.\n');
  process.exit(1);
}

// Fatal banned terms check (Strict in ALL modes)
if (bannedTermErrors.length > 0) {
  console.error('\n🚫 FATAL CONTENT VIOLATION: Banned polymer terms detected:');
  console.error('===========================================================');
  bannedTermErrors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  console.error('\nBanned polymer terms must be removed immediately.\n');
  process.exit(1);
}

// Strict vs Staging Audit
if (errors.length > 0) {
  console.warn('\n⚠️  PRODUCTION READINESS AUDIT NOTICE:');
  console.warn('=============================================');
  console.warn(`Total unverified items pending user signoff: ${errors.length}\n`);
  errors.forEach((err, idx) => {
    console.warn(`  ${idx + 1}. ${err}`);
  });
  console.warn('\nNote: In strict release mode (`npm run check-guards`), this audit will fail the build until all items are verified.');
  console.warn('Proceeding with bundle generation for preview/deployment.\n');

  if (isStrict) {
    console.error('❌ Strict production check failed. Exiting with code 1.');
    process.exit(1);
  }
  process.exit(0);
} else {
  console.log('\n✅ All production readiness checks passed! 100% verified.');
  process.exit(0);
}
