import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent — used sparingly for emphasis
        cyan: {
          DEFAULT: '#00f0ff',
          dim: 'rgba(0, 240, 255, 0.2)',
          glow: 'rgba(0, 240, 255, 0.4)',
        },

        // Secondary signals
        amber: {
          DEFAULT: '#ffb800',
          dim: 'rgba(255, 184, 0, 0.2)',
        },
        green: {
          DEFAULT: '#00ff88',
        },
        red: {
          DEFAULT: '#ff3366',
        },

        // Backgrounds — layered depth
        'bg-deep': '#0a0a0f',
        'bg-panel': '#0d0d14',
        'bg-card': '#111118',
        'bg-elevated': '#16161f',

        // Borders
        border: {
          DEFAULT: '#1a1a2e',
          bright: '#2a2a3e',
        },

        // Text
        'text-primary': '#e8e8f0',
        'text-secondary': '#7a7a8e',
        'text-dim': '#4a4a5e',

        // Legacy compat (used in some pages)
        void: '#0a0a0f',
        obsidian: '#0a0a0f',
        onyx: '#111118',
        graphite: '#1a1a2e',
        slate: '#252536',
        success: { emerald: '#00ff88' },
        warning: { amber: '#ffb800' },
        danger: { rose: '#ff3366' },
        info: { cyan: '#00f0ff' },
      },

      fontFamily: {
        display: ['"Share Tech Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },

      boxShadow: {
        'glow-cyan': '0 0 60px rgba(0, 240, 255, 0.3)',
        'glow-cyan-sm': '0 0 20px rgba(0, 240, 255, 0.2)',
        'glow-amber': '0 0 60px rgba(255, 184, 0, 0.3)',
        'glow-green': '0 0 60px rgba(0, 255, 136, 0.3)',
      },

      animation: {
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stream': 'stream 4s linear infinite',
        'pulse-slow': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'type-line': 'typeLine 0.3s ease forwards',
        'glow': 'glowPulse 2s ease-in-out infinite alternate',
      },

      keyframes: {
        cursorBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stream: {
          '0%': { top: '-40%' },
          '100%': { top: '100%' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 136, 0.4)' },
          '50%': { boxShadow: '0 0 0 6px rgba(0, 255, 136, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        typeLine: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
