'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'December 1, 2025';

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 clip-md bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-6">
            <FileText className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#e8e8f0] mb-4">Terms of Service</h1>
          <p className="text-lg text-[#7a7a8e]">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <GlassCard variant="elevated" className="max-w-4xl mx-auto p-8 sm:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                By accessing and using ekkOS&trade; (&quot;the Service&quot;) provided by ekkOS Technologies Inc., you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">2. Description of Service</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                ekkOS provides an 11-layer memory system for AI agents, enabling persistent memory, pattern learning,
                and hallucination detection through the Model Context Protocol (MCP).
              </p>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                The Service includes but is not limited to: memory storage, pattern forging, the ekkOS_Conflict tool
                (Hallucination Firewall&trade;), and integration with various IDEs and AI platforms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">3. Account Registration</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                To use certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and API keys</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">4. Acceptable Use</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe upon the rights of others</li>
                <li>Transmit any malicious code, viruses, or harmful materials</li>
                <li>Attempt to gain unauthorized access to the Service or its systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use the Service to spam, harass, or abuse others</li>
                <li>Scrape, mine, or extract data without permission</li>
                <li>Share your API keys with unauthorized parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">5. Data and Privacy</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                Your use of the Service is also governed by our{' '}
                <Link href="/privacy" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                  Privacy Policy
                </Link>
                . By using the Service, you consent to the collection and use of information as described in the Privacy Policy.
              </p>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                You retain all rights to your data, patterns, and memory stored in ekkOS. We do not claim ownership
                of your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">6. Pricing and Payment</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                ekkOS offers both free and paid tiers. Paid subscriptions are billed in advance on a monthly or annual basis.
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>All fees are non-refundable except where required by law</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>Failure to pay may result in service suspension</li>
                <li>Taxes are your responsibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">7. Service Level and Availability</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the Service.
                We reserve the right to modify, suspend, or discontinue the Service with notice when possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">8. Intellectual Property</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                The Service, including but not limited to code, design, trademarks (ekkOS&trade;, Hallucination Firewall&trade;,
                ekkOS_Forever_Memory&trade;), and content, is protected by intellectual property laws.
              </p>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                You may not copy, modify, distribute, sell, or reverse engineer any part of the Service without
                our explicit written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">9. Termination</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Service immediately, without notice or
                liability, for any reason, including breach of these Terms.
              </p>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                Upon termination, your right to use the Service will immediately cease. You may delete your account
                at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">10. Disclaimer of Warranties</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">11. Limitation of Liability</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                IN NO EVENT SHALL EKKOS, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">12. Changes to Terms</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of material changes via
                email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">13. Governing Law</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">14. Contact</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@ekkos.dev" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                  legal@ekkos.dev
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#4a4a5e]">&bull;</span>
              <Link href="/support" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors">
                Support
              </Link>
              <span className="text-[#4a4a5e]">&bull;</span>
              <Link href="/docs" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors">
                Documentation
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
