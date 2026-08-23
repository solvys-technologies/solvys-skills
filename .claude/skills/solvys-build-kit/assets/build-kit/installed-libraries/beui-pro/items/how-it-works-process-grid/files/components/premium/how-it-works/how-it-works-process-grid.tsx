"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  ClipboardPenLine,
  Layers3,
  MessageSquareText,
  Mic2,
  Rocket,
  Rows3,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const DEFAULT_INTERVAL = 6400;

export type HowItWorksProcessGridStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export type HowItWorksProcessGridProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  steps?: HowItWorksProcessGridStep[];
  defaultStepId?: string;
  autoPlay?: boolean;
  interval?: number;
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
};

const DEFAULT_STEPS: HowItWorksProcessGridStep[] = [
  {
    id: "capture",
    label: "Capture",
    title: "Bring the signal into focus",
    description:
      "Collect customer notes, requests, and loose ideas in one brief that keeps the original context intact.",
    icon: MessageSquareText,
  },
  {
    id: "shape",
    label: "Shape",
    title: "Turn context into a clear plan",
    description:
      "Organize the brief into decisions, owners, and the next work that will move the outcome forward.",
    icon: Rows3,
  },
  {
    id: "ship",
    label: "Ship",
    title: "Move the right version live",
    description:
      "Review the final details, publish with confidence, and keep the result visible to everyone involved.",
    icon: Rocket,
  },
];

export function HowItWorksProcessGrid({
  eyebrow = "How it works",
  title = ["One clear path from", "raw input to release."],
  description = "Capture what matters, shape it into an aligned plan, and move it live without losing the thinking that got you there.",
  steps = DEFAULT_STEPS,
  defaultStepId,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  primaryHref = "#",
  primaryLabel = "See the workflow",
  className,
}: HowItWorksProcessGridProps) {
  const safeSteps = useMemo(
    () => steps.filter((step) => step.id).slice(0, 3),
    [steps],
  );
  const initialId =
    safeSteps.find((step) => step.id === defaultStepId)?.id ??
    safeSteps[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(initialId);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(sectionRef, { margin: "120px" });
  const isPageInView = usePageInView();
  const shouldPlay =
    autoPlay &&
    !reduceMotion &&
    isInView &&
    isPageInView &&
    safeSteps.length > 1;

  const activeIndex = Math.max(
    0,
    safeSteps.findIndex((step) => step.id === activeId),
  );

  useEffect(() => {
    if (safeSteps.length === 0) {
      setActiveId("");
      return;
    }
    if (!safeSteps.some((step) => step.id === activeId)) {
      setActiveId(safeSteps[0].id);
    }
  }, [activeId, safeSteps]);

  useEffect(() => {
    if (!shouldPlay) return;

    const timer = window.setTimeout(() => {
      setActiveId(safeSteps[(activeIndex + 1) % safeSteps.length].id);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [activeIndex, interval, safeSteps, shouldPlay]);

  if (safeSteps.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <motion.span
              className="inline-flex rounded-full border border-border/70 bg-card px-3 py-1.5 font-medium text-muted-foreground text-xs"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, transform: "translate3d(0,8px,0)" }
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
                  : { opacity: 1, transform: "translate3d(0,0,0)" }
              }
            >
              {eyebrow}
            </motion.span>

            <TextReveal
              as="h2"
              blur={10}
              className="mt-7 max-w-4xl text-balance font-medium text-4xl leading-[0.96] tracking-[-0.055em]"
              stagger={0.065}
              text={title}
              whileInView
              yOffset="24%"
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
                : { duration: 0.55, delay: 0.28, ease: EASE_OUT }
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
            <ButtonLink
              className="mt-6 w-fit"
              href={primaryHref}
              size="md"
              variant="secondary"
            >
              {primaryLabel}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>

        <div className="relative mt-14 border border-border/70 sm:mt-16">
          <GridCross className="-top-2 -left-2" />
          <GridCross className="-top-2 -right-2" />
          <GridCross className="-bottom-2 -left-2" />
          <GridCross className="-right-2 -bottom-2" />

          <div className="grid md:grid-cols-3">
            {safeSteps.map((step, index) => {
              const isActive = index === activeIndex;
              const Icon =
                step.icon ?? [MessageSquareText, Rows3, Rocket][index % 3];

              return (
                <motion.article
                  className={cn(
                    "relative grid min-w-0 grid-rows-[13rem_auto] border-border/70 border-b transition-colors duration-500 last:border-b-0 md:grid-rows-[15rem_auto] md:border-r md:border-b-0 md:last:border-r-0",
                    isActive ? "bg-card" : "bg-background",
                  )}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          filter: "blur(6px)",
                        }
                  }
                  key={step.id}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion ? 0 : index * 0.06,
                    ease: EASE_OUT,
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileInView={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          filter: "blur(0px)",
                        }
                  }
                >
                  <div className="relative overflow-hidden border-border/70 border-b">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--foreground)/0.07),transparent_58%)]"
                    />
                    {step.visual ?? (
                      <DefaultRelayScene
                        index={index}
                        isActive={isActive}
                        reduceMotion={reduceMotion}
                      />
                    )}
                  </div>

                  <button
                    aria-pressed={isActive}
                    className="flex min-h-[14rem] w-full flex-col p-6 text-left outline-none transition-colors focus-visible:bg-muted/60 sm:p-7 md:min-h-[15rem]"
                    onClick={() => setActiveId(step.id)}
                    type="button"
                  >
                    <span className="flex w-full items-center justify-between">
                      <span className="font-medium text-muted-foreground text-xs tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-full transition-colors duration-300",
                          isActive
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon
                          aria-hidden
                          className="size-4"
                          strokeWidth={1.7}
                        />
                      </span>
                    </span>
                    <span className="mt-8 font-medium text-muted-foreground text-xs uppercase tracking-[0.15em]">
                      {step.label}
                    </span>
                    <h3 className="mt-3 text-balance font-medium text-xl leading-[1.04] tracking-[-0.04em]">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
                      {step.description}
                    </p>
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function GridCross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20 size-4",
        "before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:-translate-y-1/2 before:bg-foreground/20",
        "after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:-translate-x-1/2 after:bg-foreground/20",
        className,
      )}
    />
  );
}

