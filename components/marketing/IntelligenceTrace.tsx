'use client';

import { useEffect, useState, useRef } from 'react';
import { Brain, CheckCircle2 } from 'lucide-react';

/**
 * IntelligenceTrace - Streaming "Live Intelligence Trace" component
 *
 * Shows outcome-focused narration of what ekkOS is doing, without revealing architecture.
 * This gives emotional proof, not technical proof.
 */

interface TraceMessage {
  text: string;
  delay: number; // ms before showing next message
  icon?: 'brain' | 'check';
}

const TRACE_SEQUENCES: TraceMessage[][] = [
  // Sequence 1: Authentication setup
  [
    { text: 'ekkOS_Search: Looking for similar authentication solutions…', delay: 1200 },
    { text: 'ekkOS_Context: Found relevant setup from your past work', delay: 1400 },
    { text: 'ekkOS_Recall: Applying your preferred conventions', delay: 1000 },
    { text: 'ekkOS_Conflict: Validating against your rules…', delay: 1100 },
    { text: 'ekkOS_Conflict: No conflicts detected', delay: 800, icon: 'check' },
    { text: 'ekkOS_Forge: Ready to capture this solution', delay: 2000, icon: 'check' },
  ],
  // Sequence 2: API integration
  [
    { text: 'ekkOS_Search: Searching for API integration patterns…', delay: 1300 },
    { text: 'ekkOS_Context: Found 3 relevant solutions', delay: 1200 },
    { text: 'ekkOS_Recall: Matching your error handling preferences', delay: 1000 },
    { text: 'ekkOS_Conflict: Checking against existing code style…', delay: 1100 },
    { text: 'ekkOS_Conflict: All checks passed', delay: 800, icon: 'check' },
    { text: 'ekkOS_Outcome: Verified solution ready', delay: 2000, icon: 'check' },
  ],
  // Sequence 3: Bug fix
  [
    { text: 'ekkOS_Search: Looking for patterns matching this error…', delay: 1200 },
    { text: 'ekkOS_Recall: Found similar issue you solved last month', delay: 1400 },
    { text: 'ekkOS_Context: Applying the fix that worked before', delay: 1100 },
    { text: 'ekkOS_Conflict: Validating against your codebase…', delay: 1000 },
    { text: 'ekkOS_Outcome: Solution verified', delay: 800, icon: 'check' },
    { text: 'ekkOS_Forge: Capturing for next time', delay: 2000, icon: 'check' },
  ],
];

export function IntelligenceTrace() {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<TraceMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = TRACE_SEQUENCES[currentSequence];

    if (currentMessageIndex < sequence.length) {
      setIsTyping(true);

      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, sequence[currentMessageIndex]]);
        setIsTyping(false);
        setCurrentMessageIndex(prev => prev + 1);

        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, sequence[currentMessageIndex].delay);

      return () => clearTimeout(timer);
    } else {
      // Wait and reset to next sequence
      const resetTimer = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentMessageIndex(0);
        setCurrentSequence((prev) => (prev + 1) % TRACE_SEQUENCES.length);
      }, 3000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, currentSequence]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="terminal p-0 overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#1a1a2e]">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#ff3366]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className="w-2.5 h-2.5 bg-[#ffb800]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className="w-2.5 h-2.5 bg-[#00ff88]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#00f0ff]" />
            <span className="text-xs font-mono text-[#7a7a8e] uppercase tracking-wider">ekkOS Intelligence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#00ff88] animate-pulse-dot" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-[10px] font-mono text-[#00ff88] uppercase tracking-widest">Active</span>
          </div>
        </div>

        {/* Trace Messages */}
        <div
          ref={containerRef}
          className="font-mono text-sm space-y-1.5 min-h-[180px] max-h-[200px] overflow-y-auto scrollbar-hide p-5"
        >
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className="flex items-start gap-2 animate-fade-in"
              style={{ animationDelay: '0ms' }}
            >
              <span className="text-[#00f0ff] select-none font-display">&gt;</span>
              <span className={msg.icon === 'check' ? 'text-[#00ff88]' : 'text-[#7a7a8e]'}>
                {msg.text}
              </span>
              {msg.icon === 'check' && (
                <CheckCircle2 className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-[#4a4a5e]">
              <span className="text-[#00f0ff] select-none font-display">&gt;</span>
              <span className="cursor-blink">_</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1a1a2e]">
          <p className="text-[10px] font-mono text-[#4a4a5e] text-center uppercase tracking-widest">
            While your AI works, ekkOS quietly recalls what worked before, applies your preferences, and helps you avoid repeat mistakes.
          </p>
        </div>
      </div>
    </div>
  );
}
