"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type SliderVariant = "primary" | "neutral"
type SliderSize = "md" | "sm" | "xs"

const THUMB_WIDTH_PX: Record<SliderSize, number> = {
  md: 16,
  sm: 14,
  xs: 12,
}

const sliderTrackVariants = cva("bg-light relative grow rounded-full", {
  variants: {
    size: { md: "h-2", sm: "h-1.5", xs: "h-1" },
  },
  defaultVariants: { size: "md" },
})

const sliderRangeVariants = cva("absolute top-0 left-0 h-full rounded-full", {
  variants: {
    variant: { primary: "bg-primary-base", neutral: "bg-strong" },
  },
  defaultVariants: { variant: "primary" },
})

const sliderThumbVariants = cva(
  [
    // base
    "bg-white border-light shadow-neutral-sm block shrink-0 rounded-sm border",
    // cursor + dragging
    "cursor-grab transition-transform outline-2 outline-transparent active:scale-90 active:cursor-grabbing",
    // disabled
    "data-[disabled]:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        md: "size-4",
        sm: "size-3.5 [@media(min-resolution:2dppx)]:border-[0.5px]",
        xs: "size-3 [@media(min-resolution:2dppx)]:border-[0.5px]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  variant?: SliderVariant
  size?: SliderSize
}

function Slider({
  className,
  variant = "primary",
  size = "md",
  min = 0,
  max = 100,
  value,
  defaultValue,
  onValueChange,
  onPointerDown,
  onKeyDown,
  onKeyUp,
  ...props
}: SliderProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<number[]>(
    defaultValue ?? [min]
  )
  const values = isControlled ? value : internalValue

  const handleValueChange = (next: number[]) => {
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  const [suppressAnim, setSuppressAnim] = React.useState(false)
  const [pressing, setPressing] = React.useState(false)
  const downPointRef = React.useRef<{ x: number; y: number } | null>(null)
  React.useEffect(() => {
    if (!pressing) return
    const onMove = (event: PointerEvent) => {
      const down = downPointRef.current
      if (
        down &&
        Math.hypot(event.clientX - down.x, event.clientY - down.y) > 4
      ) {
        setSuppressAnim(true)
      }
    }
    const stop = () => {
      setPressing(false)
      setSuppressAnim(false)
      downPointRef.current = null
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", stop)
    window.addEventListener("pointercancel", stop)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", stop)
      window.removeEventListener("pointercancel", stop)
    }
  }, [pressing])

  const [reducedMotion, setReducedMotion] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [])
  const animate = ready && !suppressAnim && !reducedMotion

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const thumbWidth = THUMB_WIDTH_PX[size]
  const fillPercent = ((Math.max(...values) - min) / (max - min)) * 100
  const fillOffset = ((thumbWidth / 2) * (50 - fillPercent)) / 50

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-variant={variant}
      data-size={size}
      min={min}
      max={max}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : (defaultValue ?? [min])}
      onValueChange={handleValueChange}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        downPointRef.current = { x: event.clientX, y: event.clientY }
        setSuppressAnim(
          !!(event.target as Element).closest?.('[data-slot="slider-thumb"]')
        )
        setPressing(true)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        setSuppressAnim(true)
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event)
        setSuppressAnim(false)
      }}
      className={cn(
        // base
        "relative flex w-full touch-none items-center select-none",
        // disabled
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
        // transition
        animate &&
          "[&>span:not([data-slot])]:transition-[left] [&>span:not([data-slot])]:duration-200 [&>span:not([data-slot])]:ease-out",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={sliderTrackVariants({ size })}
      >
        <span
          data-slot="slider-range"
          className={cn(
            sliderRangeVariants({ variant }),
            animate && "transition-[width] duration-200 ease-out"
          )}
          style={{ width: `calc(${fillPercent}% + ${fillOffset}px)` }}
        />
      </SliderPrimitive.Track>

      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={sliderThumbVariants({ size })}
        />
      ))}

      {!mounted &&
        values.map((thumbValue, index) => {
          const percent = ((thumbValue - min) / (max - min)) * 100
          const inBoundsOffset = ((thumbWidth / 2) * (50 - percent)) / 50
          return (
            <span
              key={`ssr-thumb-${index}`}
              data-slot="slider-thumb-placeholder"
              aria-hidden="true"
              style={{
                insetInlineStart: `calc(${percent}% + ${inBoundsOffset}px)`,
              }}
              className={cn(
                sliderThumbVariants({ size }),
                "pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              )}
            />
          )
        })}
    </SliderPrimitive.Root>
  )
}

export { Slider, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants }
export type { SliderProps, SliderVariant, SliderSize }
