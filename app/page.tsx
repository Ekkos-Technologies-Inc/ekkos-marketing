'use client';

import { ArchitectureDiagram } from '@/components/marketing/ArchitectureDiagram';
import { FeatureBlock } from '@/components/marketing/FeatureBlock';
import { IntelligenceTrace } from '@/components/marketing/IntelligenceTrace';
import { InteractiveDemo } from '@/components/marketing/InteractiveDemo';
import { EkkosLogo } from '@/components/ui/EkkosLogo';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLiveStats } from '@/hooks/useLiveStats';
import { cn } from '@/lib/utils/cn';
import { PRICING_PLANS, formatPrice } from '@/lib/pricing-config';
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Brain,
    Check,
    CheckCircle2,
    ChevronRight,
    Code2,
    Cpu,
    Database,
    GitBranch,
    Globe,
    Lock,
    Search,
    Shield,
    Sparkles,
    Terminal,
    TrendingUp,
    X,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { GlitchText } from '@/components/ui/GlitchText';

export default function HomePage() {
  const { stats, loading, error } = useLiveStats(30000);
  const formatSpeedup = (value: number | null) => (typeof value === 'number' ? `${value.toFixed(2)}x` : '—');
  const formatTurns = (value: number | null) => (typeof value === 'number' ? value.toFixed(2) : '—');
  const trackedPatternAssistedRate =
    stats.speedupResolutions > 0
      ? `${((stats.speedupPatternAssisted / stats.speedupResolutions) * 100).toFixed(1)}%`
      : '—';
  const hasTurnMetrics =
    stats.avgTurnsNoPatterns !== null &&
    stats.avgTurnsWithPatterns !== null &&
    stats.avgTurnsNoPatterns > 0;
  const turnsSavedPerResolution = hasTurnMetrics
    ? stats.avgTurnsNoPatterns - stats.avgTurnsWithPatterns
    : null;
  const turnReductionRate = hasTurnMetrics && turnsSavedPerResolution !== null
    ? `${((turnsSavedPerResolution / stats.avgTurnsNoPatterns!) * 100).toFixed(1)}%`
    : '—';

  const agents = [
    { name: 'Claude Code', icon: Brain },
    { name: 'Cursor', icon: Terminal },
    { name: 'Windsurf', icon: Zap },
    { name: 'MCP / CLI', icon: Terminal },
  ];

  const capabilities = [
    { name: 'Smart Search', desc: 'Your AI automatically searches your memory before answering. Get relevant patterns, solutions, and context instantly.', icon: Search },
    { name: 'Auto-Capture', desc: 'Solutions that work become reusable patterns. Your AI learns from every problem solved without manual effort.', icon: Sparkles },
    { name: 'Set Rules', desc: 'Define MUST/NEVER/PREFER/AVOID rules your AI follows. Your preferences become permanent behavioral constraints.', icon: Zap },
    { name: 'Total Recall', desc: 'Remember what you discussed days or weeks ago. Find past conversations and decisions instantly.', icon: GitBranch },
    { name: 'Conflict Check', desc: 'Validate suggestions against your rules before acting. Flags when suggestions conflict with your preferences.', icon: Lock },
    { name: 'Schema Awareness', desc: 'Knows your database fields and types. No more "column does not exist" errors from AI-generated queries.', icon: Database },
  ];

  const vibeBlocks = [
    {
      title: 'Taste Directives',
      description: 'Lock in aesthetic rules that persist across sessions and get enforced over time.',
      points: [
        '“Make it feel playful but premium.”',
        '“Never use corporate gradients.”',
        '“Prefer glassmorphism on dark.”',
      ],
      icon: Sparkles,
      glow: 'cyan',
    },
    {
      title: 'Vibe Patterns',
      description: 'ekkOS learns from successful iterations and turns them into reusable patterns your AI can apply again.',
      points: [
        'Captures what shipped',
        'Replays proven interaction choices',
        'Keeps good decisions easy to reuse',
      ],
      icon: GitBranch,
      glow: 'emerald',
    },
    {
      title: 'Dream Forge',
      description: 'Overnight consolidation merges winning vibes, prunes weak ones, and proposes refined directions for the next session.',
      points: [
        'Generative recombination of what worked',
        'Weak directions decay automatically',
        'Refined next-state suggestions by morning',
      ],
      icon: TrendingUp,
      glow: 'amber',
    },
    {
      title: 'Vibe Conflict Check',
      description: 'Catch when new output clashes with your established taste before bad changes spread.',
      points: [
        'Flags off-brand motion or tone',
        'Highlights conflicts before merge',
        'Protects consistency under pressure',
      ],
      icon: AlertTriangle,
      glow: 'pink',
    },
    {
      title: 'Schema-Aware Vibe',
      description: 'Preserve the feel without breaking implementation details.',
      points: [
        'Component and prop-safe output',
        'Token-aware styling decisions',
        'Grounded in real systems, not mockups',
      ],
      icon: Database,
      glow: 'blue',
    },
  ] as const;

  const tiers = [
    {
      name: PRICING_PLANS.developer.displayName,
      tier: PRICING_PLANS.developer.displayName,
      price: formatPrice(PRICING_PLANS.developer),
      period: '',
      badge: PRICING_PLANS.developer.badge,
      description: PRICING_PLANS.developer.description,
      features: [
        'Cross-platform memory (Claude Code, Cursor, Windsurf)',
        'Auto-save solutions',
        'Conflict checking (100 checks/month)',
        '1 active workspace',
        '100 memory searches / month',
        '50 solutions saved / month',
        '7-day retention',
        'Community support',
      ],
      cta: 'Start Free',
      ctaLink: 'https://platform.ekkos.dev/signup',
      featured: false,
    },
    {
      name: PRICING_PLANS.professional.displayName,
      tier: PRICING_PLANS.professional.displayName,
      price: formatPrice(PRICING_PLANS.professional),
      period: '',
      badge: PRICING_PLANS.professional.badge || null,
      description: PRICING_PLANS.professional.description,
      features: [
        'Unlimited cross-platform memory',
        'Unlimited solution capture',
        'Unlimited conflict checks',
        'ekkOS_Forever_Memory\u2122',
        'Unlimited connections (Claude Code, Cursor, Windsurf, MCP)',
        'Pattern insights dashboard',
        'Community knowledge access',
        'API access',
        'Priority support',
      ],
      cta: 'Start Pro',
      ctaLink: 'https://platform.ekkos.dev/signup?plan=professional',
      featured: true,
    },
    {
      name: PRICING_PLANS.team.displayName,
      tier: PRICING_PLANS.team.displayName,
      price: formatPrice(PRICING_PLANS.team),
      period: '',
      badge: PRICING_PLANS.team.badge || null,
      description: PRICING_PLANS.team.description,
      features: [
        'Everything in Pro',
        'Shared pattern library across team',
        'Team memory spaces with role-awareness',
        'Team analytics & drift detection',
        'Collaborative pattern curation',
        'Admin controls & permissions',
        'SSO (Google, GitHub, SAML)',
        'Audit logs',
        'Custom retention policies',
      ],
      cta: 'Contact Us',
      ctaLink: 'mailto:team@ekkos.dev',
      featured: false,
    },
    {
      name: PRICING_PLANS.enterprise.displayName,
      tier: 'Enterprise',
      price: formatPrice(PRICING_PLANS.enterprise),
      period: '',
      badge: PRICING_PLANS.enterprise.badge || null,
      description: PRICING_PLANS.enterprise.description,
      features: [
        'Everything in Team',
        'Self-hosted / VPC deployment',
        'SOC 2 Type II (in progress)',
        'Custom data residency',
        'Dedicated CSM',
        'Custom integrations',
        'SLA guarantees',
      ],
      cta: 'Contact Us',
      ctaLink: 'mailto:enterprise@ekkos.dev',
      featured: false,
    },
  ];

  return (
    <>
      <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background wordmark watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-mono font-bold text-[12rem] sm:text-[18rem] md:text-[24rem] lg:text-[30rem] tracking-tight text-[#00f0ff] opacity-[0.03] whitespace-nowrap">
            ekkOS<span className="text-[#ffb800]">_</span>
          </span>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[760px] h-[340px] bg-[#00f0ff]/7 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* E icon + wordmark lockup */}
          <div className="flex flex-col items-center mb-8 sm:mb-10 animate-fade-in-up">
            <EkkosLogo size={120} animated={true} className="mb-4 drop-shadow-[0_0_40px_rgba(0,240,255,0.3)]" />
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-[#00f0ff]">ekkOS</span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-[#ffb800]">_</span>
              <span className="text-sm sm:text-base font-mono text-[#4a4a5e] ml-1 relative -top-3 sm:-top-4">™</span>
            </div>
          </div>

          <div className="tag inline-flex items-center gap-2 mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            <span>Memory Layer for Builders</span>
          </div>

          <div className="mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <GlitchText
              as="h1"
              text="Vibe Coding,"
              variant={2}
              className="text-4xl sm:text-6xl md:text-8xl font-display tracking-tight text-[#e8e8f0] block"
            />
            <GlitchText
              as="span"
              text="Supercharged"
              variant={2}
              className="text-4xl sm:text-6xl md:text-8xl font-display tracking-tight text-[#00f0ff] block"
            />
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-[#7a7a8e] font-body max-w-4xl mx-auto mb-4 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            The memory layer built for Claude Code.
            ekkOS remembers your taste across every session — aesthetic rules, interaction preferences, brand instincts, and winning patterns — so your AI stops resetting and starts compounding.
          </p>

          <p className="text-sm sm:text-lg text-[#b0b0c8] font-body max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            No more re-explaining the vibe. No more taste drift. Just faster iteration on work that already feels like you.
          </p>

          <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider animate-fade-in-up" style={{ animationDelay: '0.32s' }}>
            Built for Claude Code first. Extendable across your stack via extensions and MCP.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            <Link
              href="https://platform.ekkos.dev/signup"
              className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-5 shadow-glow-cyan"
            >
              Start Free — Deploy in 30 seconds
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <a
              href="#vibe-demo"
              className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
            >
              Watch 47-second Vibe Demo
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {['Claude Code', 'Cursor', 'Windsurf', 'MCP Compatible'].map((chip) => (
              <span key={chip} className="px-3 py-1.5 clip-sm bg-[#111118] border border-[#1a1a2e] text-xs sm:text-sm text-[#7a7a8e] font-mono">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Built for serious vibe coders */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-[#1a1a2e]/60">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
            <div className="section-label">VIBE_CODING_WORKFLOW</div>
            <GlitchText as="h2" text="Built for serious vibe coders" variant={2} className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]" />
            <p className="text-base sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto font-body">
              You already use Claude Code to move fast.
              ekkOS is the missing memory layer that turns vibe coding from fragile to compounding.
            </p>
            <p className="text-sm text-[#4a4a5e] max-w-2xl mx-auto font-mono mt-2">
              Bring it into the rest of your workflow through extensions and MCP when needed.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {vibeBlocks.map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.08}>
              <GlassCard variant="elevated" glow={block.glow} className="p-4 sm:p-6 h-full">
                <div className="w-10 h-10 clip-sm bg-[#0d0d14] border border-[#1a1a2e] flex items-center justify-center mb-3">
                  <block.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <h3 className="text-lg sm:text-xl font-display text-[#e8e8f0] mb-2">{block.title}</h3>
                <p className="text-sm sm:text-base text-[#7a7a8e] leading-relaxed font-body mb-4">{block.description}</p>
                <div className="space-y-2">
                  {block.points.map((point) => (
                    <div key={point} className="text-xs sm:text-sm text-[#b0b0c8] font-body bg-[#0d0d14] border border-[#1a1a2e]/70 clip-sm px-3 py-2">
                      {point}
                    </div>
                  ))}
                </div>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
          <div className="mt-8 sm:mt-10 clip-lg bg-[#111118] border border-[#00f0ff]/20 p-5 sm:p-8 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
            <p className="text-lg sm:text-2xl font-display text-[#e8e8f0]">
              Your AI becomes a taste co-pilot instead of a forgetful intern.
            </p>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Deploy in 3 Steps */}
      <section className="py-8 sm:py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
          <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-4 sm:p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00f0ff]" />
              <div>
                <h3 className="text-base sm:text-xl font-display text-[#e8e8f0]">Deploy in 3 Steps</h3>
                <p className="text-xs sm:text-sm text-[#4a4a5e] font-body">Initialize the memory layer</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {['One-click authentication', 'Automatic configuration', 'Works with Claude Code, Cursor & Windsurf'].map((item) => (
                <div key={item} className="flex items-start sm:items-center gap-2 sm:gap-3 text-[#7a7a8e] text-sm sm:text-base font-body">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff88] flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="vscode:extension/ekkostech.ekkos-connect"
              className="btn-primary w-full justify-center text-sm sm:text-base py-3 sm:py-4"
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Install Extension
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <p className="text-[10px] sm:text-xs text-[#4a4a5e] mt-3 sm:mt-4 text-center font-mono uppercase tracking-wider">
              Works with Claude Code, Cursor & Windsurf
            </p>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo placeholder */}
      <section id="vibe-demo" className="pb-6 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="clip-md bg-[#0d0d14] border border-[#1a1a2e] p-4 sm:p-5 text-center">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#00f0ff] mb-1">Vibe Demo</p>
            <p className="text-sm sm:text-base text-[#7a7a8e] font-body">
              47-second demo slot reserved. This placeholder keeps navigation stable until the video asset is wired.
            </p>
          </div>
        </div>
      </section>

      {/* Live Substrate Telemetry — after hero */}
      <ScrollReveal>
      <section className="py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
        {/* Amber glow backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#f59e0b]/5 blur-3xl rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Header row */}
          <div className="flex flex-col items-center gap-3 mb-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-[11px] font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                Live
              </span>
              <span className="text-[#e8e8f0] text-sm font-mono uppercase tracking-widest">Performance Snapshot</span>
            </div>
            <p className="text-xs sm:text-sm text-[#7a7a8e] font-body max-w-2xl">
              Direct substrate telemetry powering production memory operations.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: loading || error ? '—' : stats.applications.toLocaleString(), label: 'Pattern Applications (30d)', sub: 'Total production pattern applications this month.' },
              { value: loading || error ? '—' : stats.applyRate, label: 'Tracked Apply Signal', sub: 'Share of retrieved patterns that were actually applied.' },
              { value: loading || error ? '—' : formatSpeedup(stats.speedup), label: 'Global Speedup Ratio', sub: 'Measured from tracked resolutions across active workspaces.' },
              { value: loading || error ? '—' : trackedPatternAssistedRate, label: 'Pattern-Assisted Share', sub: 'Resolved tasks where a retrieved pattern was used.' },
              { value: loading || error ? '—' : stats.sessions.toLocaleString(), label: 'Session Footprint (30d)', sub: 'Live sessions tracked by the memory layer.' },
              {
                value: loading || error ? '—' : stats.highConfidencePatterns.toLocaleString(),
                label: 'High-Confidence Patterns',
                sub: 'Patterns currently running above confidence threshold.',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="clip-lg bg-[#0d0d10] border border-[#f59e0b]/20 hover:border-[#f59e0b]/50 p-5 text-center transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-2xl md:text-3xl font-display text-[#f59e0b] mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-[#e8e8f0] uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-[11px] text-[#4a4a5e] font-body">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-3">
            {[
              { value: loading || error ? '—' : formatTurns(stats.avgTurnsNoPatterns), label: 'Avg Turns (No Patterns)', sub: 'Typical turn count when pattern support is not used.' },
              { value: loading || error ? '—' : formatTurns(stats.avgTurnsWithPatterns), label: 'Avg Turns (With Patterns)', sub: 'Typical turn count when pattern support is active.' },
              {
                value: loading || error ? '—' : turnReductionRate,
                label: 'Turn Reduction Signal',
                sub: hasTurnMetrics && turnsSavedPerResolution !== null
                  ? `(${turnsSavedPerResolution.toFixed(2)} fewer turns per resolution)`
                  : 'Computed from observed baseline and assisted turn counts.',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="clip-lg bg-[#0d0d10] border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 p-4 text-center transition-colors"
              >
                <div className="text-xl md:text-2xl font-display text-[#00f0ff] mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-[#e8e8f0] uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-[10px] text-[#4a4a5e] font-body">{stat.sub}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] font-mono text-[#4a4a5e] mt-4 uppercase tracking-widest">
            {error
              ? 'Telemetry temporarily unavailable.'
              : `Live telemetry from /api/stats · Last sample ${new Date(stats.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
          </p>
        </div>
      </section>
      </ScrollReveal>

      {/* Architecture Diagram */}
      <ScrollReveal>
      <ArchitectureDiagram />
      </ScrollReveal>

      {/* Interactive Demo */}
      <ScrollReveal>
      <InteractiveDemo />
      </ScrollReveal>

      {/* How It Works */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <div className="section-label">SYSTEM_ARCHITECTURE</div>
            <GlitchText as="h2" text="System Architecture" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Pulse protects runtime continuity. Cortex structures that context. Dream Forge evolves it overnight.
            </p>
          </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal delay={0}>
            <FeatureBlock
              icon={Activity}
              number="1"
              title="Pulse — Runtime Continuity Layer"
              description="Cache-stable proxy for long coding sessions: durable context in motion, smart compression, and live observability."
              detail="Protects session state while you work so context stays usable through tool-heavy loops and long runtime windows."
              glow="blue"
              delay={0}
            />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
            <FeatureBlock
              icon={Brain}
              number="2"
              title="Cortex — Structured Context Layer"
              description="Turns session traces into directives, patterns, and living docs that stay inspectable and reusable."
              detail="Your repo context compounds into system intelligence that can be injected back into future work."
              glow="pink"
              delay={0.1}
            />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
            <FeatureBlock
              icon={Sparkles}
              number="3"
              title="Dream Forge — Evolution Engine"
              description="Overnight, winning directions are recombined, weak ones are pruned, and refined next states are proposed."
              detail="Generative evolution layer for both taste and system behavior, built from what actually worked in prior sessions."
              glow="emerald"
              delay={0.2}
            />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="capabilities">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <div className="section-label">CAPABILITY_MATRIX</div>
            <GlitchText as="h2" text="Capability Matrix" variant={1} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Autonomous subsystems operating below the surface.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.name} delay={i * 0.08}>
              <GlassCard variant="elevated" hover="lift" delay={i * 0.05} className="p-3 sm:p-6 text-center group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 clip-md bg-[#00f0ff]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f0ff]" />
                </div>
                <div className="text-sm sm:text-lg font-display mb-1 sm:mb-3 text-[#e8e8f0]">{cap.name}</div>
                <div className="text-xs sm:text-sm text-[#7a7a8e] leading-relaxed hidden sm:block font-body">{cap.desc}</div>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Telemetry Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <div className="section-label">PERFORMANCE_TELEMETRY</div>
            <GlitchText as="h2" text="Performance Telemetry" variant={2} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Empirical telemetry from active deployments.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-2 sm:gap-4">
            <ScrollReveal delay={0}>
            <GlassCard variant="elevated" className="p-6 text-center">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#7a7a8e] mb-2">Global Speedup Ratio</h3>
              <div className="text-3xl font-display text-[#00f0ff] mb-1">{loading || error ? '—' : formatSpeedup(stats.speedup)}</div>
              <p className="text-xs text-[#4a4a5e] font-body">Measured from observed assisted vs baseline resolutions.</p>
            </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
            <GlassCard variant="elevated" className="p-6 text-center">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#7a7a8e] mb-2">Pattern-Assisted Resolutions</h3>
              <div className="text-3xl font-display text-[#00ff88] mb-1">
                {loading || error ? '—' : stats.speedupPatternAssisted.toLocaleString()}
              </div>
              <p className="text-xs text-[#4a4a5e] font-body">
                {loading || error ? '' : `of ${stats.speedupResolutions.toLocaleString()} tracked resolutions`}
              </p>
            </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
            <GlassCard variant="elevated" className="p-6 text-center">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#7a7a8e] mb-2">Pattern-Assisted Share</h3>
              <div className="text-3xl font-display text-[#ffb800] mb-1">
                {loading || error ? '—' : trackedPatternAssistedRate}
              </div>
              <p className="text-xs text-[#4a4a5e] font-body">Measured across tracked resolved sessions.</p>
            </GlassCard>
            </ScrollReveal>
          </div>

          {/* Key Insight */}
          <ScrollReveal>
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="clip-lg bg-[#111118] border border-[#00f0ff]/20 p-8 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
              <p className="text-lg text-[#7a7a8e] leading-relaxed font-body">
                <span className="text-[#00f0ff] font-semibold">Telemetry discipline:</span> this page only shows direct substrate signals from `/api/stats`, with no projected multipliers.
              </p>
            </div>
          </div>
          </ScrollReveal>

          {/* Mid-scroll CTA */}
          <ScrollReveal>
          <div className="mt-12 text-center">
            <Link href="https://platform.ekkos.dev/signup" className="btn-primary text-lg px-8 py-4 shadow-glow-cyan">
              Deploy Your Cognitive Advantage
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-[#4a4a5e] mt-3 font-body">Free forever on {PRICING_PLANS.developer.displayName} tier &middot; No credit card required</p>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Continuous Learning */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="section-label">ADAPTIVE_INTELLIGENCE</div>
            <GlitchText as="h2" text="Adaptive Intelligence Engine" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#ffb800]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Closed-loop learning architecture. Every interaction refines the model.
            </p>
          </div>
          </ScrollReveal>

          {/* Key Insight */}
          <ScrollReveal>
          <div className="mb-12">
            <div className="clip-lg bg-[#111118] border border-[#00f0ff]/20 p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 clip-md bg-[#00f0ff]/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-display text-[#e8e8f0] mb-3">The Key Insight</h3>
                  <p className="text-[#7a7a8e] leading-relaxed font-body">
                    Standard AI operates stateless — full context reconstruction every session. ekkOS maintains persistent state.
                    <span className="text-[#00f0ff] font-semibold"> The more you operate, the sharper it gets.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <div className="clip-lg bg-[#111118] border border-[#ffb800]/25 p-5 sm:p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb800]/40 to-transparent" />
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#ffb800] flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#b0b0c8] leading-relaxed font-body">
                  Overnight the Forge merged your playful button motion with the premium spacing pattern from last week — a new composite vibe pattern is ready.
                </p>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Simple Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-2">
            {[
              { icon: Search, label: 'Retrieval', desc: 'Surfaces relevant patterns from the substrate on query' },
              { icon: Sparkles, label: 'Capture', desc: 'Encodes successful resolutions as executable patterns' },
              { icon: TrendingUp, label: 'Reinforcement', desc: 'Outcome signals strengthen or decay patterns over time' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
              <GlassCard variant="elevated" className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 clip-md bg-[#00f0ff]/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <h3 className="font-display text-[#e8e8f0] mb-2">{item.label}</h3>
                <p className="text-sm text-[#7a7a8e] font-body">{item.desc}</p>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Live Intelligence Trace */}
          <ScrollReveal>
          <div className="mt-16">
            <h3 className="text-xl font-display text-[#e8e8f0] text-center mb-6">
              Live Trace
            </h3>
            <IntelligenceTrace />
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Magic Moment */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 relative overflow-hidden" id="magic">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="section-label">OPERATIONAL_TIMELINE</div>
            <GlitchText as="h2" text="Operational Workflow" variant={1} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              How memory capture, retrieval, and reinforcement run in production.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-2 sm:gap-4">
            {/* Step 1 */}
            <ScrollReveal delay={0}>
            <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-4 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 clip-sm bg-[#00f0ff]/20 flex items-center justify-center">
                  <span className="text-base sm:text-lg font-display text-[#00f0ff]">1</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-display text-[#e8e8f0]">Capture Workflow</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#00f0ff]">
                  <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider mb-1">You ask:</p>
                  <p className="text-sm sm:text-base text-[#e8e8f0] font-body">&quot;Set up auth with Supabase&quot;</p>
                </div>
                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#ffb800]">
                  <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider mb-1">ekkOS_ asks:</p>
                  <p className="text-sm sm:text-base text-[#e8e8f0] font-body">&quot;Remember this?&quot;</p>
                </div>
                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#00ff88]">
                  <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider mb-1">You say &quot;Yes&quot; — now it&apos;s:</p>
                  <p className="text-sm sm:text-base text-[#00ff88] font-display">ekkOS_Forever_Memory&trade;</p>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={0.15}>
            <div className="clip-lg bg-[#111118] border border-[#00f0ff]/30 p-4 sm:p-8 space-y-4 sm:space-y-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 clip-sm bg-[#00ff88]/20 flex items-center justify-center">
                  <span className="text-base sm:text-lg font-display text-[#00ff88]">2</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-display text-[#e8e8f0]">Retrieve + Validate</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#00f0ff]">
                  <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider mb-1">You ask:</p>
                  <p className="text-sm sm:text-base text-[#e8e8f0] font-body">&quot;Add password reset&quot;</p>
                </div>
                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#ffb800]">
                  <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider mb-1">ekkOS automatically:</p>
                  <p className="text-[#7a7a8e] text-xs sm:text-sm font-body">
                    Applies your prior knowledge and validates suggestions.
                  </p>
                </div>
                <div className="p-3 sm:p-4 clip-md bg-[#00ff88]/10 border border-[#00ff88]/30">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ff88]" />
                    <span className="text-[#00ff88] font-mono text-sm uppercase tracking-wider">Verified</span>
                  </div>
                  <p className="text-[#7a7a8e] text-xs sm:text-sm font-body">
                    &quot;Matches your prior decisions.&quot;
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={0.3}>
            <div className="clip-lg bg-[#111118] border border-[#00ff88]/30 p-4 sm:p-8 space-y-4 sm:space-y-6 md:col-span-3 lg:col-span-1 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 clip-sm bg-[#00ff88]/20 flex items-center justify-center">
                  <span className="text-base sm:text-lg font-display text-[#00ff88]">3</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-display text-[#e8e8f0]">Live Substrate State</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 clip-md bg-[#00ff88]/10 border border-[#00ff88]/20">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm text-[#4a4a5e] font-mono uppercase tracking-wider">Live telemetry:</p>
                    <span className="tag text-[#00ff88] border-[#00ff88]/30">/api/stats</span>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { label: 'Patterns in substrate', value: loading || error ? '—' : stats.patterns.toLocaleString(), color: '#00ff88' },
                      { label: 'Pattern applications (30d)', value: loading || error ? '—' : stats.applications.toLocaleString(), color: '#00f0ff' },
                      { label: 'Tracked apply signal', value: loading || error ? '—' : stats.applyRate, color: '#ffb800' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span className="text-[#7a7a8e] text-xs sm:text-sm font-body">{row.label}</span>
                        <span className="text-base sm:text-lg font-display" style={{ color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1a1a2e]">
                      <span className="text-[#7a7a8e] text-xs sm:text-sm font-body">Global speedup ratio</span>
                      <span className="text-lg sm:text-xl font-display text-[#00ff88]">{loading || error ? '—' : formatSpeedup(stats.speedup)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-[#0d0d14] border-l-2 border-[#00ff88]">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00ff88]" />
                    <span className="text-[#00ff88] font-mono text-xs sm:text-sm uppercase tracking-wider">Measured Signal</span>
                  </div>
                  <p className="text-[#7a7a8e] text-xs sm:text-sm font-body">
                    Derived directly from `patterns`, `applications`, `applyRate`, and `speedup` fields.
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* IDE Integrations */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="integrations">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="section-label">INTEGRATION_PROTOCOL</div>
            <GlitchText as="h2" text="Universal Memory Substrate" variant={2} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Seamless state persistence across development environments.
            </p>
          </div>
          </ScrollReveal>

          {/* Center Hub */}
          <ScrollReveal>
          <div className="flex justify-center mb-8">
            <div className="clip-lg bg-[#111118] border border-[#00f0ff]/30 p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 clip-md bg-[#00f0ff]/20 flex items-center justify-center">
                  <Database className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div>
                  <div className="text-lg font-mono font-bold text-[#00f0ff]">ekkOS_&trade;</div>
                  <div className="text-sm text-[#7a7a8e] font-mono uppercase tracking-wider">Unified Memory</div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Agent Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {agents.map((agent, index) => (
              <ScrollReveal key={agent.name} delay={index * 0.08}>
              <GlassCard
                variant="elevated"
                hover="lift"
                delay={index * 0.05}
                className="p-6 text-center group relative overflow-hidden"
              >
                <div className="relative space-y-3">
                  <div className="w-12 h-12 clip-md bg-[#00f0ff]/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <agent.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <div className="text-sm font-mono text-[#e8e8f0]">{agent.name}</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#00ff88] animate-pulse-dot" />
                    <div className="text-xs text-[#00ff88] font-mono uppercase tracking-wider">Ready</div>
                  </div>
                </div>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Memory Gateway */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="gateway">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="tag mb-4">
              <Globe className="w-4 h-4 text-[#00f0ff] mr-2" />
              <span>Memory Gateway</span>
            </div>
            <GlitchText as="h2" text="Multi-Provider Intelligence Layer" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Route through any provider — operational context persists across the entire model ecosystem.
            </p>
          </div>
          </ScrollReveal>

          {/* Provider Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
            {[
              { name: 'OpenAI', examples: 'GPT-4o, o3, o4-mini' },
              { name: 'Anthropic', examples: 'Claude Sonnet 4.5, Claude Opus 4' },
              { name: 'xAI (Grok)', examples: 'Grok 3, Grok 3 Mini' },
              { name: 'Google', examples: 'Gemini 2.5, 2.0, Flash' },
            ].map((provider, index) => (
              <ScrollReveal key={provider.name} delay={index * 0.1}>
              <GlassCard
                variant="elevated"
                hover="lift"
                delay={index * 0.05}
                className="p-6 text-center group relative overflow-hidden"
              >
                <div className="relative space-y-2">
                  <div className="w-12 h-12 clip-md bg-[#00f0ff]/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <div className="text-sm font-mono font-bold text-[#e8e8f0]">{provider.name}</div>
                  <div className="text-xs text-[#4a4a5e] font-body">{provider.examples}</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#00ff88] animate-pulse-dot" />
                    <div className="text-xs text-[#00ff88] font-mono uppercase tracking-wider">Live</div>
                  </div>
                </div>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-2 mb-12">
            {[
              { icon: Sparkles, label: 'Automatic Context Injection', desc: 'Operational context injected into every request. Provider-agnostic.' },
              { icon: Brain, label: 'Unified Substrate', desc: 'Train on Claude, retrieve on GPT. One substrate, all providers.' },
              { icon: Zap, label: 'Single-Endpoint Integration', desc: 'One connection. Memory-aware intelligence across your entire stack.' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
              <GlassCard variant="elevated" className="p-6">
                <div className="w-10 h-10 clip-sm bg-[#00f0ff]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <h3 className="font-display text-[#e8e8f0] mb-2">{item.label}</h3>
                <p className="text-sm text-[#7a7a8e] font-body">{item.desc}</p>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <Link href="https://docs.ekkos.dev/integrations/memory-gateway" className="btn-secondary">
              Gateway Documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For Solo Devs */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="individuals">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
            <div>
              <div className="section-label mb-4">INDIVIDUAL_OPERATOR</div>
              <GlitchText as="h2" text="Individual Operator Mode" variant={1} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-6" />
              <p className="text-lg text-[#7a7a8e] mb-8 font-body">
                Eliminate context reconstruction overhead. Your operational history persists across all sessions and environments. Focus on shipping, not re-explaining.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Zero context reconstruction overhead',
                  'Autonomous pattern capture on resolution',
                  'Anti-pattern detection prevents regression',
                  'Full provenance chain for every recommendation',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#7a7a8e] font-body">
                    <div className="w-6 h-6 clip-sm bg-[#00f0ff]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#00f0ff]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xl font-display text-[#e8e8f0]">
                Compound intelligence. Every session strengthens the substrate.
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.15}>
            <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-8 space-y-6">
              <h3 className="text-lg font-display text-[#e8e8f0]">Live Operator Telemetry</h3>
              <p className="text-sm text-[#4a4a5e] -mt-2 font-body">Direct fields from `/api/stats`</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0d0d14] clip-md">
                  <span className="text-sm text-[#7a7a8e] font-mono uppercase tracking-wider">Patterns</span>
                  <span className="text-xl font-display text-[#00ff88]">
                    {loading || error ? '—' : stats.patterns.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0d0d14] clip-md">
                  <span className="text-sm text-[#7a7a8e] font-mono uppercase tracking-wider">Pattern Applications (30d)</span>
                  <span className="text-xl font-display text-[#00f0ff]">
                    {loading || error ? '—' : stats.applications.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0d0d14] clip-md">
                  <span className="text-sm text-[#7a7a8e] font-mono uppercase tracking-wider">Tracked Apply Signal</span>
                  <span className="text-xl font-display text-[#00f0ff]">
                    {loading || error ? '—' : stats.applyRate}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0d0d14] clip-md">
                  <span className="text-sm text-[#7a7a8e] font-mono uppercase tracking-wider">Global Speedup Ratio</span>
                  <span className="text-xl font-display text-[#ffb800]">
                    {loading || error ? '—' : formatSpeedup(stats.speedup)}
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* For Teams */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="teams">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="section-label">COLLECTIVE_INTELLIGENCE</div>
            <GlitchText as="h2" text="Collective Intelligence" variant={2} className="text-3xl md:text-4xl font-display text-[#e8e8f0]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Institutional knowledge transfer with shared substrate context.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { title: 'Knowledge Propagation', desc: 'One operator resolves an incident. The entire fleet inherits the solution.' },
              { title: 'Pattern Alignment', desc: 'Recommendations aligned with team architecture. Drift detected, not discovered.' },
              { title: 'Zero-Day Operational Readiness', desc: 'New operators inherit years of institutional intelligence from first session.' },
              { title: 'Architectural Drift Detection', desc: 'Continuous monitoring for pattern divergence. Consolidate before it compounds into debt.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
              <GlassCard variant="elevated" hover="lift" delay={i * 0.05} className="p-6">
                <h3 className="text-lg font-display mb-2 text-[#e8e8f0]">{item.title}</h3>
                <p className="text-[#7a7a8e] font-body">{item.desc}</p>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Confidence Signals */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="firewall">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="tag mb-4">
              <Shield className="w-4 h-4 text-[#00ff88] mr-2" />
              <span className="text-[#00ff88]">Pro Feature</span>
            </div>
            <GlitchText as="h2" text="Confidence Signals™" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00ff88]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Every suggestion validated against your operational history.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <div className="clip-lg bg-[#111118] border border-[#00ff88]/20 p-8 mb-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: CheckCircle2, label: 'Grounded', color: '#00ff88', desc: 'Aligns with proven patterns in your operational history. Execute with confidence.' },
                { icon: AlertTriangle, label: 'Speculative', color: '#ffb800', desc: 'No prior data. Uncharted territory. Proceed with validation.' },
                { icon: X, label: 'Conflict', color: '#ff3366', desc: 'Contradicts an established pattern or directive. ekkOS flags the divergence.' },
              ].map((signal) => (
                <div key={signal.label} className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto clip-md flex items-center justify-center" style={{ backgroundColor: `${signal.color}20` }}>
                    <signal.icon className="w-8 h-8" style={{ color: signal.color }} />
                  </div>
                  <h3 className="text-xl font-display" style={{ color: signal.color }}>{signal.label}</h3>
                  <p className="text-sm text-[#7a7a8e] font-body">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>

          <div className="text-center">
            <p className="text-[#7a7a8e] font-body">
              Every suggestion cross-referenced against accumulated patterns, directives, and operational history.
              Intercepts regressions before they reach your codebase.
            </p>
          </div>
        </div>
      </section>

      {/* The Golden Loop */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="golden-loop">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="tag mb-4">
              <Sparkles className="w-4 h-4 text-[#ffb800] mr-2" />
              <span className="text-[#ffb800]">Core Differentiator</span>
            </div>
            <GlitchText as="h2" text="Static Storage vs. Adaptive Intelligence" variant={1} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#ffb800]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              The architecture separating storage from intelligence
            </p>
          </div>
          </ScrollReveal>

          {/* The Golden Loop Visual */}
          <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="clip-lg bg-[#111118] border border-[#ffb800]/20 p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb800]/40 to-transparent" />
              <h3 className="text-xl font-display text-center text-[#e8e8f0] mb-6">The Golden Loop&trade;</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {[
                  { icon: Search, label: '1. Retrieve', desc: 'Query the substrate', color: '#00f0ff' },
                  { icon: Zap, label: '2. Apply', desc: 'Execute against target', color: '#ffb800' },
                  { icon: CheckCircle2, label: '3. Measure', desc: 'Measure outcome delta', color: '#00ff88' },
                  { icon: TrendingUp, label: '4. Learn', desc: 'Reinforce or decay', color: '#ffb800' },
                ].map((step) => (
                  <div key={step.label} className="text-center p-4 bg-[#0d0d14] clip-md">
                    <div className="w-10 h-10 mx-auto mb-2 clip-sm flex items-center justify-center" style={{ backgroundColor: `${step.color}20` }}>
                      <step.icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <div className="text-sm font-mono font-semibold text-[#e8e8f0]">{step.label}</div>
                    <div className="text-xs text-[#4a4a5e] font-body">{step.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-[#7a7a8e] text-sm font-body">
                Every cycle refines the model. Effective patterns reinforce. Failures decay. The substrate sharpens.
              </p>
            </div>
          </div>
          </ScrollReveal>

          {/* Comparison Grid */}
          <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-2 max-w-4xl mx-auto mb-12">
            <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 clip-sm bg-[#ff3366]/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-[#ff3366]" />
                </div>
                <h3 className="text-lg font-display text-[#e8e8f0]">Static Memory</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Returns identical results regardless of outcome',
                  'Requires manual curation and maintenance',
                  'No feedback loop — cannot self-improve',
                  'Stale patterns persist indefinitely',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#7a7a8e] font-body">
                    <X className="w-4 h-4 mt-0.5 text-[#ff3366] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="clip-lg bg-[#111118] border border-[#00ff88]/20 p-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 clip-sm bg-[#00ff88]/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-display text-[#e8e8f0]">ekkOS Adaptive Memory</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Outcome tracking on every application',
                  'Autonomous capture of successful resolutions',
                  'Continuous reinforcement from usage signals',
                  'Stale patterns decay via forgetting engine',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#e8e8f0] font-body">
                    <Check className="w-4 h-4 mt-0.5 text-[#00ff88] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </ScrollReveal>

          {/* Key Insight */}
          <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-8 text-center">
              <p className="text-lg text-[#7a7a8e] leading-relaxed font-body">
                <span className="text-[#00f0ff] font-semibold">The difference:</span> static storage repeats what was saved.
                ekkOS continuously incorporates outcome signals, reinforcing what works and decaying what fails.
              </p>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-24 px-4 sm:px-6" id="pricing">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
            <div className="section-label">ACCESS_TIERS</div>
            <GlitchText as="h2" text="Access Tiers" variant={2} className="text-2xl sm:text-3xl md:text-5xl font-display tracking-tight text-[#00f0ff]" />
            <p className="text-base sm:text-xl text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Deploy free. Scale with your intelligence footprint.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.1}>
              <div
                className={cn(
                  "clip-lg p-4 sm:p-8 relative",
                  tier.featured
                    ? "bg-[#111118] border border-[#00f0ff]/30"
                    : "bg-[#111118] border border-[#1a1a2e]"
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
                )}
                {tier.badge && (
                  <div className="tag mb-4 text-[#00f0ff]">
                    {tier.badge}
                  </div>
                )}

                <h3 className="text-2xl font-display mb-2 text-[#e8e8f0]">{tier.name}</h3>
                <div className="text-4xl font-display mb-2 text-[#00f0ff]">
                  {tier.price}
                </div>
                <p className="text-sm text-[#4a4a5e] mb-6 font-body">{tier.description}</p>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#7a7a8e] font-body">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.featured ? 'text-[#00f0ff]' : 'text-[#4a4a5e]'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Operating Model */}
                {tier.name !== PRICING_PLANS.enterprise.displayName && (
                  <div className="mb-6 p-4 bg-[#0d0d14] clip-md border border-[#1a1a2e]">
                    <div className="text-xs font-mono font-semibold text-[#4a4a5e] mb-3 uppercase tracking-[2px]">Operating Model</div>
                    <div className="space-y-3 text-xs font-body">
                      <div>
                        <div className="text-[#00ff88] font-semibold mb-1">Capture</div>
                        <div className="text-[#7a7a8e]">Successful resolutions are saved as reusable patterns.</div>
                      </div>
                      <div>
                        <div className="text-[#00f0ff] font-semibold mb-1">Retrieve</div>
                        <div className="text-[#7a7a8e]">Relevant patterns are surfaced before new answers are generated.</div>
                      </div>
                      <div>
                        <div className="text-[#ffb800] font-semibold mb-1">Reinforce</div>
                        <div className="text-[#7a7a8e]">Outcome signals strengthen effective patterns and decay weak ones.</div>
                      </div>
                    </div>
                  </div>
                )}

                {tier.ctaLink ? (
                  tier.ctaLink.startsWith('mailto:') ? (
                    <a href={tier.ctaLink} className="btn-secondary w-full justify-center">
                      {tier.cta}
                    </a>
                  ) : (
                    <Link
                      href={tier.ctaLink}
                      className={cn(
                        "w-full justify-center",
                        tier.featured ? "btn-primary" : "btn-secondary"
                      )}
                    >
                      {tier.cta}
                    </Link>
                  )
                ) : (
                  <button disabled className="btn-secondary w-full justify-center opacity-50 cursor-not-allowed">
                    {tier.cta}
                  </button>
                )}
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Backed By */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#4a4a5e]">
            Accelerated by
          </p>
          <Link href="/nvidia" className="inline-block p-4 transition-opacity hover:opacity-80">
            <img src="/nvidia-inception-badge.svg" alt="NVIDIA Inception Program" className="h-10 w-auto" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <ScrollReveal>
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <GlitchText as="h2" text="Initialize Your Cognitive Advantage" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display mb-6 text-[#00f0ff]" />
          <p className="text-base sm:text-xl text-[#7a7a8e] mb-4 font-body">
            Deploy the substrate and start capturing operational knowledge from the first session.
            <span className="block mt-2 text-[#e8e8f0] font-semibold">
              Build a continuously improving memory loop across every AI interaction.
            </span>
          </p>
          <p className="text-sm text-[#4a4a5e] mb-8 font-body">
            Free forever on {PRICING_PLANS.developer.displayName} tier. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://platform.ekkos.dev/signup"
              className="btn-primary text-lg px-10 py-5 shadow-glow-cyan"
            >
              Deploy Free — No Credit Card
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#magic" className="btn-secondary px-8 py-4">
              View Telemetry Data
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-[#4a4a5e] mt-4 font-mono uppercase tracking-wider">
            Built for Claude Code. Works with Cursor, Windsurf & any MCP client.
          </p>
        </div>
      </section>
      </ScrollReveal>
    </div>
    </>
  );
}
