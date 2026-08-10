import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"
import { Spinner, type SpinnerProps } from "@/registry/ui/spinner"

const buttonVariants = cva(
  [
    // base
    "inline-flex items-center justify-center !font-semibold select-none cursor-pointer overflow-hidden outline-2 outline-transparent",
    // transition
    "transition-[color,background-color,border-color,box-shadow,opacity,scale]",
    // active
    "active:scale-[0.97]",
    // aria-busy
    "aria-busy:[&_[data-slot=button-label]]:text-shadow-none aria-busy:shadow-none aria-busy:pointer-events-none",
    // disabled
    "disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:[&_[data-slot=button-label]]:text-shadow-none",
    // aria-disabled
    "aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:shadow-none aria-disabled:[&_[data-slot=button-label]]:text-shadow-none",
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transform-gpu",
  ],
  {
    variants: {
      variant: {
        primary: "text-primary-base",
        "neutral-solid": "text-strongest",
        "neutral-light": "text-body",
        danger: "text-error-base",
        success: "text-success-base",
        "inverse-solid": "text-static",
        "inverse-light": "text-disabled",
      },
      appearance: {
        solid:
          "[&_[data-slot=button-label]]:text-shadow-2xs aria-invalid:bg-red-600 aria-invalid:outline-transparent aria-invalid:text-white aria-invalid:shadow-none",
        outline:
          "bg-transparent border-1 aria-invalid:border-red-600 aria-invalid:outline-transparent aria-invalid:text-red-600",
        ghost:
          "bg-transparent border-1 border-transparent aria-invalid:bg-red-alpha-16 aria-invalid:outline-transparent aria-invalid:text-red-600",
        soft: " aria-invalid:bg-transparent aria-invalid:outline-transparent aria-invalid:text-red-600",
      },
      size: {
        xs: "px-1 h-5 text-ui-control-xs [&_svg]:size-3 outline-offset-1",
        sm: "px-2 h-6 gap-0.5 text-ui-control-sm [&_svg]:size-4 outline-offset-2",
        md: "px-3 h-8 gap-0.5 text-ui-control-md [&_svg]:size-5 outline-offset-2",
        lg: "px-4 h-10 gap-1 text-ui-control-md [&_svg]:size-5 outline-offset-2",
        xl: "px-5 h-12 gap-1 text-ui-control-xl [&_svg]:size-6 outline-offset-3",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
        square: "rounded-none",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-sm" },
      { shape: "rounded", size: "sm", className: "rounded-md" },
      { shape: "rounded", size: "md", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
      {
        appearance: ["solid"],
        className: ["outline-offset-0"],
      },
      // --- Solid ---
      {
        variant: "primary",
        appearance: "solid",
        className: [
          // base
          "bg-primary-500 text-white shadow-component-primary-default",
          // hover
          "hover:bg-primary-600 hover:shadow-component-primary-hover",
          // active
          "active:bg-primary-600 active:shadow-component-primary-hover",
          // focus-visible
          "focus-visible:outline-primary-700",
          // aria-busy
          "aria-busy:bg-primary-400 aria-busy:text-white",
        ],
      },
      {
        variant: "danger",
        appearance: "solid",
        className: [
          // base
          "bg-red-600 text-white shadow-component-error-default",
          // hover
          "hover:bg-red-500 hover:shadow-component-error-hover",
          // active
          "active:bg-red-500 active:shadow-component-error-hover",
          // focus-visible
          "focus-visible:outline-error-strongest",
          // aria-busy
          "aria-busy:bg-red-400 aria-busy:text-white",
        ],
      },
      {
        variant: "success",
        appearance: "solid",
        className: [
          // base
          "bg-green-600 text-white shadow-component-success-default",
          // hover
          "hover:bg-green-500 hover:shadow-component-success-hover",
          // active
          "active:bg-green-500 active:shadow-component-success-hover",
          // focus-visible
          "focus-visible:outline-success-strongest",
          // aria-busy
          "aria-busy:bg-green-500 aria-busy:text-white",
        ],
      },
      {
        variant: "neutral-solid",
        appearance: "solid",
        className: [
          // base
          "bg-strong text-static shadow-component-neutral-default",
          // hover
          "hover:bg-strongest hover:shadow-component-neutral-hover",
          // active
          "active:bg-strongest active:shadow-component-neutral-hover",
          // focus-visible
          "focus-visible:outline-strongest",
          // aria-busy
          "aria-busy:bg-strong",
        ],
      },
      {
        variant: "neutral-light",
        appearance: "solid",
        className: [
          // base
          "bg-heavy text-disabled shadow-component-neutral-default",
          // hover
          "hover:bg-strong hover:text-static hover:shadow-component-neutral-hover",
          // active
          "active:bg-strong active:text-static active:shadow-component-neutral-hover",
          // focus-visible
          "focus-visible:text-static focus-visible:outline-strongest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-solid",
        appearance: "solid",
        className: [
          // base
          "bg-weakest text-strongest shadow-component-inverted-default",
          // hover
          "hover:bg-weak hover:shadow-component-inverted-hover",
          // active
          "active:bg-weak active:shadow-component-inverted-hover",
          // focus-visible
          "focus-visible:outline-medium",
        ],
      },
      {
        variant: "inverse-light",
        appearance: "solid",
        className: [
          // base
          "bg-light text-body shadow-component-inverted-default",
          // hover
          "hover:bg-weak hover:shadow-component-inverted-hover",
          // active
          "acctive:bg-weak active:shadow-component-inverted-hover",
          // focus-visible
          "focus-visible:outline-medium",
        ],
      },

      // --- Outline ---
      {
        variant: "primary",
        appearance: "outline",
        className: [
          // base
          "border-primary-base",
          // hover
          "hover:bg-primary-weak",
          // active
          "active:bg-primary-weak",
          // focus-visible
          "focus-visible:bg-primary-weak focus-visible:outline-primary-500",
        ],
      },
      {
        variant: "danger",
        appearance: "outline",
        className: [
          // base
          "border-error-base",
          // hover
          "hover:bg-error-weak",
          // active
          "active:bg-error-weak",
          // focus-visible
          "focus-visible:bg-error-weak focus-visible:outline-error-base",
        ],
      },
      {
        variant: "success",
        appearance: "outline",
        className: [
          // base
          "border-success-base",
          // hover
          "hover:bg-success-weak",
          // active
          "active:bg-success-weak",
          // focus-visible
          "focus-visible:bg-success-weak focus-visible:outline-success-base",
        ],
      },
      {
        variant: "neutral-solid",
        appearance: "outline",
        className: [
          // base
          "border-strong",
          // hover
          "hover:bg-weak",
          // active
          "active:bg-weak",
          // focus-visible
          "focus-visible:bg-weak focus-visible:outline-strong",
          // aria-busy
          "aria-busy:border-medium aria-busy:text-body",
        ],
      },
      {
        variant: "neutral-light",
        appearance: "outline",
        className: [
          // base
          "border-medium",
          // hover
          "hover:bg-weak hover:border-heavy",
          // active
          "active:bg-weak active:border-heavy",
          // focus-visible
          "focus-visible:bg-weak focus-visible:outline-strong",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-solid",
        appearance: "outline",
        className: [
          // base
          "border-light",
          // hover
          "hover:bg-strong",
          // active
          "active:bg-strong",
          // focus-visible
          "focus-visible:bg-strong focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:border-medium aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-light",
        appearance: "outline",
        className: [
          // base
          "border-heavy",
          // hover
          "hover:bg-strong hover:border-light",
          // active
          "active:bg-strong active:border-light",
          // focus-visible
          "focus-visible:bg-strong focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },

      // --- Soft ---
      {
        variant: "primary",
        appearance: "soft",
        className: [
          // base
          "bg-primary-weakest",
          // hover
          "hover:bg-primary-weak",
          // active
          "active:bg-primary-weak",
          // focus-visible
          "focus-visible:outline-primary-500",
          // aria-busy
          "aria-busy:bg-primary-alpha-16 aria-busy:text-primary-400",
        ],
      },
      {
        variant: "danger",
        appearance: "soft",
        className: [
          // base
          "bg-error-weakest",
          // hover
          "hover:bg-error-weak",
          // active
          "active:bg-error-weak",
          // focus-visible
          "focus-visible:outline-red-600",
        ],
      },
      {
        variant: "success",
        appearance: "soft",
        className: [
          // base
          "bg-success-weakest",
          // hover
          "hover:bg-success-weak",
          // active
          "active:bg-success-weak",
          // focus-visible
          "active:bg-success-weak focus-visible:outline-green-600",
          // aria-busy
          "aria-busy:text-success-base",
        ],
      },
      {
        variant: "neutral-solid",
        appearance: "soft",
        className: [
          // base
          "bg-light",
          // hover
          "hover:bg-medium",
          // active
          "active:bg-medium",
          // focus-visible
          "focus-visible:outline-strong",
          // aria-busy
          "aria-busy:bg-weak aria-busy:text-body",
        ],
      },
      {
        variant: "neutral-light",
        appearance: "soft",
        className: [
          // base
          "bg-weak",
          // hover
          "hover:bg-light",
          // active
          "active:bg-light",
          // focus-visible
          "focus-visible:outline-strong",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-solid",
        appearance: "soft",
        className: [
          // base
          "bg-strong",
          // hover
          "hover:bg-heavy hover:border-strong",
          // active
          "active:bg-heavy active:border-strong",
          // focus-visible
          "focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-light",
        appearance: "soft",
        className: [
          // base
          "bg-strong",
          // hover
          "hover:bg-heavy hover:border-strong",
          // active
          "active:bg-heavy active:border-strong",
          // focus-visible
          "focus-visible:bg-strong focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },

      // --- Ghost ---
      {
        variant: "primary",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-primary-weak",
          // active
          "active:bg-primary-weak",
          // focus-visible
          "focus-visible:border-primary-base focus-visible:bg-static-white focus-visible:outline-primary-500",
        ],
      },
      {
        variant: "danger",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-error-weak",
          // active
          "active:bg-error-weak",
          // focus-visible
          "focus-visible:border-error-base focus-visible:bg-static-white focus-visible:outline-red-600",
        ],
      },
      {
        variant: "success",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-success-weak",
          // active
          "active:bg-success-weak",
          // active
          "active:bg-success-weak",
          // focus-visible
          "focus-visible:border-green-600 focus-visible:bg-static-white focus-visible:outline-green-600",
          // aria-busy
          "aria-busy:text-success-base",
        ],
      },
      {
        variant: "neutral-solid",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-weak",
          // active
          "active:bg-weak",
          // focus-visible
          "focus-visible:bg-weakest focus-visible:border-strong focus-visible:outline-strong",
          // aria-busy
          "aria-busy:text-body",
        ],
      },
      {
        variant: "neutral-light",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-weak",
          // active
          "active:bg-weak",
          // focus-visible
          "focus-visible:bg-weakest focus-visible:border-medium focus-visible:outline-strong",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-solid",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-strong",
          // active
          "active:bg-strong",
          // focus-visible
          "focus-visible:bg-strongest focus-visible:border-weakest focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },
      {
        variant: "inverse-light",
        appearance: "ghost",
        className: [
          // hover
          "hover:bg-strong",
          // active
          "active:bg-strong",
          // focus-visible
          "focus-visible:bg-strongest focus-visible:border-heavy focus-visible:outline-weakest",
          // aria-busy
          "aria-busy:text-placeholder",
        ],
      },

      // --- iconOnly size overrides ---
      { iconOnly: true, size: "xs", className: "px-0 size-5" },
      { iconOnly: true, size: "sm", className: "px-0 size-6" },
      { iconOnly: true, size: "md", className: "px-0 size-8" },
      { iconOnly: true, size: "lg", className: "px-0 size-10" },
      { iconOnly: true, size: "xl", className: "px-0 size-12" },

      // --- Disabled: standard group ---
      {
        variant: [
          "primary",
          "danger",
          "success",
          "neutral-solid",
          "neutral-light",
        ],
        appearance: ["solid", "soft"],
        className: [
          // disabled
          "not-aria-busy:disabled:bg-weak not-aria-busy:disabled:text-disabled",
          // aria-disabled
          "not-aria-busy:aria-disabled:bg-weak not-aria-busy:aria-disabled:text-disabled",
        ],
      },
      {
        variant: [
          "primary",
          "danger",
          "success",
          "neutral-solid",
          "neutral-light",
        ],
        appearance: "outline",
        className: [
          // disabled
          "not-aria-busy:disabled:text-disabled not-aria-busy:disabled:border-light",
          // aria-disabled
          "not-aria-busy:aria-disabled:text-disabled not-aria-busy:aria-disabled:border-light",
        ],
      },
      {
        variant: [
          "primary",
          "danger",
          "success",
          "neutral-solid",
          "neutral-light",
        ],
        appearance: "ghost",
        className: [
          // disabled
          "not-aria-busy:disabled:text-disabled",
          // aria-disabled
          "not-aria-busy:aria-disabled:text-disabled",
        ],
      },

      // --- Disabled: inverse ---
      {
        variant: ["inverse-solid", "inverse-light"],
        appearance: ["solid", "soft"],
        className: [
          // disabled
          "not-aria-busy:disabled:bg-strong not-aria-busy:disabled:text-body",
          // aria-disabled
          "not-aria-busy:aria-disabled:bg-strong not-aria-busy:aria-disabled:text-body",
        ],
      },
      {
        variant: ["inverse-solid", "inverse-light"],
        appearance: "outline",
        className: [
          // disabled
          "not-aria-busy:disabled:text-body not-aria-busy:disabled:border-strong",
          // aria-disabled
          "not-aria-busy:aria-disabled:text-body not-aria-busy:aria-disabled:border-strong",
        ],
      },
      {
        variant: ["inverse-solid", "inverse-light"],
        appearance: "ghost",
        className: [
          // disabled
          "not-aria-busy:disabled:text-body",
          // aria-disabled
          "not-aria-busy:aria-disabled:text-body",
        ],
      },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      size: "lg",
      shape: "rounded",
      iconOnly: false,
    },
  }
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
type ButtonAppearance = NonNullable<
  VariantProps<typeof buttonVariants>["appearance"]
>
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

const SPINNER_VARIANT: Record<
  ButtonVariant,
  Record<ButtonAppearance, SpinnerProps["variant"]>
> = {
  primary: {
    solid: "inverse-static",
    outline: "primary",
    soft: "primary",
    ghost: "primary",
  },
  "neutral-solid": {
    solid: "inverse",
    outline: "neutral",
    soft: "neutral",
    ghost: "neutral",
  },
  "neutral-light": {
    solid: "inverse-soft",
    outline: "neutral-soft",
    soft: "neutral-soft",
    ghost: "neutral-soft",
  },
  "inverse-solid": {
    solid: "neutral",
    outline: "inverse-soft",
    soft: "inverse-soft",
    ghost: "inverse-soft",
  },
  "inverse-light": {
    solid: "neutral-soft",
    outline: "inverse-soft",
    soft: "inverse-soft",
    ghost: "inverse-soft",
  },
  danger: {
    solid: "inverse-static",
    outline: "danger",
    soft: "danger",
    ghost: "danger",
  },
  success: {
    solid: "inverse-static",
    outline: "success",
    soft: "success",
    ghost: "success",
  },
}

const SPINNER_SIZE: Record<ButtonSize, SpinnerProps["size"]> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "md",
  xl: "lg",
}

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    iconOnly?: boolean
  }

function Button({
  className,
  variant = "primary",
  appearance = "solid",
  size = "lg",
  shape = "rounded",
  iconOnly = false,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null
  const labelContent = slot ? slot.props.children : children

  const spinnerVariant =
    SPINNER_VARIANT[variant ?? "primary"]?.[appearance ?? "solid"] ?? "neutral"
  const spinnerSize = SPINNER_SIZE[size ?? "lg"]

  let content: React.ReactNode
  if (iconOnly) {
    content = loading ? (
      <>
        <Spinner variant={spinnerVariant} size={spinnerSize} />
        <span className="sr-only">Loading</span>
      </>
    ) : (
      labelContent
    )
  } else {
    const childArray = React.Children.toArray(labelContent)
    const hasLabel = childArray.some(
      (child) => React.isValidElement(child) && child.type === ButtonLabel
    )
    const label = hasLabel ? (
      React.Children.map(labelContent, (child) =>
        React.isValidElement<ButtonLabelProps>(child) &&
        child.type === ButtonLabel
          ? React.cloneElement(child, {
              size: child.props.size ?? size ?? "lg",
            })
          : child
      )
    ) : (
      <ButtonLabel size={size ?? "lg"}>{labelContent}</ButtonLabel>
    )
    content = (
      <>
        {loading && <Spinner variant={spinnerVariant} size={spinnerSize} />}
        {label}
      </>
    )
  }

  const inner = slot ? React.cloneElement(slot, undefined, content) : content

  const isInteractionBlocked = disabled || loading

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      disabled={asChild ? undefined : isInteractionBlocked}
      aria-disabled={asChild ? isInteractionBlocked || undefined : undefined}
      aria-busy={loading || undefined}
      tabIndex={asChild && isInteractionBlocked ? -1 : undefined}
      className={cn(
        buttonVariants({
          variant,
          appearance,
          size,
          shape,
          iconOnly,
          className,
        })
      )}
      {...props}
    >
      {inner}
    </Comp>
  )
}

type ButtonLabelProps = React.ComponentProps<"span"> & {
  size?: ButtonSize
}

function ButtonLabel({ className, size = "lg", ...props }: ButtonLabelProps) {
  return (
    <span
      data-slot="button-label"
      className={cn(
        size === "xs" || size === "sm"
          ? "px-0.5"
          : "px-component-xs whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

export { Button, ButtonLabel, buttonVariants }
