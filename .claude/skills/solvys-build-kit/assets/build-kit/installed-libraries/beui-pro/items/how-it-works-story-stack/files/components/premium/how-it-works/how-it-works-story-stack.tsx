"use client";

import {
  ArrowRight,
  Check,
  ClipboardPenLine,
  LayoutDashboard,
  MessageSquareText,
  Rocket,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type HowItWorksStoryStackStep = {
  label: string;
  title: string;
  description: string;
};

export type HowItWorksStoryStackProps = {
  eyebrow?: string;
  title?: string | string[];
  description?: string;
  steps?: HowItWorksStoryStackStep[];
  primaryHref?: string;
  primaryLabel?: string;
  className?: string;
};

const DEFAULT_STEPS: HowItWorksStoryStackStep[] = [
  {
    label: "Collect",
    title: "Start with the full picture",
    description:
      "Bring customer language, internal context, and the original request together before deciding what to build. Nothing is summarized away too early, so the team can see the evidence behind the brief and return to it when priorities change.",
  },
  {
    label: "Decide",
    title: "Make the next move obvious",
    description:
      "Turn the shared context into a focused outcome, clear ownership, and a plan the whole team can follow. Make tradeoffs explicit and leave every owner with a next move they can act on without another meeting.",
  },
  {
    label: "Deliver",
    title: "Ship without losing the story",
    description:
      "Review the final work against the original intent, publish it, and keep the result visible after launch. Connect the shipped version back to the decision that shaped it and leave a useful record for the next release.",
  },
];

export function HowItWorksStoryStack({
  eyebrow = "A simpler way to work",
  title = ["From scattered context", "to a confident release."],
  description = "Three considered steps keep the original signal connected to every decision that follows.",
  steps = DEFAULT_STEPS,
  primaryHref = "#",
  primaryLabel = "Explore the process",
  className,
}: HowItWorksStoryStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const safeSteps = steps.slice(0, 3);

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
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
            className="mt-7 text-balance font-medium text-4xl leading-[0.96] tracking-[-0.055em]"
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
                : { opacity: 0, transform: "translate3d(0,10px,0)" }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.32, ease: EASE_OUT }
            }
            viewport={{ once: true, margin: "-50px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, transform: "translate3d(0,0,0)" }
            }
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20 lg:space-y-28">
          {safeSteps.map((step, index) => (
            <StoryRow
              index={index}
              key={`${step.label}-${step.title}`}
              reduceMotion={reduceMotion}
              step={step}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center sm:mt-20"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, transform: "translate3d(0,10px,0)" }
          }
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE_OUT }
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

function StoryRow({
  step,
  index,
  reduceMotion,
}: {
  step: HowItWorksStoryStackStep;
  index: number;
  reduceMotion: boolean;
}) {
  const reverse = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <motion.div
        className={cn("max-w-xl px-1 sm:px-4 lg:px-8", reverse && "lg:order-2")}
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                filter: "blur(7px)",
                transform: `translate3d(${reverse ? "20px" : "-20px"},0,0)`,
              }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT }
        }
        viewport={{ once: true, margin: "-80px" }}
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
        <HandDrawnNumber number={index + 1} />
        <p className="mt-8 font-medium text-muted-foreground text-xs uppercase tracking-[0.15em]">
          {step.label}
        </p>
        <h3 className="mt-4 max-w-lg text-balance font-medium text-xl leading-[1.02] tracking-[-0.045em] sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-5 max-w-lg text-pretty text-muted-foreground text-sm leading-6 sm:text-base sm:leading-7">
          {step.description}
        </p>
      </motion.div>

      <motion.div
        className={cn(
          "relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-border/70 sm:min-h-[28rem]",
          reverse && "lg:order-1",
        )}
        initial={
          reduceMotion
            ? false
            : {
                clipPath: reverse
                  ? "inset(0% 0% 0% 16%)"
                  : "inset(0% 16% 0% 0%)",
                opacity: 0.5,
              }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.85, ease: EASE_OUT }
        }
        viewport={{ once: true, margin: "-80px" }}
        whileInView={
          reduceMotion
            ? undefined
            : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
        }
      >
        <StoryBackdrop index={index} />
        <StoryVisual index={index} reduceMotion={reduceMotion} />
      </motion.div>
    </article>
  );
}

function HandDrawnNumber({ number }: { number: number }) {
  return (
    <span
      aria-label={`Step ${number}`}
      className="relative inline-flex size-11 items-center justify-center text-foreground"
      role="img"
    >
      <svg
        aria-hidden
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
        viewBox="0 0 44 44"
      >
        <title>Hand-drawn step marker</title>
        <path
          d="M22.7 5.7C12.6 4.7 6.1 10.6 5.6 21.3c-.5 10.2 5.8 16.9 16.2 17.1 10.1.2 16.6-5.5 16.8-16.2.2-9.8-5.9-15.6-15.9-16.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          d="M21.4 7.4c-8.7.1-14 5.1-14.1 14.2-.1 9.2 5.4 14.8 14.8 15.1 9 .2 14.6-5 14.7-14.6.1-8.8-5.5-14.2-15.4-14.7Z"
          opacity="0.28"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
      <span className="-rotate-3 font-medium text-sm tabular-nums">
        {number}
      </span>
    </span>
  );
}

