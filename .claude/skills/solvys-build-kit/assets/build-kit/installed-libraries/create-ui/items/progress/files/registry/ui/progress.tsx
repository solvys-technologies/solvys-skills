"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

const VARIANT_CLASSES = {
  primary: {
    text: "text-primary-base",
    track: "bg-light",
    indicator: {
      solid: "bg-primary-base",
      gradient: "bg-gradient-to-r from-primary-weakest to-primary-base",
    },
  },
  info: {
    text: "text-info-base",
    track: "bg-light",
    indicator: {
      solid: "bg-info-base",
      gradient: "bg-gradient-to-r from-info-weak to-info-base",
    },
  },
  success: {
    text: "text-success-base",
    track: "bg-light",
    indicator: {
      solid: "bg-success-base",
      gradient: "bg-gradient-to-r from-success-weak to-success-base",
    },
  },
  warning: {
    text: "text-warning-base",
    track: "bg-light",
    indicator: {
      solid: "bg-warning-base",
      gradient: "bg-gradient-to-r from-warning-weak to-warning-base",
    },
  },
  danger: {
    text: "text-error-base",
    track: "bg-light",
    indicator: {
      solid: "bg-error-base",
      gradient: "bg-gradient-to-r from-error-weak to-error-base",
    },
  },
  away: {
    text: "text-away-base",
    track: "bg-light",
    indicator: {
      solid: "bg-away-base",
      gradient: "bg-gradient-to-r from-away-weak to-away-base",
    },
  },
  neutral: {
    text: "text-static-black",
    track: "bg-static-black-alpha-16",
    indicator: {
      solid: "bg-static-black",
      gradient: "bg-gradient-to-r from-static-black-alpha-8 to-static-black",
    },
  },
  "neutral-static": {
    text: "text-black",
    track: "bg-black-alpha-16",
    indicator: {
      solid: "bg-black",
      gradient: "bg-gradient-to-r from-black-alpha-8 to-black",
    },
  },
  "neutral-soft": {
    text: "text-heavy",
    track: "bg-static-black-alpha-16",
    indicator: {
      solid: "bg-heavy",
      gradient: "bg-gradient-to-r from-medium to-heavy",
    },
  },
  inverse: {
    text: "text-static-white",
    track: "bg-static-white-alpha-16",
    indicator: {
      solid: "bg-static-white",
      gradient: "bg-gradient-to-r from-static-white-alpha-8 to-static-white",
    },
  },
  "inverse-static": {
    text: "text-white",
    track: "bg-white-alpha-16",
    indicator: {
      solid: "bg-white",
      gradient: "bg-gradient-to-r from-white-alpha-8 to-white",
    },
  },
  "inverse-soft": {
    text: "text-medium",
    track: "bg-static-white-alpha-16",
    indicator: {
      solid: "bg-medium",
      gradient: "bg-gradient-to-r from-strong to-medium",
    },
  },
} as const

const CIRCLE_SIZE_PX = { xs: 12, sm: 16, md: 20, lg: 24 } as const
const CIRCLE_STROKE_PX = { xs: 1.5, sm: 2, md: 2.5, lg: 3 } as const

const progressLineVariants = cva("relative w-full overflow-hidden", {
  variants: {
    size: {
      xs: "h-0.5",
      sm: "h-1",
      md: "h-1.5",
      lg: "h-2",
    },
    shape: {
      sharp: "rounded-none",
      round: "rounded-full",
      pill: "rounded-full",
    },
  },
  defaultVariants: { size: "md", shape: "pill" },
})

type ProgressVariant = keyof typeof VARIANT_CLASSES
type ProgressAppearance = "solid" | "gradient"
type ProgressType = "line" | "circle"
type ProgressSize = NonNullable<
  VariantProps<typeof progressLineVariants>["size"]
>
type ProgressShape = NonNullable<
  VariantProps<typeof progressLineVariants>["shape"]
>

type ProgressBaseProps = {
  type?: ProgressType
  variant?: ProgressVariant
  appearance?: ProgressAppearance
  size?: ProgressSize
  shape?: ProgressShape
  value?: number
  max?: number
  duration?: number
}

