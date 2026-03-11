'use client';

import { Layers } from 'lucide-react';

interface LayerProps {
  number: string;
  name: string;
  desc: string;
  delay?: number;
}

export function Layer({ number, name, desc, delay = 0 }: LayerProps) {
  return (
    <div
      className="flex items-start gap-4 p-4 clip-sm bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] hover:border-[#2a2a3e] transition-all animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Layer Number */}
      <div className="flex-shrink-0 w-8 h-8 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#00f0ff]/30 flex items-center justify-center">
        <span className="text-xs font-display text-[#00f0ff]">{number}</span>
      </div>

      {/* Layer Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-mono font-semibold text-[#e8e8f0] uppercase tracking-wide mb-1">
          {name}
        </h4>
        <p className="text-xs text-[#7a7a8e] font-body leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

interface LayerListProps {
  layers: Array<{
    number: string;
    name: string;
    desc: string;
  }>;
  title?: string;
}

export function LayerList({ layers, title }: LayerListProps) {
  return (
    <div>
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-6 h-6 text-[#00f0ff]" />
          <h4 className="text-lg font-display text-[#e8e8f0]">{title}</h4>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {layers.map((layer, index) => (
          <Layer
            key={layer.number}
            {...layer}
            delay={index * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
