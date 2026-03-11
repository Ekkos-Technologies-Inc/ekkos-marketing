'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Database,
  Loader2,
  MessageSquare,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  User,
  Zap
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

// Types
interface MemoryOperation {
  id: string;
  type: 'search' | 'found' | 'not_found' | 'forge' | 'apply' | 'outcome';
  content: string;
  detail?: string;
  patternId?: string;
}

interface DemoStep {
  type: 'user' | 'memory_op' | 'assistant' | 'delay';
  content?: string;
  memoryOps?: MemoryOperation[];
  badge?: 'forged' | 'applied' | 'verified';
  delay?: number;
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Clock;
  color: string;
  steps: DemoStep[];
}

// Scenarios showing real Golden Loop workflow
const SCENARIOS: Scenario[] = [
  {
    id: 'session1',
    title: 'Session 1',
    subtitle: 'First Pattern Capture',
    icon: Clock,
    color: '#00f0ff',
    steps: [
      { type: 'user', content: 'How do I handle Supabase auth errors gracefully?' },
      { type: 'delay', delay: 400 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '1', type: 'search', content: 'Searching memory...', detail: 'supabase auth error handling' },
        ]
      },
      { type: 'delay', delay: 800 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '2', type: 'not_found', content: 'No patterns found', detail: 'This is a new problem' },
        ]
      },
      { type: 'delay', delay: 300 },
      {
        type: 'assistant',
        content: `Here's how to handle Supabase auth errors:

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

if (error) {
  // Map to user-friendly messages
  const messages: Record<string, string> = {
    'Invalid login credentials': 'Wrong email or password',
    'Email not confirmed': 'Please check your email',
  };
  toast.error(messages[error.message] ?? 'Login failed');
  return;
}
\`\`\``
      },
      { type: 'delay', delay: 500 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '3', type: 'forge', content: 'Pattern forged', detail: 'supabase-auth-error-handling', patternId: 'pat_7x8k2' },
        ]
      },
    ],
  },
  {
    id: 'session2',
    title: 'Session 2',
    subtitle: 'Pattern Reuse',
    icon: Target,
    color: '#00ff88',
    steps: [
      { type: 'user', content: 'The password reset is showing raw error codes to users' },
      { type: 'delay', delay: 400 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '1', type: 'search', content: 'Searching memory...', detail: 'password reset error display' },
        ]
      },
      { type: 'delay', delay: 600 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '2', type: 'found', content: 'Pattern found', detail: 'supabase-auth-error-handling', patternId: 'pat_7x8k2' },
        ]
      },
      { type: 'delay', delay: 300 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '3', type: 'apply', content: 'Applying pattern', detail: 'Validation checks passed' },
        ]
      },
      { type: 'delay', delay: 200 },
      {
        type: 'assistant',
        content: `Based on your existing auth error handling pattern, here's the fix:

\`\`\`typescript
// Use your established error mapping approach
const { error } = await supabase.auth.resetPasswordForEmail(email);

if (error) {
  const messages: Record<string, string> = {
    'User not found': 'No account with this email',
    'Rate limit exceeded': 'Too many attempts, try later',
  };
  toast.error(messages[error.message] ?? 'Reset failed');
}
\`\`\`

This follows the same pattern you used for login errors.`,
        badge: 'applied'
      },
      { type: 'delay', delay: 400 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '4', type: 'outcome', content: 'Success recorded', detail: 'Outcome signal logged for reinforcement' },
        ]
      },
    ],
  },
  {
    id: 'session3',
    title: 'Session 3',
    subtitle: 'Multi-Pattern Execution',
    icon: TrendingUp,
    color: '#ffb800',
    steps: [
      { type: 'user', content: 'Add OAuth with Google, show proper errors, and remember the user' },
      { type: 'delay', delay: 400 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '1', type: 'search', content: 'Searching memory...', detail: 'oauth google error handling session' },
        ]
      },
      { type: 'delay', delay: 500 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '2', type: 'found', content: 'Multiple patterns found', detail: 'Combining knowledge' },
        ]
      },
      { type: 'delay', delay: 200 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '3', type: 'apply', content: 'supabase-auth-error-handling', patternId: 'pat_7x8k2' },
          { id: '4', type: 'apply', content: 'supabase-oauth-config', patternId: 'pat_9m3n1' },
          { id: '5', type: 'apply', content: 'session-persistence', patternId: 'pat_2k4j8' },
        ]
      },
      { type: 'delay', delay: 200 },
      {
        type: 'assistant',
        content: `Here's the complete OAuth flow using your established patterns:

\`\`\`typescript
// OAuth handler (pattern: supabase-oauth-config)
const handleGoogleAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: \`\${origin}/auth/callback\` }
  });

  // Error handling (pattern: supabase-auth-error-handling)
  if (error) {
    const messages = { 'access_denied': 'Google sign-in cancelled' };
    toast.error(messages[error.message] ?? 'Sign-in failed');
  }
};

// Session persistence (pattern: session-persistence)
supabase.auth.onAuthStateChange((event, session) => {
  if (session) localStorage.setItem('user', JSON.stringify(session.user));
});
\`\`\`

Selected patterns verified and applied.`,
        badge: 'verified'
      },
      { type: 'delay', delay: 300 },
      {
        type: 'memory_op',
        memoryOps: [
          { id: '6', type: 'outcome', content: 'Patterns verified', detail: 'Outcome signal logged for reinforcement' },
        ]
      },
    ],
  },
];

