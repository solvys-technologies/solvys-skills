"use client";

import { ArrowUpRight, CircleCheck, Globe2, Radio, Timer } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type TelemetryMetric = {
  label: string;
  value: number;
  step: number;
  suffix?: string;
  note: string;
};

export type StatsTelemetryProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  metrics?: TelemetryMetric[];
  className?: string;
};

const DEFAULT_METRICS: TelemetryMetric[] = [
  {
    label: "Events processed",
    value: 842019,
    step: 684,
    suffix: "+",
    note: "Across the last 24 hours",
  },
  {
    label: "Median latency",
    value: 42,
    step: -1,
    suffix: "ms",
    note: "Global p50 response",
  },
  {
    label: "Active regions",
    value: 18,
    step: 0,
    note: "No degraded zones",
  },
  {
    label: "Success rate",
    value: 99.94,
    step: 0.01,
    suffix: "%",
    note: "Rolling 30-day window",
  },
];

const EVENTS = [
  "iad1 · deploy ready",
  "fra1 · cache warm",
  "sin1 · queue drained",
  "syd1 · edge synced",
];

const BAR_IDS = Array.from({ length: 32 }, (_, index) => `activity-${index}`);
const METRIC_ICONS = [Timer, Globe2, CircleCheck];

function activityLevel(index: number, tick: number) {
  return 0.2 + ((Math.sin(index * 1.4 + tick * 0.7) + 1) / 2) * 0.8;
}

export function StatsTelemetry({
  eyebrow = "Live telemetry",
  title = "See every signal as it happens.",
  description = "Track throughput, latency, and regional health in one focused view.",
  metrics = DEFAULT_METRICS,
  className,
}: StatsTelemetryProps) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const primary = metrics[0] ?? DEFAULT_METRICS[0];
  const secondary = metrics.slice(1, 4);
  const event = EVENTS[tick % EVENTS.length];

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
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="relative flex size-2">
                {!reduceMotion ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ opacity: [0.5, 0], scale: [1, 2.2] }}
                    transition={{
                      duration: 1.8,
                      ease: EASE_OUT,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ) : null}
                <span className="relative size-2 rounded-full bg-primary" />
              </span>
              <p className="font-medium text-xs uppercase tracking-widest">
                {eyebrow}
              </p>
            </div>
            <h2 className="mt-5 text-balance font-medium text-4xl leading-tight tracking-tight">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground leading-7">
              {description}
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={event}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 font-mono text-muted-foreground text-xs"
            >
              <Radio aria-hidden className="size-3.5" />
              {event}
            </motion.div>
          </AnimatePresence>
        </motion.header>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.65, ease: EASE_OUT, delay: 0.06 }
            }
            className="flex min-h-96 flex-col rounded-3xl bg-card p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="font-medium text-xl">{primary.label}</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {primary.note}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1.5 font-medium text-sm tabular-nums">
                <ArrowUpRight aria-hidden className="size-4" />
                8.4%
              </span>
            </div>

            <p className="mt-8 font-medium text-5xl tabular-nums tracking-tighter sm:text-7xl">
              <NumberTicker
                value={primary.value + primary.step * tick}
                suffix={primary.suffix}
                locale
                startOnView={false}
                duration={0.55}
                blur
              />
            </p>

            <div className="mt-auto flex h-32 items-end gap-1.5 overflow-hidden rounded-2xl bg-background px-4 pt-5 sm:gap-2 sm:px-5">
              {BAR_IDS.map((barId, index) => {
                const scale = activityLevel(index, tick);
                const recent = index >= BAR_IDS.length - 7;
                return (
                  <motion.span
                    key={barId}
                    initial={false}
                    animate={reduceMotion ? undefined : { scaleY: scale }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { ...SPRING_PANEL, delay: index * 0.006 }
                    }
                    style={
                      reduceMotion
                        ? { transform: `scaleY(${scale})` }
                        : undefined
                    }
                    className={cn(
                      "h-full w-full origin-bottom rounded-t-sm bg-primary/20",
                      recent && "bg-primary/70",
                    )}
                  />
                );
              })}
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {secondary.map((metric, index) => {
              const Icon = METRIC_ICONS[index];
              const liveValue = metric.value + metric.step * (tick % 5);
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
                          duration: 0.55,
                          ease: EASE_OUT,
                          delay: 0.1 + index * 0.07,
                        }
                  }
                  className="flex min-h-44 flex-col rounded-3xl bg-card p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-xl">{metric.label}</h3>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                      <Icon aria-hidden className="size-5" />
                    </span>
                  </div>
                  <p className="mt-auto pt-6 font-medium text-4xl tabular-nums tracking-tight">
                    <NumberTicker
                      value={
                        metric.label === "Success rate"
                          ? Math.round(liveValue * 100)
                          : liveValue
                      }
                      suffix={metric.suffix}
                      startOnView={false}
                      duration={0.5}
                      blur
                      format={
                        metric.label === "Success rate"
                          ? (value) => (value / 100).toFixed(2)
                          : undefined
                      }
                    />
                  </p>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {metric.note}
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
