'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Mail, MessageCircle, BookOpen, Send, HelpCircle,
  FileText, ExternalLink, CheckCircle, AlertCircle, Loader2
} from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit support ticket');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try emailing us directly.'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resources = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      link: '/docs',
      linkText: 'View Docs'
    },
    {
      icon: MessageCircle,
      title: 'GitHub Discussions',
      description: 'Join our community forum for Q&A',
      link: 'https://github.com/Ekkos-Technologies-Inc/discussions',
      linkText: 'Join Discussion',
      external: true
    },
    {
      icon: FileText,
      title: 'Status Page',
      description: 'Check system status and uptime',
      link: '/status',
      linkText: 'View Status'
    },
  ];

  const faqs = [
    {
      q: 'How do I get started with ekkOS?',
      a: 'Sign up for a free account, generate an API key from your dashboard, and add the ekkOS MCP server to your IDE configuration. Check our Quick Start guide for detailed steps.'
    },
    {
      q: 'What IDEs are supported?',
      a: 'ekkOS works with any IDE that supports the Model Context Protocol (MCP), including Cursor, Claude Code, VS Code, and Windsurf. You can also use it via API.'
    },
    {
      q: 'Is there a free tier?',
      a: 'Yes! The Developer tier is free forever and includes 100 memory searches/month, 50 patterns forged, and 1 IDE connection. Perfect for solo developers getting started.'
    },
    {
      q: 'How does the Hallucination Firewall work?',
      a: 'The ekkOS_Conflict tool validates AI suggestions against your memory substrate, returning verification signals based on whether suggestions match your history, have no prior evidence, or contradict past decisions.'
    },
    {
      q: 'Can I use ekkOS with my team?',
      a: 'Team features are coming soon in the Team tier, which will include shared workspaces, team patterns, and collaborative memory.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 clip-md bg-[#00f0ff] mb-6">
            <HelpCircle className="w-8 h-8 text-[#0a0a0f]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#e8e8f0] mb-4">How can we help?</h1>
          <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
            Get support, find answers, or reach out to our team
          </p>
        </div>

        {/* Resources Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div key={resource.title} className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-6">
                <Icon className="w-10 h-10 text-[#00f0ff] mb-4" />
                <h3 className="text-xl font-display text-[#e8e8f0] mb-2">{resource.title}</h3>
                <p className="text-[#7a7a8e] mb-4 text-sm font-body">{resource.description}</p>
                {resource.external ? (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-[#33f3ff] transition-colors text-sm font-mono"
                  >
                    {resource.linkText}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link
                    href={resource.link}
                    className="inline-flex items-center gap-2 text-[#00f0ff] hover:text-[#33f3ff] transition-colors text-sm font-mono"
                  >
                    {resource.linkText}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#00f0ff]/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-[#00f0ff]" />
              <h2 className="text-2xl font-display text-[#e8e8f0]">Contact Support</h2>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto mb-4" />
                <h3 className="text-xl font-display text-[#e8e8f0] mb-2">Message Sent!</h3>
                <p className="text-[#7a7a8e] mb-6 font-body">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-mono text-[#7a7a8e] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] text-[#e8e8f0] placeholder-[#4a4a5e] font-body focus:outline-none focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-[#7a7a8e] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] text-[#e8e8f0] placeholder-[#4a4a5e] font-body focus:outline-none focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-[#7a7a8e] mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] text-[#e8e8f0] font-body focus:outline-none focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20 transition-all"
                  >
                    <option value="general">General Question</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-mono text-[#7a7a8e] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] text-[#e8e8f0] placeholder-[#4a4a5e] font-body focus:outline-none focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20 transition-all"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-[#7a7a8e] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] text-[#e8e8f0] placeholder-[#4a4a5e] font-body focus:outline-none focus:border-[#00f0ff]/50 focus:ring-2 focus:ring-[#00f0ff]/20 transition-all resize-none"
                    placeholder="Provide as much detail as possible..."
                  />
                </div>

                {status === 'error' && (
                  <div className="clip-sm p-4 bg-[#ff3366]/10 border border-[#ff3366]/20 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#ff3366] text-sm font-body">{errorMessage}</p>
                      <p className="text-[#ff3366]/60 text-xs mt-1 font-body">
                        Email us directly at{' '}
                        <a href="mailto:support@ekkos.dev" className="underline hover:text-[#ff3366]">
                          support@ekkos.dev
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-[#1a1a2e]">
              <p className="text-xs text-[#4a4a5e] text-center font-body">
                Or email us directly at{' '}
                <a href="mailto:support@ekkos.dev" className="text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                  support@ekkos.dev
                </a>
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8">
              <h2 className="text-2xl font-display text-[#e8e8f0] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="pb-6 border-b border-[#1a1a2e] last:border-0 last:pb-0">
                    <h3 className="text-[#e8e8f0] font-display mb-2">{faq.q}</h3>
                    <p className="text-sm text-[#7a7a8e] font-body">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[#7a7a8e] text-sm text-center font-body">
                Can't find what you're looking for?{' '}
                <Link href="/docs" className="text-[#00f0ff] hover:text-[#33f3ff] transition-colors">
                  Check our documentation
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