type ProgressProps = Omit<
  React.ComponentProps<"div">,
  keyof ProgressBaseProps | "children"
> &
  ProgressBaseProps

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function Progress({
  type = "line",
  variant = "primary",
  appearance = "solid",
  size = "md",
  shape = "pill",
  value = 0,
  max = 100,
  duration,
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = clamp((value / safeMax) * 100, 0, 100)

  const View = type === "circle" ? ProgressCircle : ProgressLine

  return (
    <View
      variant={variant}
      appearance={appearance}
      size={size}
      shape={shape}
      value={value}
      max={safeMax}
      percentage={percentage}
      duration={duration}
      {...props}
    />
  )
}

type ViewProps = Omit<React.ComponentProps<"div">, keyof ProgressBaseProps> & {
  variant: ProgressVariant
  appearance: ProgressAppearance
  size: ProgressSize
  shape: ProgressShape
  value: number
  max: number
  percentage: number
  duration?: number
}

function ProgressLine({
  className,
  variant,
  appearance,
  size,
  shape,
  value,
  max,
  percentage,
  duration,
  ...props
}: ViewProps) {
  const { track, indicator } = VARIANT_CLASSES[variant]

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamp(value, 0, max)}
      data-slot="progress"
      data-type="line"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      data-shape={shape}
      className={cn(progressLineVariants({ size, shape }), track, className)}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn(
          "h-full transition-[width] duration-300 ease-out",
          shape === "pill" ? "rounded-full" : "rounded-none",
          indicator[appearance]
        )}
        style={{
          width: `${percentage}%`,
          ...(duration != null && { transitionDuration: `${duration}ms` }),
        }}
      />
    </div>
  )
}

function ProgressCircle({
  className,
  variant,
  appearance,
  size,
  shape,
  value,
  max,
  percentage,
  duration: _duration,
  ...props
}: ViewProps) {
  const dimension = CIRCLE_SIZE_PX[size]
  const strokeWidth = CIRCLE_STROKE_PX[size]
  const { text, track } = VARIANT_CLASSES[variant]

  const ringMask = `radial-gradient(circle closest-side at center, transparent calc(100% - ${strokeWidth}px), #000 calc(100% - ${strokeWidth}px), #000 100%, transparent 100%)`
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: ringMask,
    maskImage: ringMask,
  }

  const transparentStart = "rgb(from currentColor r g b / 0)"
  const startColor =
    appearance === "gradient" ? transparentStart : "currentColor"

  const indicatorGradient = `conic-gradient(from 0deg at 50% 50%, ${startColor} 0%, currentColor ${percentage}%, transparent ${percentage}%, transparent 100%)`

  const showCaps = shape === "pill" && percentage > 0
  const endAngleDeg = (percentage / 100) * 360

  const cap = (key: string, angleDeg: number) => (
    <div
      key={key}
      aria-hidden
      data-slot="progress-cap"
      className="absolute inset-0"
      style={{ transform: `rotate(${angleDeg}deg)` }}
    >
      <div
        className="absolute rounded-full bg-current"
        style={{
          width: `${strokeWidth}px`,
          height: `${strokeWidth}px`,
          left: `${dimension / 2 - strokeWidth / 2}px`,
          top: "0px",
        }}
      />
    </div>
  )

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamp(value, 0, max)}
      data-slot="progress"
      data-type="circle"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      data-shape={shape}
      className={cn(
        "relative inline-block shrink-0 align-middle",
        text,
        className
      )}
      style={{ width: `${dimension}px`, height: `${dimension}px` }}
      {...props}
    >
      <div
        data-slot="progress-track"
        className={cn("absolute inset-0", track)}
        style={maskStyle}
      />
      <div
        data-slot="progress-indicator"
        className="absolute inset-0"
        style={{ background: indicatorGradient, ...maskStyle }}
      />
      {showCaps && (
        <>
          {appearance === "solid" && cap("start", 0)}
          {cap("end", endAngleDeg)}
        </>
      )}
    </div>
  )
}

export { Progress, progressLineVariants }
export type {
  ProgressProps,
  ProgressVariant,
  ProgressAppearance,
  ProgressSize,
  ProgressShape,
  ProgressType,
}
