"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaShadePanelLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaShadePanelProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: CtaShadePanelLink;
  className?: string;
};

const BANDS = [
  "bg-[radial-gradient(circle_at_20%_46%,rgba(72,99,188,0.3),rgba(15,23,58,0.12)_72%)]",
  "bg-[linear-gradient(180deg,rgba(22,34,80,0.42),rgba(7,12,34,0.3))]",
  "bg-[radial-gradient(circle_at_50%_42%,rgba(52,76,154,0.28),rgba(12,19,49,0.22)_76%)]",
  "bg-[linear-gradient(180deg,rgba(13,22,57,0.32),rgba(7,11,31,0.38))]",
  "bg-[radial-gradient(circle_at_45%_46%,rgba(62,88,172,0.3),rgba(12,19,48,0.2)_74%)]",
  "bg-[linear-gradient(180deg,rgba(15,24,62,0.42),rgba(7,11,31,0.32))]",
];

function externalProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

function ShadeBands({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid grid-cols-6"
    >
      {BANDS.map((band, index) => (
        <motion.div
          key={band}
          initial={reduce ? false : { opacity: 0, scaleY: 1.05 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: index * 0.06,
            ease: EASE_OUT,
          }}
          className={cn("origin-bottom", band)}
        />
      ))}
    </div>
  );
}

export function CtaShadePanel({
  eyebrow = "Built for the decisive moment",
  title = "Turn attention into a clear next step.",
  description = "A focused close for launches, waitlists, and products that are ready to move.",
  cta = { label: "Start the next chapter", href: "#" },
  className,
}: CtaShadePanelProps) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full px-4 py-16 sm:px-8", className)}>
      <div className="dark relative mx-auto min-h-[32rem] w-full max-w-6xl overflow-hidden rounded-2xl bg-[#10183c]">
        <ShadeBands reduce={reduce} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_38%,rgba(83,113,211,0.22),transparent_34%),linear-gradient(90deg,rgba(5,9,29,0.04),rgba(5,9,29,0.22))]"
        />

        <div className="relative flex min-h-[32rem] items-center px-7 py-20 sm:px-12 lg:px-20">
          <div className="max-w-xl text-left">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="font-medium text-muted-foreground text-xs uppercase tracking-widest"
            >
              {eyebrow}
            </motion.p>

            <motion.h2
              initial={
                reduce ? false : { opacity: 0, y: 18, filter: "blur(7px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
              className="mt-6 max-w-lg text-pretty text-4xl font-medium text-foreground leading-tight tracking-tight sm:text-balance"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.16 }}
              className="mt-5 max-w-md text-pretty text-base text-muted-foreground leading-7"
            >
              {description}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.24 }}
              className="mt-8"
            >
              <ButtonLink
                href={cta.href}
                size="lg"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                {...externalProps(cta.external)}
              >
                {cta.label}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
