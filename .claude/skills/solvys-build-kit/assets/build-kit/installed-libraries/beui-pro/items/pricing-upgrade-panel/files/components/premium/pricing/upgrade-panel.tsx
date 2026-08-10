"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { EASE_OUT, SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { AnimatedPrice } from "./animated-price";

export type UpgradeCycle = "monthly" | "yearly";

export type UpgradePlan = {
  id: string;
  name: string;
  /** Pill copy on the card. Defaults to the plan name. */
  badge?: string;
  /** Per-editor monthly rate when billed monthly. */
  monthly: number;
  /** Per-editor monthly rate when billed yearly. */
  yearly: number;
  heading: string;
  description: string;
  features: string[];
};

export type UpgradePanelProps = {
  /** Brand name, joined with the active plan in the headline. */
  productName?: string;
  plans: UpgradePlan[];
  editors?: number;
  currency?: string;
  defaultPlanId?: string;
  defaultCycle?: UpgradeCycle;
  /** Accent tag on the yearly option, e.g. "-27%". */
  yearlyNote?: string;
  helpText?: string;
  helpHref?: string;
  className?: string;
};

export function UpgradePanel({
  productName = "beUI",
  plans,
  editors = 1,
  currency = "$",
  defaultPlanId,
  defaultCycle = "yearly",
  yearlyNote = "-27%",
  helpText = "Need help picking the right plan?",
  helpHref = "#",
  className,
}: UpgradePanelProps) {
  const reduce = useReducedMotion();
  const cycleLayoutId = useId();
  const [planId, setPlanId] = useState(defaultPlanId ?? plans[0]?.id);
  const [cycle, setCycle] = useState<UpgradeCycle>(defaultCycle);

  const activeIndex = Math.max(
    0,
    plans.findIndex((plan) => plan.id === planId),
  );
  const active = plans[activeIndex] ?? plans[0];
  if (!active) {
    return null;
  }

  const months = cycle === "yearly" ? 12 : 1;
  const perMonth = cycle === "yearly" ? active.yearly : active.monthly;
  const total = perMonth * months * editors;
  const original =
    cycle === "yearly" ? active.monthly * months * editors : null;

  return (
    <div
      className={cn(
        "grid w-full items-center gap-10 lg:grid-cols-[1fr_23rem] lg:gap-12",
        className,
      )}
    >
      {/* Left: card deck. The front card rolls back-left behind the deck as the
          next plan slides forward; cards behind peek to the right. */}
      <div className="mx-auto w-full max-w-[22rem]">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-6 translate-y-2 scale-[0.94] rounded-[1.75rem] border border-border bg-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 translate-x-6 translate-y-2 scale-[0.94] rounded-[1.75rem] border border-border bg-transparent"
          />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, x: 36, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, x: -64, scale: 0.88, rotate: -6 }
              }
              transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
              className="relative flex min-h-[27rem] flex-col rounded-[1.75rem] border border-border bg-background p-6 shadow-[inset_0_8px_18px_-20px_color-mix(in_oklch,var(--foreground)_45%,transparent),inset_0_-8px_18px_-22px_color-mix(in_oklch,var(--foreground)_40%,transparent),0_20px_50px_-44px_color-mix(in_oklch,var(--foreground)_50%,transparent)]"
            >
              <span className="w-fit rounded-full bg-accent px-3 py-1.5 font-semibold text-accent-foreground text-sm">
                {active.badge ?? active.name}
              </span>

              <div className="mt-6 flex items-end gap-2">
                <AnimatedPrice
                  amount={perMonth}
                  currency={currency}
                  className="text-5xl"
                />
                <span className="pb-1 text-muted-foreground text-xs leading-4">
                  per editor / month
                  <br />
                  {cycle === "yearly" ? "billed annually" : "billed monthly"}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-xl font-medium text-foreground">
                  {active.heading}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-6">
                  {active.description}
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-3.5">
                {active.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-foreground text-sm"
                  >
                    <Check className="size-4 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {plans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`Show ${plan.name}`}
              aria-current={index === activeIndex}
              onClick={() => setPlanId(plan.id)}
              className={cn(
                "relative h-2 rounded-full outline-none transition-all before:absolute before:-inset-3 before:content-[''] focus-visible:ring-2 focus-visible:ring-ring",
                index === activeIndex
                  ? "w-6 bg-foreground"
                  : "w-2 bg-border hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      </div>

      {/* Right: plan selector, billing cycle, summary, CTA. */}
      <div className="flex flex-col">
        <h2 className="text-balance font-sans text-4xl font-medium text-foreground leading-[1.05]">
          Upgrade to {productName} {active.name}
        </h2>

        <Tabs
          value={planId}
          onValueChange={setPlanId}
          variant="pill"
          className="mt-8"
        >
          <TabsList className="grid w-full auto-cols-fr grid-flow-col p-1">
            {plans.map((plan) => (
              <TabsTrigger
                key={plan.id}
                value={plan.id}
                className="w-full justify-center py-2.5 text-base"
              >
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-6 rounded-2xl border border-border bg-transparent p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-foreground text-sm">
              Billing cycle
            </span>
            <div className="inline-flex items-center gap-1 rounded-full bg-background p-1">
              {(["monthly", "yearly"] as UpgradeCycle[]).map((value) => {
                const activeCycle = cycle === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCycle(value)}
                    className={cn(
                      "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium text-sm capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      activeCycle
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {activeCycle ? (
                      <motion.span
                        layoutId={cycleLayoutId}
                        className="absolute inset-0 rounded-full bg-primary shadow-sm"
                        transition={reduce ? { duration: 0 } : SPRING_PANEL}
                      />
                    ) : null}
                    <span className="relative flex items-center gap-1.5">
                      <span>{value}</span>
                      {value === "yearly" && yearlyNote ? (
                        <span
                          className={cn(
                            "rounded px-1 py-0.5 font-semibold text-[0.625rem] leading-none",
                            activeCycle
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-accent text-accent-foreground",
                          )}
                        >
                          {yearlyNote}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4 border-border border-t pt-5">
            <div>
              <p className="font-medium text-foreground">
                {productName} {active.name}
              </p>
              <p className="mt-1 text-muted-foreground text-sm">
                {currency}
                {perMonth} × {editors} editor{editors > 1 ? "s" : ""} × {months}{" "}
                month{months > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              {original && original !== total ? (
                <span className="text-muted-foreground text-sm line-through">
                  {currency}
                  {original}
                </span>
              ) : null}
              <span className="inline-flex items-start font-semibold text-3xl text-foreground leading-none tabular-nums">
                <span className="pt-1 text-base text-muted-foreground">
                  {currency}
                </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.22, ease: EASE_OUT }
                    }
                  >
                    {total}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>

        <Button size="lg" className="mt-6 h-14 w-full text-base">
          Upgrade to {active.name}
        </Button>

        <p className="mt-4 text-center text-muted-foreground text-sm">
          {helpText}{" "}
          <a
            href={helpHref}
            className="font-medium text-foreground underline underline-offset-4 hover:text-accent"
          >
            Talk to us
          </a>
        </p>
      </div>
    </div>
  );
}
