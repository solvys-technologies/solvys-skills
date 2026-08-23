"use client";

import { ArrowUpRight, Check, Stamp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import type { ButtonState } from "@/components/motion/button/stateful";
import { StatefulButton } from "@/components/motion/button/stateful";
import { EASE_OUT, SPRING_BOUNCE } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type NewsletterEditorialProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  issueTitle?: string;
  className?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ARTICLES = [
  {
    section: "Motion",
    title: "Why the best transitions disappear into the task",
    time: "6 min",
  },
  {
    section: "Systems",
    title: "A field guide to interface rhythm",
    time: "4 min",
  },
  { section: "Source", title: "The block we shipped this week", time: "8 min" },
];

export function NewsletterEditorial({
  eyebrow = "The Sunday edition",
  title = "One considered idea for people who build interfaces.",
  description = "A weekly dispatch on motion, composition, and the decisions that make software feel finished.",
  issueTitle = "The invisible work behind a fast interface",
  className,
}: NewsletterEditorialProps) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ButtonState>("idle");
  const done = state === "success";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => setState("success"), 900);
  };

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden border-border/60 border-y lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="flex flex-col justify-between border-border/60 border-b py-10 lg:border-r lg:border-b-0 lg:pr-12"
        >
          <div>
            <p className="font-mono text-[10px] text-[#b42318] uppercase tracking-[0.18em]">
              {eyebrow}
            </p>
            <h2 className="mt-6 max-w-lg text-balance font-serif text-4xl text-foreground leading-[0.98] tracking-[-0.035em] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-muted-foreground leading-7">
              {description}
            </p>
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, y: 12, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                  className="flex items-center gap-4 border border-[#b42318]/35 bg-[#b42318]/[0.06] p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#b42318] text-[#b42318]">
                    <Stamp className="size-5" />
                  </span>
                  <div>
                    <p className="font-serif text-lg text-foreground">
                      Added to the readership.
                    </p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      The next edition will arrive on Sunday.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  className="border-border/60 border-t pt-5"
                >
                  <label
                    htmlFor="editorial-email"
                    className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]"
                  >
                    Join 12,840 readers
                  </label>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      id="editorial-email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (state === "error") setState("idle");
                      }}
                      aria-invalid={state === "error"}
                      placeholder="you@studio.com"
                      className={cn(
                        "h-12 min-w-0 w-full border bg-background px-4 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#b42318] focus-visible:ring-2 focus-visible:ring-[#b42318]/20 sm:w-auto sm:flex-1",
                        state === "error" ? "border-rose-500" : "border-border",
                      )}
                    />
                    <StatefulButton
                      type="submit"
                      state={state === "error" ? "idle" : state}
                      loadingText="Joining"
                      successText="Joined"
                      className="h-12 rounded-none bg-[#b42318] px-5 text-white hover:bg-[#8f1f17]"
                    >
                      Read the next issue
                      <ArrowUpRight className="size-4" />
                    </StatefulButton>
                  </div>
                  {state === "error" ? (
                    <p className="mt-2 text-rose-600 text-xs">
                      Enter a valid email address.
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="relative min-h-[34rem] overflow-hidden bg-[#b42318]/[0.05] p-6 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(-45deg,color-mix(in_oklch,var(--foreground)_3%,transparent)_0,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px,transparent_8px)]" />
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 50, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
            className="relative mx-auto max-w-xl border border-border/70 bg-background p-6 shadow-[16px_18px_0_color-mix(in_oklch,var(--foreground)_4%,transparent)] sm:p-8"
          >
            <header className="flex items-center justify-between gap-4 border-border/60 border-b pb-4">
              <p className="font-serif text-2xl text-foreground tracking-[-0.03em]">
                FIELD / NOTES
              </p>
              <p className="text-right font-mono text-[9px] text-muted-foreground uppercase tracking-[0.12em]">
                Issue 024
                <br />
                Sunday, 08:00
              </p>
            </header>
            <div className="grid gap-6 border-border/60 border-b py-7 sm:grid-cols-[1fr_0.72fr]">
              <div>
                <p className="font-mono text-[9px] text-[#b42318] uppercase tracking-[0.16em]">
                  Cover story
                </p>
                <h3 className="mt-4 text-balance font-serif text-3xl text-foreground leading-[0.95] tracking-[-0.035em]">
                  {issueTitle}
                </h3>
              </div>
              <motion.div
                animate={
                  reduce
                    ? undefined
                    : { backgroundPosition: ["0% 0%", "100% 100%"] }
                }
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "linear",
                }}
                className="min-h-36 border border-border/60 bg-[#b42318]/10 [background-image:linear-gradient(135deg,transparent_42%,color-mix(in_oklch,#b42318_25%,transparent)_42%,color-mix(in_oklch,#b42318_25%,transparent)_48%,transparent_48%)] [background-size:18px_18px]"
              />
            </div>
            <div>
              {ARTICLES.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_OUT,
                    delay: reduce ? 0 : 0.3 + index * 0.08,
                  }}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-4 border-border/60 border-b py-4"
                >
                  <span className="font-mono text-[9px] text-[#b42318]">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.12em]">
                      {article.section}
                    </p>
                    <p className="mt-1 font-serif text-foreground leading-5">
                      {article.title}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground">
                    <Check className="size-3" />
                    {article.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