// Memory operation display component
function MemoryOpDisplay({ op, isNew }: { op: MemoryOperation; isNew: boolean }) {
  const getIcon = () => {
    switch (op.type) {
      case 'search': return <Search className="w-3.5 h-3.5 text-[#00f0ff]" />;
      case 'found': return <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88]" />;
      case 'not_found': return <AlertCircle className="w-3.5 h-3.5 text-[#ffb800]" />;
      case 'forge': return <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />;
      case 'apply': return <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />;
      case 'outcome': return <Check className="w-3.5 h-3.5 text-[#00ff88]" />;
    }
  };

  const getBorderColor = () => {
    switch (op.type) {
      case 'search': return 'border-[#00f0ff]/20';
      case 'found': return 'border-[#00ff88]/20';
      case 'not_found': return 'border-[#ffb800]/20';
      case 'forge': return 'border-[#00f0ff]/20';
      case 'apply': return 'border-[#00f0ff]/20';
      case 'outcome': return 'border-[#00ff88]/20';
    }
  };

  return (
    <motion.div
      initial={isNew ? { opacity: 0, x: -10 } : false}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-2 px-3 py-2 clip-sm bg-[#0d0d14]/80 border ${getBorderColor()}`}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#e8e8f0]">{op.content}</span>
        </div>
        {op.detail && (
          <div className="text-[11px] text-[#4a4a5e] font-mono truncate">{op.detail}</div>
        )}
      </div>
      {op.type === 'search' && (
        <Loader2 className="w-3 h-3 text-[#00f0ff] animate-spin" />
      )}
    </motion.div>
  );
}

// Typing indicator
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <span className="cursor-blink">_</span>
    </div>
  );
}

