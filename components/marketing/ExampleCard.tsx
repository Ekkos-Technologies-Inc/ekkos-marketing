'use client';

import { ArrowRight, Clock, Zap } from 'lucide-react';

interface ExampleCardProps {
  problem: string;
  before: string;
  after: string;
  speedup: string;
  delay?: number;
}

export function ExampleCard({
  problem,
  before,
  after,
  speedup,
  delay = 0,
}: ExampleCardProps) {
  return (
    <div
      className="card p-6 group animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Problem */}
        <div className="flex-1">
          <p className="text-[#e8e8f0] font-mono text-sm font-medium mb-2">{problem}</p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#7a7a8e]">
            <Clock className="w-4 h-4 text-[#ff3366]" />
            <span className="uppercase tracking-wide">Without ekkOS: {before}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:block">
          <ArrowRight className="w-6 h-6 text-[#00f0ff]" />
        </div>

        {/* After */}
        <div className="flex-1 md:text-right">
          <div className="flex items-center justify-start md:justify-end gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] font-mono text-sm font-medium uppercase tracking-wide">
              With ekkOS: {after}
            </span>
          </div>
          <div className="text-2xl font-display text-[#00f0ff]">
            {speedup} faster
          </div>
        </div>
      </div>
    </div>
  );
}
