'use client';

import { BarChart3, Target, TrendingUp } from 'lucide-react';

interface DataPoint {
  week: number;
  patterns: number;
  speedup: number;
  coverage: number;
}

const timelineData: DataPoint[] = [
  { week: 1, patterns: 12, speedup: 2.3, coverage: 8 },
  { week: 2, patterns: 28, speedup: 3.1, coverage: 15 },
  { week: 3, patterns: 45, speedup: 3.8, coverage: 22 },
  { week: 4, patterns: 62, speedup: 4.5, coverage: 28 },
  { week: 8, patterns: 89, speedup: 5.8, coverage: 34 },
  { week: 12, patterns: 347, speedup: 12.4, coverage: 71 },
];

export function LearningCurve() {
  const maxPatterns = Math.max(...timelineData.map(d => d.patterns));
  const maxCoverage = 100;

  return (
    <div className="space-y-12">
      {/* Pattern Library Growth */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-[#00f0ff]" />
          <h3 className="text-2xl font-display text-[#e8e8f0]">Pattern Library Growth</h3>
        </div>
        <p className="text-[#7a7a8e] font-body mb-6 text-sm">
          Cumulative patterns captured over time. More patterns = faster problem solving.
        </p>

        <div className="space-y-4">
          {timelineData.map((point, i) => {
            const isMilestone = point.week === 1 || point.week === 4 || point.week === 8 || point.week === 12;
            if (!isMilestone) return null;

            const width = (point.patterns / maxPatterns) * 100;
            const label = point.week === 1 ? 'Week 1' : point.week === 4 ? 'Month 1' : point.week === 8 ? 'Month 2' : 'Month 3';

            return (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#e8e8f0] font-mono text-xs uppercase tracking-wide">{label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#00f0ff] font-display">{point.patterns} patterns</span>
                    <span className="text-[#00ff88] font-display">&rarr; {point.speedup}x speedup</span>
                  </div>
                </div>
                <div className="h-8 bg-[#0d0d14]/50 backdrop-blur-md clip-sm overflow-hidden relative border border-[#1a1a2e]">
                  <div
                    className="h-full bg-[#00f0ff]/20 transition-all duration-1000 relative"
                    style={{ width: `${width}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/40 to-[#00f0ff]/10" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-display text-[#e8e8f0]">{point.patterns}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Coverage Evolution */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-[#00f0ff]" />
          <h3 className="text-2xl font-display text-[#e8e8f0]">Pattern Coverage Evolution</h3>
        </div>
        <p className="text-[#7a7a8e] font-body mb-6 text-sm">
          Percentage of problems that have matching patterns. Higher coverage = less time explaining context.
        </p>

        <div className="space-y-4">
          {timelineData.filter(p => p.week === 1 || p.week === 4 || p.week === 8 || p.week === 12).map((point, i) => {
            const width = (point.coverage / maxCoverage) * 100;
            const label = point.week === 1 ? 'Week 1' : point.week === 4 ? 'Month 1' : point.week === 8 ? 'Month 2' : 'Month 3';
            const description = point.week === 1 ? 'mostly common fixes' : point.week === 4 ? 'recurring issues captured' : point.week === 8 ? 'workflow patterns emerging' : 'deep institutional knowledge';

            return (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#e8e8f0] font-mono text-xs uppercase tracking-wide">{label}</span>
                  <span className="text-[#4a4a5e] font-mono text-xs italic">{description}</span>
                </div>
                <div className="h-8 bg-[#0d0d14]/50 backdrop-blur-md clip-sm overflow-hidden relative border border-[#1a1a2e]">
                  <div
                    className="h-full bg-[#00f0ff]/20 transition-all duration-1000 relative"
                    style={{ width: `${width}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/40 to-[#00f0ff]/10" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-display text-[#e8e8f0]">{point.coverage}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Rate Maturation */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#00ff88]" />
          <h3 className="text-2xl font-display text-[#e8e8f0]">Success Rate Maturation</h3>
        </div>
        <p className="text-[#7a7a8e] font-body mb-6 text-sm">
          Average pattern confidence improves as patterns are validated through real usage.
        </p>

        <div className="space-y-6">
          {[
            { period: 'Initial patterns', rate: 0.62, label: 'learning phase', color: '#ffb800' },
            { period: 'Month 1 patterns', rate: 0.81, label: 'validated', color: '#00f0ff' },
            { period: 'Month 3 patterns', rate: 0.93, label: 'battle-tested', color: '#00ff88' },
          ].map((item, i) => {
            const width = item.rate * 100;

            return (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#e8e8f0] font-mono text-xs uppercase tracking-wide">{item.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display" style={{ color: item.color }}>{(item.rate * 100).toFixed(0)}%</span>
                    <span className="text-[#4a4a5e] font-mono text-xs italic">({item.label})</span>
                  </div>
                </div>
                <div className="h-8 bg-[#0d0d14]/50 backdrop-blur-md clip-sm overflow-hidden relative border border-[#1a1a2e]">
                  <div
                    className="h-full transition-all duration-1000 relative"
                    style={{
                      width: `${width}%`,
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, ${item.color}40, ${item.color}10)`,
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-display text-[#e8e8f0]">{(item.rate * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
