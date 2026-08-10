import * as React from "react"
import { RiCloseLargeLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

const closeButtonVariants = cva(
  [
    // base
    "inline-flex items-center justify-center select-none cursor-pointer overflow-hidden",
    // transition
    "transition-[color,background-color,border-color,box-shadow,opacity,scale]",
    // active
    "active:scale-[0.97]",
    // focus-visible
    "focus-visible:outline-2",
    // disabled
    "disabled:cursor-not-allowed disabled:shadow-none",
    // aria-disabled
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:shadow-none",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "",
        inverse: "",
      },
      appearance: {
        solid: "",
        outline: "bg-transparent border-1",
        ghost: "bg-transparent border-1 border-transparent",
        soft: "",
      },
      size: {
        xs: "size-3 [&_svg]:size-2!",
        sm: "size-4 [&_svg]:size-3!",
        md: "size-5 [&_svg]:size-3!",
        lg: "size-6 [&_svg]:size-4!",
        xl: "size-7 [&_svg]:size-5!",
        "2xl": "size-8 [&_svg]:size-6!",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: ["xs", "sm"], className: "rounded-xs" },
      { shape: "rounded", size: "md", className: "rounded-sm" },
      { shape: "rounded", size: ["lg", "xl"], className: "rounded-md" },
      { shape: "rounded", size: "2xl", className: "rounded-lg" },

      {
        variant: "neutral",
        appearance: ["outline", "soft", "ghost"],
        className:
          "focus-visible:bg-static-black-alpha-8 focus-visible:outline-static-black",
      },
      {
        variant: "inverse",
        appearance: ["outline", "soft", "ghost"],
        className:
          "focus-visible:bg-static-white-alpha-8 focus-visible:outline-static-white",
      },
      { appearance: "outline", className: "focus-visible:border-transparent" },

      {
        variant: "neutral",
        appearance: "solid",
        className: [
          // base
          "bg-strong text-static",
          // hover
          "hover:bg-strongest",
          // active
          "active:bg-strongest",
          // focus-visible
          "focus-visible:outline-strongest",
          // disabled
          "disabled:bg-weak disabled:text-disabled",
          // aria-disabled
          "aria-disabled:bg-weak aria-disabled:text-disabled",
        ],
      },
      {
        variant: "inverse",
        appearance: "solid",
        className: [
          // base
          "bg-weakest text-strongest",
          // hover
          "hover:bg-weak",
          // active
          "active:bg-weak",
          // focus-visible
          "focus-visible:outline-weak",
          // disabled
          "disabled:bg-strong disabled:text-body",
          // aria-disabled
          "aria-disabled:bg-strong aria-disabled:text-body",
        ],
      },

      {
        variant: "neutral",
        appearance: "outline",
        className: [
          // base
          "text-static-black-alpha-48 border-static-black-alpha-16",
          // disabled
          "disabled:border-static-black-alpha-24",
          // aria-disabled
          "aria-disabled:border-static-black-alpha-24",
        ],
      },
      {
        variant: "inverse",
        appearance: "outline",
        className: [
          // base
          "text-static-white-alpha-48 border-static-white-alpha-16",
          // disabled
          "disabled:border-static-white-alpha-24",
          // aria-disabled
          "aria-disabled:border-static-white-alpha-24",
        ],
      },

      {
        variant: "neutral",
        appearance: ["outline", "ghost"],
        className: [
          // hover
          "hover:bg-static-black-alpha-16 hover:text-static-black",
          // active
          "active:bg-static-black-alpha-16 active:text-static-black",
          // disabled
          "disabled:text-static-black-alpha-24",
          // aria-disabled
          "aria-disabled:text-static-black-alpha-24",
        ],
      },
      {
        variant: "inverse",
        appearance: ["outline", "ghost"],
        className: [
          // hover
          "hover:bg-static-white-alpha-16 hover:text-static-white",
          // active
          "active:bg-static-white-alpha-16 active:text-static-white",
          // disabled
          "disabled:text-static-white-alpha-24",
          // aria-disabled
          "aria-disabled:text-static-white-alpha-24",
        ],
      },

      {
        variant: "neutral",
        appearance: "ghost",
        className: [
          // base
          "text-static-black",
          // focus-visible
          "focus-visible:text-static-black",
        ],
      },
      {
        variant: "inverse",
        appearance: "ghost",
        className: "text-static-white",
      },

      {
        variant: "neutral",
        appearance: "soft",
        className: [
          // base
          "text-static-black-alpha-64 bg-static-black-alpha-8",
          // hover
          "hover:text-static-black hover:bg-static-black-alpha-24",
          // active
          "active:text-static-black active:bg-static-black-alpha-24",
          // focus-visible
          "focus-visible:text-static-black",
          // disabled
          "disabled:bg-static-black-alpha-8 disabled:text-static-black-alpha-16",
          // aria-disabled
          "aria-disabled:bg-static-black-alpha-8 aria-disabled:text-static-black-alpha-16",
        ],
      },
      {
        variant: "inverse",
        appearance: "soft",
        className: [
          // base
          "text-static-white-alpha-64 bg-static-white-alpha-8",
          // hover
          "hover:bg-static-white-alpha-24 hover:text-static-white",
          // active
          "active:bg-static-white-alpha-24 active:text-static-white",
          // focus-visible
          "focus-visible:text-static-white",
          // disabled
          "disabled:bg-static-white-alpha-8 disabled:text-static-white-alpha-16",
          // aria-disabled
          "aria-disabled:bg-static-white-alpha-8 aria-disabled:text-static-white-alpha-16",
        ],
      },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "soft",
      size: "md",
      shape: "pill",
    },
  }
)

type CloseButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof closeButtonVariants> & {
    asChild?: boolean
  }

function CloseButton({
  className,
  variant = "neutral",
  appearance = "soft",
  size = "md",
  shape = "pill",
  asChild = false,
  disabled,
  children,
  ...props
}: CloseButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="close-button"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      type={asChild ? undefined : "button"}
      disabled={asChild ? undefined : disabled}
      aria-disabled={asChild ? disabled || undefined : undefined}
      tabIndex={asChild && disabled ? -1 : undefined}
      aria-label="Close"
      className={cn(
        closeButtonVariants({ variant, appearance, size, shape, className })
      )}
      {...props}
    >
      {asChild ? children : <RiCloseLargeLine />}
    </Comp>
  )
}

export { CloseButton, closeButtonVariants }
