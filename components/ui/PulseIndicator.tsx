'use client';

import { cn } from '@/lib/utils/cn';

interface PulseIndicatorProps {
  status: 'healthy' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const statusColors = {
  healthy: 'bg-[#00ff88]',
  warning: 'bg-[#ffb800]',
  error: 'bg-[#ff3366]',
  info: 'bg-[#00f0ff]',
};

const statusRingColors = {
  healthy: 'bg-[#00ff88]/30',
  warning: 'bg-[#ffb800]/30',
  error: 'bg-[#ff3366]/30',
  info: 'bg-[#00f0ff]/30',
};

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function PulseIndicator({
  status,
  size = 'md',
  showLabel = false,
  label,
  className,
}: PulseIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing ring — angular square */}
        <span
          className={cn(
            'absolute clip-sm animate-ping',
            statusRingColors[status],
            sizeClasses[size]
          )}
          style={{ animationDuration: '2s' }}
        />
        {/* Middle ring */}
        <span
          className={cn(
            'absolute clip-sm opacity-75 animate-ping',
            statusRingColors[status],
            sizeClasses[size]
          )}
          style={{ animationDuration: '2s', animationDelay: '0.3s' }}
        />
        {/* Core indicator — angular */}
        <span
          className={cn(
            'relative clip-sm',
            statusColors[status],
            sizeClasses[size]
          )}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-mono uppercase tracking-wider text-[#7a7a8e]">
          {label || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )}
    </div>
  );
}
