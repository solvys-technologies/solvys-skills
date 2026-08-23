export type PricingPeriod = "monthly" | "annual";

export type PricingPlanCta = {
  label: string;
  href: string;
  /** Open in a new tab. Defaults to false. */
  external?: boolean;
};

export type PricingPlanPrice = {
  /** Numeric amount billed for the monthly view (per month). */
  monthly: number;
  /**
   * Numeric amount billed for the annual view, expressed per month.
   * Defaults to `monthly` when omitted so the toggle stays inert for the plan.
   */
  annual?: number;
};

export type PricingPlanFeature = {
  label: string;
  /** Muted, struck-through when false. Defaults to true. */
  included?: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  /** Short positioning line under the plan name. */
  tagline?: string;
  price: PricingPlanPrice;
  /** Shown after the amount, e.g. "/mo" or "per seat". */
  priceSuffix?: string;
  /** Free-form label that replaces the numeric price, e.g. "Custom". */
  priceLabel?: string;
  /** Struck-through reference price beside the amount, e.g. "$49". */
  originalPrice?: string;
  currency?: string;
  cta: PricingPlanCta;
  features: (string | PricingPlanFeature)[];
  /** Marks the highlighted, accent-treated plan. Only one should be featured. */
  featured?: boolean;
  /** Pill copy in the card header, e.g. "Lifetime" or "Pro". */
  badge?: string;
  /** Small note under the badge, e.g. "Save 20%". */
  discount?: string;
  /** Reveal-layer copy shown behind a featured card on hover. */
  highlight?: string;
};

export type PricingBillingCopy = {
  monthly: string;
  annual: string;
  /** Accent tag on the annual option, e.g. "Save 20%". */
  annualNote?: string;
};
