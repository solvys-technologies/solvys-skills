"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type FooterCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterCtaProps = {
  /** Small pill above the headline. */
  eyebrow?: string;
  /** Headline, one entry per line. */
  headline?: string[];
  subtext?: string;
  primaryCta?: FooterCtaLink;
  secondaryCta?: FooterCtaLink;
  /** Brand mark shown in the bottom bar. */
  brand?: string;
  /** Giant drifting wordmark behind the content. */
  wordmark?: string;
  links?: FooterCtaLink[];
  legal?: string;
  className?: string;
};

const DEFAULT_LINKS: FooterCtaLink[] = [
  { label: "Components", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Registry", href: "#" },
];

export function FooterCta({
  eyebrow = "Start building",
  headline = ["Build something", "worth shipping."],
  subtext = "Premium motion components and blocks, copy-paste ready. Start free, upgrade when you need the source.",
  primaryCta = { label: "Get started", href: "#" },
  secondaryCta = { label: "Browse components", href: "#" },
  brand = "beUI Pro",
  wordmark = "beUI Pro",
  links = DEFAULT_LINKS,
  legal = "© 2026 beUI Pro.",
  className,
}: FooterCtaProps) {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <footer
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      {/* Accent glow from the top center. Accent stays a highlight, low alpha. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(60%_55%_at_50%_0%,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_70%)]"
      />

      {/* Drifting wordmark watermark, faded toward the top so it emerges from the
          bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center overflow-hidden [mask-image:linear-gradient(to_top,black_10%,transparent)]"
      >
        <motion.span
          initial={reduce ? false : { x: "-2%" }}
          animate={reduce ? undefined : { x: "2%" }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 16,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }
          }
          className="translate-y-[30%] whitespace-nowrap font-sans text-[22vw] text-foreground/[0.05] leading-none"
        >
          {wordmark}
        </motion.span>
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-24 pb-10 sm:px-8 sm:pt-32">
        <div className="flex flex-col items-center text-center">
          {eyebrow ? (
            <motion.span
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-medium text-muted-foreground text-xs"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </motion.span>
          ) : null}

          <TextReveal
            as="h2"
            text={headline}
            split="word"
            blur={10}
            className="mt-6 max-w-3xl text-balance font-serif text-4xl text-foreground leading-[1.05] sm:text-6xl"
          />

          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-xl text-pretty text-muted-foreground text-sm leading-7 sm:text-base"
          >
            {subtext}
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink
              href={primaryCta.href}
              size="lg"
              className="px-7"
              {...(primaryCta.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {primaryCta.label}
            </ButtonLink>
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                size="lg"
                variant="secondary"
                className="px-6"
                {...(secondaryCta.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {secondaryCta.label}
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            ) : null}
          </motion.div>
        </div>

        {/* Bottom bar. */}
        <div className="mt-28 flex flex-col items-center gap-5 sm:mt-40 sm:flex-row sm:justify-between">
          <span className="order-2 font-sans text-foreground text-sm sm:order-1">
            {brand}
          </span>
          <nav className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:order-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="text-foreground text-sm opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:underline focus-visible:underline-offset-4 focus-visible:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="order-3 text-muted-foreground text-xs">{legal}</p>
        </div>
      </div>
    </footer>
  );
}
