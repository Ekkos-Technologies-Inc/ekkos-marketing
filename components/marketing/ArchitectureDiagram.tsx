'use client';

import { cn } from '@/lib/utils/cn';
import {
  Brain,
  Database,
  FileText,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Architecture</span>
          <h2 className="text-2xl md:text-3xl font-display text-[#e8e8f0] mb-2">
            The ekkOS Layer
          </h2>
          <p className="text-[#7a7a8e] font-body text-lg">
            The infrastructure that gives your AI persistent memory
          </p>
        </div>

        {/* Main Flow Diagram */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1.5fr_auto_1fr] gap-4 items-center min-h-[320px]">
            {/* Box 1: YOU */}
            <div className="card p-6 text-center h-full flex flex-col justify-center">
              <div className="w-14 h-14 mx-auto mb-4 clip-md bg-[#16161f] border border-[#2a2a3e] flex items-center justify-center">
                <User className="w-7 h-7 text-[#e8e8f0]" />
              </div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">You</h3>
              <p className="text-sm font-body text-[#7a7a8e]">Ask a question</p>
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center justify-center">
              <svg width="48" height="24" viewBox="0 0 48 24">
                <path
                  d="M0 12 L36 12 M30 6 L42 12 L30 18"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Box 2: ekkOS MEMORY (Center - Dominant) */}
            <div className="clip-lg bg-[#111118]/85 border border-[#00f0ff]/20 p-8 relative overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 clip-md bg-[#00f0ff] flex items-center justify-center">
                    <Database className="w-6 h-6 text-[#0a0a0f]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-[#e8e8f0]">ekkOS Memory</h3>
                    <p className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">Living knowledge layer</p>
                  </div>
                </div>

                {/* Sub-boxes Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {/* Patterns */}
                  <div className="p-4 clip-sm bg-[#0d0d14]/80 border border-[#ffb800]/20">
                    <Sparkles className="w-5 h-5 text-[#ffb800] mb-2" />
                    <div className="text-sm font-mono font-semibold text-[#e8e8f0] uppercase">Patterns</div>
                    <div className="text-xs text-[#7a7a8e] font-body">What worked</div>
                  </div>

                  {/* Directives */}
                  <div className="p-4 clip-sm bg-[#0d0d14]/80 border border-[#00f0ff]/20">
                    <Shield className="w-5 h-5 text-[#00f0ff] mb-2" />
                    <div className="text-sm font-mono font-semibold text-[#e8e8f0] uppercase">Directives</div>
                    <div className="text-xs text-[#7a7a8e] font-body">Your rules</div>
                  </div>

                  {/* Episodes */}
                  <div className="p-4 clip-sm bg-[#0d0d14]/80 border border-[#00f0ff]/20">
                    <FileText className="w-5 h-5 text-[#00f0ff] mb-2" />
                    <div className="text-sm font-mono font-semibold text-[#e8e8f0] uppercase">Episodes</div>
                    <div className="text-xs text-[#7a7a8e] font-body">Past work</div>
                  </div>
                </div>

                {/* Golden Loop Badge */}
                <div className="flex items-center justify-center">
                  <div className="tag gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse-dot" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    <span>Golden Loop: Learn &rarr; Apply &rarr; Improve</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center justify-center">
              <svg width="48" height="24" viewBox="0 0 48 24">
                <path
                  d="M0 12 L36 12 M30 6 L42 12 L30 18"
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* Box 3: SMARTER AI */}
            <div className="card p-6 text-center h-full flex flex-col justify-center">
              <div className="w-14 h-14 mx-auto mb-4 clip-md bg-[#0d0d14]/80 border border-[#00ff88]/30 flex items-center justify-center">
                <Brain className="w-7 h-7 text-[#00ff88]" />
              </div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Smarter AI</h3>
              <div className="space-y-1 text-sm font-body text-[#7a7a8e]">
                <p>Knows your history</p>
                <p>Follows your rules</p>
                <p className="text-[#00ff88]">Gets smarter daily</p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* YOU */}
            <div className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 clip-sm bg-[#16161f] border border-[#2a2a3e] flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-[#e8e8f0]" />
              </div>
              <div>
                <h3 className="font-display text-[#e8e8f0]">You</h3>
                <p className="text-sm font-body text-[#7a7a8e]">Ask a question in your IDE</p>
              </div>
            </div>

            {/* Down Arrow */}
            <div className="flex justify-center py-2">
              <svg width="24" height="32" viewBox="0 0 24 32">
                <path
                  d="M12 0 L12 24 M6 18 L12 28 L18 18"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* ekkOS MEMORY */}
            <div className="clip-lg bg-[#111118]/85 border border-[#00f0ff]/20 p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 clip-sm bg-[#00f0ff] flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#0a0a0f]" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-[#e8e8f0]">ekkOS Memory</h3>
                  <p className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">Living knowledge layer</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-3 clip-sm bg-[#0d0d14]/80 border border-[#ffb800]/20 text-center">
                  <Sparkles className="w-4 h-4 text-[#ffb800] mx-auto mb-1" />
                  <div className="text-xs font-mono text-[#e8e8f0] uppercase">Patterns</div>
                </div>
                <div className="p-3 clip-sm bg-[#0d0d14]/80 border border-[#00f0ff]/20 text-center">
                  <Shield className="w-4 h-4 text-[#00f0ff] mx-auto mb-1" />
                  <div className="text-xs font-mono text-[#e8e8f0] uppercase">Rules</div>
                </div>
                <div className="p-3 clip-sm bg-[#0d0d14]/80 border border-[#00f0ff]/20 text-center">
                  <FileText className="w-4 h-4 text-[#00f0ff] mx-auto mb-1" />
                  <div className="text-xs font-mono text-[#e8e8f0] uppercase">History</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="tag gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse-dot" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                  <span>Golden Loop Active</span>
                </div>
              </div>
            </div>

            {/* Down Arrow */}
            <div className="flex justify-center py-2">
              <svg width="24" height="32" viewBox="0 0 24 32">
                <path
                  d="M12 0 L12 24 M6 18 L12 28 L18 18"
                  stroke="#00ff88"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  opacity="0.6"
                />
              </svg>
            </div>

            {/* SMARTER AI */}
            <div className="card p-5 flex items-center gap-4">
              <div className="w-12 h-12 clip-sm bg-[#0d0d14]/80 border border-[#00ff88]/30 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div>
                <h3 className="font-display text-[#e8e8f0]">Smarter AI</h3>
                <p className="text-sm font-body text-[#7a7a8e]">Knows history &bull; Follows rules &bull; Improves daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Capability Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Search, label: 'Search', desc: 'Finds relevant patterns before AI answers', color: 'cyan' },
            { icon: Sparkles, label: 'Capture', desc: 'Auto-saves what works without effort', color: 'amber' },
            { icon: Shield, label: 'Validate', desc: 'Checks against your rules first', color: 'cyan' },
            { icon: TrendingUp, label: 'Compound', desc: 'Gets smarter every day you use it', color: 'green' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-4 clip-sm bg-[#111118]/85 border border-[#1a1a2e] hover:border-[#2a2a3e] transition-colors"
            >
              <div className={cn(
                "w-9 h-9 clip-sm flex items-center justify-center flex-shrink-0 bg-[#0d0d14]/80 border",
                item.color === 'cyan' && 'border-[#00f0ff]/20',
                item.color === 'amber' && 'border-[#ffb800]/20',
                item.color === 'green' && 'border-[#00ff88]/20',
              )}>
                <item.icon className={cn(
                  "w-4 h-4",
                  item.color === 'cyan' && 'text-[#00f0ff]',
                  item.color === 'amber' && 'text-[#ffb800]',
                  item.color === 'green' && 'text-[#00ff88]',
                )} />
              </div>
              <div>
                <div className="text-sm font-mono font-semibold text-[#e8e8f0] uppercase tracking-wide mb-0.5">{item.label}</div>
                <div className="text-xs text-[#7a7a8e] font-body leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
