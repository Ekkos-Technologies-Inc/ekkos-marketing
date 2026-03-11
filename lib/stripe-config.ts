// Static pricing config for marketing site
export const STRIPE_CONFIG = {
  products: {
    free: {
      name: 'Developer',
      description: 'Start learning immediately',
      priceId: null,
      price: 0,
      yearlyPrice: 0,
      features: [
        '100 memory searches/month',
        '50 patterns/month',
        '100 conflict checks/month',
        'Community support',
      ],
    },
    pro: {
      name: 'Professional',
      description: 'For developers who ship daily',
      priceId: 'price_pro',
      price: 19,
      yearlyPrice: 190,
      features: [
        'Unlimited searches',
        'Unlimited patterns',
        'Forever memory retention',
        'Priority support',
        'API access',
      ],
    },
    team: {
      name: 'Team',
      description: 'Shared intelligence at scale',
      priceId: 'price_team',
      price: 49,
      yearlyPrice: 490,
      features: [
        'Everything in Professional',
        'Shared pattern library',
        'Team analytics',
        'Dedicated support',
        'SSO & audit logs',
      ],
    },
  },
};

export type ProductTier = keyof typeof STRIPE_CONFIG.products;
