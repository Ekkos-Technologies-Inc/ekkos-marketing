'use client';

import { ArrowLeft, Brain, Clock, Database, FileImage, Infinity, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ForeverMemoryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors mb-8 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 clip-md bg-[#00f0ff] mb-6">
            <Infinity className="w-8 h-8 text-[#0a0a0f]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#e8e8f0] mb-4">
            Forever Memory<sup className="text-2xl">™</sup>
          </h1>
          <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
            Some things you never want the AI to forget. ekkOS gives them Forever Memory™.
          </p>
        </div>

        {/* Core Principle */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 clip-sm bg-[#00f0ff]/10">
                <Infinity className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div>
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  Never Forgotten, Never Decayed
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed text-lg mb-4 font-body">
                  Every memory item in ekkOS has a retention mode. <strong className="text-[#e8e8f0]">Forever Memory™</strong> means items that never decay or get pruned—always retrievable, always preserved.
                </p>
                <p className="text-[#7a7a8e] leading-relaxed font-body">
                  Files, images, audio, patterns, and key insights are stored as Forever Memory™ so you can always recall them, no matter how much time passes.
                </p>
              </div>
            </div>
          </div>

          {/* Three Retention Levels */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="section-label mb-6">THREE LEVELS OF MEMORY RETENTION</p>
            <div className="space-y-4">
              <div className="clip-sm p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#00f0ff]" />
                  <h3 className="text-xl font-display text-[#e8e8f0]">Session Memory</h3>
                  <span className="tag bg-[#00f0ff]/10 text-[#00f0ff]">
                    Ephemeral
                  </span>
                </div>
                <p className="text-[#7a7a8e] leading-relaxed font-body">
                  Short-term context that clears when you&apos;re done. Perfect for temporary context during active work sessions.
                </p>
              </div>

              <div className="clip-sm p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-6 h-6 text-[#00f0ff]" />
                  <h3 className="text-xl font-display text-[#e8e8f0]">Standard Memory</h3>
                  <span className="tag bg-[#00f0ff]/10 text-[#00f0ff]">
                    Long-term
                  </span>
                </div>
                <p className="text-[#7a7a8e] leading-relaxed font-body">
                  Long-term knowledge that can gradually fade if irrelevant or unused. Subject to intelligent decay algorithms that preserve what matters.
                </p>
              </div>

              <div className="clip-sm p-6 bg-[#00f0ff]/5 border border-[#00f0ff]/30">
                <div className="flex items-center gap-3 mb-3">
                  <Infinity className="w-6 h-6 text-[#00f0ff]" />
                  <h3 className="text-xl font-display text-[#e8e8f0]">Forever Memory™</h3>
                  <span className="tag bg-[#00f0ff]/10 text-[#00f0ff] font-semibold">
                    Permanent
                  </span>
                </div>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  Never decayed, never pruned. Always preserved. Items stored as Forever Memory™ skip all decay algorithms and remain accessible indefinitely.
                </p>
                <div className="flex items-start gap-2 p-3 clip-sm bg-[#00f0ff]/5 border border-[#00f0ff]/20">
                  <Shield className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#7a7a8e] font-body">
                    <strong className="text-[#00f0ff]">Protected:</strong> Forever Memory™ items are excluded from all retention maintenance, decay calculations, and pruning operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Uses Forever Memory */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="section-label mb-6">WHAT USES FOREVER MEMORY™</p>
            <p className="text-[#7a7a8e] leading-relaxed mb-6 font-body">
              These types of content are automatically stored as Forever Memory™:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <FileImage className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display text-[#e8e8f0]">Multimodal Items</h3>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Images, audio files, and other media uploads are stored as Forever Memory™ so you can always reference them.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display text-[#e8e8f0]">Forged Patterns</h3>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Patterns you forge are Forever Memory™—they represent proven solutions you want to keep.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display text-[#e8e8f0]">Core Semantic Knowledge</h3>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Key insights and important facts are preserved as Forever Memory™ for long-term reference.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="font-display text-[#e8e8f0]">User Preferences</h3>
                </div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Your settings and preferences are Forever Memory™ so your AI always knows how you work.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="section-label mb-6">HOW FOREVER MEMORY™ WORKS</p>
            <div className="space-y-4">
              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display text-[#e8e8f0] mb-2">1. Automatic Assignment</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  When you upload files, forge patterns, or save important insights, ekkOS automatically assigns them Forever Memory™ retention.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display text-[#e8e8f0] mb-2">2. Decay Exception</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Items with <code className="text-[#00f0ff] bg-[#0a0a0f] px-1.5 py-0.5 font-mono">retention_policy='forever'</code> skip all decay algorithms. The system explicitly checks and returns a decay score of 1.0 (no decay) for Forever Memory™ items.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display text-[#e8e8f0] mb-2">3. Always Retrievable</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Forever Memory™ items are always included in search results and never pruned, even if they haven&apos;t been accessed in a long time.
                </p>
              </div>

              <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display text-[#e8e8f0] mb-2">4. Manual Upgrade</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  You can upgrade any memory item to Forever Memory™ if you want to ensure it&apos;s never forgotten.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="section-label mb-6">MEMORY RETENTION COMPARISON</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#1a1a2e]">
                    <th className="pb-3 pr-6 text-[#e8e8f0] font-display">Retention Type</th>
                    <th className="pb-3 pr-6 text-[#e8e8f0] font-display">Duration</th>
                    <th className="pb-3 pr-6 text-[#e8e8f0] font-display">Decay</th>
                    <th className="pb-3 text-[#e8e8f0] font-display">Use Case</th>
                  </tr>
                </thead>
                <tbody className="text-[#7a7a8e] font-body">
                  <tr className="border-b border-[#0d0d14]">
                    <td className="py-3 pr-6">
                      <span className="tag bg-[#00f0ff]/10 text-[#00f0ff]">Session</span>
                    </td>
                    <td className="py-3 pr-6 font-mono">Until session ends</td>
                    <td className="py-3 pr-6 font-mono">Immediate</td>
                    <td className="py-3">Temporary context</td>
                  </tr>
                  <tr className="border-b border-[#0d0d14]">
                    <td className="py-3 pr-6">
                      <span className="tag bg-[#00f0ff]/10 text-[#00f0ff]">Standard</span>
                    </td>
                    <td className="py-3 pr-6 font-mono">30+ days</td>
                    <td className="py-3 pr-6 font-mono">Gradual (if unused)</td>
                    <td className="py-3">General knowledge</td>
                  </tr>
                  <tr className="border-b border-[#0d0d14]">
                    <td className="py-3 pr-6">
                      <span className="tag bg-[#00f0ff]/10 text-[#00f0ff] font-semibold">Forever™</span>
                    </td>
                    <td className="py-3 pr-6 font-mono">Permanent</td>
                    <td className="py-3 pr-6 font-mono">Never</td>
                    <td className="py-3">Files, patterns, key insights</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8 text-center">
            <h2 className="text-2xl font-display text-[#e8e8f0] mb-4">Ready to Experience Forever Memory™?</h2>
            <p className="text-[#7a7a8e] mb-6 font-body">
              Start using ekkOS and see how Forever Memory™ preserves what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://platform.ekkos.dev/signup"
                className="btn-primary"
              >
                Get Started Free
              </Link>
              <Link
                href="/docs/memory/retention"
                className="btn-secondary"
              >
                Technical Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
          <div className="flex items-center justify-center gap-6 text-sm">
            <Link href="/features" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              All Features
            </Link>
            <span className="text-[#1a1a2e]">•</span>
            <Link href="/docs" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              Documentation
            </Link>
            <span className="text-[#1a1a2e]">•</span>
            <Link href="/pricing" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
