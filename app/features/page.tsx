'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GlitchText } from '@/components/ui/GlitchText';
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Code2,
  Database,
  FileCode,
  Globe,
  Infinity,
  Layers,
  Lock,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const coreFeatures = [
  {
    icon: Globe,
    title: 'Cross-Platform State Persistence',
    description: 'Single substrate. Persistent state across all MCP-compatible environments.',
    details: [
      'Switch IDEs freely—your patterns come with you',
      'Automatic sync across all connected tools',
      'No re-explaining your codebase to each tool',
    ],
    link: undefined as string | undefined,
  },
  {
    icon: Sparkles,
    title: 'Autonomous Pattern Capture',
    description: 'Solutions encoded as executable patterns on resolution. Activated on retrieval.',
    details: [
      'Semantic pattern detection (not keyword matching)',
      '70%+ confidence threshold before activation',
      'Patterns prove themselves through success rates',
    ],
  },
  {
    icon: Shield,
    title: 'Confidence Signals\u2122',
    description: 'Every suggestion cross-validated against operational history. Grounded, Speculative, or Conflict — flagged before execution.',
    details: [
      'Real-time validation under 100ms',
      'Cross-references patterns, decisions, and directives',
      'Catches problems before you implement them',
    ],
  },
  {
    icon: Infinity,
    title: 'Forever Memory\u2122',
    description: 'Some things you never want the AI to forget. Files, patterns, and key insights are preserved permanently.',
    details: [
      'Never decayed, never pruned',
      'Always retrievable, always preserved',
      'Automatic for files, patterns, and preferences',
    ],
    link: '/features/forever-memory',
  },
  {
    icon: Lock,
    title: 'User Directives',
    description: 'Set MUST/NEVER/PREFER/AVOID rules your AI follows. Establish permanent behavioral constraints.',
    details: [
      'Persists across all sessions',
      'Automatically enforced in responses',
      'Conflict detection when rules clash',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Golden Loop Architecture',
    description: 'Closed-loop reinforcement: Retrieve \u2192 Apply \u2192 Measure \u2192 Learn \u2192 Capture. Patterns sharpen with every cycle.',
    details: [
      'Success rate tracking for patterns',
      'Automatic pattern promotion and retirement',
      'Confidence scores evolve with usage',
    ],
  },
];

const memoryLayers = [
  { number: '1', name: 'Working Memory', desc: '24h conversation window for immediate context' },
  { number: '2', name: 'Episodic Memory', desc: 'Problem-solution pairs from past interactions' },
  { number: '3', name: 'Semantic Memory', desc: 'Compressed knowledge extracted from conversations' },
  { number: '4', name: 'Pattern Memory', desc: 'Proven templates with confidence evolution' },
  { number: '5', name: 'Procedural Memory', desc: 'Step-by-step workflows and processes' },
  { number: '6', name: 'Collective Memory', desc: 'Cross-agent learning across AI models' },
  { number: '7', name: 'Meta Memory', desc: 'System self-awareness and performance tracking' },
  { number: '8', name: 'Codebase Memory', desc: 'Code understanding and semantic search' },
  { number: '9', name: 'Directives', desc: 'User rules (MUST/NEVER/PREFER/AVOID)' },
  { number: '10', name: 'Conflicts', desc: 'When directives clash\u2014resolution logic' },
  { number: '11', name: 'Secrets Vault', desc: 'Encrypted credentials and sensitive data (AES-256-GCM)' },
];

const mcpTools = [
  {
    name: 'ekkOS_Search',
    desc: 'Search across all 11 memory layers for patterns, solutions, and context.',
    icon: Search,
  },
  {
    name: 'ekkOS_Forge',
    desc: 'Capture solutions that worked as reusable patterns for future use.',
    icon: Sparkles,
  },
  {
    name: 'ekkOS_Directive',
    desc: 'Set MUST/NEVER/PREFER/AVOID rules your AI follows permanently.',
    icon: FileCode,
  },
  {
    name: 'ekkOS_Recall',
    desc: 'Remember what you discussed days or weeks ago with semantic search.',
    icon: MessageSquare,
  },
  {
    name: 'ekkOS_Conflict',
    desc: 'Validate actions against your rules before executing them.',
    icon: Shield,
  },
  {
    name: 'ekkOS_Context',
    desc: 'Get relevant patterns and episodes for the current task.',
    icon: Brain,
  },
];

const integrations = [
  { name: 'Claude Code', status: 'live' },
  { name: 'Cursor', status: 'live' },
  { name: 'Windsurf', status: 'live' },
  { name: 'VS Code', status: 'extension', note: 'Extension Only' },
  { name: 'API / CLI', status: 'live' },
];

const securityFeatures = [
  'SOC 2 Type II (certification in progress)',
  'End-to-end encryption for all data',
  'Your code never leaves your control',
  'GDPR and CCPA compliant',
  'Enterprise SSO (SAML, Google, GitHub)',
  'Audit logs for compliance',
  'Self-hosted option for Enterprise',
  'Custom data residency',
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="tag inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#00f0ff]" />
            Persistent Memory Infrastructure
          </div>

          <GlitchText as="h1" text="System Capabilities" variant={0} className="text-4xl md:text-6xl font-display mb-6 text-[#00f0ff]" />

          <p className="text-xl text-[#7a7a8e] max-w-3xl mx-auto mb-8 font-body">
            Persistent cognitive infrastructure for AI development tools. Every fix, every preference, every decision — retained and compounded.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://platform.ekkos.dev/signup"
              className="btn-primary"
            >
              Deploy Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/docs"
              className="btn-secondary"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GlitchText as="h2" text="CORE_SUBSYSTEMS" variant={1} className="section-label mb-4" />
            <h3 className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4">Core Subsystems</h3>
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              The subsystems powering persistent intelligence and closed-loop learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => (
              <GlassCard
                key={feature.title}
                variant="elevated"
                hover="lift"
                delay={i * 0.05}
                className="p-6"
              >
                <div className="w-12 h-12 clip-sm bg-[#00f0ff]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <h3 className="text-xl font-display text-[#e8e8f0] mb-2">{feature.title}</h3>
                <p className="text-[#7a7a8e] mb-4 font-body">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#7a7a8e] font-body">
                      <Check className="w-4 h-4 text-[#00ff88] mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                {feature.link && (
                  <Link
                    href={feature.link}
                    className="inline-flex items-center gap-1 mt-4 text-sm text-[#00f0ff] hover:text-[#33f3ff] transition-colors font-mono"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 11-Layer Architecture */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              First-of-Kind Architecture
            </div>
            <GlitchText as="h2" text="11-Layer Memory Architecture" variant={2} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Unlike flat vector databases, ekkOS uses a structured memory system inspired by human cognition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {memoryLayers.map((layer, i) => (
              <GlassCard
                key={layer.number}
                variant="elevated"
                delay={i * 0.03}
                className="p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 clip-sm bg-[#00f0ff]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-mono font-bold text-[#00f0ff]">{layer.number}</span>
                </div>
                <div>
                  <h3 className="font-display text-[#e8e8f0]">{layer.name}</h3>
                  <p className="text-sm text-[#7a7a8e] font-body">{layer.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-[#33f3ff] transition-colors font-mono"
            >
              Read the full technical breakdown <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MCP Tools */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              29 MCP Tools
            </div>
            <GlitchText as="h2" text="MCP Memory Tools" variant={0} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              29 user-facing tools that wire your AI directly to the memory substrate via the Model Context Protocol.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpTools.map((tool, i) => (
              <GlassCard
                key={tool.name}
                variant="elevated"
                hover="lift"
                delay={i * 0.05}
                className="p-6"
              >
                <div className="w-10 h-10 clip-sm bg-[#00f0ff]/10 flex items-center justify-center mb-4">
                  <tool.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <code className="text-sm font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 clip-sm mb-3 inline-block">
                  {tool.name}
                </code>
                <p className="text-[#7a7a8e] text-sm font-body">{tool.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <GlitchText as="h2" text="Integration Protocol" variant={1} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              One substrate. All environments. State persists across tool boundaries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration) => (
              <GlassCard
                key={integration.name}
                variant="elevated"
                className="px-6 py-4 flex items-center gap-3"
              >
                <Terminal className="w-5 h-5 text-[#00f0ff]" />
                <span className="font-mono text-[#e8e8f0]">{integration.name}</span>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 ${integration.status === 'live' ? 'bg-[#00ff88]' : 'bg-[#ffb800]'}`} />
                  <span className={`text-xs font-mono ${integration.status === 'live' ? 'text-[#00ff88]' : 'text-[#ffb800]'}`}>
                    {integration.status === 'live' ? 'Live' : 'Extension Only'}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <GlassCard variant="prominent" glow="cyan" className="p-8 inline-block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 clip-sm bg-[#00f0ff]/20 flex items-center justify-center">
                  <Database className="w-6 h-6 text-[#00f0ff]" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-display text-[#e8e8f0]">ekkOS_\u2122 Memory Substrate</div>
                  <div className="text-sm text-[#7a7a8e] font-body">Central hub for all your AI tools</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Memory Gateway */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <Globe className="w-4 h-4 text-[#00f0ff]" />
              Memory Gateway
            </div>
            <GlitchText as="h2" text="Any Model. Any Provider. One Memory." variant={2} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Use GPT-4o, Claude, Grok, or Gemini — your patterns and context follow you everywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard variant="elevated" className="p-6">
              <Sparkles className="w-8 h-8 text-[#00f0ff] mb-4" />
              <h3 className="font-display text-[#e8e8f0] mb-2">Pattern Injection</h3>
              <p className="text-sm text-[#7a7a8e] font-body">
                Your relevant patterns are automatically injected into every request, no matter which provider you use.
              </p>
            </GlassCard>
            <GlassCard variant="elevated" className="p-6">
              <Brain className="w-8 h-8 text-[#00f0ff] mb-4" />
              <h3 className="font-display text-[#e8e8f0] mb-2">Unified Memory</h3>
              <p className="text-sm text-[#7a7a8e] font-body">
                Teach Claude something, GPT knows it. All your tools share the same memory substrate.
              </p>
            </GlassCard>
            <GlassCard variant="elevated" className="p-6">
              <Zap className="w-8 h-8 text-[#00f0ff] mb-4" />
              <h3 className="font-display text-[#e8e8f0] mb-2">Single Integration</h3>
              <p className="text-sm text-[#7a7a8e] font-body">
                One connection. Memory-aware intelligence across your entire model ecosystem, regardless of provider.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Prometheus Feedback Loop */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-[#ffb800]" />
              <span className="text-[#ffb800]">Continuous Intelligence</span>
            </div>
            <GlitchText as="h2" text="The Prometheus Feedback Loop" variant={0} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              A continuous background engine that evaluates, promotes, and prunes your pattern library — so it gets sharper without any effort from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: 'Delta Evaluation',
                desc: 'Every pattern application is tracked. Delta scores measure how much each pattern actually reduced time-to-resolution over your baseline.',
              },
              {
                title: 'Auto-Promotion to Collective',
                desc: 'Patterns with 85%+ success across 10+ uses are automatically promoted to the collective layer — available to your team instantly.',
              },
              {
                title: 'Skip-Rate Demotion',
                desc: 'Patterns skipped more than used are quietly demoted before they clutter retrieval. The substrate self-curates.',
              },
              {
                title: 'Runs Every 15 Minutes',
                desc: 'Background evaluation cycle continuously re-scores the library. Your pattern quality improves passively between sessions.',
              },
            ].map((item, i) => (
              <GlassCard key={i} variant="elevated" className="p-6">
                <h3 className="text-lg font-display text-[#e8e8f0] mb-2">{item.title}</h3>
                <p className="text-[#7a7a8e] font-body">{item.desc}</p>
              </GlassCard>
            ))}
          </div>

          <div className="clip-lg bg-[#111118] border border-[#ffb800]/20 p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb800]/40 to-transparent" />
            <p className="text-center text-[#7a7a8e] font-body">
              <span className="text-[#ffb800] font-semibold">The result:</span> After 100 pattern applications, ekkOS has processed 100 outcome signals — reinforcing what worked, retiring what didn't. That delta compounds every session.
            </p>
          </div>
        </div>
      </section>

      {/* For Teams */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-[#ffb800]" />
              <span className="text-[#ffb800]">Collective Mode</span>
            </div>
            <GlitchText as="h2" text="Collective Intelligence Mode" variant={1} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Institutional knowledge transfer at deployment speed. Compound intelligence at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Shared Pattern Library', desc: "One senior forges a pattern. Everyone\u2019s AI uses it instantly." },
              { title: 'Consistent Suggestions', desc: 'AI recommendations aligned with team conventions, not random Stack Overflow.' },
              { title: 'Onboarding Acceleration', desc: 'New hires have access to years of institutional knowledge from day one.' },
              { title: 'Drift Detection', desc: 'Analytics show when patterns diverge. Consolidate before it becomes debt.' },
              { title: 'Role-Aware Memory Spaces', desc: 'Different contexts for frontend, backend, and DevOps teams.' },
              { title: 'Admin Controls', desc: 'SSO, audit logs, permissions, and custom retention policies.' },
            ].map((item, i) => (
              <GlassCard key={i} variant="elevated" className="p-6">
                <h3 className="text-lg font-display text-[#e8e8f0] mb-2">{item.title}</h3>
                <p className="text-[#7a7a8e] font-body">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="tag inline-flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88]">Security Architecture</span>
            </div>
            <GlitchText as="h2" text="Security Architecture" variant={2} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-4" />
            <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
              Defense-grade security posture. Your code never leaves your control.
            </p>
          </div>

          <GlassCard variant="elevated" className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff88] flex-shrink-0" />
                  <span className="text-[#e8e8f0]/80 font-body">{feature}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="mt-8 text-center">
            <Link
              href="/security"
              className="inline-flex items-center gap-2 text-[#00ff88] hover:text-[#33ffaa] transition-colors font-mono"
            >
              View Security Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <GlitchText as="h2" text="Deploy Persistent Intelligence" variant={0} className="text-3xl md:text-4xl font-display text-[#e8e8f0] mb-6" />
          <p className="text-lg text-[#7a7a8e] mb-8 font-body">
            No credit card required. Operational from first session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://platform.ekkos.dev/signup"
              className="btn-primary"
            >
              Deploy Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary"
            >
              View Access Tiers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
