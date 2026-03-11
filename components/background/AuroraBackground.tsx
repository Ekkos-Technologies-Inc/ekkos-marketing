'use client';

import { useEffect, useRef, useState } from 'react';

export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of viewport
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Multiple gradient orbs with different animation durations */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          left: `${40 + mousePosition.x * 0.02}%`,
          top: `${20 + mousePosition.y * 0.02}%`,
          animation: 'aurora-1 15s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, transparent 70%)',
          left: `${60 + mousePosition.x * 0.03}%`,
          top: `${60 + mousePosition.y * 0.03}%`,
          animation: 'aurora-2 23s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          left: `${20 + mousePosition.x * 0.025}%`,
          top: `${70 + mousePosition.y * 0.025}%`,
          animation: 'aurora-3 17s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          left: `${75 + mousePosition.x * 0.035}%`,
          top: `${30 + mousePosition.y * 0.035}%`,
          animation: 'aurora-4 19s ease-in-out infinite',
        }}
      />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <style jsx>{`
        @keyframes aurora-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 30px) scale(0.9);
          }
          75% {
            transform: translate(50px, 20px) scale(1.05);
          }
        }

        @keyframes aurora-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 40px) scale(1.08);
          }
          66% {
            transform: translate(30px, -30px) scale(0.92);
          }
        }

        @keyframes aurora-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          30% {
            transform: translate(40px, 30px) scale(0.95);
          }
          60% {
            transform: translate(-30px, -40px) scale(1.1);
          }
        }

        @keyframes aurora-4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          40% {
            transform: translate(-50px, -20px) scale(1.05);
          }
          80% {
            transform: translate(40px, 40px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
