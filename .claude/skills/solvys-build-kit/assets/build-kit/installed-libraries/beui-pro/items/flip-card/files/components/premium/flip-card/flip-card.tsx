"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useRef, useState } from "react";
import { EASE_IN_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  flipped?: boolean;
  defaultFlipped?: boolean;
  onFlippedChange?: (flipped: boolean) => void;
  frontLabel?: string;
  backLabel?: string;
  className?: string;
  faceClassName?: string;
  frontClassName?: string;
  backClassName?: string;
};

const FLIP_TRANSITION = {
  duration: 0.48,
  ease: EASE_IN_OUT,
} as const;

export function FlipCard({
  front,
  back,
  flipped,
  defaultFlipped = false,
  onFlippedChange,
  frontLabel = "Show the back of this card",
  backLabel = "Show the front of this card",
  className,
  faceClassName,
  frontClassName,
  backClassName,
}: FlipCardProps) {
  const reduceMotion = useReducedMotion();
  const [internalFlipped, setInternalFlipped] = useState(defaultFlipped);
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const isControlled = flipped !== undefined;
  const isFlipped = isControlled ? flipped : internalFlipped;

  const handleFlip = () => {
    const next = !isFlipped;
    if (!isControlled) setInternalFlipped(next);
    onFlippedChange?.(next);
    window.requestAnimationFrame(() => {
      (next ? backButtonRef : frontButtonRef).current?.focus();
    });
  };

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full [perspective:1400px]",
        className,
      )}
      data-flipped={isFlipped ? "true" : "false"}
    >
      <motion.div
        initial={false}
        animate={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        transition={reduceMotion ? { duration: 0 } : FLIP_TRANSITION}
        className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
      >
        <div
          aria-hidden={isFlipped}
          inert={isFlipped}
          className={cn(
            "absolute inset-0 overflow-hidden border border-border bg-card [backface-visibility:hidden] [transform:translateZ(1px)]",
            faceClassName,
            frontClassName,
          )}
        >
          <button
            ref={frontButtonRef}
            type="button"
            aria-label={frontLabel}
            onClick={handleFlip}
            className="absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          />
          <div className="pointer-events-none relative z-20 h-full w-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
            {front}
          </div>
        </div>

        <div
          aria-hidden={!isFlipped}
          inert={!isFlipped}
          className={cn(
            "absolute inset-0 overflow-hidden border border-border bg-card [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]",
            faceClassName,
            backClassName,
          )}
        >
          <button
            ref={backButtonRef}
            type="button"
            aria-label={backLabel}
            onClick={handleFlip}
            className="absolute inset-0 z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          />
          <div className="pointer-events-none relative z-20 h-full w-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
            {back}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
