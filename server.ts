import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Daily rate limiter in-memory tracking
let dailyCounter = {
  date: new Date().toISOString().slice(0, 10),
  count: 0,
};

function checkDailyCap(cap: number): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (dailyCounter.date !== today) {
    dailyCounter = { date: today, count: 0 };
  }
  if (dailyCounter.count >= cap) {
    return false;
  }
  dailyCounter.count += 1;
  return true;
}

// Track rejected or quota-exhausted models to avoid hammering them
const rejectedModels = new Set<string>();

// Allowed origins parser
function getAllowedOrigins(): string[] {
  const envOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter((o) => o && !o.includes('your-published-address'));

  if (process.env.APP_URL) {
    const appUrl = process.env.APP_URL.trim().replace(/\/+$/, '');
    if (appUrl && !envOrigins.includes(appUrl)) {
      envOrigins.push(appUrl);
    }
  }

  return envOrigins;
}

function isOriginAllowed(origin: string | undefined, hostHeader: string | undefined): boolean {
  // 1. Same-origin requests without Origin header, or matching Host header
  if (!origin) {
    return true;
  }

  const cleanOrigin = origin.trim().replace(/\/+$/, '');

  if (hostHeader) {
    const cleanHost = hostHeader.trim();
    if (cleanOrigin === `http://${cleanHost}` || cleanOrigin === `https://${cleanHost}`) {
      return true;
    }
  }

  // 2. Localhost development
  if (
    cleanOrigin.startsWith('http://localhost') ||
    cleanOrigin.startsWith('http://127.0.0.1') ||
    cleanOrigin.startsWith('https://localhost')
  ) {
    return true;
  }

  // 3. Cloud Run preview & published endpoints (*.run.app, *.aistudio.google.com)
  try {
    const url = new URL(cleanOrigin);
    if (url.hostname.endsWith('.run.app') || url.hostname.endsWith('.aistudio.google.com')) {
      return true;
    }
    if (url.hostname.endsWith('ecotrace.in') || url.hostname.endsWith('ecotracepackaging.com')) {
      return true;
    }
  } catch {
    // Malformed URL
  }

  // 4. Configured origins
  const allowed = getAllowedOrigins();
  return allowed.includes(cleanOrigin);
}

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const allowed = isOriginAllowed(origin, host);

  if (allowed) {
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    if (allowed) {
      return res.status(204).end();
    } else {
      return res.status(403).json({ error: 'Origin not allowed', originAllowed: false });
    }
  }

  next();
});

// Cache for Gemini Reachability check (cached for 10 minutes to protect free tier quota)
let lastGeminiCheck = {
  reachable: false,
  timestamp: 0,
};

async function checkGeminiReachable(apiKey: string): Promise<boolean> {
  const now = Date.now();
  if (lastGeminiCheck.reachable && now - lastGeminiCheck.timestamp < 600000) {
    return true;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const preferredModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash';
  const candidateModels = [
    preferredModel,
    'gemini-3.5-flash',
    'gemini-3.8-flash',
  ].filter((m, idx, arr) => m && arr.indexOf(m) === idx && !rejectedModels.has(m));

  for (const model of candidateModels) {
    try {
      await ai.models.generateContent({
        model,
        contents: 'ping',
      });
      lastGeminiCheck = { reachable: true, timestamp: now };
      return true;
    } catch (err: any) {
      rejectedModels.add(model);
      console.warn(`[Leo API Warning] Model '${model}' rejected during health check (${err?.name || 'Error'}: ${err?.status || ''}).`);
    }
  }

  // If all preferred rejected, try gemini-3.5-flash directly
  try {
    await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'ping',
    });
    lastGeminiCheck = { reachable: true, timestamp: now };
    return true;
  } catch {
    lastGeminiCheck = { reachable: false, timestamp: now };
    return false;
  }
}

// Health check endpoint: returns strictly booleans and non-secret status
app.get('/api/leo/health', async (req, res) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  const originAllowed = isOriginAllowed(origin, host);

  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  const hasPrompt = Boolean(process.env.LEO_SYSTEM_PROMPT && process.env.LEO_SYSTEM_PROMPT.trim() !== '');
  const hasModel = Boolean(process.env.GEMINI_MODEL && process.env.GEMINI_MODEL.trim() !== '');

  let geminiReachable = false;
  if (hasKey) {
    geminiReachable = await checkGeminiReachable(process.env.GEMINI_API_KEY!);
  }

  const ok = hasKey && hasPrompt && hasModel && originAllowed && geminiReachable;

  return res.json({
    ok,
    hasKey,
    hasPrompt,
    hasModel,
    originAllowed,
    geminiReachable,
  });
});

// Clean and parse model output (extract JSON if present or strip markdown fences)
function parseModelReply(rawText: string): { reply: string; suggestions?: string[]; links?: string[] } {
  let text = rawText.trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
  }

  if (text.startsWith('{') && text.endsWith('}')) {
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed.reply === 'string') {
        return {
          reply: parsed.reply,
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : undefined,
          links: Array.isArray(parsed.links) ? parsed.links : undefined,
        };
      }
    } catch {
      // JSON parse failed, fall back to raw text
    }
  }

  return { reply: rawText.trim() };
}

// Chat endpoint
app.post(['/api/leo', '/api/chat'], async (req, res) => {
  const origin = req.headers.origin;
  const host = req.headers.host;

  if (!isOriginAllowed(origin, host)) {
    console.error('[Leo API Error] 403: Origin not allowed:', origin);
    return res.status(403).json({ error: 'Origin not allowed', originAllowed: false });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('[Leo API Error] 500: Missing GEMINI_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const dailyCap = parseInt(process.env.LEO_DAILY_CAP || '300', 10);
  if (!checkDailyCap(dailyCap)) {
    console.warn('[Leo API RateLimit] 429: Daily request cap reached');
    return res.status(429).json({ error: 'Daily request cap reached', code: 'RATE_LIMIT_EXCEEDED' });
  }

  const { messages, page } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  let systemInstruction = process.env.LEO_SYSTEM_PROMPT?.trim() || '';
  if (page && typeof page === 'string') {
    systemInstruction += `\n\n[Visitor Current Page: ${page}]`;
  }

  // Format messages for @google/genai SDK
  const contents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content || '' }],
  }));

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const envModel = process.env.GEMINI_MODEL?.trim();
  // Order of models to attempt
  const modelsToTry: string[] = [];
  if (envModel && !rejectedModels.has(envModel)) {
    modelsToTry.push(envModel);
  }
  if (!modelsToTry.includes('gemini-3.5-flash')) {
    modelsToTry.push('gemini-3.5-flash');
  }
  if (!modelsToTry.includes('gemini-3.8-flash')) {
    modelsToTry.push('gemini-3.8-flash');
  }

  let rawReplyText = '';
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: systemInstruction
          ? {
              systemInstruction,
            }
          : undefined,
      });

      if (response && response.text) {
        rawReplyText = response.text;
        break;
      }
    } catch (err: any) {
      lastError = err;
      rejectedModels.add(modelName);
      console.warn(`[Leo API Warning] Model attempt '${modelName}' failed (${err?.name || 'Error'}: ${err?.status || ''}).`);
    }
  }

  if (!rawReplyText) {
    console.error('[Leo API Error] 500: Model generation error:', lastError?.name || 'Error');
    return res.status(500).json({ error: 'Model generation failed' });
  }

  const parsed = parseModelReply(rawReplyText);
  return res.json(parsed);
});

// Vite or Static file serving
async function setupViteOrStatic() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

setupViteOrStatic().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
