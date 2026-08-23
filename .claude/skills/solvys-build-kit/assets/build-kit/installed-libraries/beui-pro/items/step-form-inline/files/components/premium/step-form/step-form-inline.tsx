"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useId } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { AnimatedStepFormProps, StepFormStep } from "./types";
import { useStepFormFlow } from "./use-step-form-flow";

const INLINE_STEPS: StepFormStep[] = [
  {
    id: "idea",
    eyebrow: "Start",
    title: "What are you hoping to make?",
    type: "text",
    placeholder: "A short product idea",
    required: true,
  },
  {
    id: "pace",
    eyebrow: "Pace",
    title: "How quickly do you want to move?",
    type: "choice",
    required: true,
    options: [
      { value: "week", label: "This week" },
      { value: "month", label: "This month" },
      { value: "open", label: "No rush" },
    ],
  },
  {
    id: "email",
    eyebrow: "Finish",
    title: "Where should the summary go?",
    type: "email",
    placeholder: "you@company.com",
    autoComplete: "email",
    required: true,
  },
];

export function StepFormInline({
  steps = INLINE_STEPS,
  submitLabel = "Finish",
  successTitle = "That is everything.",
  successDescription = "Your answers are ready for the next step.",
  onComplete,
  className,
}: AnimatedStepFormProps) {
  const reduce = useReducedMotion();
  const selectionId = useId();
  const safeSteps = steps.length ? steps : INLINE_STEPS;
  const flow = useStepFormFlow(safeSteps, onComplete);
  const move = !reduce && flow.animateSwap;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    flow.next(Boolean((event.nativeEvent as SubmitEvent).submitter));
  };
  const swap = {
    initial: move
      ? {
          opacity: 0,
          transform: `translateY(${flow.direction * 12}px)`,
          filter: "blur(3px)",
        }
      : false,
    animate: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
    exit: move
      ? {
          opacity: 0,
          transform: `translateY(${flow.direction * -8}px)`,
          filter: "blur(2px)",
        }
      : { opacity: 0 },
    transition: move ? { duration: 0.2, ease: EASE_OUT } : { duration: 0 },
  };

  return (
    <section className={cn("w-full px-4 py-14 sm:px-6", className)}>
      <motion.div
        layout="size"
        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
        className="mx-auto w-full max-w-2xl rounded-[2rem]px-5 py-6 sm:px-9 sm:py-8"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-muted-foreground text-xs uppercase tracking-[0.14em]">
            Quick brief
          </span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {safeSteps.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "size-1.5 rounded-full bg-foreground/15 transition-colors",
                  index <= flow.stepIndex && "bg-foreground",
                )}
              />
            ))}
          </div>
        </div>

        <form onSubmit={submit} noValidate>
          <AnimatePresence mode="wait" initial={false}>
            {flow.complete ? (
              <motion.div key="done" {...swap} className="py-10 text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-full bg-foreground text-background">
                  <Check className="size-4" />
                </span>
                <h2 className="mt-4 font-semibold text-2xl text-foreground tracking-tight">
                  {successTitle}
                </h2>
                <p className="mt-2 text-muted-foreground text-sm">
                  {successDescription}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={flow.restart}
                  className="mt-5"
                >
                  Start again
                </Button>
              </motion.div>
            ) : (
              <motion.div key={flow.step.id} {...swap} className="pt-10 pb-2">
                <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                  {flow.step.eyebrow}
                </p>
                <h2 className="mt-2 max-w-xl font-semibold text-2xl text-foreground tracking-tight sm:text-3xl">
                  {flow.step.title}
                </h2>

                <div className="mt-8 min-h-24">
                  {flow.step.type === "choice" ? (
                    <fieldset className="flex flex-wrap gap-2">
                      <legend className="sr-only">{flow.step.title}</legend>
                      {flow.step.options.map((option) => {
                        const selected =
                          flow.answers[flow.step.id] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => flow.updateAnswer(option.value)}
                            className={cn(
                              "relative isolate flex min-h-10 items-center overflow-hidden rounded-full px-4 font-medium text-sm outline-none transition-colors focus-visible:bg-background/80",
                              selected
                                ? "text-primary"
                                : "text-foreground hover:bg-foreground/7",
                            )}
                          >
                            {selected ? (
                              <motion.span
                                layoutId={`inline-step-choice-${selectionId}`}
                                className="absolute inset-0 -z-10 rounded-full bg-foreground/7"
                                transition={
                                  reduce ? { duration: 0 } : SPRING_LAYOUT
                                }
                              />
                            ) : null}
                            <motion.span
                              aria-hidden="true"
                              initial={false}
                              animate={{
                                width: selected ? 14 : 0,
                                marginRight: selected ? 7 : 0,
                                opacity: selected ? 1 : 0,
                                scale: selected ? 1 : 0.6,
                              }}
                              transition={
                                reduce ? { duration: 0 } : SPRING_LAYOUT
                              }
                              className="flex shrink-0 items-center overflow-hidden"
                            >
                              <Check
                                className="size-3.5 shrink-0"
                                strokeWidth={2.5}
                              />
                            </motion.span>
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </fieldset>
                  ) : (
                    <input
                      name={flow.step.id}
                      type={flow.step.type}
                      value={flow.answers[flow.step.id] ?? ""}
                      autoComplete={flow.step.autoComplete}
                      placeholder={flow.step.placeholder}
                      aria-invalid={Boolean(flow.error)}
                      onChange={(event) =>
                        flow.updateAnswer(event.target.value)
                      }
                      className={cn(
                        "h-14 w-full border-0 border-foreground/20 border-b bg-transparent px-0 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-foreground",
                        flow.error && "border-destructive",
                      )}
                    />
                  )}
                  <p
                    aria-live="polite"
                    className="min-h-6 pt-1.5 text-destructive text-xs"
                  >
                    {flow.error}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={flow.back}
                    disabled={flow.stepIndex === 0}
                    className="-ml-3"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back
                  </Button>
                  <Button type="submit" size="md">
                    {flow.lastStep ? submitLabel : "Continue"}
                    <ArrowRight className="size-4" />
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
