'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowLeft, CheckCircle2, Code, Database, Info, Lock, Shield, X } from 'lucide-react';
import Link from 'next/link';

export default function MemoryPrivacyDocsPage() {
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
            <Shield className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#e8e8f0] mb-4">
            Memory &amp; Privacy Model
          </h1>
          <p className="text-lg text-[#7a7a8e] font-body max-w-2xl mx-auto">
            Technical documentation for ekkOS memory privacy architecture, RLS enforcement, and pattern visibility controls
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Overview</h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
              ekkOS implements a <strong className="text-[#e8e8f0]">privacy-by-architecture</strong> model where data isolation is enforced at the database level through Row-Level Security (RLS). This ensures that:
            </p>
            <ul className="space-y-2 text-[#7a7a8e] font-body ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>All user data is isolated by <code className="text-[#00ff88] font-mono">user_id</code></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>Even service role keys cannot bypass RLS policies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>Pattern sharing is opt-in and anonymized</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                <span>Zero-access backend: company cannot read user memory</span>
              </li>
            </ul>
          </GlassCard>

          {/* RLS Enforcement */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                <Database className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Row-Level Security (RLS) Enforcement</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  All tables in the ekkOS memory system enforce RLS policies that restrict access based on <code className="text-[#00ff88] font-mono">user_id</code>:
                </p>

                <div className="space-y-4">
                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Events Table</h3>
                    <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`CREATE POLICY "Users can only see their own events"
ON events FOR SELECT
USING (auth.uid() = user_id);`}
                    </pre>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Episodes Table</h3>
                    <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`CREATE POLICY "Users can only see their own episodes"
ON learning_episodes FOR SELECT
USING (auth.uid() = user_id);`}
                    </pre>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Patterns Table</h3>
                    <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`CREATE POLICY "Users see their own patterns + collective"
ON patterns FOR SELECT
USING (
  auth.uid() = user_id OR
  (visibility = 'collective' AND never_promote = false)
);`}
                    </pre>
                  </div>
                </div>

                <p className="text-[#7a7a8e] font-body leading-relaxed mt-4">
                  <strong className="text-[#e8e8f0]">Key Point:</strong> These policies are enforced at the database level. Even if application code has bugs, RLS prevents unauthorized access.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Pattern Visibility Flags */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                <Lock className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Pattern Visibility Flags</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  Each pattern has a <code className="text-[#00ff88] font-mono">visibility</code> field that controls who can see it:
                </p>

                <div className="space-y-3">
                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-5 h-5 text-[#00f0ff]" />
                      <code className="text-[#00ff88] font-mono">visibility = &apos;private&apos;</code>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Default. Only the pattern owner can see and use this pattern. Not visible to team or collective.
                    </p>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-[#00f0ff]" />
                      <code className="text-[#00ff88] font-mono">visibility = &apos;team&apos;</code>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Visible to all users in the same organization. Scoped by <code className="text-[#00ff88] font-mono">org_id</code>.
                    </p>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-[#00ff88]" />
                      <code className="text-[#00ff88] font-mono">visibility = &apos;collective&apos;</code>
                    </div>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Shared anonymously with all ekkOS users. Only abstract pattern templates are shared, never raw data.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 clip-sm bg-[#ffb800]/10 border border-[#ffb800]/20">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-[#ffb800] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-display font-semibold text-[#ffb800] mb-1">Important</p>
                      <p className="text-sm text-[#7a7a8e] font-body">
                        Setting <code className="text-[#00ff88] font-mono">visibility = &apos;collective&apos;</code> does NOT share your data. Only the abstract pattern template (problem/solution structure) is shared after anonymization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Never Promote Behavior */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#ff3366]/10 border border-[#ff3366]/20">
                <X className="w-6 h-6 text-[#ff3366]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">never_promote Behavior</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  The <code className="text-[#00ff88] font-mono">never_promote</code> boolean flag prevents a pattern from being considered for collective learning, even if <code className="text-[#00ff88] font-mono">visibility = &apos;collective&apos;</code>.
                </p>

                <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] mb-4">
                  <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">When never_promote = true:</h3>
                  <ul className="space-y-2 text-[#7a7a8e] font-body ml-4">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[#ff3366] mt-0.5 flex-shrink-0" />
                      <span>Pattern is excluded from collective memory queries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[#ff3366] mt-0.5 flex-shrink-0" />
                      <span>Pattern is not considered for pattern evolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-[#ff3366] mt-0.5 flex-shrink-0" />
                      <span>Pattern remains private to owner (or team if visibility allows)</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#7a7a8e] font-body leading-relaxed">
                  This gives users granular control: they can mark patterns as &quot;never share&quot; even if they&apos;re set to collective visibility.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Anonymization Process */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                <Shield className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">How Anonymization Works</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  When a pattern is promoted to collective memory, the system performs the following anonymization steps:
                </p>

                <div className="space-y-3">
                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">1. Data Extraction</h3>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Extract only the abstract problem/solution structure. Remove all:
                    </p>
                    <ul className="text-sm text-[#7a7a8e] font-body ml-4 mt-2 space-y-1">
                      <li>- File paths and names</li>
                      <li>- Project identifiers</li>
                      <li>- User-specific context</li>
                      <li>- Code snippets</li>
                      <li>- Credentials or secrets</li>
                    </ul>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">2. Pattern Template Creation</h3>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Convert the pattern into a generic template:
                    </p>
                    <div className="mt-2 p-3 clip-sm bg-[#0a0a0f] border border-[#1a1a2e]">
                      <p className="text-xs text-[#00ff88] font-mono">
                        Problem: &quot;When [generic condition], apply [generic solution]&quot;
                      </p>
                      <p className="text-xs text-[#00ff88] font-mono mt-1">
                        Solution: &quot;[Abstract strategy without specific data]&quot;
                      </p>
                    </div>
                  </div>

                  <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                    <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">3. Metadata Removal</h3>
                    <p className="text-sm text-[#7a7a8e] font-body">
                      Remove all metadata that could identify the source:
                    </p>
                    <ul className="text-sm text-[#7a7a8e] font-body ml-4 mt-2 space-y-1">
                      <li>- Original user_id (replaced with null)</li>
                      <li>- Timestamps (normalized to relative time)</li>
                      <li>- Source episode IDs</li>
                      <li>- Project context</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 clip-sm bg-[#00ff88]/10 border border-[#00ff88]/20">
                  <p className="text-sm text-[#7a7a8e] font-body">
                    <strong className="text-[#00ff88]">Result:</strong> The collective memory contains only abstract strategy patterns that cannot be traced back to any individual user or project.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Multi-Tenant Scoping */}
          <GlassCard variant="elevated" className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 clip-sm bg-[#ffb800]/10 border border-[#ffb800]/20">
                <Database className="w-6 h-6 text-[#ffb800]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Multi-Tenant Scoping Rules</h2>
                <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                  For team/org visibility, patterns are scoped by <code className="text-[#00ff88] font-mono">org_id</code>:
                </p>

                <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] mb-4">
                  <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`-- Team visibility RLS policy
CREATE POLICY "Team patterns visible to org members"
ON patterns FOR SELECT
USING (
  visibility = 'team' AND
  org_id IN (
    SELECT org_id FROM user_orgs
    WHERE user_id = auth.uid()
  )
);`}
                  </pre>
                </div>

                <p className="text-[#7a7a8e] font-body leading-relaxed">
                  This ensures that team patterns are only visible to users who belong to the same organization, maintaining privacy boundaries within enterprise deployments.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* API Reference */}
          <GlassCard variant="elevated" className="p-8">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">API Reference</h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
              When creating or updating patterns via the API, you can set visibility:
            </p>

            <div className="space-y-4">
              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Create Pattern with Visibility</h3>
                <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`POST /api/v1/patterns
{
  "title": "Fix authentication timeout",
  "problem": "...",
  "solution": "...",
  "visibility": "private",  // or "team" or "collective"
  "never_promote": false
}`}
                </pre>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">Update Pattern Visibility</h3>
                <pre className="text-sm text-[#7a7a8e] font-mono overflow-x-auto">
{`PATCH /api/v1/patterns/{id}
{
  "visibility": "collective",
  "never_promote": true  // Opt out of collective learning
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
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">1. Default to Private</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Always create patterns as <code className="text-[#00ff88] font-mono">private</code> by default. Only change visibility when you&apos;re certain the pattern is safe to share.
                </p>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">2. Review Before Sharing</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Before setting <code className="text-[#00ff88] font-mono">visibility = &apos;collective&apos;</code>, ensure the pattern contains no:
                </p>
                <ul className="text-sm text-[#7a7a8e] font-body ml-4 mt-2 space-y-1">
                  <li>- Project-specific names or paths</li>
                  <li>- Credentials or secrets</li>
                  <li>- Personal information</li>
                  <li>- Proprietary code or logic</li>
                </ul>
              </div>

              <div className="p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="font-display font-semibold text-[#e8e8f0] mb-2">3. Use never_promote for Sensitive Patterns</h3>
                <p className="text-sm text-[#7a7a8e] font-body">
                  If a pattern might contain sensitive information, set <code className="text-[#00ff88] font-mono">never_promote = true</code> even if visibility is set to collective. This provides an extra layer of protection.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* CTA */}
          <GlassCard variant="elevated" className="p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Questions?</h2>
            <p className="text-[#7a7a8e] font-body mb-6">
              For more information about privacy and security, see our full privacy policy or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/memory-privacy"
                className="btn-primary px-6 py-3 text-center font-medium"
              >
                User-Facing Privacy Guide
              </Link>
              <Link
                href="/privacy"
                className="btn-secondary px-6 py-3 text-center font-medium"
              >
                Full Privacy Policy
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
