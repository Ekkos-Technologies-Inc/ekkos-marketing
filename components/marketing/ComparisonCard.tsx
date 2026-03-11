'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ComparisonCardProps {
  label: string;
  items: string[];
  highlight?: boolean;
  delay?: number;
}

export function ComparisonCard({
  label,
  items,
  highlight = false,
  delay = 0,
}: ComparisonCardProps) {
  return (
    <div
      className={cn(
        'p-6 group clip-md border animate-fade-in-up',
        highlight
          ? 'bg-[#111118]/60 backdrop-blur-xl border-[#00f0ff]/30'
          : 'bg-[#111118]/60 backdrop-blur-xl border-[#1a1a2e]'
      )}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Label */}
      <div className="mb-6">
        <h3 className={cn(
          'text-xl font-display mb-2',
          highlight
            ? 'text-[#00ff88]'
            : 'text-[#ff3366]'
        )}>
          {label}
        </h3>
        {highlight && (
          <div className="tag">
            ekkOS Approach
          </div>
        )}
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {highlight ? (
              <Check className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
            )}
            <span className={cn(
              'text-sm font-body leading-relaxed',
              highlight ? 'text-[#e8e8f0]' : 'text-[#7a7a8e]'
            )}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
