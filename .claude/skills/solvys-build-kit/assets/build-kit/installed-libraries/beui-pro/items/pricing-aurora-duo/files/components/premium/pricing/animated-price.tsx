"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AnimatedPriceProps = {
  /** Numeric amount to display. The number rolls when this changes. */
  amount: number;
  currency?: string;
  /** Trailing copy rendered after the number, e.g. "/mo". */
  suffix?: string;
  className?: string;
};

/**
 * Billing-aware price. The currency and suffix stay put while the number itself
 * rolls vertically on change — a single clipped element, so there is no per-digit
 * width drift or baseline wobble.
 */
export function AnimatedPrice({
  amount,
  currency = "$",
  suffix,
  className,
}: AnimatedPriceProps) {
  const reduce = useReducedMotion();
  const formatted = new Intl.NumberFormat("en-US").format(
    Math.max(0, Math.round(amount)),
  );

  return (
    <span
      className={cn(
        "inline-flex items-end font-sans text-foreground leading-none tabular-nums",
        className,
      )}
    >
      <span className="self-start pt-[0.12em] text-[0.5em] text-muted-foreground">
        {currency}
      </span>
      <span className="relative inline-flex h-[1.24em] items-center overflow-hidden px-[0.06em] align-bottom">
        {/* Reserve width with an invisible copy so the clipped roller can be
            absolutely positioned without collapsing the layout. */}
        <span aria-hidden className="invisible">
          {formatted}
        </span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={formatted}
            initial={
              reduce ? false : { y: "55%", opacity: 0, filter: "blur(6px)" }
            }
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { y: "-55%", opacity: 0, filter: "blur(6px)" }
            }
            transition={
              reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
            }
            className="absolute inset-y-0 right-[0.06em] left-[0.06em] flex items-center leading-[1.1]"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </span>
      {suffix ? (
        <span className="self-end pb-[0.72em] pl-1 font-sans text-[0.32em] text-muted-foreground tracking-normal">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
