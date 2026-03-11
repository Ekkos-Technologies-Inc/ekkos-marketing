import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription Activated',
  description: 'Your ekkOS subscription has been activated.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      'max-snippet': 0,
      'max-image-preview': 'none',
      'max-video-preview': 0,
    },
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
