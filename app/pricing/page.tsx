'use client';

import { GlitchText } from '@/components/ui/GlitchText';
import { STRIPE_CONFIG } from '@/lib/stripe-config';
import { Check, HelpCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type BillingPeriod = 'monthly' | 'yearly';

const plans = [
  {
    name: 'Developer',
    tagline: 'Individual Operator',
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: '/forever',
    description: 'Operational from first session',
    bestFor: 'Best for: learners, hobby projects, experimentation.',
    features: [
      'Cross-platform memory (Claude Code, Cursor, Windsurf)',
      'Auto-forge patterns (20/day limit)',
      'Conflict checking (100 checks/month)',
      '100 memory searches / month',
      '50 patterns forged / month',
      '7-day retention',
      'Community support',
    ],
    cta: 'Deploy Free',
    ctaLink: 'https://platform.ekkos.dev/signup',
    highlighted: false,
    tier: 'free' as const,
  },
  {
    name: 'Professional',
    tagline: 'Power Operator',
    monthlyPrice: STRIPE_CONFIG.products.pro.price,
    yearlyPrice: STRIPE_CONFIG.products.pro.yearlyPrice,
    period: '/month',
    description: 'Deeper substrate. Faster compound rate. Unlimited operations.',
    bestFor: 'Best for: full-time builders and power users.',
    features: [
      'Unlimited cross-platform memory',
      'Unlimited auto-forge patterns',
      'Unlimited conflict checks',
      'ekkOS_Forever_Memory™',
      'Unlimited IDE connections',
      'Pattern insights dashboard',
      'Collective Memory access',
      'API access',
      'Priority support',
    ],
    cta: 'Deploy Now',
    ctaLink: 'checkout',
    highlighted: true,
    badge: 'MOST POPULAR',
    tier: 'pro' as const,
  },
  {
    name: 'Team',
    tagline: 'Engineering Fleet',
    monthlyPrice: STRIPE_CONFIG.products.team.price,
    yearlyPrice: STRIPE_CONFIG.products.team.yearlyPrice,
    period: '/seat/month',
    description: 'Fleet-wide intelligence propagation. Compound learning at scale.',
    bestFor: 'Best for: engineering teams and startups scaling workflows.',
    features: [
      'Everything in Pro',
      'Shared pattern library across team',
      'Team memory spaces with role-awareness',
      'Team analytics & drift detection',
      'Collaborative pattern curation',
      'Admin controls & permissions',
      'SSO (Google, GitHub, SAML)',
      'Audit logs',
      'Custom retention policies',
    ],
    cta: 'Contact Sales',
    ctaLink: 'mailto:team@ekkos.dev',
    highlighted: false,
    tier: 'team' as const,
  },
];

const faqs = [
  {
    q: 'What is a memory search?',
    a: 'A memory search is when your AI queries the memory substrate using ekkOS_Search to find relevant patterns, episodes, and solutions.',
  },
  {
    q: 'What is forging a pattern?',
    a: 'Forging a pattern (using ekkOS_Forge) permanently saves a learned solution. Use it when you know: "We must never lose this decision again."',
  },
  {
    q: 'How does collective memory work?',
    a: 'Pro users can access anonymized, generalized patterns learned across all ekkOS users. No raw code or proprietary data is ever shared.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes, at any time.',
  },
  {
    q: 'Which IDEs are supported?',
    a: 'Claude Code, Cursor, Windsurf, and any MCP-compatible tool.',
  },
  {
    q: 'Can I self-host?',
    a: 'Yes — enterprise customers can deploy ekkOS privately. Contact us for details.',
  },
];

const features = [
  { name: 'Memory searches', free: '100/mo', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Patterns forged', free: '50/mo', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'API requests', free: '-', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'API keys', free: '-', pro: '20', team: 'Unlimited' },
  { name: 'Memory retention', free: '7 days', pro: 'Forever', team: 'Forever' },
  { name: 'Auto-forge patterns', free: '20/day', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Conflict checking', free: '100/mo', pro: 'Unlimited', team: 'Unlimited' },
  { name: 'Collective Memory', free: '-', pro: 'Check', team: 'Check' },
  { name: 'Team sharing', free: '-', pro: '-', team: 'Check' },
  { name: 'SSO', free: '-', pro: '-', team: 'Check' },
  { name: 'Support', free: 'Community', pro: 'Priority', team: 'Dedicated' },
];

function formatPrice(price: number, period: BillingPeriod): string {
  if (price === 0) return '$0';
  return `$${price}`;
}

function calculateSavings(monthly: number, yearly: number): number {
  if (monthly === 0) return 0;
  const monthlyYearTotal = monthly * 12;
  return monthlyYearTotal - yearly;
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    if (planId === 'free') {
      window.location.href = 'https://platform.ekkos.dev/signup';
      return;
    }

    setLoading(planId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: planId === 'pro' ? 'professional' : planId,
          billingPeriod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Failed to start checkout');
      setLoading(null);
    }
  };

  return (
    <div className="py-12">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 text-center mb-12">
        <GlitchText as="h1" text="Access Tiers" variant={0} className="text-4xl md:text-6xl font-display mb-6 text-[#e8e8f0]" />
        <p className="text-xl text-[#7a7a8e] max-w-2xl mx-auto mb-8 font-body">
          Deploy free. Scale with your intelligence footprint.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 clip-sm text-sm font-mono transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-[#00f0ff] text-[#0a0a0f]'
                : 'text-[#7a7a8e] hover:text-[#e8e8f0]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 clip-sm text-sm font-mono transition-all flex items-center gap-2 ${
              billingPeriod === 'yearly'
                ? 'bg-[#00f0ff] text-[#0a0a0f]'
                : 'text-[#7a7a8e] hover:text-[#e8e8f0]'
            }`}
          >
            Yearly
            <span className="tag text-[#00ff88] border-[#00ff88]/20">
              Save 17%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);

            return (
              <div
                key={plan.name}
                className={`p-8 clip-md relative flex flex-col ${
                  plan.highlighted
                    ? 'bg-[#16161f] border border-[#00f0ff]/30 shadow-glow-cyan'
                    : 'bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 tag bg-[#00f0ff] text-[#0a0a0f] border-[#00f0ff]">
                    {plan.badge}
                  </div>
                )}

                {/* Fixed-height header zone */}
                <div className="mb-6">
                  <div className={`text-sm font-mono mb-1 ${plan.highlighted ? 'text-[#00f0ff]' : 'text-[#4a4a5e]'}`}>
                    {plan.tagline}
                  </div>
                  <h3 className="text-2xl font-display mb-2 text-[#e8e8f0]">{plan.name}</h3>
                  <div className="text-4xl font-display mb-1 text-[#e8e8f0]">
                    {formatPrice(price, billingPeriod)}
                    <span className="text-lg text-[#4a4a5e] font-body font-normal">
                      {plan.monthlyPrice === 0 ? plan.period : billingPeriod === 'yearly' ? '/year' : '/month'}
                    </span>
                  </div>
                  <div className="h-5">
                    {billingPeriod === 'yearly' && savings > 0 ? (
                      <span className="text-sm text-[#00ff88] font-mono">Save ${savings}/year</span>
                    ) : null}
                  </div>
                  <p className="text-sm text-[#7a7a8e] mt-1 font-body">{plan.description}</p>
                  {plan.bestFor && (
                    <p className="text-xs text-[#4a4a5e] mt-1 italic font-body">{plan.bestFor}</p>
                  )}
                </div>

                {/* Features list — grows to fill available space */}
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-center gap-2 text-sm font-body ${plan.highlighted ? 'text-[#e8e8f0]/80' : 'text-[#7a7a8e]'}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-[#00f0ff]' : 'text-[#4a4a5e]'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA — always pinned to bottom */}
                <div className="mt-8">
                  {!plan.ctaLink ? (
                    <button
                      disabled
                      className="block w-full py-3 text-center clip-sm font-mono bg-[#00f0ff]/30 text-[#7a7a8e] cursor-not-allowed"
                    >
                      {plan.cta}
                    </button>
                  ) : plan.tier === 'team' ? (
                    <a
                      href={plan.ctaLink}
                      className="btn-secondary w-full justify-center"
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCheckout(plan.tier)}
                      disabled={loading === plan.tier}
                      className={`block w-full py-3 text-center clip-sm font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        plan.highlighted
                          ? 'btn-primary w-full justify-center'
                          : 'btn-secondary w-full justify-center'
                      }`}
                    >
                      {loading === plan.tier ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        plan.cta
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capability Matrix */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <GlitchText as="h2" text="Capability Matrix" variant={1} className="text-2xl font-display text-center mb-12 text-[#e8e8f0]" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a2e]">
                <th className="text-left py-4 px-4 text-[#7a7a8e] font-mono font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-[#7a7a8e] font-mono font-medium">Free</th>
                <th className="text-center py-4 px-4 text-[#00f0ff] font-mono font-medium">Pro</th>
                <th className="text-center py-4 px-4 text-[#7a7a8e] font-mono font-medium">Team</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-b border-[#1a1a2e]/50">
                  <td className="py-4 px-4 text-[#e8e8f0]/80 font-body">{f.name}</td>
                  <td className="py-4 px-4 text-center text-[#7a7a8e] font-mono">
                    {f.free === 'Check' ? <Check className="w-5 h-5 text-[#00ff88] mx-auto" /> : f.free}
                  </td>
                  <td className="py-4 px-4 text-center text-[#e8e8f0]/80 font-mono">
                    {f.pro === 'Check' ? <Check className="w-5 h-5 text-[#00ff88] mx-auto" /> : f.pro}
                  </td>
                  <td className="py-4 px-4 text-center text-[#7a7a8e] font-mono">
                    {f.team === 'Check' ? <Check className="w-5 h-5 text-[#00ff88] mx-auto" /> : f.team}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <GlitchText as="h2" text="Technical Reference" variant={2} className="text-2xl font-display text-center mb-12 text-[#e8e8f0]" />
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
              <h3 className="flex items-center gap-2 font-display mb-3 text-[#e8e8f0]">
                <HelpCircle className="w-5 h-5 text-[#00f0ff]" />
                {faq.q}
              </h3>
              <p className="text-[#7a7a8e] pl-7 font-body">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <GlitchText as="h2" text="Persistent cognitive infrastructure. Two-minute deployment." variant={0} className="text-3xl font-display mb-6 text-[#e8e8f0]" />
        <p className="text-[#7a7a8e] mb-8 font-body">
          Built for Claude Code. Compatible with Cursor, Windsurf, and any MCP client.
        </p>
        <Link
          href="https://platform.ekkos.dev/signup"
          className="btn-primary"
        >
          Deploy Free
        </Link>
      </section>
    </div>
  );
}
