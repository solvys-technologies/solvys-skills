"use client";

import { Check } from "lucide-react";
import { ButtonLink } from "@/components/motion/button/base";
import { cn } from "@/lib/utils";
import { AnimatedPrice } from "./animated-price";
import { PricingAuroraSurface } from "./pricing-aurora-surface";
import type { PricingPeriod, PricingPlan, PricingPlanFeature } from "./types";

export type PricingCardProps = {
  plan: PricingPlan;
  period: PricingPeriod;
  className?: string;
};

function normalizeFeature(
  feature: string | PricingPlanFeature,
): PricingPlanFeature {
  return typeof feature === "string"
    ? { label: feature, included: true }
    : { included: true, ...feature };
}

export function PricingCard({ plan, period, className }: PricingCardProps) {
  const featured = Boolean(plan.featured);
  const amount =
    period === "annual"
      ? (plan.price.annual ?? plan.price.monthly)
      : plan.price.monthly;

  return (
    <article
      data-featured={featured}
      className={cn(
        "relative flex min-h-[31rem] flex-col overflow-hidden rounded-3xl border border-border bg-transparent p-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex h-36 flex-col overflow-hidden rounded-2xl bg-muted p-4",
          featured && "bg-transparent",
        )}
      >
        {featured ? <PricingAuroraSurface /> : null}

        <div className="relative z-10 flex items-start justify-between gap-3">
          <h3 className="w-fit rounded-full bg-background/80 px-2.5 py-1 font-medium text-foreground text-xs uppercase tracking-wide">
            {plan.name}
          </h3>
          {plan.highlight ? (
            <span className="rounded-full bg-background/60 px-2.5 py-1 font-medium text-muted-foreground text-xs">
              {plan.highlight}
            </span>
          ) : null}
        </div>

        <div className="relative z-10 mt-auto flex min-h-10 flex-wrap items-baseline gap-x-1.5 gap-y-1">
          {plan.priceLabel ? (
            <span className="font-sans text-4xl font-medium text-foreground leading-none tracking-tight">
              {plan.priceLabel}
            </span>
          ) : (
            <AnimatedPrice
              amount={amount}
              currency={plan.currency}
              className="items-baseline text-4xl font-medium tracking-tight [&>span:first-child]:self-auto [&>span:first-child]:pt-0"
            />
          )}
          {plan.priceSuffix ? (
            <span className="font-medium text-foreground text-sm">
              {plan.priceSuffix}
            </span>
          ) : null}
          {plan.originalPrice ? (
            <span className="text-muted-foreground text-xs line-through">
              {plan.originalPrice}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        {plan.tagline ? (
          <p className="min-h-10 text-pretty font-medium text-foreground text-sm leading-5">
            {plan.tagline}
          </p>
        ) : null}

        <ButtonLink
          href={plan.cta.href}
          size="md"
          variant="primary"
          className="mt-4 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          {...(plan.cta.external
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {plan.cta.label}
        </ButtonLink>

        <ul className="mt-6 space-y-3 border-border border-t pt-5">
          {plan.features.map((entry) => {
            const feature = normalizeFeature(entry);
            return (
              <li
                key={feature.label}
                className="flex items-start gap-2.5 text-sm leading-5"
              >
                <Check className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{feature.label}</span>
              </li>
            );
          })}
        </ul>
        {plan.discount ? (
          <p className="mt-auto pt-5 text-center font-medium text-primary text-xs">
            {plan.discount} with annual billing
          </p>
        ) : null}
      </div>
    </article>
  );
}
