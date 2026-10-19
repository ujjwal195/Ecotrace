# EcoTrace Packaging Private Limited – Marketing Website

Deep-tech marketing website for **EcoTrace Packaging Private Limited** (brand: **EcoTrace**), a Kolkata-based deep-tech startup developing compostable, bio-based polymers from sugarcane bagasse agricultural waste in India.

---

## 🚀 Deployment Steps

1. **Development Mode**:
   ```bash
   npm run dev
   ```
   Runs Express server with integrated Vite middleware on `http://localhost:3000`.

   > **🛠️ Leo AI Assistant Full-Stack Diagnostics (Dev Checks)**:
   > - **Health Check**: `GET /api/leo/health` returns `{ ok, hasKey, hasPrompt, hasModel, originAllowed, geminiReachable }` (strict booleans only, zero secret leakage).
   > - **Client Diagnostic**: Append `?leo-debug=1` to the URL to view launcher mounting, portal container, and viewport calculations in the browser console.
   > - **Console Error Differentiation**: Front-end console distinguishes 404 (route missing), 403 (origin blocked), 429 (daily cap), 5xx (model error), timeout (20s), and network connection errors while preserving the visitor notice in the UI.


2. **Production Readiness Check & Build**:
   ```bash
   # Run strict production audit (fails if any stats are unverified or placeholders remain):
   npm run check-guards

   # Build production assets for deployment:
   npm run build
   ```
   Outputs optimized static assets to the `/dist` directory.

3. **Deploy to Hosting (Cloud Run, Vercel, Netlify, or Static CDN)**:
   - Deploy the contents of the `/dist` folder to your CDN or web server.
   - Ensure `public/robots.txt` and `public/sitemap.xml` are accessible at root.

4. **Configuring the Early-Access Form Endpoint**:
   - Open `src/config.ts`.
   - Set `FORM_ENDPOINT` to your Formspree endpoint (e.g. `https://formspree.io/f/xyz...`), Basin, or custom backend webhook.
   - If left empty, the form automatically uses the 1-click mailto fallback to `sanchetiujjwal@gmail.com`.

5. **Analytics Setup**:
   - In `index.html`, uncomment the privacy-friendly, cookie-free analytics script tag (e.g. Plausible or Google Analytics):
     ```html
     <!-- <script defer data-domain="ecotrace.in" src="https://plausible.io/js/script.js"></script> -->
     ```

---

## 📋 Checklist of Placeholders to Fill

Every placeholder is visibly marked in the UI and codebase with `[ADD: ...]`:

### 1. Logo & Brand Assets
- [ ] **`/public/logo.png`**: Master logo asset. Note: Replace /public/logo.png with a transparent PNG or SVG of the mark and wordmark (white on transparent).
- [ ] **`/public/footer-logo.png`**: Crop /public/footer-logo.png tightly to the artwork.
- [ ] **Favicon**: `/public/favicon.svg` and `/public/favicon.png` (512x512).
- [ ] **OpenGraph Image**: `/public/og-image.png` (1200x630) for social sharing.
- [ ] **Full-Bleed Hero Image (`/src/data/hero.ts`)**:
  - Desktop crop (`srcDesktop`): 16:9 landscape WebP or AVIF, target under ~250KB.
  - Mobile crop (`srcMobile`): Portrait / square WebP or AVIF, target under ~120KB.
  - Art-direction focal points (`focalPoint.desktop` & `focalPoint.mobile`): e.g. `"70% 50%"` and `"50% 40%"` to prevent subject clipping.
  - Scrim calibration (`overlayStrength`): Set `"auto"` for automatic WCAG AA contrast against any photograph, or a custom number (0.2–1.0).
  - Graceful fallback: When unpopulated, automatically displays brand-green surface with subtle tonal radial glow and hairline sage abstract fibrous artwork.

### 2. Market Data & Sourced Benchmarks (`/src/data/stats.ts`)
- [ ] **Card 1 (`feedstock-scale`)**:
  - Add primary source name (e.g. ISMA, Ministry of Food & Public Distribution, or peer-reviewed review)
  - Add primary source URL
  - Add reported year
  - Set `verified: true` in `/src/data/stats.ts`
- [ ] **Card 2 (`plastic-waste`)**:
  - Review 2019-20 CPCB Rajya Sabha citation
  - Check for more recent CPCB annual reporting if available
  - Set `verified: true` in `/src/data/stats.ts`
- [ ] **Card 3 (`policy-driver`)**:
  - Add specific rule citation (e.g. Plastic Waste Management (Amendment) Rules, 2022, from CPCB or MoEFCC)
  - Add official source URL
  - Add reported year
  - Set `verified: true` in `/src/data/stats.ts`
- [ ] **Run Build Guard**: Confirm `npm run build` or `npm run check-guards` passes once all stats have valid URLs and `verified: true`.

### 3. Team & Founder (Team Section)
- [ ] **`[ADD: Founder Photo - Ujjwal]`**: Founder headshot.
- [ ] **`[ADD: Founder Bio]`**: Ujjwal's educational background, deep-tech research experience, and company vision.
- [ ] **`[ADD: Founder LinkedIn URL]`**: Update LinkedIn profile URL in `src/config.ts`.
- [ ] **`[ADD: Bioprocess Advisor / Academic Mentor]`**: Advisor credentials once formalized.
- [ ] **`[ADD: Polymer Compounding & Industry Advisor]`**: Packaging converter advisor details once formalized.

### 4. Institutional Partners & Recognition (Partners Section)
- [ ] **`[ADD: Confirmed incubator cohorts, academic grants, or pilot LOIs]`**: Add logos and announcement details only when formally executed.

### 5. Contact & Company Metadata
- [ ] **Form Endpoint**: Set `CONFIG.FORM_ENDPOINT` in `src/config.ts`.
- [ ] **Company LinkedIn Page**: Update `CONFIG.LINKEDIN_URL` in `src/config.ts`.
