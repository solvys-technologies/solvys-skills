"use client";

import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub?: string;
};

export type StatsBandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: Stat[];
  className?: string;
};

const DEFAULT_STATS: Stat[] = [
  {
    value: 28,
    suffix: "k+",
    label: "Workflows completed",
    sub: "this quarter",
  },
  {
    value: 99.99,
    suffix: "%",
    label: "Platform uptime",
    sub: "rolling 90 days",
  },
  {
    value: 42,
    suffix: "%",
    label: "Faster delivery",
    sub: "from brief to launch",
  },
  {
    value: 18,
    label: "Regions online",
    sub: "no degraded zones",
  },
];

export function StatsBand({
  eyebrow = "Quarterly signal",
  title = "Momentum you can measure.",
  description = "A clear view of the pace, reliability, and reach behind every release.",
  stats = DEFAULT_STATS,
  className,
}: StatsBandProps) {
  const reduceMotion = useReducedMotion();
  const visibleStats = stats.slice(0, 4);

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
            reduceMotion ? undefined : { duration: 0.65, ease: EASE_OUT }
          }
          className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-end"
        >
          <div>
            {eyebrow ? (
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-4 max-w-2xl text-balance font-medium text-4xl leading-tight tracking-tight">
                {title}
              </h2>
            ) : null}
          </div>
          {description ? (
            <p className="max-w-md text-pretty text-muted-foreground leading-7 md:justify-self-end">
              {description}
            </p>
          ) : null}
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.85, ease: EASE_OUT, delay: 0.08 }
          }
          aria-hidden
          className="mt-12 h-px origin-left bg-border"
        />

        <div className="grid grid-cols-1 border-border border-b sm:grid-cols-2 lg:grid-cols-4">
          {visibleStats.map((stat, index) => (
            <BandStat
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

function BandStat({
  stat,
  index,
  reduceMotion,
}: {
  stat: Stat;
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
          ? undefined
          : {
              duration: 0.6,
              ease: EASE_OUT,
              delay: 0.14 + index * 0.07,
            }
      }
      className={cn(
        "relative min-h-52 border-border px-1 py-8 sm:min-h-60 sm:px-6 sm:py-10",
        index > 0 && "border-t sm:border-t-0",
        index > 1 && "sm:border-t lg:border-t-0",
        index % 2 === 1 && "sm:border-l",
        index > 0 && "lg:border-t-0 lg:border-l",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-muted-foreground text-xs tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-border" aria-hidden />
      </div>

      <p className="mt-9 font-medium text-5xl tabular-nums tracking-tighter sm:text-6xl">
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
      <h3 className="mt-8 font-medium text-lg">{stat.label}</h3>
      {stat.sub ? (
        <p className="mt-1 text-muted-foreground text-sm">{stat.sub}</p>
      ) : null}
    </motion.article>
  );
}
