'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#e8e8f0] mb-4">Privacy Policy</h1>
          <p className="text-lg text-[#7a7a8e]">Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <GlassCard variant="elevated" className="max-w-4xl mx-auto p-8 sm:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Introduction</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                ekkOS Technologies Inc. (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Information We Collect</h2>

              <h3 className="text-xl font-display font-semibold text-[#e8e8f0] mb-3 mt-6">Account Information</h3>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">When you create an account, we collect:</p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>Email address</li>
                <li>Name (optional)</li>
                <li>Password (encrypted)</li>
                <li>Account creation date</li>
              </ul>

              <h3 className="text-xl font-display font-semibold text-[#e8e8f0] mb-3 mt-6">Memory and Pattern Data</h3>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                To provide our core service, we store:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>Conversation data you choose to save (via the capture mechanism)</li>
                <li>Patterns you forge (using ekkOS_Forge)</li>
                <li>Memory embeddings for semantic search</li>
                <li>Pattern application history and success metrics</li>
                <li>ekkOS_Conflict validation results</li>
              </ul>

              <h3 className="text-xl font-display font-semibold text-[#e8e8f0] mb-3 mt-6">Usage Information</h3>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">We automatically collect:</p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>API usage metrics (number of calls, endpoints used)</li>
                <li>Service performance data</li>
                <li>Error logs and crash reports</li>
                <li>IP addresses for security purposes</li>
                <li>Browser type and device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">How We Use Your Information</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>Provide and maintain the ekkOS memory service</li>
                <li>Process your memory queries and pattern searches</li>
                <li>Improve pattern learning algorithms</li>
                <li>Send service-related notifications</li>
                <li>Respond to your support requests</li>
                <li>Monitor and analyze usage trends</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Data Storage and Security</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>All data is encrypted in transit using TLS 1.3</li>
                <li>Passwords are hashed using bcrypt with high cost factors</li>
                <li>API keys are hashed and never stored in plain text</li>
                <li>Database access is restricted and logged</li>
                <li>Regular security audits and penetration testing</li>
                <li>Automated backup systems with encryption</li>
              </ul>
              <p className="text-[#7a7a8e] font-body leading-relaxed mt-4">
                While we strive to protect your information, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Data Retention</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                We retain your data according to the following policies:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li><strong className="text-[#e8e8f0]">Developer Tier (Free):</strong> 7-day retention for episodic memory, permanent for forged patterns</li>
                <li><strong className="text-[#e8e8f0]">Pro Tier:</strong> ekkOS_Forever_Memory™ - unlimited retention</li>
                <li><strong className="text-[#e8e8f0]">Deleted Accounts:</strong> Data deleted within 30 days, except where required by law</li>
                <li><strong className="text-[#e8e8f0]">Logs:</strong> Retained for 90 days for security and debugging purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Data Sharing and Disclosure</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                We do NOT sell your personal information. We may share data only in these circumstances:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li><strong className="text-[#e8e8f0]">Service Providers:</strong> Third-party services that help us operate (e.g., hosting, analytics)</li>
                <li><strong className="text-[#e8e8f0]">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-[#e8e8f0]">Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong className="text-[#e8e8f0]">Consent:</strong> When you explicitly agree to sharing</li>
              </ul>
              <p className="text-[#7a7a8e] font-body leading-relaxed mt-4">
                All third-party service providers are contractually obligated to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Collective Memory and Privacy</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                Our Collective Memory feature (Layer 6) allows anonymous pattern sharing:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li>All personally identifiable information is removed</li>
                <li>Patterns are aggregated and anonymized</li>
                <li>You can opt out of collective learning in your settings</li>
                <li>Contributions to collective memory are voluntary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Your Rights and Choices</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li><strong className="text-[#e8e8f0]">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-[#e8e8f0]">Rectification:</strong> Correct inaccurate information</li>
                <li><strong className="text-[#e8e8f0]">Deletion:</strong> Request deletion of your account and data</li>
                <li><strong className="text-[#e8e8f0]">Portability:</strong> Export your data in machine-readable format</li>
                <li><strong className="text-[#e8e8f0]">Objection:</strong> Opt out of certain data processing</li>
                <li><strong className="text-[#e8e8f0]">Withdraw Consent:</strong> Revoke previously granted permissions</li>
              </ul>
              <p className="text-[#7a7a8e] font-body leading-relaxed mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@ekkos.dev" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                  privacy@ekkos.dev
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Cookies and Tracking</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed mb-4">
                We use minimal cookies for essential functionality:
              </p>
              <ul className="list-disc list-inside text-[#7a7a8e] font-body space-y-2 ml-4">
                <li><strong className="text-[#e8e8f0]">Authentication:</strong> Session cookies to keep you logged in</li>
                <li><strong className="text-[#e8e8f0]">Preferences:</strong> Local storage for your settings</li>
                <li><strong className="text-[#e8e8f0]">Analytics:</strong> Anonymous usage statistics (opt-out available)</li>
              </ul>
              <p className="text-[#7a7a8e] font-body leading-relaxed mt-4">
                We do not use third-party advertising cookies or tracking pixels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Children&apos;s Privacy</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                Our Service is not intended for children under 13. We do not knowingly collect information from
                children. If you believe a child has provided us with personal information, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">International Data Transfers</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                Your data may be transferred to and stored in countries outside your jurisdiction. We ensure
                appropriate safeguards are in place, including standard contractual clauses approved by regulatory
                authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Changes to This Policy</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes via
                email or through the Service. The &quot;Last updated&quot; date at the top reflects the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-[#e8e8f0] mb-4">Contact Us</h2>
              <p className="text-[#7a7a8e] font-body leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-4 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <p className="text-[#7a7a8e] font-body">
                  Email:{' '}
                  <a href="mailto:privacy@ekkos.dev" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                    privacy@ekkos.dev
                  </a>
                </p>
                <p className="text-[#7a7a8e] font-body mt-2">
                  Support:{' '}
                  <Link href="/support" className="text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                    Contact Support
                  </Link>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1a1a2e]">
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/terms" className="text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors">
                Terms of Service
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
