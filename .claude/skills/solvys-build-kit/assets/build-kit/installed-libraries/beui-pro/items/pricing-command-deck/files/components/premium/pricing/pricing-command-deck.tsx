"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { type CommandPlan, CommandPlanCard } from "./command-plan-card";

export type PricingCommandDeckProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  plans?: CommandPlan[];
  className?: string;
};

const DEFAULT_PLANS: CommandPlan[] = [
  {
    id: "launch",
    name: "Launch",
    description: "For small teams turning their first repeatable process live.",
    monthly: 29,
    annual: 23,
    features: [
      "Three active workspaces",
      "25k monthly runs",
      "Core integrations",
      "Seven-day activity history",
      "Community support",
    ],
    cta: { label: "Start building", href: "#" },
  },
  {
    id: "scale",
    name: "Scale",
    description: "For product teams that need more control as volume grows.",
    monthly: 79,
    annual: 63,
    features: [
      "Everything in Launch",
      "Unlimited workspaces",
      "500k monthly runs",
      "Advanced permissions",
      "Priority support",
    ],
    cta: { label: "Choose Scale", href: "#" },
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "For organizations with custom security and scale requirements.",
    monthly: null,
    annual: null,
    priceLabel: "Custom pricing",
    billingNote: "Annual agreement",
    features: [
      "Everything in Scale",
      "SAML and directory sync",
      "Custom data retention",
      "Security review support",
      "Dedicated success lead",
    ],
    cta: { label: "Talk to sales", href: "#" },
  },
];

export function PricingCommandDeck({
  eyebrow = "Pricing plans",
  title = "One plan for every stage of the work.",
  description = "Start lean, then add capacity when the signal is clear.",
  plans = DEFAULT_PLANS,
  className,
}: PricingCommandDeckProps) {
  const reduce = useReducedMotion();
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-8 sm:py-28",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_68%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.16em]">
            <span className="grid size-5 place-items-center bg-foreground/[0.06]">
              <span className="size-1.5 bg-primary" />
            </span>
            <span className="border border-border/45 px-3 py-1.5">
              {eyebrow}
            </span>
          </div>

          <h2 className="mt-7 text-balance text-4xl font-medium leading-[0.98] tracking-[-0.055em]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-balance font-mono text-xs text-muted-foreground leading-6 sm:text-sm">
            {description}
          </p>

          <fieldset className="mt-9 flex border border-border/45 bg-foreground/[0.035] p-1 [background-image:repeating-linear-gradient(135deg,color-mix(in_oklch,var(--foreground)_3%,transparent)_0,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px,transparent_7px)]">
            <legend className="sr-only">Billing period</legend>
            {(["annual", "monthly"] as const).map((period) => {
              const active = period === billing;
              return (
                <button
                  key={period}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBilling(period)}
                  className={cn(
                    "relative min-h-9 min-w-28 px-5 font-mono text-[11px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-w-36",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="command-deck-billing"
                      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      className="absolute inset-0 bg-primary"
                    />
                  ) : null}
                  <span className="relative">
                    {period === "annual"
                      ? "Bill annually · −20%"
                      : "Bill monthly"}
                  </span>
                </button>
              );
            })}
          </fieldset>
        </motion.header>

        <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <CommandPlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
