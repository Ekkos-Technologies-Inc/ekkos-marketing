'use client';

import { Download, Copy, Check, Mail, ExternalLink, Calendar, Users, TrendingUp, Award, Image as ImageIcon, Quote } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const pressReleases: { title: string; date: string; url?: string }[] = [
  // Press releases will be added as they become available
];

const pressCoverage: { title: string; publication: string; date: string; url?: string }[] = [
  // Media coverage will be listed here as it is published
];

const keyStats: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = [
  // Statistics will be updated as the platform grows
];

const storyAngles = [
  {
    title: 'For Tech Press',
    publications: ['TechCrunch', 'The Verge', 'Wired', 'Ars Technica'],
    angle: 'The Missing Infrastructure Layer in AI',
    description: 'Focus on technical innovation, architecture, and how ekkOS solves the fundamental memory problem in AI applications.',
  },
  {
    title: 'For Business Press',
    publications: ['Forbes', 'WSJ', 'Business Insider', 'Bloomberg'],
    angle: 'The $1.3T AI Infrastructure Opportunity',
    description: 'Market size, funding, competitive landscape, and the business case for persistent AI memory.',
  },
  {
    title: 'For Developer Press',
    publications: ['Hacker News', 'Dev.to', 'InfoWorld', 'The New Stack'],
    angle: 'Building AI That Actually Remembers',
    description: 'Technical deep-dive, API design, integration patterns, and developer experience.',
  },
];

const faqs = [
  {
    q: 'How is ekkOS different from ChatGPT\'s memory feature?',
    a: 'ChatGPT can remember some things you tell it explicitly. ekkOS automatically extracts knowledge from every conversation and builds a structured knowledge graph with relationships between concepts. It\'s the difference between remembering facts vs. understanding how everything connects.',
  },
  {
    q: 'Isn\'t this just RAG (Retrieval-Augmented Generation)?',
    a: 'RAG requires manual document preparation. ekkOS extracts knowledge automatically from natural conversation. No setup, no document management, zero user effort.',
  },
  {
    q: 'What about privacy and security?',
    a: 'All data is encrypted, user-owned, and deletable anytime. We\'re SOC 2 Type II compliant (certification expected Q2 2026). Users control what\'s remembered and can export their entire knowledge graph.',
  },
  {
    q: 'Can OpenAI or other AI companies just copy this?',
    a: 'Our moat is 2+ years of R&D into extraction quality, production infrastructure at scale, and domain expertise. Plus, we can pivot to B2B infrastructure if needed — becoming the memory layer for other AI applications.',
  },
  {
    q: 'What\'s your long-term vision?',
    a: 'Short term: Best AI memory infrastructure for developers. Long term: Memory infrastructure for all AI. Just like Auth0 provides authentication, ekkOS provides memory as a service.',
  },
  {
    q: 'How do you make money?',
    a: 'Subscriptions ($0-$49/seat/month), enterprise licenses, and API/infrastructure pricing. We\'re focused on developer tools and enterprise customers.',
  },
];

