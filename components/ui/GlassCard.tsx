'use client';

import { cn } from '@/lib/utils/cn';
import { HTMLAttributes, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'default' | 'elevated' | 'prominent';
  glow?: 'cyan' | 'amber' | 'green' | 'red' | 'purple' | 'blue' | 'emerald' | 'pink' | 'none';
  hover?: 'lift' | 'glow' | 'border' | 'none';
  animate?: boolean;
  delay?: number;
  children: ReactNode;
}

const variantClasses = {
  subtle: 'bg-[#0d0d14]/80 border-[#1a1a2e]',
  default: 'bg-[#111118]/85 border-[#1a1a2e]',
  elevated: 'bg-[#16161f] border-[#1a1a2e]',
  prominent: 'bg-[#16161f] border-[#2a2a3e]',
};

/* Legacy color names map to cyberpunk palette */
const glowClasses: Record<string, string> = {
  cyan: 'shadow-glow-cyan hover:shadow-[0_0_80px_rgba(0,240,255,0.3)]',
  blue: 'shadow-glow-cyan hover:shadow-[0_0_80px_rgba(0,240,255,0.3)]',
  purple: 'shadow-glow-cyan hover:shadow-[0_0_80px_rgba(0,240,255,0.3)]',
  amber: 'shadow-glow-amber hover:shadow-[0_0_80px_rgba(255,184,0,0.3)]',
  green: 'shadow-glow-green hover:shadow-[0_0_80px_rgba(0,255,136,0.3)]',
  emerald: 'shadow-glow-green hover:shadow-[0_0_80px_rgba(0,255,136,0.3)]',
  red: 'hover:shadow-[0_0_80px_rgba(255,51,102,0.3)]',
  pink: 'hover:shadow-[0_0_80px_rgba(255,51,102,0.3)]',
  none: '',
};

const hoverClasses = {
  lift: 'hover:-translate-y-1 hover:bg-[#16161f] hover:border-[#2a2a3e]',
  glow: 'hover:shadow-glow-cyan hover:border-[#2a2a3e]',
  border: 'hover:border-[#2a2a3e]',
  none: '',
};

export function GlassCard({
  variant = 'default',
  glow = 'none',
  hover = 'none',
  animate = true,
  delay = 0,
  children,
  className,
  style,
  ...props
}: GlassCardProps) {
  const baseClasses = 'border clip-md transition-all duration-300 ease-out relative top-glow';

  const animationStyle = animate && delay > 0 ? {
    ...style,
    animationDelay: `${delay}s`,
    animationFillMode: 'both' as const,
  } : style;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        glowClasses[glow] || '',
        hoverClasses[hover],
        animate && 'animate-fade-in-up',
        className
      )}
      style={animationStyle}
      {...props}
    >
      {children}
    </div>
  );
}
