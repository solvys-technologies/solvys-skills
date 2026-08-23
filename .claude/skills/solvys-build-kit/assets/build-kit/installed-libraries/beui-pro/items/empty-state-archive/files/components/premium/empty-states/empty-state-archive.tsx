"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import { useEmptyStateStage } from "./use-empty-state-stage";

/* ─────────────────────────────────────────────────────────
 * ARCHIVE EMPTY STATE STORYBOARD
 *
 *    0ms   copy and add action are available
 *   80ms   cabinet outline draws into view
 *  260ms   empty drawer slides open
 *  420ms   label and handle settle into place
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  cabinet: 80,
  drawer: 260,
  details: 420,
} as const;

const STAGES = Object.values(TIMING);

export type EmptyStateArchiveProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyStateArchive({
  title = "No data yet",
  description = "Create a record or import your existing data.",
  actionLabel = "Add data",
  onAction,
  className,
}: EmptyStateArchiveProps) {
  const { stage, reduce } = useEmptyStateStage(STAGES);
  const canHover = useHoverCapable();
  const outlineMotion = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: stage >= 1 ? 1 : 0,
      opacity: stage >= 1 ? 1 : 0,
    },
    transition: { duration: reduce ? 0 : 0.4, ease: EASE_OUT },
  } as const;

  return (
    <section
      className={cn(
        "mx-auto flex min-h-[390px] w-full max-w-[520px] flex-col items-center justify-center bg-background px-5 py-9 text-center text-foreground",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="relative mb-5 w-full max-w-[205px] text-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: stage >= 1 ? 1 : 0,
          y: stage >= 1 ? 0 : 12,
        }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
        whileHover={
          reduce || !canHover ? undefined : { y: -3, transition: SPRING_PANEL }
        }
      >
        <svg viewBox="0 0 320 300" className="w-full" role="presentation">
          <motion.g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          >
            <motion.path d="M88 58 174 12l91 54-87 47Z" {...outlineMotion} />
            <motion.path d="m88 58 90 55v153l-90-53Z" {...outlineMotion} />
            <motion.path d="m178 113 87-47v151l-87 49Z" {...outlineMotion} />
            <motion.path d="m95 217-10 6v17l13 8" {...outlineMotion} />
            <motion.path d="m246 227 12-7v16l-12 7Z" {...outlineMotion} />
            <motion.path d="m88 72 90 54 87-47" {...outlineMotion} />
            <motion.path d="m88 136 90 54 87-48" {...outlineMotion} />
          </motion.g>

          <motion.g
            fill="var(--background)"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            initial={{ x: 22, y: -14, opacity: 0 }}
            animate={{
              x: stage >= 2 ? -18 : 22,
              y: stage >= 2 ? 13 : -14,
              opacity: stage >= 2 ? 1 : 0,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
            whileHover={
              reduce || !canHover
                ? undefined
                : { x: -28, y: 19, transition: SPRING_PANEL }
            }
          >
            <path d="m106 139 72 43 69-38-70-42Z" />
            <path d="m106 139 71 43v72l-71-42Z" />
            <path d="m177 182 70-38v70l-70 40Z" />
            <path d="m118 145 59 35 57-31-59-35Z" opacity="0.45" />
          </motion.g>

          <motion.g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
          >
            <path d="m126 175 21 12 14-8" />
            <path d="m118 159 22 13 14-8" />
            <path d="m119 91 23 14 15-8-23-14Z" />
            <path d="m126 118 21 13 14-8" />
          </motion.g>
        </svg>
      </motion.div>

      <div className="max-w-sm">
        <h2 className="text-balance font-semibold text-xl tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
          {description}
        </p>
        <Button onClick={onAction} size="sm" className="mt-4">
          <Plus aria-hidden="true" className="size-3.5" />
          {actionLabel}
        </Button>
      </div>
    </section>
  );
}
