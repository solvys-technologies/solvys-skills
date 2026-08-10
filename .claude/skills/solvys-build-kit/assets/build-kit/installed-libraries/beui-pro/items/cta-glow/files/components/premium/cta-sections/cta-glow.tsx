"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaGlowLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaGlowProps = {
  eyebrow?: string;
  headline?: string[];
  subtext?: string;
  primaryCta?: CtaGlowLink;
  secondaryCta?: CtaGlowLink;
  /** Small reassurance line under the buttons. */
  note?: string;
  /** Override the gradient surface. */
  gradientClassName?: string;
  className?: string;
};

// Ember base behind the liquid field — a vivid warm illustration surface, so
// white copy reads on it in both light and dark themes.
const DEFAULT_GRADIENT = "bg-[#b8391f]";

// Flowing "liquid ether" backdrop: soft diagonal blue bands warped by an
// animated turbulence/displacement filter, so they swirl like silk.
function LiquidEther({ reduce }: { reduce: boolean | null }) {
  const filterId = useId().replace(/:/g, "");

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg className="absolute size-0">
        <title>Liquid background</title>
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.010"
            numOctaves={3}
            seed={11}
            result="noise"
          >
            {reduce ? null : (
              <animate
                attributeName="baseFrequency"
                dur="24s"
                values="0.006 0.010; 0.011 0.006; 0.006 0.010"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.div
        animate={
          reduce
            ? undefined
            : { x: ["-4%", "4%", "-4%"], scale: [1.05, 1.12, 1.05] }
        }
        transition={
          reduce
            ? undefined
            : {
                x: { duration: 22, ease: "easeInOut", repeat: Infinity },
                scale: { duration: 16, ease: "easeInOut", repeat: Infinity },
              }
        }
        style={{ filter: `url(#${filterId}) blur(6px)` }}
        className="absolute -inset-[30%] bg-[repeating-linear-gradient(118deg,#7c2d12_0%,#b8391f_8%,#f97316_16%,#ffbd7a_24%,#b8391f_33%)]"
      />
    </div>
  );
}

export function CtaGlow({
  eyebrow,
  headline = ["Ready to build", "something great?"],
  subtext = "Get instant access to every premium component and block. Copy, paste, ship — no boilerplate.",
  primaryCta = { label: "Get started", href: "#" },
  secondaryCta = { label: "Browse components", href: "#" },
  note = "No credit card required · Cancel anytime",
  gradientClassName,
  className,
}: CtaGlowProps) {
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
    <section className={cn("w-full px-4 py-16 sm:px-8", className)}>
      <div
        className={cn(
          "relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20",
          gradientClassName ?? DEFAULT_GRADIENT,
        )}
      >
        <LiquidEther reduce={reduce} />

        {/* Soft top sheen + inset ring for premium depth over the flat bands. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.22),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-primary-foreground/10 ring-inset"
        />

        <div className="relative flex flex-col items-center">
          {eyebrow ? (
            <motion.span
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-medium text-muted-foreground text-xs backdrop-blur"
            >
              <span className="size-1.5 rounded-full bg-primary-foreground" />
              {eyebrow}
            </motion.span>
          ) : null}

          <TextReveal
            as="h2"
            text={headline}
            split="word"
            blur={10}
            className="max-w-2xl font-medium text-balance font-sans text-4xl text-primary-foreground leading-[1.05] drop-shadow-sm sm:text-5xl"
          />

          <motion.p
            {...rise(0.12)}
            className="mt-5 max-w-xl text-pretty text-primary-foreground/80 text-sm leading-7 sm:text-base"
          >
            {subtext}
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <ButtonLink
              href={primaryCta.href}
              size="lg"
              className="bg-primary-foreground px-7 text-primary shadow-lg hover:bg-primary-foreground/90"
              {...(primaryCta.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </ButtonLink>
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                size="lg"
                variant="secondary"
                className="border-primary-foreground/30 bg-primary-foreground/10 px-6 text-primary-foreground backdrop-blur hover:bg-primary-foreground/20"
                {...(secondaryCta.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </motion.div>

          {note ? (
            <motion.p
              {...rise(0.28)}
              className="mt-6 text-primary-foreground/70 text-xs"
            >
              {note}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
