'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LocaleCode, defaultLocale, getLocaleInfo, staticLocales, isRtl, locales } from './config';

type Messages = Record<string, unknown>;

interface I18nContextType {
  locale: LocaleCode;
  messages: Messages;
  setLocale: (locale: LocaleCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
  isAiTranslated: boolean;
  localeInfo: ReturnType<typeof getLocaleInfo>;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

// Detect browser language
function detectBrowserLanguage(): LocaleCode {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.split('-')[0];
  const supportedCodes = locales.map(l => l.code);
  
  if (supportedCodes.includes(browserLang as LocaleCode)) {
    return browserLang as LocaleCode;
  }
  
  return defaultLocale;
}

// Get saved locale from localStorage
function getSavedLocale(): LocaleCode | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('ekkos-locale');
  return saved as LocaleCode | null;
}

// Save locale to localStorage
function saveLocale(locale: LocaleCode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ekkos-locale', locale);
  }
}

interface I18nProviderProps {
  children: ReactNode;
  initialMessages: Messages;
  initialLocale?: LocaleCode;
}

export function I18nProvider({ 
  children, 
  initialMessages,
  initialLocale 
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<LocaleCode>(initialLocale || defaultLocale);
  const [messages, setMessages] = useState<Messages>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiTranslated, setIsAiTranslated] = useState(false);

  // Initialize locale on mount
  useEffect(() => {
    const saved = getSavedLocale();
    const detected = detectBrowserLanguage();
    const targetLocale = saved || detected;
    
    if (targetLocale !== locale) {
      setLocaleState(targetLocale);
    }
  }, []);

  // Load messages when locale changes
  useEffect(() => {
    async function loadMessages() {
      if (locale === defaultLocale) {
        setMessages(initialMessages);
        setIsAiTranslated(false);
        return;
      }

      setIsLoading(true);

      try {
        // Try to load static translation first
        if (staticLocales.includes(locale)) {
          const staticMessages = await import(`../messages/${locale}.json`)
            .then(m => m.default)
            .catch(() => null);
          
          if (staticMessages) {
            setMessages(staticMessages);
            setIsAiTranslated(false);
            setIsLoading(false);
            return;
          }
        }

        // Fall back to AI translation
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale, messages: initialMessages })
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
          setIsAiTranslated(data.aiTranslated);
        } else {
          // Fall back to English
          setMessages(initialMessages);
          setIsAiTranslated(false);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        setMessages(initialMessages);
        setIsAiTranslated(false);
      }

      setIsLoading(false);
    }

    loadMessages();
  }, [locale, initialMessages]);

  const setLocale = useCallback((newLocale: LocaleCode) => {
    setLocaleState(newLocale);
    saveLocale(newLocale);
  }, []);

  // Translation function
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    let text = typeof value === 'string' ? value : key;

    if (params) {
      Object.entries(params).forEach(([param, val]) => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(val));
      });
    }

    return text;
  }, [messages]);

  const contextValue: I18nContextType = {
    locale,
    messages,
    setLocale,
    t,
    isLoading,
    isAiTranslated,
    localeInfo: getLocaleInfo(locale),
    isRtl: isRtl(locale)
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Shorthand hook for just the translation function
export function useTranslation() {
  const { t, locale, isLoading, isAiTranslated } = useI18n();
  return { t, locale, isLoading, isAiTranslated };
}
