"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { usePageStage } from "./use-page-stage";

/* ─────────────────────────────────────────────────────────
 * FLIP PANELS STORYBOARD
 *
 *    0ms   navigation and recovery action are available
 *   80ms   three numeral panels flip into place
 *  260ms   short error label resolves below the panels
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  panels: 80,
  panelStagger: 60,
  label: 260,
} as const;

const STAGES = [TIMING.panels, TIMING.label];
const DIGITS = [
  { id: "first-four", value: "4" },
  { id: "zero", value: "0" },
  { id: "last-four", value: "4" },
] as const;

export type NotFoundFlipPanelsProps = {
  homeHref?: string;
  className?: string;
};

export function NotFoundFlipPanels({
  homeHref = "/",
  className,
}: NotFoundFlipPanelsProps) {
  const { stage, reduce } = usePageStage(STAGES);

  return (
    <section
      className={cn(
        "flex min-h-[680px] w-full flex-col overflow-hidden bg-background text-foreground [container-type:inline-size]",
        className,
      )}
    >
      <header className="flex min-h-20 items-center justify-between px-5 sm:px-8">
        <a
          href={homeHref}
          className="font-medium text-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          Home
        </a>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Page missing
        </span>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <div className="flex w-full max-w-5xl justify-center gap-[1.4cqw] [perspective:1200px]">
          {DIGITS.map((digit, index) => (
            <motion.div
              key={digit.id}
              initial={
                reduce ? false : { opacity: 0, transform: "rotateX(-82deg)" }
              }
              animate={{
                opacity: stage >= 1 ? 1 : 0,
                transform: stage >= 1 ? "rotateX(0deg)" : "rotateX(-82deg)",
              }}
              whileHover={reduce ? undefined : { transform: "rotateX(-8deg)" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      ...SPRING_PANEL,
                      delay: (index * TIMING.panelStagger) / 1000,
                    }
              }
              className="grid aspect-[0.72] w-[25cqw] max-w-64 place-items-center border border-border bg-secondary [transform-style:preserve-3d]"
            >
              <span className="font-semibold text-[25cqw] leading-none tracking-[-0.09em]">
                {digit.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 8 }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
          className="mt-7 font-medium text-lg tracking-[-0.03em]"
        >
          Nothing on this side.
        </motion.h1>
        <ButtonLink href={homeHref} size="lg" className="mt-5">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Go home
        </ButtonLink>
      </div>
    </section>
  );
}
