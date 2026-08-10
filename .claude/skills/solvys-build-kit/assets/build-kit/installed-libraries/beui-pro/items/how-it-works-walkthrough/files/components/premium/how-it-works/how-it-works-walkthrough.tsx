"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  ClipboardPenLine,
  LayoutDashboard,
  MessageSquareText,
  Rocket,
  Sparkles,
  UsersRound,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const DEFAULT_INTERVAL = 5600;

export type HowItWorksWalkthroughStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export type HowItWorksWalkthroughProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  steps?: HowItWorksWalkthroughStep[];
  defaultStepId?: string;
  autoPlay?: boolean;
  interval?: number;
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
};

const DEFAULT_STEPS: HowItWorksWalkthroughStep[] = [
  {
    id: "listen",
    label: "Listen",
    title: "Gather the real request",
    description:
      "Capture the language, examples, and context behind what people are asking for.",
    icon: MessageSquareText,
  },
  {
    id: "align",
    label: "Align",
    title: "Shape one shared direction",
    description:
      "Turn the raw signal into a brief with an outcome, an owner, and a clear next move.",
    icon: LayoutDashboard,
  },
  {
    id: "release",
    label: "Release",
    title: "Publish the finished work",
    description:
      "Review the details against the brief, move it live, and share the result with the team.",
    icon: Rocket,
  },
];

