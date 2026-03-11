import { LocaleCode, staticLocales, defaultLocale } from './config';

type Messages = Record<string, unknown>;

// Cache for loaded messages
const messageCache = new Map<LocaleCode, Messages>();

// Load static messages from JSON files
async function loadStaticMessages(locale: LocaleCode): Promise<Messages | null> {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch {
    return null;
  }
}

// Get messages for a locale, falling back to English if needed
export async function getMessages(locale: LocaleCode): Promise<Messages> {
  // Check cache first
  if (messageCache.has(locale)) {
    return messageCache.get(locale)!;
  }

  // Try to load static translation
  if (staticLocales.includes(locale)) {
    const messages = await loadStaticMessages(locale);
    if (messages) {
      messageCache.set(locale, messages);
      return messages;
    }
  }

  // For dynamic locales, we'll translate on-the-fly via API
  // But start with English as the base
  const englishMessages = await loadStaticMessages(defaultLocale);
  if (!englishMessages) {
    throw new Error('Could not load English messages');
  }

  return englishMessages;
}

// Helper to get a nested translation value
export function getTranslation(messages: Messages, key: string): string {
  const keys = key.split('.');
  let value: unknown = messages;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Simple translation function with interpolation
export function t(
  messages: Messages,
  key: string,
  params?: Record<string, string | number>
): string {
  let text = getTranslation(messages, key);
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(value));
    });
  }
  
  return text;
}
