'use client';

import { motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'avatar' | 'chart' | 'button';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  ...props
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 clip-sm';
      case 'card':
        return 'h-48 clip-md';
      case 'avatar':
        return 'w-12 h-12 clip-sm';
      case 'chart':
        return 'h-64 clip-md';
      case 'button':
        return 'h-10 clip-md';
      default:
        return 'h-4 clip-sm';
    }
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonItem
            key={i}
            className={`${getVariantClasses()} ${className}`}
            style={style}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <SkeletonItem
      className={`${getVariantClasses()} ${className}`}
      style={style}
      {...props}
    />
  );
}

function SkeletonItem({ className, style, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-[#111118]/60 backdrop-blur-xl ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Shimmer effect — cyan tinted */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

/**
 * Pre-built skeleton layouts for common use cases
 */
export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <Skeleton variant="text" count={3} />
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="p-6 space-y-3">
      <Skeleton width="40%" height={16} />
      <Skeleton width="60%" height={32} />
      <Skeleton variant="chart" height={60} />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === 0 ? '30%' : '20%'}
          height={16}
        />
      ))}
    </div>
  );
}
