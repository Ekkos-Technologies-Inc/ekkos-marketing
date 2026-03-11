'use client';

import { Download, Copy, Check, Monitor, Smartphone } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EkkosLogo } from '@/components/ui/EkkosLogo';

/* ── DATA ─────────────────────────────────────────────────────────────────── */

const logoSizes = [
  { label: 'Square 1:1',       width: 1000, height: 1000 },
  { label: 'Wide 16:9',        width: 1920, height: 1080 },
  { label: '4K UHD',           width: 3840, height: 2160 },
  { label: 'Social 1:1',       width: 1200, height: 1200 },
  { label: 'Twitter Header',   width: 1500, height: 500  },
  { label: 'Instagram Story',  width: 1080, height: 1920 },
];

const wallpapers = [
  { id: 'circuit-landscape', name: 'Circuit Landscape' },
  { id: 'neon-cityscape',    name: 'Neon Cityscape' },
  { id: 'data-streams',      name: 'Data Streams' },
  { id: 'neural-network',    name: 'Neural Network' },
  { id: 'memory-cathedral',  name: 'Memory Cathedral' },
  { id: 'quantum-grid',      name: 'Quantum Grid' },
];

const colors = [
  { name: 'Deep',     hex: '#0a0a0f', role: 'Page background' },
  { name: 'Panel',    hex: '#0d0d14', role: 'Terminal / code' },
  { name: 'Card',     hex: '#111118', role: 'Card surfaces' },
  { name: 'Elevated', hex: '#16161f', role: 'Hover / featured' },
  { name: 'Border',   hex: '#1a1a2e', role: 'Default borders' },
  { name: 'Cyan',     hex: '#00f0ff', role: 'Primary accent' },
  { name: 'Amber',    hex: '#ffb800', role: 'Secondary signal' },
  { name: 'Green',    hex: '#00ff88', role: 'Success state' },
  { name: 'Red',      hex: '#ff3366', role: 'Error / danger' },
  { name: 'Dim',      hex: '#4a4a5e', role: 'Labels / metadata' },
];

const fonts = [
  {
    name: 'Share Tech Mono',
    class: 'font-display',
    role: 'Display / Headings',
    usage: 'h1-h3, hero text, section titles, metric values, step numbers',
    weights: ['400'],
    sample: 'MEMORY INFRASTRUCTURE FOR AI',
  },
  {
    name: 'JetBrains Mono',
    class: 'font-mono',
    role: 'Technical / Labels',
    usage: 'Nav, labels, tags, buttons, code, terminal, section-labels',
    weights: ['400', '500', '600', '700'],
    sample: '// SECTION_LABEL  DOWNLOAD_ASSET ->',
  },
  {
    name: 'Space Grotesk',
    class: 'font-body',
    role: 'Body / Readable',
    usage: 'Paragraphs, descriptions, long-form content',
    weights: ['300', '400', '500'],
    sample: 'Give your AI a real brain. ekkOS is the persistent memory layer that makes AI agents smarter over time.',
  },
];

const FONT_IMPORT_URL = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';

/* ── SVG GENERATION ───────────────────────────────────────────────────────── */

