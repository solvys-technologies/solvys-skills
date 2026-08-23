"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  KeyRound,
  type LucideIcon,
  Mail,
  PackagePlus,
  Rocket,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

// Springy shared-layout morph — a touch of bounce on expand/collapse.
const MORPH = {
  type: "spring",
  stiffness: 340,
  damping: 30,
  mass: 0.9,
} as const;

type Task = { id: string; icon: LucideIcon; title: string; body: string };

const TASKS: Task[] = [
  {
    id: "verify",
    icon: Mail,
    title: "Verify your email",
    body: "Secure your account.",
  },
  {
    id: "workspace",
    icon: PackagePlus,
    title: "Create your workspace",
    body: "Name it and pick a plan.",
  },
  {
    id: "token",
    icon: KeyRound,
    title: "Grab your registry token",
    body: "Needed to install components.",
  },
  {
    id: "invite",
    icon: Users,
    title: "Invite a teammate",
    body: "Better together.",
  },
];

const LAYOUT_ID = "onboarding-pass";

export type OnboardingModalProps = {
  className?: string;
};

export function OnboardingModal({ className }: OnboardingModalProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string[]>(["verify"]);

  const total = TASKS.length;
  const count = done.length;
  const value = count / total;
  const allDone = count === total;

  const toggle = (id: string) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={cn(
        "grid min-h-[28rem] w-full place-items-center px-4 py-16",
        className,
      )}
    >
      {/* Trigger row — morphs into the modal. */}
      {open ? null : (
        <motion.button
          type="button"
          layoutId={LAYOUT_ID}
          onClick={() => setOpen(true)}
          transition={reduce ? { duration: 0 } : MORPH}
          style={{ borderRadius: 20 }}
          className="flex w-full max-w-md items-center gap-4 border border-border p-2.5 text-left"
        >
          <motion.span
            layout="position"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground"
          >
            <Rocket className="size-5" />
          </motion.span>
          <motion.div layout="position" className="min-w-0 flex-1">
            <p className="font-medium text-foreground text-sm">
              {allDone ? "You're all set up" : "Finish onboarding"}
            </p>
            <p className="truncate text-muted-foreground text-xs">
              {allDone
                ? "Everything's done — nice work."
                : `${count} of ${total} steps complete`}
            </p>
          </motion.div>
          <motion.span layout="position">
            <Ring value={value} size={40} reduce={reduce} />
          </motion.span>
        </motion.button>
      )}

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                pointerEvents: "none",
                transition: { duration: 0.18, ease: EASE_OUT },
              }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            />
            <motion.div
              key="modal"
              layoutId={LAYOUT_ID}
              transition={reduce ? { duration: 0 } : MORPH}
              style={{ borderRadius: 32 }}
              className="fixed inset-x-4 inset-y-0 z-50 m-auto h-fit w-full max-w-md overflow-hidden border border-border bg-background shadow-2xl"
            >
              <motion.div
                layout="position"
                initial={reduce ? false : { opacity: 0, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: reduce
                    ? { duration: 0 }
                    : { delay: 0.1, duration: 0.3, ease: EASE_OUT },
                }}
                exit={
                  reduce
                    ? undefined
                    : {
                        opacity: 0,
                        filter: "blur(6px)",
                        transition: { duration: 0.12, ease: EASE_OUT },
                      }
                }
                className="p-4 sm:p-5"
              >
                {/* Header. */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Ring value={value} size={48} reduce={reduce} />
                    <div>
                      <p className="font-semibold text-foreground text-xl">
                        Finish setting up
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {count} of {total} steps complete
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Tasks. */}
                <div className="mt-5 flex flex-col gap-2">
                  {TASKS.map((task) => {
                    const complete = done.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggle(task.id)}
                        className="flex items-center gap-3 rounded-xl border border-border/60 p-3 text-left transition-colors hover:bg-muted"
                      >
                        <span
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                            complete
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {complete ? (
                              <motion.span
                                key="c"
                                initial={reduce ? false : { scale: 0.4 }}
                                animate={{ scale: 1 }}
                                transition={
                                  reduce ? { duration: 0 } : SPRING_BOUNCE
                                }
                              >
                                <Check className="size-4" />
                              </motion.span>
                            ) : (
                              <task.icon className="size-4" />
                            )}
                          </AnimatePresence>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block font-medium text-sm",
                              complete
                                ? "text-muted-foreground line-through"
                                : "text-foreground",
                            )}
                          >
                            {task.title}
                          </span>
                          <span className="block truncate text-muted-foreground text-xs">
                            {task.body}
                          </span>
                        </span>
                        {complete ? null : (
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col items-center gap-2.5">
                  <Button
                    type="button"
                    size="md"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-full"
                  >
                    {allDone ? "Go to dashboard" : "Continue setup"}
                    <ArrowRight className="size-4" />
                  </Button>
                  {allDone ? null : (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
                    >
                      Maybe later
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Ring({
  value,
  size,
  reduce,
}: {
  value: number;
  size: number;
  reduce: boolean | null;
}) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        role="img"
        aria-label={`${Math.round(value * 100)}% complete`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-foreground/15"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value) }}
          transition={reduce ? { duration: 0 } : { ...SPRING_BOUNCE }}
          className="stroke-foreground"
        />
      </svg>
      <span className="absolute font-medium text-[10px] text-foreground tabular-nums">
        {Math.round(value * 100)}
      </span>
    </span>
  );
}
