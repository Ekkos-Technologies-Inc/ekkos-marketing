'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'pattern';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { ...toast, id }]);

    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#00ff88]" />,
    error: <AlertCircle className="w-5 h-5 text-[#ff3366]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#ffb800]" />,
    info: <Info className="w-5 h-5 text-[#00f0ff]" />,
    pattern: <Sparkles className="w-5 h-5 text-[#00f0ff]" />,
  };

  const accentBorders = {
    success: 'border-l-[#00ff88]/50',
    error: 'border-l-[#ff3366]/50',
    warning: 'border-l-[#ffb800]/50',
    info: 'border-l-[#00f0ff]/50',
    pattern: 'border-l-[#00f0ff]/50',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            className={cn(
              'p-4 bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] border-l-2 clip-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
              accentBorders[toast.type]
            )}
          >
            <div className="flex gap-3">
              {icons[toast.type]}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-medium text-[#e8e8f0]">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-sm font-body text-[#7a7a8e]">{toast.message}</p>
                )}
                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className="mt-2 text-sm font-mono font-medium text-[#00f0ff] hover:text-[#33f3ff] uppercase tracking-wider"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 -m-1 text-[#4a4a5e] hover:text-[#e8e8f0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
