import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const badgeVariants = cva(
  [
    // base
    "box-border inline-flex w-fit items-center justify-center whitespace-nowrap",
    // transition
    "transition-colors",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // data-disabled
    "data-disabled:text-disabled data-disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "text-primary-base",
        neutral: "text-strongest",
        "neutral-static": "text-black",
        danger: "text-error-base",
        success: "text-success-base",
        warning: "text-warning-base",
        info: "text-info-base",
        verified: "text-verified-base",
        highlighted: "text-highlighted-base",
        away: "text-away-base",
        inverse: "text-static",
        "inverse-static": "text-white",
      },
      appearance: {
        solid: "data-disabled:bg-weak",
        outline: [
          // base
          "bg-transparent border-1 border-inset",
          // data-disabled
          "data-disabled:border-medium data-disabled:bg-transparent",
        ],
        soft: "data-disabled:bg-weak",
        ghost: "bg-transparent",
      },
      size: {
        xs: "h-4 px-0.5 text-ui-control-xs [&_svg]:size-3!",
        sm: "h-5 px-1 gap-0.5 text-ui-control-sm [&_svg]:size-3!",
        md: "h-6 px-1 gap-0.5 text-ui-control-md [&_svg]:size-4!",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
      },
      iconOnly: {
        true: "",
        false: "",
      },
      numberOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-sm" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-lg" },

      {
        variant: [
          "primary",
          "danger",
          "success",
          "warning",
          "neutral-static",
          "info",
          "verified",
          "highlighted",
          "away",
        ],
        appearance: "solid",
        className: "text-white",
      },
      { variant: "primary", appearance: "solid", className: "bg-indigo-600" },
      {
        variant: "neutral",
        appearance: "solid",
        className: "bg-strongest text-static",
      },
      {
        variant: "neutral-static",
        appearance: "solid",
        className: "bg-black",
      },
      { variant: "danger", appearance: "solid", className: "bg-red-600" },
      { variant: "success", appearance: "solid", className: "bg-green-600" },
      { variant: "warning", appearance: "solid", className: "bg-orange-600" },
      { variant: "info", appearance: "solid", className: "bg-blue-600" },
      {
        variant: "verified",
        appearance: "solid",
        className: "bg-sky-600",
      },
      {
        variant: "highlighted",
        appearance: "solid",
        className: "bg-fuchsia-600",
      },
      { variant: "away", appearance: "solid", className: "bg-yellow-600" },
      {
        variant: "inverse",
        appearance: "solid",
        className: "bg-static text-strongest",
      },
      {
        variant: "inverse-static",
        appearance: "solid",
        className: "bg-white text-black",
      },

      {
        variant: "primary",
        appearance: "outline",
        className: "border-primary-base",
      },
      {
        variant: "neutral",
        appearance: "outline",
        className: "border-strongest",
      },
      {
        variant: "neutral-static",
        appearance: "outline",
        className: "border-black",
      },
      {
        variant: "danger",
        appearance: "outline",
        className: "border-error-base",
      },
      {
        variant: "success",
        appearance: "outline",
        className: "border-success-base",
      },
      {
        variant: "warning",
        appearance: "outline",
        className: "border-warning-base",
      },
      {
        variant: "info",
        appearance: "outline",
        className: "border-info-base",
      },
      {
        variant: "verified",
        appearance: "outline",
        className: "border-verified-base",
      },
      {
        variant: "highlighted",
        appearance: "outline",
        className: "border-highlighted-base",
      },
      {
        variant: "away",
        appearance: "outline",
        className: "border-away-base",
      },
      {
        variant: "inverse",
        appearance: "outline",
        className: "border-weakest",
      },
      {
        variant: "inverse-static",
        appearance: "outline",
        className: "border-neutral-50",
      },

      {
        variant: "primary",
        appearance: "soft",
        className: "bg-primary-weak",
      },
      { variant: "neutral", appearance: "soft", className: "bg-light" },
      {
        variant: "neutral-static",
        appearance: "soft",
        className: "bg-neutral-200",
      },
      { variant: "danger", appearance: "soft", className: "bg-error-weak" },
      {
        variant: "success",
        appearance: "soft",
        className: "bg-success-weak",
      },
      {
        variant: "warning",
        appearance: "soft",
        className: "bg-warning-weak",
      },
      { variant: "info", appearance: "soft", className: "bg-info-weak" },
      {
        variant: "verified",
        appearance: "soft",
        className: "bg-verified-weak",
      },
      {
        variant: "highlighted",
        appearance: "soft",
        className: "bg-highlighted-weak",
      },
      { variant: "away", appearance: "soft", className: "bg-away-weak" },
      { variant: "inverse", appearance: "soft", className: "bg-heavy" },
      {
        variant: "inverse-static",
        appearance: "soft",
        className: "bg-neutral-700",
      },
      { appearance: "ghost", className: "px-0" },

      { iconOnly: true, size: "xs", className: "w-4 px-0" },
      { iconOnly: true, size: "sm", className: "w-5 px-0" },
      { iconOnly: true, size: "md", className: "w-6 px-0" },

      { numberOnly: true, size: "xs", className: "min-w-4 px-0" },
      { numberOnly: true, size: "sm", className: "min-w-5 px-0" },
      { numberOnly: true, size: "md", className: "min-w-6 px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "soft",
      size: "sm",
      shape: "rounded",
      iconOnly: false,
      numberOnly: false,
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    iconOnly?: boolean
    numberOnly?: boolean
    disabled?: boolean
    leading?: React.ReactNode
    trailing?: React.ReactNode
  }

function Badge({
  className,
  variant = "primary",
  appearance = "soft",
  size = "sm",
  shape = "rounded",
  iconOnly = false,
  numberOnly = false,
  asChild = false,
  disabled = false,
  leading,
  trailing,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  const numberWidthBySize = {
    xs: "min-w-3.5",
    sm: "min-w-4",
    md: "min-w-5",
  } as const

  function renderContent() {
    if (asChild) return children

    if (iconOnly) {
      return children
    }

    if (numberOnly) {
      return (
        <span
          data-slot="badge-label"
          className={cn(
            "inline-flex items-center justify-center text-center",
            numberWidthBySize[size ?? "sm"]
          )}
        >
          {children}
        </span>
      )
    }

    return (
      <>
        {leading && <span data-slot="badge-icon">{leading}</span>}
        <span data-slot="badge-label" className="px-0.5">
          {children}
        </span>
        {trailing && <span data-slot="badge-icon">{trailing}</span>}
      </>
    )
  }

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        badgeVariants({
          variant,
          appearance,
          size,
          shape,
          iconOnly,
          numberOnly,
          className,
        })
      )}
      {...props}
    >
      {renderContent()}
    </Comp>
  )
}

export { Badge, badgeVariants }
