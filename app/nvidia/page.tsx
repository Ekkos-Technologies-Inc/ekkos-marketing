import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, Globe, Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NVIDIA Inception Program | ekkOS',
  description:
    'ekkOS Technologies is a proud member of the NVIDIA Inception program, accelerating AI memory infrastructure development.',
};

const benefits = [
  {
    icon: Cpu,
    title: 'GPU-Accelerated Research',
    description:
      'Access to NVIDIA\'s ecosystem for advancing AI memory embedding, vector search, and real-time pattern matching at scale.',
  },
  {
    icon: Globe,
    title: 'Go-to-Market Support',
    description:
      'Expanded reach through NVIDIA\'s partner ecosystem and market development programs for enterprise AI infrastructure.',
  },
  {
    icon: Lightbulb,
    title: 'Technical Expertise',
    description:
      'Deep technical resources for optimizing persistent memory infrastructure on NVIDIA platforms and accelerated compute.',
  },
];

export default function NvidiaPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 clip-sm bg-[#76b900]/10 border border-[#76b900]/30 px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#76b900] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-[#76b900]">
              Partnership // Active
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display tracking-tight mb-6">
            <span className="text-[#00f0ff]">ekkOS</span>
            <span className="text-[#7a7a8e]">_</span>
            <span className="text-[#4a4a5e] mx-2 sm:mx-4">×</span>
            <span className="text-[#76b900]">NVIDIA Inception</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#7a7a8e] font-body max-w-2xl mx-auto">
            Accelerating persistent memory infrastructure for AI coding agents.
          </p>
        </div>
      </section>

      {/* Logo lockup */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="clip-lg bg-[#111118] border border-[#1a1a2e] p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
              {/* ekkOS mark */}
              <div className="clip-md border border-[#00f0ff]/30 bg-[#0d0d14] px-8 py-6">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">
                  <span className="text-[#00f0ff]">ekkOS</span>
                  <span className="text-[#00f0ff]/60">_</span>
                </span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-20 bg-gradient-to-b from-transparent via-[#2a2a3e] to-transparent" />
              <div className="sm:hidden h-px w-20 bg-gradient-to-r from-transparent via-[#2a2a3e] to-transparent" />

              {/* NVIDIA Inception badge */}
              <div className="flex items-center">
                <img
                  src="/nvidia-inception-badge.svg"
                  alt="NVIDIA Inception Program"
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Partnership */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <GlassCard variant="elevated" className="p-8 sm:p-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#76b900]/40 to-transparent" />
            <h2 className="text-2xl sm:text-3xl font-display text-[#e8e8f0] mb-6">
              About the Partnership
            </h2>
            <p className="text-[#7a7a8e] font-body leading-relaxed mb-6">
              EKKOS Technologies Inc. is a member of the{' '}
              <span className="text-[#76b900] font-semibold">NVIDIA Inception</span> program,
              a platform designed to nurture startups revolutionizing industries with advances in
              AI and data science. Through Inception, ekkOS accelerates the development of
              persistent memory infrastructure for AI coding agents — leveraging NVIDIA&apos;s
              ecosystem of tools, expertise, and go-to-market support.
            </p>
            <div className="flex items-center gap-3">
              <span className="clip-sm bg-[#76b900]/10 border border-[#76b900]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[2px] text-[#76b900]">
                Member since 2025
              </span>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display text-[#e8e8f0] mb-3">
              What This Means
            </h2>
            <p className="text-[#7a7a8e] font-body">
              How NVIDIA Inception accelerates ekkOS development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <GlassCard key={b.title} variant="default" hover="border" className="p-6">
                <div className="w-12 h-12 clip-md bg-[#76b900]/10 flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#76b900]" />
                </div>
                <h3 className="text-lg font-display text-[#e8e8f0] mb-2">{b.title}</h3>
                <p className="text-sm text-[#7a7a8e] font-body leading-relaxed">
                  {b.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors"
          >
            &larr; Back to ekkOS
          </Link>
          <p className="text-[10px] text-[#4a4a5e] font-mono leading-relaxed max-w-lg mx-auto">
            NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered
            trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </section>
    </div>
  );
}
