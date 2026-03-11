'use client';

import {
    ArrowRight,
    BookOpen,
    Check,
    Code,
    Copy,
    Database,
    ExternalLink,
    Search,
    Shield,
    Sparkles,
    Terminal,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DocsPage() {
  const [copied, setCopied] = useState('');

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const quickStart = `{
  "mcpServers": {
    "ekkos-memory": {
      "command": "npx",
      "args": ["-y", "@ekkos/mcp-server"],
      "env": {
        "EKKOS_API_KEY": "your-key-here"
      }
    }
  }
}`;

  const sections = [
    {
      title: 'Quick Start',
      icon: Zap,
      items: [
        { name: 'Installation', href: '#installation' },
        { name: 'Configuration', href: '#configuration' },
        { name: 'First Steps', href: '#first-steps' },
      ]
    },
    {
      title: 'Core Concepts',
      icon: Database,
      items: [
        { name: '11-Layer Memory System', href: '#memory-layers' },
        { name: 'Pattern Learning', href: '#patterns' },
        { name: 'Golden Loop', href: '#golden-loop' },
      ]
    },
    {
      title: 'Core Memory Tools',
      icon: Terminal,
      items: [
        { name: 'ekkOS_Search - Search Memory', href: '#search-memory' },
        { name: 'ekkOS_Forge - Save Patterns', href: '#forge-pattern' },
        { name: 'ekkOS_Directive - Create Rules', href: '#forge-directive' },
        { name: 'ekkOS_Conflict - Validate Actions', href: '#check-conflict' },
        { name: 'ekkOS_Recall - Recall Past', href: '#recall-conversation' },
      ]
    },
    {
      title: 'Integration',
      icon: Code,
      items: [
        { name: 'Cursor IDE', href: '#cursor' },
        { name: 'Claude Code', href: '#claude-code' },
        { name: 'VS Code', href: '#vscode' },
        { name: 'API Reference', href: '#api' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] select-text">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 clip-md bg-[#00f0ff] mb-6">
            <BookOpen className="w-8 h-8 text-[#0a0a0f]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#e8e8f0] mb-4">
            ekkOS<sup className="text-lg">™</sup> Documentation
          </h1>
          <p className="text-lg text-[#7a7a8e] max-w-2xl mx-auto font-body">
            Build AI agents with persistent memory, pattern learning, and hallucination detection
          </p>
        </div>

        {/* Quick Start Card */}
        <div className="clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#00f0ff]/30 max-w-4xl mx-auto mb-12 p-8 select-text">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#00f0ff]" />
            <h2 className="text-2xl font-display text-[#e8e8f0]">Quick Start</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-3" id="installation">1. Install ekkOS MCP Server</h3>
              <p className="text-[#7a7a8e] mb-4 font-body">
                Install the ekkOS MCP server via npm. Authentication is handled automatically via Claude subscription mode.
              </p>
              <Link
                href="https://docs.ekkos.dev"
                className="btn-primary"
              >
                View Full Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div id="configuration">
              <h3 className="text-lg font-display text-[#e8e8f0] mb-3">2. Install MCP Server</h3>
              <p className="text-[#7a7a8e] mb-4 font-body">
                Add ekkOS to your Claude Desktop or IDE configuration:
              </p>
              <div className="relative">
                <pre className="clip-md bg-[#0a0a0f] border border-[#1a1a2e] p-4 overflow-x-auto select-text">
                  <code className="text-sm text-[#00ff88] font-mono select-text">{quickStart}</code>
                </pre>
                <button
                  onClick={() => copyCode(quickStart, 'quickstart')}
                  className="absolute top-3 right-3 p-2 clip-sm bg-[#0d0d14]/50 backdrop-blur-md hover:bg-[#16161f] transition-colors"
                >
                  {copied === 'quickstart' ? (
                    <Check className="w-4 h-4 text-[#00ff88]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#7a7a8e]" />
                  )}
                </button>
              </div>
            </div>

            <div id="first-steps">
              <h3 className="text-lg font-display text-[#e8e8f0] mb-3">3. Start Using Core Memory Tools</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md select-text">
                  <Search className="w-5 h-5 text-[#00f0ff] mt-0.5" />
                  <div>
                    <code className="text-[#00ff88] font-mono select-text">ekkOS_Search</code>
                    <span className="text-[#7a7a8e] ml-2 font-body select-text">- Search your memory for past solutions</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md select-text">
                  <Sparkles className="w-5 h-5 text-[#ffb800] mt-0.5" />
                  <div>
                    <code className="text-[#00ff88] font-mono select-text">ekkOS_Forge</code>
                    <span className="text-[#7a7a8e] ml-2 font-body select-text">- Save important decisions and patterns</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md select-text">
                  <Shield className="w-5 h-5 text-[#00f0ff] mt-0.5" />
                  <div>
                    <code className="text-[#00ff88] font-mono select-text">ekkOS_Conflict</code>
                    <span className="text-[#7a7a8e] ml-2 font-body select-text">- Validate AI suggestions against your history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Sections Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-6 select-text">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 clip-sm bg-[#00f0ff]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#00f0ff]" />
                  </div>
                  <h3 className="text-xl font-display text-[#e8e8f0]">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center gap-2 text-[#7a7a8e] hover:text-[#00f0ff] transition-colors py-1 font-body"
                      >
                        <ArrowRight className="w-4 h-4" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Core Concepts */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Memory Layers */}
          <div id="memory-layers">
            <h2 className="text-3xl font-display text-[#e8e8f0] mb-6">11-Layer Memory System</h2>
            <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-6 select-text">
              <div className="space-y-4">
                <p className="text-[#7a7a8e] font-body">
                  ekkOS implements an advanced 11-layer memory architecture inspired by cognitive science:
                </p>
                <div className="grid gap-3">
                  {[
                    { layer: 'Working Memory', desc: 'Recent chat messages (24h window)' },
                    { layer: 'Episodic Memory', desc: 'Conversation episodes and context' },
                    { layer: 'Semantic Memory', desc: 'Compressed knowledge entries' },
                    { layer: 'Pattern Memory', desc: 'Reusable strategies and solutions' },
                    { layer: 'Procedural Memory', desc: 'Step-by-step workflows' },
                    { layer: 'Collective Memory', desc: 'Cross-agent learning (7d window)' },
                    { layer: 'Meta Memory', desc: 'System self-awareness records' },
                    { layer: 'Codebase Memory', desc: 'Code embeddings for semantic search' },
                    { layer: 'Directives', desc: 'User rules (MUST/NEVER/PREFER/AVOID)' },
                    { layer: 'Conflicts', desc: 'Directive conflict resolution' },
                    { layer: 'Secrets Vault', desc: 'Encrypted credentials (AES-256-GCM)' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 clip-sm bg-[#0d0d14]/50 backdrop-blur-md select-text">
                      <div className="w-8 h-8 clip-sm bg-[#00f0ff] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0a0a0f] text-sm font-mono font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[#e8e8f0] font-display select-text">{item.layer}</p>
                        <p className="text-sm text-[#4a4a5e] font-body select-text">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Golden Loop */}
          <div id="golden-loop">
            <h2 className="text-3xl font-display text-[#e8e8f0] mb-6">The Golden Loop</h2>
            <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#ffb800]/30 p-6 select-text">
              <p className="text-[#7a7a8e] mb-6 font-body">
                The self-improving cycle that makes ekkOS smarter with every interaction:
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {['Retrieve', 'Apply', 'Measure', 'Learn'].map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-20 h-20 clip-md bg-[#ffb800] flex items-center justify-center mb-2">
                        <span className="text-[#0a0a0f] font-mono font-bold">{i + 1}</span>
                      </div>
                      <p className="text-[#e8e8f0] font-mono text-sm">{step}</p>
                    </div>
                    {i < 3 && <ArrowRight className="w-5 h-5 text-[#ffb800]" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-8 text-center select-text">
            <h3 className="text-2xl font-display text-[#e8e8f0] mb-4">Need Help?</h3>
            <p className="text-[#7a7a8e] mb-6 font-body">
              Join our community or reach out to support for assistance
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/support"
                className="btn-secondary"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/Ekkos-Technologies-Inc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
