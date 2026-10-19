import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  X,
  ArrowUp,
  RotateCcw,
  Download,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowDown,
} from 'lucide-react';
import {
  LEO_ENDPOINT,
  maxMessageLength,
  maxHistoryTurns,
  cooldownMs,
  requestTimeoutMs,
  maxUserMessagesPerSession,
  launcherBottomDesktop,
  launcherSideDesktop,
} from '../config/leo.ts';
import { LEO_POSE_SRC } from '../config/leoMoods.ts';
import { useLeoMood } from '../hooks/useLeoMood.ts';
import { LeoMascot, preloadAllLeoMoods } from './LeoMascot.tsx';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  suggestions?: string[];
  links?: string[];
  rating?: 'up' | 'down';
  downvoteReason?: string;
  isError?: boolean;
}

interface LeoChatDialogProps {
  onClose: () => void;
}

// Cookie-free analytics event dispatcher (safe no-op if analytics disabled)
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('ecotrace_analytics', {
          detail: { event: eventName, ...data, timestamp: Date.now() },
        })
      );
    } catch {
      // safe fallback
    }
  }
};

const DEFAULT_SUGGESTIONS = [
  'What is EcoTrace building?',
  'Is it available yet?',
  'How do I get early access?',
  'How can I partner with you?',
];

const ROUTE_SUGGESTIONS: Record<string, string[]> = {
  '/problem': ['Where does this data come from?', 'Why does it matter for India?'],
  '/product': ['Is it compostable?', 'What will it be used for?'],
  '/process': ['Can I see the technical details?', 'Where is it made?'],
  '/traceability': ['What will you record for each batch?', 'Is this live yet?'],
  '/company': ["What's the roadmap?", 'Are you looking for a co-founder?'],
};

const KNOWN_ROUTES: Record<string, string> = {
  home: '/',
  problem: '/problem',
  product: '/product',
  process: '/process',
  traceability: '/traceability',
  company: '/company',
  contact: '/contact',
};

// Safe sessionStorage helper with try/catch
const storage = {
  get: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return sessionStorage.getItem(key);
      }
    } catch {
      // safe fallback
    }
    return null;
  },
  set: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(key, value);
      }
    } catch {
      // storage unavailable or quota exceeded
    }
  },
};

