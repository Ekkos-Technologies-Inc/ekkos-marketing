'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GlitchText } from '@/components/ui/GlitchText';
import Image from 'next/image';
import {
  ArrowRight,
  Zap,
  Brain,
  Network,
  Gauge,
  Lock,
  Sparkles,
  Code2,
  Database,
  Shield,
  Users,
  Check,
  Layers,
  Rocket,
  Eye,
  RefreshCw,
  Target,
  Activity,
  Infinity,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ─── Hero Pillars ────────────────────────────────────────────────────────────
const pillars = [
  {
    icon: Infinity,
    title: 'Runtime Continuity',
    subtitle: 'Long-session survivability',
    description:
      'Pulse monitors context depth in real time. When pressure builds, a smart compression layer condenses older turns while preserving what matters so long sessions stay usable.',
    highlights: [
      'AI-powered compression fires at 80% capacity',
      'Original messages are archived before condensation',
      'Compressed context can be resurfaced when needed',
    ],
  },
  {
    icon: Zap,
    title: 'Cache-Stable Proxy',
    subtitle: 'Prefix continuity by design',
    description:
      'Pulse keeps the message stream stable between turns so cache prefixes stay intact. That reduces repeated full-context rebuilds during heavy tool loops.',
    highlights: [
      'Stable message stream = consistent cache hits',
      'Tool calls processed without prefix disruption',
      'Compression fires only when necessary',
    ],
  },
  {
    icon: Code2,
    title: 'Smart Compression',
    subtitle: 'Less noise, same intelligence',
    description:
      'Pulse profiles which capabilities your workflow actually uses and removes the rest per call. Fewer tokens in means less context pressure and steadier long-session performance.',
    highlights: [
      'Unused capabilities pruned automatically per call',
      'Large token overhead removed from repeated round-trips',
      'Persistent rules enforced in minimal token space',
    ],
  },
];

// ─── All Features ────────────────────────────────────────────────────────────
const featureCategories = [
  {
    category: 'Context Management',
    color: 'amber',
    features: [
      {
        icon: Infinity,
        title: 'Long-Session Continuity Engine',
        description: 'Progressive compression helps sessions stay stable over long runs.',
      },
      {
        icon: Brain,
        title: 'Intelligent Eviction',
        description: 'AI-powered summarization fires at 80% capacity. Old turns compressed, nothing lost.',
      },
      {
        icon: Zap,
        title: 'Cache-Stable Passthrough',
        description: 'Message stream stays untouched — cache prefix never breaks, reads stay cheap.',
      },
      {
        icon: Code2,
        title: 'Capability Compression',
        description: 'Unused capabilities silently pruned per call. Tens of thousands of tokens reclaimed.',
      },
    ],
  },
  {
    category: 'Zero-Loss Memory',
    color: 'green',
    features: [
      {
        icon: Shield,
        title: 'Lossless Archive',
        description: 'Compressed segments are archived before rewrite for durable recovery.',
      },
      {
        icon: Database,
        title: 'Intelligent Retrieval',
        description: 'Archived context resurfaces on demand — no manual lookups.',
      },
      {
        icon: RefreshCw,
        title: 'Oversize Auto-Recovery',
        description: 'Automatic recompression on context overflow — no manual intervention.',
      },
    ],
  },
  {
    category: 'Intelligence',
    color: 'cyan',
    features: [
      {
        icon: Target,
        title: 'Directive Enforcement',
        description: 'Persistent MUST/NEVER rules injected silently into every session.',
      },
      {
        icon: Gauge,
        title: 'Accurate Token Reporting',
        description: 'True context metrics — no phantom inflation from tool noise.',
      },
    ],
  },
  {
    category: 'Operations',
    color: 'cyan',
    features: [
      {
        icon: Eye,
        title: 'Diagnostic Headers',
        description: 'Full observability via response headers — every optimization visible.',
      },
      {
        icon: Users,
        title: 'Multi-Client Support',
        description: 'Claude Code, Cursor, Windsurf — any compatible AI coding client.',
      },
      {
        icon: Lock,
        title: 'User Isolation',
        description: 'All optimizations scoped per-user. Zero cross-session leakage.',
      },
      {
        icon: Activity,
        title: 'Live TUI Dashboard',
        description: 'Real-time tokens, cost, and cache stats in your terminal.',
      },
    ],
  },
];


// ─── Pricing ─────────────────────────────────────────────────────────────────
const pricingPlans = [
  {
    name: 'Professional + Pulse',
    price: 49,
    period: '/month',
    description: 'Professional ($19/mo) + Pulse add-on ($30/mo)',
    features: [
      'Everything in Professional ($19/mo)',
      'ekkOS_Pulse\u2122 add-on — All 13 features',
      'Long-session continuity with intelligent compression',
      'Cache-stable passthrough — maximize cache hits',
      'AI-powered eviction engine',
      'Automatic capability compression',
      'Intelligent retrieval + lossless cloud archive',
      'Live TUI dashboard',
      'Priority support',
    ],
    cta: 'Coming Soon',
    ctaLink: null as string | null,
    highlighted: true,
  },
  {
    name: 'Team + Pulse',
    price: 99,
    period: '/seat/month',
    description: 'Team ($49/seat) + Pulse add-on ($30/seat)',
    features: [
      'Everything in Team ($49/seat)',
      'ekkOS_Pulse\u2122 add-on for entire team',
      'Shared pattern library',
      'Team memory spaces',
      'Team analytics & cost tracking',
      'Admin controls & permissions',
      'SSO (Google, GitHub, SAML)',
      'Audit logs',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaLink: 'mailto:team@ekkos.dev',
    highlighted: false,
  },
];

const pulseTelemetryScreenshot = '/images/pulse/pulse-terminal-state.png';

// ─── Component ───────────────────────────────────────────────────────────────
export default function PulsePage() {
  const [screenshotUnavailable, setScreenshotUnavailable] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Massive background text */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden pt-[10vh]">
          <span
            className="text-[18vw] md:text-[22vw] font-display tracking-tighter whitespace-nowrap"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 184, 0, 0.06) 0%, rgba(255, 184, 0, 0.03) 50%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            PULSE_
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 py-16 sm:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="tag inline-flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 animate-fade-in-up"
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800]" />
              <span className="text-[#ffb800]">Premium Add-on</span>
              <span className="w-px h-3 bg-[#ffb800]/30 hidden sm:block" />
              <span className="text-[#ffb800]/70 hidden sm:inline">Runtime Continuity Layer</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display mb-4 sm:mb-6 leading-[0.95] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <GlitchText as="span" text="ekkOS" variant={0} className="text-[#e8e8f0]" />
              <GlitchText as="span" text="_Pulse" variant={1} className="text-[#ffb800]" />
              <sup className="text-base sm:text-lg md:text-2xl text-[#ffb800]/50 ml-1">&trade;</sup>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#e8e8f0]/80 mb-3 sm:mb-4 leading-relaxed font-body animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Long Claude Code sessions, without the context collapse.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#7a7a8e] mb-4 sm:mb-6 max-w-xl leading-relaxed font-body animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              Pulse is a cache-stable proxy between your IDE and model runtime, built for runtime continuity, smart compression, and live observability.
            </p>
            <p className="text-xs sm:text-sm text-[#4a4a5e] mb-6 sm:mb-10 max-w-xl font-mono animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
              Designed for Claude Code workflows. Compatible with the rest of your stack via extensions and MCP.
            </p>

            {/* Stat pills */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { label: 'Runtime Continuity', value: 'Durable' },
                { label: 'Cache-Stable Proxy', value: 'Active' },
                { label: 'Compression', value: 'Adaptive' },
                { label: 'Observability', value: 'Live' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]"
                >
                  <span className="text-base sm:text-lg font-display text-[#ffb800]">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs text-[#4a4a5e] font-mono">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
              <a
                href="#runtime-telemetry"
                className="btn-primary"
              >
                See Runtime Telemetry
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#how-it-works"
                className="btn-secondary"
              >
                How It Works
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Problem ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 border-t border-[#1a1a2e]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="tag inline-flex items-center gap-2 mb-4 sm:mb-6 border-[#ff3366]/20">
              <span className="text-[#ff3366]">The Problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6">
              <GlitchText as="span" text="Your AI sessions are " variant={0} className="text-[#e8e8f0]" />
              <GlitchText as="span" text="working against you" variant={2} className="text-[#ff3366]" />
            </h2>
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Claude Code makes 10–20 API calls per user prompt. Each call sends the entire
              conversation. Without optimization, context balloons and cache breaks on every round-trip.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {[
              {
                stat: '200K',
                unit: 'tokens',
                desc: 'Context ceiling hit after ~30 minutes of work',
                color: 'text-[#ff3366]',
              },
              {
                stat: '10–20×',
                unit: 'calls',
                desc: 'API calls per prompt — each one re-sends everything',
                color: 'text-[#ffb800]',
              },
              {
                stat: 'High',
                unit: 'cost pressure',
                desc: 'Context balloons fast — cache breaks on every tool round-trip',
                color: 'text-[#ff3366]',
              },
            ].map((item) => (
              <GlassCard key={item.stat} className="p-3 sm:p-6 text-center" variant="subtle">
                <div className={`text-2xl sm:text-4xl md:text-5xl font-display ${item.color} mb-1`}>{item.stat}</div>
                <div className="text-xs sm:text-sm text-[#4a4a5e] font-mono mb-1 sm:mb-3">{item.unit}</div>
                <p className="text-[10px] sm:text-sm text-[#7a7a8e] hidden sm:block font-body">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Three Pillars ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="tag inline-flex items-center gap-2 mb-4 sm:mb-6 border-[#ffb800]/20">
              <span className="text-[#ffb800]">The Solution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6">
              <GlitchText as="span" text="Three pillars of " variant={1} className="text-[#e8e8f0]" />
              <GlitchText as="span" text="context intelligence" variant={0} className="text-[#00f0ff]" />
            </h2>
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Pulse attacks the cost problem from three angles — compression, caching, and
              lossless backup — to reduce context pressure and increase usable turns per session.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <GlassCard key={i} className="p-5 sm:p-8 md:p-10" variant="elevated">
                  <div className="grid md:grid-cols-[1fr,1.2fr] gap-4 sm:gap-8 items-start">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 clip-sm bg-[#ffb800]/10 flex items-center justify-center flex-shrink-0"
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffb800]" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-display text-[#e8e8f0]">{pillar.title}</h3>
                          <p className="text-xs sm:text-sm text-[#7a7a8e] font-mono">{pillar.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-[#7a7a8e] leading-relaxed font-body">{pillar.description}</p>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {pillar.highlights.map((highlight, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]/50"
                        >
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800] mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-[#7a7a8e] font-body">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Cache Behavior ───────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-8 sm:p-12" variant="elevated" glow="amber">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb800]/40 to-transparent" />
            <GlitchText as="h2" text="Cache behavior with Pulse" variant={2} className="text-xl sm:text-2xl md:text-3xl font-display mb-6 text-[#e8e8f0]" />
            <p className="text-[#7a7a8e] font-body text-sm sm:text-base mb-8 leading-relaxed">
              Pulse is designed to improve context continuity by reducing repeated full-context rebuilds
              and stabilizing replay behavior across long sessions.
            </p>
            <div className="space-y-4 mb-8">
              <h3 className="text-xs sm:text-sm font-mono text-[#ffb800] uppercase tracking-wider">
                What users should expect
              </h3>
              {[
                'Longer working sessions before context pressure',
                'More consistent context handling in tool-heavy flows',
                'Cost impact varies by model, cache dynamics, and workflow',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-[#ffb800] font-mono mt-0.5">—</span>
                  <span className="text-[#b0b0c8] font-body text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#4a4a5e] font-mono text-xs sm:text-sm border-t border-[#1a1a2e] pt-6">
              No fixed cache-hit, dollar, or percentage savings are guaranteed.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ─── Runtime Telemetry Proof ─────────────────────────────────── */}
      <section id="runtime-telemetry" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="tag inline-flex items-center gap-2 mb-4 sm:mb-5 border-[#00f0ff]/20">
              <Activity className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-[#00f0ff]">Live Observability</span>
            </div>
            <GlitchText as="h2" text="Runtime substrate state, visible live" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6 text-[#e8e8f0]" />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto font-body">
              Pulse telemetry snapshot
            </p>
          </div>

          <div className="clip-lg bg-[#0d0d14] border border-[#1a1a2e] p-2 sm:p-3 relative shadow-[0_0_40px_rgba(0,240,255,0.08)]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
            {!screenshotUnavailable ? (
              <Image
                src={pulseTelemetryScreenshot}
                alt="Live ekkOS terminal state"
                width={540}
                height={907}
                className="w-full h-auto rounded-md border border-[#1a1a2e] object-contain"
                onError={() => setScreenshotUnavailable(true)}
                priority
              />
            ) : (
              <div className="rounded-md border border-dashed border-[#2a2a3e] p-8 sm:p-10 text-center">
                <p className="text-sm sm:text-base text-[#e8e8f0] font-mono uppercase tracking-wider mb-2">
                  Pulse telemetry snapshot
                </p>
                <p className="text-xs sm:text-sm text-[#7a7a8e] font-body">
                  Screenshot asset not found at <code className="text-[#b0b0c8]">{pulseTelemetryScreenshot}</code>.
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-sm sm:text-base text-[#7a7a8e] mt-4 sm:mt-5 font-body">
            Real runtime state from ekkOS Pulse — context growth, cache behavior, output tracking, and long-session continuity visible live.
          </p>
        </div>
      </section>

      {/* ─── All Features ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <GlitchText as="h2" text="13 production-ready features" variant={1} className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6 text-[#e8e8f0]" />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Every feature is battle-tested and actively running in production
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {featureCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-base sm:text-lg font-display text-[#e8e8f0]/80 mb-3 sm:mb-4 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 ${
                      category.color === 'amber'
                        ? 'bg-[#ffb800]'
                        : category.color === 'green'
                          ? 'bg-[#00ff88]'
                          : 'bg-[#00f0ff]'
                    }`}
                  />
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                  {category.features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <GlassCard
                        key={feature.title}
                        className="p-3 sm:p-5 hover:border-[#ffb800]/20 transition-all group"
                        variant="subtle"
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 clip-sm bg-[#111118]/60 backdrop-blur-xl group-hover:bg-[#ffb800]/10 transition-colors flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7a7a8e] group-hover:text-[#ffb800] transition-colors" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-display mb-0.5 sm:mb-1 leading-tight text-[#e8e8f0]">{feature.title}</h4>
                            <p className="text-[10px] sm:text-xs text-[#7a7a8e] leading-relaxed hidden sm:block font-body">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <GlitchText as="h2" text="How Pulse works" variant={2} className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6 text-[#e8e8f0]" />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              One config change. Zero code modifications. Immediate optimization.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#ffb800]/50 via-[#ffb800]/20 to-transparent hidden md:block" />

            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Point your IDE at Pulse',
                  description:
                    'Change your API base URL to your Pulse endpoint. Works with Claude Code, Cursor, Windsurf, or any compatible AI coding client.',
                  code: 'ANTHROPIC_BASE_URL=https://proxy.ekkos.dev/v1',
                },
                {
                  step: '2',
                  title: 'Pulse intercepts and optimizes',
                  description:
                    'Every API call passes through the gateway. Pulse compresses tools, preserves cache prefixes, and manages context size — all transparently.',
                  code: null,
                },
                {
                  step: '3',
                  title: 'Context grows? Pulse compresses.',
                  description:
                    'At 80% capacity, an AI compression layer condenses older turns into a dense summary. Originals are archived losslessly. If you need them back, intelligent retrieval surfaces them instantly.',
                  code: null,
                },
                {
                  step: '4',
                  title: 'Monitor everything in real-time',
                  description:
                    'The TUI dashboard shows tokens, cost, cache hits, and compression stats live. Response headers give you full diagnostic visibility.',
                  code: 'ekkos dashboard',
                },
              ].map((item) => (
                <GlassCard key={item.step} className="p-4 sm:p-6 md:p-8 md:ml-16" variant="subtle">
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 clip-sm bg-[#ffb800]/10 flex items-center justify-center flex-shrink-0 border border-[#1a1a2e]"
                    >
                      <span className="text-sm sm:text-lg md:text-xl font-display text-[#ffb800]">{item.step}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-display mb-1 sm:mb-2 text-[#e8e8f0]">{item.title}</h3>
                      <p className="text-sm sm:text-base text-[#7a7a8e] leading-relaxed mb-2 sm:mb-3 font-body">{item.description}</p>
                      {item.code && (
                        <code className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 clip-sm bg-[#0a0a0f] border border-[#1a1a2e] text-xs sm:text-sm text-[#ffb800] font-mono break-all sm:break-normal">
                          {item.code}
                        </code>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pulse to Cortex Bridge ─────────────────────────────────── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="clip-lg bg-[#111118] border border-[#00f0ff]/20 p-6 sm:p-10 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/35 to-transparent" />
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="clip-md bg-[#0d0d14] border border-[#1a1a2e] p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-display text-[#ffb800] mb-2">Pulse</h3>
                <p className="text-sm sm:text-base text-[#7a7a8e] font-body">
                  Runtime continuity, cache-stable proxy behavior, smart compression, and live observability while sessions are in motion.
                </p>
              </div>
              <div className="clip-md bg-[#0d0d14] border border-[#1a1a2e] p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-display text-[#00f0ff] mb-2">Cortex</h3>
                <p className="text-sm sm:text-base text-[#7a7a8e] font-body">
                  Structured directives, reusable patterns, and inspectable repo intelligence that compounds over time.
                </p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-[#e8e8f0] font-body mb-5">
              Pulse preserves runtime context. Cortex turns that context into structured, reusable intelligence.
            </p>
            <Link href="/cortex" className="btn-secondary">
              See Cortex Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <GlitchText as="h2" text="Add Pulse to your plan" variant={0} className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6 text-[#e8e8f0]" />
            <p className="text-sm sm:text-lg text-[#7a7a8e] font-body">
              Reduce context pressure. Increase usable turns per session.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <GlassCard
                key={plan.name}
                className={`p-5 sm:p-8 flex flex-col ${
                  plan.highlighted
                    ? 'relative overflow-hidden'
                    : ''
                }`}
                variant={plan.highlighted ? 'elevated' : 'default'}
                glow={plan.highlighted ? 'amber' : 'none'}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb800]/40 to-transparent" />
                )}

                <h3 className="text-xl sm:text-2xl font-display mb-1 sm:mb-2 text-[#e8e8f0]">{plan.name}</h3>
                <div className="text-3xl sm:text-4xl font-display mb-1 text-[#e8e8f0]">
                  ${plan.price}
                  <span className="text-sm sm:text-base text-[#4a4a5e] font-body font-normal">{plan.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#7a7a8e] mb-4 sm:mb-6 font-body">{plan.description}</p>

                <ul className="space-y-2 sm:space-y-3 flex-grow mb-6 sm:mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#7a7a8e] font-body">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {!plan.ctaLink ? (
                  <button
                    disabled
                    className="w-full py-3.5 clip-sm font-mono bg-[#ffb800]/20 text-[#7a7a8e] cursor-not-allowed uppercase tracking-wider text-sm"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <a
                    href={plan.ctaLink}
                    className={`block w-full py-3.5 text-center clip-sm font-mono transition-all uppercase tracking-wider text-sm ${
                      plan.highlighted
                        ? 'bg-[#ffb800] text-[#0a0a0f] hover:bg-[#ffc933]'
                        : 'bg-transparent border border-[#2a2a3e] text-[#e8e8f0] hover:border-[#ffb800] hover:text-[#ffb800]'
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#7a7a8e] text-sm font-body">
              Need the base plan?{' '}
              <Link
                href="/pricing"
                className="text-[#ffb800] hover:text-[#ffc933] transition-colors font-mono underline underline-offset-4"
              >
                View all plans
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display mb-4 sm:mb-6 leading-tight">
            <GlitchText as="span" text="Ready to make your AI sessions " variant={1} className="text-[#e8e8f0]" />
            <GlitchText as="span" text="go further" variant={2} className="text-[#ffb800]" />
            <span className="text-[#e8e8f0]">?</span>
          </h2>
          <p className="text-sm sm:text-lg text-[#7a7a8e] mb-6 sm:mb-10 max-w-2xl mx-auto font-body">
            ekkOS_Pulse launches Q2 2026. Join the waitlist for early access and exclusive pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:pulse@ekkos.dev?subject=Pulse%20Early%20Access"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Join Waitlist
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <Link
              href="/features"
              className="btn-secondary w-full sm:w-auto justify-center"
            >
              Explore All Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