export default function PressPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'quote') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedQuote(text);
      setTimeout(() => setCopiedQuote(null), 2000);
    }
  };

  const founderQuotes = [
    {
      quote: 'We realized AI is incredibly powerful but fundamentally incomplete. It\'s like having a brilliant professor with amnesia — they can explain anything, but they forget you the moment you walk away. We built ekkOS to fix that.',
      author: 'Founder',
    },
    {
      quote: 'The future of AI isn\'t just more powerful models. It\'s memory. It\'s personalization. It\'s systems that actually learn from you, not just respond to you.',
      author: 'Founder',
    },
    {
      quote: 'Every company talks about "personalized AI," but personalization without memory is impossible. We\'re building the memory layer that makes real personalization possible.',
      author: 'Founder',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-[#7a7a8e] hover:text-[#e8e8f0] mb-6 transition-colors font-mono">
            ← Back to home
          </Link>
          <h1 className="text-5xl font-display mb-4">
            <span className="text-[#00f0ff]">
              Press Kit
            </span>
          </h1>
          <p className="text-xl text-[#7a7a8e] mb-6 font-body">
            Everything journalists and media need to cover ekkOS_
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {keyStats.map((stat) => (
            <div key={stat.label} className="clip-md p-6 bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
              <stat.icon className="w-8 h-8 text-[#00f0ff] mb-3" />
              <div className="text-3xl font-mono font-bold text-[#e8e8f0] mb-1">{stat.value}</div>
              <div className="text-sm text-[#7a7a8e] font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Overview */}
        <div className="mb-16">
          <p className="section-label mb-6">COMPANY OVERVIEW</p>
          <div className="clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
            <p className="text-lg text-[#7a7a8e] leading-relaxed mb-4 font-body">
              <strong className="text-[#e8e8f0]">ekkOS_</strong> is the memory infrastructure layer for AI. While most AI tools forget everything the moment you close the tab, ekkOS automatically builds a persistent knowledge graph from every conversation, making each interaction smarter than the last.
            </p>
            <p className="text-lg text-[#7a7a8e] leading-relaxed mb-4 font-body">
              Founded in 2024, ekkOS solves the fundamental problem of AI amnesia by providing developers and enterprises with a memory layer that learns, remembers, and evolves with every interaction — automatically, securely, and at scale.
            </p>
            <div className="mt-6 pt-6 border-t border-[#1a1a2e]">
              <h3 className="text-xl font-display text-[#e8e8f0] mb-3">Mission</h3>
              <p className="text-[#7a7a8e] font-body">
                To make AI truly intelligent by giving it the memory layer it needs to learn, remember, and grow with every interaction.
              </p>
            </div>
          </div>
        </div>

        {/* Key Messages */}
        <div className="mb-16">
          <p className="section-label mb-6">KEY MESSAGES</p>
          <div className="space-y-4">
            <div className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-display text-[#e8e8f0]">One-Liner</h3>
                <button
                  onClick={() => copyToClipboard('ekkOS is AI that remembers — building personal knowledge graphs from every conversation to make each interaction smarter than the last.', 'quote')}
                  className="p-2 clip-sm hover:bg-[#16161f] transition-colors"
                >
                  {copiedQuote === 'ekkOS is AI that remembers — building personal knowledge graphs from every conversation to make each interaction smarter than the last.' ? (
                    <Check className="w-4 h-4 text-[#00ff88]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#7a7a8e]" />
                  )}
                </button>
              </div>
              <p className="text-[#7a7a8e] font-body">
                ekkOS is AI that remembers — building personal knowledge graphs from every conversation to make each interaction smarter than the last.
              </p>
            </div>
            <div className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Headline Options</h3>
              <ul className="space-y-2 text-[#7a7a8e] font-body">
                <li>• "Meet ekkOS: The AI That Finally Remembers You"</li>
                <li>• "Startup Builds Missing Memory Layer for AI"</li>
                <li>• "ekkOS Solves AI's Biggest Problem: Amnesia"</li>
                <li>• "This AI Gets Smarter With Every Conversation"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Founder Quotes */}
        <div className="mb-16">
          <p className="section-label mb-6">FOUNDER QUOTES</p>
          <div className="space-y-4">
            {founderQuotes.map((item, index) => (
              <div key={index} className="clip-md p-6 bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e]">
                <Quote className="w-6 h-6 text-[#00f0ff] mb-3" />
                <p className="text-lg text-[#7a7a8e] italic mb-3 font-body">"{item.quote}"</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#7a7a8e] font-mono">— {item.author}</p>
                  <button
                    onClick={() => copyToClipboard(`"${item.quote}" — ${item.author}`, 'quote')}
                    className="p-2 clip-sm hover:bg-[#16161f] transition-colors"
                  >
                    {copiedQuote === `"${item.quote}" — ${item.author}` ? (
                      <Check className="w-4 h-4 text-[#00ff88]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#7a7a8e]" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Angles */}
        <div className="mb-16">
          <p className="section-label mb-6">STORY ANGLES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storyAngles.map((angle) => (
              <div key={angle.title} className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="text-xl font-display text-[#e8e8f0] mb-2">{angle.title}</h3>
                <p className="text-sm text-[#00f0ff] mb-3 font-mono">{angle.angle}</p>
                <p className="text-[#7a7a8e] text-sm mb-4 font-body">{angle.description}</p>
                <div className="pt-4 border-t border-[#1a1a2e]">
                  <p className="text-xs text-[#4a4a5e] mb-2 font-mono">Target Publications:</p>
                  <div className="flex flex-wrap gap-2">
                    {angle.publications.map((pub) => (
                      <span key={pub} className="tag">
                        {pub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-16">
          <p className="section-label mb-6">PRESS RELEASES</p>
          <div className="space-y-4">
            {pressReleases.map((release) => (
              <div key={release.date} className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] hover:bg-[#111118]/60 backdrop-blur-xl transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-4 h-4 text-[#4a4a5e]" />
                      <span className="text-sm text-[#7a7a8e] font-mono">{new Date(release.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h3 className="text-xl font-display text-[#e8e8f0] mb-2">{release.title}</h3>
                    {release.url && <p className="text-[#7a7a8e] font-body">{release.title}</p>}
                  </div>
                  <a
                    href={release.url}
                    className="ml-4 p-2 clip-sm hover:bg-[#16161f] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 text-[#00f0ff]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Coverage */}
        <div className="mb-16">
          <p className="section-label mb-6">PRESS COVERAGE</p>
          <div className="space-y-4">
            {pressCoverage.map((coverage) => (
              <div key={coverage.date} className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] hover:bg-[#111118]/60 backdrop-blur-xl transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag">
                        {coverage.publication}
                      </span>
                      <span className="text-sm text-[#7a7a8e] font-mono">{new Date(coverage.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <h3 className="text-xl font-display text-[#e8e8f0]">{coverage.title}</h3>
                  </div>
                  <a
                    href={coverage.url}
                    className="ml-4 p-2 clip-sm hover:bg-[#16161f] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 text-[#00f0ff]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Assets */}
        <div className="mb-16">
          <p className="section-label mb-6">MEDIA ASSETS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/brand"
              className="clip-md p-6 bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] hover:border-[#00f0ff]/50 transition-all group"
            >
              <ImageIcon className="w-8 h-8 text-[#00f0ff] mb-3" />
              <h3 className="text-xl font-display text-[#e8e8f0] mb-2">Brand Assets</h3>
              <p className="text-[#7a7a8e] text-sm mb-4 font-body">Logos, colors, wallpapers, and profile images</p>
              <div className="flex items-center gap-2 text-[#00f0ff] text-sm font-mono group-hover:gap-3 transition-all">
                View Brand Kit <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
            <div className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
              <ImageIcon className="w-8 h-8 text-[#4a4a5e] mb-3" />
              <h3 className="text-xl font-display text-[#e8e8f0] mb-2">Founder Photos</h3>
              <p className="text-[#7a7a8e] text-sm mb-4 font-body">High-resolution headshots</p>
              <p className="text-[#4a4a5e] text-xs font-mono">Contact for access</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <p className="section-label mb-6">FREQUENTLY ASKED QUESTIONS</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="clip-md p-6 bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e]">
                <h3 className="text-lg font-display text-[#e8e8f0] mb-3">{faq.q}</h3>
                <p className="text-[#7a7a8e] leading-relaxed font-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16 clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
          <p className="section-label mb-6">CONTACT INFORMATION</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-display text-[#e8e8f0] mb-4">Media Inquiries</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00f0ff]" />
                  <div className="flex-1">
                    <p className="text-[#7a7a8e] text-sm font-mono">Email</p>
                    <div className="flex items-center gap-2">
                      <a href="mailto:press@ekkos.dev" className="text-[#e8e8f0] hover:text-[#00f0ff] transition-colors font-mono">
                        press@ekkos.dev
                      </a>
                      <button
                        onClick={() => copyToClipboard('press@ekkos.dev', 'email')}
                        className="p-1 clip-sm hover:bg-[#16161f] transition-colors"
                      >
                        {copiedEmail ? (
                          <Check className="w-4 h-4 text-[#00ff88]" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#7a7a8e]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[#7a7a8e] text-sm mb-1 font-mono">Response Time</p>
                  <p className="text-[#e8e8f0] font-body">Within 2 hours during business hours</p>
                </div>
                <div>
                  <p className="text-[#7a7a8e] text-sm mb-1 font-mono">Interview Requests</p>
                  <p className="text-[#e8e8f0] font-body">Usually scheduled within 24 hours</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display text-[#e8e8f0] mb-4">General Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00f0ff]" />
                  <div>
                    <p className="text-[#7a7a8e] text-sm font-mono">Email</p>
                    <a href="mailto:hello@ekkos.dev" className="text-[#e8e8f0] hover:text-[#00f0ff] transition-colors font-mono">
                      hello@ekkos.dev
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-[#7a7a8e] text-sm mb-1 font-mono">Website</p>
                  <a href="https://ekkos.dev" className="text-[#e8e8f0] hover:text-[#00f0ff] transition-colors font-mono" target="_blank" rel="noopener noreferrer">
                    ekkos.dev
                  </a>
                </div>
                <div>
                  <p className="text-[#7a7a8e] text-sm mb-1 font-mono">Social Media</p>
                  <div className="flex gap-3">
                    <a href="https://twitter.com/ekkosdev" className="text-[#7a7a8e] hover:text-[#00f0ff] transition-colors font-mono" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                    <a href="https://github.com/Ekkos-Technologies-Inc" className="text-[#7a7a8e] hover:text-[#00f0ff] transition-colors font-mono" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mb-16">
          <p className="section-label mb-6">KEY STATISTICS</p>
          <div className="clip-lg bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-display text-[#e8e8f0] mb-4">User Metrics</h3>
                <ul className="space-y-2 text-[#7a7a8e] font-body">
                  <li>• 10,000+ active users across 50+ countries</li>
                  <li>• 94% retention rate after 2 weeks</li>
                  <li>• 35% month-over-month organic growth</li>
                  <li>• 4.2 average conversations per week per user</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-display text-[#e8e8f0] mb-4">Market Context</h3>
                <ul className="space-y-2 text-[#7a7a8e] font-body">
                  <li>• 100M+ ChatGPT users frustrated with lack of memory</li>
                  <li>• $1.3T AI infrastructure market opportunity</li>
                  <li>• 78% of students use AI for studying (OpenAI survey)</li>
                  <li>• SOC 2 compliant, FERPA compliant for schools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-12">
          <h2 className="text-3xl font-display text-[#e8e8f0] mb-4">Need More Information?</h2>
          <p className="text-xl text-[#7a7a8e] mb-6 font-body">
            We're here to help with interviews, demos, and additional assets.
          </p>
          <a
            href="mailto:press@ekkos.dev"
            className="btn-primary"
          >
            <Mail className="w-5 h-5" />
            Contact Press Team
          </a>
        </div>
      </div>
    </div>
  );
}
