import Link from 'next/link';
import { Brain, Sparkles, Zap, Search, Lock, ArrowRight } from 'lucide-react';
import { NvidiaPartnershipCard } from '@/components/marketing/NvidiaPartnershipCard';

export const metadata = {
  title: 'About - EKKOS',
  description: 'The story behind EKKOS. Memory that echoes back.',
};

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <h1 className="text-4xl md:text-6xl font-display mb-8 text-[#e8e8f0]">
          Why EKKOS?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none font-body">
          <p className="text-xl text-[#7a7a8e] leading-relaxed">
            It started with a simple frustration.
          </p>

          <p className="text-[#7a7a8e] leading-relaxed">
            My AI kept forgetting everything. Every day, same questions.
            Same mistakes. No learning. No memory.
          </p>

          <p className="text-[#7a7a8e] leading-relaxed">
            I'd explain my architecture on Monday. Explain it again on Tuesday.
            And again on Wednesday. The AI was powerful, but it had no memory.
            Every session started from zero.
          </p>

          <p className="text-[#7a7a8e] leading-relaxed">
            So I built a memory system.
          </p>

          <p className="text-[#7a7a8e] leading-relaxed">
            Called it Echo—because that's what memory does.
            It echoes back when you need it.
          </p>

          <p className="text-[#e8e8f0]/70 leading-relaxed font-medium">
            Echo became EKKOS. A unique brand. A platform. A mission.
          </p>

          <p className="text-[#7a7a8e] leading-relaxed">
            Now "ekko" isn't just a name. It's what your AI does when it remembers.
          </p>
        </div>
      </section>

      {/* The Name */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="p-12 clip-lg bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
          <h2 className="text-3xl font-display mb-8 text-center text-[#e8e8f0]">The Name</h2>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-6xl font-display mb-6 text-[#00f0ff]">
              EKKOS = Echoes
            </p>

            <p className="text-xl text-[#7a7a8e] mb-6 font-body">
              When you ask your AI a question, it searches the memory substrate.
            </p>

            <p className="text-[#7a7a8e] font-body">
              Patterns, learnings, experiences—they all echo back.
            </p>

            <div className="mt-8 p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] text-left">
              <p className="text-[#7a7a8e] font-mono text-sm">
                <span className="text-[#00f0ff]">&rarr;</span> ekkOS_Search(&quot;auth race condition&quot;)
              </p>
              <p className="text-[#4a4a5e] font-mono text-sm mt-2">
                <span className="text-[#00ff88]">&larr;</span> Found: Solution from 3 months ago...
              </p>
            </div>

            <p className="text-[#4a4a5e] mt-8 text-sm font-mono">
              Your AI remembers. Your solutions echo back.
            </p>
          </div>
        </div>
      </section>

      {/* The Tools */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-display mb-4 text-center text-[#e8e8f0]">Core Memory Tools</h2>
        <p className="text-[#7a7a8e] text-center mb-12 max-w-2xl mx-auto font-body">
          Each tool name reflects what it does. Search, forge, validate, recall, and track.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              icon: Search,
              name: 'ekkOS_Search',
              meaning: 'Your knowledge echoes back',
            },
            {
              icon: Sparkles,
              name: 'ekkOS_Forge',
              meaning: 'Learning solidifies permanently',
            },
            {
              icon: Zap,
              name: 'ekkOS_Directive',
              meaning: 'Your rules, enforced automatically',
            },
            {
              icon: Brain,
              name: 'ekkOS_Recall',
              meaning: 'Remember what you discussed',
            },
            {
              icon: Lock,
              name: 'ekkOS_Conflict',
              meaning: 'Validate before executing',
            },
          ].map((tool, i) => (
            <div key={i} className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] text-center">
              <div className="w-12 h-12 mx-auto mb-4 clip-sm bg-[#00f0ff]/10 flex items-center justify-center">
                <tool.icon className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div className="font-mono font-semibold mb-2 text-[#e8e8f0]">{tool.name}</div>
              <p className="text-xs text-[#4a4a5e] font-body">{tool.meaning}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#4a4a5e] mt-8 text-sm font-mono">
          The product is the memory. When your AI needs to remember, it searches.
        </p>
      </section>

      {/* The Vision */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-display mb-8 text-[#e8e8f0]">The Vision</h2>

        <div className="space-y-6 text-[#7a7a8e] leading-relaxed font-body">
          <p>
            We're building the <span className="text-[#e8e8f0] font-medium">memory substrate for AI</span>.
          </p>

          <p>
            Starting with the tools developers use every day.
            Cursor. VS Code. Claude Code. Windsurf.
          </p>

          <p>
            Your AI should remember. Learn. Improve.
            Not start from zero every session.
          </p>

          <p>
            We believe AI assistants should compound their knowledge over time.
            The more you work with them, the better they should understand
            your patterns, your preferences, your architecture.
          </p>

          <p>
            That's the future we're building.
          </p>

          <p className="text-2xl font-display text-[#e8e8f0] pt-4">
            That's EKKOS.
          </p>

          <p className="text-xl text-[#00f0ff] font-display">
            Memory that echoes back.
          </p>
        </div>
      </section>

      {/* Built For */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="p-12 clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
          <h2 className="text-3xl font-display mb-8 text-center text-[#e8e8f0]">Built for operators who ship.</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-display mb-3 text-lg text-[#e8e8f0]">For the flow-state operator</h3>
              <p className="text-[#7a7a8e] text-sm font-body">
                You're in the zone. Ideas flowing. Code flying.
                Your AI should keep up, not slow you down with repeated context.
              </p>
            </div>

            <div>
              <h3 className="font-display mb-3 text-lg text-[#e8e8f0]">For the systems architect</h3>
              <p className="text-[#7a7a8e] text-sm font-body">
                You've made decisions for good reasons.
                Your AI should respect them, remember them, enforce them.
              </p>
            </div>

            <div>
              <h3 className="font-display mb-3 text-lg text-[#e8e8f0]">For the solo operator</h3>
              <p className="text-[#7a7a8e] text-sm font-body">
                You wear all the hats. Your patterns span frontend, backend, infra.
                Your AI should know all of them.
              </p>
            </div>

            <div>
              <h3 className="font-display mb-3 text-lg text-[#e8e8f0]">For the scaling fleet</h3>
              <p className="text-[#7a7a8e] text-sm font-body">
                Institutional knowledge shouldn't live in one person's head.
                Make it available to every AI interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NVIDIA Inception Partnership */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-display mb-4 text-center text-[#e8e8f0]">Partnerships</h2>
        <p className="text-[#7a7a8e] text-center mb-12 max-w-2xl mx-auto font-body">
          Accelerating persistent memory infrastructure with industry leaders.
        </p>
        <NvidiaPartnershipCard />
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-display mb-6 text-[#e8e8f0]">
          Deploy Persistent Intelligence
        </h2>
        <p className="text-[#7a7a8e] mb-8 font-body">
          Join operators who ship faster because their AI remembers.
        </p>
        <Link
          href="https://platform.ekkos.dev/signup"
          className="btn-primary"
        >
          Deploy Free
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
