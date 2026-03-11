import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SOC 2 Controls | ekkOS',
  description: 'SOC 2 Type II security controls implemented by ekkOS for enterprise-grade security and compliance.',
};

export default function SOC2ControlsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/security"
            className="inline-flex items-center gap-2 text-sm text-[#00f0ff] hover:text-[#00f0ff]/80 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Security
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-mono clip-sm bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">
            <span className="inline-block w-2 h-2 bg-[#00ff88] animate-pulse"></span>
            SOC 2 Type II (In Progress)
          </div>

          <h1 className="text-4xl font-display font-bold tracking-tight text-[#e8e8f0] mb-4">
            SOC 2 Type II Controls
          </h1>

          <p className="text-lg text-[#7a7a8e] font-body">
            ekkOS has implemented comprehensive SOC 2 Type II security controls.
            We are currently undergoing our external audit with certification expected Q2 2026.
          </p>
        </div>

        {/* Controls Overview */}
        <div className="space-y-8">
          {/* CC1 - Control Environment */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC1 - Control Environment
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS maintains a control environment that demonstrates a commitment to integrity and ethical values.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Clear security roles and responsibilities</li>
              <li>Security team: CEO (owner), CTO (technical lead)</li>
              <li>Incident response plan documented</li>
              <li>Security Policy, Privacy Policy, and Code of Conduct established</li>
            </ul>
          </section>

          {/* CC2 - Communication and Information */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC2 - Communication and Information
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS obtains and communicates relevant information to enable internal and external parties to carry out their responsibilities.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>All team members trained on security best practices</li>
              <li>Security documentation accessible to authorized personnel</li>
              <li>Incident reporting procedures established</li>
            </ul>
          </section>

          {/* CC3 - Risk Assessment */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC3 - Risk Assessment
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS performs risk assessments to identify and analyze risks to achievement of objectives.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Quarterly security reviews</li>
              <li>Threat modeling for new features</li>
              <li>Vulnerability scanning (Dependabot, npm audit)</li>
              <li>Third-party risk assessment (Supabase, Vercel, OpenAI)</li>
            </ul>
          </section>

          {/* CC4 - Monitoring Activities */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC4 - Monitoring Activities
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS selects, develops, and performs ongoing and separate evaluations to determine whether controls are present and functioning.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Mission Control dashboard (pm2.ekkos.dev) for real-time monitoring</li>
              <li>Health checks every 30 seconds</li>
              <li>Error tracking (Sentry integration planned)</li>
              <li>Audit logs for all admin actions</li>
            </ul>
          </section>

          {/* CC5 - Control Activities */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC5 - Control Activities
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS selects and develops control activities that contribute to mitigation of risks to achievement of objectives.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Multi-factor authentication (MFA) supported via Supabase Auth</li>
              <li>Role-based access control (RBAC) - admin, user roles</li>
              <li>API key authentication with hashing (SHA-256)</li>
              <li>Row Level Security (RLS) enforced at database level</li>
            </ul>
          </section>

          {/* CC6 - Logical and Physical Access */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC6 - Logical and Physical Access Controls
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS implements logical and physical access controls to protect against unauthorized access.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Production access limited to authorized personnel (CEO, CTO)</li>
              <li>SSH keys required for server access (no passwords)</li>
              <li>Database access via Supabase dashboard (MFA required)</li>
              <li>Secrets stored in environment variables (Vercel/Railway)</li>
              <li>Secure infrastructure via SOC 2 Type II certified providers (Supabase, Vercel)</li>
            </ul>
          </section>

          {/* CC7 - System Operations */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC7 - System Operations
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS implements system operations controls to ensure systems operate as intended.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>Automated backups (Supabase daily backups)</li>
              <li>Disaster recovery plan documented</li>
              <li>Deployment pipelines with CI/CD (Vercel, Railway)</li>
              <li>99.9% uptime SLA with multi-region deployment</li>
              <li>Health checks and monitoring via Mission Control dashboard</li>
            </ul>
          </section>

          {/* CC8 - Change Management */}
          <section className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
            <h2 className="text-2xl font-display font-semibold text-[#e8e8f0] mb-4">
              CC8 - Change Management
            </h2>
            <p className="text-[#7a7a8e] font-body mb-4">
              ekkOS implements change management controls to ensure changes are authorized, tested, and properly deployed.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#7a7a8e] font-body ml-4">
              <li>All code changes via Pull Requests</li>
              <li>Required reviews before merge</li>
              <li>Automated testing (unit + integration)</li>
              <li>Staging environment for pre-production testing</li>
              <li>Git flow and PR review process enforced</li>
            </ul>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 clip-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20">
          <h3 className="text-xl font-display font-semibold text-[#e8e8f0] mb-4">
            Request SOC 2 Report
          </h3>
          <p className="text-[#7a7a8e] font-body mb-6">
            Enterprise customers can request a copy of our SOC 2 Type II report upon completion of our audit (expected Q2 2026).
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:security@ekkos.dev?subject=SOC%202%20Report%20Request"
              className="btn-primary inline-flex items-center justify-center px-6 py-3 font-semibold"
            >
              Request Report
            </a>
            <Link
              href="/security"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3 font-semibold"
            >
              Back to Security
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
