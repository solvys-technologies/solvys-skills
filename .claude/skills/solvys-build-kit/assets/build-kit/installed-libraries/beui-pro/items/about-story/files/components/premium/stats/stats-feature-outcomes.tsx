"use client";

import { WandSparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type FeatureOutcome = {
  value: number;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  label: string;
  description: string;
};

export type StatsFeatureOutcomesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  outcomes?: FeatureOutcome[];
  className?: string;
};

const DEFAULT_OUTCOMES: FeatureOutcome[] = [
  {
    value: 1800,
    suffix: "+",
    compact: true,
    label: "Teams launched sooner",
    description:
      "Reusable workflows turn repeat setup into a focused first-day launch.",
  },
  {
    value: 62,
    suffix: " hrs",
    label: "Saved every month",
    description:
      "Approvals, handoffs, and routine follow-ups keep moving without busywork.",
  },
];

function formatCompact(value: number) {
  if (value < 1000) return value.toString();
  return `${(value / 1000).toFixed(1).replace(".0", "")}k`;
}

export function StatsFeatureOutcomes({
  eyebrow = "Workflow outcomes",
  title = "Everything your team needs to keep work moving.",
  description = "Build a dependable operating rhythm once, then let every project inherit it.",
  outcomes = DEFAULT_OUTCOMES,
  className,
}: StatsFeatureOutcomesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-8 sm:py-24",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-[8%] size-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[4%] -bottom-40 size-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-br from-muted/45 via-background/35 to-muted/20" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <motion.div
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
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-muted text-foreground">
            <WandSparkles aria-hidden className="size-6" />
          </span>
          {eyebrow ? (
            <p className="mt-6 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 text-balance font-medium text-4xl leading-tight tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-muted-foreground leading-7">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-0">
          {outcomes.slice(0, 2).map((outcome, index) => (
            <motion.article
              key={outcome.label}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 22, filter: "blur(8px)" }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 0.6,
                      ease: EASE_OUT,
                      delay: index * 0.1,
                    }
              }
              className="px-4 text-center md:px-10 md:[&:not(:first-child)]:border-border md:[&:not(:first-child)]:border-l"
            >
              <p className="font-medium text-5xl tabular-nums tracking-tight">
                <NumberTicker
                  value={outcome.value}
                  prefix={outcome.prefix}
                  suffix={outcome.suffix}
                  format={outcome.compact ? formatCompact : undefined}
                  blur
                />
              </p>
              <h3 className="mt-5 font-medium text-xl">{outcome.label}</h3>
              <p className="mx-auto mt-3 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
                {outcome.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
