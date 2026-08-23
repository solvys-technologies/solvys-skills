"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  FileCheck2,
  Layers3,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, EASE_OUT_CSS } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type HowItWorksCardDeckStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export type HowItWorksCardDeckProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  steps?: HowItWorksCardDeckStep[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
};

const DEFAULT_STEPS: HowItWorksCardDeckStep[] = [
  {
    id: "collect",
    label: "Collect",
    title: "Start with the real context",
    description:
      "Bring requests, notes, and examples into one place before deciding what the work should become.",
    icon: ClipboardList,
  },
  {
    id: "shape",
    label: "Shape",
    title: "Turn the signal into a brief",
    description:
      "Clarify the outcome, remove the noise, and give every decision a reason the whole team can see.",
    icon: Sparkles,
  },
  {
    id: "build",
    label: "Build",
    title: "Move through one shared plan",
    description:
      "Keep owners, progress, and review in the same flow so handoffs stay clear from start to finish.",
    icon: Layers3,
  },
  {
    id: "release",
    label: "Release",
    title: "Ship the version everyone approved",
    description:
      "Close the loop with a final check, publish confidently, and leave the next iteration easy to find.",
    icon: Send,
  },
];

export function HowItWorksCardDeck({
  eyebrow = "How it works",
  title = ["A clear path from", "first thought to finished work."],
  description = "Move through the process one decision at a time. Use the controls to fold completed steps into the deck.",
  steps = DEFAULT_STEPS,
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  className,
}: HowItWorksCardDeckProps) {
  const safeSteps = useMemo(
    () => steps.filter((step) => step.id).slice(0, 5),
    [steps],
  );
  const lastIndex = Math.max(0, safeSteps.length - 1);
  const clampIndex = (index: number) => Math.min(Math.max(index, 0), lastIndex);
  const [internalActiveIndex, setInternalActiveIndex] = useState(() =>
    clampIndex(defaultActiveIndex),
  );
  const activeIndex = clampIndex(controlledActiveIndex ?? internalActiveIndex);
  const reduceMotion = useReducedMotion() ?? false;

  function setActiveIndex(nextIndex: number) {
    const next = clampIndex(nextIndex);
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(next);
    }
    onActiveIndexChange?.(next);
  }

  if (safeSteps.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
      data-slot="how-it-works-card-deck"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          <div>
            <motion.span
              className="inline-flex rounded-full border border-border/70 bg-card px-3 py-1.5 font-medium text-muted-foreground text-xs"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      filter: "blur(5px)",
                      transform: "translate3d(0,8px,0)",
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: EASE_OUT }
              }
              viewport={{ once: true, margin: "-50px" }}
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      filter: "blur(0px)",
                      transform: "translate3d(0,0,0)",
                    }
              }
            >
              {eyebrow}
            </motion.span>

            <TextReveal
              as="h2"
              blur={10}
              className="mt-7 max-w-4xl text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
              stagger={0.06}
              text={title}
              whileInView
              yOffset="22%"
            />
          </div>

          <motion.div
            className="max-w-xl lg:justify-self-end"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    filter: "blur(7px)",
                    transform: "translate3d(0,12px,0)",
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.22, ease: EASE_OUT }
            }
            viewport={{ once: true, margin: "-50px" }}
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    filter: "blur(0px)",
                    transform: "translate3d(0,0,0)",
                  }
            }
          >
            <p className="text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
              {description}
            </p>

            <nav
              aria-label="Process navigation"
              className="mt-6 flex items-center gap-2"
            >
              <Button
                aria-label="Show previous process step"
                className="size-10 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex(activeIndex - 1)}
                pressScale={1}
                size="icon"
                variant="outline"
              >
                <ArrowLeft aria-hidden className="size-4" />
              </Button>
              <Button
                aria-label="Stack the current process step"
                className="size-10 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                disabled={activeIndex === lastIndex}
                onClick={() => setActiveIndex(activeIndex + 1)}
                pressScale={1}
                size="icon"
                variant="primary"
              >
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <span aria-live="polite" className="sr-only">
                Step {activeIndex + 1} of {safeSteps.length}
              </span>
            </nav>
          </motion.div>
        </div>

        <motion.div
          className="relative mt-14 h-[25rem] w-screen [--deck-card-width:calc(100vw-6.5rem)] [--deck-gap:0.75rem] [--deck-stack-offset:1.5rem] sm:mt-16 sm:h-[27rem] sm:[--deck-card-width:22rem] sm:[--deck-gap:1rem] sm:[--deck-stack-offset:3.5rem] lg:[--deck-card-width:28rem] lg:[--deck-stack-offset:4.75rem]"
          data-slot="how-it-works-card-deck-list"
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.65, delay: 0.12, ease: EASE_OUT }
          }
          viewport={{ once: true, margin: "-80px" }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }
          }
        >
          {safeSteps.map((step, index) => {
            const Icon =
              step.icon ?? [ClipboardList, Sparkles, Layers3, Send][index % 4];
            const isCurrent = index === activeIndex;
            const stackCount = Math.min(index, activeIndex);
            const rowCount = Math.max(index - activeIndex, 0);
            const positionParts = [
              ...Array.from(
                { length: stackCount },
                () => "var(--deck-stack-offset)",
              ),
              ...Array.from(
                { length: rowCount },
                () => "(var(--deck-card-width) + var(--deck-gap))",
              ),
            ];
            const cardPosition =
              positionParts.length > 0
                ? `calc(${positionParts.join(" + ")})`
                : "0px";

            return (
              <button
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "group absolute inset-y-0 left-0 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card text-left outline-none",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "transition-transform duration-700 motion-reduce:transition-none",
                )}
                data-slot="how-it-works-card-deck-card"
                key={step.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translate3d(${cardPosition}, 0, 0)`,
                  transitionTimingFunction: EASE_OUT_CSS,
                  width: "var(--deck-card-width)",
                  zIndex: index + 1,
                }}
                type="button"
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 opacity-70 transition-opacity duration-700 motion-reduce:transition-none",
                    index % 4 === 0 &&
                      "bg-[radial-gradient(circle_at_15%_0%,color-mix(in_oklab,var(--primary)_13%,transparent),transparent_58%)]",
                    index % 4 === 1 &&
                      "bg-[radial-gradient(circle_at_82%_18%,color-mix(in_oklab,var(--primary)_11%,transparent),transparent_62%)]",
                    index % 4 === 2 &&
                      "bg-[radial-gradient(circle_at_42%_100%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)]",
                    index % 4 === 3 &&
                      "bg-[radial-gradient(circle_at_100%_70%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_64%)]",
                    isCurrent ? "opacity-100" : "opacity-55",
                  )}
                />

                <div className="relative flex h-full w-full flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(safeSteps.length).padStart(2, "0")}
                    </span>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Icon aria-hidden className="size-4" />
                    </span>
                  </div>

                  <div className="mt-auto">
                    {step.visual ?? (
                      <DeckVisual index={index} isCurrent={isCurrent} />
                    )}

                    <p className="mt-5 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                      {step.label}
                    </p>
                    <h3 className="mt-2 max-w-[20rem] text-pretty font-medium text-xl leading-tight tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[20rem] text-pretty text-muted-foreground text-sm leading-6 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function DeckVisual({
  index,
  isCurrent,
}: {
  index: number;
  isCurrent: boolean;
}) {
  const VisualIcon = [ClipboardList, Sparkles, FileCheck2, Check][index % 4];

  return (
    <div className="flex h-24 items-end gap-2" aria-hidden>
      {[0, 1, 2].map((item) => (
        <span
          className={cn(
            "flex items-center justify-center rounded-xl border border-border/70 bg-background/55 backdrop-blur-sm",
            "transition-[opacity,transform] duration-500 motion-reduce:transition-none",
            item === 0 && "size-14",
            item === 1 && "size-16",
            item === 2 && "size-20",
            isCurrent
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-70",
          )}
          key={item}
          style={{
            transitionDelay: isCurrent ? `${item * 45}ms` : "0ms",
            transitionTimingFunction: EASE_OUT_CSS,
          }}
        >
          {item === 2 ? (
            <VisualIcon className="size-5 text-foreground" />
          ) : (
            <span className="h-px w-5 bg-border" />
          )}
        </span>
      ))}
    </div>
  );
}
