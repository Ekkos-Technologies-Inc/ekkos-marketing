'use client';

import { Activity, Sparkles, TrendingUp, TrendingDown, Users, Zap, Database } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import { cn } from '@/lib/utils/cn';

const iconMap = {
  Activity,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Database,
} as const;

type IconName = keyof typeof iconMap;

interface MetricCardProps {
  label: string;
  value: number | string;
  previousValue?: number;
  format?: 'number' | 'percentage' | 'duration' | 'currency';
  icon: IconName;
  color: 'purple' | 'blue' | 'emerald' | 'pink' | 'amber';
  sparklineData?: number[];
  loading?: boolean;
  delay?: number;
}

/* All color variants now map to the cyberpunk palette */
const colorClasses = {
  purple: {
    bg: 'bg-[#00f0ff]/10',
    text: 'text-[#00f0ff]',
    gradient: 'from-[#00f0ff]/10 to-transparent',
  },
  blue: {
    bg: 'bg-[#00f0ff]/10',
    text: 'text-[#00f0ff]',
    gradient: 'from-[#00f0ff]/10 to-transparent',
  },
  emerald: {
    bg: 'bg-[#00ff88]/10',
    text: 'text-[#00ff88]',
    gradient: 'from-[#00ff88]/10 to-transparent',
  },
  pink: {
    bg: 'bg-[#ff3366]/10',
    text: 'text-[#ff3366]',
    gradient: 'from-[#ff3366]/10 to-transparent',
  },
  amber: {
    bg: 'bg-[#ffb800]/10',
    text: 'text-[#ffb800]',
    gradient: 'from-[#ffb800]/10 to-transparent',
  },
};

function formatValue(value: number, format: MetricCardProps['format']): string {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'duration':
      return `${value}ms`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    default:
      return value.toLocaleString();
  }
}

function calculateTrend(current: number, previous: number): {
  percentage: number;
  direction: 'up' | 'down' | 'neutral';
} {
  if (previous === 0) return { percentage: 0, direction: 'neutral' };
  const percentage = ((current - previous) / previous) * 100;
  const direction = percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral';
  return { percentage: Math.abs(percentage), direction };
}

export function MetricCard({
  label,
  value,
  previousValue,
  format = 'number',
  icon: iconName,
  color,
  sparklineData,
  loading = false,
  delay = 0,
}: MetricCardProps) {
  const colors = colorClasses[color];
  const numericValue = typeof value === 'number' ? value : 0;
  const trend = previousValue !== undefined ? calculateTrend(numericValue, previousValue) : null;

  const Icon = iconMap[iconName];

  if (loading) {
    return (
      <GlassCard variant="elevated" animate delay={delay} className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-[#1a1a2e] clip-sm" />
            <div className="h-10 w-10 bg-[#1a1a2e] clip-sm" />
          </div>
          <div className="h-8 w-32 bg-[#1a1a2e] clip-sm" />
          <div className="h-4 w-20 bg-[#1a1a2e] clip-sm" />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      variant="elevated"
      hover="lift"
      animate
      delay={delay}
      className="p-6 relative overflow-hidden group"
    >
      {/* Background gradient on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          colors.gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-[#7a7a8e]">{label}</span>
          <div className={cn('p-2.5 clip-sm', colors.bg)}>
            <Icon className={cn('w-5 h-5', colors.text)} />
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <div>
            {typeof value === 'number' ? (
              <AnimatedCounter
                value={value}
                className="text-3xl font-display text-[#00f0ff]"
              />
            ) : (
              <div className="text-3xl font-display text-[#00f0ff]">{value}</div>
            )}
          </div>

          {/* Trend */}
          {trend && trend.direction !== 'neutral' && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-mono px-2 py-1 clip-sm',
                trend.direction === 'up'
                  ? 'bg-[#00ff88]/10 text-[#00ff88]'
                  : 'bg-[#ff3366]/10 text-[#ff3366]'
              )}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend.percentage.toFixed(1)}%</span>
            </div>
          )}
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="h-12 -mx-6 -mb-6 px-6 pb-6">
            <div className="h-full relative">
              <svg
                viewBox={`0 0 ${sparklineData.length * 10} 40`}
                className="w-full h-full opacity-50"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={generateSparklinePath(sparklineData)}
                  fill={`url(#gradient-${color})`}
                  className={colors.text}
                />
                <path
                  d={generateSparklinePath(sparklineData, true)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={colors.text}
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function generateSparklinePath(data: number[], strokeOnly = false): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = index * 10;
    const y = 40 - ((value - min) / range) * 35;
    return `${x},${y}`;
  });

  if (strokeOnly) {
    return `M ${points.join(' L ')}`;
  }

  const firstPoint = points[0].split(',');
  const lastPoint = points[points.length - 1].split(',');

  return `M ${firstPoint[0]},40 L ${points.join(' L ')} L ${lastPoint[0]},40 Z`;
}
