import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cortex — Structured Context & Repo Intelligence',
  description:
    'Cortex turns session context into structured, reusable system intelligence: directives, patterns, living docs, and repo-aware context injection.',
  keywords: [
    'structured context',
    'repo intelligence',
    'AI directives',
    'pattern memory',
    'Cortex ekkOS',
  ],
  alternates: {
    canonical: 'https://ekkos.dev/cortex',
  },
  openGraph: {
    title: 'Cortex — Structured Context for Systems That Remember',
    description:
      'Persistent directives, forged patterns, living docs, and inspectable repo intelligence that compounds over time.',
    url: 'https://ekkos.dev/cortex',
    type: 'website',
    images: [
      {
        url: '/og/cortex.png',
        width: 1200,
        height: 630,
        alt: 'ekkOS Cortex — Structured Context & Repo Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cortex — Structured Context & Repo Intelligence',
    description:
      'Turn raw session context into lasting, inspectable system intelligence for your repo.',
    images: ['/og/cortex.png'],
  },
};

export default function CortexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
