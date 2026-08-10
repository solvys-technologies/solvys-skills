"use client";

import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/motion/button/base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/motion/select";
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { StepFormAnswers } from "./types";

export type OnboardingField = {
  id: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  span?: "half" | "full";
  options?: { value: string; label: string }[];
};

export type OnboardingSection = {
  id: string;
  label: string;
  title: string;
  description: string;
  fields: OnboardingField[];
};

export type StepFormOnboardingProps = {
  sections?: OnboardingSection[];
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
  onComplete?: (answers: StepFormAnswers) => void;
  className?: string;
};

const ONBOARDING_SECTIONS: OnboardingSection[] = [
  {
    id: "profile",
    label: "Profile",
    title: "Tell us about you",
    description: "Start with the basics. You can change these details later.",
    fields: [
      {
        id: "firstName",
        label: "First name",
        type: "text",
        placeholder: "Alex",
        autoComplete: "given-name",
        required: true,
        span: "half",
      },
      {
        id: "lastName",
        label: "Last name",
        type: "text",
        placeholder: "Morgan",
        autoComplete: "family-name",
        required: true,
        span: "half",
      },
      {
        id: "email",
        label: "Work email",
        type: "email",
        placeholder: "alex@company.com",
        autoComplete: "email",
        required: true,
        span: "full",
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    title: "Set up your workspace",
    description: "A few details help us prepare the right starting point.",
    fields: [
      {
        id: "company",
        label: "Company or team",
        type: "text",
        placeholder: "Acme Studio",
        autoComplete: "organization",
        required: true,
        span: "full",
      },
      {
        id: "role",
        label: "Your role",
        type: "select",
        placeholder: "Select a role",
        required: true,
        span: "half",
        options: [
          { value: "founder", label: "Founder" },
          { value: "design", label: "Design" },
          { value: "engineering", label: "Engineering" },
          { value: "product", label: "Product" },
        ],
      },
      {
        id: "teamSize",
        label: "Team size",
        type: "select",
        placeholder: "Select a size",
        required: true,
        span: "half",
        options: [
          { value: "1", label: "Just me" },
          { value: "2-10", label: "2–10 people" },
          { value: "11-50", label: "11–50 people" },
          { value: "51+", label: "51+ people" },
        ],
      },
    ],
  },
  {
    id: "goals",
    label: "Goals",
    title: "What should we optimize for?",
    description: "Give the workspace a little context before you arrive.",
    fields: [
      {
        id: "website",
        label: "Company website",
        type: "text",
        placeholder: "company.com",
        autoComplete: "url",
        span: "full",
      },
      {
        id: "goal",
        label: "Primary goal",
        type: "select",
        placeholder: "Choose your main goal",
        required: true,
        span: "full",
        options: [
          { value: "launch", label: "Launch something new" },
          { value: "improve", label: "Improve an existing product" },
          { value: "explore", label: "Explore and prototype" },
        ],
      },
      {
        id: "context",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder: "A short note about what you are building",
        span: "full",
      },
    ],
  },
];

export function StepFormOnboarding({
  sections = ONBOARDING_SECTIONS,
  submitLabel = "Create workspace",
  successTitle = "Your workspace is ready.",
  successDescription = "Everything is set up. You can start inviting your team.",
  onComplete,
  className,
}: StepFormOnboardingProps) {
  const reduce = useReducedMotion();
  const safeSections = sections.length ? sections : ONBOARDING_SECTIONS;
  const [sectionIndex, setSectionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<StepFormAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const section = safeSections[sectionIndex];
  const lastSection = sectionIndex === safeSections.length - 1;

  const updateAnswer = (id: string, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: "" }));
  };

  const validateSection = () => {
    const nextErrors: Record<string, string> = {};
    for (const field of section.fields) {
      const value = answers[field.id]?.trim() ?? "";
      if (field.required && !value) nextErrors[field.id] = "This is required.";
      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        nextErrors[field.id] = "Enter a valid email address.";
      }
    }
    setErrors(nextErrors);
    const firstError = section.fields.find((field) => nextErrors[field.id]);
    if (firstError)
      document.getElementById(`onboarding-${firstError.id}`)?.focus();
    return !firstError;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateSection()) return;
    if (lastSection) {
      setComplete(true);
      onComplete?.(answers);
      return;
    }
    setDirection(1);
    setSectionIndex((current) => current + 1);
  };

  const back = () => {
    if (sectionIndex === 0) return;
    setDirection(-1);
    setErrors({});
    setSectionIndex((current) => current - 1);
  };

  const restart = () => {
    setAnswers({});
    setErrors({});
    setDirection(-1);
    setSectionIndex(0);
    setComplete(false);
  };

  const swap = {
    initial: reduce
      ? false
      : { opacity: 0, transform: `translateX(${direction * 18}px)` },
    animate: { opacity: 1, transform: "translateX(0px)" },
    exit: reduce
      ? { opacity: 0 }
      : { opacity: 0, transform: `translateX(${direction * -14}px)` },
    transition: reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT },
  };

  return (
    <section className={cn("w-full px-4 py-12 sm:px-6", className)}>
      <motion.div
        layout="size"
        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
        className="mx-auto w-full max-w-3xl rounded-2xl border border-border/55 bg-background"
      >
        <div className="border-border/45 border-b px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-foreground text-sm tracking-tight">
                Set up your account
              </p>
              <p className="mt-0.5 text-muted-foreground text-xs">
                Usually takes less than two minutes
              </p>
            </div>
            {!complete ? (
              <span className="font-mono text-muted-foreground text-xs tabular-nums">
                {sectionIndex + 1}/{safeSections.length}
              </span>
            ) : null}
          </div>
          {!complete ? (
            <ol className="mt-5 grid grid-cols-3 gap-2">
              {safeSections.map((item, index) => {
                const current = index === sectionIndex;
                const completed = index < sectionIndex;
                return (
                  <li key={item.id} className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full font-mono text-[9px] transition-colors",
                          current || completed
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {completed ? <Check className="size-3" /> : index + 1}
                      </span>
                      <span
                        className={cn(
                          "truncate text-xs transition-colors max-sm:hidden",
                          current
                            ? "font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full bg-foreground"
                        initial={false}
                        animate={{
                          width: current || completed ? "100%" : "0%",
                        }}
                        transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : null}
        </div>

        <form onSubmit={submit} noValidate>
          <AnimatePresence mode="wait" initial={false}>
            {complete ? (
              <motion.div
                key="complete"
                {...swap}
                className="px-6 py-16 text-center sm:px-10 sm:py-20"
              >
                <motion.span
                  initial={reduce ? false : { opacity: 0, scale: 0.86 }}
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
                  onClick={restart}
                  className="mt-5"
                >
                  <RotateCcw className="size-3.5" />
                  Start again
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={section.id}
                {...swap}
                className="px-5 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8"
              >
                <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
                  {section.label}
                </p>
                <h2 className="mt-2 font-semibold text-2xl text-foreground tracking-tight sm:text-[1.75rem]">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-lg text-muted-foreground text-sm leading-6">
                  {section.description}
                </p>
                <div className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className={cn(
                        "min-w-0",
                        field.span !== "half" && "sm:col-span-2",
                      )}
                    >
                      <label
                        htmlFor={`onboarding-${field.id}`}
                        className="mb-2 block font-medium text-foreground text-xs"
                      >
                        {field.label}
                        {field.required ? (
                          <span
                            className="ml-1 text-muted-foreground"
                            aria-hidden="true"
                          >
                            *
                          </span>
                        ) : null}
                      </label>
                      {field.type === "select" ? (
                        <Select
                          id={`onboarding-${field.id}`}
                          value={answers[field.id] ?? ""}
                          onValueChange={(value) =>
                            updateAnswer(field.id, value)
                          }
                        >
                          <SelectTrigger className="h-11 border-0 bg-muted/55 px-3.5 py-0 hover:border-transparent focus-visible:bg-muted focus-visible:ring-1 focus-visible:ring-foreground/15">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="border-border/55">
                            {field.options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "textarea" ? (
                        <textarea
                          id={`onboarding-${field.id}`}
                          name={field.id}
                          value={answers[field.id] ?? ""}
                          placeholder={field.placeholder}
                          aria-invalid={Boolean(errors[field.id])}
                          aria-describedby={`onboarding-${field.id}-error`}
                          onChange={(event) =>
                            updateAnswer(field.id, event.target.value)
                          }
                          className="min-h-24 w-full resize-none rounded-xl bg-muted/55 px-3.5 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:bg-muted"
                        />
                      ) : (
                        <input
                          id={`onboarding-${field.id}`}
                          name={field.id}
                          type={field.type}
                          value={answers[field.id] ?? ""}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          aria-invalid={Boolean(errors[field.id])}
                          aria-describedby={`onboarding-${field.id}-error`}
                          onChange={(event) =>
                            updateAnswer(field.id, event.target.value)
                          }
                          className="h-11 w-full rounded-xl border-0 bg-muted/55 px-3.5 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:bg-muted"
                        />
                      )}
                      <p
                        id={`onboarding-${field.id}-error`}
                        aria-live="polite"
                        className="min-h-5 pt-1 text-destructive text-xs"
                      >
                        {errors[field.id]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={back}
                    disabled={sectionIndex === 0}
                    className="-ml-3"
                  >
                    <ArrowLeft className="size-3.5" />
                    Back
                  </Button>
                  <Button type="submit" size="md">
                    {lastSection ? submitLabel : "Continue"}
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
