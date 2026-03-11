'use client';

import Image from 'next/image';

export function AstronautHero() {
  return (
    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[280px] md:w-[350px] lg:w-[420px] xl:w-[480px] h-auto aspect-[500/620] pointer-events-none select-none hidden lg:block z-0">
      {/* Angular cyan glow frame */}
      <div
        className="absolute inset-[-2px] clip-lg opacity-20 animate-glow"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(0, 240, 255, 0.3) 50%, transparent 60%)',
        }}
      />

      {/* Data stream lines around astronaut */}
      <div className="data-stream left-[5%]" style={{ animationDelay: '0s' }} />
      <div className="data-stream right-[8%]" style={{ animationDelay: '1.5s' }} />
      <div className="data-stream left-[15%]" style={{ animationDelay: '3s' }} />

      {/* Astronaut SVG with gentle floating animation */}
      <div
        className="relative w-full h-full"
        style={{ animation: 'floatGentle 8s ease-in-out infinite' }}
      >
        <Image
          src="/images/astronaut.svg"
          alt="ekkOS Memory Astronaut - Floating in the knowledge space"
          fill
          className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-700"
          priority
        />
      </div>

      {/* Angular floating particles — diamond shapes in cyan */}
      <div
        className="absolute top-[12%] left-[8%] w-2 h-2 bg-[#00f0ff]/60"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle1 5.5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[22%] right-[10%] w-1.5 h-1.5 bg-[#00f0ff]/50"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle2 6.2s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[45%] left-[5%] w-1.5 h-1.5 bg-[#00f0ff]/40"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle3 7.1s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[25%] right-[15%] w-2 h-2 bg-[#00f0ff]/50"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle4 5.8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[65%] left-[12%] w-1 h-1 bg-[#00f0ff]/30"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle5 6.8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[15%] right-[8%] w-1.5 h-1.5 bg-[#00f0ff]/40"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          animation: 'floatParticle6 6.4s ease-in-out infinite',
        }}
      />
    </div>
  );
}
