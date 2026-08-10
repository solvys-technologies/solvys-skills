"use client";

import { RotateCcw, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/motion/button/base";
import { EASE_IN_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { useEmptyStateStage } from "./use-empty-state-stage";

/* ─────────────────────────────────────────────────────────
 * SEARCH EMPTY STATE STORYBOARD
 *
 *    0ms   message and reset action are available
 *   80ms   result lines draw into place
 *  220ms   lens enters and begins its search
 *  420ms   unmatched lines separate around the lens
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  lines: 80,
  lens: 220,
  empty: 420,
} as const;

const MOTION = {
  scanSeconds: 2.8,
  lineStaggerSeconds: 0.05,
} as const;

const STAGES = Object.values(TIMING);

export type EmptyStateSearchProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyStateSearch({
  title = "No matches",
  description = "Try another phrase or clear your filters.",
  actionLabel = "Reset search",
  onAction,
  className,
}: EmptyStateSearchProps) {
  const { stage, reduce } = useEmptyStateStage(STAGES);

  return (
    <section
      className={cn(
        "mx-auto flex min-h-[390px] w-full max-w-[520px] flex-col items-center justify-center bg-background px-5 py-9 text-center text-foreground",
        className,
      )}
    >
      <div aria-hidden="true" className="relative mb-6 h-36 w-64">
        <div className="absolute inset-x-5 top-6 space-y-5">
          {[80, 58, 72].map((width, index) => (
            <motion.div
              key={width}
              className="h-px origin-left bg-foreground"
              style={{ width: `${width}%` }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: stage >= 1 ? (stage >= 3 ? 0.28 : 0.62) : 0,
                scaleX: stage >= 1 ? 1 : 0,
                x: stage >= 3 ? (index === 1 ? -12 : index === 2 ? 10 : 0) : 0,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      ...SPRING_PANEL,
                      delay: index * MOTION.lineStaggerSeconds,
                    }
              }
            />
          ))}
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-foreground bg-background"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            stage >= 2
              ? reduce
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 1, scale: 1, x: [-42, 42, -42] }
              : { opacity: 0, scale: 0.8, x: 0 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  x: {
                    duration: MOTION.scanSeconds,
                    ease: EASE_IN_OUT,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                  opacity: { duration: 0.15 },
                  scale: SPRING_PANEL,
                }
          }
        >
          <Search className="size-7" strokeWidth={1.6} />
        </motion.div>

        <motion.span
          className="absolute right-2 top-1 grid size-7 place-items-center rounded-full bg-muted text-muted-foreground"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.6,
            rotate: stage >= 3 ? 0 : -20,
          }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
        >
          <X className="size-3.5" />
        </motion.span>
      </div>

      <h2 className="text-balance font-semibold text-xl tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-2 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
        {description}
      </p>
      <Button variant="outline" size="sm" onClick={onAction} className="mt-4">
        <RotateCcw aria-hidden="true" className="size-3.5" />
        {actionLabel}
      </Button>
    </section>
  );
}
