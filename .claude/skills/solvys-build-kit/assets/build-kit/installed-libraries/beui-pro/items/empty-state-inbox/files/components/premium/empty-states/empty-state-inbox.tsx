"use client";

import { PenLine } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { useEmptyStateStage } from "./use-empty-state-stage";

/* ─────────────────────────────────────────────────────────
 * INBOX EMPTY STATE STORYBOARD
 *
 *    0ms   copy and compose action are available
 *   80ms   closed mail envelope settles into view
 *  220ms   back flap folds open
 *  380ms   final message rises from the envelope
 *  560ms   completion mark appears on the message
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  envelope: 80,
  open: 220,
  message: 380,
  complete: 560,
} as const;

const STAGES = Object.values(TIMING);

export type EmptyStateInboxProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyStateInbox({
  title = "Inbox zero",
  description = "You are caught up. New conversations will appear here.",
  actionLabel = "Compose",
  onAction,
  className,
}: EmptyStateInboxProps) {
  const { stage, reduce } = useEmptyStateStage(STAGES);

  return (
    <section
      className={cn(
        "mx-auto flex min-h-[410px] w-full max-w-[520px] flex-col items-center justify-center bg-background px-5 py-9 text-center text-foreground",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="relative mb-6 h-[165px] w-[260px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: stage >= 1 ? 1 : 0,
          y: stage >= 1 ? 0 : 12,
        }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
      >
        <svg
          viewBox="0 0 260 165"
          className="absolute inset-0 size-full overflow-visible"
          role="presentation"
        >
          <motion.path
            d="M18 67 130 18l112 49-112 66Z"
            fill="var(--muted)"
            stroke="var(--border)"
            strokeWidth="1.4"
            initial={{ opacity: 0, scaleY: 0.55 }}
            animate={{
              opacity: stage >= 2 ? 1 : 0,
              scaleY: stage >= 2 ? 1 : 0.55,
            }}
            style={{ transformOrigin: "130px 67px" }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
          />

          <motion.g
            initial={{ opacity: 0, y: 34 }}
            animate={{
              opacity: stage >= 3 ? 1 : 0,
              y: stage >= 3 ? -10 : 34,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
          >
            <rect
              x="54"
              y="45"
              width="152"
              height="92"
              rx="9"
              fill="var(--background)"
              stroke="var(--foreground)"
              strokeWidth="1.4"
            />
            <path
              d="M75 72h77M75 88h108M75 104h64"
              stroke="var(--foreground)"
              strokeLinecap="round"
              strokeOpacity="0.48"
              strokeWidth="1.6"
            />
            <motion.circle
              cx="181"
              cy="68"
              r="13"
              fill="var(--primary)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: stage >= 4 ? 1 : 0,
                scale: stage >= 4 ? 1 : 0.6,
              }}
              style={{ transformOrigin: "181px 68px" }}
              transition={reduce ? { duration: 0 } : SPRING_PANEL}
            />
            <motion.path
              d="m175 68 4 4 8-9"
              fill="none"
              stroke="var(--primary-foreground)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: stage >= 4 ? 1 : 0,
                opacity: stage >= 4 ? 1 : 0,
              }}
              transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
            />
          </motion.g>

          <motion.path
            d="M18 67 130 132 242 67v82H18Z"
            fill="var(--muted)"
            stroke="var(--border)"
            strokeLinejoin="round"
            strokeWidth="1.4"
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              y: stage >= 1 ? 0 : 8,
            }}
            transition={reduce ? { duration: 0 } : SPRING_PANEL}
          />
          <path
            d="m18 149 82-58M242 149l-82-58"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
        </svg>
      </motion.div>

      <h2 className="text-balance font-semibold text-xl tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-2 max-w-xs text-pretty text-muted-foreground text-sm leading-6">
        {description}
      </p>
      <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
        <PenLine aria-hidden="true" className="size-3.5" />
        {actionLabel}
      </Button>
    </section>
  );
}
