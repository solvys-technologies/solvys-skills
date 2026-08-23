"use client";

import { Mail, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import type { ButtonState } from "@/components/motion/button/stateful";
import { StatefulButton } from "@/components/motion/button/stateful";
import { NumberTicker } from "@/components/motion/number-ticker";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";

export type NewsletterInlineProps = {
  eyebrow?: string;
  title?: string[];
  subtext?: string;
  placeholder?: string;
  ctaLabel?: string;
  subscriberCount?: number;
  className?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Subscriber faces for the social-proof stack.
const FACES = ["Aria", "Milo", "Juno", "Remy", "Saanvi"];

// Decorative envelopes that drift behind the content.
const ENVELOPES = [
  { left: "8%", top: "22%", size: 20, delay: 0, dur: 6 },
  { left: "84%", top: "18%", size: 26, delay: 1.2, dur: 7 },
  { left: "16%", top: "70%", size: 16, delay: 0.6, dur: 5.5 },
  { left: "90%", top: "64%", size: 18, delay: 1.8, dur: 6.5 },
];

export function NewsletterInline({
  eyebrow = "The weekly drop",
  title = ["Ship better UI,", "every single week."],
  subtext = "New premium components, motion breakdowns, and changelog notes — straight to your inbox. No fluff, unsubscribe anytime.",
  placeholder = "you@company.com",
  ctaLabel = "Subscribe",
  subscriberCount = 12438,
  className,
}: NewsletterInlineProps) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ButtonState>("idle");
  const done = state === "success";

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
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 px-6 py-16 text-center shadow-[0_40px_90px_-50px_rgba(40,60,180,0.7)] sm:px-10">
          <Grainient
            className="absolute inset-0"
            color1="#aab4ff"
            color2="#4f6ef7"
            color3="#3b54e0"
            grainAmount={0.08}
            contrast={1.2}
            zoom={0.9}
          />

          {/* Drifting envelopes. */}
          {!reduce
            ? ENVELOPES.map((env) => (
                <motion.span
                  key={env.left + env.top}
                  aria-hidden
                  className="absolute text-white/15"
                  style={{ left: env.left, top: env.top }}
                  animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
                  transition={{
                    duration: env.dur,
                    delay: env.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Mail style={{ width: env.size, height: env.size }} />
                </motion.span>
              ))
            : null}

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 font-medium text-white/90 text-xs backdrop-blur-md">
              <span className="relative flex size-1.5">
                {!reduce ? (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300/80" />
                ) : null}
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-300" />
              </span>
              {eyebrow}
            </span>

            <TextReveal
              as="h2"
              text={title}
              split="word"
              blur={10}
              className="mt-5 text-balance font-serif text-3xl text-white leading-[1.1] sm:text-4xl"
            />

            {subtext ? (
              <p className="mx-auto mt-4 max-w-md text-pretty text-sm text-white/70 leading-7">
                {subtext}
              </p>
            ) : null}

            {/* Form / success morph. */}
            <div className="mt-8 min-h-[3rem]">
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.35, ease: EASE_OUT }
                    }
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-4 py-2.5 font-medium text-sm text-white backdrop-blur-md"
                  >
                    <motion.span
                      initial={reduce ? false : { scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                      className="grid size-6 place-items-center rounded-full bg-emerald-400 text-neutral-900"
                    >
                      <Send className="size-3" />
                    </motion.span>
                    You're in — check your inbox to confirm.
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
                    className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
                  >
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
                        "h-12 w-full shrink-0 rounded-full border bg-white/15 px-5 text-sm text-white outline-none backdrop-blur-md transition-colors placeholder:text-white/55 focus-visible:ring-2 focus-visible:ring-white/50 sm:flex-1",
                        state === "error"
                          ? "border-rose-300/80"
                          : "border-white/25",
                      )}
                    />
                    <StatefulButton
                      type="submit"
                      state={state === "error" ? "idle" : state}
                      size="lg"
                      className="h-12 rounded-full bg-white text-neutral-900 hover:bg-white/90"
                      loadingText="Subscribing"
                      successText="Subscribed"
                    >
                      {ctaLabel}
                    </StatefulButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Social proof. */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <div className="flex">
                {FACES.map((seed, i) => (
                  // biome-ignore lint/performance/noImgElement: small remote SVG avatar
                  <motion.img
                    key={seed}
                    src={`https://api.dicebear.com/10.x/glass/svg?seed=${seed}`}
                    alt=""
                    aria-hidden
                    initial={reduce ? false : { opacity: 0, scale: 0.5, x: -6 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { ...SPRING_BOUNCE, delay: 0.1 + i * 0.07 }
                    }
                    className="-ml-2 size-7 rounded-full ring-2 ring-white/50 first:ml-0"
                  />
                ))}
              </div>
              <p className="flex items-center gap-1.5 text-sm text-white/80">
                <NumberTicker
                  value={subscriberCount}
                  locale
                  className="font-semibold text-white"
                />
                developers subscribed
              </p>
            </div>

            <p className="mt-4 inline-flex items-center gap-1.5 text-white/55 text-xs">
              <Sparkles className="size-3" />
              One email a week. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
