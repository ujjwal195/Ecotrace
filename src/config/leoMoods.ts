export type LeoPose =
  | 'launcher'
  | 'avatar'
  | 'wave'
  | 'happy'
  | 'curious'
  | 'working'
  | 'rest'
  | 'wink';

export type LeoMood =
  | 'idle'
  | 'greeting'
  | 'listening'
  | 'thinking'
  | 'slow'
  | 'error'
  | 'offline'
  | 'delighted';

/**
 * LEO_MOODS maps dynamic interactive states to their corresponding mascot poses.
 */
export const LEO_MOODS: Record<LeoMood, LeoPose> = {
  idle: 'happy',
  greeting: 'wave',
  listening: 'curious',
  thinking: 'working',
  slow: 'working',
  error: 'rest',
  offline: 'rest',
  delighted: 'wink',
};

/**
 * Static asset paths for all mascot poses, resolving under published base URL.
 */
const rawBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '/';
const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export const getLeoAssetUrl = (file: string): string => {
  const cleanFile = file.startsWith('/') ? file.slice(1) : file;
  return `${cleanBase}${cleanFile}`;
};

export const LEO_POSE_SRC: Record<LeoPose, string> = {
  launcher: getLeoAssetUrl('leo/leo-launcher.png'),
  avatar: getLeoAssetUrl('leo/leo-avatar.png'),
  wave: getLeoAssetUrl('leo/leo-wave.png'),
  happy: getLeoAssetUrl('leo/leo-happy.png'),
  curious: getLeoAssetUrl('leo/leo-curious.png'),
  working: getLeoAssetUrl('leo/leo-working.png'),
  rest: getLeoAssetUrl('leo/leo-rest.png'),
  wink: getLeoAssetUrl('leo/leo-wink.png'),
};

