"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import { AnimatedPrice } from "./animated-price";

export type CommandPlan = {
  id: string;
  name: string;
  description: string;
  monthly: number | null;
  annual: number | null;
  priceLabel?: string;
  billingNote?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export type CommandPlanCardProps = {
  plan: CommandPlan;
  billing: "monthly" | "annual";
  index: number;
};

function CornerMarks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-3 text-border-strong"
    >
      <span className="absolute top-0 left-0 size-3 border-current border-t border-l" />
      <span className="absolute top-0 right-0 size-3 border-current border-t border-r" />
      <span className="absolute bottom-0 left-0 size-3 border-current border-b border-l" />
      <span className="absolute right-0 bottom-0 size-3 border-current border-r border-b" />
    </div>
  );
}

export function CommandPlanCard({
  plan,
  billing,
  index,
}: CommandPlanCardProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const amount = billing === "annual" ? plan.annual : plan.monthly;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: reduce ? 0 : index * 0.08,
        ease: EASE_OUT,
      }}
      className={cn(
        "relative flex min-h-[32rem] flex-col border border-border/45 bg-background",
        plan.featured && "border-primary/35",
      )}
    >
      <CornerMarks />

      {plan.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_68%)]"
        />
      ) : null}

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-medium text-foreground tracking-[-0.04em]">
              {plan.name}
            </p>
            <p className="mt-3 max-w-[17rem] font-mono text-[11px] text-muted-foreground leading-5">
              {plan.description}
            </p>
          </div>
          <span
            aria-hidden
            className={cn(
              "mt-1 size-2 border border-border-strong bg-background",
              plan.featured && "border-primary bg-primary",
            )}
          />
        </div>

        <div className="mt-9 min-h-20">
          {amount === null ? (
            <p className="font-mono text-3xl text-foreground tracking-[-0.05em]">
              {plan.priceLabel ?? "Custom"}
            </p>
          ) : (
            <AnimatedPrice
              amount={amount}
              suffix="/ month"
              className="font-mono text-5xl tracking-[-0.07em]"
            />
          )}
          <p className="mt-3 min-h-4 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.08em]">
            {amount === null
              ? plan.billingNote
              : billing === "annual"
                ? `Billed annually · $${amount * 12}`
                : "Billed month to month"}
          </p>
        </div>

        <ul className="mt-8 space-y-3.5">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : index * 0.08 + featureIndex * 0.045,
                ease: EASE_OUT,
              }}
              className="flex items-start gap-3 font-mono text-[11px] text-muted-foreground leading-5"
            >
              <Check
                className={cn(
                  "mt-1 size-3 shrink-0 text-muted-foreground",
                  plan.featured && "text-primary",
                )}
              />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative border-border/40 border-t p-3 [background-image:repeating-linear-gradient(135deg,color-mix(in_oklch,var(--foreground)_4%,transparent)_0,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px,transparent_7px)]">
        <ButtonLink
          href={plan.cta.href}
          variant="ghost"
          className={cn(
            "group/cta h-11 w-full rounded-none border-0 bg-foreground/[0.07] font-mono text-foreground text-xs hover:bg-foreground/[0.11]",
            plan.featured &&
              "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
          )}
          whileHover={
            reduce || !canHover ? undefined : { backgroundPosition: "100% 50%" }
          }
        >
          {plan.cta.label}
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 motion-reduce:transition-none" />
        </ButtonLink>
      </div>
    </motion.article>
  );
}
