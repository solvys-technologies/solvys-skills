"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { usePageStage } from "./use-page-stage";

/* ─────────────────────────────────────────────────────────
 * ELASTIC TYPE STORYBOARD
 *
 *    0ms   navigation and recovery action are available
 *   70ms   numerals spring upward into the composition
 *  230ms   compact error label resolves
 *  hover   numerals compress and rebound independently
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  numerals: 70,
  numeralStagger: 55,
  label: 230,
} as const;

const STAGES = [TIMING.numerals, TIMING.label];
const DIGITS = [
  { id: "first-four", value: "4", hoverY: 14, hoverScaleY: 0.82 },
  { id: "zero", value: "0", hoverY: -12, hoverScaleY: 1.12 },
  { id: "last-four", value: "4", hoverY: 14, hoverScaleY: 0.82 },
] as const;

export type NotFoundElasticProps = {
  homeHref?: string;
  className?: string;
};

export function NotFoundElastic({
  homeHref = "/",
  className,
}: NotFoundElasticProps) {
  const { stage, reduce } = usePageStage(STAGES);

  return (
    <section
      className={cn(
        "flex min-h-[680px] w-full flex-col overflow-hidden bg-primary text-primary-foreground [container-type:inline-size]",
        className,
      )}
    >
      <header className="flex min-h-20 items-center justify-between px-5 sm:px-8">
        <a
          href={homeHref}
          className="font-medium text-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          Index
        </a>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">
          404
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <div className="group flex items-end justify-center overflow-hidden py-[7cqw]">
          {DIGITS.map((digit, index) => (
            <motion.span
              key={digit.id}
              initial={reduce ? false : { opacity: 0, y: "24%", scaleY: 0.82 }}
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                y: stage >= 1 ? 0 : "24%",
                scaleY: stage >= 1 ? 1 : 0.82,
              }}
              whileHover={
                reduce
                  ? undefined
                  : { y: digit.hoverY, scaleY: digit.hoverScaleY }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      ...SPRING_PANEL,
                      delay: (index * TIMING.numeralStagger) / 1000,
                    }
              }
              className="block origin-bottom font-semibold text-[35cqw] leading-[0.68] tracking-[-0.12em]"
            >
              {digit.value}
            </motion.span>
          ))}
        </div>

        <motion.h1
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="font-medium text-lg tracking-[-0.03em]"
        >
          Out of bounds.
        </motion.h1>
        <ButtonLink
          href={homeHref}
          size="lg"
          className="mt-5 bg-primary-foreground text-primary hover:bg-primary-foreground/85"
        >
          Back to index
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
