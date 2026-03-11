/**
 * Centralized Pricing Configuration
 * 
 * Single source of truth for all pricing plans, features, and limits.
 * Used across marketing site, dashboard, and platform.
 */

export type PlanId = 'developer' | 'professional' | 'team' | 'enterprise';

export interface PricingPlan {
  id: PlanId;
  name: string;
  displayName: string;
  price: number | null;
  annualPrice: number | null;
  interval: 'forever' | 'month' | 'year' | 'custom';
  perSeat?: boolean;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
  stripeYearlyPriceId?: string | null;
  available: boolean;
  badge?: string | null;
  description: string;
  features: {
    patternsCapacity: number | 'unlimited';
    patternsPerMonth: number | 'unlimited';
    searchesPerMonth: number | 'unlimited';
    apiRequests?: number | 'unlimited';
    workspaces: number | 'unlimited';
    retention: string;
    crossPlatform: boolean;
    conflictChecking: boolean;
    apiAccess: boolean;
    support: 'community' | 'priority' | 'dedicated';
    [key: string]: any; // Allow additional features
  };
  limits: {
    patterns: number; // -1 for unlimited
    searches: number; // -1 for unlimited
    workspaces: number; // -1 for unlimited
    apiRequests?: number; // -1 for unlimited
  };
}

/**
 * Main pricing plans configuration
 */
