'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowLeft, CheckCircle2, Clock, Database, Infinity, Shield } from 'lucide-react';
import Link from 'next/link';

export default function MemoryRetentionDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back Link */}
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Documentation
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 clip-md bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-6">
            <Database className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#e8e8f0] mb-4">
            Memory Retention Policies
          </h1>
          <p className="text-lg text-[#7a7a8e] font-body max-w-2xl mx-auto">
            Technical documentation for ekkOS memory retention: session, standard, and Forever Memory&trade;
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Overview</h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
              Each memory item in ekkOS has a <code className="text-[#00f0ff] font-mono bg-[#0d0d14]/50 backdrop-blur-md px-1.5 py-0.5">retention_policy</code> that determines how long it persists and whether it&apos;s subject to decay algorithms.
            </p>
            <p className="text-[#7a7a8e] font-body leading-relaxed">
              The retention policy controls:
            </p>
            <ul className="space-y-2 text-[#7a7a8e] font-body ml-4 mt-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>How long the memory item persists</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>Whether decay algorithms apply</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>When the item can be pruned or archived</span>
              </li>
            </ul>
          </GlassCard>

          {/* Retention Policies Table */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-6">Retention Policies</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#1a1a2e]">
                    <th className="pb-3 pr-6 text-[#e8e8f0] font-display font-semibold">Policy</th>
                    <th className="pb-3 pr-6 text-[#e8e8f0] font-display font-semibold">Description</th>
                    <th className="pb-3 text-[#e8e8f0] font-display font-semibold">Decay</th>
                  </tr>
                </thead>
                <tbody className="text-[#7a7a8e] font-body">
                  <tr className="border-b border-[#1a1a2e]/50">
                    <td className="py-3 pr-6">
                      <code className="text-[#00f0ff] font-mono bg-[#0d0d14]/50 backdrop-blur-md px-2 py-1">session</code>
                    </td>
                    <td className="py-3 pr-6">Ephemeral. Cleared automatically at the end of a session.</td>
                    <td className="py-3">Immediate</td>
                  </tr>
                  <tr className="border-b border-[#1a1a2e]/50">
                    <td className="py-3 pr-6">
                      <code className="text-[#00f0ff] font-mono bg-[#0d0d14]/50 backdrop-blur-md px-2 py-1">standard</code>
                    </td>
                    <td className="py-3 pr-6">Long-lived but subject to decay if unused, low-quality, or irrelevant.</td>
                    <td className="py-3">Gradual</td>
                  </tr>
                  <tr className="border-b border-[#1a1a2e]/50">
                    <td className="py-3 pr-6">
                      <code className="text-[#00f0ff] font-mono font-semibold bg-[#0d0d14]/50 backdrop-blur-md px-2 py-1">forever</code>
                    </td>
                    <td className="py-3 pr-6">Never decayed, never pruned. Always preserved.</td>
                    <td className="py-3">
                      <span className="text-[#00f0ff] font-semibold">Never</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* What Uses Forever */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                <Infinity className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">What Uses Forever Memory&trade; Today</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  The following content types are automatically assigned <code className="text-[#00f0ff] font-mono bg-[#0d0d14]/50 backdrop-blur-md px-1.5 py-0.5">retention_policy=&apos;forever&apos;</code>:
                </p>
                <ul className="space-y-3 text-[#7a7a8e] font-body ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#e8e8f0]">Multimodal items</strong> -- Images, audio files, and other media uploads
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#e8e8f0]">Forged patterns</strong> -- Patterns created via the crystallize/forge mechanism
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#e8e8f0]">User preferences</strong> -- Settings and configuration that define how you work
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#e8e8f0]">Core semantic knowledge</strong> -- Important facts and insights explicitly marked as important
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#e8e8f0]">Any memory explicitly upgraded</strong> -- Items manually promoted to Forever Memory&trade;
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Decay Exception */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00ff88]/10 border border-[#00ff88]/20">
                <Shield className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Decay Exception</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  Items with <code className="text-[#00ff88] font-mono bg-[#0d0d14]/50 backdrop-blur-md px-1.5 py-0.5">retention_policy=&apos;forever&apos;</code> skip the decay algorithm entirely.
                </p>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  The decay calculation explicitly checks for Forever Memory&trade;:
                </p>
                <div className="p-4 clip-sm bg-[#0a0a0f] border border-[#1a1a2e] mb-4">
                  <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`if (retention_policy === 'forever') {
  return 1.0;  // never decays
}`}
                  </pre>
                </div>
                <p className="text-[#7a7a8e] font-body leading-relaxed">
                  This means Forever Memory&trade; items:
                </p>
                <ul className="space-y-2 text-[#7a7a8e] font-body ml-4 mt-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Never have their decay score calculated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Are excluded from retention maintenance jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Cannot be pruned or archived automatically</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Layer-Specific Retention */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Layer-Specific Retention</h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
              Different memory layers use different retention policies by default:
            </p>
            <div className="space-y-3">
              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display font-semibold text-[#e8e8f0]">Working Memory (Layer 1)</h3>
                  <span className="tag">session</span>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Ephemeral. Cleared after 24 hours or when session ends.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display font-semibold text-[#e8e8f0]">Episodic Memory (Layer 2)</h3>
                  <span className="tag">standard</span>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Long-term but subject to decay. Retained for 30+ days, then gradually fades if unused.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Infinity className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display font-semibold text-[#e8e8f0]">Pattern Memory (Layer 4)</h3>
                  <span className="tag">forever</span>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  All patterns are Forever Memory&trade;. They represent proven solutions you want to keep.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Infinity className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display font-semibold text-[#e8e8f0]">Multimodal Uploads</h3>
                  <span className="tag">forever</span>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Images, audio, and other media files are stored as Forever Memory&trade;.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* API Reference */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">API Reference</h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
              When creating or updating memory items, you can specify the retention policy:
            </p>

            <div className="space-y-4">
              <div className="p-4 clip-sm bg-[#0a0a0f] border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Create Memory with Retention Policy</h3>
                <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`POST /api/v1/memory
{
  "content": "Important insight",
  "title": "Something to remember",
  "retention_policy": "forever"  // or "standard" or "session"
}`}
                </pre>
              </div>

              <div className="p-4 clip-sm bg-[#0a0a0f] border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Upgrade Memory to Forever</h3>
                <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`POST /api/v1/memory/:id/retention
{
  "retention_policy": "forever"
}`}
                </pre>
              </div>

              <div className="p-4 clip-sm bg-[#0a0a0f] border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Create Forever Memory Directly</h3>
                <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`POST /api/v1/memory/forever
{
  "userId": "uuid",
  "content": "important insight or knowledge",
  "title": "Something I want to keep forever",
  "metadata": { "scope": "private" }
}`}
                </pre>
              </div>
            </div>
          </GlassCard>

          {/* Best Practices */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Best Practices</h2>
            <div className="space-y-3">
              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">1. Use Forever Memory&trade; for Important Content</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Files, patterns, and key insights should use Forever Memory&trade;. These are items you never want to lose.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">2. Standard Memory for General Knowledge</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Use standard retention for general knowledge that can fade if unused. The decay algorithm will preserve what matters.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">3. Session Memory for Temporary Context</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Use session retention for temporary context that only matters during active work sessions.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* CTA */}
          <GlassCard variant="elevated" className="p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Learn More</h2>
            <p className="text-[#7a7a8e] font-body mb-6">
              Explore Forever Memory&trade; features or read about the memory layers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/features/forever-memory"
                className="btn-primary px-6 py-3 text-center font-medium"
              >
                Forever Memory&trade; Feature
              </Link>
              <Link
                href="/docs"
                className="btn-secondary px-6 py-3 text-center font-medium"
              >
                Documentation Home
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
