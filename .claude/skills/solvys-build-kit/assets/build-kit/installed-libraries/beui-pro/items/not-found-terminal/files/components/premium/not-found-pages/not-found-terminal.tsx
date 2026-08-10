"use client";

import { RotateCcw, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { usePageStage } from "./use-page-stage";

/* ─────────────────────────────────────────────────────────
 * TERMINAL PAGE STORYBOARD
 *
 *    0ms   command bar and recovery controls are live
 *   60ms   route trace begins rendering
 *  180ms   failure state and 404 output lock in
 *  320ms   recovery commands become visible
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  trace: 60,
  failure: 180,
  recovery: 320,
} as const;

const STAGES = Object.values(TIMING);
const TRACE = [
  ["01", "resolve host", "ok"],
  ["02", "match route", "miss"],
  ["03", "search fallback", "empty"],
] as const;

export type NotFoundTerminalProps = {
  project?: string;
  homeHref?: string;
  className?: string;
};

export function NotFoundTerminal({
  project = "orbit-web",
  homeHref = "/",
  className,
}: NotFoundTerminalProps) {
  const { stage, reduce } = usePageStage(STAGES);

  return (
    <section
      className={cn(
        "flex min-h-[680px] w-full flex-col bg-background font-mono text-foreground",
        className,
      )}
    >
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-border border-b px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <Terminal aria-hidden="true" className="size-4 text-foreground" />
          <span className="text-xs">{project}</span>
          <span className="text-[10px] text-muted-foreground">
            / production
          </span>
        </div>
        <span className="border border-foreground/20 px-2 py-1 text-[9px] text-foreground uppercase tracking-[0.16em]">
          route failed
        </span>
      </header>

      <div className="grid flex-1 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="flex flex-col justify-between border-border border-b p-5 sm:p-8 lg:border-r lg:border-b-0 lg:p-12">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
              request trace
            </p>
            <div className="mt-7 space-y-0 border-border border-y">
              {TRACE.map(([step, label, status], index) => (
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{
                    opacity: stage >= 1 ? 1 : 0,
                    x: stage >= 1 ? 0 : -12,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.3, ease: EASE_OUT, delay: index * 0.07 }
                  }
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-border border-b py-4 text-xs last:border-b-0"
                >
                  <span className="text-muted-foreground">{step}</span>
                  <span>{label}</span>
                  <span
                    className={
                      status === "ok" ? "text-success" : "text-destructive"
                    }
                  >
                    [{status}]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: stage >= 3 ? 1 : 0,
              y: stage >= 3 ? 0 : 12,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            className="mt-10"
          >
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href={homeHref}
                size="lg"
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/85"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                cd /home
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT }}
          className="relative flex min-h-[360px] flex-col justify-between overflow-hidden p-5 sm:p-8 lg:min-h-0 lg:p-12"
        >
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
              stderr
            </p>
            <p className="mt-6 text-[clamp(6rem,17vw,11rem)] text-foreground leading-[0.75] tracking-[-0.09em]">
              404
            </p>
            <h1 className="mt-8 max-w-md text-balance font-sans font-medium text-3xl leading-tight tracking-[-0.03em] sm:text-5xl">
              Route not found.
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