export const PRICING_PLANS: Record<PlanId, PricingPlan> = {
  developer: {
    id: 'developer',
    name: 'Developer',
    displayName: 'Developer',
    price: 0,
    annualPrice: 0,
    interval: 'forever',
    perSeat: false,
    stripeProductId: 'prod_Tcab7Zlf47OuoK',
    stripePriceId: 'price_1SfLQ6BQFhC8k5TniEKsDyZ3',
    stripeYearlyPriceId: null,
    available: true,
    badge: null,
    description: 'Start learning immediately—see the difference on day one',
    features: {
      patternsCapacity: 100,
      patternsPerMonth: 50,
      searchesPerMonth: 100,
      apiRequests: 100,
      workspaces: 1,
      retention: '7-day',
      crossPlatform: true,
      conflictChecking: true,
      apiAccess: false,
      support: 'community',
      // Additional features for display
      ideConnections: 1,
      memorySearches: '100 / month',
      solutionsSaved: '50 / month',
      conflictChecks: '100 / month',
    },
    limits: {
      patterns: 100,
      searches: 100,
      workspaces: 1,
      apiRequests: 100,
    },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    displayName: 'Professional',
    price: 19,
    annualPrice: 190, // Save ~$38/year
    interval: 'month',
    perSeat: false,
    stripeProductId: 'prod_TcabZjEjU9xLDl',
    stripePriceId: 'price_1SfN84BQFhC8k5TnPB6Kzbqi',
    stripeYearlyPriceId: 'price_1SfN84BQFhC8k5TnJeIVgao1',
    available: true,
    badge: 'Most Popular',
    description: 'Faster learning, deeper memory—for developers who ship daily',
    features: {
      patternsCapacity: 'unlimited',
      patternsPerMonth: 'unlimited',
      searchesPerMonth: 'unlimited',
      apiRequests: 'unlimited',
      workspaces: 'unlimited',
      retention: 'forever',
      crossPlatform: true,
      conflictChecking: true,
      apiAccess: true,
      support: 'priority',
      // Additional features for display
      ideConnections: 'unlimited',
      foreverMemory: true,
      patternInsights: true,
      collectiveMemory: true,
      analytics: true,
    },
    limits: {
      patterns: -1, // unlimited
      searches: -1,
      workspaces: -1,
      apiRequests: -1,
    },
  },
  team: {
    id: 'team',
    name: 'Team',
    displayName: 'Team',
    price: 49,
    annualPrice: 490, // Save ~$98/year
    interval: 'month',
    perSeat: true,
    stripeProductId: 'prod_TcabHPMCzroGnE',
    stripePriceId: 'price_1SfN84BQFhC8k5TnV2YBNeSM',
    stripeYearlyPriceId: 'price_1SfN84BQFhC8k5TnUmi6uMn5',
    available: false, // Coming Q2 2026
    badge: null,
    description: 'Shared intelligence across your team—compound learning at scale',
    features: {
      patternsCapacity: 'unlimited',
      patternsPerMonth: 'unlimited',
      searchesPerMonth: 'unlimited',
      apiRequests: 'unlimited',
      workspaces: 'unlimited',
      retention: 'custom',
      crossPlatform: true,
      conflictChecking: true,
      apiAccess: true,
      support: 'dedicated',
      // Additional features for display
      sharedPatternLibrary: true,
      teamMemorySpaces: true,
      teamAnalytics: true,
      adminControls: true,
      sso: true,
      auditLogs: true,
      customRetention: true,
    },
    limits: {
      patterns: -1,
      searches: -1,
      workspaces: -1,
      apiRequests: -1,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    displayName: 'Enterprise',
    price: null, // Custom pricing
    annualPrice: null,
    interval: 'custom',
    perSeat: false,
    stripeProductId: null,
    stripePriceId: null,
    stripeYearlyPriceId: null,
    available: true,
    badge: null,
    description: 'Self-hosted & compliance-ready',
    features: {
      patternsCapacity: 'unlimited',
      patternsPerMonth: 'unlimited',
      searchesPerMonth: 'unlimited',
      apiRequests: 'unlimited',
      workspaces: 'unlimited',
      retention: 'custom',
      crossPlatform: true,
      conflictChecking: true,
      apiAccess: true,
      support: 'dedicated',
      // Additional features for display
      selfHosted: true,
      vpcDeployment: true,
      soc2: true,
      hipaa: false, // Not yet — requires BAAs from all vendors
      customDataResidency: true,
      dedicatedSupport: true,
    },
    limits: {
      patterns: -1,
      searches: -1,
      workspaces: -1,
      apiRequests: -1,
    },
  },
} as const;

/**
 * Legacy plan name mapping (for backwards compatibility)
 * Maps old poetic names to new plan IDs
 */
export const LEGACY_PLAN_NAMES: Record<string, PlanId> = {
  echo: 'developer',
  resonance: 'professional',
  harmony: 'team',
  symphony: 'enterprise',
  free: 'developer',
  pro: 'professional',
} as const;

/**
 * Get plan by legacy name (for migration/backwards compatibility)
 */
export function getPlanByLegacyName(legacyName: string): PricingPlan | null {
  const normalized = legacyName.toLowerCase();
  const planId = LEGACY_PLAN_NAMES[normalized];
  if (!planId) return null;
  return PRICING_PLANS[planId];
}

/**
 * Get plan by ID
 */
export function getPlanById(planId: PlanId): PricingPlan {
  return PRICING_PLANS[planId];
}

/**
 * Get all available plans
 */
export function getAvailablePlans(): PricingPlan[] {
  return Object.values(PRICING_PLANS).filter(plan => plan.available);
}

/**
 * Get plan display name (handles legacy names)
 */
export function getPlanDisplayName(planIdOrLegacyName: string): string {
  const normalized = planIdOrLegacyName.toLowerCase();
  
  // Check if it's a legacy name
  if (LEGACY_PLAN_NAMES[normalized]) {
    return PRICING_PLANS[LEGACY_PLAN_NAMES[normalized]].displayName;
  }
  
  // Check if it's a valid plan ID
  if (PRICING_PLANS[normalized as PlanId]) {
    return PRICING_PLANS[normalized as PlanId].displayName;
  }
  
  // Fallback: return as-is (capitalized)
  return planIdOrLegacyName.charAt(0).toUpperCase() + planIdOrLegacyName.slice(1);
}

/**
 * Format price for display
 */
export function formatPrice(plan: PricingPlan, annual: boolean = false): string {
  if (plan.price === null) return 'Custom';
  
  const price = annual ? plan.annualPrice : plan.price;
  const interval = annual ? '/year' : plan.interval === 'forever' ? '/forever' : '/month';
  const perSeat = plan.perSeat ? '/seat' : '';
  
  return `$${price}${perSeat}${interval}`;
}

