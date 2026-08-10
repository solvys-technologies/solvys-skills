"use client";

import { motion, useReducedMotion } from "motion/react";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useDarkTheme } from "@/lib/hooks/use-dark-theme";
import { cn } from "@/lib/utils";
import { MarketplaceComposer } from "./marketplace-composer";
import { MarketplaceGradientFloor } from "./marketplace-gradient-floor";
import { MarketplaceNav } from "./marketplace-nav";

export type HeroAiMarketplaceProps = {
  eyebrow?: string;
  title?: readonly [string, string];
  description?: string;
  className?: string;
};

export function HeroAiMarketplace({
  eyebrow = "A marketplace of AI specialists",
  title = ["Bring the right AI", "to every piece of work."],
  description = "Describe the outcome once. The workspace finds the right specialist, gathers the context, and moves the work forward.",
  className,
}: HeroAiMarketplaceProps) {
  const dark = useDarkTheme();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 12, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <section
      className={cn(
        "relative isolate h-[var(--preview-viewport-height,100svh)] w-full overflow-clip transition-colors duration-500",
        dark ? "bg-[#050714] text-white" : "bg-[#f5f7fb] text-[#101218]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-8%] h-[58%] sm:h-[64%]">
        <MarketplaceGradientFloor dark={dark} />
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark
            ? "bg-gradient-to-b from-[#050714] via-[#050714]/72 to-transparent"
            : "bg-gradient-to-b from-[#f5f7fb] via-[#f5f7fb]/68 to-transparent",
        )}
      />

      <MarketplaceNav dark={dark} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-32 sm:pb-20">
        <motion.p
          {...rise(0.02)}
          className={cn("text-sm", dark ? "text-white/58" : "text-black/52")}
        >
          {eyebrow}
        </motion.p>

        <TextReveal
          as="h1"
          text={title}
          delay={0.08}
          stagger={0.055}
          blur={8}
          yOffset="28%"
          className="mt-6 max-w-4xl text-balance font-medium text-[clamp(3rem,7vw,5.75rem)] leading-[0.94] tracking-[-0.065em]"
        />

        <motion.p
          {...rise(0.18)}
          className={cn(
            "mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg",
            dark ? "text-white/56" : "text-black/52",
          )}
        >
          {description}
        </motion.p>

        <motion.div {...rise(0.28)} className="mt-8 w-full max-w-3xl">
          <MarketplaceComposer dark={dark} />
        </motion.div>
      </div>
    </section>
  );
}
