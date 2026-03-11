'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ShimmerButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function ShimmerButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ShimmerButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-[#00f0ff] text-[#0a0a0f] font-semibold',
    secondary: 'bg-transparent text-[#e8e8f0] border border-[#2a2a3e]',
    ghost: 'bg-transparent text-[#e8e8f0] hover:bg-[#16161f]',
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden clip-md
        font-mono uppercase tracking-wider
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect — cyan sweep */}
      {variant === 'primary' && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '200%',
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>

      {/* Glow effect on hover — cyan */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4), transparent)',
            filter: 'blur(16px)',
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Secondary hover — cyan border glow */}
      {variant === 'secondary' && !disabled && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.1)',
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}
