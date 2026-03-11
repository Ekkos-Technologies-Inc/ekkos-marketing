'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { I18nProvider } from '@/i18n/provider';
import enMessages from '@/messages/en.json';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nProvider initialMessages={enMessages}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </I18nProvider>
  );
}
