import { useState, useRef, useCallback, useEffect } from 'react';
import { LeoPose } from '../config/leoMoods.ts';

export function useLeoMood() {
  // State flags for the prioritized mood state machine
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [isSessionLimit, setIsSessionLimit] = useState<boolean>(false);
  const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);
  const [isThumbsUp, setIsThumbsUp] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isReplyJustReceived, setIsReplyJustReceived] = useState<boolean>(false);
  const [isPanelJustOpened, setIsPanelJustOpened] = useState<boolean>(false);

  // Timers
  const thumbsUpTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingExitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const replyReceivedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const panelOpenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sendTimestampRef = useRef<number>(0);

  // 1. Offline detection from navigator.onLine and window events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (thumbsUpTimerRef.current) clearTimeout(thumbsUpTimerRef.current);
      if (typingExitTimerRef.current) clearTimeout(typingExitTimerRef.current);
      if (replyReceivedTimerRef.current) clearTimeout(replyReceivedTimerRef.current);
      if (panelOpenTimerRef.current) clearTimeout(panelOpenTimerRef.current);
    };
  }, []);

  // Priority 6: panel just opened → "wave" (leo-wave) for 2.5s, then idle
  const onPanelOpen = useCallback(() => {
    if (panelOpenTimerRef.current) clearTimeout(panelOpenTimerRef.current);
    setIsPanelJustOpened(true);

    panelOpenTimerRef.current = setTimeout(() => {
      setIsPanelJustOpened(false);
      panelOpenTimerRef.current = null;
    }, 2500);
  }, []);

  // Priority 4: visitor is typing → "curious" (leo-curious)
  // Stay curious while box contains text and is focused.
  // Return to idle 600ms after box is cleared or loses focus.
  const onComposerInput = useCallback((hasText: boolean, isFocused: boolean) => {
    if (hasText && isFocused) {
      if (typingExitTimerRef.current) {
        clearTimeout(typingExitTimerRef.current);
        typingExitTimerRef.current = null;
      }
      setIsTyping(true);
    } else {
      if (!typingExitTimerRef.current) {
        typingExitTimerRef.current = setTimeout(() => {
          setIsTyping(false);
          typingExitTimerRef.current = null;
        }, 600);
      }
    }
  }, []);

  // Priority 2: waiting for a reply → "working" (leo-working)
  // Starts the instant visitor sends a message. Ends curious immediately.
  const onMessageSent = useCallback(() => {
    if (typingExitTimerRef.current) {
      clearTimeout(typingExitTimerRef.current);
      typingExitTimerRef.current = null;
    }
    setIsTyping(false);
    setHasError(false);
    sendTimestampRef.current = Date.now();
    setIsWaitingForReply(true);
  }, []);

  // Priority 2 minimum duration: must be shown for at least 1200ms even if reply arrives instantly.
  // Once the minimum duration elapses, ends waiting and triggers Priority 5 (happy for 2s).
  const onReplyStart = useCallback(async () => {
    const elapsed = Date.now() - sendTimestampRef.current;
    const remaining = Math.max(0, 1200 - elapsed);
    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }
    setIsWaitingForReply(false);

    // Priority 5: reply just received → "happy" (leo-happy) for 2s, then idle
    if (replyReceivedTimerRef.current) clearTimeout(replyReceivedTimerRef.current);
    setIsReplyJustReceived(true);
    replyReceivedTimerRef.current = setTimeout(() => {
      setIsReplyJustReceived(false);
      replyReceivedTimerRef.current = null;
    }, 2000);
  }, []);

  // Priority 3: thumbs-up pressed → "wink" (leo-wink) for 2s, then back to normal
  const onThumbsUp = useCallback(() => {
    if (thumbsUpTimerRef.current) clearTimeout(thumbsUpTimerRef.current);
    setIsThumbsUp(true);
    thumbsUpTimerRef.current = setTimeout(() => {
      setIsThumbsUp(false);
      thumbsUpTimerRef.current = null;
    }, 2000);
  }, []);

  // Priority 1: error / offline / session limit → "rest" (leo-rest)
  const onError = useCallback(() => {
    setIsWaitingForReply(false);
    setHasError(true);
  }, []);

  const onSessionLimit = useCallback(() => {
    setIsWaitingForReply(false);
    setIsSessionLimit(true);
  }, []);

  const clearError = useCallback(() => {
    setHasError(false);
    setIsSessionLimit(false);
  }, []);

  // Derive pose in strict priority order (higher wins if two apply):
  // 1. error / offline / session limit → "rest"
  // 2. waiting for a reply → "working"
  // 3. thumbs-up pressed → "wink"
  // 4. visitor is typing → "curious"
  // 5. reply just received → "happy"
  // 6. panel just opened → "wave"
  // 7. idle (default) → "happy"
  let pose: LeoPose = 'happy';

  if (hasError || isOffline || isSessionLimit) {
    pose = 'rest';
  } else if (isWaitingForReply) {
    pose = 'working';
  } else if (isThumbsUp) {
    pose = 'wink';
  } else if (isTyping) {
    pose = 'curious';
  } else if (isReplyJustReceived) {
    pose = 'happy';
  } else if (isPanelJustOpened) {
    pose = 'wave';
  } else {
    pose = 'happy';
  }

  return {
    pose,
    isOffline,
    hasError,
    isSessionLimit,
    isWaitingForReply,
    isTyping,
    isThumbsUp,
    onPanelOpen,
    onComposerInput,
    onMessageSent,
    onReplyStart,
    onThumbsUp,
    onError,
    onSessionLimit,
    clearError,
  };
}
