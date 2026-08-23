"use client";

import { useState } from "react";
import type { StepFormAnswers, StepFormStep } from "./types";

export function useStepFormFlow(
  steps: StepFormStep[],
  onComplete?: (answers: StepFormAnswers) => void,
) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animateSwap, setAnimateSwap] = useState(true);
  const [answers, setAnswers] = useState<StepFormAnswers>({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const step = steps[stepIndex];
  const lastStep = stepIndex === steps.length - 1;

  const updateAnswer = (value: string) => {
    setAnswers((current) => ({ ...current, [step.id]: value }));
    if (error) setError("");
  };

  const next = (animate = true) => {
    const value = answers[step.id]?.trim() ?? "";
    const message =
      step.required && !value
        ? "Please complete this step."
        : step.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)
          ? "Enter a valid email address."
          : "";

    if (message) {
      setError(message);
      return;
    }

    setAnimateSwap(animate);
    setDirection(1);
    setError("");
    if (lastStep) {
      setComplete(true);
      onComplete?.(answers);
    } else {
      setStepIndex((current) => current + 1);
    }
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

  return {
    step,
    stepIndex,
    direction,
    animateSwap,
    answers,
    error,
    complete,
    lastStep,
    updateAnswer,
    next,
    back,
    restart,
  };
}
