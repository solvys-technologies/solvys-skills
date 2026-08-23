"use client";

import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, type ReactNode, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

const STEPS = ["Interests", "Skills", "Documents"];

const FIELD = [
  { emoji: "🏥", label: "Healthcare Technology" },
  { emoji: "🛒", label: "E-commerce" },
  { emoji: "🏦", label: "FinTech" },
  { emoji: "🎓", label: "Education" },
  { emoji: "🎬", label: "Media & Entertainment" },
  { emoji: "🚗", label: "Automotive Industry" },
  { emoji: "📊", label: "Consulting & Services" },
  { emoji: "📣", label: "Marketing & Advertising" },
];

const TECH = [
  { emoji: "🖼️", label: "Front-End Development" },
  { emoji: "💻", label: "Back-End Development" },
  { emoji: "📱", label: "Mobile App Development" },
  { emoji: "📈", label: "Data Science" },
  { emoji: "🧠", label: "Machine Learning" },
  { emoji: "☁️", label: "Cloud Computing" },
  { emoji: "🎨", label: "UI/UX Design" },
  { emoji: "🖌️", label: "Graphic Design" },
  { emoji: "🔒", label: "Cybersecurity" },
];

const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "GraphQL",
  "Figma",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Rust",
  "Go",
];

export type OnboardingStepsProps = {
  className?: string;
};

export function OnboardingSteps({ className }: OnboardingStepsProps) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [interests, setInterests] = useState<string[]>([
    "E-commerce",
    "Back-End Development",
  ]);
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);

  const last = STEPS.length - 1;

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const toggle = (
    set: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) =>
    set((list) =>
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );

  const titles = ["Select Your Interests", "Pick Your Skills", "Add Documents"];

  const slide = (d: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, x: d * 28 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: d * -28 },
          transition: { duration: 0.32, ease: EASE_OUT },
        };

  return (
    <section className={cn("w-full px-4 py-16 sm:px-8 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-3xl">
        {/* Stepper. */}
        <div className="flex items-start justify-center">
          {STEPS.map((label, i) => {
            const reached = done || i < step;
            const current = !done && i === step;
            return (
              <Fragment key={label}>
                {i > 0 ? (
                  <span
                    className={cn(
                      "mt-[15px] h-0.5 w-10 rounded-full sm:w-16",
                      done || i <= step ? "bg-foreground" : "bg-border",
                    )}
                  />
                ) : null}
                <div className="flex w-24 flex-col items-center">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full border font-medium text-sm transition-colors",
                      reached
                        ? "border-foreground bg-foreground text-background"
                        : current
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {reached ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "mt-2 text-center text-xs",
                      current || reached
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>

        {/* Body. */}
        <div className="mt-14 min-h-[20rem]">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                {...slide(1)}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0.4, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                  className="grid size-16 place-items-center rounded-full bg-emerald-500 text-white"
                >
                  <Check className="size-8" />
                </motion.span>
                <h2 className="mt-5 font-serif text-2xl text-foreground">
                  You're all set!
                </h2>
                <p className="mt-2 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
                  We've tailored your workspace around {interests.length}{" "}
                  interests and {skills.length} skills.
                </p>
              </motion.div>
            ) : (
              <motion.div key={step} {...slide(dir)}>
                <h2 className="text-center font-serif text-2xl text-foreground sm:text-3xl">
                  {titles[step]}
                </h2>

                {step === 0 ? (
                  <div className="mt-10 flex flex-col gap-8">
                    <ChipGroup
                      label="Field of work"
                      items={FIELD}
                      selected={interests}
                      onToggle={(v) => toggle(setInterests, v)}
                      reduce={reduce}
                    />
                    <ChipGroup
                      label="Technology"
                      items={TECH}
                      selected={interests}
                      onToggle={(v) => toggle(setInterests, v)}
                      reduce={reduce}
                    />
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="mt-10">
                    <ChipGroup
                      label="Your strengths"
                      items={SKILLS.map((s) => ({ label: s }))}
                      selected={skills}
                      onToggle={(v) => toggle(setSkills, v)}
                      reduce={reduce}
                    />
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="mx-auto mt-10 max-w-md">
                    <button
                      type="button"
                      className="flex w-full flex-col items-center gap-2 rounded-3xl border border-border border-dashed p-10 text-center transition-colors hover:border-foreground/30"
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-muted text-foreground">
                        <Upload className="size-5" />
                      </span>
                      <p className="mt-1 font-medium text-foreground text-sm">
                        Drop your résumé or portfolio
                      </p>
                      <p className="text-muted-foreground text-xs">
                        PDF, DOCX or PNG — up to 10MB
                      </p>
                    </button>
                    <p className="mt-3 text-center text-muted-foreground text-xs">
                      Optional — you can add these later.
                    </p>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer. */}
        {done ? (
          <div className="mt-10 flex justify-center">
            <Button type="button" size="md" className="rounded-full px-6">
              Go to dashboard
              <ArrowRight className="size-4" />
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center gap-3">
            {step > 0 ? (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => go(step - 1)}
                className="rounded-full"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
            ) : null}
            <Button
              type="button"
              size="md"
              onClick={() => (step === last ? setDone(true) : go(step + 1))}
              className="min-w-36 rounded-full"
            >
              {step === last ? "Finish" : "Next"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ChipGroup({
  label,
  items,
  selected,
  onToggle,
  reduce,
}: {
  label: string;
  items: { emoji?: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  reduce: boolean | null;
}) {
  return (
    <div>
      <Divider>{label}</Divider>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {items.map((item) => {
          const active = selected.includes(item.label);
          return (
            <motion.button
              key={item.label}
              type="button"
              onClick={() => onToggle(item.label)}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors",
                active
                  ? "border-transparent bg-foreground/[0.04] font-medium text-foreground"
                  : "border-border text-foreground hover:border-foreground/40",
              )}
            >
              {/* Selection ring springs in on click. */}
              <AnimatePresence>
                {active ? (
                  <motion.span
                    aria-hidden
                    initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { scale: 0.85, opacity: 0 }}
                    transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                    className="pointer-events-none absolute inset-0 rounded-full ring-[1.5px] ring-foreground"
                  />
                ) : null}
              </AnimatePresence>
              {item.emoji ? <span aria-hidden>{item.emoji}</span> : null}
              {item.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-border" />
      <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
