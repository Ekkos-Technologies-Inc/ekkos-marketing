'use client';

import { Rocket, TrendingUp, Zap } from 'lucide-react';

interface TimelinePhase {
  period: string;
  title: string;
  icon: typeof Zap;
  color: string;
  metrics: {
    patterns: string;
    coverage: string;
    speedup: string;
  };
  features: string[];
}

const phases: TimelinePhase[] = [
  {
    period: 'Day 1',
    title: 'Immediate Value',
    icon: Zap,
    color: '#00ff88',
    metrics: {
      patterns: '50+ pre-loaded',
      coverage: 'Common issues',
      speedup: '2-3x',
    },
    features: [
      '50+ pre-loaded patterns for Node.js, React, Next.js, Supabase',
      '2-3x speedup on common setup/config issues',
      'Conflict checking works from first session',
    ],
  },
  {
    period: 'Week 1-4',
    title: 'Accelerating Returns',
    icon: Rocket,
    color: '#00f0ff',
    metrics: {
      patterns: '20-50 custom',
      coverage: 'Your codebase',
      speedup: '4-6x',
    },
    features: [
      'Your unique patterns start accumulating (target: 20-50 patterns)',
      'Coverage expands to your specific codebase/stack',
      'Speedup grows to 4-6x as pattern library matures',
    ],
  },
  {
    period: 'Month 2-3',
    title: 'Compound Intelligence',
    icon: TrendingUp,
    color: '#ffb800',
    metrics: {
      patterns: '100+',
      coverage: '70%+',
      speedup: '10-15x',
    },
    features: [
      '100+ patterns capturing your workflow and decisions',
      '70%+ problem coverage (most issues have patterns)',
      '10-15x speedup on recurring problems',
      'AI "knows" your codebase like a senior engineer',
    ],
  },
];

export function GrowthTimeline() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-12">
        <span className="section-label block">Timeline</span>
        <h2 className="text-3xl md:text-5xl font-display text-[#e8e8f0] tracking-tight">
          How Long Until I See Results?
        </h2>
        <p className="text-xl text-[#7a7a8e] font-body max-w-3xl mx-auto">
          Transparent timelines showing when you'll see compound learning kick in.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <div
              key={i}
              className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] hover:border-[#2a2a3e] p-8 relative overflow-hidden transition-colors"
            >
              {/* Top accent line in phase color */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-40"
                style={{ background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)` }}
              />

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 clip-sm bg-[#0d0d14]/50 backdrop-blur-md flex items-center justify-center border"
                    style={{ borderColor: `${phase.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: phase.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#7a7a8e] uppercase tracking-wider">{phase.period}</div>
                    <h3 className="text-xl font-display" style={{ color: phase.color }}>
                      {phase.title === 'Immediate Value' ? (
                        <>Immediate<br />Value</>
                      ) : (
                        phase.title
                      )}
                    </h3>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3 p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a8e] font-mono text-xs uppercase">Patterns</span>
                    <span className="text-[#e8e8f0] font-mono text-sm">{phase.metrics.patterns}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a8e] font-mono text-xs uppercase">Coverage</span>
                    <span className="text-[#e8e8f0] font-mono text-sm">{phase.metrics.coverage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7a7a8e] font-mono text-xs uppercase">Speedup</span>
                    <span className="font-display text-lg" style={{ color: phase.color }}>{phase.metrics.speedup}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {phase.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#7a7a8e] font-body">
                      <div
                        className="w-1.5 h-1.5 mt-1.5 flex-shrink-0"
                        style={{
                          backgroundColor: phase.color,
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Compound Effect Message */}
      <div className="clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#00f0ff]/20 p-8 text-center relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-display text-[#e8e8f0]">The Longer You Use It, The Better It Gets</h3>
          <p className="text-[#7a7a8e] font-body leading-relaxed">
            ekkOS is designed for compound learning. Unlike static tools that plateau,
            your memory system gets exponentially smarter with every problem solved.
          </p>
          <div className="pt-4 border-t border-[#1a1a2e]">
            <div className="tag gap-2 inline-flex">
              <TrendingUp className="w-4 h-4" />
              <span>Exponential curve: Week 1 &rarr; Month 1 &rarr; Month 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
