/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProblemPage } from './pages/ProblemPage.tsx';
import { ProductPage } from './pages/ProductPage.tsx';
import { ProcessPage } from './pages/ProcessPage.tsx';
import { TraceabilityPage } from './pages/TraceabilityPage.tsx';
import { CompanyPage } from './pages/CompanyPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { LeoChatWidget } from './components/LeoChatWidget.tsx';

const isDev = !import.meta.env.PROD;
const LeoPreviewPage = isDev ? React.lazy(() => import('./pages/LeoPreviewPage.tsx')) : () => null;

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-bg text-ink flex flex-col font-sans selection:bg-primary-soft selection:text-ink">
        {/* Skip to Main Content Link for Keyboard Accessibility (WCAG AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white font-mono text-xs font-semibold rounded-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
        >
          Skip to main content
        </a>

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/problem" element={<ProblemPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/traceability" element={<TraceabilityPage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {isDev && (
              <Route
                path="/leo-preview"
                element={
                  <React.Suspense fallback={<div className="p-8 text-center text-muted">Loading preview...</div>}>
                    <LeoPreviewPage />
                  </React.Suspense>
                }
              />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Leo AI Chatbot Widget */}
        <LeoChatWidget />
      </div>
    </HashRouter>
  );
}
