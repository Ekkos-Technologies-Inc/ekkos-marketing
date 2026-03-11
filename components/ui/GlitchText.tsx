'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const GLITCH_CHARS = '`¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒▓<>/'.split('');

// How fast each "frame" of the scramble runs (ms)
const FRAME_MS = 60;
// Delay before the scramble starts after entering view (ms)
const INITIAL_DELAY_MS = 400;

function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

/**
 * Controls how many scramble cycles each character gets before revealing:
 * 0 = wave (earlier chars reveal sooner, later chars scramble more)
 * 1 = uniform (every char scrambles exactly 4 times)
 * 2 = random (each char gets 1–6 random cycles)
 */
export type GlitchVariant = 0 | 1 | 2;
type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface GlitchTextProps {
  text: string;
  variant?: GlitchVariant;
  className?: string;
  style?: React.CSSProperties;
  as?: TagName;
  /** Only trigger once (default: true) */
  once?: boolean;
}

function getCycles(variant: GlitchVariant, charIndex: number): number {
  switch (variant) {
    case 0: return Math.max(1, Math.round(charIndex * 0.55));
    case 1: return 4;
    case 2: return Math.floor(Math.random() * 5) + 1;
  }
}

export function GlitchText({
  text,
  variant = 2,
  className = '',
  style,
  as: Tag = 'span',
  once = true,
}: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // displayChars holds what's currently rendered per character index
  const [displayChars, setDisplayChars] = useState<string[]>(() => text.split(''));

  const startGlitch = useCallback(() => {
    const chars = text.split('');

    // Pre-compute how many cycles each non-space char gets
    let nonSpaceIdx = 0;
    const maxCycles = chars.map(c => {
      if (c === ' ') return 0;
      return getCycles(variant, nonSpaceIdx++);
    });

    const currentCycles = new Array(chars.length).fill(0);

    function tick() {
      let allDone = true;

      setDisplayChars(
        chars.map((char, i) => {
          if (char === ' ') return char;
          if (currentCycles[i] >= maxCycles[i]) return char; // reveal real char
          allDone = false;
          currentCycles[i]++;
          return randChar();
        })
      );

      if (!allDone) {
        animTimer.current = setTimeout(tick, FRAME_MS);
      }
    }

    delayTimer.current = setTimeout(tick, INITIAL_DELAY_MS);
  }, [text, variant]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasTriggered.current)) {
          hasTriggered.current = true;
          startGlitch();
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animTimer.current) clearTimeout(animTimer.current);
      if (delayTimer.current) clearTimeout(delayTimer.current);
    };
  }, [once, startGlitch]);

  return (
    // @ts-expect-error — dynamic tag with forwarded ref
    <Tag
      ref={ref}
      className={`glitch-text ${className}`}
      style={style}
      aria-label={text}
    >
      {text.split('').map((origChar, i) =>
        origChar === ' ' ? (
          <span key={i} aria-hidden="true"> </span>
        ) : (
          <span key={i} aria-hidden="true" className="glitch-char">
            {displayChars[i] ?? origChar}
          </span>
        )
      )}
    </Tag>
  );
}
