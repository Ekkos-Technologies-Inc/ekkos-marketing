import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pulse — Runtime Continuity & Observability for Long AI Sessions',
  description:
    'Pulse preserves runtime context with cache-stable proxy behavior, smart compression, and live observability for long AI coding sessions.',
  keywords: [
    'AI runtime continuity',
    'cache-stable proxy',
    'AI session observability',
    'context compression',
    'Pulse ekkOS',
  ],
  alternates: {
    canonical: 'https://ekkos.dev/pulse',
  },
  openGraph: {
    title: 'Pulse — Runtime Continuity & Observability',
    description:
      'Long AI coding sessions, without context collapse. Cache-stable proxy + smart compression + live runtime telemetry.',
    url: 'https://ekkos.dev/pulse',
    type: 'website',
    images: [
      {
        url: '/og/pulse.png',
        width: 1200,
        height: 630,
        alt: 'ekkOS Pulse — Runtime Continuity & Observability',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse — Runtime Continuity & Observability',
    description:
      'Cache-stable proxy and smart compression for durable long-session AI runtime state.',
    images: ['/og/pulse.png'],
  },
};

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
