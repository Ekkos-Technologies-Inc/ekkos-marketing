import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PRICING_PLANS } from '@/lib/pricing-config';

export async function POST(req: NextRequest) {
  try {
    const { planId, billingPeriod, email } = await req.json();

    // Validate plan
    if (!planId || !PRICING_PLANS[planId as keyof typeof PRICING_PLANS]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const plan = PRICING_PLANS[planId as keyof typeof PRICING_PLANS];

    // Free plan doesn't need checkout
    if (plan.id === 'developer') {
      return NextResponse.json({
        error: 'Free plan does not require checkout',
        redirect: '/signup'
      }, { status: 400 });
    }

    // Not available yet
    if (!plan.available) {
      return NextResponse.json({
        error: 'Plan not available yet',
        message: 'This plan is coming soon. Join the waitlist at team@ekkos.dev'
      }, { status: 400 });
    }

    // Get the correct price ID
    const priceId = billingPeriod === 'yearly'
      ? plan.stripeYearlyPriceId
      : plan.stripePriceId;

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID not configured' }, { status: 500 });
    }

    // Create Stripe checkout session
    // Note: Webhook events are processed by platform.ekkos.dev/api/webhooks/stripe
    // which resolves users by email when userId is not available
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ekkos.dev'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ekkos.dev'}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: email || undefined,
      subscription_data: {
        metadata: {
          tier: plan.id, // Canonical tier name (developer/professional/team)
          plan_name: plan.name,
          source: 'marketing',
        },
      },
      metadata: {
        tier: plan.id,
        type: 'subscription',
        source: 'marketing',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
