'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GlitchText } from '@/components/ui/GlitchText';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  ArrowRight,
  BookOpenText,
  Brain,
  CheckCircle2,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Sparkles,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';

const capabilityBlocks = [
  {
    icon: FileCode2,
    title: 'Directives',
    description: 'Persistent rules that encode intent and taste in inspectable form.',
    points: [
      'MUST / NEVER / PREFER constraints',
      'Repo-aware enforcement context',
      'Visible and editable by the team',
    ],
  },
  {
    icon: GitBranch,
    title: 'Patterns',
    description: 'Successful implementations become reusable execution patterns.',
    points: [
      'Forged from real outcomes',
      'Reusable across related tasks',
      'Confidence evolves with usage',
    ],
  },
  {
    icon: BookOpenText,
    title: 'Living Docs',
    description: 'Session decisions and implementation notes become continuously updated docs.',
    points: [
      'Generated from real work, not stale templates',
      'Grounded in current repo shape',
      'Keeps architecture intent visible',
    ],
  },
  {
    icon: Database,
    title: 'Repo Intelligence',
    description: 'Structured context mapped to components, interfaces, and system boundaries.',
    points: [
      'Knows where logic actually lives',
      'Tracks conventions and constraints',
      'Improves retrieval precision over time',
    ],
  },
  {
    icon: Layers,
    title: 'System Context Injection',
    description: 'Injects only relevant structured intelligence into active sessions.',
    points: [
      'Minimal, targeted context payloads',
      'Reduces noise in long workflows',
      'Keeps model behavior grounded',
    ],
  },
  {
    icon: Sparkles,
    title: 'Dream Forge',
    description: 'Overnight recombination engine that proposes stronger next states.',
    points: [
      'Merges winning directions',
      'Prunes weak or stale patterns',
      'Generates refined hypotheses for next session',
    ],
  },
];

const cortexFlow = [
  { step: 'Capture', detail: 'Sessions, decisions, rules, and outcomes are recorded.' },
  { step: 'Structure', detail: 'Raw traces become directives, patterns, and living docs.' },
  { step: 'Inject', detail: 'Relevant system context is inserted into active tasks.' },
  { step: 'Reinforce', detail: 'Successful usage strengthens confidence and reuse priority.' },
  { step: 'Evolve', detail: 'Dream Forge recombines wins and proposes next-state directions.' },
];

