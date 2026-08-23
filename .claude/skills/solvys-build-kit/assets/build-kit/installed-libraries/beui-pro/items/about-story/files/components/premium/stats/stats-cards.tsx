"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type StatCard = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** e.g. "12%" — pairs with `up`. */
  trend?: string;
  up?: boolean;
  note?: string;
};

export type StatsCardsProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  stats?: StatCard[];
  className?: string;
};

const DEFAULT_STATS: StatCard[] = [
  {
    value: 28,
    suffix: "k+",
    label: "Workflows completed",
    trend: "32%",
    up: true,
    note: "Approved work moved from brief to live this month.",
  },
  {
    value: 4200,
    label: "Active workspaces",
    trend: "18%",
    up: true,
    note: "Teams with at least one shared workflow in the last 30 days.",
  },
  {
    value: 99,
    suffix: "%",
    label: "On-time delivery",
    trend: "4%",
    up: true,
    note: "Projects completed on or ahead of their planned launch date.",
  },
];

export function StatsCards({
  eyebrow = "Performance brief",
  title = "The numbers behind the work.",
  subtext = "A rolling view of delivery, adoption, and the pace teams sustain after launch.",
  stats = DEFAULT_STATS,
  className,
}: StatsCardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-20 text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
          className="max-w-3xl"
        >
          {eyebrow ? (
            <p className="font-medium text-muted-foreground text-sm">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="mt-4 text-balance font-medium text-4xl leading-tight tracking-tight">
              {title}
            </h2>
          ) : null}
          {subtext ? (
            <p className="mt-5 max-w-2xl text-pretty text-muted-foreground leading-7">
              {subtext}
            </p>
          ) : null}
        </motion.header>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {stats.slice(0, 3).map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={
                reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }
              }
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, margin: "-50px" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...SPRING_LAYOUT, delay: index * 0.06 }
              }
              className="rounded-2xl bg-muted p-2"
            >
              <div className="flex min-h-12 items-center justify-between gap-4 px-2 py-1">
                <h3 className="text-balance font-medium text-xl leading-tight tracking-tight">
                  {stat.label}
                </h3>
                {stat.trend ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-background px-3 py-1.5 font-medium text-foreground text-xs">
                    {stat.up ? (
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    ) : (
                      <ArrowDownRight aria-hidden className="size-3.5" />
                    )}
                    <span className="sr-only">
                      {stat.up ? "Increased" : "Decreased"} by
                    </span>
                    {stat.trend}
                  </span>
                ) : null}
              </div>

              <div className="flex min-h-56 flex-col rounded-2xl bg-background p-5 sm:p-6">
                <p className="font-medium text-5xl tabular-nums tracking-tighter sm:text-6xl">
                  <NumberTicker
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    locale
                    blur
                  />
                </p>

                <div className="mt-auto border-border border-t pt-5">
                  <p className="max-w-md text-pretty text-muted-foreground text-sm leading-6">
                    {stat.note ??
                      "Measured across the current reporting period."}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
