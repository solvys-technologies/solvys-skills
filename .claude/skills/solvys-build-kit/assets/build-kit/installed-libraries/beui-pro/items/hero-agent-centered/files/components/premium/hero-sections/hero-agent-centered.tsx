"use client";

import { Bot, Check, FileText, Send } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";

export type HeroAgentCenteredProps = {
  eyebrow?: string;
  titleTop?: string;
  titleBottom?: string;
  subtext?: string;
  className?: string;
};

const FACES = ["Aria", "Milo", "Juno", "Remy"];

const STEPS: { label: string; sub: string; tint: string }[] = [
  {
    label: "Anomaly detected",
    sub: "p99 latency crossed 800ms on checkout-api",
    tint: "bg-emerald-500",
  },
  {
    label: "Agent investigating",
    sub: "Tracing slow spans and recent deploys",
    tint: "bg-sky-500",
  },
  {
    label: "Root cause isolated",
    sub: "Database connection pool saturated",
    tint: "bg-teal-500",
  },
  {
    label: "Fix applied",
    sub: "Pool size raised, +2 replicas rolled out",
    tint: "bg-amber-500",
  },
  {
    label: "Team notified",
    sub: "Summary posted to #incidents",
    tint: "bg-rose-500",
  },
];

const CHAT = [
  "p99 latency hit 920ms — pulling traces from the last deploy now.",
  "Root cause: the connection pool is saturated under peak load.",
  "Raised the pool size and added 2 replicas — latency is back to 180ms.",
];

// Re-mount the demo subtree on an interval so the scripted sequence replays.
function useReplay(still: boolean, duration: number) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setCycle((c) => c + 1), duration);
    return () => clearInterval(id);
  }, [still, duration]);
  return cycle;
}

export function HeroAgentCentered({
  eyebrow = "Loved by platform teams",
  titleTop = "Resolve incidents before",
  titleBottom = "anyone files a ticket",
  subtext = "An always-on agent that watches your services, finds the root cause, and ships the fix — looping in humans only when it actually matters.",
  className,
}: HeroAgentCenteredProps) {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: EASE_OUT, delay },
        };

  return (
    <section
      className={cn("w-full overflow-hidden px-4 py-16 sm:px-8", className)}
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Copy. */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pr-4 pl-1.5 font-medium text-foreground text-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.07)]"
          >
            <span className="flex">
              {FACES.map((seed) => (
                // biome-ignore lint/performance/noImgElement: small remote SVG avatar
                <img
                  key={seed}
                  src={`https://api.dicebear.com/10.x/glass/svg?seed=${seed}`}
                  alt=""
                  aria-hidden
                  className="-ml-2 size-5 rounded-full ring-2 ring-card first:ml-0"
                />
              ))}
            </span>
            {eyebrow}
          </motion.span>

          <motion.h1
            {...rise(0.06)}
            className="mt-6 text-balance font-semibold text-3xl leading-[1.1] tracking-tight sm:text-5xl"
          >
            <span className="text-foreground">{titleTop}</span>
            <br />
            <span className="text-muted-foreground/50">{titleBottom}</span>
          </motion.h1>

          {subtext ? (
            <motion.p
              {...rise(0.12)}
              className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground leading-7"
            >
              {subtext}
            </motion.p>
          ) : null}

          <motion.div
            {...rise(0.18)}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink
              href="/"
              size="lg"
              className="w-full rounded-full sm:w-auto"
            >
              Start automating
            </ButtonLink>
            <ButtonLink
              href="/"
              variant="outline"
              size="lg"
              className="w-full rounded-full sm:w-auto"
            >
              Book a demo
            </ButtonLink>
          </motion.div>
        </div>

        {/* Demo stage. */}
        <AgentDemo reduce={reduce} />
      </div>
    </section>
  );
}

