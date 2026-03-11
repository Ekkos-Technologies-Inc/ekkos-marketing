'use client';

import { EkkosLogo } from '@/components/ui/EkkosLogo';
import { LanguageSwitcher, LanguageSwitcherCompact } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/i18n';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- NavLink with sliding underline + glow ---
interface NavLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  amber?: boolean;
}

function NavLink({ href, children, external, amber }: NavLinkProps) {
  const color = amber ? 'text-[#ffb800]' : 'text-[#7a7a8e]';
  const hoverColor = amber ? 'group-hover:text-[#ffb800]/80' : 'group-hover:text-[#00f0ff]';
  const underlineColor = amber ? 'bg-[#ffb800]' : 'bg-[#00f0ff]';
  const glowStyle = amber
    ? { filter: 'drop-shadow(0 0 6px rgba(255,184,0,0.4))' }
    : { filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.4))' };

  const classes = `font-mono text-xs uppercase tracking-[2px] ${color} ${hoverColor} transition-colors`;

  const inner = (
    <>
      <span className={`${classes} transition-all duration-200 group-hover:-translate-y-[1px] inline-block`}
        style={{ transition: 'color 0.2s, filter 0.3s, transform 0.2s' }}
      >
        {children}
      </span>
      <span
        className={`absolute bottom-0 left-0 right-0 h-[1px] ${underlineColor} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group pb-1"
        style={{}}
      >
        <style>{`.group:hover .nav-glow { ${Object.entries(glowStyle).map(([k,v]) => `${k}:${v}`).join(';')} }`}</style>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="relative group pb-1">
      {inner}
    </Link>
  );
}

// --- Stagger variants for nav entrance ---
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Mobile menu animation ---
const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 border-b border-[#1a1a2e] backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/" className="flex items-center gap-3">
              <EkkosLogo size={28} animated />
              <span className="font-mono font-bold text-2xl tracking-tight">
                <span className="text-[#00f0ff]">ekkOS</span>
                <span className="cursor-blink">_</span>
                <sup className="text-[9px] text-[#4a4a5e] ml-0.5">™</sup>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation — staggered entrance */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={navItemVariants}>
              <NavLink href="/about">About</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="/features">{t('nav.features')}</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="/pulse" amber>Pulse</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="/cortex">Cortex</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="/pricing">{t('nav.pricing')}</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="https://blog.ekkos.dev" external>Blog</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="https://docs.ekkos.dev" external>{t('nav.docs')}</NavLink>
            </motion.div>
            <motion.div variants={navItemVariants}>
              <NavLink href="https://github.com/Ekkos-Technologies-Inc" external>GitHub</NavLink>
            </motion.div>
          </motion.div>

          {/* Desktop CTA + Language Switcher — staggered */}
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <LanguageSwitcher />
            <NavLink href="https://platform.ekkos.dev/login" external>
              {t('nav.signIn')}
            </NavLink>
            <a
              href="https://platform.ekkos.dev/signup"
              className="btn-primary hover:scale-[1.03] hover:shadow-glow-cyan-sm transition-all duration-200"
            >
              {t('nav.getStarted')} <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#7a7a8e] hover:text-[#00f0ff] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu — animated slide-down */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-[#1a1a2e] pt-4 bg-[#0d0d14]/50 backdrop-blur-md overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-4">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/features">{t('nav.features')}</NavLink>
                <NavLink href="/pulse" amber>Pulse</NavLink>
                <NavLink href="/cortex">Cortex</NavLink>
                <NavLink href="/pricing">{t('nav.pricing')}</NavLink>
                <NavLink href="https://blog.ekkos.dev" external>Blog</NavLink>
                <NavLink href="https://docs.ekkos.dev" external>{t('nav.docs')}</NavLink>
                <NavLink href="https://github.com/Ekkos-Technologies-Inc" external>GitHub</NavLink>

                {/* Mobile Language Switcher */}
                <div className="pt-4 border-t border-[#1a1a2e]">
                  <div className="font-mono text-xs uppercase tracking-[2px] text-[#4a4a5e] mb-2">
                    {t('language.select')}
                  </div>
                  <LanguageSwitcherCompact />
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-[#1a1a2e]">
                  <a
                    href="https://platform.ekkos.dev/login"
                    className="font-mono text-xs uppercase tracking-[2px] text-center py-2 text-[#7a7a8e] hover:text-[#00f0ff] transition-colors"
                  >
                    {t('nav.signIn')}
                  </a>
                  <a
                    href="https://platform.ekkos.dev/signup"
                    className="btn-primary text-center justify-center hover:scale-[1.03] hover:shadow-glow-cyan-sm transition-all duration-200"
                  >
                    {t('nav.getStarted')} <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
