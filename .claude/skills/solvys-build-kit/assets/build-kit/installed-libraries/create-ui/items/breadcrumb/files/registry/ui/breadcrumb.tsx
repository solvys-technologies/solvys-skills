"use client"

import * as React from "react"
import { RiArrowRightSLine } from "@create-ui/assets/icons"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/registry/lib/utils"

type BreadcrumbVariant = "primary" | "neutral"
type BreadcrumbAppearance = "solid" | "outline" | "ghost"
type BreadcrumbSize = "xs" | "sm" | "md"
type BreadcrumbShape = "rounded" | "pill"
type BreadcrumbSeparatorVariant = "chevron" | "slash" | "dot"

type BreadcrumbContextValue = {
  variant?: BreadcrumbVariant
  appearance?: BreadcrumbAppearance
  size?: BreadcrumbSize
  shape?: BreadcrumbShape
  separator?: BreadcrumbSeparatorVariant
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue | null>(
  null
)

function useBreadcrumbContext() {
  return React.useContext(BreadcrumbContext)
}

type BreadcrumbProps = React.ComponentProps<"nav"> & BreadcrumbContextValue

function Breadcrumb({
  className,
  variant,
  appearance,
  size,
  shape,
  separator,
  ...props
}: BreadcrumbProps) {
  const ctxValue = React.useMemo<BreadcrumbContextValue>(
    () => ({ variant, appearance, size, shape, separator }),
    [variant, appearance, size, shape, separator]
  )

  return (
    <BreadcrumbContext.Provider value={ctxValue}>
      <nav
        data-slot="breadcrumb"
        aria-label="Breadcrumb"
        className={cn(
          "flex flex-nowrap items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
        {...props}
      />
    </BreadcrumbContext.Provider>
  )
}

const INTERACTIVE_BASE = [
  // base
  "inline-flex items-center select-none cursor-pointer font-semibold transition-colors text-placeholder",
  // focus-visible
  "focus-visible:border-strongest",
  // data-disabled
  "data-[disabled]:text-disabled data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none",
  // data-current
  "data-[current]:text-strongest data-[current]:cursor-default data-[current]:pointer-events-none",
]

const VARIANT_HOVER_MAP = {
  primary: "hover:text-primary-base",
  neutral: "hover:text-strongest",
} as const

const APPEARANCE_MAP = {
  solid: [
    // base
    "border-1 border-transparent bg-weakest",
    // hover
    "hover:bg-weak",
    // focus-visible
    "focus-visible:bg-weakest focus-visible:text-placeholder focus-visible:outline-strong",
    // data-disabled
    "data-[disabled]:bg-weakest",
  ],
  outline: [
    // base
    "border-1 border-light bg-static",
    // hover
    "hover:bg-weakest",
    // focus-visible
    "focus-visible:bg-static focus-visible:text-placeholder focus-visible:outline-strong",
    // data-current
    "data-[current]:bg-weakest",
  ],
  ghost: [
    // base
    "border-1 border-transparent outline-none",
    // focus-visible
    "focus-visible:bg-static focus-visible:text-body",
  ],
}

const SHAPE_MAP = { rounded: "", pill: "rounded-full" } as const

const FOCUS_OUTLINE_BY_SIZE = {
  xs: "focus-visible:outline-1 focus-visible:outline-offset-1",
  sm: "focus-visible:outline-2 focus-visible:outline-offset-2",
  md: "focus-visible:outline-2 focus-visible:outline-offset-2",
} as const

type BreadcrumbRoundingCompound = {
  appearance: "ghost" | Array<"outline" | "solid">
  shape: "rounded"
  size: "xs" | "sm" | "md"
  className: string
}

const breadcrumbRoundingCompounds: BreadcrumbRoundingCompound[] = [
  {
    appearance: ["outline", "solid"],
    shape: "rounded",
    size: "xs",
    className: "rounded-md",
  },
  {
    appearance: ["outline", "solid"],
    shape: "rounded",
    size: "sm",
    className: "rounded-lg",
  },
  {
    appearance: ["outline", "solid"],
    shape: "rounded",
    size: "md",
    className: "rounded-xl",
  },
  {
    appearance: "ghost",
    shape: "rounded",
    size: "xs",
    className: "rounded-xs",
  },
  {
    appearance: "ghost",
    shape: "rounded",
    size: "sm",
    className: "rounded-sm",
  },
  {
    appearance: "ghost",
    shape: "rounded",
    size: "md",
    className: "rounded-md",
  },
]

const breadcrumbItemVariants = cva(
  [
    ...INTERACTIVE_BASE,
    // svg
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: VARIANT_HOVER_MAP,
      appearance: APPEARANCE_MAP,
      size: {
        xs: "gap-1 text-ui-control-sm [&_[data-slot=breadcrumb-item-icon]>svg]:size-4 [&_[data-slot=breadcrumb-item-caret]>svg]:size-2.5 [&_[data-slot=breadcrumb-item-content]]:gap-1 [&_[data-slot=breadcrumb-item-caret]]:-ml-1",
        sm: "gap-1.5 text-ui-control-md [&_[data-slot=breadcrumb-item-icon]>svg]:size-5 [&_[data-slot=breadcrumb-item-caret]>svg]:size-3 [&_[data-slot=breadcrumb-item-content]]:gap-1.5 [&_[data-slot=breadcrumb-item-caret]]:-ml-1",
        md: "gap-2 text-ui-control-xl [&_[data-slot=breadcrumb-item-icon]>svg]:size-6 [&_[data-slot=breadcrumb-item-caret]>svg]:size-4 [&_[data-slot=breadcrumb-item-content]]:gap-2 [&_[data-slot=breadcrumb-item-caret]]:-ml-1",
      },
      shape: SHAPE_MAP,
    },
    compoundVariants: [
      {
        size: "xs",
        appearance: ["outline", "solid"],
        className: [
          // base
          "h-6 px-2",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.xs,
        ],
      },
      {
        size: "sm",
        appearance: ["outline", "solid"],
        className: [
          // base
          "h-8 px-2.5",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.sm,
        ],
      },
      {
        size: "md",
        appearance: ["outline", "solid"],
        className: [
          // base
          "h-10 px-3",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.md,
        ],
      },
      ...breadcrumbRoundingCompounds,
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "ghost",
      size: "sm",
      shape: "rounded",
    },
  }
)

type InteractiveAttrsArgs = {
  variant: VariantProps<typeof breadcrumbItemVariants>["variant"]
  appearance: VariantProps<typeof breadcrumbItemVariants>["appearance"]
  size: VariantProps<typeof breadcrumbItemVariants>["size"]
  disabled: boolean | undefined
  current: boolean | undefined
}

function getInteractiveAttrs({
  variant,
  appearance,
  size,
  disabled,
  current,
}: InteractiveAttrsArgs) {
  return {
    "data-variant": variant,
    "data-appearance": appearance,
    "data-size": size,
    "data-disabled": disabled || undefined,
    "data-current": current || undefined,
    "aria-disabled": disabled || undefined,
    "aria-current": current ? ("page" as const) : undefined,
    tabIndex: disabled ? -1 : undefined,
  }
}

type BreadcrumbItemProps = React.ComponentProps<"a"> &
  VariantProps<typeof breadcrumbItemVariants> & {
    asChild?: boolean
    leading?: React.ReactNode
    trailing?: React.ReactNode
    disabled?: boolean
    current?: boolean
  }

function BreadcrumbItem({
  className,
  variant: variantProp,
  appearance: appearanceProp,
  size: sizeProp,
  shape: shapeProp,
  asChild = false,
  leading,
  trailing,
  disabled,
  current,
  children,
  ...props
}: BreadcrumbItemProps) {
  const ctx = useBreadcrumbContext()
  const variant = variantProp ?? ctx?.variant ?? "primary"
  const appearance = appearanceProp ?? ctx?.appearance ?? "ghost"
  const size = sizeProp ?? ctx?.size ?? "sm"
  const shape = shapeProp ?? ctx?.shape ?? "rounded"
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-item"
      {...getInteractiveAttrs({ variant, appearance, size, disabled, current })}
      className={cn(
        breadcrumbItemVariants({ variant, appearance, size, shape, className })
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leading && <span data-slot="breadcrumb-item-icon">{leading}</span>}
          {children != null && (
            <span
              data-slot="breadcrumb-item-content"
              className="inline-flex items-center whitespace-nowrap"
            >
              {children}
            </span>
          )}
          {trailing && (
            <span data-slot="breadcrumb-item-caret">{trailing}</span>
          )}
        </>
      )}
    </Comp>
  )
}

