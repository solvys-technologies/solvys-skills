"use client";

import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { StepField } from "./step-field";
import type {
  AnimatedStepFormProps,
  StepFormAnswers,
  StepFormStep,
} from "./types";

const DEFAULT_STEPS: StepFormStep[] = [
  {
    id: "name",
    eyebrow: "Introduction",
    title: "What should we call you?",
    description: "A first name is enough.",
    type: "text",
    placeholder: "Your name",
    autoComplete: "given-name",
    required: true,
  },
  {
    id: "team",
    eyebrow: "Team size",
    title: "How do you usually build?",
    description: "Choose the setup closest to yours.",
    type: "choice",
    required: true,
    options: [
      { value: "solo", label: "Solo", description: "Just me for now" },
      { value: "small", label: "Small team", description: "2–10 people" },
      { value: "growing", label: "Growing team", description: "11+ people" },
    ],
  },
  {
    id: "goal",
    eyebrow: "Main goal",
    title: "What would make this useful?",
    type: "choice",
    required: true,
    options: [
      { value: "launch", label: "Launch something new" },
      { value: "improve", label: "Improve an existing product" },
      { value: "explore", label: "Explore what is possible" },
    ],
  },
  {
    id: "email",
    eyebrow: "Last step",
    title: "Where should we send the plan?",
    description: "No newsletters. Just the project summary.",
    type: "email",
    placeholder: "you@company.com",
    autoComplete: "email",
    required: true,
  },
];

export function AnimatedStepForm({
  steps = DEFAULT_STEPS,
  submitLabel = "Create my plan",
  successTitle = "Your plan is ready.",
  successDescription = "We saved your answers and prepared the next steps.",
  onComplete,
  className,
}: AnimatedStepFormProps) {
  const reduce = useReducedMotion();
  const safeSteps = steps.length > 0 ? steps : DEFAULT_STEPS;
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animateSwap, setAnimateSwap] = useState(true);
  const [answers, setAnswers] = useState<StepFormAnswers>({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const step = safeSteps[stepIndex];
  const lastStep = stepIndex === safeSteps.length - 1;
  const shouldMove = !reduce && animateSwap;

  const updateAnswer = (value: string) => {
    setAnswers((current) => ({ ...current, [step.id]: value }));
    if (error) setError("");
  };

  const validate = () => {
    const value = answers[step.id]?.trim() ?? "";
    if (step.required && !value) return "Please complete this step.";
    if (step.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  const next = (animate: boolean) => {
    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    setAnimateSwap(animate);
    setDirection(1);

    if (lastStep) {
      setComplete(true);
      onComplete?.(answers);
      return;
    }

    setStepIndex((current) => current + 1);
    setError("");
  };

  const back = () => {
    if (stepIndex === 0) return;
    setAnimateSwap(true);
    setDirection(-1);
    setStepIndex((current) => current - 1);
    setError("");
  };

  const restart = () => {
    setAnimateSwap(true);
    setDirection(-1);
    setStepIndex(0);
    setAnswers({});
    setError("");
    setComplete(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    next(Boolean(submitter));
  };

  const swap = {
    initial: shouldMove
      ? {
          opacity: 0,
          transform: `translateX(${direction * 14}px)`,
          filter: "blur(3px)",
        }
      : { opacity: 1, transform: "translateX(0px)", filter: "blur(0px)" },
    animate: { opacity: 1, transform: "translateX(0px)", filter: "blur(0px)" },
    exit: shouldMove
      ? {
          opacity: 0,
          transform: `translateX(${direction * -10}px)`,
          filter: "blur(2px)",
        }
      : { opacity: 0 },
    transition: shouldMove
      ? { duration: 0.22, ease: EASE_OUT }
      : { duration: 0 },
  };

  return (
    <section className={cn("w-full px-4 py-12 sm:px-6", className)}>
      <motion.div
        layout="size"
        transition={reduce || !animateSwap ? { duration: 0 } : SPRING_LAYOUT}
        className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-border/60 bg-background"
      >
        <div className="flex items-center justify-between border-border/50 border-b px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2">
            {safeSteps.map((item, index) => (
              <span
                key={item.id}
                aria-hidden="true"
                className={cn(
                  "h-1 w-6 overflow-hidden rounded-full bg-border/60 sm:w-8",
                  index < stepIndex && "bg-foreground",
                )}
              >
                {index === stepIndex || (complete && index === stepIndex) ? (
                  <motion.span
                    className="block h-full origin-left rounded-full bg-foreground"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  />
                ) : null}
              </span>
            ))}
          </div>
          <span className="font-mono text-muted-foreground text-xs tabular-nums">
            {complete
              ? "Done"
              : `${String(stepIndex + 1).padStart(2, "0")} / ${String(safeSteps.length).padStart(2, "0")}`}
          </span>
        </div>

        <form onSubmit={submit} noValidate>
          <AnimatePresence mode="wait" initial={false}>
            {complete ? (
              <motion.div
                key="complete"
                {...swap}
                className="px-5 py-10 text-center sm:px-10 sm:py-12"
              >
                <span className="mx-auto grid size-12 place-items-center rounded-full border border-foreground text-foreground">
                  <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="m5 12 4 4L19 6"
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.35, ease: EASE_OUT, delay: 0.08 }
                      }
                    />
                  </motion.svg>
                </span>
                <h2 className="mt-5 font-semibold text-2xl text-foreground tracking-tight">
                  {successTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm leading-6">
                  {successDescription}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={restart}
                  className="mt-6"
                >
                  <RotateCcw className="size-3.5" />
                  Start again
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={step.id}
                {...swap}
                className="px-5 py-7 sm:px-10 sm:py-9"
              >
                <p className="font-mono text-muted-foreground text-[11px] uppercase tracking-[0.14em]">
                  {step.eyebrow}
                </p>
                <h2 className="mt-3 max-w-md font-semibold text-2xl text-foreground tracking-tight sm:text-[1.75rem] sm:leading-9">
                  {step.title}
                </h2>
                {step.description ? (
                  <p className="mt-2 text-muted-foreground text-sm leading-6">
                    {step.description}
                  </p>
                ) : null}

                <div className="mt-7">
                  <StepField
                    step={step}
                    value={answers[step.id] ?? ""}
                    error={error}
                    reduce={reduce}
                    onChange={updateAnswer}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={back}
                    disabled={stepIndex === 0}
                    className="-ml-3"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button type="submit" size="md">
                    {lastStep ? submitLabel : "Continue"}
                    {lastStep ? (
                      <Check className="size-4" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}