function generateLogoSVG(width: number, height: number, theme: 'dark' | 'transparent') {
  const bgColor = theme === 'dark' ? '#0a0a0f' : 'none';
  const bgRect = theme === 'dark' ? `<rect width="${width}" height="${height}" fill="${bgColor}"/>` : '';
  const scale = Math.min(width, height) / 500;
  const iconSize = 80 * scale;
  const fontSize = 48 * scale;
  const tmSize = 11 * scale;
  const centerX = width / 2;
  const centerY = height / 2;
  const totalWidth = iconSize + 14 * scale + fontSize * 3.2;
  const iconX = centerX - totalWidth / 2;
  const iconY = centerY - iconSize / 2;
  const textX = iconX + iconSize + 14 * scale;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${bgRect}
  <style>@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&amp;display=swap');</style>
  <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 80})">
    <path d="M10 0 L70 0 L80 10 L80 70 L70 80 L10 80 L0 70 L0 10 Z" stroke="#00f0ff" stroke-width="1.5" fill="#0d0d14"/>
    <line x1="2" y1="12" x2="12" y2="2" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>
    <line x1="68" y1="2" x2="78" y2="12" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>
    <line x1="2" y1="68" x2="12" y2="78" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>
    <line x1="68" y1="78" x2="78" y2="68" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>
    <line x1="16" y1="16" x2="64" y2="16" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="16" y1="28" x2="64" y2="28" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="16" y1="40" x2="64" y2="40" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="16" y1="52" x2="64" y2="52" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="16" y1="64" x2="64" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="16" y1="16" x2="16" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="28" y1="16" x2="28" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="40" y1="16" x2="40" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="52" y1="16" x2="52" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <line x1="64" y1="16" x2="64" y2="64" stroke="#00f0ff" stroke-width="0.5" opacity="0.12"/>
    <rect x="17" y="17" width="10" height="10" fill="#00f0ff" opacity="0.85"/>
    <rect x="29" y="17" width="10" height="10" fill="#00f0ff" opacity="0.85"/>
    <rect x="41" y="17" width="10" height="10" fill="#00f0ff" opacity="0.6"/>
    <rect x="17" y="29" width="10" height="10" fill="#00f0ff" opacity="0.85"/>
    <rect x="17" y="41" width="10" height="10" fill="#00f0ff" opacity="0.75"/>
    <rect x="29" y="41" width="10" height="10" fill="#00f0ff" opacity="0.75"/>
    <rect x="41" y="41" width="10" height="10" fill="#00f0ff" opacity="0.5"/>
    <rect x="17" y="53" width="10" height="10" fill="#00f0ff" opacity="0.85"/>
    <rect x="29" y="53" width="10" height="10" fill="#00f0ff" opacity="0.85"/>
    <rect x="41" y="53" width="10" height="10" fill="#00f0ff" opacity="0.6"/>
    <rect x="53" y="53" width="10" height="10" fill="#ffb800" opacity="0.9"/>
  </g>
  <text x="${textX}" y="${centerY + fontSize * 0.35}" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="${fontSize}">
    <tspan fill="#00f0ff">ekkOS</tspan><tspan fill="#ffb800">_</tspan>
  </text>
  <text x="${textX + fontSize * 3.15}" y="${centerY - fontSize * 0.1}" font-family="'JetBrains Mono', monospace" font-weight="400" font-size="${tmSize}" fill="#4a4a5e">TM</text>
