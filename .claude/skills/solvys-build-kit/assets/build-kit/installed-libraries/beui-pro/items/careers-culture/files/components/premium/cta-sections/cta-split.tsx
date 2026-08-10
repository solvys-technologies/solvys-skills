"use client";

import { ArrowRight, Check, ChevronRight, Copy } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { GlowButtonLink } from "@/components/motion/glow-button";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaSplitLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaSplitProps = {
  headline?: string[];
  subtext?: string;
  /** Copyable install command shown as a terminal chip under the copy. */
  installCommand?: string;
  primaryCta?: CtaSplitLink;
  secondaryCta?: CtaSplitLink;
  /** Muted text link under the stacked buttons. */
  tertiaryCta?: CtaSplitLink;
  className?: string;
};

function externalProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer noopener" } : {};
}

function InstallChip({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label={copied ? "Copied" : "Copy install command"}
      className="group inline-flex items-center gap-3 rounded-lg border border-border bg-background py-2.5 pr-3 pl-4 font-mono text-foreground text-sm transition-colors hover:border-border/70 hover:bg-muted"
    >
      <span>
        <span className="text-muted-foreground">$</span> {command}
      </span>
      {copied ? (
        <Check className="size-3.5 text-success" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
      )}
    </button>
  );
}

export function CtaSplit({
  headline = ["Build the interface", "your product deserves."],
  subtext = "Premium, animated components and full page templates that drop straight into your stack. Own the source, ship the polish.",
  installCommand = "npx shadcn add @beui-pro/hero",
  primaryCta = { label: "Browse components", href: "#" },
  secondaryCta = { label: "Star on GitHub", href: "#" },
  tertiaryCta = { label: "Read the docs", href: "#" },
  className,
}: CtaSplitProps) {
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
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border px-6 py-14 sm:px-12 sm:py-16">
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Copy + install command. */}
          <div className="flex flex-col items-start text-left">
            <TextReveal
              as="h2"
              text={headline}
              split="word"
              blur={10}
              className="max-w-xl font-medium  text-balance font-sans text-4xl text-foreground leading-[1.05] sm:text-5xl"
            />

            <motion.p
              {...rise(0.12)}
              className="mt-5 max-w-md text-pretty text-muted-foreground text-sm leading-7 sm:text-base"
            >
              {subtext}
            </motion.p>

            {installCommand ? (
              <motion.div {...rise(0.2)} className="mt-7">
                <InstallChip command={installCommand} />
              </motion.div>
            ) : null}
          </div>

          {/* Stacked actions. */}
          <motion.div
            {...rise(0.28)}
            className="flex w-full flex-col items-stretch gap-3 lg:w-64"
          >
            <GlowButtonLink
              href={primaryCta.href}
              size="lg"
              wrapperClassName="w-full"
              mode="flow"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              {...externalProps(primaryCta.external)}
            >
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </GlowButtonLink>
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                size="lg"
                variant="secondary"
                className="w-full border-border bg-background text-foreground hover:bg-muted"
                {...externalProps(secondaryCta.external)}
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
            {tertiaryCta ? (
              <a
                href={tertiaryCta.href}
                {...externalProps(tertiaryCta.external)}
                className="group mt-1 inline-flex items-center justify-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {tertiaryCta.label}
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
