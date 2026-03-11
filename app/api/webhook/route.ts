import { NextRequest, NextResponse } from 'next/server';

/**
 * DEPRECATED: Marketing webhook is no longer active.
 *
 * All Stripe webhook events are now processed by the platform app:
 *   https://platform.ekkos.dev/api/webhooks/stripe
 *
 * Configure your Stripe Dashboard webhook endpoint to point there.
 * This route exists only to return a helpful message if events are
 * mistakenly sent here.
 */
export async function POST(req: NextRequest) {
  console.warn('[Marketing Webhook] DEPRECATED — events should go to platform.ekkos.dev/api/webhooks/stripe');

  return NextResponse.json({
    received: true,
    warning: 'This webhook endpoint is deprecated. Configure Stripe to send events to https://platform.ekkos.dev/api/webhooks/stripe',
  });
}