export default function CortexPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="tag inline-flex items-center gap-2 mb-6">
            <Brain className="w-4 h-4 text-[#00f0ff]" />
            Structured Context Layer
          </div>

          <GlitchText
            as="h1"
            text="Cortex — Structured Context for Systems That Remember"
            variant={0}
            className="text-3xl sm:text-5xl md:text-7xl font-display tracking-tight text-[#e8e8f0] mb-6 leading-[1.05]"
          />

          <p className="text-base sm:text-xl text-[#7a7a8e] max-w-4xl mx-auto mb-4 font-body leading-relaxed">
            Built to structure what your Claude Code sessions uncover — then make it reusable across the rest of your workflow. Cortex turns raw context into lasting system intelligence.
          </p>
          <p className="text-sm sm:text-lg text-[#b0b0c8] max-w-3xl mx-auto mb-8 font-body leading-relaxed">
            The repo doesn&apos;t just store code. With Cortex, it starts to know itself. Persistent directives, forged patterns, living docs, and repo-aware intelligence that compounds over time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <Link href="https://platform.ekkos.dev/signup" className="btn-primary">
              Explore Cortex
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <a href="#pulse-cortex-bridge" className="btn-secondary">
              See How Pulse + Cortex Work Together
            </a>
          </div>
        </div>
      </section>

      {/* What ekkOS Remembers */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 border-t border-[#1a1a2e]/60">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label mb-3">MEMORY_SURFACE</div>
            <GlitchText
              as="h2"
              text="What ekkOS Actually Remembers"
              variant={1}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto mt-4 font-body">
              Every session produces decisions, corrections, and working solutions. Cortex captures the ones that matter and discards the noise.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Rules and preferences', detail: 'MUST / NEVER / PREFER directives extracted from real decisions — not boilerplate.' },
              { label: 'Proven implementations', detail: 'Patterns forged from successful outcomes, with confidence that evolves over time.' },
              { label: 'Architecture intent', detail: 'Living docs generated from actual work, grounded in the current repo shape.' },
              { label: 'Structural context', detail: 'Where logic lives, what conventions apply, and which boundaries matter.' },
            ].map((item) => (
              <ScrollReveal key={item.label}>
              <GlassCard variant="subtle" className="p-4 sm:p-5 h-full">
                <h3 className="text-base sm:text-lg font-display text-[#00f0ff] mb-2">{item.label}</h3>
                <p className="text-xs sm:text-sm text-[#7a7a8e] font-body">{item.detail}</p>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Repo Knows Itself */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 border-t border-[#1a1a2e]/60">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label mb-3">INSPECTABLE_INTELLIGENCE</div>
            <GlitchText
              as="h2"
              text="The Repo Starts to Know Itself"
              variant={2}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto mt-4 font-body">
              Teams do not buy abstract memory infrastructure. They buy the feeling that the repo knows itself, and they can inspect why the assistant behaves the way it does.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <GlassCard variant="elevated" className="p-6 sm:p-8">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              {[
                'Directive history is visible and versionable.',
                'Pattern lineage is inspectable from source to reuse.',
                'Living docs reflect real implementation decisions.',
              ].map((item) => (
                <div key={item} className="clip-sm bg-[#0d0d14] border border-[#1a1a2e] p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#b0b0c8] font-body">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-10 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label mb-3">CORTEX_CAPABILITIES</div>
            <GlitchText
              as="h2"
              text="Core Capability Surface"
              variant={0}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {capabilityBlocks.map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.08}>
              <GlassCard variant="elevated" className="p-4 sm:p-6 h-full">
                <div className="w-10 h-10 clip-sm bg-[#00f0ff]/10 border border-[#1a1a2e] flex items-center justify-center mb-3">
                  <block.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <h3 className="text-lg sm:text-xl font-display text-[#e8e8f0] mb-2">{block.title}</h3>
                <p className="text-sm text-[#7a7a8e] font-body mb-3">{block.description}</p>
                <div className="space-y-2">
                  {block.points.map((point) => (
                    <div key={point} className="text-xs sm:text-sm text-[#b0b0c8] bg-[#0d0d14] border border-[#1a1a2e] clip-sm px-3 py-2 font-body">
                      {point}
                    </div>
                  ))}
                </div>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How Cortex Works */}
      <section className="py-10 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="tag inline-flex items-center gap-2 mb-4">
              <Workflow className="w-4 h-4 text-[#ffb800]" />
              <span className="text-[#ffb800]">How Cortex Works</span>
            </div>
            <GlitchText
              as="h2"
              text="Capture → Structure → Inject → Reinforce → Evolve"
              variant={2}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
          </div>

          <div className="grid md:grid-cols-5 gap-2 sm:gap-4">
            {cortexFlow.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
              <GlassCard variant="subtle" className="p-4 sm:p-5 text-center h-full">
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#4a4a5e] mb-2">Step {i + 1}</p>
                <h3 className="text-base sm:text-lg font-display text-[#00f0ff] mb-2">{item.step}</h3>
                <p className="text-xs sm:text-sm text-[#7a7a8e] font-body">{item.detail}</p>
              </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section id="pulse-cortex-bridge" className="py-10 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label mb-3">SYSTEM_LAYERS</div>
            <GlitchText
              as="h2"
              text="Three Layers. One System."
              variant={0}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto mt-4 font-body">
              Each layer handles a distinct phase of memory. Together, they form a closed loop where context is never lost and intelligence compounds.
            </p>
          </div>
          <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-6 sm:p-10 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <GlassCard variant="subtle" className="p-4 sm:p-5">
                <h3 className="text-lg font-display text-[#ffb800] mb-2">Pulse</h3>
                <p className="text-sm text-[#7a7a8e] font-body mb-2">
                  Runtime continuity and observability. Keeps context alive while sessions are in motion — preserves working memory across compaction boundaries so nothing drops mid-task.
                </p>
                <p className="text-xs text-[#4a4a5e] font-mono">Phase: active session</p>
              </GlassCard>
              <GlassCard variant="subtle" className="p-4 sm:p-5">
                <h3 className="text-lg font-display text-[#00f0ff] mb-2">Cortex</h3>
                <p className="text-sm text-[#7a7a8e] font-body mb-2">
                  Structured context and reusable intelligence. Directives, patterns, living docs, and repo-level knowledge that persist between sessions and compound with every outcome.
                </p>
                <p className="text-xs text-[#4a4a5e] font-mono">Phase: structured at rest</p>
              </GlassCard>
              <GlassCard variant="subtle" className="p-4 sm:p-5">
                <h3 className="text-lg font-display text-[#00ff88] mb-2">Dream Forge</h3>
                <p className="text-sm text-[#7a7a8e] font-body mb-2">
                  Overnight evolution and hypothesis generation. Recombines winning patterns, prunes stale paths, and proposes refined directions for the next session — connecting Cortex memory to forward momentum.
                </p>
                <p className="text-xs text-[#4a4a5e] font-mono">Phase: offline evolution</p>
              </GlassCard>
            </div>
            <p className="text-base sm:text-lg text-[#e8e8f0] font-body">
              Cortex turns raw context into lasting system intelligence.
            </p>
            <p className="text-sm sm:text-base text-[#7a7a8e] font-body mt-2">
              The repo doesn&apos;t just store code. With Cortex, it starts to know itself.
            </p>
          </div>
        </div>
      </section>

      {/* Context Compounds */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 border-t border-[#1a1a2e]/60">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <div className="section-label mb-3">COMPOUND_INTELLIGENCE</div>
            <GlitchText
              as="h2"
              text="Context That Gets Stronger Over Time"
              variant={1}
              className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0]"
            />
            <p className="text-sm sm:text-lg text-[#7a7a8e] max-w-3xl mx-auto mt-4 font-body">
              Every session sharpens the system. Patterns gain confidence from repeated success. Weak directions get pruned. Directives accumulate from real decisions, not configuration files. The result is memory that is inspectable, not mystical — you can trace every rule back to the session that produced it.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal>
          <GlassCard variant="elevated" className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: 'Session 1', detail: 'Initial directives and first patterns captured from real work.' },
                { label: 'Session 10', detail: 'High-confidence patterns surface automatically. Weak hypotheses pruned by Dream Forge.' },
                { label: 'Session 50', detail: 'Living docs reflect cumulative architecture decisions. Retrieval is precise and low-noise.' },
                { label: 'Session 100+', detail: 'The system knows your codebase conventions, preferred approaches, and boundary conditions — all inspectable and editable.' },
              ].map((item) => (
                <div key={item.label} className="clip-sm bg-[#0d0d14] border border-[#1a1a2e] p-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#00f0ff] mb-1">{item.label}</p>
                  <p className="text-sm text-[#b0b0c8] font-body">{item.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <GlitchText
            as="h2"
            text="Build with context that compounds"
            variant={2}
            className="text-2xl sm:text-3xl md:text-5xl font-display text-[#e8e8f0] mb-4 sm:mb-6"
          />
          <p className="text-sm sm:text-lg text-[#7a7a8e] font-body mb-8">
            Start with Pulse for runtime continuity, then add Cortex to turn session traces into reusable system intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="https://platform.ekkos.dev/signup" className="btn-primary">
              Start Free
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link href="/pulse" className="btn-secondary">
              Review Pulse Runtime Layer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
