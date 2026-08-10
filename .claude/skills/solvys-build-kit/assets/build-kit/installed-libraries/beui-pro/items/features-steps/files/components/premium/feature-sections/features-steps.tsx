"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const ACCENT = "#2563eb";

export type FeatureStep = {
  id: string;
  title: string;
  description: string;
};

export type FeaturesStepsProps = {
  eyebrow?: string;
  /** Headline lines; the last line is accent-colored. */
  title?: string[];
  subtext?: string;
  steps?: FeatureStep[];
  className?: string;
};

const DEFAULT_STEPS: FeatureStep[] = [
  {
    id: "describe",
    title: "Describe what you need",
    description:
      "Tell beUI the page you want in plain English — no complex setup, just your goal and brand.",
  },
  {
    id: "compose",
    title: "Drop in the blocks",
    description:
      "Pick premium blocks and components; they compose into a complete, animated screen.",
  },
  {
    id: "ship",
    title: "Ship the page",
    description:
      "Preview, copy the source into your repo, and publish — production-ready in minutes.",
  },
];

export function FeaturesSteps({
  eyebrow = "Simple by design",
  title = ["From idea to shipped UI in", "three steps"],
  subtext = "Turn a single prompt into a finished interface — compose premium blocks and own the source, all from one workflow.",
  steps = DEFAULT_STEPS,
  className,
}: FeaturesStepsProps) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(steps[0]?.id);
  const [paused, setPaused] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeId restarts the timer on manual selection.
  useEffect(() => {
    if (reduce || paused || steps.length < 2) return;
    const id = setInterval(() => {
      setActiveId((current) => {
        const index = steps.findIndex((step) => step.id === current);
        return steps[(index + 1) % steps.length]?.id ?? current;
      });
    }, 3800);
    return () => clearInterval(id);
  }, [reduce, paused, steps, activeId]);

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId),
  );
  const active = steps[activeIndex] ?? steps[0];
  if (!active) return null;

  const lastLine = title[title.length - 1];
  const leadLines = title.slice(0, -1);

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, ease: EASE_OUT, delay },
        };

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">
        {/* Centered header. */}
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? (
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              {eyebrow}
            </p>
          ) : null}
          <motion.h2
            {...rise(0.05)}
            className="mt-5 text-balance font-medium text-4xl text-foreground leading-none tracking-tight"
          >
            {leadLines.join(" ")}{" "}
            <span style={{ color: ACCENT }}>{lastLine}</span>
          </motion.h2>
          {subtext ? (
            <motion.p
              {...rise(0.14)}
              className="mt-4 text-pretty text-muted-foreground text-sm leading-7 sm:text-base"
            >
              {subtext}
            </motion.p>
          ) : null}
        </div>

        <div
          className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* Numbered steps. */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const selected = step.id === active.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveId(step.id)}
                  onPointerEnter={() => setActiveId(step.id)}
                  className="max-w-md text-left outline-none"
                >
                  <span
                    className="font-medium font-mono text-sm transition-colors"
                    style={selected ? { color: ACCENT } : undefined}
                  >
                    <span
                      className={selected ? "" : "text-muted-foreground/50"}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3
                    className={cn(
                      "mt-1 font-medium text-xl transition-colors",
                      selected ? "text-foreground" : "text-muted-foreground/60",
                    )}
                  >
                    {step.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {selected ? (
                      <motion.p
                        initial={
                          reduce
                            ? false
                            : { height: 0, opacity: 0, marginTop: 0 }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                          marginTop: 8,
                        }}
                        exit={
                          reduce
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0, marginTop: 0 }
                        }
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { duration: 0.32, ease: EASE_OUT }
                        }
                        className="overflow-hidden text-muted-foreground text-sm leading-7"
                      >
                        {step.description}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Synced visual. */}
          <div className="relative h-[24rem] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/50 to-card">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 0%, color-mix(in oklch, #2563eb 12%, transparent), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.32, ease: EASE_OUT }
                  }
                  className="w-full max-w-sm"
                >
                  <StepMock index={activeIndex} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepMock({ index }: { index: number }) {
  if (index === 1) {
    const blocks = ["Hero section", "Pricing block", "CTA section"];
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-44px_color-mix(in_oklch,var(--foreground)_60%,transparent)]">
        <p className="font-medium text-foreground text-sm">Composing page…</p>
        <div className="mt-4 flex flex-col gap-2.5">
          {blocks.map((block) => (
            <div
              key={block}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm"
            >
              <span
                className="grid size-4 place-items-center rounded-full text-white"
                style={{ backgroundColor: ACCENT }}
              >
                <Check className="size-2.5" />
              </span>
              {block}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-44px_color-mix(in_oklch,var(--foreground)_60%,transparent)]">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground text-sm">
            Preview ready
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium text-white text-xs"
            style={{ backgroundColor: ACCENT }}
          >
            <span className="size-1.5 rounded-full bg-white" /> Live
          </span>
        </div>
        <div className="mt-4 space-y-2 rounded-xl border border-border bg-background p-3">
          <div className="h-2.5 w-1/2 rounded-full bg-foreground/15" />
          <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
          <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
          <div
            className="mt-3 h-7 w-24 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        </div>
      </div>
    );
  }

  // step 0 — prompt with highlighted intent + a floating toolbar.
  return (
    <div className="relative rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-44px_color-mix(in_oklch,var(--foreground)_60%,transparent)]">
      <p className="text-foreground text-sm leading-7">
        Build a{" "}
        <span
          className="rounded px-1"
          style={{
            backgroundColor: "color-mix(in oklch, #2563eb 18%, transparent)",
            color: ACCENT,
          }}
        >
          pricing page with a hero
        </span>{" "}
        and a{" "}
        <span
          className="rounded px-1"
          style={{
            backgroundColor: "color-mix(in oklch, #2563eb 18%, transparent)",
            color: ACCENT,
          }}
        >
          gradient CTA
        </span>{" "}
        for my SaaS.
      </p>
      <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-neutral-900 p-1 text-white text-xs">
        <span className="rounded-full px-3 py-1.5 text-white/70">Generate</span>
        <span className="rounded-full bg-white/15 px-3 py-1.5">Compose</span>
      </div>
    </div>
  );
}
