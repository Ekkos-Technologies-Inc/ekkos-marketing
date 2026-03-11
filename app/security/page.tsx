import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security | ekkOS',
  description: 'Enterprise-grade security for AI memory. SOC 2 Type II in progress, end-to-end encryption, and built for teams that need peace of mind.',
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="px-6 py-16 mx-auto max-w-7xl sm:py-24">
        <div className="text-center">
          <div className="tag inline-flex items-center gap-2 mb-6">
            <span className="inline-block w-2 h-2 bg-[#00ff88]" />
            Security Verification: 20/20 Passed
          </div>

          <h1 className="text-4xl font-display tracking-tight sm:text-6xl text-[#e8e8f0]">
            Enterprise-Grade Security
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#7a7a8e] max-w-2xl mx-auto font-body">
            Your AI memory is protected by industry-leading security controls.
            Built for teams that need reliability, compliance, and peace of mind.
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://platform.ekkos.dev/signup"
              className="btn-primary"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="mailto:enterprise@ekkos.dev?subject=Enterprise%20Security%20Inquiry"
              className="btn-secondary"
            >
              Talk to Enterprise Sales
            </a>
          </div>

          {/* Secondary Links */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <Link
              href="/docs/compliance/SOC2_CONTROLS"
              className="text-sm font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors"
            >
              View SOC 2 Controls &rarr;
            </Link>
            <Link
              href="/docs/compliance/SOC2_CONTROLS"
              className="text-sm font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors"
            >
              Security Policy &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-12 mx-auto max-w-7xl border-y border-[#1a1a2e]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="text-center">
            <div className="text-3xl font-display text-[#00ff88]">20/20</div>
            <div className="mt-1 text-sm text-[#7a7a8e] font-mono">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-[#e8e8f0]">SOC 2</div>
            <div className="mt-1 text-sm text-[#7a7a8e] font-mono">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-[#e8e8f0]">AES-256</div>
            <div className="mt-1 text-sm text-[#7a7a8e] font-mono">Encryption</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-[#e8e8f0]">99.9%</div>
            <div className="mt-1 text-sm text-[#7a7a8e] font-mono">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display text-[#e8e8f0]">GDPR</div>
            <div className="mt-1 text-sm text-[#7a7a8e] font-mono">Compliant</div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="text-3xl font-display text-center text-[#e8e8f0] mb-12">
          Security at Every Layer
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#00f0ff]/10">
                <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">End-to-End Encryption</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              <strong className="text-[#e8e8f0]">TLS 1.3</strong> in transit, <strong className="text-[#e8e8f0]">AES-256</strong> at rest.
              Your memories are encrypted before they leave your device.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#00ff88]/10">
                <svg className="w-6 h-6 text-[#00ff88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">Role-Based Access Control</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              Fine-grained permissions. Team admins control who sees what.
              Row Level Security enforced at the database level.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#00f0ff]/10">
                <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">Audit Logging</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              Every action tracked. Full audit trail for compliance.
              Know exactly who accessed what and when.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#ffb800]/10">
                <svg className="w-6 h-6 text-[#ffb800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">Data Isolation</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              Strict multi-tenant separation. Your memories are never visible
              to other users. Workspace isolation for teams.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#ff3366]/10">
                <svg className="w-6 h-6 text-[#ff3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">Backup & Recovery</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              Automated daily backups. Point-in-time recovery.
              90-day backup retention. RTO: 4 hours, RPO: 24 hours.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 clip-sm bg-[#00f0ff]/10">
                <svg className="w-6 h-6 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-display text-[#e8e8f0]">Incident Response</h3>
            </div>
            <p className="text-[#7a7a8e] font-body">
              24/7 monitoring. Automated alerts. Clear escalation procedures.
              Critical incidents resolved within 15 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display text-center text-[#e8e8f0] mb-12">
            Compliance & Certifications
          </h2>

          <div className="space-y-6">
            {/* SOC 2 */}
            <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 clip-sm bg-[#00ff88]/10 flex items-center justify-center">
                  <span className="text-2xl">&#x1f512;</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display text-[#e8e8f0] mb-2">
                    SOC 2 Type II (In Progress)
                  </h3>
                  <p className="text-[#7a7a8e] mb-4 font-body">
                    We've implemented SOC 2 Type II controls and are currently undergoing our external audit.
                    Certification expected Q2 2026.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <Link href="/docs/compliance/SOC2_CONTROLS" className="font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                      View SOC 2 Controls &rarr;
                    </Link>
                    <a href="mailto:security@ekkos.dev?subject=SOC%202%20Report%20Request" className="font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                      Request Report &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* GDPR */}
            <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 clip-sm bg-[#00f0ff]/10 flex items-center justify-center">
                  <span className="text-2xl">&#x1f1ea;&#x1f1fa;</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display text-[#e8e8f0] mb-2">
                    GDPR Compliant
                  </h3>
                  <p className="text-[#7a7a8e] mb-4 font-body">
                    Full compliance with the General Data Protection Regulation. Data subject rights,
                    data minimization, and privacy-by-architecture.
                  </p>
                  <Link href="/privacy" className="text-sm font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                    Privacy Policy &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* CCPA */}
            <div className="p-6 clip-md border border-[#1a1a2e] bg-[#111118]/60 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 clip-sm bg-[#00f0ff]/10 flex items-center justify-center">
                  <span className="text-2xl">&#x1f1fa;&#x1f1f8;</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display text-[#e8e8f0] mb-2">
                    CCPA Compliant
                  </h3>
                  <p className="text-[#7a7a8e] mb-4 font-body">
                    California Consumer Privacy Act compliance. Right to know, delete, and opt-out.
                  </p>
                  <a href="mailto:privacy@ekkos.dev?subject=Data%20Export%20Request" className="text-sm font-mono text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                    Request Data Export &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="text-3xl font-display text-center text-[#e8e8f0] mb-12">
          Trusted Infrastructure
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 clip-sm bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#7a7a8e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Supabase</h3>
            <p className="text-sm text-[#7a7a8e] font-body">SOC 2 Type II certified database & auth</p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 clip-sm bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#7a7a8e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
              </svg>
            </div>
            <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Vercel</h3>
            <p className="text-sm text-[#7a7a8e] font-body">ISO 27001, SOC 2 Type II hosting</p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 clip-sm bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#7a7a8e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Railway</h3>
            <p className="text-sm text-[#7a7a8e] font-body">ISO 27001 certified infrastructure</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <div className="clip-lg bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] p-8 md:p-12 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
          <h2 className="text-3xl font-display text-[#e8e8f0] mb-4">
            Questions About Security?
          </h2>
          <p className="text-xl text-[#7a7a8e] mb-8 max-w-2xl mx-auto font-body">
            Our security team is here to help. Whether you need our SOC 2 report,
            a completed security questionnaire, or a custom DPA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:security@ekkos.dev"
              className="btn-primary"
            >
              Contact Security Team
            </a>
            <a
              href="mailto:security@ekkos.dev?subject=Security%20Policy%20Request"
              className="btn-secondary"
            >
              Request Security Policy
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
