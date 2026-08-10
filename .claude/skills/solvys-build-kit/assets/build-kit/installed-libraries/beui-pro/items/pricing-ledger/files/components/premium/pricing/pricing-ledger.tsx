"use client";

import { ArrowRight, Check, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { NumberTicker } from "@/components/motion/number-ticker";
import { RangeSlider } from "@/components/motion/range-slider";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type LedgerPlan = {
  id: string;
  name: string;
  basePrice: number;
  includedSeats: number;
  extraSeatPrice: number;
  description: string;
  features: string[];
};

export type PricingLedgerProps = {
  eyebrow?: string;
  title?: string;
  plans?: LedgerPlan[];
  className?: string;
};

const DEFAULT_PLANS: LedgerPlan[] = [
  {
    id: "core",
    name: "Core",
    basePrice: 24,
    includedSeats: 5,
    extraSeatPrice: 6,
    description: "For focused teams shipping their first production workflows.",
    features: ["Unlimited projects", "50k monthly events", "Community support"],
  },
  {
    id: "scale",
    name: "Scale",
    basePrice: 64,
    includedSeats: 10,
    extraSeatPrice: 5,
    description: "For growing teams that need observability and control.",
    features: ["500k monthly events", "Audit history", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    basePrice: 180,
    includedSeats: 25,
    extraSeatPrice: 4,
    description:
      "For organizations with security and procurement requirements.",
    features: [
      "Unlimited events",
      "SAML and SCIM",
      "Dedicated success manager",
    ],
  },
];

const BILLING = ["monthly", "annual"] as const;

export function PricingLedger({
  eyebrow = "Pricing ledger",
  title = "A price you can explain line by line.",
  plans = DEFAULT_PLANS,
  className,
}: PricingLedgerProps) {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState(plans[1]?.id ?? plans[0]?.id);
  const [billing, setBilling] = useState<(typeof BILLING)[number]>("annual");
  const [seats, setSeats] = useState(12);
  const selected =
    plans.find((plan) => plan.id === selectedId) ??
    plans[0] ??
    DEFAULT_PLANS[0];
  const extraSeats = Math.max(0, seats - selected.includedSeats);
  const seatCost = extraSeats * selected.extraSeatPrice;
  const monthlyTotal = selected.basePrice + seatCost;
  const total =
    billing === "annual" ? Math.round(monthlyTotal * 0.8) : monthlyTotal;

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl border border-border/60 bg-background">
        <header className="grid gap-6 border-border/60 border-b p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-[0.17em]">
              {eyebrow}
            </p>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-medium text-foreground leading-[1.02] tracking-[-0.04em]">
              {title}
            </h2>
          </div>
          <fieldset className="flex border border-border/70">
            <legend className="sr-only">Billing period</legend>
            {BILLING.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setBilling(period)}
                aria-pressed={billing === period}
                className={cn(
                  "relative h-10 min-w-24 px-4 font-mono text-[10px] uppercase tracking-[0.12em] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground",
                  billing === period
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {billing === period ? (
                  <motion.span
                    layoutId="ledger-billing"
                    transition={SPRING_LAYOUT}
                    className="absolute inset-0 bg-primary"
                  />
                ) : null}
                <span className="relative">
                  {period}
                  {period === "annual" ? " · −20%" : ""}
                </span>
              </button>
            ))}
          </fieldset>
        </header>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-border/60 border-b lg:border-r lg:border-b-0">
            <div className="grid border-border/60 border-b sm:grid-cols-3">
              {plans.map((plan) => {
                const active = plan.id === selected.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedId(plan.id)}
                    aria-pressed={active}
                    className="relative min-h-24 border-border/60 border-b p-4 text-left outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:border-r sm:border-b-0 sm:last:border-r-0"
                  >
                    {active ? (
                      <motion.span
                        layoutId="ledger-plan"
                        transition={SPRING_LAYOUT}
                        className="absolute inset-0 bg-primary/[0.07]"
                      />
                    ) : null}
                    <span className="relative flex items-start justify-between gap-3">
                      <span>
                        <span
                          className={cn(
                            "block font-medium",
                            active
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {plan.name}
                        </span>
                        <span className="mt-2 block font-mono text-[10px] text-muted-foreground uppercase tracking-[0.08em]">
                          From ${plan.basePrice}/mo
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 size-2 border",
                          active
                            ? "border-primary bg-primary"
                            : "border-border-strong",
                        )}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.id}
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="p-6 sm:p-8"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-mono text-[10px] text-primary uppercase tracking-[0.14em]">
                      Selected / {selected.name}
                    </p>
                    <h3 className="mt-3 max-w-lg text-xl font-medium text-foreground tracking-tight">
                      {selected.description}
                    </h3>
                  </div>
                  <p className="shrink-0 font-mono text-3xl text-foreground tabular-nums tracking-[-0.05em]">
                    ${selected.basePrice}
                    <span className="text-muted-foreground text-xs tracking-normal">
                      {" "}
                      / base
                    </span>
                  </p>
                </div>

                <div className="mt-9 border-border/60 border-y py-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
                        Team size
                      </p>
                      <p className="mt-2 font-mono text-4xl text-foreground tabular-nums tracking-[-0.06em]">
                        {seats}
                        <span className="ml-2 text-muted-foreground text-xs tracking-normal">
                          seats
                        </span>
                      </p>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.09em]">
                      {selected.includedSeats} included
                      <br />${selected.extraSeatPrice} thereafter
                    </p>
                  </div>
                  <RangeSlider
                    value={seats}
                    onValueChange={setSeats}
                    min={1}
                    max={50}
                    step={1}
                    showTicks={false}
                    aria-label="Team seats"
                    className="mt-6 rounded-none bg-foreground/[0.06] [&>div:first-child]:bg-primary/20 [&_[role=slider]]:rounded-none [&_[role=slider]]:bg-primary"
                  />
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {selected.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: EASE_OUT,
                        delay: reduce ? 0 : index * 0.06,
                      }}
                      className="flex items-start gap-2 border-border/60 border-t pt-3 text-foreground text-sm leading-5"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px)] [background-size:32px_32px]" />
            <motion.div
              layout
              transition={SPRING_LAYOUT}
              className="relative border border-border/70 bg-background p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 border-border/60 border-b pb-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.13em]">
                    Estimate / {selected.name}
                  </p>
                  <p className="mt-1 font-mono text-[9px] text-primary uppercase tracking-[0.1em]">
                    Updates live
                  </p>
                </div>
                <span className="grid size-8 place-items-center bg-primary text-primary-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </div>

              <div className="space-y-4 py-6 font-mono text-xs">
                <LedgerRow label="Base plan" value={`$${selected.basePrice}`} />
                <LedgerRow
                  label={`${selected.includedSeats} included seats`}
                  value="$0"
                />
                <LedgerRow
                  label={`${extraSeats} additional seats`}
                  value={extraSeats ? `$${seatCost}` : "$0"}
                />
                <LedgerRow
                  label="Annual discount"
                  value={billing === "annual" ? "−20%" : "—"}
                  accent={billing === "annual"}
                />
              </div>

              <div className="flex items-end justify-between gap-4 border-border/70 border-t pt-5">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
                    Due monthly
                  </p>
                  <p className="mt-2 font-mono font-semibold text-5xl text-foreground tabular-nums tracking-[-0.07em]">
                    <NumberTicker
                      value={total}
                      prefix="$"
                      startOnView={false}
                      animateOnMount={false}
                    />
                  </p>
                </div>
                <span className="mb-1 font-mono text-[10px] text-muted-foreground">
                  USD
                </span>
              </div>

              <ButtonLink
                href="#"
                className="mt-6 h-12 w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start with {selected.name}
                <ArrowRight className="size-4" />
              </ButtonLink>
              <p className="mt-4 text-center font-mono text-[9px] text-muted-foreground uppercase tracking-[0.08em]">
                No setup fee / change seats anytime
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LedgerRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Minus className="size-3" />
        {label}
      </span>
      <span className={accent ? "text-primary" : "text-foreground"}>
        {value}
      </span>
    </div>
  );
}
