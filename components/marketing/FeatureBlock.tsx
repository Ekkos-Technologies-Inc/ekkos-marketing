'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FeatureBlockProps {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  detail?: string;
  delay?: number;
  glow?: 'purple' | 'blue' | 'emerald' | 'pink' | 'none';
}

export function FeatureBlock({
  icon: Icon,
  number,
  title,
  description,
  detail,
  delay = 0,
  glow = 'purple',
}: FeatureBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="card p-8 group relative animate-fade-in-up top-glow"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Number Badge */}
      <div className="inline-flex items-center justify-center w-12 h-12 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#00f0ff]/30 mb-6">
        <span className="text-2xl font-display text-[#00f0ff]">
          {number}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-6">
        <Icon className="w-12 h-12 text-[#00f0ff]" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-display text-[#e8e8f0] mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#7a7a8e] font-body text-lg leading-relaxed mb-4">
        {description}
      </p>

      {/* Expandable Detail */}
      {detail && (
        <div className="mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-[#00f0ff] hover:text-[#33f3ff] transition-colors font-mono text-xs uppercase tracking-wider"
          >
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                expanded && 'rotate-90'
              )}
            />
            <span>
              {expanded ? 'Show less' : 'How it works'}
            </span>
          </button>

          {expanded && (
            <div className="mt-4 p-4 bg-[#0d0d14]/50 backdrop-blur-md clip-sm border border-[#1a1a2e] animate-fade-in-up">
              <p className="text-sm text-[#7a7a8e] font-body leading-relaxed">
                {detail}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
