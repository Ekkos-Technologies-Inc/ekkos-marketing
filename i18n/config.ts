// Supported locales with their display names and flags
export const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '中文' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', native: '한국어' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', native: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', native: 'العربية', rtl: true },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', native: 'Nederlands' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', native: 'Polski' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', native: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', native: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', native: 'ไทย' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', native: 'Bahasa Indonesia' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', native: 'Українська' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', native: 'עברית', rtl: true },
] as const;

export type LocaleCode = typeof locales[number]['code'];
export const localeCodes = locales.map(l => l.code);
export const defaultLocale: LocaleCode = 'en';

// Languages with static translations (pre-translated)
export const staticLocales: LocaleCode[] = ['en', 'de', 'ja', 'zh'];

// Languages that will be AI-translated on-demand
export const dynamicLocales: LocaleCode[] = localeCodes.filter(
  code => !staticLocales.includes(code)
);

export function getLocaleInfo(code: string) {
  return locales.find(l => l.code === code) || locales[0];
}

export function isRtl(code: string): boolean {
  const locale = getLocaleInfo(code);
  return 'rtl' in locale && locale.rtl === true;
}
