import { EkkosLogo } from '@/components/ui/EkkosLogo';
import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pulse', href: '/pulse' },
    { label: 'Cortex', href: '/cortex' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: 'https://docs.ekkos.dev', external: true },
    { label: 'Changelog', href: 'https://github.com/Ekkos-Technologies-Inc', external: true },
    { label: 'Status', href: '/status' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: 'https://blog.ekkos.dev', external: true },
    { label: 'Brand Kit', href: '/brand' },
    { label: 'Careers', href: 'mailto:careers@ekkos.dev' },
    { label: 'Contact', href: 'mailto:hello@ekkos.dev' },
  ],
  security: [
    { label: 'Security', href: '/security' },
    { label: 'SOC 2 Controls', href: '/docs/compliance/SOC2_CONTROLS' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  developers: [
    { label: 'API Reference', href: 'https://docs.ekkos.dev/api-reference', external: true },
    { label: 'MCP Integration', href: 'https://docs.ekkos.dev/mcp-integration', external: true },
    { label: 'Quick Start', href: 'https://docs.ekkos.dev/quickstart', external: true },
    { label: 'GitHub', href: 'https://github.com/Ekkos-Technologies-Inc', external: true },
  ],
};

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/Ekkos-Technologies-Inc', label: 'GitHub' },
  { icon: DiscordIcon, href: 'https://discord.gg/w2JGepq9qZ', label: 'Discord' },
  { icon: Twitter, href: 'https://twitter.com/ekkosdev', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ekkos', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@ekkos.dev', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#1a1a2e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Column - Takes 2 cols */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <EkkosLogo size={32} animated />
              <span className="font-mono font-bold text-3xl tracking-tight">
                <span className="text-[#00f0ff]">ekkOS</span>
                <span className="cursor-blink">_</span>
                <sup className="text-[9px] text-[#4a4a5e] ml-0.5">™</sup>
              </span>
            </Link>
            <p className="text-[#7a7a8e] text-sm leading-relaxed mb-6 max-w-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Give your AI a real brain. Memory that learns, remembers, and gets smarter with every session.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 clip-sm bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] flex items-center justify-center text-[#7a7a8e] hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#00f0ff] mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#00f0ff] mb-4">Developers</h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#00f0ff] mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:') ? (
                    <a href={link.href} className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors">
                      {link.label}
                    </a>
                  ) : link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Legal */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#00f0ff] mb-4">Security</h4>
            <ul className="space-y-3">
              {footerLinks.security.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#7a7a8e] hover:text-[#00f0ff] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 clip-sm bg-[#00ff88]/10 border border-[#00ff88]/20">
              <div className="w-1 h-1 bg-[#00ff88]" />
              <span className="text-xs text-[#00ff88] font-medium">SOC 2 Compliant</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1a1a2e] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-sm text-[#4a4a5e]">
              &copy; {new Date().getFullYear()} ekkOS Technologies Inc.
            </p>
            <div className="hidden md:block w-1 h-1 bg-[#4a4a5e]" />
            <p className="text-xs text-[#4a4a5e]">
              Built in Toronto {'\u{1F1E8}\u{1F1E6}'}
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-end">
            <span className="text-xs text-[#00ff88] font-mono">
              Initial delta: 2x — Compound rate: 10x+
            </span>
            <Link
              href="/security"
              className="text-xs text-[#00ff88] hover:text-[#33ffaa] transition-colors font-mono"
            >
              SOC 2 Type II (In Progress)
            </Link>
            <Link
              href="/status"
              className="text-xs text-[#4a4a5e] hover:text-[#7a7a8e] transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-[#00ff88]" />
              All systems operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
