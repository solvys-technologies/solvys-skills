"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Rocket,
  ScanSearch,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type HowItWorksCenteredCardsStep = {
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  visual?: ReactNode;
};

export type HowItWorksCenteredCardsProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  steps?: HowItWorksCenteredCardsStep[];
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
};

const DEFAULT_STEPS: HowItWorksCenteredCardsStep[] = [
  {
    label: "Understand",
    title: "Listen before shaping the answer",
    description:
      "Collect the request, its context, and the examples that reveal what a useful outcome should actually feel like.",
    icon: ScanSearch,
  },
  {
    label: "Align",
    title: "Make one direction easy to follow",
    description:
      "Turn the signal into a focused brief with clear decisions, an owner, and the next move everyone can see.",
    icon: UsersRound,
  },
  {
    label: "Deliver",
    title: "Close the loop with confidence",
    description:
      "Review the finished work against the original intent, publish it, and keep the result visible after launch.",
    icon: Rocket,
  },
];

export function HowItWorksCenteredCards({
  eyebrow = "How it works",
  title = "Three steps. One clear outcome.",
  description = "A considered process keeps the original context connected to every decision, from the first request to the finished release.",
  steps = DEFAULT_STEPS,
  primaryHref = "#",
  primaryLabel = "Explore the process",
  className,
}: HowItWorksCenteredCardsProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeSteps = steps.slice(0, 3);

  if (safeSteps.length === 0) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
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
            className="mt-7 text-balance font-medium text-4xl leading-[0.98] tracking-[-0.05em]"
            stagger={0.06}
            text={title}
            whileInView
            yOffset="24%"
          />

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    filter: "blur(5px)",
                    transform: "translate3d(0,10px,0)",
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.28, ease: EASE_OUT }
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
            {description}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-3 lg:gap-6">
          {safeSteps.map((step, index) => {
            const Icon =
              step.icon ?? [ScanSearch, UsersRound, Rocket][index % 3];

            return (
              <motion.article
                className="min-w-0 rounded-[1.75rem] border border-border/70 bg-background p-3"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        filter: "blur(8px)",
                        transform: "translate3d(0,18px,0)",
                      }
                }
                key={`${step.label}-${step.title}`}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.62,
                        delay: index * 0.08,
                        ease: EASE_OUT,
                      }
                }
                viewport={{ once: true, margin: "-70px" }}
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
                <div className="relative h-48 overflow-hidden rounded-[1.2rem] bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_68%)] sm:h-52">
                  {step.visual ?? (
                    <CenteredCardVisual
                      index={index}
                      reduceMotion={reduceMotion}
                    />
                  )}
                </div>

                <div className="p-4 pb-5 sm:p-5 sm:pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-muted-foreground text-[10px] uppercase tracking-[0.16em]">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                  </div>

                  <p className="mt-6 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                    {step.label}
                  </p>
                  <h3 className="mt-2 text-pretty font-medium text-xl leading-tight tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted-foreground text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, transform: "translate3d(0,8px,0)" }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.45, delay: 0.22, ease: EASE_OUT }
          }
          viewport={{ once: true, margin: "-40px" }}
          whileInView={
            reduceMotion
              ? undefined
              : { opacity: 1, transform: "translate3d(0,0,0)" }
          }
        >
          <ButtonLink href={primaryHref} size="md" variant="secondary">
            {primaryLabel}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}

function CenteredCardVisual({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  if (index === 1) {
    return <AlignmentVisual reduceMotion={reduceMotion} />;
  }
  if (index === 2) {
    return <DeliveryVisual reduceMotion={reduceMotion} />;
  }
  return <UnderstandingVisual reduceMotion={reduceMotion} />;
}

function UnderstandingVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const notes = [
    { label: "Customer note", Icon: MessageSquareText, x: "-34px", delay: 0 },
    { label: "Original brief", Icon: FileText, x: "34px", delay: 0.07 },
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[78%] space-y-2">
        {notes.map(({ label, Icon, x, delay }) => (
          <motion.div
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 backdrop-blur-md"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    filter: "blur(5px)",
                    transform: `translate3d(${x},0,0)`,
                  }
            }
            key={label}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.52, delay, ease: EASE_OUT }
            }
            viewport={{ once: true, margin: "-40px" }}
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
            <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Icon className="size-3.5" />
            </span>
            <span className="font-medium text-xs">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AlignmentVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const items = ["Outcome", "Owner", "Next move"];

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[78%] rounded-2xl border border-border/70 bg-background/75 p-3 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
            Shared brief
          </span>
          <ClipboardCheck className="size-3.5 text-muted-foreground" />
        </div>
        <div className="space-y-1.5">
          {items.map((item, itemIndex) => (
            <motion.div
              className="flex items-center gap-2 rounded-lg bg-muted/65 px-2.5 py-2"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      transform: "translate3d(0,8px,0)",
                    }
              }
              key={item}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.42,
                      delay: itemIndex * 0.07,
                      ease: EASE_OUT,
                    }
              }
              viewport={{ once: true, margin: "-40px" }}
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, transform: "translate3d(0,0,0)" }
              }
            >
              <Check className="size-3 text-muted-foreground" />
              <span className="font-medium text-[11px]">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliveryVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        className="relative flex size-28 items-center justify-center rounded-[1.75rem] border border-border/70 bg-background/75 backdrop-blur-md"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                filter: "blur(7px)",
                transform: "scale(0.9)",
              }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.58, ease: EASE_OUT }
        }
        viewport={{ once: true, margin: "-40px" }}
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                filter: "blur(0px)",
                transform: "scale(1)",
              }
        }
      >
        <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-foreground">
          <Rocket className="size-5" />
        </span>
        <motion.span
          className="absolute -right-2 -bottom-2 flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  transform: "translate3d(-6px,-6px,0) scale(0.8)",
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.45, delay: 0.18, ease: EASE_OUT }
          }
          viewport={{ once: true, margin: "-40px" }}
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  transform: "translate3d(0,0,0) scale(1)",
                }
          }
        >
          <Check className="size-4" />
        </motion.span>
      </motion.div>
    </div>
  );
}