export const LeoChatDialog: React.FC<LeoChatDialogProps> = ({ onClose }) => {
  const location = useLocation();

  const isProd = import.meta.env.PROD;
  const isEndpointConfigured = Boolean(LEO_ENDPOINT && LEO_ENDPOINT.trim() !== '');

  // Automatic mood state machine driven exclusively by visitor actions
  const {
    pose,
    isWaitingForReply,
    onPanelOpen,
    onComposerInput,
    onMessageSent,
    onReplyStart,
    onThumbsUp,
    onError,
    onSessionLimit,
    clearError,
  } = useLeoMood();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = storage.get('ecotrace_leo_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // invalid history
      }
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [isSlowWaiting, setIsSlowWaiting] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [failedMessageContent, setFailedMessageContent] = useState<string | null>(null);

  // Typewriter state for active response
  const [typewriterMsgId, setTypewriterMsgId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({});
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);

  // UI menu & scroll state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Header avatar triple-click tracking for easter egg (triggers wink for 2s)
  const headerClickCountRef = useRef(0);
  const headerClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // DOM Refs
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Prefers reduced motion check
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Save messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      storage.set('ecotrace_leo_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Preload all mood images on mount
  useEffect(() => {
    preloadAllLeoMoods();
  }, []);

  // Lock mobile body scroll when chat panel is open (< 640px)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, []);

  // Keyboard shortcut: Esc closes or skips typewriter
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (typewriterMsgId) {
          skipTypewriter();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [typewriterMsgId, onClose]);

  // Trigger onPanelOpen on mount
  useEffect(() => {
    onPanelOpen();
    trackEvent('leo_opened', { page: location.pathname });

    const focusTimer = setTimeout(() => {
      composerRef.current?.focus();
    }, 150);

    return () => clearTimeout(focusTimer);
  }, [onPanelOpen, location.pathname]);

  // Auto-grow composer textarea up to 4 lines (~112px)
  useEffect(() => {
    if (composerRef.current) {
      composerRef.current.style.height = 'auto';
      const scrollH = composerRef.current.scrollHeight;
      composerRef.current.style.height = `${Math.min(Math.max(scrollH, 44), 112)}px`;
    }
  }, [input]);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(
    (smooth = true) => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto',
        });
      }
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText, scrollToBottom]);

  // Detect scroll offset for "Latest ↓" scroll pill
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;

    if (messages.length === 0 || scrollHeight <= clientHeight) {
      setShowScrollBottom(false);
      return;
    }

    const isUp = scrollHeight - scrollTop - clientHeight > 80;
    setShowScrollBottom(isUp);
  };

  // Skip active typewriter effect
  const skipTypewriter = () => {
    if (!typewriterMsgId) return;
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    const targetMsg = messages.find((m) => m.id === typewriterMsgId);
    if (targetMsg) {
      setDisplayedText((prev) => ({ ...prev, [typewriterMsgId]: targetMsg.content }));
    }
    setTypewriterMsgId(null);
  };

  // Fast typewriter effect (~18ms per character)
  const startTypewriter = (msgId: string, fullContent: string) => {
    if (prefersReducedMotion) {
      setDisplayedText((prev) => ({ ...prev, [msgId]: fullContent }));
      setTypewriterMsgId(null);
      return;
    }

    setTypewriterMsgId(msgId);
    let index = 0;
    setDisplayedText((prev) => ({ ...prev, [msgId]: '' }));

    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);

    typewriterTimerRef.current = setInterval(() => {
      index += 1;
      setDisplayedText((prev) => ({
        ...prev,
        [msgId]: fullContent.slice(0, index),
      }));

      if (index >= fullContent.length) {
        if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
        setTypewriterMsgId(null);
      }
    }, 18);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    onComposerInput(value.trim().length > 0, true);
  };

  const handleInputFocus = () => {
    onComposerInput(input.trim().length > 0, true);
  };

  const handleInputBlur = () => {
    onComposerInput(input.trim().length > 0, false);
  };

  // Header avatar triple-click / tap handler (Easter Egg: triggers wink for 2s)
  const handleHeaderAvatarClick = () => {
    headerClickCountRef.current += 1;
    if (headerClickTimerRef.current) clearTimeout(headerClickTimerRef.current);

    if (headerClickCountRef.current >= 3) {
      headerClickCountRef.current = 0;
      onThumbsUp();
    } else {
      headerClickTimerRef.current = setTimeout(() => {
        headerClickCountRef.current = 0;
      }, 600);
    }
  };

  // Extract single page link
  const getSinglePageLink = (text: string, explicitLinks?: string[]): { label: string; path: string } | null => {
    const lower = text.toLowerCase();

    if (explicitLinks && Array.isArray(explicitLinks) && explicitLinks.length > 0) {
      for (const linkName of explicitLinks) {
        const key = linkName.toLowerCase().trim();
        if (KNOWN_ROUTES[key]) {
          return { label: `Go to ${linkName}`, path: KNOWN_ROUTES[key] };
        }
      }
    }

    if (lower.includes('contact page') || lower.includes('the contact')) {
      return { label: 'Go to Contact', path: '/contact' };
    }
    if (lower.includes('problem page') || lower.includes('the problem page')) {
      return { label: 'Go to Problem', path: '/problem' };
    }
    if (lower.includes('product page') || lower.includes('the product page')) {
      return { label: 'Go to Product', path: '/product' };
    }
    if (lower.includes('process page') || lower.includes('the process page')) {
      return { label: 'Go to Process', path: '/process' };
    }
    if (lower.includes('traceability page') || lower.includes('the traceability page')) {
      return { label: 'Go to Traceability', path: '/traceability' };
    }
    if (lower.includes('company page') || lower.includes('the company page')) {
      return { label: 'Go to Company', path: '/company' };
    }

    if (lower.includes('contact')) {
      return { label: 'Go to Contact', path: '/contact' };
    }

    return null;
  };

  // Welcome state suggestions
  const welcomeSuggestions = useMemo(() => {
    const currentPath = location.pathname;
    const pageSpecific = ROUTE_SUGGESTIONS[currentPath] || [];
    const combined = [...pageSpecific];

    for (const item of DEFAULT_SUGGESTIONS) {
      if (!combined.includes(item)) {
        combined.push(item);
      }
      if (combined.length >= 3) break;
    }
    return combined.slice(0, 3);
  }, [location.pathname]);

  // Mock reply generator for development mode when endpoint is not set
  const getMockReply = (userQuery: string): { reply: string; suggestions?: string[]; links?: string[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('buy') || q.includes('purchase') || q.includes('order')) {
      return {
        reply:
          "Not yet. EcoTrace is still in development, so there is nothing to purchase. If you would like to be considered for early access, the Contact page has a short form.",
        links: ['Contact'],
        suggestions: ['How do I get early access?', 'Where does feedstock come from?'],
      };
    }

    if (q.includes('certif') || q.includes('100%')) {
      return {
        reply:
          "Not yet. Compostability is our design target, and independent certification is a planned milestone, not something we have achieved. I can point you to the Product page for more on what we are building.",
        links: ['Product'],
        suggestions: ['Where does feedstock come from?', 'What will it be used for?'],
      };
    }

    if (q.includes('partner') || q.includes('early access') || q.includes('contact')) {
      return {
        reply:
          'We welcome partnerships with packaging converters, brand sustainability teams, and researchers. Please register your interest using the form on the Contact page.',
        links: ['Contact'],
        suggestions: ["What's the roadmap?", 'What is EcoTrace building?'],
      };
    }

    if (q.includes('roadmap') || q.includes('team') || q.includes('founder') || q.includes('co-founder')) {
      return {
        reply:
          'EcoTrace is led by Founder & CEO Ujjwal Sancheti in Kolkata, India. We are currently in lab validation and actively seeking a bioprocess or fermentation co-founder or advisor. You can read more on the Company page.',
        links: ['Company'],
        suggestions: ['Can I see the technical details?', 'What is EcoTrace building?'],
      };
    }

    if (q.includes('traceability') || q.includes('batch')) {
      return {
        reply:
          'Traceability is our planned approach to record each batch from regional sugarcane crushing origin to finished pellets. It is an intentional design principle rather than a live system today. Visit the Traceability page for our planned framework.',
        links: ['Traceability'],
        suggestions: ['Is this live yet?', 'What is EcoTrace building?'],
      };
    }

    return {
      reply:
        'EcoTrace is developing a compostable, bio-based polymer from sugarcane waste in India. For questions, trial samples, or early access, the Contact page has a short form.',
      links: ['Contact'],
      suggestions: ['Is it available yet?', 'How can I partner with you?'],
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || isWaitingForReply) return;

    const now = Date.now();
    if (now - lastSentTime < cooldownMs) {
      return;
    }
    setLastSentTime(now);

    if (userMessageCount >= maxUserMessagesPerSession) {
      onSessionLimit();
      const limitMsg: ChatMessage = {
        id: `limit-${Date.now()}`,
        role: 'model',
        content: 'Leo is resting right now. Please try again in a moment, or use our Contact page.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, limitMsg]);
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      onError();
      setFailedMessageContent(content);
      const offlineMsg: ChatMessage = {
        id: `offline-${Date.now()}`,
        role: 'model',
        content: 'Leo is resting right now. Please try again in a moment, or use our Contact page.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, offlineMsg]);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setUserMessageCount((c) => c + 1);
    setIsSlowWaiting(false);
    onMessageSent();
    trackEvent('leo_message_sent');

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = 'Leo is thinking...';
    }

    const slowTimer = setTimeout(() => {
      setIsSlowWaiting(true);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = 'Leo is looking into that...';
      }
    }, 4000);

    try {
      let replyText = '';
      let replySuggestions: string[] | undefined;
      let replyLinks: string[] | undefined;

      if (!isEndpointConfigured) {
        if (!isProd && content.toLowerCase() === 'test error') {
          await new Promise((res) => setTimeout(res, 2500));
          throw new Error('Simulated test error in dev mode');
        }

        await new Promise((res) => setTimeout(res, 2500));
        const mock = getMockReply(content);
        replyText = mock.reply;
        replySuggestions = mock.suggestions;
        replyLinks = mock.links;
      } else {
        const recentHistory = [...messages, userMsg].slice(-maxHistoryTurns).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

        let res: Response;
        try {
          res = await fetch(LEO_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: recentHistory,
              page: location.pathname,
            }),
            signal: controller.signal,
          });
        } catch (fetchErr: any) {
          clearTimeout(timeoutId);
          if (fetchErr.name === 'AbortError') {
            console.error('[Leo API Error] Timeout: Request timed out after 20s.');
          } else {
            console.error('[Leo API Error] Network error: Unable to reach server endpoint.', fetchErr);
          }
          throw fetchErr;
        }

        clearTimeout(timeoutId);

        if (!res.ok) {
          if (res.status === 404) {
            console.error('[Leo API Error] 404: Endpoint route missing (/api/leo). Ensure full-stack server is running and deployed.');
          } else if (res.status === 403) {
            console.error('[Leo API Error] 403: Origin blocked by CORS policy.');
          } else if (res.status === 429) {
            console.error('[Leo API Error] 429: Daily request cap reached.');
          } else if (res.status >= 500) {
            console.error(`[Leo API Error] ${res.status}: Server error while communicating with Gemini API.`);
          } else {
            console.error(`[Leo API Error] ${res.status}: HTTP request failed.`);
          }
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        replyText = data.reply || '';
        replySuggestions = data.suggestions;
        replyLinks = data.links;

        if (!replyText) {
          throw new Error('Empty response');
        }
      }

      clearTimeout(slowTimer);
      setIsSlowWaiting(false);

      await onReplyStart();

      const botMsgId = `leo-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: replySuggestions,
        links: replyLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      startTypewriter(botMsgId, replyText);

      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = replyText;
      }
    } catch {
      clearTimeout(slowTimer);
      setIsSlowWaiting(false);
      onError();
      setFailedMessageContent(content);
      trackEvent('leo_error');

      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: 'Leo is resting right now. Please try again in a moment, or use our Contact page.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errMsg]);

      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = errMsg.content;
      }
    }
  };

  const handleThumbsUp = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, rating: 'up' } : m))
    );
    onThumbsUp();
    trackEvent('leo_feedback', { rating: 'up', messageId: msgId });
  };

  const handleThumbsDown = (msgId: string, reason?: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, rating: 'down', downvoteReason: reason } : m
      )
    );
    trackEvent('leo_feedback', { rating: 'down', reason: reason || 'unspecified' });
  };

  const handleCopy = (msgId: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    storage.set('ecotrace_leo_chat_history', '');
    setIsMenuOpen(false);
    clearError();
    onPanelOpen();
  };

  const handleDownloadTranscript = () => {
    const lines = messages.map(
      (m) => `[${m.timestamp}] ${m.role === 'user' ? 'Visitor' : 'Leo'}: ${m.content}`
    );
    const textBlob = new Blob([lines.join('\n\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(textBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecotrace-leo-transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  // If in production and LEO_ENDPOINT is empty: render graceful unavailable state
  if (isProd && !isEndpointConfigured) {
    return (
      <aside
        id="leo-chat-dialog"
        role="dialog"
        aria-label="Chat with Leo"
        className="fixed z-[60] bg-card border border-hairline shadow-xl flex flex-col overflow-hidden text-ink
          inset-0 sm:inset-auto sm:rounded-2xl sm:w-[390px] sm:h-[620px] sm:max-h-[82svh]"
        style={{
          bottom: typeof window !== 'undefined' && window.innerWidth >= 640
            ? `calc(env(safe-area-inset-bottom, 0px) + ${launcherBottomDesktop}px)`
            : '0',
          right: typeof window !== 'undefined' && window.innerWidth >= 640
            ? `calc(env(safe-area-inset-right, 0px) + ${launcherSideDesktop}px)`
            : '0',
        }}
      >
        <header className="bg-bg border-b border-hairline px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface border border-hairline overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={LEO_POSE_SRC.avatar}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
            <div>
              <h2 className="font-serif text-lg font-normal text-ink leading-tight">Leo</h2>
              <p className="text-xs text-muted leading-tight mt-0.5">AI assistant for EcoTrace</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="p-2 text-muted hover:text-ink rounded-lg hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </header>

        <div className="flex-1 bg-bg flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <LeoMascot pose="rest" size={96} className="pointer-events-none" />
          </div>
          <p className="text-[15px] leading-[1.6] text-ink max-w-[280px] mb-6">
            Leo isn't available right now. Please use our Contact page.
          </p>
          <Link
            to="/contact"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            Contact page
          </Link>
        </div>
      </aside>
    );
  }

  // Active chat dialog
  return (
    <aside
      id="leo-chat-dialog"
      role="dialog"
      aria-label="Chat with Leo"
      className="fixed z-[60] bg-card border border-hairline shadow-xl flex flex-col overflow-hidden text-ink
        inset-0 sm:inset-auto sm:rounded-2xl sm:w-[390px] sm:h-[620px] sm:max-h-[82svh]"
      style={{
        bottom: typeof window !== 'undefined' && window.innerWidth >= 640
          ? `calc(env(safe-area-inset-bottom, 0px) + ${launcherBottomDesktop}px)`
          : '0',
        right: typeof window !== 'undefined' && window.innerWidth >= 640
          ? `calc(env(safe-area-inset-right, 0px) + ${launcherSideDesktop}px)`
          : '0',
      }}
    >
      {/* Hidden ARIA live region */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Header */}
      <header className="bg-bg border-b border-hairline px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleHeaderAvatarClick}
            aria-label="Leo avatar (tap 3 times for easter egg)"
            className="w-10 h-10 rounded-full bg-surface border border-hairline overflow-hidden shrink-0 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={LEO_POSE_SRC.avatar}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </button>

          <div>
            <h2 className="font-serif text-lg font-normal text-ink leading-tight">Leo</h2>
            <p className="text-xs text-muted leading-tight mt-0.5">
              AI assistant for EcoTrace
            </p>
          </div>
        </div>

        {/* Header Right Controls */}
        <div className="flex items-center gap-1 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Chat options"
              aria-expanded={isMenuOpen}
              className="p-2 text-muted hover:text-ink rounded-lg hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-hairline rounded-xl shadow-lg py-1.5 z-50 text-xs text-ink divide-y divide-hairline/60">
                <div className="py-1">
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="w-full px-3.5 py-2 text-left hover:bg-surface flex items-center gap-2.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-muted" strokeWidth={1.5} />
                    <span>Clear chat</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadTranscript}
                    disabled={messages.length === 0}
                    className="w-full px-3.5 py-2 text-left hover:bg-surface flex items-center gap-2.5 disabled:opacity-40 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-muted" strokeWidth={1.5} />
                    <span>Download transcript</span>
                  </button>
                </div>
                <div className="px-3.5 py-2 text-[11px] text-muted">
                  Press <kbd className="px-1 py-0.5 bg-surface border border-hairline rounded text-[10px] text-ink font-sans">/</kbd> to open chat. Press Esc to close.
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="p-2 text-muted hover:text-ink rounded-lg hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Messages Thread Container */}
      <div className="relative flex-1 overflow-hidden flex flex-col bg-bg">
        <div
          ref={messagesContainerRef}
          role="log"
          aria-live="polite"
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {/* Welcome State */}
          {messages.length === 0 && (
            <div className="flex flex-col pt-1 pb-4">
              <div className="bg-card border border-hairline rounded-xl p-4 shadow-xs mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
                    <LeoMascot pose={pose} size={96} className="pointer-events-none" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-serif text-lg text-ink font-normal">Leo</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-primary opacity-80 shrink-0"
                        aria-hidden="true"
                      >
                        <ellipse cx="12" cy="15.5" rx="4.5" ry="5.5" />
                        <circle cx="6" cy="9.5" r="2.5" />
                        <circle cx="10" cy="6.5" r="2.5" />
                        <circle cx="14" cy="6.5" r="2.5" />
                        <circle cx="18" cy="9.5" r="2.5" />
                      </svg>
                    </div>
                    <p className="text-[15px] leading-[1.5] text-ink">
                      Hi! I&apos;m Leo. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <div className="text-xs text-muted font-medium px-1">
                  Suggested questions
                </div>
                <div className="flex flex-col gap-2">
                  {welcomeSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        trackEvent('leo_suggestion_clicked', { suggestion });
                        handleSendMessage(suggestion);
                      }}
                      className="w-full text-left px-3.5 py-2.5 bg-card hover:bg-surface border border-hairline rounded-lg text-ink text-sm font-medium transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Conversation Messages */}
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            const isFirstOfGroup = idx === 0 || messages[idx - 1].role !== m.role;

            const displayContent =
              typewriterMsgId === m.id ? displayedText[m.id] ?? '' : m.content;

            const pageLink = !isUser ? getSinglePageLink(m.content, m.links) : null;

            if (m.isError) {
              return (
                <div
                  key={m.id}
                  className="my-3 p-4 bg-surface/60 border border-hairline rounded-xl flex flex-col items-center text-center gap-3 shadow-xs"
                >
                  <p className="text-[15px] leading-[1.5] text-ink max-w-[280px]">
                    Leo is resting right now. Please try again in a moment, or use our{' '}
                    <Link
                      to="/contact"
                      onClick={() => window.innerWidth < 640 && onClose()}
                      className="underline text-ink hover:text-primary transition-colors"
                    >
                      Contact page
                    </Link>
                    .
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    {failedMessageContent && (
                      <button
                        type="button"
                        onClick={() => {
                          const retryText = failedMessageContent;
                          setFailedMessageContent(null);
                          clearError();
                          handleSendMessage(retryText);
                        }}
                        className="px-3.5 py-1.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shadow-2xs"
                      >
                        Retry
                      </button>
                    )}
                    <Link
                      to="/contact"
                      onClick={() => window.innerWidth < 640 && onClose()}
                      className="px-3.5 py-1.5 text-sm font-medium rounded-lg bg-card border border-hairline text-ink hover:bg-surface transition-colors shadow-2xs"
                    >
                      Contact page
                    </Link>
                  </div>
                </div>
              );
            }

            if (isUser) {
              return (
                <div key={m.id} className="flex justify-end my-3">
                  <div className="bg-primary text-white rounded-xl rounded-br-[4px] px-4 py-2.5 max-w-[85%] text-[15px] leading-[1.5] shadow-2xs">
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id} className="flex flex-col my-3 group">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-surface border border-hairline/80 overflow-hidden shrink-0 mt-0.5 flex items-center justify-center">
                    {isFirstOfGroup ? (
                      <img
                        src={LEO_POSE_SRC.avatar}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      onClick={() => typewriterMsgId === m.id && skipTypewriter()}
                      className="text-[15px] leading-[1.5] text-ink select-text whitespace-pre-wrap"
                    >
                      {displayContent}
                    </div>

                    {pageLink && (
                      <div className="mt-2.5">
                        <Link
                          to={pageLink.path}
                          onClick={() => window.innerWidth < 640 && onClose()}
                          className="text-sm underline text-ink hover:text-primary transition-colors font-medium"
                        >
                          {pageLink.label}
                        </Link>
                      </div>
                    )}

                    {!pageLink && m.suggestions && m.suggestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.suggestions.slice(0, 3).map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => {
                              trackEvent('leo_suggestion_clicked', { suggestion: sug });
                              handleSendMessage(sug);
                            }}
                            className="border border-hairline bg-card hover:bg-surface text-ink text-sm font-medium px-3 py-1.5 rounded-lg transition-colors text-left shadow-2xs"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 mt-2 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.content)}
                        aria-label="Copy response text"
                        className="p-1 text-muted hover:text-ink rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                        ) : (
                          <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbsUp(m.id)}
                        aria-label="Helpful response"
                        className={`p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                          m.rating === 'up' ? 'text-primary' : 'text-muted hover:text-ink'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbsDown(m.id)}
                        aria-label="Not helpful response"
                        className={`p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                          m.rating === 'down' ? 'text-warm' : 'text-muted hover:text-ink'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>

                      {m.rating === 'down' && (
                        <div className="flex items-center gap-1.5 text-xs text-muted ml-1.5">
                          {!m.downvoteReason ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleThumbsDown(m.id, 'not_helpful')}
                                className="px-2 py-0.5 rounded bg-surface hover:bg-hairline/60 text-ink text-xs"
                              >
                                Not helpful
                              </button>
                              <button
                                type="button"
                                onClick={() => handleThumbsDown(m.id, 'wrong_information')}
                                className="px-2 py-0.5 rounded bg-surface hover:bg-hairline/60 text-ink text-xs"
                              >
                                Wrong info
                              </button>
                            </>
                          ) : (
                            <span>
                              Thanks. For anything important, see our{' '}
                              <Link to="/contact" className="underline text-ink">
                                Contact page
                              </Link>
                              .
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="border-b border-hairline/60 pt-3" />
                  </div>
                </div>
              </div>
            );
          })}

          {isWaitingForReply && (
            <div className="flex items-start gap-3 my-2 animate-in fade-in duration-150">
              <div className="w-7 h-7 rounded-full bg-surface border border-hairline/80 overflow-hidden shrink-0 mt-0.5 flex items-center justify-center">
                <img
                  src={LEO_POSE_SRC.avatar}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="flex items-center gap-2 py-2">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.18s]" />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.36s]" />
                {isSlowWaiting && (
                  <span className="text-[13px] text-muted ml-2">Looking into that…</span>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to Latest Pill */}
        {showScrollBottom && messages.length > 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={() => scrollToBottom(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-card border border-hairline text-ink rounded-full text-xs shadow-md hover:bg-surface transition-colors focus-visible:outline-none"
            >
              <span>Latest</span>
              <ArrowDown className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {/* Mascot pose above composer */}
      {messages.length > 0 && (
        <div className="px-4 py-1.5 flex items-center justify-between border-t border-hairline/60 bg-bg shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-14 h-14 shrink-0 relative flex items-center justify-center">
              <LeoMascot pose={pose} size={56} className="pointer-events-none" />
            </div>
            {pose === 'wink' && (
              <span className="text-xs text-muted font-medium animate-in fade-in duration-150">
                Glad that helped.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Composer Footer */}
      <footer className="bg-card border-t border-hairline p-3 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <div className="relative flex-1">
            <textarea
              ref={composerRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about EcoTrace…"
              maxLength={maxMessageLength}
              rows={1}
              disabled={isWaitingForReply}
              className="w-full resize-none px-3.5 py-2.5 rounded-xl bg-bg border border-hairline text-ink placeholder:text-[13px] placeholder:text-muted/70 text-[15px] leading-snug focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 min-h-[44px]"
            />

            {input.length > 400 && (
              <span className="absolute right-2.5 bottom-2 text-xs text-muted/70 font-sans">
                {input.length}/{maxMessageLength}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isWaitingForReply}
            aria-label="Send message"
            className="w-10 h-10 shrink-0 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed border border-hairline/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
          >
            <ArrowUp className="w-4 h-4 text-white" strokeWidth={1.5} />
          </button>
        </form>

        <div className="mt-2 text-center text-xs text-muted leading-relaxed">
          Leo is an AI assistant and can make mistakes. For anything important, see our{' '}
          <span className="inline-block whitespace-nowrap">
            <Link
              to="/contact"
              onClick={() => window.innerWidth < 640 && onClose()}
              className="underline text-ink hover:text-primary transition-colors"
            >
              Contact page
            </Link>
            .
          </span>
        </div>
      </footer>

      {/* Dev-only bottom strip */}
      {!isProd && !isEndpointConfigured && (
        <div className="bg-surface/90 border-t border-hairline px-3 py-1.5 text-xs text-muted flex items-center justify-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-warm shrink-0" />
          <span className="text-[11px]">Endpoint not set (mock mode)</span>
        </div>
      )}
    </aside>
  );
};

export default LeoChatDialog;