</svg>`;
}

async function svgToBlob(svgString: string, width: number, height: number, format: 'svg' | 'png'): Promise<Blob> {
  if (format === 'svg') return new Blob([svgString], { type: 'image/svg+xml' });
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob failed')), 'image/png');
    };
    img.onerror = reject;
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  });
}

/* ── PAGE ──────────────────────────────────────────────────────────────────── */

export default function BrandPage() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'transparent'>('dark');
  const [format, setFormat] = useState<'svg' | 'png'>('svg');
  const [copied, setCopied] = useState<string | null>(null);

  const size = logoSizes[sizeIdx];

  const downloadLogo = async () => {
    const svg = generateLogoSVG(size.width, size.height, theme);
    const blob = await svgToBlob(svg, size.width, size.height, format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ekkos-logo-${size.width}x${size.height}-${theme}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8f0] pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* ── HEADER ── */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-[#4a4a5e] hover:text-[#00f0ff] font-mono text-xs uppercase tracking-[2px] mb-8 transition-colors">
            &larr; HOME
          </Link>
          <div className="section-label mb-4">BRAND_KIT</div>
          <h1 className="text-4xl md:text-5xl font-display text-[#00f0ff] mb-3">Brand Kit</h1>
          <p className="text-[#7a7a8e] font-body text-lg max-w-2xl">
            Official assets, colors, and typography for the ekkOS_ identity. All downloads follow the angular design system.
          </p>
        </div>

        {/* ── NAV ── */}
        <nav className="flex flex-wrap gap-2 mb-16">
          {['ASSETS', 'WALLPAPERS', 'COLORS', 'TYPOGRAPHY', 'USAGE'].map(s => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              className="tag hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors"
            >
              {s}
            </a>
          ))}
        </nav>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: BRAND ASSETS                                          */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="assets" className="mb-20 scroll-mt-24">
          <div className="section-label mb-4">BRAND_ASSETS</div>
          <h2 className="text-2xl font-display text-[#e8e8f0] mb-8">Logo &amp; Lockup</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="card p-8 flex flex-col items-center justify-center min-h-[280px]">
              <div className="flex items-center gap-4 mb-6">
                <EkkosLogo size={64} animated />
                <div>
                  <span className="font-mono font-bold text-3xl text-[#00f0ff]">ekkOS</span>
                  <span className="font-mono font-bold text-3xl text-[#ffb800] cursor-blink">_</span>
                  <sup className="text-[#4a4a5e] text-xs ml-1 font-mono">TM</sup>
                </div>
              </div>
              <p className="text-[#4a4a5e] font-mono text-xs uppercase tracking-[2px]">
                JetBrains Mono 700 + Pixel Grid Icon
              </p>
            </div>

            {/* Config Panel */}
            <div className="card p-6">
              <div className="space-y-5">
                {/* Size */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[2px] text-[#4a4a5e] mb-2 block">Size</label>
                  <select
                    value={sizeIdx}
                    onChange={e => setSizeIdx(Number(e.target.value))}
                    className="w-full bg-[#0d0d14] border border-[#1a1a2e] text-[#e8e8f0] font-mono text-sm px-4 py-3 clip-sm focus:outline-none focus:border-[#00f0ff] transition-colors"
                  >
                    {logoSizes.map((s, i) => (
                      <option key={i} value={i}>{s.label} ({s.width}&times;{s.height})</option>
                    ))}
                  </select>
                </div>

                {/* Theme */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[2px] text-[#4a4a5e] mb-2 block">Theme</label>
                  <div className="flex gap-2">
                    {(['dark', 'transparent'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex-1 px-4 py-2 clip-sm font-mono text-xs uppercase tracking-[1px] border transition-all ${
                          theme === t
                            ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]'
                            : 'border-[#1a1a2e] text-[#7a7a8e] hover:border-[#2a2a3e] hover:text-[#e8e8f0]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[2px] text-[#4a4a5e] mb-2 block">Format</label>
                  <div className="flex gap-2">
                    {(['svg', 'png'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`flex-1 px-4 py-2 clip-sm font-mono text-xs uppercase tracking-[1px] border transition-all ${
                          format === f
                            ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]'
                            : 'border-[#1a1a2e] text-[#7a7a8e] hover:border-[#2a2a3e] hover:text-[#e8e8f0]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download */}
                <button onClick={downloadLogo} className="btn-primary w-full mt-2">
                  DOWNLOAD_ASSET &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: WALLPAPER GALLERY                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="wallpapers" className="mb-20 scroll-mt-24">
          <div className="section-label mb-4">WALLPAPER_GALLERY</div>
          <h2 className="text-2xl font-display text-[#e8e8f0] mb-2">Cinematic Wallpapers</h2>
          <p className="text-[#7a7a8e] font-body mb-8">
            AI-generated 4K wallpapers rendered with Imagen 4. Each available in desktop and mobile formats.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallpapers.map(wp => (
              <div key={wp.id} className="card group relative overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/images/wallpapers/thumbs/${wp.id}-desktop.jpg`}
                    alt={wp.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Top glow on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info + Downloads */}
                <div className="p-4">
                  <h3 className="font-mono text-xs uppercase tracking-[2px] text-[#e8e8f0] mb-3">{wp.name}</h3>
                  <div className="flex gap-2">
                    <a
                      href={`/images/wallpapers/${wp.id}-desktop.png`}
                      download
                      className="btn-secondary flex-1 flex items-center justify-center gap-2 text-[10px] py-2"
                    >
                      <Monitor className="w-3 h-3" /> DESKTOP 4K
                    </a>
                    <a
                      href={`/images/wallpapers/${wp.id}-mobile.png`}
                      download
                      className="btn-secondary flex-1 flex items-center justify-center gap-2 text-[10px] py-2"
                    >
                      <Smartphone className="w-3 h-3" /> MOBILE
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: COLOR SYSTEM                                          */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="colors" className="mb-20 scroll-mt-24">
          <div className="section-label mb-4">COLOR_SYSTEM</div>
          <h2 className="text-2xl font-display text-[#e8e8f0] mb-8">Palette</h2>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-[2px]">
            {colors.map(c => (
              <button
                key={c.hex}
                onClick={() => copy(c.hex)}
                className="card p-0 text-left group cursor-pointer hover:border-[#00f0ff]/30 transition-colors"
              >
                <div className="h-16" style={{ backgroundColor: c.hex }} />
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-[1px] text-[#e8e8f0]">{c.name}</span>
                    {copied === c.hex
                      ? <Check className="w-3 h-3 text-[#00ff88]" />
                      : <Copy className="w-3 h-3 text-[#4a4a5e] opacity-0 group-hover:opacity-100 transition-opacity" />
                    }
                  </div>
                  <span className="font-mono text-[10px] text-[#4a4a5e]">{c.hex}</span>
                  <p className="font-body text-[10px] text-[#4a4a5e] mt-1">{c.role}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: TYPOGRAPHY                                            */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="typography" className="mb-20 scroll-mt-24">
          <div className="section-label mb-4">TYPE_SYSTEM</div>
          <h2 className="text-2xl font-display text-[#e8e8f0] mb-8">Typography</h2>

          <div className="space-y-4">
            {fonts.map(f => (
              <div key={f.name} className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                  <h3 className={`${f.class} text-xl text-[#e8e8f0]`}>{f.name}</h3>
                  <span className="tag">{f.role}</span>
                </div>
                <p className={`${f.class} text-lg text-[#7a7a8e] mb-3 leading-relaxed`}>{f.sample}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {f.weights.map(w => (
                    <span key={w} className="font-mono text-[10px] text-[#4a4a5e] border border-[#1a1a2e] px-2 py-0.5 clip-sm">
                      {w}
                    </span>
                  ))}
                </div>
                <p className="font-body text-xs text-[#4a4a5e]">{f.usage}</p>
              </div>
            ))}
          </div>

          {/* Font Import URL */}
          <div className="terminal mt-6">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a2e]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff3366]" />
                <div className="w-2 h-2 bg-[#ffb800]" />
                <div className="w-2 h-2 bg-[#00ff88]" />
              </div>
              <span className="font-mono text-[10px] text-[#4a4a5e] uppercase tracking-[2px]">Google Fonts Import</span>
              <button
                onClick={() => copy(FONT_IMPORT_URL)}
                className="text-[#4a4a5e] hover:text-[#00f0ff] transition-colors"
              >
                {copied === FONT_IMPORT_URL ? <Check className="w-3 h-3 text-[#00ff88]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <code className="font-mono text-xs text-[#00f0ff] whitespace-nowrap">{FONT_IMPORT_URL}</code>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: USAGE PROTOCOL                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="usage" className="mb-16 scroll-mt-24">
          <div className="section-label mb-4">USAGE_PROTOCOL</div>
          <h2 className="text-2xl font-display text-[#e8e8f0] mb-8">Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DO */}
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[2px] text-[#00ff88] mb-4">Approved</h3>
              <ul className="space-y-3">
                {[
                  'Use the official logo without modifications',
                  'Maintain minimum 20% clear space around logo',
                  'Use provided color schemes from the palette',
                  'Use angular clip-paths for all UI elements',
                  'Reference this design system for implementation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#00ff88] mt-1.5 shrink-0" />
                    <span className="font-body text-sm text-[#7a7a8e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-[2px] text-[#ff3366] mb-4">Prohibited</h3>
              <ul className="space-y-3">
                {[
                  'Alter logo colors, proportions, or typography',
                  'Add effects, shadows, or distortions to the logo',
                  'Use rounded corners or border-radius anywhere',
                  'Substitute fonts (Inter, Roboto, system fonts)',
                  'Use emoji in UI elements',
                  'Imply endorsement without written permission',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#ff3366] mt-1.5 shrink-0" />
                    <span className="font-body text-sm text-[#7a7a8e]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <div className="text-center pt-8 border-t border-[#1a1a2e]">
          <p className="text-[#4a4a5e] font-body text-sm">
            Questions about brand usage? Contact{' '}
            <a href="mailto:hello@ekkos.dev" className="text-[#00f0ff] hover:underline transition-colors">
              hello@ekkos.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
