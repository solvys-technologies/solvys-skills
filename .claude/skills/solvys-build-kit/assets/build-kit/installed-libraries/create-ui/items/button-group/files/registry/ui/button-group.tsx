"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"
import { Spinner, type SpinnerProps } from "@/registry/ui/spinner"

const SPINNER_SIZE: Record<
  "xs" | "sm" | "md" | "lg" | "xl",
  SpinnerProps["size"]
> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "md",
  xl: "lg",
}

const buttonGroupVariants = cva(
  "w-fit items-stretch overflow-hidden shadow-neutral-xs [&>*]:border-light",
  {
    variants: {
      variant: {
        primary: "",
        neutral: "",
        soft: "",
      },
      orientation: {
        horizontal:
          "inline-flex [&>*:first-child]:border-l [&>*]:border-y [&>*]:border-r",
      },
      shape: {
        rounded: "",
        pill: "",
        square: "",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        shape: "rounded",
        size: "xs",
        className:
          "rounded-sm [&>*:first-child]:rounded-l-sm [&>*:last-child]:rounded-r-sm",
      },
      {
        orientation: "horizontal",
        shape: "rounded",
        size: "sm",
        className:
          "rounded-md [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
      },
      {
        orientation: "horizontal",
        shape: "rounded",
        size: "md",
        className:
          "rounded-lg [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg",
      },
      {
        orientation: "horizontal",
        shape: "rounded",
        size: "lg",
        className:
          "rounded-xl [&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl",
      },
      {
        orientation: "horizontal",
        shape: "rounded",
        size: "xl",
        className:
          "rounded-2xl [&>*:first-child]:rounded-l-2xl [&>*:last-child]:rounded-r-2xl",
      },
      {
        orientation: "horizontal",
        shape: "pill",
        className:
          "rounded-full [&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full",
      },
    ],
  }
)

