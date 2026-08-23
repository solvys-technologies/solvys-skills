"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { NumberTicker } from "@/components/motion/number-ticker";
import { RangeSlider } from "@/components/motion/range-slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { cn } from "@/lib/utils";

export type UsageBilling = "monthly" | "yearly";

export type UsageTier = {
  /** Display label for the included usage, e.g. "5M". */
  events: string;
  /** Price per month when billed monthly. */
  monthly: number;
  /**
   * Price per month when billed yearly. Defaults to ~1 month free
   * (monthly × 11 / 12) when omitted.
   */
  yearly?: number;
};

export type UsageSliderPricingProps = {
  tiers: UsageTier[];
  defaultTierIndex?: number;
  currency?: string;
  /** Noun for the metered unit, e.g. "events". */
  unit?: string;
  featuresTitle?: string;
  features: string[];
  cta: { label: string; href: string; note?: string; external?: boolean };
  billingCopy?: { monthly: string; yearly: string; yearlyNote?: string };
  className?: string;
};

const DEFAULT_BILLING = {
  monthly: "Monthly",
  yearly: "Yearly",
  yearlyNote: "1 month free",
};

export function UsageSliderPricing({
  tiers,
  defaultTierIndex,
  currency = "$",
  unit = "events",
  featuresTitle = "Included in every plan",
  features,
  cta,
  billingCopy,
  className,
}: UsageSliderPricingProps) {
  const copy = { ...DEFAULT_BILLING, ...billingCopy };
  const maxIndex = Math.max(0, tiers.length - 1);
  const [index, setIndex] = useState(
    Math.min(defaultTierIndex ?? Math.floor(maxIndex / 2), maxIndex),
  );
  const [billing, setBilling] = useState<UsageBilling>("monthly");

  const tier = tiers[index] ?? tiers[0];
  if (!tier) {
    return null;
  }

  const perMonth =
    billing === "yearly"
      ? (tier.yearly ?? Math.round((tier.monthly * 11) / 12))
      : tier.monthly;

  const unitUpper = unit.toUpperCase();

  return (
    <div className={cn("w-full max-w-xl", className)}>
      <div className="flex items-end gap-2">
        <NumberTicker
          value={perMonth}
          prefix={currency}
          blur
          locale
          animateOnMount={false}
          className="font-sans text-6xl text-foreground leading-none"
        />
        <span className="pb-1.5 text-muted-foreground text-xl">/ month</span>
      </div>
      <p className="mt-4 text-muted-foreground">
        {tier.events} {unit} included.
      </p>

      <Tabs
        value={billing}
        onValueChange={(value) => setBilling(value as UsageBilling)}
        variant="pill"
        className="mt-7"
      >
        <TabsList className="p-1">
          <TabsTrigger value="monthly">{copy.monthly}</TabsTrigger>
          <TabsTrigger value="yearly">
            <span className="flex items-center gap-2">
              {copy.yearly}
              {copy.yearlyNote ? (
                <span className="font-medium text-accent text-xs">
                  {copy.yearlyNote}
                </span>
              ) : null}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-8">
        <RangeSlider
          aria-label={`${unit} per month`}
          min={0}
          max={maxIndex}
          step={1}
          value={index}
          onValueChange={setIndex}
          className="h-12"
        />
        <div className="mt-3 flex items-center justify-between font-semibold text-foreground text-xs uppercase tracking-wide">
          <span>
            {tiers[0]?.events} {unitUpper}
          </span>
          <span>
            {tiers[maxIndex]?.events} {unitUpper}
          </span>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-semibold text-foreground text-sm uppercase tracking-wide">
          {featuresTitle}
        </p>
        <ul className="mt-5 flex flex-col gap-3.5">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 text-foreground text-lg leading-7"
            >
              <span aria-hidden className="text-muted-foreground">
                —
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <ButtonLink
          href={cta.href}
          size="lg"
          className="h-12"
          {...(cta.external
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {cta.label}
        </ButtonLink>
        {cta.note ? (
          <p className="text-muted-foreground text-sm leading-5">{cta.note}</p>
        ) : null}
      </div>
    </div>
  );
}
