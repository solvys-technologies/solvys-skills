"use client";

import {
  BadgeCheck,
  Blocks,
  CircleArrowUp,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentType } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { useDarkTheme } from "@/lib/hooks/use-dark-theme";
import { cn } from "@/lib/utils";
import { AnimatedPrice } from "./animated-price";
import { PricingAuroraSurface } from "./pricing-aurora-surface";

export type AuroraPricingFeature = {
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

export type PricingAuroraFlowProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  planName?: string;
  price?: number;
  priceSuffix?: string;
  features?: AuroraPricingFeature[];
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
  className?: string;
};

const DEFAULT_FEATURES: AuroraPricingFeature[] = [
  { label: "Every premium component", icon: Blocks },
  { label: "New releases from day one", icon: Sparkles },
  { label: "Request the block you need", icon: CircleArrowUp },
  { label: "Lifetime source updates", icon: RefreshCcw },
  { label: "Commercial project license", icon: BadgeCheck },
];

export function PricingAuroraFlow({
  eyebrow = "All-access membership",
  title = "Own the source. Keep every update.",
  description = "One payment unlocks the complete library and every new release that follows.",
  planName = "Lifetime",
  price = 129,
  priceSuffix = "one time",
  features = DEFAULT_FEATURES,
  ctaLabel = "Get instant access",
  ctaHref = "#",
  note = "Pay once · use in unlimited projects",
  className,
}: PricingAuroraFlowProps) {
  const reduce = useReducedMotion();
  const dark = useDarkTheme();

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-8 sm:py-28",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="max-w-xl"
        >
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.17em]">
            {eyebrow}
          </p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[0.98] tracking-[-0.055em]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-pretty text-base text-muted-foreground leading-7">
            {description}
          </p>
          <div className="mt-9 flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
            <span className="h-px w-10 bg-border" />
            {note}
          </div>
        </motion.div>

        <motion.article
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            delay: reduce ? 0 : 0.08,
            ease: EASE_OUT,
          }}
          className={cn(
            "relative mx-auto flex min-h-[42rem] w-full max-w-[35rem] flex-col overflow-hidden rounded-[2.5rem]",
            dark ? "text-white" : "text-[#141714]",
          )}
        >
          <PricingAuroraSurface />

          <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xl font-medium tracking-[-0.03em]">
                {planName}
              </p>
              <span
                className={cn(
                  "rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em]",
                  dark
                    ? "bg-white/8 text-white/62"
                    : "bg-black/5 text-black/55",
                )}
              >
                Full source
              </span>
            </div>

            <div className="mt-8">
              <AnimatedPrice
                amount={price}
                suffix={priceSuffix}
                className={cn(
                  "text-7xl tracking-[-0.075em] sm:text-8xl",
                  dark
                    ? "text-white [&>span]:text-white/62"
                    : "text-[#141714] [&>span]:text-black/52",
                )}
              />
            </div>

            <ul className="mt-10 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon ?? BadgeCheck;
                return (
                  <motion.li
                    key={feature.label}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: reduce ? 0 : 0.18 + index * 0.055,
                      ease: EASE_OUT,
                    }}
                    className={cn(
                      "flex items-center gap-4 text-base sm:text-lg",
                      dark ? "text-white/64" : "text-black/58",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full",
                        dark
                          ? "bg-white/8 text-white"
                          : "bg-black/6 text-black/72",
                      )}
                    >
                      <Icon className="size-[1.1rem]" />
                    </span>
                    <span>{feature.label}</span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-auto pt-10">
              <ButtonLink
                href={ctaHref}
                size="lg"
                className={cn(
                  "h-14 w-full border-0 text-base",
                  dark
                    ? "bg-white text-black hover:bg-white/88 hover:text-black"
                    : "bg-black text-white hover:bg-black/84 hover:text-white",
                )}
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
