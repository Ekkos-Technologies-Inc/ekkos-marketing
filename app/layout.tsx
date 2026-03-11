import { Providers } from '@/components/Providers';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { SwarmBackgroundLoader } from '@/components/background/SwarmBackgroundLoader';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ekkos.dev'),
  title: {
    default: 'ekkOS — Vibe Coding Memory Layer for Claude Code',
    template: '%s | ekkOS',
  },
  description:
    'The memory layer built for Claude Code. Persistent taste, Dream Forge, and compounding context for builders who care how products feel.',
  keywords: [
    'vibe coding memory',
    'persistent AI memory',
    'Claude Code memory layer',
    'Claude Code memory',
    'AI runtime continuity',
    'repo intelligence',
    'Dream Forge',
    'ekkOS',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/favicon-96x96.png',
  },
  alternates: {
    canonical: 'https://ekkos.dev/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'ekkOS — Vibe Coding Memory Layer for Claude Code',
    description:
      'The memory layer built for Claude Code. Persistent taste, Dream Forge, and compounding context for builders who care how products feel.',
    url: 'https://ekkos.dev/',
    type: 'website',
    siteName: 'ekkOS',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'ekkOS — Vibe Coding Memory Layer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ekkOS — Vibe Coding Memory Layer for Claude Code',
    description:
      'The memory layer built for Claude Code. Persistent taste, Dream Forge, and compounding context for builders who care how products feel.',
    images: ['/og/home.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'ekkOS',
        url: 'https://ekkos.dev',
        logo: 'https://ekkos.dev/favicon-96x96.png',
        sameAs: [
          'https://github.com/Ekkos-Technologies-Inc',
          'https://twitter.com/ekkosdev',
          'https://linkedin.com/company/ekkos',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'ekkOS',
        url: 'https://ekkos.dev',
        inLanguage: 'en',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ekkOS',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        url: 'https://ekkos.dev',
      },
    ],
  };

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full">
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          {/* GPU particle swarm background */}
          <SwarmBackgroundLoader />

          <div className="relative min-h-screen z-10">
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
