"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  BouncyAccordion,
  type BouncyAccordionItem,
} from "@/components/motion/bouncy-accordion";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaFaqLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type CtaFaqProps = {
  headline?: string[];
  subtext?: string;
  cta?: CtaFaqLink;
  items?: CtaFaqItem[];
  /** Override the vibrant gradient surface. */
  gradientClassName?: string;
  className?: string;
};

const DEFAULT_ITEMS: CtaFaqItem[] = [
  {
    id: "license",
    question: "What do I get with a license?",
    answer:
      "Full source access to every premium beUI component and block, plus new drops every month — yours to copy, paste, and customize.",
  },
  {
    id: "client-projects",
    question: "Can I use it in client projects?",
    answer:
      "Yes. One license covers unlimited personal and client projects — no per-seat or per-site fees.",
  },
  {
    id: "stack",
    question: "Does it work with my stack?",
    answer:
      "beUI is built for React, Next.js, and Tailwind CSS. Drop components straight into your app with no extra setup.",
  },
  {
    id: "install",
    question: "How do I install components?",
    answer:
      "Add them via the shadcn CLI from your private beUI Pro registry, or copy the source directly from each component page.",
  },
  {
    id: "free-tier",
    question: "Is there a free version?",
    answer:
      "The public beUI library is free and open. Premium unlocks the motion-heavy components, blocks, and templates.",
  },
  {
    id: "updates",
    question: "Do you ship new components?",
    answer:
      "New premium components and blocks land every month, included in your license at no extra cost.",
  },
];

// Fixed, soft sage radial — an illustration surface (deep green center fading to
// mint edges), so dark copy reads on it in both light and dark themes.
const DEFAULT_GRADIENT =
  "bg-[radial-gradient(55%_42%_at_50%_50%,#4f8268,#79a98b_45%,#cfe3d2_82%)]";

export function CtaFaq({
  headline = ["Ready to build", "with beUI?"],
  subtext = "Premium motion components and blocks, copy-paste ready.",
  cta = { label: "Get Started Today", href: "#" },
  items = DEFAULT_ITEMS,
  gradientClassName,
  className,
}: CtaFaqProps) {
  const reduce = useReducedMotion();

  const accordionItems: BouncyAccordionItem[] = items.map((item) => ({
    id: item.id,
    title: item.question,
    description: item.answer,
  }));

  return (
    <section className={cn("w-full px-4 py-16 sm:px-8", className)}>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-2">
        {/* Gradient CTA card. */}
        <div
          className={cn(
            "relative flex min-h-[22rem] items-center overflow-hidden rounded-[2rem] p-8 sm:min-h-[26rem] sm:p-12",
            gradientClassName ?? DEFAULT_GRADIENT,
          )}
        >
          {/* Slow drifting highlight for a living surface. */}
          {reduce ? null : (
            <motion.div
              aria-hidden
              initial={{ x: "-10%", y: "-6%" }}
              animate={{ x: "10%", y: "6%" }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="pointer-events-none absolute -inset-16 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(255,255,255,0.35),transparent_70%)] blur-2xl"
            />
          )}

          <div className="relative">
            <TextReveal
              as="h2"
              text={headline}
              split="word"
              blur={10}
              className="max-w-md font-medium font-sans text-4xl text-foreground leading-[1.05] sm:text-5xl"
            />

            <motion.p
              initial={
                reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }
              }
              whileInView={
                reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduce
                  ? undefined
                  : { duration: 0.6, ease: EASE_OUT, delay: 0.15 }
              }
              className="mt-4 max-w-sm text-pretty text-foreground/70 text-sm leading-7 sm:text-base"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                reduce
                  ? undefined
                  : { duration: 0.6, ease: EASE_OUT, delay: 0.24 }
              }
              className="mt-8"
            >
              <ButtonLink
                href={cta.href}
                size="lg"
                className="bg-primary px-7 text-primary-foreground shadow-lg hover:bg-primary/90"
                {...(cta.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {cta.label}
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        {/* FAQ accordion. */}
        <BouncyAccordion items={accordionItems} defaultValue={items[0]?.id} />
      </div>
    </section>
  );
}
