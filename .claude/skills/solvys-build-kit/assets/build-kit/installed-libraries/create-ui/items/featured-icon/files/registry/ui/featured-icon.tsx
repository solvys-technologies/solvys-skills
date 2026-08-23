import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/registry/lib/utils"

type FeaturedIconVariant =
  | "primary"
  | "neutral"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "away"
type FeaturedIconAppearance = "solid" | "soft" | "neutral" | "outline"
type FeaturedIconShape = "rounded" | "circle"
type FeaturedIconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"

const featuredIconVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
  {
    variants: {
      variant: {
        primary: "text-primary-base border-primary-weakest",
        neutral: "text-stable-base border-stable-weak",
        danger: "text-error-base border-error-weak",
        success: "text-success-base border-success-weak",
        warning: "text-warning-base border-warning-weak",
        info: "text-info-base border-info-weak",
        away: "text-away-base border-away-weak",
      },
      appearance: {
        solid: "text-static",
        soft: "",
        neutral: "bg-weak",
        outline: "border bg-static",
      },
      shape: { rounded: "", circle: "rounded-full" },
      size: {
        xl: "size-16 [&_svg]:size-9",
        lg: "size-12 [&_svg]:size-7",
        md: "size-10 [&_svg]:size-6",
        sm: "size-8 [&_svg]:size-4.5",
        xs: "size-6 [&_svg]:size-3.5",
        "2xs": "size-5 [&_svg]:size-3",
      },
    },
    compoundVariants: [
      // ── Primary ──
      {
        variant: "primary",
        appearance: "solid",
        className: "bg-primary-base",
      },
      {
        variant: "primary",
        appearance: "soft",
        className: "bg-primary-weakest",
      },

      // ── Neutral ──
      {
        variant: "neutral",
        appearance: "solid",
        className: "bg-stable-base",
      },
      {
        variant: "neutral",
        appearance: "soft",
        className: "bg-stable-weakest",
      },

      // ── Danger ──
      {
        variant: "danger",
        appearance: "solid",
        className: "bg-error-base",
      },
      {
        variant: "danger",
        appearance: "soft",
        className: "bg-error-weakest",
      },

      // ── Success ──
      {
        variant: "success",
        appearance: "solid",
        className: "bg-success-base",
      },
      {
        variant: "success",
        appearance: "soft",
        className: "bg-success-weakest",
      },

      // ── Warning ──
      {
        variant: "warning",
        appearance: "solid",
        className: "bg-warning-base",
      },
      {
        variant: "warning",
        appearance: "soft",
        className: "bg-warning-weakest",
      },

      // ── Info ──
      {
        variant: "info",
        appearance: "solid",
        className: "bg-info-base",
      },
      {
        variant: "info",
        appearance: "soft",
        className: "bg-info-weakest",
      },

      // ── Away ──
      {
        variant: "away",
        appearance: "solid",
        className: "bg-away-base",
      },
      {
        variant: "away",
        appearance: "soft",
        className: "bg-away-weakest",
      },

      // ── Radius scales with size ──
      { shape: "rounded", size: "2xs", className: "rounded-sm" },
      { shape: "rounded", size: "xs", className: "rounded-sm" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      shape: "rounded",
      size: "md",
    },
  }
)

type FeaturedIconProps = React.ComponentProps<"span"> & {
  variant?: FeaturedIconVariant
  appearance?: FeaturedIconAppearance
  shape?: FeaturedIconShape
  size?: FeaturedIconSize
}

function FeaturedIcon({
  className,
  variant = "primary",
  appearance = "solid",
  shape = "rounded",
  size = "md",
  children,
  ...props
}: FeaturedIconProps) {
  return (
    <span
      data-slot="featured-icon"
      data-variant={variant}
      data-appearance={appearance}
      data-shape={shape}
      data-size={size}
      className={cn(
        featuredIconVariants({ variant, appearance, shape, size }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { FeaturedIcon, featuredIconVariants }

export type {
  FeaturedIconVariant,
  FeaturedIconAppearance,
  FeaturedIconShape,
  FeaturedIconSize,
}
