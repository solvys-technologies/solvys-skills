"use client";

import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type OutcomeIndexStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  context?: string;
};

export type StatsOutcomeIndexProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: OutcomeIndexStat[];
  className?: string;
};

const DEFAULT_STATS: OutcomeIndexStat[] = [
  {
    value: 72,
    suffix: "%",
    label: "Fewer manual handoffs",
    description:
      "Routine approvals move forward without another meeting or status check.",
    context: "Across the last 90 days",
  },
  {
    value: 3.4,
    suffix: "×",
    label: "More launches per quarter",
    description:
      "A shared operating rhythm keeps good work moving from decision to delivery.",
    context: "Compared with last year",
  },
  {
    value: 84,
    suffix: "h",
    label: "Returned to every team",
    description:
      "Less coordination overhead gives each team more time for focused work.",
    context: "Average monthly savings",
  },
];

export function StatsOutcomeIndex({
  eyebrow = "Operational outcomes",
  title = "Results that change\nthe rhythm of work.",
  description = "Three measures that show what happens when momentum becomes part of the system.",
  stats = DEFAULT_STATS,
  className,
}: StatsOutcomeIndexProps) {
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
          initial={
            reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT }
          }
          className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end"
        >
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-5 whitespace-pre-line text-balance font-medium text-4xl leading-tight tracking-tight">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-pretty text-muted-foreground leading-7 md:justify-self-end">
            {description}
          </p>
        </motion.header>

        <div className="mt-14 border-border border-b">
          {stats.slice(0, 3).map((stat, index) => (
            <OutcomeRow
              key={stat.label}
              stat={stat}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeRow({
  stat,
  index,
  reduceMotion,
}: {
  stat: OutcomeIndexStat;
  index: number;
  reduceMotion: boolean;
}) {
  const decimalPlaces = stat.value.toString().split(".")[1]?.length ?? 0;
  const scale = 10 ** decimalPlaces;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.65,
              ease: EASE_OUT,
              delay: index * 0.08,
            }
      }
      className="relative grid gap-8 py-10 sm:py-12 md:min-h-64 md:grid-cols-[4rem_minmax(13rem,0.75fr)_1fr] md:items-center md:gap-10"
    >
      <motion.span
        aria-hidden
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.8,
                ease: EASE_OUT,
                delay: index * 0.08,
              }
        }
        className="absolute inset-x-0 top-0 h-px origin-left bg-border"
      />

      <div>
        <p className="flex size-10 items-center justify-center rounded-full bg-muted font-mono text-muted-foreground text-xs tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      <p className="font-medium text-6xl tabular-nums tracking-tighter sm:text-7xl md:text-8xl">
        <NumberTicker
          value={stat.value * scale}
          prefix={stat.prefix}
          suffix={stat.suffix}
          format={
            decimalPlaces
              ? (value) => (value / scale).toFixed(decimalPlaces)
              : undefined
          }
          blur
        />
      </p>

      <div className="max-w-2xl">
        <h3 className="text-balance font-medium text-xl tracking-tight">
          {stat.label}
        </h3>
        <p className="mt-3 max-w-lg text-pretty text-muted-foreground text-sm leading-6">
          {stat.description}
        </p>
        {stat.context ? (
          <div className="mt-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-border" />
            <p className="font-mono text-muted-foreground text-xs">
              {stat.context}
            </p>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