const breadcrumbSeparatorVariants = cva(
  "inline-flex items-center justify-center text-disabled shrink-0 [&_svg]:pointer-events-none [&_svg]:size-full",
  {
    variants: {
      variant: {
        chevron: "",
        slash: "font-semibold",
        dot: "",
      },
      size: {
        xs: "size-4 text-ui-control-sm",
        sm: "size-5 text-ui-control-md",
        md: "size-6 text-ui-control-xl",
      },
    },
    compoundVariants: [
      { variant: "dot", size: "xs", className: "[&>span]:size-0.5" },
      { variant: "dot", size: "sm", className: "[&>span]:size-1" },
      { variant: "dot", size: "md", className: "[&>span]:size-1.5" },
    ],
    defaultVariants: {
      variant: "chevron",
      size: "sm",
    },
  }
)

type BreadcrumbSeparatorProps = React.ComponentProps<"span"> &
  VariantProps<typeof breadcrumbSeparatorVariants>

function BreadcrumbSeparator({
  className,
  variant: variantProp,
  size: sizeProp,
  ...props
}: BreadcrumbSeparatorProps) {
  const ctx = useBreadcrumbContext()
  const variant = variantProp ?? ctx?.separator ?? "chevron"
  const size = sizeProp ?? ctx?.size ?? "sm"

  return (
    <span
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "slash" && <span>/</span>}
      {variant === "chevron" && <RiArrowRightSLine />}
      {variant === "dot" && <span className="bg-disabled rounded-full" />}
    </span>
  )
}

