"use client";

import { Check, Inbox, Mail } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import type { ButtonState } from "@/components/motion/button/stateful";
import { StatefulButton } from "@/components/motion/button/stateful";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";

export type NewsletterCardProps = {
  eyebrow?: string;
  title?: string;
  subtext?: string;
  perks?: string[];
  placeholder?: string;
  ctaLabel?: string;
  note?: string;
  className?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_PERKS = [
  "New premium components first",
  "Motion & design breakdowns",
  "Changelog in your inbox",
];

// Issues that roll through the animated inbox preview.
const ISSUES = [
  { tag: "#48", title: "Motion that feels physical", time: "now" },
  { tag: "#47", title: "Designing for AI agents", time: "1w" },
  { tag: "#46", title: "The craft of empty states", time: "2w" },
  { tag: "#45", title: "Springs over easings", time: "3w" },
  { tag: "#44", title: "Command menus done right", time: "4w" },
  { tag: "#43", title: "Micro-interactions that delight", time: "5w" },
];

// Row height (card + gap) in px — the column steps up by exactly this each tick.
const ROW = 64;

export function NewsletterCard({
  eyebrow = "Newsletter",
  title = "The premium UI digest.",
  subtext = "A weekly note for developers who care about craft. Join 12,000+ builders.",
  perks = DEFAULT_PERKS,
  placeholder = "you@company.com",
  ctaLabel = "Subscribe",
  note = "No spam. Unsubscribe anytime.",
  className,
}: NewsletterCardProps) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ButtonState>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => setState("success"), 1100);
  };

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card lg:grid-cols-[1.05fr_1fr]">
          {/* Copy + form. */}
          <div className="p-8 sm:p-10">
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 font-medium text-muted-foreground text-xs">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-4 text-balance font-serif text-2xl text-foreground leading-tight sm:text-3xl">
              {title}
            </h2>
            {subtext ? (
              <p className="mt-3 text-pretty text-muted-foreground text-sm leading-7">
                {subtext}
              </p>
            ) : null}

            {perks?.length ? (
              <ul className="mt-5 space-y-2.5">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2.5 text-foreground text-sm"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/12 text-emerald-600">
                      <Check className="size-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-7 min-h-[6rem]">
              <AnimatePresence mode="wait" initial={false}>
                {state === "success" ? (
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.35, ease: EASE_OUT }
                    }
                    className="flex items-center gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4"
                  >
                    <motion.span
                      initial={reduce ? false : { scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
                    >
                      <Check className="size-5" />
                    </motion.span>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        You're subscribed!
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Check your inbox to confirm.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.2, ease: EASE_OUT }
                    }
                    className="flex flex-col gap-2.5"
                  >
                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (state === "error") setState("idle");
                        }}
                        placeholder={placeholder}
                        aria-label="Email address"
                        aria-invalid={state === "error"}
                        className={cn(
                          "h-11 w-full shrink-0 rounded-xl border bg-background px-4 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-foreground/30 sm:flex-1",
                          state === "error"
                            ? "border-rose-500/60"
                            : "border-border/70",
                        )}
                      />
                      <StatefulButton
                        type="submit"
                        state={state === "error" ? "idle" : state}
                        size="lg"
                        className="h-11 rounded-xl"
                        loadingText="Subscribing"
                        successText="Subscribed"
                      >
                        {ctaLabel}
                      </StatefulButton>
                    </div>
                    <p className="text-muted-foreground/80 text-xs">
                      {state === "error"
                        ? "Enter a valid email address."
                        : note}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Animated inbox preview. */}
          <InboxPreview reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

function InboxPreview({ reduce }: { reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const still = !!reduce || !inView;

  // The column steps up one row, rests, then steps again. `instant` snaps the
  // loop back at the duplicate boundary with no animation, so it reads endless.
  const [step, setStep] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (still) {
      setStep(0);
      return;
    }
    const id = setInterval(() => setStep((s) => s + 1), 1700);
    return () => clearInterval(id);
  }, [still]);

  useEffect(() => {
    if (still || step < ISSUES.length) return;
    // Let the roll-into-the-duplicate finish, then jump back invisibly.
    const t = setTimeout(() => {
      setInstant(true);
      setStep(0);
    }, 700);
    return () => clearTimeout(t);
  }, [step, still]);

  useEffect(() => {
    if (!instant) return;
    const r = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(r);
  }, [instant]);

  // Doubled list gives the column somewhere to roll into before the snap.
  const rows = still ? ISSUES : [...ISSUES, ...ISSUES];

  return (
    <div
      ref={ref}
      className="relative min-h-[20rem] overflow-hidden border-border/60 border-t p-6 lg:border-t-0 lg:border-l"
    >
      <Grainient
        className="absolute inset-0"
        color1="#aab4ff"
        color2="#4f6ef7"
        color3="#3b54e0"
        grainAmount={0.08}
        contrast={1.2}
        zoom={0.9}
      />

      <div className="relative flex h-full flex-col rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-medium text-sm text-white">
            <Inbox className="size-4" />
            Your inbox
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white/90">
            <span className="relative flex size-1.5">
              {!still ? (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300/80" />
              ) : null}
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-300" />
            </span>
            delivering
          </span>
        </div>

        {/* Rolling column — focus sits dead-center; scrolled + upcoming fade. */}
        <div
          className="relative mt-3 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
          style={{ height: ROW * 3 }}
        >
          <motion.div
            // Offset by ~1.4 rows so the focused row (`step`) sits just below center.
            animate={{ y: -(step - 1) * ROW + ROW * 0.4 }}
            transition={
              instant || still
                ? { duration: 0 }
                : { duration: 0.6, ease: EASE_OUT }
            }
          >
            {rows.map((issue, i) => {
              const focus = still ? i === 0 : i === step;
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: doubled list, position is the identity
                  key={i}
                  className="flex items-center px-0"
                  style={{ height: ROW }}
                >
                  <div
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-2.5 py-2.5 transition-all duration-500",
                      focus
                        ? "scale-100 border-white/30 bg-white/20 opacity-100 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]"
                        : "scale-[0.96] border-white/10 bg-white/[0.06] opacity-55",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg text-white transition-colors duration-500",
                        focus
                          ? "bg-emerald-400 text-neutral-900"
                          : "bg-white/15",
                      )}
                    >
                      <Mail className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white text-xs">
                        {issue.title}
                      </p>
                      <p className="text-[11px] text-white/55">
                        The weekly drop · {issue.tag}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-[10px] text-white/65">
                      {focus ? (
                        <span className="grid size-3.5 place-items-center rounded-full bg-emerald-400 text-neutral-900">
                          <Check className="size-2.5" />
                        </span>
                      ) : null}
                      {issue.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