function DefaultRelayScene({
  index,
  isActive,
  reduceMotion,
}: {
  index: number;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  if (index === 1) {
    return <ShapeScene isActive={isActive} reduceMotion={reduceMotion} />;
  }
  if (index === 2) {
    return <ShipScene isActive={isActive} reduceMotion={reduceMotion} />;
  }
  return <CaptureScene isActive={isActive} reduceMotion={reduceMotion} />;
}

function CaptureScene({
  isActive,
  reduceMotion,
}: {
  isActive: boolean;
  reduceMotion: boolean;
}) {
  const signals = [
    {
      label: "Customer note",
      Icon: MessageSquareText,
      idle: "translate3d(-14px,0,0)",
    },
    {
      label: "Voice memo",
      Icon: Mic2,
      idle: "translate3d(14px,0,0)",
    },
  ];

  return (
    <div aria-hidden className="absolute inset-0 p-5 sm:p-6">
      <div className="mx-auto flex max-w-xs flex-col gap-2">
        {signals.map(({ label, Icon, idle }, signalIndex) => (
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0.55,
              transform: isActive || reduceMotion ? "translate3d(0,0,0)" : idle,
            }}
            className="flex items-center gap-3 border border-border/70 bg-background/70 px-3.5 py-3 backdrop-blur-md"
            key={label}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion || !isActive ? 0 : signalIndex * 0.08,
              ease: EASE_OUT,
            }}
          >
            <span className="grid size-8 place-items-center rounded-full bg-muted text-muted-foreground">
              <Icon className="size-3.5" strokeWidth={1.7} />
            </span>
            <span className="font-medium text-xs">{label}</span>
            <span className="ml-auto text-muted-foreground text-[10px] uppercase tracking-[0.12em]">
              Added
            </span>
          </motion.div>
        ))}

        <motion.div
          animate={{
            clipPath:
              isActive || reduceMotion
                ? "inset(0% 0% 0% 0%)"
                : "inset(0% 100% 0% 0%)",
            opacity: isActive || reduceMotion ? 1 : 0.38,
          }}
          className="mt-2 border border-border/70 bg-card px-4 py-3.5"
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: reduceMotion || !isActive ? 0 : 0.22,
            ease: EASE_OUT,
          }}
        >
          <div className="flex items-center gap-3">
            <ClipboardPenLine
              className="size-4 text-muted-foreground"
              strokeWidth={1.7}
            />
            <span className="font-medium text-xs">Focused product brief</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ShapeScene({
  isActive,
  reduceMotion,
}: {
  isActive: boolean;
  reduceMotion: boolean;
}) {
  const tasks = [
    { title: "Confirm the outcome", meta: "Decision" },
    { title: "Assign the owner", meta: "Ownership" },
    { title: "Define the next move", meta: "Action" },
  ];

  return (
    <div aria-hidden className="absolute inset-0 p-5 sm:p-6">
      <div className="mx-auto max-w-xs border border-border/70 bg-background/70 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between border-border/70 border-b px-1 pb-3">
          <span className="font-medium text-xs">Working plan</span>
          <Layers3
            className="size-3.5 text-muted-foreground"
            strokeWidth={1.7}
          />
        </div>
        <div className="mt-3 space-y-2">
          {tasks.map((task, taskIndex) => (
            <motion.div
              animate={{
                opacity: isActive ? 1 : 0.55,
                transform:
                  isActive || reduceMotion
                    ? "translate3d(0,0,0)"
                    : `translate3d(${taskIndex % 2 === 0 ? "-12px" : "12px"},0,0)`,
              }}
              className="flex items-center gap-3 border border-border/65 bg-card px-3 py-2.5"
              key={task.title}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion || !isActive ? 0 : taskIndex * 0.07,
                ease: EASE_OUT,
              }}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border transition-colors duration-300",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground",
                )}
              >
                <Check className="size-3" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-xs">
                  {task.title}
                </span>
                <span className="mt-0.5 block text-muted-foreground text-[10px]">
                  {task.meta}
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShipScene({
  isActive,
  reduceMotion,
}: {
  isActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div aria-hidden className="absolute inset-0 p-5 sm:p-6">
      <div className="mx-auto max-w-xs border border-border/70 bg-background/70 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
              Release
            </p>
            <p className="mt-1.5 font-medium text-sm">Workspace update 2.4</p>
          </div>
          <span className="rounded-full border border-border/70 bg-card px-2.5 py-1 font-medium text-[10px]">
            Ready
          </span>
        </div>

        <motion.div
          animate={{
            opacity: isActive || reduceMotion ? 1 : 0.48,
            transform:
              isActive || reduceMotion
                ? "translate3d(0,0,0)"
                : "translate3d(0,12px,0)",
          }}
          className="mt-6 flex items-center gap-3 border border-border/70 bg-card px-3.5 py-3"
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion || !isActive ? 0 : 0.28,
            ease: EASE_OUT,
          }}
        >
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
            <Check className="size-4" strokeWidth={2} />
          </span>
          <span>
            <span className="block font-medium text-xs">Published</span>
            <span className="mt-0.5 block text-muted-foreground text-[10px]">
              The team can see it now
            </span>
          </span>
          <Sparkles
            className="ml-auto size-3.5 text-muted-foreground"
            strokeWidth={1.7}
          />
        </motion.div>
      </div>
    </div>
  );
}