function AgentDemo({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const still = !!reduce || !inView;
  const cycle = useReplay(still, 7200);

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.4, ease: EASE_OUT, delay },
        };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? undefined : { duration: 0.7, ease: EASE_OUT }}
      className="relative mt-14 overflow-hidden rounded-3xl border border-border/60"
    >
      {/* Animated shader backdrop (feature-section language). */}
      <Grainient
        className="absolute inset-0"
        color1="#aab4ff"
        color2="#4f6ef7"
        color3="#3b54e0"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />

      <div className="relative grid items-start gap-5 p-5 pt-16 sm:grid-cols-2 sm:gap-6 sm:p-10 sm:pt-24">
        {/* Workflow timeline card — steps stream in on a loop. */}
        <div className="rounded-[1.4rem] bg-white/15 p-1.5 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
          <div className="rounded-2xl border border-black/[0.06] bg-white/95 p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-full bg-neutral-100 text-neutral-600">
                <FileText className="size-4" />
              </span>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">
                  Latency spike detected
                </p>
                <p className="text-[11px] text-neutral-500">
                  checkout-api · 30s ago
                </p>
              </div>
            </div>

            <p className="mt-4 font-medium text-[10px] text-neutral-400 uppercase tracking-wider">
              Workflow progress
            </p>
            <motion.div key={`steps-${cycle}`} className="mt-2 flex flex-col">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...rise(0.2 + i * 0.45)}
                  className="flex gap-3 py-1.5"
                >
                  <span className="mt-1 flex flex-col items-center">
                    <span className={cn("size-2 rounded-full", s.tint)} />
                    <span className="mt-0.5 h-5 w-px bg-neutral-200 last:hidden" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-neutral-800 text-xs">
                        {s.label}
                      </p>
                      <motion.span
                        {...(still
                          ? {}
                          : {
                              initial: { scale: 0 },
                              animate: { scale: 1 },
                              transition: {
                                ...SPRING_BOUNCE,
                                delay: 0.45 + i * 0.45,
                              },
                            })}
                        className="grid size-4 place-items-center rounded-full bg-emerald-500 text-white"
                      >
                        <Check className="size-2.5" />
                      </motion.span>
                    </div>
                    <p className="text-[11px] text-neutral-500">{s.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              {...rise(0.2 + STEPS.length * 0.45)}
              className="mt-2 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5"
            >
              <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="size-3" />
              </span>
              <span className="font-medium text-emerald-700 text-xs">
                Incident resolved
              </span>
              <span className="ml-auto text-[10px] text-emerald-600/70">
                09:42
              </span>
            </motion.div>
          </div>
        </div>

        {/* AI agent chat card — replies stream in on a loop. */}
        <div className="rounded-[1.4rem] bg-white/15 p-1.5 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
          <div className="flex flex-col rounded-2xl border border-black/[0.06] bg-white/95 p-4">
            <div className="flex items-center gap-2.5 border-neutral-100 border-b pb-3">
              <span className="grid size-8 place-items-center rounded-full bg-sky-100 text-sky-600">
                <Bot className="size-4" />
              </span>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">
                  AI Agent
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Site reliability agent · online
                </p>
              </div>
            </div>

            <motion.div
              key={`chat-${cycle}`}
              className="flex flex-1 flex-col gap-2.5 py-4"
            >
              <motion.div
                {...rise(0.2)}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-sky-500 px-3 py-2 text-white text-xs"
              >
                checkout-api is throwing latency alerts — take a look?
              </motion.div>
              {CHAT.map((msg, i) => (
                <motion.div
                  key={msg}
                  {...rise(0.7 + i * 0.7)}
                  className="flex max-w-[90%] items-start gap-2 self-start"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600">
                    <Bot className="size-3" />
                  </span>
                  <p className="rounded-2xl rounded-bl-sm border border-neutral-100 bg-neutral-50 px-3 py-2 text-[11px] text-neutral-700 leading-5">
                    {msg}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2">
              <span className="text-[11px] text-neutral-400">
                Ask anything or type a command…
              </span>
              <span className="ml-auto grid size-6 place-items-center rounded-full bg-sky-500 text-white">
                <Send className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
