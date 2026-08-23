"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { PricingCard } from "./pricing-card";
import type { PricingBillingCopy, PricingPeriod, PricingPlan } from "./types";

export type PricingSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plans: PricingPlan[];
  /** Controlled billing period. Falls back to internal state when omitted. */
  period?: PricingPeriod;
  defaultPeriod?: PricingPeriod;
  onPeriodChange?: (value: PricingPeriod) => void;
  /** Hide the monthly/annual toggle for single-price catalogs. */
  showBillingToggle?: boolean;
  billingCopy?: Partial<PricingBillingCopy>;
  footnote?: string;
  className?: string;
};

const DEFAULT_BILLING: PricingBillingCopy = {
  monthly: "Monthly",
  annual: "Annual",
  annualNote: "Save 20%",
};

export function PricingSection({
  eyebrow = "Pricing",
  title = "Simple pricing that scales",
  description,
  plans,
  period: periodProp,
  defaultPeriod = "annual",
  onPeriodChange,
  showBillingToggle = true,
  billingCopy,
  footnote,
  className,
}: PricingSectionProps) {
  const reduce = useReducedMotion();
  const [internalPeriod, setInternalPeriod] =
    useState<PricingPeriod>(defaultPeriod);
  const period = periodProp ?? internalPeriod;
  const copy = { ...DEFAULT_BILLING, ...billingCopy };

  function setPeriod(next: PricingPeriod) {
    if (periodProp === undefined) {
      setInternalPeriod(next);
    }
    onPeriodChange?.(next);
  }

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.5, ease: EASE_OUT, delay },
        };

  return (
    <section className={cn("w-full px-4 py-16 sm:py-20", className)}>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        {eyebrow ? (
          <motion.p
            {...rise(0)}
            className="font-sans text-accent text-sm uppercase"
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h2
          {...rise(0.05)}
          className="mt-4 text-balance font-sans text-4xl font-medium text-foreground leading-tight"
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p
            {...rise(0.1)}
            className="mt-4 max-w-xl text-pretty text-muted-foreground leading-7"
          >
            {description}
          </motion.p>
        ) : null}

        {showBillingToggle ? (
          // Opacity-only entrance: a y-transform here would make the Tabs
          // layoutRoot measure the pill mid-transform and slide it in from below.
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.5, ease: EASE_OUT, delay: 0.15 }
            }
            className="mt-8"
          >
            <Tabs
              value={period}
              onValueChange={(value) => setPeriod(value as PricingPeriod)}
              variant="pill"
            >
              <TabsList>
                <TabsTrigger value="monthly">{copy.monthly}</TabsTrigger>
                <TabsTrigger value="annual">
                  <span className="flex items-center gap-2">
                    {copy.annual}
                    {copy.annualNote ? (
                      <span className="rounded-full bg-accent px-1.5 py-0.5 font-medium text-[0.625rem] text-accent-foreground leading-none">
                        {copy.annualNote}
                      </span>
                    ) : null}
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        ) : null}
      </div>

      <motion.div
        {...rise(0.2)}
        className={cn(
          "mx-auto mt-12 grid w-full max-w-5xl gap-4",
          plans.length >= 3
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2",
        )}
      >
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} period={period} />
        ))}
      </motion.div>

      {footnote ? (
        <p className="mt-8 text-center text-muted-foreground text-xs">
          {footnote}
        </p>
      ) : null}
    </section>
  );
}
