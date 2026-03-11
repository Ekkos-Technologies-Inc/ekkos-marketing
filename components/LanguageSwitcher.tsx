'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/i18n/provider';
import { locales, LocaleCode } from '@/i18n/config';
import { Globe, Check, Sparkles, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale, isLoading, isAiTranslated, localeInfo } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] hover:bg-[#111118]/60 backdrop-blur-xl hover:border-[#2a2a3e] transition-colors text-sm"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-[#7a7a8e]" />
        <span className="hidden sm:inline">{localeInfo.flag}</span>
        <span className="text-[#e8e8f0]/80">{localeInfo.code.toUpperCase()}</span>
        {isAiTranslated && (
          <Sparkles className="w-3 h-3 text-[#00f0ff]" />
        )}
        <ChevronDown className={`w-3 h-3 text-[#4a4a5e] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        {isLoading && (
          <div className="w-3 h-3 border-2 border-[#00f0ff] border-t-transparent animate-spin" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 clip-md bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="p-2 border-b border-[#1a1a2e]">
            <div className="px-3 py-2 text-xs text-[#4a4a5e] font-mono uppercase tracking-wider">
              Select Language
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto py-1">
            {locales.map((loc) => {
              const isSelected = locale === loc.code;
              const isStatic = ['en', 'de', 'ja', 'zh'].includes(loc.code);

              return (
                <button
                  key={loc.code}
                  onClick={() => {
                    setLocale(loc.code as LocaleCode);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#111118]/60 backdrop-blur-xl transition-colors ${
                    isSelected ? 'bg-[#00f0ff]/10' : ''
                  }`}
                >
                  <span className="text-lg">{loc.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isSelected ? 'text-[#e8e8f0] font-medium' : 'text-[#e8e8f0]/80'}`}>
                        {loc.native}
                      </span>
                      {!isStatic && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 clip-sm bg-[#00f0ff]/20 text-[10px] text-[#00f0ff]">
                          <Sparkles className="w-2.5 h-2.5" />
                          AI
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#4a4a5e]">{loc.name}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-[#00f0ff]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-[#1a1a2e] bg-[#0a0a0f]">
            <div className="flex items-center gap-2 text-[10px] text-[#4a4a5e]">
              <Sparkles className="w-3 h-3 text-[#00f0ff]" />
              <span>AI translations powered by ekkOS_&trade;</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for mobile/footer
export function LanguageSwitcherCompact() {
  const { locale, setLocale, localeInfo } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as LocaleCode)}
      className="bg-transparent border border-[#1a1a2e] clip-sm px-3 py-1.5 text-sm text-[#7a7a8e] focus:outline-none focus:border-[#00f0ff]/50"
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code} className="bg-[#0d0d14]/50 backdrop-blur-md">
          {loc.flag} {loc.native}
        </option>
      ))}
    </select>
  );
}
