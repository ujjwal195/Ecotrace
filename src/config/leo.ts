/**
 * Leo Chatbot Client Configuration
 * 
 * SECURITY ARCHITECTURE NOTE:
 * LEO_ENDPOINT must point to a secure, server-side proxy route (e.g. "/api/chat" or an external gateway).
 * The browser client MUST NEVER hold any API key, call an AI model provider directly,
 * or embed the assistant's system prompt in client-side code or bundles.
 * The server-side proxy maintains all credentials, enforces rate limits, executes the system
 * prompt guardrails, and logs privacy-safe telemetry.
 * 
 * ENDPOINT BEHAVIOR:
 * If LEO_ENDPOINT is empty (""):
 * - In development mode: Leo runs in mock evaluation mode with clearly labelled mock responses
 *   and displays a visible "Endpoint not set (mock mode)" status badge.
 * - In production mode: The launcher widget renders unconditionally. When opened, it displays
 *   the rest pose with: "Leo isn't available right now. Please use our Contact page."
 */
export const LEO_ENDPOINT: string = "/api/leo";

export const maxMessageLength = 500;
export const maxHistoryTurns = 10;
export const cooldownMs = 1500;
export const requestTimeoutMs = 20000;
export const maxUserMessagesPerSession = 30;

// Tunable launcher position offsets (px)
export const launcherBottomMobile = 88;
export const launcherSideMobile = 16;
export const launcherBottomDesktop = 24;
export const launcherSideDesktop = 24;

