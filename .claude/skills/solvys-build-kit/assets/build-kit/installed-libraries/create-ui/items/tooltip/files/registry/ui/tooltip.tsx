"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/registry/lib/utils"

function TooltipProvider({
  children,
  delayDuration,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    >
      {children}
    </TooltipPrimitive.Provider>
  )
}

function Tooltip({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        delayDuration={delayDuration}
        {...props}
      />
    </TooltipPrimitive.Provider>
  )
}

function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn("inline-flex", className)}
      {...props}
    />
  )
}

const tooltipContentVariants = cva(
  "w-fit max-w-[200px] rounded-lg px-1.5 py-1 text-ui-control-sm font-medium text-white",
  {
    variants: {
      variant: {
        primary: "bg-primary-500",
        neutral: "bg-strong text-static",
        inverse: "bg-weak text-body shadow-neutral-2xs",
        danger: "bg-red-600",
        info: "bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

const arrowFillByVariant = {
  primary: "fill-primary-500",
  neutral: "fill-strong",
  inverse: "fill-weak",
  danger: "fill-red-600",
  info: "fill-blue-600",
} as const

function TooltipArrow({
  variant = "primary",
}: {
  variant?: keyof typeof arrowFillByVariant
}) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      width={28}
      height={8}
      asChild
    >
      <span className="inline-flex -translate-y-px">
        <svg
          width="28"
          height="8"
          viewBox="0 0 28 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("shrink-0", arrowFillByVariant[variant])}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.95195 1.25622C8.86083 1.09837 8.69241 1.00113 8.51015 1.00113L8.5 1.00113C8.22386 1.00113 8 0.77728 8 0.50113C8 0.22499 8.22386 0.00113 8.5 0.00113L19.5 0.00113C19.7761 0.00113 20 0.22499 20 0.50113C20 0.77728 19.7761 1.00113 19.5 1.00113L19.4899 1.00113C19.3076 1.00113 19.1392 1.09837 19.048 1.25622L15.7321 6.99996C14.9623 8.333347 13.0377 8.333345 12.2679 6.99996L8.95195 1.25622Z"
          />
        </svg>
      </span>
    </TooltipPrimitive.Arrow>
  )
}

type TooltipContentProps = {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "neutral" | "inverse" | "danger" | "info"
  showArrow?: boolean
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
} & Omit<
  React.ComponentProps<typeof TooltipPrimitive.Content>,
  "children" | "className" | "side" | "align" | "sideOffset"
>

function TooltipContent({
  className,
  variant = "primary",
  showArrow = false,
  side = "bottom",
  sideOffset = 2.5,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        side={side}
        align="center"
        sideOffset={showArrow ? sideOffset : sideOffset + 5}
        className={cn(
          // base
          "animate-in fade-in-0 zoom-in-95 relative z-50",
          // data-[side]
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          tooltipContentVariants({ variant }),
          className
        )}
        {...props}
      >
        {children}
        {showArrow && <TooltipArrow variant={variant} />}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  tooltipContentVariants,
}
