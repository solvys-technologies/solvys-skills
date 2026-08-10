"use client";

import {
  motion,
  type TargetAndTransition,
  type Transition,
  useReducedMotion,
} from "motion/react";
import { forwardRef } from "react";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";
import {
  Button,
  ButtonLink,
  type ButtonLinkProps,
  type ButtonProps,
} from "./button/base";

/**
 * breathe — the blurred aurora halo pulses in scale + opacity, hugging the
 * control (reads as an emitting glow). flow — the colors drift via hue-rotate
 * while the halo stays put. static — a fixed gradient halo, no animation.
 */
export type GlowMode = "breathe" | "flow" | "static";

export type GlowBlur = "soft" | "medium" | "strong";

const BLUR_PX: Record<GlowBlur, number> = {
  soft: 10,
  medium: 16,
  strong: 24,
};

// Warm-to-cool aurora, deliberately free of purple/violet/indigo.
const DEFAULT_COLORS = ["#f59e0b", "#fb7185", "#22d3ee", "#34d399"];

export interface GlowConfig {
  mode?: GlowMode;
  colors?: string[];
  blur?: GlowBlur;
  /** Seconds per animation cycle. */
  duration?: number;
  /** How far the halo bleeds past the control edges, in px. */
  spread?: number;
}

function Glow({
  mode = "breathe",
  colors = DEFAULT_COLORS,
  blur = "strong",
  duration = 4.5,
  spread = 8,
}: GlowConfig) {
  const reduce = useReducedMotion();

  // A soft multi-color halo shaped like the control; the opaque button on top
  // masks its center so only the bleed around the edges reads as glow.
  const background = `conic-gradient(from 90deg at 50% 50%, ${[...colors, colors[0]].join(", ")})`;
  const blurPx = BLUR_PX[blur];
  const still = reduce || mode === "static";

  const animate: TargetAndTransition | undefined = still
    ? undefined
    : mode === "flow"
      ? {
          filter: [
            `blur(${blurPx}px) hue-rotate(0deg)`,
            `blur(${blurPx}px) hue-rotate(360deg)`,
          ],
        }
      : { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] };

  const transition: Transition | undefined = still
    ? undefined
    : mode === "flow"
      ? { duration, ease: "linear", repeat: Number.POSITIVE_INFINITY }
      : {
          duration,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        };

  return (
    <motion.span
      aria-hidden
      animate={animate}
      transition={transition}
      style={{
        background,
        inset: -spread,
        filter: `blur(${blurPx}px)`,
        opacity: 0.7,
      }}
      className="pointer-events-none absolute rounded-full transform-gpu"
    />
  );
}

export interface GlowButtonProps extends ButtonProps, GlowConfig {
  /** Extra classes for the wrapper that holds the glow + button. */
  wrapperClassName?: string;
}

export interface GlowButtonLinkProps extends ButtonLinkProps, GlowConfig {
  wrapperClassName?: string;
}

function splitGlowProps<T extends GlowConfig>(props: T) {
  const { mode, colors, blur, duration, spread, ...rest } = props;
  return { glow: { mode, colors, blur, duration, spread }, rest };
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  function GlowButton(
    { wrapperClassName, className, disabled, ...props },
    ref,
  ) {
    const { glow, rest } = splitGlowProps(props);

    return (
      <motion.span
        initial="rest"
        whileHover="hover"
        transition={SPRING_PRESS}
        className={cn(
          "relative inline-flex isolate",
          disabled && "pointer-events-none opacity-50",
          wrapperClassName,
        )}
      >
        <motion.span
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={SPRING_PRESS}
        >
          <Glow {...glow} />
        </motion.span>
        <Button
          ref={ref}
          disabled={disabled}
          className={cn("relative z-10", className)}
          {...rest}
        />
      </motion.span>
    );
  },
);

export const GlowButtonLink = forwardRef<
  HTMLAnchorElement,
  GlowButtonLinkProps
>(function GlowButtonLink({ wrapperClassName, className, ...props }, ref) {
  const { glow, rest } = splitGlowProps(props);

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      className={cn("relative inline-flex isolate", wrapperClassName)}
    >
      <motion.span
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={SPRING_PRESS}
      >
        <Glow {...glow} />
      </motion.span>
      <ButtonLink
        ref={ref}
        className={cn("relative z-10", className)}
        {...rest}
      />
    </motion.span>
  );
});