// Message bubble with enhanced features
function MessageBubble({
  content,
  role,
  badge,
  onComplete
}: {
  content: string;
  role: 'user' | 'assistant';
  badge?: 'forged' | 'applied' | 'verified';
  onComplete?: () => void;
}) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(role === 'assistant');

  useEffect(() => {
    if (role === 'user') {
      setDisplayedContent(content);
      onComplete?.();
      return;
    }

    let index = 0;
    setIsTyping(true);

    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete?.();
      }
    }, 12);

    return () => clearInterval(interval);
  }, [content, role, onComplete]);

  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 clip-sm bg-[#00f0ff] flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-[#0a0a0f]" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`clip-md px-4 py-3 ${
            isUser
              ? 'bg-[#16161f] border border-[#2a2a3e]'
              : 'bg-[#0d0d14]/80 border border-[#1a1a2e]'
          }`}
        >
          <pre className="text-sm text-[#e8e8f0] whitespace-pre-wrap font-mono leading-relaxed">
            {displayedContent}
            {isTyping && <span className="cursor-blink">_</span>}
          </pre>
        </div>
        {badge && !isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 flex items-center gap-2"
          >
            {badge === 'forged' && (
              <span className="tag gap-1.5">
                <Sparkles className="w-3 h-3" />
                Pattern Forged
              </span>
            )}
            {badge === 'applied' && (
              <span className="tag gap-1.5 border-[#00f0ff]/30 text-[#00f0ff]">
                <Zap className="w-3 h-3" />
                Pattern Applied
              </span>
            )}
            {badge === 'verified' && (
              <span className="tag gap-1.5 border-[#00ff88]/30 text-[#00ff88]">
                <Shield className="w-3 h-3" />
                Patterns Verified
              </span>
            )}
          </motion.div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 clip-sm bg-[#16161f] border border-[#2a2a3e] flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-[#e8e8f0]" />
        </div>
      )}
    </motion.div>
  );
}

export function InteractiveDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [memoryOps, setMemoryOps] = useState<MemoryOperation[]>([]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; badge?: 'forged' | 'applied' | 'verified' }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[activeScenario];

  const playDemo = useCallback(() => {
    setMessages([]);
    setMemoryOps([]);
    setCurrentStepIndex(0);
    setShowTyping(false);
    setIsPlaying(true);
  }, []);

  // Process steps sequentially
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= scenario.steps.length) {
      if (currentStepIndex >= scenario.steps.length) {
        setIsPlaying(false);
      }
      return;
    }

    const step = scenario.steps[currentStepIndex];

    const processStep = () => {
      switch (step.type) {
        case 'user':
          setMessages(prev => [...prev, { role: 'user', content: step.content! }]);
          setShowTyping(true);
          setCurrentStepIndex(prev => prev + 1);
          break;

        case 'memory_op':
          if (step.memoryOps) {
            setMemoryOps(prev => [...prev, ...step.memoryOps!]);
          }
          setCurrentStepIndex(prev => prev + 1);
          break;

        case 'assistant':
          setShowTyping(false);
          setMessages(prev => [...prev, { role: 'assistant', content: step.content!, badge: step.badge }]);
          // Don't increment here - will be done in onComplete
          break;

        case 'delay':
          timeoutRef.current = setTimeout(() => {
            setCurrentStepIndex(prev => prev + 1);
          }, step.delay);
          break;
      }
    };

    // Small delay between steps for visual effect
    const delay = step.type === 'delay' ? 0 : 100;
    timeoutRef.current = setTimeout(processStep, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, currentStepIndex, scenario.steps]);

  const handleMessageComplete = useCallback(() => {
    setCurrentStepIndex(prev => prev + 1);
  }, []);

  const handleScenarioChange = (index: number) => {
    setActiveScenario(index);
    setMessages([]);
    setMemoryOps([]);
    setCurrentStepIndex(0);
    setShowTyping(false);
    setIsPlaying(false);
    // Auto-play after brief delay
    setTimeout(() => setIsPlaying(true), 300);
  };

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => playDemo(), 500);
    return () => clearTimeout(timer);
  }, [playDemo]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  return (
    <section className="py-24 px-6" id="demo">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="tag gap-2 inline-flex">
                <Terminal className="w-4 h-4" />
                The Golden Loop in Action
              </span>
              <span className="tag inline-flex border-[#ffb800]/30 text-[#ffb800]">
                Illustrative demo
              </span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display text-[#e8e8f0] tracking-tight"
          >
            Watch Your AI Get Smarter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#7a7a8e] font-body max-w-2xl mx-auto"
          >
            Illustrative demo of how ekkOS searches memory, applies learned patterns, and compounds knowledge over time.
            This sequence is not live telemetry.
          </motion.p>
        </div>

        {/* Scenario Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(i)}
                className={`flex items-center gap-2 px-5 py-3 clip-md text-sm font-mono uppercase tracking-wide transition-all ${
                  activeScenario === i
                    ? 'bg-[#111118]/85 border border-[#00f0ff]/40 text-[#00f0ff]'
                    : 'bg-[#0d0d14]/80 border border-[#1a1a2e] text-[#7a7a8e] hover:text-[#e8e8f0] hover:border-[#2a2a3e]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-bold">{s.title}</span>
                <span className="text-xs opacity-70">{s.subtitle}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="terminal p-0 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr,280px] divide-y lg:divide-y-0 lg:divide-x divide-[#1a1a2e]">
              {/* Chat Area */}
              <div className="flex flex-col">
                {/* Scenario Header */}
                <div className="px-6 py-4 bg-[#0d0d14]/80 border-b border-[#1a1a2e]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Traffic light dots */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 bg-[#ff3366]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                        <div className="w-2.5 h-2.5 bg-[#ffb800]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                        <div className="w-2.5 h-2.5 bg-[#00ff88]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                      </div>
                      <div>
                        <h3 className="font-mono text-sm text-[#e8e8f0] uppercase tracking-wide">{scenario.title}: {scenario.subtitle}</h3>
                      </div>
                    </div>
                    <button
                      onClick={playDemo}
                      disabled={isPlaying}
                      className="btn-secondary py-1.5 px-3 text-[10px] disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                      Replay
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div ref={chatRef} className="flex-1 h-[380px] p-6 overflow-y-auto space-y-4 scrollbar-hide">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, index) => (
                      <MessageBubble
                        key={`${scenario.id}-${index}`}
                        {...msg}
                        onComplete={index === messages.length - 1 && msg.role === 'assistant' ? handleMessageComplete : undefined}
                      />
                    ))}
                  </AnimatePresence>
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 clip-sm bg-[#00f0ff] flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-[#0a0a0f]" />
                      </div>
                      <div className="clip-md bg-[#0d0d14]/80 border border-[#1a1a2e]">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Memory Operations Sidebar */}
              <div className="flex flex-col bg-[#0a0a0f]">
                <div className="px-4 py-3 border-b border-[#1a1a2e]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#00f0ff]" />
                    <span className="text-xs font-mono text-[#e8e8f0] uppercase tracking-wider">ekkOS Memory</span>
                  </div>
                  <p className="text-[10px] text-[#4a4a5e] font-mono mt-0.5 uppercase tracking-widest">Real-time memory operations</p>
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[380px] lg:max-h-none scrollbar-hide">
                  <AnimatePresence mode="popLayout">
                    {memoryOps.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-[#4a4a5e] text-sm font-mono"
                      >
                        <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <span className="uppercase tracking-wider text-xs">Waiting for query...</span>
                      </motion.div>
                    ) : (
                      memoryOps.map((op, i) => (
                        <MemoryOpDisplay
                          key={op.id}
                          op={op}
                          isNew={i === memoryOps.length - 1}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#1a1a2e] bg-[#0d0d14]/80">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-mono text-[#4a4a5e]">
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {scenario.id === 'session1' && 'New problems become reusable patterns automatically'}
                    {scenario.id === 'session2' && 'Related questions recall and apply existing knowledge'}
                    {scenario.id === 'session3' && 'Complex tasks combine multiple patterns in one workflow'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-[#4a4a5e] uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#00f0ff]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    Forge
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#00f0ff]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    Apply
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#00ff88]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    Verify
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats / Value Prop Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="card p-6 h-full text-center">
              <div className="w-12 h-12 clip-sm bg-[#0d0d14]/80 border border-[#00f0ff]/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Search First</h3>
              <p className="text-sm text-[#7a7a8e] font-body leading-relaxed">
                Every question triggers a memory search. Your AI checks what it already knows before answering.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="card p-6 h-full text-center">
              <div className="w-12 h-12 clip-sm bg-[#0d0d14]/80 border border-[#00ff88]/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-[#00ff88]" />
              </div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Forge Patterns</h3>
              <p className="text-sm text-[#7a7a8e] font-body leading-relaxed">
                Solutions that work get saved automatically. Anti-patterns from failures are recorded too.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="card p-6 h-full text-center">
              <div className="w-12 h-12 clip-sm bg-[#0d0d14]/80 border border-[#ffb800]/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-[#ffb800]" />
              </div>
              <h3 className="text-lg font-display text-[#e8e8f0] mb-2">Compound Learning</h3>
              <p className="text-sm text-[#7a7a8e] font-body leading-relaxed">
                Outcome signals reinforce effective patterns and decay weak ones over time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
