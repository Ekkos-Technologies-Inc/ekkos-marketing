'use client';

import dynamic from 'next/dynamic';

const SwarmBackground = dynamic(
  () => import('@/components/background/SwarmBackground'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#06060e',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
    ),
  }
);

export function SwarmBackgroundLoader() {
  return <SwarmBackground />;
}