const breadcrumbEllipsisVariants = cva(
  [...INTERACTIVE_BASE, "justify-center shrink-0"],
  {
    variants: {
      variant: VARIANT_HOVER_MAP,
      appearance: APPEARANCE_MAP,
      size: {
        xs: "text-ui-control-sm",
        sm: "text-ui-control-md",
        md: "text-ui-control-xl",
      },
      shape: SHAPE_MAP,
    },
    compoundVariants: [
      { appearance: "ghost", size: "xs", className: "size-4" },
      { appearance: "ghost", size: "sm", className: "size-5" },
      { appearance: "ghost", size: "md", className: "size-6" },
      {
        appearance: ["outline", "solid"],
        size: "xs",
        className: [
          // base
          "size-6",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.xs,
        ],
      },
      {
        appearance: ["outline", "solid"],
        size: "sm",
        className: [
          // base
          "size-8",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.sm,
        ],
      },
      {
        appearance: ["outline", "solid"],
        size: "md",
        className: [
          // base
          "size-10",
          // focus-visible
          FOCUS_OUTLINE_BY_SIZE.md,
        ],
      },
      ...breadcrumbRoundingCompounds,
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "ghost",
      size: "sm",
      shape: "rounded",
    },
  }
)

type BreadcrumbEllipsisProps = React.ComponentProps<"span"> &
  VariantProps<typeof breadcrumbEllipsisVariants> & {
    disabled?: boolean
    current?: boolean
  }

function BreadcrumbEllipsis({
  className,
  variant: variantProp,
  appearance: appearanceProp,
  size: sizeProp,
  shape: shapeProp,
  disabled,
  current,
  ...props
}: BreadcrumbEllipsisProps) {
  const ctx = useBreadcrumbContext()
  const variant = variantProp ?? ctx?.variant ?? "primary"
  const appearance = appearanceProp ?? ctx?.appearance ?? "ghost"
  const size = sizeProp ?? ctx?.size ?? "sm"
  const shape = shapeProp ?? ctx?.shape ?? "rounded"

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      {...getInteractiveAttrs({ variant, appearance, size, disabled, current })}
      className={cn(
        breadcrumbEllipsisVariants({
          variant,
          appearance,
          size,
          shape,
          className,
        })
      )}
      {...props}
    >
      <span aria-hidden="true">...</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbSeparator,
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
  useBreadcrumbContext,
}
export type { BreadcrumbContextValue, BreadcrumbProps }