export function HowItWorksWalkthrough({
  eyebrow = "A guided workflow",
  title = ["See the work take shape,", "one decision at a time."],
  description = "Follow the complete path without hiding the context between steps.",
  steps = DEFAULT_STEPS,
  defaultStepId,
  autoPlay = true,
  interval = DEFAULT_INTERVAL,
  primaryHref = "#",
  primaryLabel = "Try the workflow",
  className,
}: HowItWorksWalkthroughProps) {
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
  const activeStep = safeSteps[activeIndex];

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

  if (!activeStep) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
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
              className="mt-7 max-w-4xl text-balance font-medium text-4xl leading-[0.96] tracking-[-0.055em]"
              stagger={0.06}
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
                : { opacity: 0, transform: "translate3d(0,10px,0)" }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.3, ease: EASE_OUT }
            }
            viewport={{ once: true, margin: "-50px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, transform: "translate3d(0,0,0)" }
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

        <motion.div
          className="mt-14 grid gap-3 rounded-[2rem] border border-border/70 bg-card p-3 sm:mt-16 lg:grid-cols-[1.45fr_0.85fr]"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, transform: "translate3d(0,18px,0)" }
          }
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT }
          }
          viewport={{ once: true, margin: "-70px" }}
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, transform: "translate3d(0,0,0)" }
          }
        >
          <div className="relative min-h-[27rem] overflow-hidden rounded-[1.4rem] border border-border/70 sm:min-h-[32rem]">
            <WalkthroughBackdrop />
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transform: "scale(1)",
                }}
                className="absolute inset-0"
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        filter: "blur(6px)",
                        transform: "scale(0.985)",
                      }
                }
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        filter: "blur(7px)",
                        transform: "scale(0.985)",
                      }
                }
                key={activeStep.id}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.42, ease: EASE_OUT }
                }
              >
                {activeStep.visual ?? (
                  <DefaultWalkthroughScene
                    index={activeIndex}
                    reduceMotion={reduceMotion}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-2 lg:grid-rows-3">
            {safeSteps.map((step, index) => {
              const isActive = index === activeIndex;
              const Icon =
                step.icon ??
                [MessageSquareText, LayoutDashboard, Rocket][index % 3];

              return (
                <button
                  aria-pressed={isActive}
                  className={cn(
                    "flex min-h-[10rem] w-full flex-col rounded-[1.35rem] border p-5 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:p-6",
                    isActive
                      ? "border-border bg-background"
                      : "border-transparent bg-transparent",
                  )}
                  key={step.id}
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
                      <Icon className="size-4" strokeWidth={1.7} />
                    </span>
                  </span>
                  <span className="mt-4 font-medium text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
                    {step.label}
                  </span>
                  <span className="mt-2 font-medium text-xl tracking-[-0.03em]">
                    {step.title}
                  </span>
                  <span className="mt-2 max-w-sm text-pretty text-muted-foreground text-xs leading-5">
                    {step.description}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WalkthroughBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <ShaderBackground
        colors={["#f6dfc7", "#e8b99b", "#d5c4aa", "#f0cfae"]}
        distortion={0.48}
        speed={0.12}
        swirl={0.26}
        variant="mesh-gradient"
      />
      <div className="absolute inset-0 bg-background/12 dark:bg-background/52" />
    </div>
  );
}

function DefaultWalkthroughScene({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  if (index === 1) {
    return <AlignScene reduceMotion={reduceMotion} />;
  }
  if (index === 2) {
    return <ReleaseScene reduceMotion={reduceMotion} />;
  }
  return <ListenScene reduceMotion={reduceMotion} />;
}

function ListenScene({ reduceMotion }: { reduceMotion: boolean }) {
  const messages = [
    {
      name: "Maya",
      text: "Can we keep the review context beside the work?",
    },
    {
      name: "Jon",
      text: "The team needs one place to see what changed.",
    },
    {
      name: "Customer call",
      text: "Make the next step obvious without another meeting.",
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg space-y-3">
        {messages.map((message, index) => (
          <motion.div
            className={cn(
              "max-w-[88%] rounded-2xl border border-border/70 bg-background/48 p-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35",
              index === 1 && "ml-auto",
            )}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    transform: `translate3d(${index === 1 ? "18px" : "-18px"},0,0)`,
                  }
            }
            key={message.name}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : index * 0.08,
              ease: EASE_OUT,
            }}
            animate={{
              opacity: 1,
              transform: "translate3d(0,0,0)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-muted">
                {index === 2 ? (
                  <UsersRound className="size-3.5" strokeWidth={1.7} />
                ) : (
                  <MessageSquareText className="size-3.5" strokeWidth={1.7} />
                )}
              </span>
              <span className="font-medium text-xs">{message.name}</span>
            </div>
            <p className="mt-3 text-pretty text-sm leading-6">{message.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AlignScene({ reduceMotion }: { reduceMotion: boolean }) {
  const fields = [
    ["Outcome", "A clearer review flow"],
    ["Owner", "Product team"],
    ["Next move", "Prototype the handoff"],
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg rounded-[1.6rem] border border-border/70 bg-background/48 p-5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
              Shared brief
            </p>
            <p className="mt-2 font-semibold text-2xl tracking-[-0.04em]">
              Review workspace
            </p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-muted">
            <ClipboardPenLine className="size-5" strokeWidth={1.7} />
          </span>
        </div>
        <div className="mt-6 grid gap-2">
          {fields.map(([label, value], index) => (
            <motion.div
              animate={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              className="grid gap-1 rounded-xl border border-border/65 bg-background/40 px-4 py-3 sm:grid-cols-[6rem_1fr] sm:items-center"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, transform: "translate3d(0,10px,0)" }
              }
              key={label}
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                delay: reduceMotion ? 0 : 0.12 + index * 0.07,
                ease: EASE_OUT,
              }}
            >
              <span className="text-muted-foreground text-xs">{label}</span>
              <span className="font-medium text-sm">{value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReleaseScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
      <motion.div
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transform: "translate3d(0,0,0) scale(1)",
        }}
        className="w-full max-w-md rounded-[1.7rem] border border-border/70 bg-background/48 p-7 text-center backdrop-blur-xl supports-[backdrop-filter]:bg-background/35 sm:p-9"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                filter: "blur(8px)",
                transform: "translate3d(0,16px,0) scale(0.98)",
              }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }
        }
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-foreground text-background">
          <Check className="size-6" strokeWidth={2} />
        </span>
        <p className="mt-5 font-semibold text-2xl tracking-[-0.04em]">
          Ready for everyone
        </p>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
          The work is live with the decisions, owner, and outcome still
          attached.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 font-medium text-xs">
            Published
          </span>
          <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 font-medium text-xs">
            Shared
          </span>
          <Sparkles
            className="size-4 text-muted-foreground"
            strokeWidth={1.7}
          />
        </div>
      </motion.div>
    </div>
  );
}
