# Stripe Integration Setup

## ✅ What's Been Configured

### 1. **Code Integration**
- ✅ `stripe` package added to `package.json`
- ✅ Stripe client initialized in `lib/stripe.ts`
- ✅ Checkout API route: `app/api/checkout/route.ts`
- ✅ Webhook handler: `app/api/webhook/route.ts`
- ✅ Success page: `app/success/page.tsx`
- ✅ Pricing page updated with checkout buttons

### 2. **Product/Price IDs**
Already configured in `lib/pricing-config.ts`:

| Plan | Product ID | Monthly Price ID | Yearly Price ID |
|------|-----------|------------------|-----------------|
| Developer | `prod_Tcab7Zlf47OuoK` | Free | - |
| Professional | `prod_TcabZjEjU9xLDl` | `price_1SfN84BQFhC8k5TnPB6Kzbqi` | `price_1SfN84BQFhC8k5TnJeIVgao1` |
| Team | `prod_TcabHPMCzroGnE` | `price_1SfN84BQFhC8k5TnV2YBNeSM` | `price_1SfN84BQFhC8k5TnUmi6uMn5` |

---

## 🔧 What You Need To Do

### Step 1: Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret key** (starts with `sk_test_...`)
3. Copy your **Publishable key** (starts with `pk_test_...`)

### Step 2: Set Environment Variables

**Option A: Local Development**
```bash
cd apps/marketing
cp .env.example .env.local
```

Then edit `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

**Option B: Vercel Production**
```bash
cd apps/marketing
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_BASE_URL
```

Or use Vercel dashboard: https://vercel.com/ekkos/marketing/settings/environment-variables

### Step 3: Configure Webhook Endpoint

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **+ Add endpoint**
3. Enter URL:
   - **Local testing**: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) webhook forwarding
   - **Production**: `https://ekkos.dev/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_...`) and add to env vars

### Step 4: Install Dependencies & Test

```bash
cd apps/marketing
pnpm install
pnpm dev
```

Visit http://localhost:3001/pricing and test checkout flow.

### Step 5: Deploy to Vercel

```bash
cd apps/marketing
vercel --prod
```

---

## 🧪 Testing Locally with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhook

# Copy the webhook signing secret (whsec_...) to .env.local

# Trigger test event
stripe trigger checkout.session.completed
```

---

## 📝 What Happens During Checkout

1. User clicks "Start Free" or "Get Pro" on pricing page
2. `POST /api/checkout` creates Stripe Checkout session
3. User redirected to Stripe's hosted checkout page
4. User completes payment
5. Stripe sends webhook to `/api/webhook`
6. Webhook handler:
   - Verifies signature
   - Logs event
   - **TODO**: Provision user in Supabase (see webhook comments)
7. User redirected to `/success`

---

## ⚠️ TODO: User Provisioning

The webhook handler currently just logs events. You need to:

1. **Connect to Supabase** in webhook handler
2. **On `checkout.session.completed`:**
   - Get user email from session
   - Create/update user record
   - Set `plan_tier` to `'pro'` or `'team'`
   - Send welcome email
3. **On `customer.subscription.updated`:**
   - Update plan tier if changed
4. **On `customer.subscription.deleted`:**
   - Downgrade user to `'free'` tier

Example:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// In webhook handler
case 'checkout.session.completed': {
  const session = event.data.object;
  const email = session.customer_details?.email;

  if (email) {
    await supabase
      .from('users')
      .upsert({
        email,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan_tier: session.metadata?.plan_id || 'pro',
        updated_at: new Date().toISOString(),
      });
  }
  break;
}
```

---

## 🔒 Security Checklist

- ✅ Webhook signature verification enabled
- ✅ STRIPE_SECRET_KEY stored in env vars (not committed)
- ✅ Client-side only gets public key
- ⚠️ Rate limiting not implemented (add if needed)
- ⚠️ CORS not configured (add if needed for SPA)

---

## 📊 Monitoring

Stripe events are logged to console. For production:

1. Add proper logging (e.g., Axiom, Datadog)
2. Set up alerts for payment failures
3. Monitor webhook delivery in Stripe Dashboard

---

## 🚀 Go Live Checklist

- [ ] Replace test keys with live keys
- [ ] Update webhook URL to production
- [ ] Test checkout flow on production
- [ ] Verify webhook events fire
- [ ] Test subscription lifecycle (upgrade/downgrade/cancel)
- [ ] Implement user provisioning logic
- [ ] Set up monitoring/alerts
- [ ] Update Stripe dashboard business details
- [ ] Configure email receipts in Stripe
