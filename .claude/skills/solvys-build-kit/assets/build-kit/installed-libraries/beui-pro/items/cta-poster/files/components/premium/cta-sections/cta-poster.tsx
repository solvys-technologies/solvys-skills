"use client";

import { ArrowDownRight, ArrowRight, Asterisk } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaPosterLink = { label: string; href: string };

export type CtaPosterProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: CtaPosterLink;
  secondary?: CtaPosterLink;
  className?: string;
};

const RAIL = [
  "MAKE IT USEFUL",
  "KEEP THE DETAILS",
  "SHIP WITH INTENT",
  "BUILD WITH TASTE",
];

const RAIL_ITEMS = [
  ...RAIL.map((label) => ({ id: `primary-${label}`, label, duplicate: false })),
  ...RAIL.map((label) => ({
    id: `duplicate-${label}`,
    label,
    duplicate: true,
  })),
];

export function CtaPoster({
  eyebrow = "beUI Pro / made to be yours",
  title = "Build something people can feel.",
  body = "Premium animated blocks and complete templates. Real source, designed to be changed.",
  primary = { label: "Get lifetime access", href: "/pricing" },
  secondary = { label: "Browse the library", href: "/components" },
  className,
}: CtaPosterProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-16 sm:px-8", className)}>
      <style>{`@keyframes poster-rail { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-border text-foreground"
      >
        <div className="overflow-hidden border-border border-b bg-muted/50 py-3 font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <div
            className="flex w-max"
            style={{
              animation: reduce ? "none" : "poster-rail 28s linear infinite",
            }}
          >
            {RAIL_ITEMS.map((item) => (
              <span
                key={item.id}
                aria-hidden={item.duplicate}
                className="flex items-center gap-5 pr-5"
              >
                {item.label}
                <Asterisk className="size-3 text-foreground/60" />
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_15rem]">
          <div className="relative isolate min-h-[29rem] overflow-hidden p-6 sm:p-10 lg:border-border lg:border-r lg:p-12">
            <motion.div
              aria-hidden
              animate={
                reduce ? undefined : { rotate: [0, 10, 0], scale: [1, 1.06, 1] }
              }
              transition={{
                duration: 14,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-24 -bottom-28 -z-10 size-96 rounded-full border border-border/80 bg-muted/40"
            >
              <div className="absolute inset-8 rounded-full border border-border/70" />
              <div className="absolute inset-20 rounded-full bg-background/50" />
            </motion.div>

            <motion.div
              aria-hidden
              animate={
                reduce ? undefined : { y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }
              }
              transition={{
                duration: 4.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute top-12 right-20 -z-10 size-2 rounded-full bg-foreground/50"
            />

            <p className="relative font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {eyebrow}
            </p>

            <TextReveal
              as="h2"
              text={title}
              split="word"
              blur={8}
              className="relative mt-8 max-w-3xl text-balance font-sans text-5xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            />

            <div className="relative mt-10 grid gap-7 border-border border-t pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-pretty text-muted-foreground text-base leading-7">
                {body}
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink
                  href={secondary.href}
                  variant="outline"
                  className="h-11 rounded-full border-border px-5 text-foreground hover:bg-muted"
                >
                  {secondary.label}
                </ButtonLink>
                <ButtonLink
                  href={primary.href}
                  className="h-11 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                >
                  {primary.label}
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>

          <aside className="flex min-h-56 flex-col justify-between border-border border-t bg-muted/35 p-6 lg:min-h-0 lg:border-t-0">
            <motion.div
              animate={reduce ? undefined : { y: [0, 6, 0], rotate: [0, 4, 0] }}
              transition={{
                duration: 3.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="grid size-12 place-items-center rounded-full border border-border bg-background text-foreground"
            >
              <ArrowDownRight className="size-5" />
            </motion.div>

            <div className="space-y-4 border-border border-t pt-5 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <p className="flex justify-between gap-3">
                <span>Blocks</span>
                <span className="text-foreground">Animated</span>
              </p>
              <p className="flex justify-between gap-3">
                <span>Source</span>
                <span className="text-foreground">Owned</span>
              </p>
              <p className="flex justify-between gap-3">
                <span>Access</span>
                <span className="text-foreground">Lifetime</span>
              </p>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-border border-t bg-muted/25 px-5 py-3 font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>React / Next.js / Tailwind</span>
          <span>Built for the next idea</span>
        </div>
      </motion.div>
    </section>
  );
}
