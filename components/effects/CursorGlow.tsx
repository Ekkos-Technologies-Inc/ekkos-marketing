'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const rippleIdRef = useRef(0);

  // Handle ripple creation on click
  const createRipple = useCallback((x: number, y: number) => {
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { id, x, y }]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile);
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Smooth lerp animation
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      const glow = glowRef.current;
      if (!glow) return;

      // Lerp current position towards target
      currentPosRef.current.x = lerp(
        currentPosRef.current.x,
        targetPosRef.current.x,
        0.15
      );
      currentPosRef.current.y = lerp(
        currentPosRef.current.y,
        targetPosRef.current.y,
        0.15
      );

      // Center the glow on the cursor position
      const glowSize = 300;
      glow.style.left = `${currentPosRef.current.x - glowSize / 2}px`;
      glow.style.top = `${currentPosRef.current.y - glowSize / 2}px`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, createRipple]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* Click ripple waves */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        >
          {/* Multiple expanding rings for wave effect */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                border: '2px solid rgba(139, 92, 246, 0.6)',
                animation: `rippleWave 1s ease-out forwards`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      ))}

      {/* Ripple animation styles */}
      <style jsx global>{`
        @keyframes rippleWave {
          0% {
            width: 20px;
            height: 20px;
            opacity: 0.8;
            border-width: 3px;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            border-width: 1px;
          }
        }
      `}</style>
    </>
  );
}
