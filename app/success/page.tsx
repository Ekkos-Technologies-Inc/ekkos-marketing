'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 clip-md bg-[#00ff88]/10 border-2 border-[#00ff88]">
          <Check className="w-10 h-10 text-[#00ff88]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-display text-[#e8e8f0] mb-4">
          Welcome to ekkOS Pro!
        </h1>

        <p className="text-xl text-[#7a7a8e] mb-8 max-w-lg mx-auto font-body">
          Your subscription is now active. Check your email to set your password and access your dashboard.
        </p>

        {sessionId && (
          <p className="text-sm text-[#4a4a5e] mb-8 font-mono">
            Session: {sessionId}
          </p>
        )}

        {/* Account Setup Notice */}
        <div className="clip-md bg-[#00f0ff]/10 border border-[#00f0ff]/20 p-6 mb-8 text-left">
          <p className="text-[#7a7a8e] font-body">
            We&apos;ve sent a welcome email to the address you used at checkout. Click the link in the email to set your password and access your dashboard.
          </p>
        </div>

        {/* Next Steps */}
        <div className="clip-md bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] p-8 mb-8 text-left">
          <h2 className="text-xl font-display text-[#e8e8f0] mb-4">Next Steps:</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-sm font-mono font-semibold text-[#00f0ff]">
                1
              </div>
              <div>
                <div className="font-display text-[#e8e8f0] mb-1">Set Your Password</div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Check your email and click the link to set your password
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-sm font-mono font-semibold text-[#00f0ff]">
                2
              </div>
              <div>
                <div className="font-display text-[#e8e8f0] mb-1">Install the MCP Server</div>
                <code className="text-sm text-[#7a7a8e] bg-[#0a0a0f] px-2 py-1 font-mono">
                  npx @ekkos/mcp
                </code>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-sm font-mono font-semibold text-[#00f0ff]">
                3
              </div>
              <div>
                <div className="font-display text-[#e8e8f0] mb-1">Generate API Key</div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Visit your dashboard to create your first API key
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 clip-sm bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-sm font-mono font-semibold text-[#00f0ff]">
                4
              </div>
              <div>
                <div className="font-display text-[#e8e8f0] mb-1">Start Forging Patterns</div>
                <p className="text-sm text-[#7a7a8e] font-body">
                  Use <code className="bg-[#0a0a0f] px-1 font-mono">ekkOS_Forge</code> to capture your first solution
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://platform.ekkos.dev/dashboard"
            className="btn-primary"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="https://docs.ekkos.dev"
            className="btn-secondary"
          >
            Read the Docs
          </Link>
        </div>

        {/* Support */}
        <p className="text-sm text-[#4a4a5e] mt-8 font-body">
          Need help? Email us at{' '}
          <a href="mailto:support@ekkos.dev" className="text-[#00f0ff] hover:underline">
            support@ekkos.dev
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#7a7a8e] font-mono">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
