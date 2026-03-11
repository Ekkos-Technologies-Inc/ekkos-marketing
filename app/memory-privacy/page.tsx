'use client';

import { ArrowLeft, CheckCircle2, Eye, Globe, Lock, Shield, Users, X } from 'lucide-react';
import Link from 'next/link';

export default function MemoryPrivacyPage() {
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
            <Shield className="w-8 h-8 text-[#0a0a0f]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#e8e8f0] mb-4">
            How ekkOS Memory Privacy Works
          </h1>
          <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
            Your memory is private by default. You choose what can be shared. Sensitive information is never shared.
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Key Principle */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 clip-sm bg-[#00ff88]/10">
                <Lock className="w-6 h-6 text-[#00ff88]" />
              </div>
              <div>
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  The Core Promise
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed text-lg font-body">
                  <strong className="text-[#e8e8f0]">ekkOS only shares what you intentionally allow</strong> — and only as anonymized strategy patterns, never as code or content. Everything else stays private by architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Private by Default */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10">
                <Lock className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  1. Your memory is private by default
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  Everything ekkOS learns from your work is stored under your account only.
                </p>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  Other users cannot see:
                </p>
                <ul className="space-y-2 text-[#7a7a8e] ml-4 font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Your events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Your episodes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Your patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Your project data</span>
                  </li>
                </ul>
                <p className="text-[#7a7a8e] leading-relaxed mt-4 font-body">
                  All data is protected by row-level security (RLS) that enforces privacy at the database level. Even our team cannot access your private memory.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: You Choose What Can Be Shared */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10">
                <Users className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  2. You choose what can be shared
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  Some discoveries are universal (debug fixes, workflow improvements, common approaches).
                </p>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  You can mark these as:
                </p>
                <div className="space-y-3">
                  <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-[#00f0ff]" />
                      <h3 className="font-display text-[#e8e8f0]">Private</h3>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">Only you can see and use this pattern</p>
                  </div>
                  <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-[#00f0ff]" />
                      <h3 className="font-display text-[#e8e8f0]">Team</h3>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">Only your team/org can see this pattern</p>
                  </div>
                  <div className="clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-[#00ff88]" />
                      <h3 className="font-display text-[#e8e8f0]">Collective</h3>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">Shared anonymously as a general pattern (anonymized)</p>
                  </div>
                </div>
                <p className="text-[#7a7a8e] leading-relaxed mt-4 font-body">
                  <strong className="text-[#e8e8f0]">Nothing leaves your private space unless you intentionally allow it.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Sensitive Information Never Shared */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#ff3366]/10">
                <Shield className="w-6 h-6 text-[#ff3366]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  3. Sensitive information is never shared
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  ekkOS never shares:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {[
                    'Code',
                    'Project names',
                    'Files',
                    'Documents',
                    'Conversations',
                    'Credentials',
                    'Anything traceable to you',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-3 clip-sm bg-[#ff3366]/5 border border-[#ff3366]/20">
                      <X className="w-4 h-4 text-[#ff3366] flex-shrink-0" />
                      <span className="text-sm text-[#7a7a8e] font-body">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#7a7a8e] leading-relaxed font-body">
                  Only the abstract strategy (the "shape" of a solution) can be shared, and only if you've allowed it.
                </p>
                <div className="mt-4 clip-sm p-4 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                  <p className="text-sm text-[#7a7a8e] mb-2 font-body">
                    <strong className="text-[#e8e8f0]">Example of what is NOT shared:</strong>
                  </p>
                  <p className="text-sm text-[#ff3366]/80 font-mono">
                    "Fix auth.js line 43, user model credentials missing."
                  </p>
                  <p className="text-sm text-[#7a7a8e] mt-3 mb-2 font-body">
                    <strong className="text-[#e8e8f0]">Example of what CAN be shared (if you allow):</strong>
                  </p>
                  <p className="text-sm text-[#00ff88]/80 font-mono">
                    "When authentication fails due to missing configuration, validate environment variables and provider settings."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Patterns Evolve Safely */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10">
                <Globe className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  4. Patterns evolve safely
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  When a shared pattern succeeds or fails, ekkOS adjusts its confidence automatically.
                </p>
                <ul className="space-y-2 text-[#7a7a8e] ml-4 mb-4 font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>Low-success patterns fade out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>High-value patterns surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span>The system gets smarter without exposing your data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: You Can Opt Out */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#ffb800]/10">
                <Eye className="w-6 h-6 text-[#ffb800]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display text-[#e8e8f0] mb-3">
                  5. You can opt out at any time
                </h2>
                <p className="text-[#7a7a8e] leading-relaxed mb-4 font-body">
                  Set any pattern to:
                </p>
                <ul className="space-y-2 text-[#7a7a8e] ml-4 mb-4 font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span><strong className="text-[#e8e8f0]">Never share</strong> — Keep it completely private</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span><strong className="text-[#e8e8f0]">Never promote</strong> — Don't consider this for collective learning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                    <span><strong className="text-[#e8e8f0]">Project-only</strong> — Scoped to specific projects</span>
                  </li>
                </ul>
                <p className="text-[#7a7a8e] leading-relaxed mt-4 font-body">
                  <strong className="text-[#e8e8f0]">You are always in control</strong> of what ekkOS learns from your work.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="section-label mb-6">HOW IT WORKS</p>
            <div className="space-y-4">
              <div className="clip-sm p-4 bg-[#00f0ff]/5 border border-[#00f0ff]/20">
                <p className="text-sm font-mono text-[#00f0ff] mb-2">Your Data</p>
                <p className="text-sm text-[#7a7a8e] font-body">Events → Episodes → Patterns → Your Memory</p>
              </div>
              <div className="flex items-center justify-center text-[#4a4a5e]">
                <div className="h-px w-full bg-[#1a1a2e]" />
                <span className="px-4 font-mono text-sm">↓ (optional, anonymized)</span>
                <div className="h-px w-full bg-[#1a1a2e]" />
              </div>
              <div className="clip-sm p-4 bg-[#00ff88]/5 border border-[#00ff88]/20">
                <p className="text-sm font-mono text-[#00ff88] mb-2">Collective Memory</p>
                <p className="text-sm text-[#7a7a8e] font-body">Abstract pattern templates only (no data)</p>
              </div>
            </div>
            <p className="text-sm text-[#7a7a8e] mt-4 font-body">
              <strong className="text-[#e8e8f0]">Your memory is your memory.</strong> Collective memory is pattern shapes only, not data.
            </p>
          </div>

          {/* CTA */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8 text-center">
            <h2 className="text-2xl font-display text-[#e8e8f0] mb-4">Ready to Get Started?</h2>
            <p className="text-[#7a7a8e] mb-6 font-body">
              Your memory is private by default. You control what's shared.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://platform.ekkos.dev/signup"
                className="btn-primary"
              >
                Get Started
              </Link>
              <Link
                href="/docs/memory/privacy"
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
            <Link href="/privacy" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              Privacy Policy
            </Link>
            <span className="text-[#1a1a2e]">•</span>
            <Link href="/terms" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              Terms of Service
            </Link>
            <span className="text-[#1a1a2e]">•</span>
            <Link href="/support" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors font-mono">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
