"use client";

import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FormEvent } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { StepField } from "./step-field";
import type { AnimatedStepFormProps, StepFormStep } from "./types";
import { useStepFormFlow } from "./use-step-form-flow";

const STACK_STEPS: StepFormStep[] = [
  {
    id: "project",
    eyebrow: "Project",
    title: "What are you planning?",
    type: "choice",
    required: true,
    options: [
      { value: "site", label: "A new website" },
      { value: "product", label: "A product experience" },
      { value: "refresh", label: "A focused redesign" },
    ],
  },
  {
    id: "timing",
    eyebrow: "Timing",
    title: "When should it be ready?",
    type: "choice",
    required: true,
    options: [
      { value: "soon", label: "As soon as possible" },
      { value: "month", label: "Within a month" },
      { value: "exploring", label: "Still exploring" },
    ],
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Where can we follow up?",
    type: "email",
    placeholder: "name@company.com",
    autoComplete: "email",
    required: true,
  },
];

export function StepFormStack({
  steps = STACK_STEPS,
  submitLabel = "Send brief",
  successTitle = "Brief received.",
  successDescription = "We will review the details and follow up shortly.",
  onComplete,
  className,
}: AnimatedStepFormProps) {
  const reduce = useReducedMotion();
  const safeSteps = steps.length ? steps : STACK_STEPS;
  const flow = useStepFormFlow(safeSteps, onComplete);
  const move = !reduce && flow.animateSwap;
  const swap = {
    initial: move
      ? { opacity: 0, transform: "translateY(16px) scale(.985)" }
      : false,
    animate: { opacity: 1, transform: "translateY(0px) scale(1)" },
    exit: move
      ? {
          opacity: 0,
          transform: `translateX(${flow.direction * -24}px) rotate(${flow.direction * -0.8}deg)`,
        }
      : { opacity: 0 },
    transition: move ? { duration: 0.22, ease: EASE_OUT } : { duration: 0 },
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    flow.next(Boolean((event.nativeEvent as SubmitEvent).submitter));
  };

  return (
    <section className={cn("w-full px-4 py-14 sm:px-6", className)}>
      <div className="relative mx-auto w-full max-w-lg pb-4">
        <div className="absolute inset-x-8 top-4 bottom-0 rounded-2xl bg-muted/30" />
        <div className="absolute inset-x-4 top-2 bottom-2 rounded-2xl bg-muted/55" />
        <motion.div
          layout="size"
          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-background"
        >
          <div className="flex items-center justify-between px-5 pt-5 sm:px-7">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={flow.back}
              disabled={flow.stepIndex === 0 || flow.complete}
              aria-label="Previous step"
              className="-ml-2"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <span className="font-mono text-muted-foreground text-xs tabular-nums">
              {flow.complete
                ? "Complete"
                : `${flow.stepIndex + 1} of ${safeSteps.length}`}
            </span>
          </div>

          <form onSubmit={submit} noValidate>
            <AnimatePresence mode="wait" initial={false}>
              {flow.complete ? (
                <motion.div
                  key="done"
                  {...swap}
                  className="px-6 pt-8 pb-10 text-center sm:px-9"
                >
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className="mx-auto grid size-11 place-items-center rounded-full bg-foreground text-background"
                  >
                    <Check className="size-5" />
                  </motion.span>
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
                    onClick={flow.restart}
                    className="mt-5"
                  >
                    <RotateCcw className="size-3.5" />
                    Start again
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={flow.step.id}
                  {...swap}
                  className="px-6 pt-7 pb-7 sm:px-9 sm:pb-9"
                >
                  <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                    {flow.step.eyebrow}
                  </p>
                  <h2 className="mt-2 font-semibold text-2xl text-foreground tracking-tight">
                    {flow.step.title}
                  </h2>
                  <div className="mt-6">
                    <StepField
                      step={flow.step}
                      value={flow.answers[flow.step.id] ?? ""}
                      error={flow.error}
                      reduce={reduce}
                      onChange={flow.updateAnswer}
                    />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button type="submit" size="md">
                      {flow.lastStep ? submitLabel : "Next"}
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
