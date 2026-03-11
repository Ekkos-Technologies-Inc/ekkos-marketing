'use client';

import { motion } from 'framer-motion';
import { Rocket, MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EarlyAccessBannerProps {
  variant?: 'full' | 'compact';
  dismissible?: boolean;
}

const DISCORD_INVITE = 'https://discord.gg/w2JGepq9qZ';

export function EarlyAccessBanner({ variant = 'full', dismissible = false }: EarlyAccessBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissible) {
      const wasDismissed = localStorage.getItem('ekkos_beta_banner_dismissed');
      if (wasDismissed) setDismissed(true);
    }
  }, [dismissible]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('ekkos_beta_banner_dismissed', 'true');
  };

  if (dismissed) return null;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] clip-md p-3 mb-4"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="tag">
              2026
            </span>
            <span className="text-sm font-body text-[#7a7a8e]">
              New Year, Smarter AI. Free forever on Developer plan.
            </span>
          </div>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 clip-sm bg-[#16161f] border border-[#2a2a3e] text-[#00f0ff] text-xs font-mono uppercase tracking-wider transition-colors hover:border-[#00f0ff]/50"
          >
            <MessageCircle className="w-4 h-4" />
            Discord
          </a>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-[#16161f] clip-sm transition-colors"
          >
            <X className="w-4 h-4 text-[#4a4a5e]" />
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-[#0d0d14]/50 backdrop-blur-md border-b border-[#1a1a2e]"
    >
      {/* Subtle cyan gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

      {/* Subtle background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,240,255,0.03),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-left">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="hidden sm:block"
            >
              <Rocket className="w-5 h-5 text-[#00f0ff]" />
            </motion.div>
            <span className="tag">
              2026
            </span>
            <span className="text-xs sm:text-sm font-body text-[#7a7a8e]">
              <strong className="text-[#e8e8f0]">New Year, Smarter AI.</strong>
              <span className="hidden sm:inline"> Join developers who never explain their code twice.</span>
            </span>
          </div>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-1 px-3"
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Join Discord
          </a>
        </div>
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1.5 hover:bg-[#16161f] clip-sm transition-colors"
        >
          <X className="w-4 h-4 text-[#4a4a5e]" />
        </button>
      )}
    </motion.div>
  );
}