function StoryBackdrop({ index }: { index: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {index === 0 ? (
        <ShaderBackground
          colorBack="#f1d9bf"
          colors={["#f8dfc8", "#eeb38f", "#d99a7e", "#f3cfa8"]}
          softness={0.86}
          speed={0.12}
          variant="grain-gradient"
        />
      ) : index === 1 ? (
        <ShaderBackground
          colors={["#dbeafe", "#93c5fd", "#60a5fa", "#d4e6f4"]}
          distortion={0.48}
          speed={0.12}
          swirl={0.28}
          variant="mesh-gradient"
        />
      ) : (
        <ShaderBackground
          colorBack="#dcebd9"
          colors={["#eef1cf", "#b7d4b5", "#78a98f"]}
          speed={0.1}
          variant="swirl"
        />
      )}
      <div className="absolute inset-0 bg-background/12 dark:bg-background/52" />
    </div>
  );
}

function StoryVisual({
  index,
  reduceMotion,
}: {
  index: number;
  reduceMotion: boolean;
}) {
  if (index === 1) {
    return <DecisionCanvas reduceMotion={reduceMotion} />;
  }
  if (index === 2) {
    return <DeliveryCanvas reduceMotion={reduceMotion} />;
  }
  return <ContextCanvas reduceMotion={reduceMotion} />;
}

function ContextCanvas({ reduceMotion }: { reduceMotion: boolean }) {
  const notes = [
    { label: "Customer request", Icon: MessageSquareText },
    { label: "Original brief", Icon: ClipboardPenLine },
    { label: "Team context", Icon: UsersRound },
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
    >
      <div className="w-full max-w-md space-y-3">
        {notes.map(({ label, Icon }, index) => (
          <motion.div
            className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background/48 p-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    transform: `translate3d(${index % 2 === 0 ? "-18px" : "18px"},0,0)`,
                  }
            }
            key={label}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : index * 0.08,
              ease: EASE_OUT,
            }}
            viewport={{ once: true, margin: "-70px" }}
            whileInView={
              reduceMotion
                ? undefined
                : { opacity: 1, transform: "translate3d(0,0,0)" }
            }
          >
            <span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
              <Icon className="size-4" strokeWidth={1.7} />
            </span>
            <span className="font-medium text-sm">{label}</span>
            <span className="ml-auto rounded-full border border-border/70 bg-background/35 px-2.5 py-1 text-[10px] backdrop-blur-md">
              Included
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DecisionCanvas({ reduceMotion }: { reduceMotion: boolean }) {
  const decisions = [
    "Define the outcome",
    "Choose the owner",
    "Set the next review",
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
    >
      <motion.div
        className="w-full max-w-md rounded-[1.5rem] border border-border/70 bg-background/48 p-5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35 sm:p-6"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, transform: "scale(0.975)", filter: "blur(6px)" }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT }
        }
        viewport={{ once: true, margin: "-70px" }}
        whileInView={
          reduceMotion
            ? undefined
            : { opacity: 1, transform: "scale(1)", filter: "blur(0px)" }
        }
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-muted-foreground text-[10px] uppercase tracking-[0.14em]">
              Working session
            </p>
            <p className="mt-2 font-semibold text-xl tracking-[-0.03em]">
              Make the call together
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-muted">
            <LayoutDashboard className="size-4" strokeWidth={1.7} />
          </span>
        </div>
        <div className="mt-6 space-y-2">
          {decisions.map((decision, index) => (
            <motion.div
              className="flex items-center gap-3 rounded-xl border border-border/65 bg-background/40 px-4 py-3"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, transform: "translate3d(0,10px,0)" }
              }
              key={decision}
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                delay: reduceMotion ? 0 : 0.18 + index * 0.07,
                ease: EASE_OUT,
              }}
              viewport={{ once: true, margin: "-70px" }}
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, transform: "translate3d(0,0,0)" }
              }
            >
              <span className="grid size-6 place-items-center rounded-full bg-foreground text-background">
                <Check className="size-3" strokeWidth={2} />
              </span>
              <span className="font-medium text-sm">{decision}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DeliveryCanvas({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
    >
      <motion.div
        className="w-full max-w-md rounded-[1.5rem] border border-border/70 bg-background/48 p-6 text-center backdrop-blur-xl supports-[backdrop-filter]:bg-background/35 sm:p-8"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                filter: "blur(8px)",
                transform: "translate3d(0,18px,0) scale(0.98)",
              }
        }
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE_OUT }
        }
        viewport={{ once: true, margin: "-70px" }}
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                filter: "blur(0px)",
                transform: "translate3d(0,0,0) scale(1)",
              }
        }
      >
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-foreground text-background">
          <Rocket className="size-6" strokeWidth={1.7} />
        </span>
        <p className="mt-5 font-semibold text-2xl tracking-[-0.04em]">
          The release is live
        </p>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
          Everyone can see what changed, why it changed, and what happens next.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 font-medium text-xs backdrop-blur-md">
            Published
          </span>
          <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 font-medium text-xs backdrop-blur-md">
            Shared
          </span>
        </div>
      </motion.div>
    </div>
  );
}