const buttonGroupItemVariants = cva(
  [
    // base
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden text-body border-light cursor-pointer [&_[data-slot=button-group-item-icon]]:shrink-0 [&_[data-slot=button-group-item-icon]_svg]:size-full",
    // transition
    "transition-colors",
    // focus-visible
    "focus-visible:outline-2 focus-visible:-outline-offset-2",
    // disabled
    "disabled:cursor-not-allowed disabled:bg-weak disabled:text-disabled",
    // aria-disabled
    "aria-disabled:pointer-events-none aria-disabled:bg-weak aria-disabled:text-disabled",
    // aria-busy
    "aria-busy:outline-2 aria-busy:-outline-offset-2 aria-busy:outline-info-weak aria-busy:text-disabled aria-busy:[&_[data-slot=button-group-item-spinner]]:text-info-base",
  ],
  {
    variants: {
      variant: {
        primary: "",
        neutral: "",
        soft: "",
      },
      orientation: {
        horizontal: "border-r",
      },
      size: {
        xs: "[&_[data-slot=button-group-item-icon]]:size-3",
        sm: "[&_[data-slot=button-group-item-icon]]:size-4",
        md: "[&_[data-slot=button-group-item-icon]]:size-5",
        lg: "[&_[data-slot=button-group-item-icon]]:size-5",
        xl: "[&_[data-slot=button-group-item-icon]]:size-6",
      },
      iconOnly: {
        true: "",
        false: "font-semibold",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        iconOnly: false,
        className:
          "h-5 gap-0.5 px-1 text-ui-control-xs " +
          "[&_[data-slot=button-group-item-content]]:gap-0.5 " +
          "[&_[data-slot=button-group-item-content]]:px-0.5",
      },
      { size: "xs", iconOnly: true, className: "size-5" },
      {
        size: "sm",
        iconOnly: false,
        className:
          "h-6 gap-0.5 px-1.5 text-ui-control-sm " +
          "[&_[data-slot=button-group-item-content]]:gap-1 " +
          "[&_[data-slot=button-group-item-content]]:px-0.5",
      },
      { size: "sm", iconOnly: true, className: "size-6" },
      {
        size: "md",
        iconOnly: false,
        className:
          "h-8 gap-0.5 px-2 text-ui-control-md " +
          "[&_[data-slot=button-group-item-content]]:gap-1",
      },
      { size: "md", iconOnly: true, className: "size-8" },
      {
        size: "lg",
        iconOnly: false,
        className:
          "h-10 gap-1 px-3 text-ui-control-md " +
          "[&_[data-slot=button-group-item-content]]:gap-1",
      },
      { size: "lg", iconOnly: true, className: "size-10" },
      {
        size: "xl",
        iconOnly: false,
        className: "h-12 gap-1 px-4 text-ui-control-xl",
      },
      { size: "xl", iconOnly: true, className: "size-12" },
      {
        variant: "soft",
        className: [
          // base
          "bg-static",
          // hover
          "hover:bg-weakest",
          // focus-visible
          "focus-visible:outline-strongest",
          // aria-busy
          "aria-busy:bg-weakest",
          // data-[active=true]
          "data-[active=true]:bg-weak data-[active=true]:text-strongest",
          // data-[active=true]:hover
          "data-[active=true]:hover:bg-weak",
        ],
      },
      {
        variant: "neutral",
        className: [
          // base
          "bg-weakest",
          // hover
          "hover:bg-weak",
          // focus-visible
          "focus-visible:bg-static focus-visible:outline-strongest",
          // aria-busy
          "aria-busy:bg-weak",
          // data-[active=true]
          "data-[active=true]:bg-strongest data-[active=true]:text-static-white",
          // data-[active=true]:hover
          "data-[active=true]:hover:bg-strongest",
        ],
      },
      {
        variant: "primary",
        className: [
          // base
          "bg-static",
          // hover
          "hover:bg-weakest",
          // focus-visible
          "focus-visible:outline-primary-500",
          // aria-busy
          "aria-busy:bg-weakest",
          // data-[active=true]
          "data-[active=true]:bg-primary-500 data-[active=true]:text-white",
          // data-[active=true]:hover
          "data-[active=true]:hover:bg-primary-500",
        ],
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
      orientation: "horizontal",
    },
  }
)

type ButtonGroupContextValue = {
  variant: NonNullable<VariantProps<typeof buttonGroupVariants>["variant"]>
  size: NonNullable<VariantProps<typeof buttonGroupVariants>["size"]>
  orientation: NonNullable<
    VariantProps<typeof buttonGroupVariants>["orientation"]
  >
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null
)

type ButtonGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>

function ButtonGroup({
  className,
  variant = "primary",
  shape = "rounded",
  size = "md",
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  const contextValue = React.useMemo<ButtonGroupContextValue>(
    () => ({
      variant: variant ?? "primary",
      size: size ?? "md",
      orientation: orientation ?? "horizontal",
    }),
    [variant, size, orientation]
  )

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        data-slot="button-group"
        data-variant={variant}
        data-shape={shape}
        data-size={size}
        data-orientation={orientation}
        role="group"
        className={cn(
          buttonGroupVariants({ variant, shape, size, orientation }),
          className
        )}
        {...props}
      />
    </ButtonGroupContext.Provider>
  )
}

type ButtonGroupItemProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonGroupItemVariants> & {
    asChild?: boolean
    loading?: boolean
    active?: boolean
    leading?: React.ReactNode
    trailing?: React.ReactNode
  }

function ButtonGroupItem({
  className,
  variant: variantProp,
  size: sizeProp,
  orientation: orientationProp,
  iconOnly = false,
  asChild = false,
  loading = false,
  active = false,
  disabled,
  leading,
  trailing,
  children,
  ...props
}: ButtonGroupItemProps) {
  const context = React.useContext(ButtonGroupContext)
  const variant = variantProp ?? context?.variant ?? "primary"
  const size = sizeProp ?? context?.size ?? "md"
  const orientation = orientationProp ?? context?.orientation ?? "horizontal"

  const slot =
    asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
      ? children
      : null
  const renderAsChild = slot !== null
  const Comp = renderAsChild ? Slot.Root : "button"

  const spinner = (
    <Spinner
      data-slot="button-group-item-spinner"
      variant="info"
      size={SPINNER_SIZE[size]}
    />
  )

  const labelContent = slot ? slot.props.children : children
  const trailingNode = loading ? spinner : trailing

  const content = iconOnly ? (
    <span data-slot="button-group-item-icon">
      {loading ? spinner : labelContent}
    </span>
  ) : (
    <>
      {leading && <span data-slot="button-group-item-icon">{leading}</span>}
      {labelContent !== undefined && labelContent !== null && (
        <span
          data-slot="button-group-item-content"
          className="px-component-xs inline-flex items-center justify-center gap-1.5"
        >
          {labelContent}
        </span>
      )}
      {trailingNode && (
        <span data-slot="button-group-item-icon">{trailingNode}</span>
      )}
    </>
  )

  const inner = slot ? React.cloneElement(slot, undefined, content) : content
  const isInteractionBlocked = disabled || loading

  return (
    <Comp
      data-slot="button-group-item"
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      data-active={active || undefined}
      type={renderAsChild ? undefined : "button"}
      disabled={renderAsChild ? undefined : isInteractionBlocked}
      aria-disabled={
        renderAsChild ? isInteractionBlocked || undefined : undefined
      }
      aria-busy={loading || undefined}
      aria-pressed={renderAsChild ? undefined : active || undefined}
      tabIndex={renderAsChild && isInteractionBlocked ? -1 : undefined}
      className={cn(
        buttonGroupItemVariants({ variant, size, iconOnly, orientation }),
        className
      )}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export {
  ButtonGroup,
  ButtonGroupItem,
  buttonGroupVariants,
  buttonGroupItemVariants,
}
