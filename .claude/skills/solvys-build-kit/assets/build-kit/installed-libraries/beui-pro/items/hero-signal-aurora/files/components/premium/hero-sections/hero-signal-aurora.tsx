"use client";

import { ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg";
import { EASE_OUT } from "@/lib/ease";
import { useDarkTheme } from "@/lib/hooks/use-dark-theme";
import { cn } from "@/lib/utils";
import { SignalAurora } from "./signal-aurora";
import { SignalLogoMarquee } from "./signal-logo-marquee";

export type HeroSignalAuroraProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

const NAV_ITEMS = ["Platform", "Signals", "Integrations", "Pricing"];
export function HeroSignalAurora({
  eyebrow = "Product intelligence, without the guesswork",
  title = "Turn customer signals into your next clear move",
  description = "Bring product usage, revenue, support, and feedback into one calm view — then see what deserves your attention next.",
  ctaLabel = "Find your next move",
  ctaHref = "/",
  className,
}: HeroSignalAuroraProps) {
  const night = useDarkTheme();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.65, ease: EASE_OUT, delay },
        };

  return (
    <section
      className={cn(
        "relative isolate min-h-[760px] w-full overflow-hidden transition-colors duration-500",
        night ? "text-white" : "text-[#171717]",
        className,
      )}
    >
      <SignalAurora night={night} />

      <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <header className="flex h-20 items-center justify-between sm:h-24">
          <a
            href="/"
            className="flex min-h-10 items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
          >
            <span
              className="relative grid size-7 place-items-center"
              aria-hidden
            >
              <span className="absolute h-7 w-3 rounded-[50%] border border-current" />
              <span className="absolute h-7 w-3 rotate-60 rounded-[50%] border border-current" />
              <span className="absolute h-7 w-3 -rotate-60 rounded-[50%] border border-current" />
            </span>
            <span
              className="text-2xl tracking-[-0.04em]"
              style={{ fontFamily: '"Iowan Old Style", Baskerville, serif' }}
            >
              Luma
            </span>
          </a>

          <nav className="hidden lg:block" aria-label="Main navigation">
            <SharedLayoutBg
              className="w-auto flex-row items-center gap-1"
              inset={0}
              pillClassName={cn(
                "rounded-full",
                night ? "bg-white/9" : "bg-white/55",
              )}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                    night
                      ? "text-white/58 hover:text-white"
                      : "text-black/55 hover:text-black",
                  )}
                >
                  {item}
                </a>
              ))}
            </SharedLayoutBg>
          </nav>

          <div className="flex items-center">
            <ButtonLink
              href="/"
              size="md"
              variant="ghost"
              className={cn(
                "hidden sm:inline-flex",
                night
                  ? "bg-white/8 text-white hover:bg-white/14"
                  : "bg-white/60 text-black hover:bg-white/82",
              )}
            >
              Sign in
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center pb-28 text-center sm:pb-24">
          <motion.div
            {...rise(0.02)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-medium text-xs",
              night ? "bg-white/8 text-white/76" : "bg-black/6 text-black/64",
            )}
          >
            <Zap className="size-3.5 fill-[#ef78a5] text-[#ef78a5]" />
            {eyebrow}
          </motion.div>

          <motion.h1
            {...rise(0.09)}
            className="mt-7 max-w-4xl text-balance text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.96] tracking-[-0.052em]"
            style={{ fontFamily: '"Iowan Old Style", Baskerville, serif' }}
          >
            {title}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className={cn(
              "mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg",
              night ? "text-white/62" : "text-black/58",
            )}
          >
            {description}
          </motion.p>

          <motion.div {...rise(0.23)} className="mt-8">
            <ButtonLink
              href={ctaHref}
              size="lg"
              className={cn(
                "min-w-52",
                night
                  ? "bg-white/14 text-white hover:bg-white/20"
                  : "bg-black text-white hover:bg-black/85",
              )}
            >
              {ctaLabel}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div {...rise(0.32)} className="pb-8 sm:pb-10">
          <SignalLogoMarquee night={night} />
        </motion.div>
      </div>
    </section>
  );
}
