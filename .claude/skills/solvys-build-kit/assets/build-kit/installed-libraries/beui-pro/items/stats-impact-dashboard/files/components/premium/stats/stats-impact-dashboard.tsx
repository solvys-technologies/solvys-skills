"use client";

import { Building2, Leaf } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ImpactMetric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

export type StatsImpactDashboardProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  title?: string;
  reach?: ImpactMetric;
  progress?: number;
  targetLabel?: string;
  supportingMetrics?: ImpactMetric[];
  className?: string;
};

const DEFAULT_REACH: ImpactMetric = {
  value: 84,
  suffix: "M",
  label: "People reached",
  detail: "Communities with reliable access to clean infrastructure.",
};

const DEFAULT_SUPPORTING_METRICS: ImpactMetric[] = [
  {
    value: 12,
    suffix: "M",
    label: "Emissions avoided",
    detail: "Tons of CO2",
  },
  {
    value: 180,
    suffix: "+",
    label: "Local partners",
    detail: "Across 28 regions",
  },
];

const SUPPORTING_ICONS = [Leaf, Building2];

export function StatsImpactDashboard({
  eyebrow = "Impact overview",
  heading = "Every milestone moves the mission forward.",
  description = "Track the reach, progress, and partnerships behind work that lasts.",
  title = "Measured in outcomes.",
  reach = DEFAULT_REACH,
  progress = 72,
  targetLabel = "2030 target",
  supportingMetrics = DEFAULT_SUPPORTING_METRICS,
  className,
}: StatsImpactDashboardProps) {
  const reduceMotion = useReducedMotion();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const fillFadeWidth = Math.min(clampedProgress + 16, 100);

  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-20 text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              reduceMotion ? undefined : { duration: 0.65, ease: EASE_OUT }
            }
            className="flex h-full flex-col"
          >
            <div className="max-w-lg">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-medium text-4xl leading-tight tracking-tight">
                {heading}
              </h2>
              <p className="mt-5 max-w-md text-pretty text-muted-foreground leading-7">
                {description}
              </p>
            </div>

            <div className="mt-16 lg:mt-auto">
              <h3 className="font-medium text-xl">{title}</h3>
              <p className="mt-8 font-medium text-7xl tabular-nums tracking-tighter sm:text-8xl">
                <NumberTicker
                  value={reach.value}
                  prefix={reach.prefix}
                  suffix={reach.suffix}
                  blur
                />
              </p>
              <p className="mt-5 font-medium text-xl">{reach.label}</p>
              <p className="mt-3 max-w-md text-pretty text-muted-foreground text-sm leading-6">
                {reach.detail}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.article
              aria-label="Progress deployed"
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={clampedProgress}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              role="progressbar"
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 0.65, ease: EASE_OUT, delay: 0.08 }
              }
              className="relative min-h-64 overflow-hidden rounded-3xl bg-card p-6 sm:col-span-2 sm:p-8"
            >
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillFadeWidth}%` }}
              >
                <motion.div
                  className="absolute inset-0 origin-left bg-linear-to-r from-primary/25 via-primary/10 to-transparent"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 1.25,
                          ease: EASE_OUT,
                          delay: 0.12,
                        }
                  }
                />
              </div>
              <div className="relative z-10 flex items-start justify-between gap-6">
                <h3 className="font-medium text-xl">Progress deployed</h3>
                <span className="text-muted-foreground text-sm">
                  {targetLabel}
                </span>
              </div>
              <p className="relative z-10 mt-12 font-medium text-5xl tabular-nums tracking-tight">
                <NumberTicker value={clampedProgress} suffix="%" blur />
              </p>
            </motion.article>

            {supportingMetrics.slice(0, 2).map((metric, index) => {
              const Icon = SUPPORTING_ICONS[index];
              return (
                <motion.article
                  key={metric.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 0.6,
                          ease: EASE_OUT,
                          delay: 0.16 + index * 0.08,
                        }
                  }
                  className="rounded-3xl bg-card p-6 sm:p-8"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-background text-foreground">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-8 font-medium text-xl">{metric.label}</h3>
                  <p className="mt-5 font-medium text-4xl tabular-nums tracking-tight">
                    <NumberTicker
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      blur
                    />
                  </p>
                  <p className="mt-2 text-muted-foreground text-xs uppercase tracking-[0.14em]">
                    {metric.detail}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
