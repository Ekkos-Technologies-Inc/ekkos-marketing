import Image from 'next/image';

function EkkosLogoSvg() {
  return (
    <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 L70 0 L80 10 L80 70 L70 80 L10 80 L0 70 L0 10 Z" stroke="#00f0ff" strokeWidth="1.5" fill="#0d0d14"/>
      <line x1="2" y1="12" x2="12" y2="2" stroke="#00f0ff" strokeWidth="0.5" opacity="0.25"/>
      <line x1="68" y1="2" x2="78" y2="12" stroke="#00f0ff" strokeWidth="0.5" opacity="0.25"/>
      <line x1="2" y1="68" x2="12" y2="78" stroke="#00f0ff" strokeWidth="0.5" opacity="0.25"/>
      <line x1="68" y1="78" x2="78" y2="68" stroke="#00f0ff" strokeWidth="0.5" opacity="0.25"/>
      <line x1="16" y1="16" x2="64" y2="16" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="16" y1="28" x2="64" y2="28" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="16" y1="40" x2="64" y2="40" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="16" y1="52" x2="64" y2="52" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="16" y1="64" x2="64" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="16" y1="16" x2="16" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="28" y1="16" x2="28" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="40" y1="16" x2="40" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="52" y1="16" x2="52" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
      <line x1="64" y1="16" x2="64" y2="64" stroke="#00f0ff" strokeWidth="0.5" opacity="0.12"/>
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
    </svg>
  );
}

export function NvidiaPartnershipCard() {
  return (
    <div className="relative max-w-[680px] mx-auto">
      {/* Card */}
      <div
        className="relative bg-bg-panel border border-[#1a1a2e] p-12 md:px-14"
        style={{
          clipPath: 'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-3 left-5 w-6 h-px bg-cyan opacity-50" />
        <div className="absolute bottom-3 right-5 w-6 h-px bg-cyan opacity-50" />
        <div className="absolute top-5 left-3 w-px h-6 bg-cyan opacity-50" />
        <div className="absolute bottom-5 right-3 w-px h-6 bg-cyan opacity-50" />

        {/* Status line */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] shadow-[0_0_8px_#76b900] animate-pulse-slow" />
          <span className="font-display text-[10px] tracking-[0.2em] uppercase text-cyan opacity-60">
            Partnership // Active
          </span>
        </div>

        {/* Logos row */}
        <div className="flex items-center gap-10 mb-9">
          <EkkosLogoSvg />
          <div
            className="w-px h-[60px] flex-shrink-0"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.12) 20%, rgba(0,240,255,0.25) 50%, rgba(0,240,255,0.12) 80%, transparent)',
            }}
          />
          <Image
            src="/nvidia-inception-badge.svg"
            alt="NVIDIA Inception Program"
            width={240}
            height={100}
            className="h-[100px] w-auto"
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-[13px] tracking-[0.15em] uppercase text-text-primary mb-3">
          ekkOS_ × <span className="text-[#76b900]">NVIDIA Inception</span> Program
        </h3>

        {/* Body */}
        <p className="text-sm leading-[1.7] text-text-secondary font-light max-w-[520px] font-body">
          ekkOS Technologies is a member of the NVIDIA Inception program,
          accelerating our development of persistent memory infrastructure for AI
          coding agents through access to NVIDIA&apos;s ecosystem of tools, expertise,
          and go-to-market support.
        </p>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-[#1a1a2e] flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-secondary/50">
            ekkOS Technologies Inc.
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-secondary/50">
            Member since <span className="text-amber">2025</span>
          </span>
        </div>

        {/* Legal */}
        <p className="mt-4 text-[9px] leading-relaxed text-text-secondary/30 font-body">
          © 2025 NVIDIA, the NVIDIA logo are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
        </p>
      </div>
    </div>
  );
}
