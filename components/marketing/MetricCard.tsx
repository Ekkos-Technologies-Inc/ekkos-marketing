'use client';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface MetricCardProps {
  value: string;
  label: string;
  detail: string;
  variant?: 'subtle' | 'default' | 'elevated' | 'prominent';
  glow?: 'purple' | 'blue' | 'emerald' | 'pink' | 'none';
  delay?: number;
}

export function MetricCard({
  value,
  label,
  detail,
  variant = 'elevated',
  glow = 'purple',
  delay = 0,
}: MetricCardProps) {
  // Extract numeric value for animation if present
  const numericMatch = value.match(/^(\d+\.?\d*)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = numericValue && numericMatch ? value.replace(numericMatch[0], '') : value;
  const hasDecimal = value.includes('.');

  return (
    <div
      className="card p-8 text-center group relative top-glow animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      <div className="mb-4">
        {numericValue !== null ? (
          <div className="text-6xl font-display text-[#00f0ff]">
            <AnimatedCounter
              value={numericValue}
              duration={2000}
              decimals={hasDecimal ? 2 : 0}
            />
            <span>{suffix}</span>
          </div>
        ) : (
          <div className="text-6xl font-display text-[#00f0ff]">
            {value}
          </div>
        )}
      </div>

      <h3 className="text-xl font-mono font-semibold text-[#e8e8f0] uppercase tracking-wide mb-3">
        {label}
      </h3>

      <p className="text-[#7a7a8e] font-body text-sm leading-relaxed">
        {detail}
      </p>
    </div>
  );
}
