"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const SPINNER_CSS = `
@property --spinner-arc-fade {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: true;
}

@property --spinner-arc-start {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: true;
}

@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}

@keyframes spinner-arc-pulse-short {
  0%   { --spinner-arc-start: 0deg;   --spinner-arc-fade: 8%; }
  50%  { --spinner-arc-start: 42deg;  --spinner-arc-fade: 25%; }
  100% { --spinner-arc-start: 360deg; --spinner-arc-fade: 8%; }
}

@keyframes spinner-arc-pulse-long {
  0%   { --spinner-arc-start: 0deg;   --spinner-arc-fade: 8%; }
  50%  { --spinner-arc-start: 42deg;  --spinner-arc-fade: 77%; }
  100% { --spinner-arc-start: 360deg; --spinner-arc-fade: 8%; }
}

@keyframes spinner-tick {
  0%   { transform: rotate(0deg); }
  58%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}
`.trim()

const VARIANT_CLASSES = {
  primary: {
    text: "text-primary-base",
    track: "bg-primary-weak",
  },
  info: {
    text: "text-info-base",
    track: "bg-info-weak",
  },
  success: {
    text: "text-success-base",
    track: "bg-success-weak",
  },
  warning: {
    text: "text-warning-base",
    track: "bg-warning-weak",
  },
  danger: {
    text: "text-error-base",
    track: "bg-error-weak",
  },
  away: {
    text: "text-away-base",
    track: "bg-away-weak",
  },
  neutral: {
    text: "text-static-black",
    track: "bg-static-black-alpha-16",
  },
  "neutral-static": {
    text: "text-black",
    track: "bg-black-alpha-16",
  },
  "neutral-soft": {
    text: "text-heavy",
    track: "bg-static-black-alpha-16",
  },
  inverse: {
    text: "text-static-white",
    track: "bg-static-white-alpha-16",
  },
  "inverse-static": {
    text: "text-white",
    track: "bg-white-alpha-16",
  },
  "inverse-soft": {
    text: "text-medium",
    track: "bg-static-white-alpha-16",
  },
} as const

const ARC_STROKE_PX = { xs: 1, sm: 1.5, md: 1.75, lg: 2 } as const

const LINE_SOLID_PERCENT = { short: 0.25, long: 0.75 } as const
const LINE_GRADIENT_FADE = { short: "30%", long: "83%" } as const

const STATIC_ANIMATION_CSS = {
  spin: "spinner-rotate 1.4s linear infinite",
  tick: "spinner-tick 1.2s ease-out infinite",
} as const

const spinnerVariants = cva("inline-block shrink-0 align-middle text-current", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "sm" },
})

type SpinnerVariant = keyof typeof VARIANT_CLASSES
type SpinnerAppearance = "solid" | "gradient"
type SpinnerCap = "sharp" | "rounded"
type SpinnerLine = "short" | "long"
type SpinnerAnimation = "spin" | "pulse" | "tick"
type SpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>["size"]>

type SpinnerBaseProps = {
  variant?: SpinnerVariant
  appearance?: SpinnerAppearance
  cap?: SpinnerCap
  line?: SpinnerLine
  animation?: SpinnerAnimation
  size?: SpinnerSize
}

type SpinnerProps = Omit<
  React.ComponentProps<"div">,
  keyof SpinnerBaseProps | "children"
> &
  SpinnerBaseProps

function Spinner({
  className,
  variant = "primary",
  appearance = "gradient",
  cap = "rounded",
  line = "long",
  animation = "pulse",
  size = "sm",
  ...props
}: SpinnerProps) {
  const { text, track } = VARIANT_CLASSES[variant]

  return (
    <div
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      data-variant={variant}
      data-appearance={appearance}
      data-cap={cap}
      data-line={line}
      data-animation={animation}
      data-size={size}
      className={cn(
        "overflow-hidden rounded-full",
        spinnerVariants({ size }),
        text,
        className
      )}
      {...props}
    >
      <style precedence="default">{SPINNER_CSS}</style>
      <SpinnerArc
        trackClass={track}
        appearance={appearance}
        cap={cap}
        line={line}
        animation={animation}
        size={size}
      />
    </div>
  )
}

type ArcProps = {
  trackClass: string
  appearance: SpinnerAppearance
  cap: SpinnerCap
  line: SpinnerLine
  animation: SpinnerAnimation
  size: SpinnerSize
}

function SpinnerArc({
  trackClass,
  appearance,
  cap,
  line,
  animation,
  size,
}: ArcProps) {
  const stroke = ARC_STROKE_PX[size]

  const ringMask = `radial-gradient(circle closest-side at center, transparent calc(100% - ${stroke}px), #000 calc(100% - ${stroke}px), #000 100%, transparent 100%)`
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: ringMask,
    maskImage: ringMask,
  }

  const transparentEnd = "rgb(from currentColor r g b / 0)"

  const staticFade =
    appearance === "gradient"
      ? LINE_GRADIENT_FADE[line]
      : `${LINE_SOLID_PERCENT[line] * 100}%`

  const indicatorGradient =
    appearance === "gradient"
      ? `conic-gradient(from var(--spinner-arc-start) at 50% 50%, ${transparentEnd} 0%, currentColor calc(var(--spinner-arc-fade) * 0.6), currentColor var(--spinner-arc-fade), ${transparentEnd} var(--spinner-arc-fade), ${transparentEnd} 100%)`
      : `conic-gradient(from var(--spinner-arc-start) at 50% 50%, currentColor 0%, currentColor var(--spinner-arc-fade), transparent var(--spinner-arc-fade), transparent 100%)`

  const animationCss =
    animation === "pulse"
      ? `spinner-rotate 3s linear infinite, spinner-arc-pulse-${line} 2.25s cubic-bezier(0.42, 0, 0.58, 1) infinite`
      : STATIC_ANIMATION_CSS[animation]

  const wrapperStyle: React.CSSProperties = {
    animation: animationCss,
    ...(animation === "pulse"
      ? {}
      : ({
          "--spinner-arc-start": "0deg",
          "--spinner-arc-fade": staticFade,
        } as React.CSSProperties)),
  }

  const showCaps = appearance === "solid" && cap === "rounded"
  const center = `50% - ${stroke / 2}px`
  const radius = `(50% - ${stroke / 2}px)`
  const capPos = (fn: "sin" | "cos", angle: string) =>
    `calc(${center} + ${radius} * ${fn}(${angle}))`
  const startAngle = "var(--spinner-arc-start) - 90deg"
  const tailAngle =
    "var(--spinner-arc-start) + (var(--spinner-arc-fade) / 100%) * 360deg - 90deg"

  return (
    <div className="relative size-full" style={wrapperStyle}>
      {appearance === "solid" && (
        <div
          data-slot="spinner-track"
          className={cn("absolute inset-0", trackClass)}
          style={maskStyle}
        />
      )}
      <div
        data-slot="spinner-arc"
        className="absolute inset-0"
        style={{ background: indicatorGradient, ...maskStyle }}
      />
      {showCaps && (
        <>
          <SpinnerArcCap
            slot="head"
            stroke={stroke}
            top={capPos("sin", startAngle)}
            left={capPos("cos", startAngle)}
          />
          <SpinnerArcCap
            slot="tail"
            stroke={stroke}
            top={capPos("sin", tailAngle)}
            left={capPos("cos", tailAngle)}
          />
        </>
      )}
    </div>
  )
}

type ArcCapProps = {
  slot: "head" | "tail"
  stroke: number
  top: string
  left: string
}

function SpinnerArcCap({ slot, stroke, top, left }: ArcCapProps) {
  return (
    <span
      data-slot={`spinner-cap-${slot}`}
      className="absolute rounded-full bg-current"
      style={{
        width: `${stroke}px`,
        height: `${stroke}px`,
        top,
        left,
      }}
    />
  )
}

export { Spinner, spinnerVariants }
export type {
  SpinnerProps,
  SpinnerVariant,
  SpinnerAppearance,
  SpinnerCap,
  SpinnerLine,
  SpinnerAnimation,
  SpinnerSize,
}
