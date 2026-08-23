"use client";

import { Check } from "lucide-react";
import { type MotionConfigProps, motion } from "motion/react";
import { useId } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { StepFormStep } from "./types";

type StepFieldProps = {
  step: StepFormStep;
  value: string;
  error: string;
  reduce: boolean | null;
  onChange: (value: string) => void;
};

export function StepField({
  step,
  value,
  error,
  reduce,
  onChange,
}: StepFieldProps) {
  const selectionId = useId();
  const transition: MotionConfigProps["transition"] = reduce
    ? { duration: 0 }
    : SPRING_LAYOUT;

  if (step.type === "choice") {
    return (
      <fieldset className="grid gap-2" aria-describedby={`${step.id}-error`}>
        <legend className="sr-only">{step.title}</legend>
        {step.options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative isolate flex min-h-14 w-full items-center justify-between gap-4 overflow-hidden rounded-xl border border-border/60 px-4 py-3 text-left text-foreground outline-none transition-colors focus-visible:bg-muted",
                !selected && "hover:border-border",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId={`step-form-choice-${selectionId}`}
                  aria-hidden="true"
                  initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 -z-10 bg-muted"
                  transition={transition}
                />
              ) : null}
              <span className="min-w-0">
                <span className="block font-medium text-sm">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-0.5 block text-muted-foreground text-xs leading-5">
                    {option.description}
                  </span>
                ) : null}
              </span>
              <motion.span
                initial={false}
                animate={
                  reduce
                    ? undefined
                    : {
                        opacity: selected ? 1 : 0.45,
                        scale: selected ? 1 : 0.82,
                        rotate: selected ? 0 : -8,
                      }
                }
                transition={transition}
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full border",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-transparent",
                )}
              >
                <Check className="size-3" strokeWidth={2.5} />
              </motion.span>
            </button>
          );
        })}
        <FieldError id={`${step.id}-error`} error={error} />
      </fieldset>
    );
  }

  return (
    <div>
      <label htmlFor={step.id} className="sr-only">
        {step.title}
      </label>
      <input
        id={step.id}
        name={step.id}
        type={step.type}
        value={value}
        autoComplete={step.autoComplete}
        placeholder={step.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={`${step.id}-error`}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-14 w-full rounded-xl border bg-transparent px-4 text-foreground text-base outline-none transition-colors placeholder:text-muted-foreground/65 focus:border-foreground focus:ring-2 focus:ring-foreground/10",
          error ? "border-destructive" : "border-border/60",
        )}
      />
      <FieldError id={`${step.id}-error`} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error: string }) {
  return (
    <p
      id={id}
      aria-live="polite"
      className="min-h-6 pt-1.5 text-destructive text-xs"
    >
      {error}
    </p>
  );
}
